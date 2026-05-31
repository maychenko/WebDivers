/* stratagems.js */

// ── Constants ─────────────────────────────────────────────────────────────
const ARROW   = { U:"▲", D:"▼", L:"◄", R:"►" };
const KEY_MAP = { ArrowUp:"U", ArrowDown:"D", ArrowLeft:"L", ArrowRight:"R" };

const CAT_COLOR = {
  ORBITAL:   "#ef4444",
  EAGLE:     "#ffe600",
  DEFENSIVE: "#00d4ff",
  SUPPLY:    "#4ade80",
  MISSION:   "#a78bfa",
};

const ICON_PATH = {
  ORBITAL:   `<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="9" stroke-dasharray="2 3"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2"/>`,
  EAGLE:     `<path d="M12 2l3 7h-2v5h2l-3 3-3-3h2V9H9l3-7z"/><path d="M4 16l4-2M20 16l-4-2"/>`,
  DEFENSIVE: `<path d="M12 2l8 4v6c0 5-8 10-8 10S4 17 4 12V6l8-4z"/><path d="M9 12l2 2 4-4"/>`,
  SUPPLY:    `<rect x="2" y="8" width="20" height="14" rx="1"/><path d="M16 8V6a4 4 0 00-8 0v2"/>`,
  MISSION:   `<polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>`,
};

function makeSVG(cat, cls, size) {
  return `<svg class="${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${CAT_COLOR[cat]}" stroke-width="1.5">${ICON_PATH[cat] || ICON_PATH.ORBITAL}</svg>`;
}

