(function () {
  "use strict";

  var state = {
    templateId: "google-pm-geo",
    resume: null,
    template: null
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function $(id) {
    return document.getElementById(id);
  }

  function loadTemplate(id) {
    var t = window.RESUME_TEMPLATES[id];
    if (!t) return;
    state.templateId = id;
    state.template = t;
    state.resume = clone(t.resume);
    renderForm();
    refresh();
  }

  function bind(id, path) {
    var el = $(id);
    if (!el) return;
    el.value = getPath(state.resume, path) || "";
    el.oninput = function () {
      setPath(state.resume, path, el.value);
      refresh();
    };
  }

  function getPath(obj, path) {
    return path.split(".").reduce(function (acc, key) {
      return acc ? acc[key] : undefined;
    }, obj);
  }

  function setPath(obj, path, value) {
    var parts = path.split(".");
    var cur = obj;
    for (var i = 0; i < parts.length - 1; i++) {
      if (!cur[parts[i]]) cur[parts[i]] = {};
      cur = cur[parts[i]];
    }
    cur[parts[parts.length - 1]] = value;
  }

  function renderForm() {
    var r = state.resume;
    $("field-name").value = r.name || "";
    $("field-headline").value = r.headline || "";
    $("field-location").value = r.location || "";
    $("field-relocation").value = r.relocation || "";
    $("field-phone").value = r.phone || "";
    $("field-email").value = r.email || "";
    $("field-linkedin").value = r.linkedin || "";
    $("field-summary").value = r.summary || "";
    $("field-skill-product").value = r.skills.Product || "";
    $("field-skill-data").value = r.skills.Data || "";
    $("field-skill-domain").value = r.skills.Domain || "";
    $("template-label").textContent = state.template.name;
    renderStars();
    renderJobs();
  }

  function wireBasics() {
    [
      ["field-name", "name"],
      ["field-headline", "headline"],
      ["field-location", "location"],
      ["field-relocation", "relocation"],
      ["field-phone", "phone"],
      ["field-email", "email"],
      ["field-linkedin", "linkedin"],
      ["field-summary", "summary"],
      ["field-skill-product", "skills.Product"],
      ["field-skill-data", "skills.Data"],
      ["field-skill-domain", "skills.Domain"]
    ].forEach(function (pair) {
      var el = $(pair[0]);
      el.oninput = function () {
        setPath(state.resume, pair[1], el.value);
        refresh();
      };
    });
  }

  function renderJobs() {
    var box = $("jobs");
    box.innerHTML = "";
    state.resume.experience.forEach(function (job, index) {
      var wrap = document.createElement("div");
      wrap.className = "star-card";
      wrap.innerHTML =
        "<h3>Role " + (index + 1) + "</h3>" +
        "<label>Company</label>" +
        '<input data-job="' + index + '" data-k="company" />' +
        "<label>Title</label>" +
        '<input data-job="' + index + '" data-k="role" />' +
        "<label>Location</label>" +
        '<input data-job="' + index + '" data-k="location" />' +
        "<label>Dates</label>" +
        '<input data-job="' + index + '" data-k="dates" />';
      box.appendChild(wrap);
      wrap.querySelectorAll("input").forEach(function (input) {
        var k = input.getAttribute("data-k");
        input.value = job[k] || "";
        input.oninput = function () {
          state.resume.experience[index][k] = input.value;
          refresh();
        };
      });
    });
  }

  function compileStar(b) {
    var s = String(b.situation || "").trim();
    var t = String(b.task || "").trim();
    var a = String(b.action || "").trim();
    var r = String(b.result || "").trim();
    if (!s && !t && !a && !r) return "";
    var parts = [];
    if (s) parts.push(s.replace(/\.$/, ""));
    if (t) parts.push("the job was to " + t.charAt(0).toLowerCase() + t.slice(1).replace(/\.$/, ""));
    if (a) parts.push(a.charAt(0).toLowerCase() + a.slice(1).replace(/\.$/, ""));
    if (r) parts.push(r.charAt(0).toLowerCase() + r.slice(1).replace(/\.$/, ""));
    var sentence = parts.join("; ") + ".";
    return window.ATS.sanitizeForExport(sentence);
  }

  function renderStars() {
    var box = $("stars");
    box.innerHTML = "";
    var bullets = state.resume.bullets;
    bullets.forEach(function (b, index) {
      var wrap = document.createElement("div");
      wrap.className = "star-card";
      var options = state.resume.experience
        .map(function (job, i) {
          return (
            '<option value="' +
            i +
            '"' +
            (Number(b.experienceIndex) === i ? " selected" : "") +
            ">" +
            ResumeRender.esc(job.company) +
            "</option>"
          );
        })
        .join("");
      wrap.innerHTML =
        "<h3>STAR bullet " + (index + 1) + "</h3>" +
        "<label>Attach to role</label>" +
        '<select data-star="' + index + '" data-k="experienceIndex">' + options + "</select>" +
        "<label>Situation</label>" +
        '<textarea data-star="' + index + '" data-k="situation"></textarea>' +
        "<label>Task</label>" +
        '<textarea data-star="' + index + '" data-k="task"></textarea>' +
        "<label>Action</label>" +
        '<textarea data-star="' + index + '" data-k="action"></textarea>' +
        "<label>Result</label>" +
        '<textarea data-star="' + index + '" data-k="result"></textarea>' +
        "<label>Compiled bullet (what ATS and recruiters read)</label>" +
        '<textarea data-star="' + index + '" data-k="compiled"></textarea>' +
        '<button type="button" data-remove="' + index + '">Remove bullet</button>';
      box.appendChild(wrap);

      wrap.querySelectorAll("textarea, select").forEach(function (el) {
        var k = el.getAttribute("data-k");
        el.value = b[k] == null ? "" : String(b[k]);
        el.oninput = function () {
          var val = el.value;
          if (k === "experienceIndex") val = Number(val);
          state.resume.bullets[index][k] = val;
          if (k !== "compiled") {
            var compiledEl = wrap.querySelector('textarea[data-k="compiled"]');
            if (compiledEl && !compiledEl.dataset.locked) {
              compiledEl.value = compileStar(state.resume.bullets[index]);
              state.resume.bullets[index].compiled = compiledEl.value;
            }
          } else {
            el.dataset.locked = "1";
          }
          refresh();
        };
      });

      wrap.querySelector("button").onclick = function () {
        state.resume.bullets.splice(index, 1);
        renderStars();
        refresh();
      };
    });

    $("add-star").disabled = bullets.length >= 3;
  }

  function renderPreview() {
    $("preview").innerHTML = ResumeRender.renderHtml(state.resume);
  }

  function renderScore() {
    var report = window.ATS.scoreAts(state.resume, state.template);
    $("score-overall").textContent = report.overall + "%";
    $("score-keywords").textContent = report.keywordScore + "%";
    $("score-checks").textContent = report.checkScore + "%";

    $("checks").innerHTML = report.checks
      .map(function (c) {
        return (
          '<li class="' +
          (c.ok ? "ok" : "fail") +
          '">' +
          (c.ok ? "Pass" : "Fix") +
          " - " +
          ResumeRender.esc(c.label) +
          ": " +
          ResumeRender.esc(c.detail) +
          "</li>"
        );
      })
      .join("");

    $("keywords").innerHTML = report.keywords
      .map(function (k) {
        return (
          '<li class="' +
          (k.found ? "ok" : "kw-miss") +
          '">' +
          (k.found ? "Hit" : "Miss") +
          " - " +
          ResumeRender.esc(k.keyword) +
          "</li>"
        );
      })
      .join("");
  }

  function refresh() {
    renderPreview();
    renderScore();
  }

  function filenameBase() {
    var name = String(state.resume.name || "resume")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    return name + "-google-pm-geo";
  }

  function download(filename, mime, content) {
    var blob = new Blob([content], { type: mime });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function exportTxt() {
    download(filenameBase() + ".txt", "text/plain;charset=utf-8", ResumeRender.renderText(state.resume));
  }

  function exportHtml() {
    var body = ResumeRender.renderHtml(state.resume);
    var html =
      "<!DOCTYPE html>\n<html lang=\"en\"><head><meta charset=\"UTF-8\" />" +
      "<title>" +
      ResumeRender.esc(state.resume.name) +
      "</title>" +
      '<link rel="stylesheet" href="css/resume.css" />' +
      "</head><body>" +
      body +
      "</body></html>\n";
    if (window.ATS.looksLikeWatermark(html)) {
      alert("Export blocked: watermark language found. Remove it and try again.");
      return;
    }
    download(filenameBase() + ".html", "text/html;charset=utf-8", html);
  }

  function printResume() {
    window.print();
  }

  function init() {
    wireBasics();
    $("add-star").onclick = function () {
      if (state.resume.bullets.length >= 3) return;
      state.resume.bullets.push({
        experienceIndex: 0,
        situation: "",
        task: "",
        action: "",
        result: "",
        compiled: ""
      });
      renderStars();
      refresh();
    };
    $("btn-txt").onclick = exportTxt;
    $("btn-html").onclick = exportHtml;
    $("btn-print").onclick = printResume;
    $("btn-reset").onclick = function () {
      loadTemplate(state.templateId);
    };
    loadTemplate("google-pm-geo");
  }

  document.addEventListener("DOMContentLoaded", init);
})();
