/* ==========================================================================
   Portfolio behaviour: navigation, hero sequence, project rendering, contact form
   ========================================================================== */

(function () {
  "use strict";

  // Where contact-form messages are delivered (FormSubmit needs no backend).
  // The first message triggers a one-time activation email to this address.
  const CONTACT_EMAIL = "ghassen.jdidi04@gmail.com";
  const FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  /* ---------- Navigation ---------- */

  function initNav() {
    const toggle = $(".nav-toggle");
    const links = $(".nav-links");
    const header = $(".site-header");

    if (toggle && links) {
      toggle.addEventListener("click", () => {
        const open = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!open));
        links.classList.toggle("is-open", !open);
      });

      // Close the mobile menu after choosing a page or pressing Escape
      links.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
          toggle.setAttribute("aria-expanded", "false");
          links.classList.remove("is-open");
        }
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && links.classList.contains("is-open")) {
          toggle.setAttribute("aria-expanded", "false");
          links.classList.remove("is-open");
          toggle.focus();
        }
      });
    }

    if (header) {
      const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    const year = $("[data-year]");
    if (year) year.textContent = new Date().getFullYear();
  }

  /* ---------- Hero: start the document-reading sequence once fonts are in ---------- */

  function initHero() {
    const stage = $(".doc-stage");
    if (!stage) return;
    const start = () => requestAnimationFrame(() => stage.classList.add("is-ready"));
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(start);
    } else {
      window.addEventListener("load", start);
    }
  }

  /* ---------- Projects ---------- */

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[char]);
  }

  function projectTemplate(project) {
    const badge = project.badge
      ? `<span class="badge${project.badge.award ? " badge--award" : ""}">${escapeHtml(project.badge.label)}</span>`
      : "";
    const stack = project.stack.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    const links = [];
    if (project.links.demo) {
      links.push(`<a href="${escapeHtml(project.links.demo)}" target="_blank" rel="noopener">Live demo</a>`);
    }
    if (project.links.code) {
      links.push(`<a href="${escapeHtml(project.links.code)}" target="_blank" rel="noopener">Source code</a>`);
    }

    return `
      <li class="project" data-category="${escapeHtml(project.category)}">
        <div class="project-thumb">
          <img src="${escapeHtml(project.thumb)}" alt="Preview of ${escapeHtml(project.title)}" loading="lazy" width="640" height="400">
        </div>
        <div class="project-body">
          <div class="project-meta">${badge}<span>${escapeHtml(project.year)}</span></div>
          <h3>${escapeHtml(project.title)}</h3>
          <p>${escapeHtml(project.summary)}</p>
          <ul class="stack" aria-label="Technologies used">${stack}</ul>
          ${links.length ? `<div class="project-links">${links.join("")}</div>` : ""}
        </div>
      </li>`;
  }

  function renderFeatured() {
    const list = $("[data-featured-projects]");
    if (!list || !window.PROJECTS) return;
    list.innerHTML = window.PROJECTS.filter((p) => p.featured).map(projectTemplate).join("");
  }

  function renderProjectsPage() {
    const list = $("[data-all-projects]");
    const filterBar = $("[data-filters]");
    const count = $("[data-project-count]");
    if (!list || !filterBar || !window.PROJECTS) return;

    const params = new URLSearchParams(window.location.search);
    let active = params.get("filter") || "all";
    if (!window.PROJECT_FILTERS.some((f) => f.id === active)) active = "all";

    filterBar.innerHTML = window.PROJECT_FILTERS.map(
      (f) => `<button type="button" class="filter" data-filter="${f.id}" aria-pressed="${f.id === active}">${escapeHtml(f.label)}</button>`
    ).join("");

    const draw = () => {
      const items = window.PROJECTS.filter((p) => active === "all" || p.category === active);
      list.innerHTML = items.map(projectTemplate).join("");
      if (count) count.textContent = `${items.length} project${items.length === 1 ? "" : "s"}`;
    };

    filterBar.addEventListener("click", (event) => {
      const button = event.target.closest("[data-filter]");
      if (!button) return;
      active = button.dataset.filter;
      $$("[data-filter]", filterBar).forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
      const url = new URL(window.location.href);
      if (active === "all") url.searchParams.delete("filter");
      else url.searchParams.set("filter", active);
      window.history.replaceState({}, "", url);
      draw();
    });

    draw();
  }

  /* ---------- Contact form ---------- */

  const rules = {
    name: (v) => (v.trim().length >= 2 ? "" : "Please enter your name."),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Please enter a valid email address."),
    subject: (v) => (v.trim().length >= 3 ? "" : "Please add a short subject."),
    message: (v) => (v.trim().length >= 20 ? "" : "Your message should be at least 20 characters."),
  };

  function validateField(field) {
    const rule = rules[field.name];
    if (!rule) return true;
    const message = rule(field.value);
    const wrapper = field.closest(".field");
    const error = wrapper && $(".field-error", wrapper);
    if (wrapper) wrapper.classList.toggle("has-error", Boolean(message));
    if (error) error.textContent = message;
    field.setAttribute("aria-invalid", message ? "true" : "false");
    return !message;
  }

  function initContactForm() {
    const form = $("#contact-form");
    if (!form) return;
    const status = $(".form-status", form);
    const submit = $("button[type=submit]", form);
    const fields = $$("input:not(.hp), textarea", form);

    fields.forEach((field) => {
      field.addEventListener("blur", () => validateField(field));
      field.addEventListener("input", () => {
        if (field.getAttribute("aria-invalid") === "true") validateField(field);
      });
    });

    const showStatus = (type, text) => {
      status.hidden = false;
      status.className = `form-status is-${type}`;
      status.textContent = text;
    };

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const valid = fields.map(validateField).every(Boolean);
      if (!valid) {
        const firstInvalid = fields.find((f) => f.getAttribute("aria-invalid") === "true");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Bots fill the hidden field; people never see it
      if ($(".hp", form).value) return;

      const data = Object.fromEntries(new FormData(form));
      delete data._honey;
      submit.disabled = true;
      submit.textContent = "Sending…";

      try {
        const response = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...data, _subject: `Portfolio: ${data.subject}`, _template: "table" }),
        });
        if (!response.ok) throw new Error(`Request failed with ${response.status}`);
        form.reset();
        fields.forEach((f) => f.removeAttribute("aria-invalid"));
        showStatus("success", "Message sent. I usually reply within a day.");
      } catch (error) {
        const body = encodeURIComponent(`${data.message}\n\n${data.name} (${data.email})`);
        const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(data.subject)}&body=${body}`;
        showStatus("error", "The message could not be sent from here. Your email app will open with the message ready instead.");
        window.location.href = mailto;
      } finally {
        submit.disabled = false;
        submit.textContent = "Send message";
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initNav();
    initHero();
    renderFeatured();
    renderProjectsPage();
    initContactForm();
  });
})();
