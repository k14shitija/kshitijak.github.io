#!/usr/bin/env python3
"""ATS guards for the Google PM resume template and renderer."""

from __future__ import annotations

import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
JS_DIR = ROOT


def extract_js_object(path: Path, assign_name: str) -> dict:
    text = path.read_text(encoding="utf-8")
    start = text.index("{")
    # The file is JS, not JSON. Use node to evaluate it.
    script = f"""
const fs = require('fs');
const vm = require('vm');
const code = fs.readFileSync({json.dumps(str(path))}, 'utf8');
const ctx = {{ window: {{ RESUME_TEMPLATES: {{}} }} }};
vm.createContext(ctx);
vm.runInContext(code, ctx);
const data = ctx.window.RESUME_TEMPLATES[{json.dumps(assign_name)}];
process.stdout.write(JSON.stringify(data));
"""
    out = subprocess.check_output(["node", "-e", script], cwd=ROOT)
    return json.loads(out)


def extract_fn_bundle() -> str:
    return "\n".join(
        [
            (JS_DIR / "js" / "ats.js").read_text(encoding="utf-8"),
            (JS_DIR / "js" / "render.js").read_text(encoding="utf-8"),
        ]
    )


def render_with_node(resume: dict, template: dict) -> dict:
    script = f"""
const vm = require('vm');
const ctx = {{ window: {{}} }};
vm.createContext(ctx);
vm.runInContext({json.dumps(extract_fn_bundle())}, ctx);
const resume = {json.dumps(resume)};
const template = {json.dumps(template)};
const html = ctx.window.ResumeRender.renderHtml(resume);
const text = ctx.window.ResumeRender.renderText(resume);
const score = ctx.window.ATS.scoreAts(resume, template);
const watermark = ctx.window.ATS.looksLikeWatermark(html);
process.stdout.write(JSON.stringify({{ html, text, score, watermark }}));
"""
    out = subprocess.check_output(["node", "-e", script], cwd=ROOT)
    return json.loads(out)


FORBIDDEN = re.compile(
    r"[\u2013\u2014\u2015\u2018\u2019\u201C\u201D\u00A0\u202F\u200B\u200C\u200D\uFEFF]"
)
AI_PHRASES = [
    "leverage",
    "utilize",
    "delve",
    "cutting-edge",
    "robust",
    "seamless",
    "synergy",
    "passionate about",
    "proven track record",
    "results-driven",
]


def test_three_star_bullets():
    template = extract_js_object(JS_DIR / "data" / "google-pm-geo.js", "google-pm-geo")
    resume = template["resume"]
    assert len(resume["bullets"]) == 3
    for bullet in resume["bullets"]:
        for key in ("situation", "task", "action", "result", "compiled"):
            assert str(bullet.get(key, "")).strip(), f"missing {key}"


def test_export_is_ats_clean():
    template = extract_js_object(JS_DIR / "data" / "google-pm-geo.js", "google-pm-geo")
    rendered = render_with_node(template["resume"], template)
    html = rendered["html"]
    text = rendered["text"]
    assert rendered["watermark"] is False
    assert "watermark" not in html.lower()
    assert html.count("<li>") == 5
    assert text.count("\n- ") == 5
    assert FORBIDDEN.search(html) is None
    assert FORBIDDEN.search(text) is None
    lower = text.lower()
    for phrase in AI_PHRASES:
        assert phrase not in lower, phrase
    assert "Summary" not in html
    assert "SUMMARY" not in text
    assert "Professional Experience" in html
    assert "Projects" in html
    assert "Education" in html
    assert "Technical Expertise" in html
    assert "Formula Student" in text
    assert "Audio PCBA" in text
    assert "kumbharkarkshitija14@gmail.com" in text
    assert "Python" in text
    assert "geospatial" in text.lower()


def test_keyword_coverage():
    template = extract_js_object(JS_DIR / "data" / "google-pm-geo.js", "google-pm-geo")
    rendered = render_with_node(template["resume"], template)
    assert rendered["score"]["keywordScore"] >= 70
    assert rendered["score"]["overall"] >= 80
    missed = [k["keyword"] for k in rendered["score"]["keywords"] if not k["found"]]
    # Optional JD items the candidate should not fake.
    allowed_miss = {"SQL", "machine learning"}
    unexpected = [m for m in missed if m not in allowed_miss]
    assert unexpected == [], unexpected


def test_one_page_pdf_exists():
    site = JS_DIR.parent
    html = (site / "resume.html").read_text(encoding="utf-8")
    pdf = (site / "resume.pdf").read_bytes()
    assert "SUMMARY" not in html
    assert "watermark" not in html.lower()
    assert "Kshitija Kumbharkar" in html
    assert pdf.startswith(b"%PDF")
    assert b"/Count 1" in pdf
    for path in JS_DIR.rglob("*.css"):
        text = path.read_text(encoding="utf-8").lower()
        assert "watermark" not in text, path
        assert "mix-blend-mode" not in text, path


if __name__ == "__main__":
    tests = [
        test_three_star_bullets,
        test_export_is_ats_clean,
        test_keyword_coverage,
        test_one_page_pdf_exists,
    ]
    for fn in tests:
        fn()
        print("ok", fn.__name__)
    print("all passed")
