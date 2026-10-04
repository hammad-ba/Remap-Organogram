/* Human + AI Operating Model — renderer.
   Reads window.ORG_DATA (see data/*.js and README.md) and draws the overview.
   Nothing in this file is specific to one organisation. */
(function () {
  "use strict";

  var data = window.ORG_DATA;
  var root = document.getElementById("app");
  if (!data || !root) {
    if (root) root.textContent = "No organisation data loaded.";
    return;
  }

  /* ---------- helpers ---------- */

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  var ICONS = {
    human: '<svg class="ic" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><circle cx="8" cy="5" r="3"/><path d="M2.5 14.5c0-3 2.5-5 5.5-5s5.5 2 5.5 5z"/></svg>',
    assisted: '<svg class="ic" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 1.2c.4 3.4 1.9 5 5.4 5.4v.8C9.9 7.8 8.4 9.4 8 12.8h-.8C6.8 9.4 5.3 7.8 1.8 7.4v-.8C5.3 6.2 6.8 4.6 7.2 1.2z"/><path d="M13 10.6c.2 1.5.8 2.1 2.3 2.3v.4c-1.5.2-2.1.8-2.3 2.3h-.4c-.2-1.5-.8-2.1-2.3-2.3v-.4c1.5-.2 2.1-.8 2.3-2.3z"/></svg>',
    led: '<svg class="ic" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M9.3 1 3 9.2h4.3L6.4 15 13 6.6H8.6z"/></svg>',
    link: '<svg class="ic" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1.5 8h13M4.5 5 1.5 8l3 3M11.5 5l3 3-3 3"/></svg>',
    arrow: '<svg class="ic" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 8h11M9 4l4 4-4 4"/></svg>'
  };

  function modeIcon(mode) {
    if (mode === "human") return '<span class="dot" aria-hidden="true"></span>';
    if (mode === "assisted") return '<span class="ic-ai">' + ICONS.assisted + "</span>";
    if (mode === "led") return '<span class="ic-ai">' + ICONS.led + "</span>";
    return '<span class="ic-bridge">' + ICONS.link + "</span>";
  }

  var MODE_NAMES = { human: "Human-led", assisted: "AI-assisted", led: "AI-led" };

  function pendingMark(key) {
    if (!key) return "";
    var text = (data.pending && data.pending[key]) || "Awaiting confirmation";
    return '<span class="pending-mark" title="Pending ' + esc(key) + ": " + esc(text) + '"></span>';
  }

  function itemList(items) {
    return '<ul class="items">' + (items || []).map(function (it) {
      return '<li title="' + esc(MODE_NAMES[it.mode] || "") + '">' + modeIcon(it.mode) +
        "<span>" + esc(it.text) + pendingMark(it.pending) + "</span></li>";
    }).join("") + "</ul>";
  }

  var nameById = {};
  (data.leadership || []).forEach(function (l) { nameById[l.id] = l.name.split(" /")[0]; });
  (data.functions || []).forEach(function (f) { nameById[f.id] = f.name; });

  function seatsOf(fnId) {
    return (data.seats || []).filter(function (s) { return s.function === fnId; });
  }

  function plural(n, one, many) { return n + " " + (n === 1 ? one : many); }

  /* ---------- sections ---------- */

  function header() {
    var m = data.meta || {};
    var legend = (data.legend || []).map(function (l) {
      return "<span>" + modeIcon(l.mode) + esc(l.label) + "</span>";
    }).join("");
    return '<header class="top">' +
      "<div>" +
        '<div class="eyebrow">' + esc(m.organisation) + " · Current state · " + esc(m.asOf) + "</div>" +
        '<h1 class="title"><span class="t-human">Human</span> + <span class="t-ai">AI</span> ' +
          esc((m.title || "").replace(/^Human \+ AI\s*/, "")) + "</h1>" +
        '<p class="subtitle">' + esc(m.subtitle) + "</p>" +
      "</div>" +
      '<div class="top-right">' +
        '<div class="legend" aria-label="Legend">' + legend + "</div>" +
        '<button class="theme-toggle" type="button" id="themeToggle">Switch theme</button>' +
      "</div>" +
    "</header>";
  }

  function step(n, label, center) {
    return '<div class="step' + (center ? " center" : "") + '"><b>' + n + "</b>" + esc(label) + "</div>";
  }

  function leadership() {
    var cards = (data.leadership || []).map(function (l) {
      var vacant = l.status === "vacant";
      var chips = "";
      if (vacant) chips += '<span class="chip vacant">Seat vacant</span>';
      if (l.interim) chips += '<span class="chip interim">Interim: ' + esc(l.interim) + "</span>";
      return '<article class="lead-card' + (vacant ? " is-vacant" : "") + '">' +
        '<div class="lead-head">' +
          '<div class="avatar' + (vacant ? " vacant" : "") + '">' + ICONS.human + "</div>" +
          '<div class="lead-name">' + esc(l.name) + "</div>" +
        "</div>" +
        (chips ? '<div class="chips">' + chips + "</div>" : "") +
        '<p class="lead-sum">' + esc(l.summary) + "</p>" +
      "</article>";
    }).join("");

    var s = data.strategicLayer || {};
    var strat = '<div class="strat">' +
      '<div class="strat-title">' + esc(s.title) + "</div>" +
      '<div class="strat-side human">' +
        '<div class="side-label human"><span class="ic-human">' + ICONS.human + "</span>Leadership decides</div>" +
        itemList(s.human) +
      "</div>" +
      '<div class="strat-link"><span class="link-dot">' + ICONS.link + "</span></div>" +
      '<div class="strat-side ai">' +
        '<div class="side-label ai"><span class="ic-ai">' + ICONS.assisted + "</span>" + esc(s.aiName || "AI intelligence") + "</div>" +
        itemList(s.ai) +
      "</div>" +
    "</div>";

    return '<section class="lead-wrap">' +
      step(1, "Who leads", true) +
      '<div class="lead-row">' + cards + "</div>" +
      '<div class="vline"></div>' +
      step(2, "How decisions are made", true) +
      strat +
    "</section>";
  }

  function functionCard(f, i) {
    var seats = seatsOf(f.id);
    var humans = seats.filter(function (s) { return s.execution === "human"; });
    var agents = seats.filter(function (s) { return s.execution === "agent"; });
    var vacantRoles = humans.filter(function (s) { return s.status === "vacant"; }).length;

    var chips = "";
    if (f.status === "vacant") chips += '<span class="chip vacant">Lead seat vacant</span>';
    if (f.interim) chips += '<span class="chip interim">Interim: ' + esc(f.interim) + pendingMark(f.pending) + "</span>";
    if (vacantRoles) chips += '<span class="chip vacant">' + plural(vacantRoles, "role", "roles") + " vacant</span>";

    var handoffs = (f.handoffs || []).map(function (h) {
      return '<li><span class="arrow">' + ICONS.arrow + '</span><span><span class="to">' +
        esc(nameById[h.to] || h.to) + "</span> · " + esc(h.what) + "</span></li>";
    }).join("");

    return '<article class="fn" id="fn-' + esc(f.id) + '" style="--col:' + (i + 1) + '">' +
      '<section class="fn-head">' +
        '<h2 class="fn-name">' + esc(f.name) + "</h2>" +
        '<p class="fn-metric"><b>Owns</b>' + esc(f.metric) + "</p>" +
        (chips ? '<div class="chips">' + chips + "</div>" : "") +
      "</section>" +
      '<section class="fn-human">' +
        '<div class="side-label human"><span class="ic-human">' + ICONS.human + "</span>Human team" +
          '<span class="count">Lead + ' + plural(humans.length, "role", "roles") + "</span></div>" +
        itemList(f.human) +
      "</section>" +
      '<section class="fn-ai">' +
        '<span class="fn-link link-dot" title="Human + AI collaboration">' + ICONS.link + "</span>" +
        '<div class="side-label ai"><span class="ic-ai">' + ICONS.assisted + "</span>AI workforce" +
          '<span class="count">' + plural(agents.length, "agent", "agents") + "</span></div>" +
        itemList(f.ai) +
      "</section>" +
      '<section class="fn-foot">' + (handoffs ? "<ul>" + handoffs + "</ul>" : "") + "</section>" +
    "</article>";
  }

  function functions() {
    var fns = data.functions || [];
    var bus = '<div class="bus" aria-hidden="true">' + fns.map(function () { return "<div></div>"; }).join("") + "</div>";
    return '<section class="section" style="margin-top:28px">' +
      step(3, "Where AI works: inside every function", true) +
      '<div class="bus-stem"></div>' + bus +
      '<div class="fn-grid">' +
        '<div class="ai-band" aria-hidden="true"></div>' +
        fns.map(functionCard).join("") +
      "</div>" +
    "</section>";
  }

  function sharedAI() {
    var caps = data.sharedAI || [];
    if (!caps.length) return "";
    var all = (data.functions || []).length;
    return '<section class="section">' +
      step(4, "Shared AI capabilities") +
      '<div class="shared" style="--n:' + caps.length + '">' + caps.map(function (c) {
        var used = c.usedBy && c.usedBy[0] === "all" ? "Every function"
          : (c.usedBy || []).map(function (id) { return nameById[id] || id; }).join(" · ");
        if (c.usedBy && c.usedBy.length === all) used = "Every function";
        return '<div class="shared-cap">' +
          '<div class="shared-name"><span class="ic-ai">' + ICONS.assisted + "</span>" + esc(c.name) + "</div>" +
          '<div class="shared-detail">' + esc(c.detail) + "</div>" +
          '<div class="shared-use">' + esc(used) + "</div>" +
        "</div>";
      }).join("") + "</div>" +
    "</section>";
  }

  function workflows() {
    var flows = data.workflows || [];
    if (!flows.length) return "";
    return '<section class="section">' +
      step(5, "Human in the loop: how work moves") +
      '<div class="flows">' + flows.map(function (fl) {
        var steps = fl.steps.map(function (s, i) {
          var isHuman = s.mode === "human";
          var icon = isHuman ? '<span class="ic-human">' + ICONS.human + "</span>" : modeIcon(s.mode);
          return (i ? '<span class="farrow" aria-hidden="true">' + ICONS.arrow + "</span>" : "") +
            '<div class="fstep ' + (isHuman ? "human" : "ai") + '" title="' + esc(MODE_NAMES[s.mode] || "") + '">' +
              '<span class="fstep-actor">' + icon + esc(s.actor) + "</span>" +
              '<span class="fstep-text">' + esc(s.text) + "</span>" +
            "</div>";
        }).join("");
        return '<div class="flow"><div class="flow-title">' + esc(fl.title) + '</div><div class="flow-steps">' + steps + "</div></div>";
      }).join("") + "</div>" +
    "</section>";
  }

  function footer() {
    var m = data.meta || {};
    var pending = data.pending || {};
    var keys = Object.keys(pending);
    var details = keys.length
      ? "<details><summary>" + plural(keys.length, "assumption", "assumptions") + " awaiting leadership confirmation</summary><ul>" +
        keys.map(function (k) { return "<li><b>" + esc(k) + "</b> " + esc(pending[k]) + "</li>"; }).join("") +
        "</ul></details>"
      : "<span></span>";
    return '<footer class="foot">' + details +
      "<span>" + esc(m.organisation) + " · " + esc(m.version) + " · " + esc(m.classification) + "</span></footer>";
  }

  /* ---------- render ---------- */

  if (data.brand) {
    if (data.brand.human) document.documentElement.style.setProperty("--human", data.brand.human);
    if (data.brand.ai) document.documentElement.style.setProperty("--ai", data.brand.ai);
  }
  document.title = (data.meta && data.meta.organisation ? data.meta.organisation + " · " : "") + "Human + AI Operating Model";

  root.innerHTML = header() + leadership() + functions() + sharedAI() + workflows() + footer();

  /* ---------- theme ---------- */

  var html = document.documentElement;
  try {
    var saved = localStorage.getItem("org-theme");
    if (saved === "light" || saved === "dark") html.setAttribute("data-theme", saved);
  } catch (e) { /* storage unavailable */ }

  document.getElementById("themeToggle").addEventListener("click", function () {
    var current = html.getAttribute("data-theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    var next = current === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    try { localStorage.setItem("org-theme", next); } catch (e) { /* ignore */ }
  });
})();