// ── Data ──────────────────────────────────────────────────────────────────
const STRATAGEMS = [
  // ORBITAL
  { id:1,  name:"ORBITAL PRECISION STRIKE",         cat:"ORBITAL",   code:["D","D","R"],                 cooldown:"120s",  uses:"UNLIMITED",   damage:"HIGH",          desc:"Precision orbital shell on target. Maximum accuracy, moderate area of effect." },
  { id:2,  name:"ORBITAL AIRBURST STRIKE",           cat:"ORBITAL",   code:["R","R","U"],                 cooldown:"180s",  uses:"UNLIMITED",   damage:"EXTREME",       desc:"Air-burst munition detonating above target for maximum horizontal fragmentation." },
  { id:3,  name:"ORBITAL 120MM HE BARRAGE",          cat:"ORBITAL",   code:["R","R","D","L","R","D"],     cooldown:"240s",  uses:"UNLIMITED",   damage:"AREA",          desc:"Sustained heavy artillery barrage. High collateral damage. Avoid friendly positions." },
  { id:4,  name:"ORBITAL 380MM HE BARRAGE",          cat:"ORBITAL",   code:["R","D","U","U","L","D","D"], cooldown:"300s",  uses:"UNLIMITED",   damage:"DEVASTATING",   desc:"Heaviest orbital barrage available. Clears entire sectors. Extreme friendly fire risk." },
  { id:5,  name:"ORBITAL LASER",                     cat:"ORBITAL",   code:["R","D","U","R","D"],         cooldown:"300s",  uses:"3 / MISSION", damage:"EXTREME",       desc:"Sustained orbital laser burn. Tracks targets autonomously for limited duration." },
  { id:6,  name:"ORBITAL RAILCANNON STRIKE",         cat:"ORBITAL",   code:["U","R","D","D","R"],         cooldown:"210s",  uses:"UNLIMITED",   damage:"ARMOR PIERCING",desc:"Single hypervelocity kinetic round. Designed for hardened and armored targets." },
  { id:7,  name:"ORBITAL GAS STRIKE",                cat:"ORBITAL",   code:["R","R","D","R"],             cooldown:"75s",   uses:"UNLIMITED",   damage:"DOT",           desc:"Nerve agent dispersal munition. Extended incapacitation of light and medium infantry." },
  { id:8,  name:"ORBITAL EMS STRIKE",                cat:"ORBITAL",   code:["R","R","L","D"],             cooldown:"75s",   uses:"UNLIMITED",   damage:"STUN",          desc:"Electromagnetic suppression round. Immobilizes targets without structural damage." },
  { id:9,  name:"ORBITAL SMOKE STRIKE",              cat:"ORBITAL",   code:["R","R","D","U"],             cooldown:"60s",   uses:"UNLIMITED",   damage:"NONE",          desc:"Multi-spectrum smoke screen. Blocks targeting systems and line of sight." },
  // EAGLE
  { id:10, name:"EAGLE STRAFING RUN",                cat:"EAGLE",     code:["U","R","R"],                 cooldown:"8s",    uses:"4 / REARM",   damage:"MEDIUM",        desc:"Low-altitude gun run with 20mm autocannon. Effective against light and medium targets." },
  { id:11, name:"EAGLE AIRSTRIKE",                   cat:"EAGLE",     code:["U","R","D","R"],             cooldown:"12s",   uses:"4 / REARM",   damage:"HIGH",          desc:"Mk84 general purpose bomb drop. Standard close air support package." },
  { id:12, name:"EAGLE CLUSTER BOMB",                cat:"EAGLE",     code:["U","R","D","D","R"],         cooldown:"22s",   uses:"3 / REARM",   damage:"AREA",          desc:"CBU-97 submunition dispersal. Maximum infantry and light vehicle suppression." },
  { id:13, name:"EAGLE NAPALM AIRSTRIKE",            cat:"EAGLE",     code:["U","R","D","U"],             cooldown:"22s",   uses:"4 / REARM",   damage:"INCENDIARY",    desc:"Mk77 incendiary bomb. Creates sustained fire zone across strike corridor." },
  { id:14, name:"EAGLE SMOKE STRIKE",                cat:"EAGLE",     code:["U","R","U","D"],             cooldown:"8s",    uses:"4 / REARM",   damage:"NONE",          desc:"Aerial smoke canister deployment. Rapid area denial and concealment." },
  { id:15, name:"EAGLE 110MM ROCKET PODS",           cat:"EAGLE",     code:["U","R","U","L"],             cooldown:"22s",   uses:"3 / REARM",   damage:"ARMOR PIERCING",desc:"Unguided high-explosive rocket salvo. Anti-armor and fortification suppression." },
  { id:16, name:"EAGLE 500KG BOMB",                  cat:"EAGLE",     code:["U","R","D","D","D"],         cooldown:"35s",   uses:"2 / REARM",   damage:"EXTREME",       desc:"Single Mk-82 penetrator bomb. Highest single-strike yield in Eagle inventory." },
  // DEFENSIVE
  { id:17, name:"SHIELD GENERATOR RELAY",            cat:"DEFENSIVE", code:["D","D","L","R","L","R"],     cooldown:"90s",   uses:"1 / MISSION", damage:"NONE",          desc:"Deploys stationary energy shield dome. Blocks all incoming fire for extended duration." },
  { id:18, name:"TESLA TOWER",                       cat:"DEFENSIVE", code:["D","R","U","L","U","R"],     cooldown:"150s",  uses:"1 / MISSION", damage:"ELECTRIC",      desc:"Autonomous arc discharge turret. Prioritizes armored targets. Friendly fire hazard." },
  { id:19, name:"MACHINE GUN SENTRY",                cat:"DEFENSIVE", code:["D","U","R","R","U"],         cooldown:"180s",  uses:"1 / MISSION", damage:"MEDIUM",        desc:"Automated 7.62mm defensive emplacement. 360-degree threat acquisition." },
  { id:20, name:"GATLING SENTRY",                    cat:"DEFENSIVE", code:["D","U","R","L"],             cooldown:"180s",  uses:"1 / MISSION", damage:"HIGH",          desc:"Minigun platform. Extreme sustained rate of fire against massed infantry." },
  { id:21, name:"MORTAR SENTRY",                     cat:"DEFENSIVE", code:["D","U","R","R","D"],         cooldown:"180s",  uses:"1 / MISSION", damage:"AREA",          desc:"Autonomous indirect fire emplacement. Engages targets beyond line of sight." },
  { id:22, name:"AUTOCANNON SENTRY",                 cat:"DEFENSIVE", code:["D","U","R","U","L","U"],     cooldown:"180s",  uses:"1 / MISSION", damage:"HIGH",          desc:"40mm autocannon emplacement. Effective against medium armor and aerial targets." },
  { id:23, name:"ROCKET SENTRY",                     cat:"DEFENSIVE", code:["D","U","R","R","L"],         cooldown:"180s",  uses:"1 / MISSION", damage:"ARMOR PIERCING",desc:"Guided missile turret. Primary anti-armor autonomous defense platform." },
  { id:24, name:"EMS MORTAR SENTRY",                 cat:"DEFENSIVE", code:["D","U","R","D","R"],         cooldown:"180s",  uses:"1 / MISSION", damage:"STUN",          desc:"Electromagnetic mortar sentry. Immobilizes approaching targets for follow-up fire." },
  { id:25, name:"ANTI-PERSONNEL MINEFIELD",          cat:"DEFENSIVE", code:["D","L","U","R"],             cooldown:"90s",   uses:"1 / MISSION", damage:"MEDIUM",        desc:"Wide-area AP mine deployment. High-density coverage for perimeter defense." },
  // SUPPLY
  { id:26, name:"SUPPLY PACK",                       cat:"SUPPLY",    code:["D","L","D","U","U","D"],     cooldown:"120s",  uses:"UNLIMITED",   damage:"NONE",          desc:"Personal resupply backpack. Carries 4 resupply charges for self and squad." },
  { id:27, name:"REINFORCE",                         cat:"SUPPLY",    code:["U","D","R","L","U"],         cooldown:"150s",  uses:"UNLIMITED",   damage:"NONE",          desc:"Emergency reinforcement beacon. Calls in replacement Helldiver from destroyer." },
  { id:28, name:"RESUPPLY",                          cat:"SUPPLY",    code:["D","D","U","R"],             cooldown:"150s",  uses:"UNLIMITED",   damage:"NONE",          desc:"Supply crate drop. Restocks squad ammunition and stim injectors." },
  { id:29, name:"SUPER EARTH FLAG",                  cat:"SUPPLY",    code:["D","U","D","U"],             cooldown:"N/A",   uses:"1 / MISSION", damage:"NONE",          desc:"Deploy the flag of Super Earth. Plant it with pride. Democracy made visible." },
  // MISSION
  { id:30, name:"UPLOAD DATA",                       cat:"MISSION",   code:["D","U","R","R","R"],         cooldown:"N/A",   uses:"OBJECTIVE",   damage:"NONE",          desc:"Upload mission critical intelligence data to Super Earth command network." },
  { id:31, name:"ACTIVATE TERMINID CONTROL SYSTEM",  cat:"MISSION",   code:["D","U","L","R","D","D"],     cooldown:"N/A",   uses:"OBJECTIVE",   damage:"NONE",          desc:"Activate planetary E-710 Terminid control array. Mission-critical operation." },
  { id:32, name:"SEISMIC PROBE",                     cat:"MISSION",   code:["U","U","L","R","D","D"],     cooldown:"N/A",   uses:"OBJECTIVE",   damage:"NONE",          desc:"Deploy deep geological survey equipment. Identifies subsurface Terminid nest structures." },
];

