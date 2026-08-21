(function (root) {
  "use strict";

  function esc(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function skillRows(skills) {
    return Object.keys(skills || {}).map(function (label) {
      return (
        '<div class="skill-row"><span class="skill-label">' +
        esc(label) +
        ":</span> " +
        esc(skills[label]) +
        "</div>"
      );
    }).join("");
  }

  function bulletsForJob(resume, jobIndex) {
    return (resume.bullets || []).filter(function (b) {
      return Number(b.experienceIndex) === jobIndex;
    });
  }

  function lineTable(leftStrong, leftPlain, right) {
    var left = leftStrong
      ? "<strong>" + esc(leftStrong) + "</strong>" + (leftPlain ? " - " + esc(leftPlain) : "")
      : esc(leftPlain || "");
    return (
      "<table class=\"line\"><tr><td>" +
      left +
      '</td><td class="right">' +
      esc(right || "") +
      "</td></tr></table>"
    );
  }

  function renderExperience(resume) {
    return (resume.experience || []).map(function (job, index) {
      var items = bulletsForJob(resume, index);
      var list = "";
      if (items.length) {
        list =
          "<ul>" +
          items
            .map(function (b) {
              return "<li>" + esc(window.ATS.sanitizeForExport(b.compiled)) + "</li>";
            })
            .join("") +
          "</ul>";
      }
      return (
        '<div class="job">' +
        lineTable(
          window.ATS.sanitizeForExport(job.company),
          window.ATS.sanitizeForExport(job.role),
          window.ATS.sanitizeForExport(job.dates)
        ) +
        (job.subtitle || job.location
          ? '<table class="line"><tr><td class="job-sub">' +
            esc(window.ATS.sanitizeForExport(job.subtitle || "")) +
            '</td><td class="right">' +
            esc(window.ATS.sanitizeForExport(job.location || "")) +
            "</td></tr></table>"
          : "") +
        list +
        "</div>"
      );
    }).join("");
  }

  function renderEducation(resume) {
    return (
      '<table class="line">' +
      (resume.education || [])
        .map(function (ed) {
          var left =
            "<strong>" +
            esc(window.ATS.sanitizeForExport(ed.school)) +
            "</strong> - " +
            esc(window.ATS.sanitizeForExport(ed.degree)) +
            (ed.detail ? " | " + esc(window.ATS.sanitizeForExport(ed.detail)) : "");
          return (
            "<tr><td>" +
            left +
            '</td><td class="right">' +
            esc(window.ATS.sanitizeForExport(ed.dates)) +
            "</td></tr>"
          );
        })
        .join("") +
      "</table>"
    );
  }

  function renderProjects(resume) {
    var projects = (resume.projects || []).filter(function (p) {
      return String(p.name || "").trim();
    });
    if (!projects.length) return "";
    return (
      "<section><h2>Projects &amp; Leadership</h2>" +
      projects
        .map(function (p) {
          return (
            '<div class="job">' +
            "<p><strong>" +
            esc(window.ATS.sanitizeForExport(p.name)) +
            "</strong></p>" +
            (p.line
              ? "<ul><li>" + esc(window.ATS.sanitizeForExport(p.line)) + "</li></ul>"
              : "") +
            "</div>"
          );
        })
        .join("") +
      "</section>"
    );
  }

  function renderHtml(resume) {
    var contact = [resume.location, resume.email, resume.phone, resume.linkedin]
      .filter(Boolean)
      .map(function (v) { return window.ATS.sanitizeForExport(v); })
      .join(" | ");

    return (
      '<article class="ats-resume" id="ats-resume">' +
      "<header>" +
      "<h1>" +
      esc(window.ATS.sanitizeForExport(resume.name)) +
      "</h1>" +
      '<p class="contact">' +
      esc(contact) +
      "</p>" +
      "</header>" +
      "<section><h2>Technical Expertise</h2>" +
      skillRows(resume.skills) +
      "</section>" +
      "<section><h2>Professional Experience</h2>" +
      renderExperience(resume) +
      "</section>" +
      renderProjects(resume) +
      "<section><h2>Education</h2>" +
      renderEducation(resume) +
      "</section>" +
      "</article>"
    );
  }

  function renderText(resume) {
    var lines = [];
    lines.push(window.ATS.sanitizeForExport(resume.name).toUpperCase());
    lines.push(
      [resume.location, resume.email, resume.phone, resume.linkedin]
        .filter(Boolean)
        .map(window.ATS.sanitizeForExport)
        .join(" | ")
    );
    lines.push("");
    lines.push("TECHNICAL EXPERTISE");
    Object.keys(resume.skills || {}).forEach(function (label) {
      lines.push(label + ": " + window.ATS.sanitizeForExport(resume.skills[label]));
    });
    lines.push("");
    lines.push("PROFESSIONAL EXPERIENCE");
    (resume.experience || []).forEach(function (job, index) {
      lines.push("");
      lines.push(
        window.ATS.sanitizeForExport(job.company) +
          " - " +
          window.ATS.sanitizeForExport(job.role) +
          "\t" +
          window.ATS.sanitizeForExport(job.dates)
      );
      if (job.subtitle || job.location) {
        lines.push(
          window.ATS.sanitizeForExport(job.subtitle || "") +
            "\t" +
            window.ATS.sanitizeForExport(job.location || "")
        );
      }
      (resume.bullets || [])
        .filter(function (b) { return Number(b.experienceIndex) === index; })
        .forEach(function (b) {
          lines.push("- " + window.ATS.sanitizeForExport(b.compiled));
        });
    });
    var projects = (resume.projects || []).filter(function (p) {
      return String(p.name || "").trim();
    });
    if (projects.length) {
      lines.push("");
      lines.push("PROJECTS & LEADERSHIP");
      projects.forEach(function (p) {
        lines.push("");
        lines.push(window.ATS.sanitizeForExport(p.name));
        if (p.line) lines.push("- " + window.ATS.sanitizeForExport(p.line));
      });
    }
    lines.push("");
    lines.push("EDUCATION");
    (resume.education || []).forEach(function (ed) {
      lines.push(
        window.ATS.sanitizeForExport(ed.school) +
          " - " +
          window.ATS.sanitizeForExport(ed.degree) +
          (ed.detail ? " | " + window.ATS.sanitizeForExport(ed.detail) : "") +
          "\t" +
          window.ATS.sanitizeForExport(ed.dates)
      );
    });
    return lines.join("\n") + "\n";
  }

  root.ResumeRender = {
    renderHtml: renderHtml,
    renderText: renderText,
    esc: esc
  };
})(window);
