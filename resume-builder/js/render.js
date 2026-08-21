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
        "<p><strong>" +
        esc(job.company) +
        "</strong> | " +
        esc(job.dates) +
        "</p>" +
        '<p class="job-role">' +
        esc(job.role) +
        (job.location ? " | " + esc(job.location) : "") +
        "</p>" +
        list +
        "</div>"
      );
    }).join("");
  }

  function renderEducation(resume) {
    return (resume.education || []).map(function (ed) {
      return (
        '<div class="job">' +
        "<p><strong>" +
        esc(ed.school) +
        "</strong> | " +
        esc(ed.dates) +
        "</p>" +
        '<p class="job-role">' +
        esc(ed.degree) +
        (ed.location ? " | " + esc(ed.location) : "") +
        (ed.detail ? " | " + esc(ed.detail) : "") +
        "</p>" +
        "</div>"
      );
    }).join("");
  }

  function renderHtml(resume) {
    var contact = [
      resume.location,
      resume.relocation,
      resume.phone,
      resume.email,
      resume.linkedin
    ]
      .filter(Boolean)
      .map(function (v) { return window.ATS.sanitizeForExport(v); })
      .join(" | ");

    return (
      '<article class="ats-resume" id="ats-resume">' +
      "<header>" +
      "<h1>" +
      esc(window.ATS.sanitizeForExport(resume.name)) +
      "</h1>" +
      (resume.headline
        ? '<p class="headline">' + esc(window.ATS.sanitizeForExport(resume.headline)) + "</p>"
        : "") +
      '<p class="contact">' +
      esc(contact) +
      "</p>" +
      "</header>" +
      "<section><h2>Summary</h2><p>" +
      esc(window.ATS.sanitizeForExport(resume.summary)) +
      "</p></section>" +
      "<section><h2>Skills</h2>" +
      skillRows(resume.skills) +
      "</section>" +
      "<section><h2>Experience</h2>" +
      renderExperience(resume) +
      "</section>" +
      "<section><h2>Education</h2>" +
      renderEducation(resume) +
      "</section>" +
      "</article>"
    );
  }

  function renderText(resume) {
    var lines = [];
    lines.push(window.ATS.sanitizeForExport(resume.name));
    if (resume.headline) lines.push(window.ATS.sanitizeForExport(resume.headline));
    lines.push(
      [
        resume.location,
        resume.relocation,
        resume.phone,
        resume.email,
        resume.linkedin
      ]
        .filter(Boolean)
        .map(window.ATS.sanitizeForExport)
        .join(" | ")
    );
    lines.push("");
    lines.push("SUMMARY");
    lines.push(window.ATS.sanitizeForExport(resume.summary));
    lines.push("");
    lines.push("SKILLS");
    Object.keys(resume.skills || {}).forEach(function (label) {
      lines.push(label + ": " + window.ATS.sanitizeForExport(resume.skills[label]));
    });
    lines.push("");
    lines.push("EXPERIENCE");
    (resume.experience || []).forEach(function (job, index) {
      lines.push("");
      lines.push(window.ATS.sanitizeForExport(job.company) + " | " + window.ATS.sanitizeForExport(job.dates));
      lines.push(
        window.ATS.sanitizeForExport(job.role) +
          (job.location ? " | " + window.ATS.sanitizeForExport(job.location) : "")
      );
      (resume.bullets || [])
        .filter(function (b) { return Number(b.experienceIndex) === index; })
        .forEach(function (b) {
          lines.push("- " + window.ATS.sanitizeForExport(b.compiled));
        });
    });
    lines.push("");
    lines.push("EDUCATION");
    (resume.education || []).forEach(function (ed) {
      lines.push("");
      lines.push(window.ATS.sanitizeForExport(ed.school) + " | " + window.ATS.sanitizeForExport(ed.dates));
      lines.push(
        [
          window.ATS.sanitizeForExport(ed.degree),
          window.ATS.sanitizeForExport(ed.location),
          window.ATS.sanitizeForExport(ed.detail)
        ]
          .filter(Boolean)
          .join(" | ")
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