// Pre-build joined code strings once
STRATAGEMS.forEach(s => { s._code = s.code.join(""); });

// ── State ─────────────────────────────────────────────────────────────────
const state = {
  selectedId:   null,
  activeFilter: "ALL",
  searchQuery:  "",
  loadout:      [null, null, null, null],
  keySeq:       [],
  keyTimer:     null,
};

// ── DOM refs (cached once) ────────────────────────────────────────────────
const DOM = {
  grid:        document.getElementById("stratGrid"),
  detailEmpty: document.getElementById("detailEmpty"),
  detailSel:   document.getElementById("detailSelected"),
  keySeq:      document.getElementById("keyInputSequence"),
  keyMatch:    document.getElementById("keyMatch"),
  loadSlots:   document.getElementById("loadoutSlots"),
  loadCount:   document.getElementById("loadoutCount"),
  catTabs:     document.getElementById("categoryTabs"),
  search:      document.getElementById("searchInput"),
};

// ── Render: grid ──────────────────────────────────────────────────────────
function renderGrid() {
  const q = state.searchQuery.toUpperCase();
  const frag = document.createDocumentFragment();

  STRATAGEMS.forEach(s => {
    if (state.activeFilter !== "ALL" && s.cat !== state.activeFilter) return;
    if (q && !s.name.includes(q)) return;

    const card = document.createElement("div");
    card.className = "strat-card" + (state.selectedId === s.id ? " selected" : "");
    card.dataset.id = s.id;

    const color = CAT_COLOR[s.cat];
    card.innerHTML =
      `<div class="strat-icon">`
      + makeSVG(s.cat, "strat-icon-svg", 26)
      + `<div class="strat-cat-dot" style="background:${color};box-shadow:0 0 5px ${color}"></div>`
      + `</div>`
      + `<div class="strat-name">${s.name}</div>`
      + `<div class="strat-code">${s.code.map(a => `<span class="arrow">${ARROW[a]}</span>`).join("")}</div>`;

    card.addEventListener("click", () => selectStratagem(s.id));
    frag.appendChild(card);
  });

  DOM.grid.innerHTML = "";
  DOM.grid.appendChild(frag);
}

// ── Render: detail ────────────────────────────────────────────────────────
function renderDetail() {
  if (!state.selectedId) {
    DOM.detailEmpty.classList.remove("hidden");
    DOM.detailSel.classList.remove("visible");
    return;
  }
  const s = STRATAGEMS.find(x => x.id === state.selectedId);
  if (!s) return;

  DOM.detailEmpty.classList.add("hidden");
  DOM.detailSel.classList.add("visible");

  const color     = CAT_COLOR[s.cat];
  const inLoadout = state.loadout.includes(s.id);

  DOM.detailSel.innerHTML =
    `<div class="detail-icon-large">${makeSVG(s.cat, "detail-icon-svg", 44)}</div>`
    + `<div class="detail-strat-cat" style="color:${color}">${s.cat} ASSET</div>`
    + `<div class="detail-strat-name">${s.name}</div>`
    + `<div class="detail-code-label">ACTIVATION CODE</div>`
    + `<div class="detail-code">${s.code.map(a => `<div class="detail-arrow">${ARROW[a]}</div>`).join("")}</div>`
    + `<div class="detail-divider"></div>`
    + `<div class="detail-stats">`
    +   row("COOLDOWN",    s.cooldown, color)
    +   row("USES",        s.uses)
    +   row("DAMAGE TYPE", s.damage,  color)
    + `</div>`
    + `<div class="detail-desc">${s.desc}</div>`
    + `<button class="detail-activate-btn${inLoadout ? " remove" : ""}" data-id="${s.id}">`
    +   (inLoadout ? "REMOVE FROM LOADOUT" : "ADD TO LOADOUT")
    + `</button>`;

  DOM.detailSel.querySelector(".detail-activate-btn")
    .addEventListener("click", () => toggleLoadout(s.id));
}

function row(label, val, color) {
  return `<div class="detail-stat-row">`
    + `<span class="detail-stat-label">${label}</span>`
    + `<span class="detail-stat-val"${color ? ` style="color:${color}"` : ""}>${val}</span>`
    + `</div>`;
}

function selectStratagem(id) {
  state.selectedId = id;
  DOM.grid.querySelectorAll(".strat-card").forEach(c => {
    c.classList.toggle("selected", +c.dataset.id === id);
  });
  renderDetail();
}

// ── Render: loadout ───────────────────────────────────────────────────────
function renderLoadout() {
  const filled = state.loadout.filter(Boolean).length;
  DOM.loadCount.textContent = `${filled} / 4 SLOTS`;

  const frag = document.createDocumentFragment();
  state.loadout.forEach((id, i) => {
    const slot = document.createElement("div");
    slot.className = "loadout-slot" + (id ? " filled" : "");
    slot.innerHTML = `<div class="loadout-slot-num">${i + 1}</div>`;

    if (id) {
      const s = STRATAGEMS.find(x => x.id === id);
      slot.innerHTML +=
        makeSVG(s.cat, "", 22)
        + `<div class="loadout-slot-name">${s.name}</div>`
        + `<div class="loadout-remove" data-idx="${i}">X</div>`;
    } else {
      slot.innerHTML +=
        `<div class="loadout-slot-empty">+</div>`
        + `<div class="loadout-slot-name" style="opacity:.2">EMPTY</div>`;
    }
    frag.appendChild(slot);
  });

  DOM.loadSlots.innerHTML = "";
  DOM.loadSlots.appendChild(frag);
}

function toggleLoadout(id) {
  const idx = state.loadout.indexOf(id);
  if (idx >= 0) {
    state.loadout[idx] = null;
  } else {
    const empty = state.loadout.indexOf(null);
    if (empty >= 0) state.loadout[empty] = id;
  }
  renderLoadout();
  renderDetail();
}

// ── Events ────────────────────────────────────────────────────────────────
DOM.catTabs.addEventListener("click", e => {
  const tab = e.target.closest(".cat-tab");
  if (!tab) return;
  DOM.catTabs.querySelectorAll(".cat-tab").forEach(t => t.classList.remove("active"));
  tab.classList.add("active");
  state.activeFilter = tab.dataset.cat;
  renderGrid();
});

DOM.search.addEventListener("input", e => {
  state.searchQuery = e.target.value;
  renderGrid();
});

DOM.loadSlots.addEventListener("click", e => {
  const btn = e.target.closest(".loadout-remove");
  if (!btn) return;
  state.loadout[+btn.dataset.idx] = null;
  renderLoadout();
  renderDetail();
});

// ── Keyboard input ────────────────────────────────────────────────────────
document.addEventListener("keydown", e => {
  const dir = KEY_MAP[e.key];
  if (!dir) return;
  e.preventDefault();

  state.keySeq.push(dir);
  if (state.keySeq.length > 8) state.keySeq.shift();

  clearTimeout(state.keyTimer);
  state.keyTimer = setTimeout(() => {
    state.keySeq = [];
    DOM.keySeq.innerHTML = "";
    DOM.keyMatch.textContent = "";
  }, 3000);

  DOM.keySeq.innerHTML = state.keySeq.map(k => `<div class="key-input-arrow">${ARROW[k]}</div>`).join("");
  checkKeyMatch();
});

function checkKeyMatch() {
  const seq = state.keySeq.join("");

  for (const s of STRATAGEMS) {
    if (seq.endsWith(s._code)) {
      DOM.keyMatch.style.color = "var(--green)";
      DOM.keyMatch.textContent = "MATCHED: " + s.name;
      selectStratagem(s.id);
      setTimeout(() => {
        state.keySeq = [];
        DOM.keySeq.innerHTML = "";
        DOM.keyMatch.textContent = "";
      }, 1500);
      return;
    }
  }

  const partials = STRATAGEMS.filter(s => s._code.startsWith(seq.slice(-s._code.length)));
  DOM.keyMatch.style.color = "var(--yellow)";
  DOM.keyMatch.textContent = partials.length
    ? `${partials.length} POTENTIAL MATCH${partials.length > 1 ? "ES" : ""}`
    : "";
}

// ── Init ──────────────────────────────────────────────────────────────────
renderGrid();
renderLoadout();