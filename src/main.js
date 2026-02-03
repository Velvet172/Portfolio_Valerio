import "./style.css";

/* =========================
   CONFIG
========================= */
const BASE = import.meta.env.BASE_URL; // es: "/Portfolio_Valerio/"
const asset = (p) => `${BASE}${p.replace(/^\/+/, "")}`; // normalizza
const ENABLE_PAGES = false; // quando vorrai 2 pagine: metti true

/* =========================
   DOM
========================= */
const introEl = document.getElementById("wiiIntro");
let appStarted = false;
const grid = document.getElementById("grid");
const boardEl = document.getElementById("board");
const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");

const btnLeft = document.getElementById("btnLeft"); // audio
const btnRight = document.getElementById("btnRight"); // minigame

const overlay = document.getElementById("wiiOverlay");
const overlayBack = document.getElementById("overlayBack");
const overlayTitle = document.getElementById("overlayTitle");
const overlayBody = document.getElementById("overlayBody");

const pointerEl = document.getElementById("wiiPointer");
const imgViewer = document.getElementById("imgViewer");
const imgViewerSrc = document.getElementById("imgViewerSrc");

/* =========================
   HELPERS
========================= */
function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

/* =========================
   DATA (GRID)
========================= */
const pages = [
  [
    {
      icon: "🧩",
      t: "Progetti",
      s: "Case study e lavori",
      href: "#projects",
      previews: [
        asset("img/PROGETTI/PROG_1.jpg"),
        asset("img/PROGETTI/PROG_2.jpg"),
        asset("img/PROGETTI/PROG_3.jpg"),
      ],
    },
    { icon: "🎬", t: "Video", s: "Reel e underwater", href: "#videos" },
    {
      icon: "👋",
      t: "Chi sono",
      s: "Bio + competenze",
      href: "#about",
      previews: [
        asset("img/BIO/BIO_1.jpg"),
        asset("img/BIO/BIO_2.jpg"),
        asset("img/BIO/BIO_3.jpg"),
      ],
    },
    { icon: "✉️", t: "Contatti", s: "Mail e social", href: "#contact" },

    { icon: "🛞", t: "Automotive", s: "Officina / brand", href: "#auto" },
    { icon: "🌊", t: "Underwater", s: "Riprese sub", href: "#underwater" },
    { icon: "🎥", t: "Social", s: "Reel / ads", href: "#social" },
    { icon: "🧠", t: "AI", s: "Workflow", href: "#ai" },

    { icon: "📌", t: "Servizi", s: "Cosa offro", href: "#services" },
    { icon: "🏁", t: "Esperienze", s: "Pista / progetti", href: "#exp" },
    { icon: "🧰", t: "Tool", s: "Setup", href: "#tools" },
    { icon: "⭐️", t: "Highlight", s: "Selezionati", href: "#high" },
  ],
  [
    { icon: "📷", t: "Galleria", s: "Foto e frame", href: "#gallery" },
    { icon: "🗂️", t: "Archivio", s: "Lavori passati", href: "#archive" },
    { icon: "📝", t: "Blog", s: "Note e making-of", href: "#blog" },
    { icon: "📍", t: "Dove sono", s: "Roma / contatti", href: "#where" },
  ],
];

let pageIndex = 0;
let suppressClickUntil = 0;

function getCurrentItems() {
  return ENABLE_PAGES ? pages[pageIndex] : pages[0];
}

function renderPage() {
  if (!grid) return;
  const items = getCurrentItems();

  grid.innerHTML = items
    .map((x) => {
      const previews = Array.isArray(x.previews) ? x.previews : [];
      const previewHtml = previews.length
        ? `
          <div class="wii-preview" aria-hidden="true">
            ${previews.map((src) => `<img src="${src}" alt="" loading="lazy" decoding="async">`).join("")}
          </div>
        `
        : "";

      return `
        <a class="wii-tile" href="${x.href}" data-href="${x.href}">
          ${previewHtml}
          <div class="wii-tileContent">
            <div class="wii-icon">${x.icon}</div>
            <div class="wii-tileText">
              <div class="wii-title">${x.t}</div>
              <div class="wii-sub">${x.s}</div>
            </div>
          </div>
        </a>
      `;
    })
    .join("");
}

/* =========================
   CLOCK
========================= */
function tickClock() {
  if (!timeEl || !dateEl) return;

  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  timeEl.textContent = `${hh}:${mm}`;

  const weekdays = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"];
  const months = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"];
  const dd = now.getDate();
  const wd = weekdays[now.getDay()];
  const mo = months[now.getMonth()];
  dateEl.textContent = `${wd} ${dd} ${mo}`;
}

/* =========================
   AUDIO (UI + MUSIC)
========================= */
let audioCtx = null;
let audioEnabled = true;
let audioUnlocked = false;
let lastHoverSoundAt = 0;

function ensureAudio() {
  if (!audioEnabled) return null;
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === "suspended") audioCtx.resume().catch(() => {});
  return audioCtx;
}

function unlockAudio() {
  const ctx = ensureAudio();
  if (!ctx) return;

  if (ctx.state === "suspended") ctx.resume().catch(() => {});

  // iOS: serve un suono "muto" per sbloccare l'audio
  try {
    const buffer = ctx.createBuffer(1, 1, ctx.sampleRate);
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.connect(ctx.destination);
    src.start(0);
  } catch {}
}

function unlockAudioOnce() {
  if (audioUnlocked) return;
  audioUnlocked = true;
  unlockAudio();
}

function beep({ type = "sine", freq = 700, duration = 0.05, gain = 0.04, attack = 0.002, release = 0.035 } = {}) {
  const ctx = ensureAudio();
  if (!ctx) return;

  const t0 = ctx.currentTime;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);

  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(gain, t0 + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + attack + release);

  osc.connect(g);
  g.connect(ctx.destination);

  osc.start(t0);
  osc.stop(t0 + duration + release + 0.02);
}

function hoverSound() {
  const now = performance.now();
  if (now - lastHoverSoundAt < 120) return;
  lastHoverSoundAt = now;
  beep({ type: "sine", freq: 880, duration: 0.03, gain: 0.026, attack: 0.002, release: 0.03 });
}

function clickSound() {
  beep({ type: "triangle", freq: 520, duration: 0.03, gain: 0.05, attack: 0.001, release: 0.02 });
}

/* --- Background music (procedurale) --- */
let musicNodes = null;

function startMusic() {
  const ctx = ensureAudio();
  if (!ctx || musicNodes) return;

  const musicGain = ctx.createGain();
  musicGain.gain.value = 0.0;
  musicGain.connect(ctx.destination);

  const delay = ctx.createDelay(0.35);
  delay.delayTime.value = 0.18;

  const fb = ctx.createGain();
  fb.gain.value = 0.20;
  delay.connect(fb);
  fb.connect(delay);

  const delayMix = ctx.createGain();
  delayMix.gain.value = 0.25;

  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 2600;
  lp.Q.value = 0.7;

  lp.connect(musicGain);
  lp.connect(delay);
  delay.connect(delayMix);
  delayMix.connect(musicGain);

  const drone = ctx.createOscillator();
  drone.type = "sine";
  drone.frequency.value = 130.81;

  const droneGain = ctx.createGain();
  droneGain.gain.value = 0.0001;
  drone.connect(droneGain);
  droneGain.connect(lp);

  const lfo = ctx.createOscillator();
  lfo.type = "sine";
  lfo.frequency.value = 0.08;

  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 0.007;
  lfo.connect(lfoGain);
  lfoGain.connect(droneGain.gain);

  const t0 = ctx.currentTime;
  drone.start(t0);
  lfo.start(t0);

  function bellNote(freq, when, vel = 0.05) {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    const hp = ctx.createBiquadFilter();

    o.type = "triangle";
    o.frequency.setValueAtTime(freq, when);

    hp.type = "highpass";
    hp.frequency.setValueAtTime(240, when);

    g.gain.setValueAtTime(0.0001, when);
    g.gain.exponentialRampToValueAtTime(vel, when + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, when + 0.22);

    o.connect(hp);
    hp.connect(g);
    g.connect(lp);

    o.start(when);
    o.stop(when + 0.30);
  }

  function bassNote(freq, when, vel = 0.018) {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    const lp2 = ctx.createBiquadFilter();

    o.type = "sine";
    o.frequency.setValueAtTime(freq, when);

    lp2.type = "lowpass";
    lp2.frequency.setValueAtTime(520, when);

    g.gain.setValueAtTime(0.0001, when);
    g.gain.exponentialRampToValueAtTime(vel, when + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, when + 0.18);

    o.connect(lp2);
    lp2.connect(g);
    g.connect(lp);

    o.start(when);
    o.stop(when + 0.22);
  }

  const chords = [
    { tones: [261.63, 329.63, 392.0], bass: 130.81 },
    { tones: [349.23, 440.0, 523.25], bass: 174.61 },
    { tones: [220.0, 261.63, 329.63], bass: 110.0 },
    { tones: [196.0, 246.94, 293.66], bass: 98.0 },
  ];

  const patterns = [
    [0, 1, 2, 1, 0, 2, 1, 2],
    [0, 2, 1, 2, 0, 1, 2, 1],
    [0, 1, 0, 2, 1, 2, 1, 0],
  ];

  const stepMs = 300;
  const stepsPerBar = 8;
  const barsPerChord = 2;

  let stepIndex = 0;
  let barIndex = 0;
  let chordIndex = 0;
  let patternIndex = 0;

  function step() {
    if (!audioEnabled || !audioCtx || !musicNodes) return;

    const now = audioCtx.currentTime;
    const chord = chords[chordIndex % chords.length];
    const pat = patterns[patternIndex % patterns.length];

    const posInBar = stepIndex % stepsPerBar;
    const toneIdx = pat[posInBar] % chord.tones.length;
    const freq = chord.tones[toneIdx];

    const vel = posInBar === 0 ? 0.058 : posInBar === 4 ? 0.050 : 0.040;

    bellNote(freq, now + 0.01, vel);
    if (posInBar === 0) bassNote(chord.bass, now + 0.01, 0.016);
    if (Math.random() < 0.10) bellNote(freq * 2, now + 0.06, 0.026);

    stepIndex += 1;

    if (stepIndex % stepsPerBar === 0) {
      barIndex += 1;
      if (barIndex % 2 === 0) patternIndex = (patternIndex + 1) % patterns.length;
      if (barIndex % barsPerChord === 0) chordIndex = (chordIndex + 1) % chords.length;
    }

    musicNodes.timerId = window.setTimeout(step, stepMs);
  }

  musicNodes = { musicGain, lp, delay, fb, delayMix, drone, droneGain, lfo, timerId: null };
  step();

  musicGain.gain.setTargetAtTime(0.400, ctx.currentTime, 0.7);
}

function stopMusic() {
  if (!audioCtx || !musicNodes) return;

  const t = audioCtx.currentTime;
  if (musicNodes.timerId) clearTimeout(musicNodes.timerId);

  musicNodes.musicGain.gain.setTargetAtTime(0.0001, t, 0.25);

  setTimeout(() => {
    try { musicNodes.drone?.stop(); } catch {}
    try { musicNodes.lfo?.stop(); } catch {}
    musicNodes = null;
  }, 400);
}

if (btnLeft) {
  btnLeft.textContent = "🔊";
  btnLeft.addEventListener("click", () => {
    audioEnabled = !audioEnabled;
    btnLeft.textContent = audioEnabled ? "🔊" : "🔇";
    if (!audioEnabled) stopMusic();
    else {
      unlockAudioOnce();
      unlockAudio();
      startMusic();
      clickSound();
    }
  });
}
if (btnRight) btnRight.textContent = "🎮";

/* sblocca audio al primo gesto utente (iOS/Safari) */
["pointerdown", "touchstart", "mousedown"].forEach((evt) => {
  window.addEventListener(
    evt,
    () => {
      if (!audioEnabled) return;
      unlockAudioOnce();
      startMusic();
    },
    { once: true, passive: true }
  );
});

/* =========================
   OVERLAY: PROJECTS (carousel + more)
========================= */
const overlayState = {
  href: null,
  projectIndex: 0,
  slideIndex: 0,
  dom: null, // cache carousel nodes
};
let bioCarouselTimer = null;

const channelContent = {
  "#projects": {
    title: "Progetti",
    projects: [
      {
        id: "bestof",
        slides: [
          {
            src: asset("img/PROGETTI/PROG_1.jpg"),
            client: "Sunsilk",
            title: "Testata Home 2025",
            what: "Creativity + layout",
            moreHtml: `
              <h3 class="chMoreTitle">Sunsilk — Testata Home</h3>
              <p class="chMoreText">Contenuto segnaposto: contesto, obiettivi, ruolo, output.</p>
            `,
          },
          {
            src: asset("img/PROGETTI/PROG_2.jpg"),
            client: "M&M’s / UCI",
            title: "Screentime Cinema",
            what: "Layout + output ADV",
            moreHtml: `
              <h3 class="chMoreTitle">M&M’s / UCI — Screentime</h3>
              <p class="chMoreText">Contenuto segnaposto: obiettivi, ruoli, risultati.</p>
            `,
          },
          {
            src: asset("img/PROGETTI/PROG_3.jpg"),
            client: "Cliente",
            title: "Visual",
            what: "Creativity / design",
            moreHtml: `
              <h3 class="chMoreTitle">Visual</h3>
              <p class="chMoreText">Contenuto segnaposto: contesto, obiettivo, delivery.</p>
            `,
          },
          {
            src: asset("img/PROGETTI/PROG_4.jpg"),
            client: "Snickers / Twix",
            title: "Cover Adattamento",
            what: "Visual + layout",
            moreHtml: `
              <h3 class="chMoreTitle">Snickers / Twix</h3>
              <p class="chMoreText">Contenuto segnaposto: brief, processo, risultato.</p>
            `,
          },
          {
            src: asset("img/PROGETTI/PROG_5.jpg"),
            client: "Compeed",
            title: "Volantino Stop Brufoli",
            what: "Print / layout",
            moreHtml: `
              <h3 class="chMoreTitle">Compeed — Volantino</h3>
              <p class="chMoreText">Contenuto segnaposto: obiettivi, stile, output.</p>
            `,
          },
          {
            src: asset("img/PROGETTI/PROG_6.jpg"),
            client: "Boem",
            title: "Visual",
            what: "Brand / creative",
            moreHtml: `
              <h3 class="chMoreTitle">Boem</h3>
              <p class="chMoreText">Contenuto segnaposto: concept e direzione visiva.</p>
            `,
          },
          {
            src: asset("img/PROGETTI/PROG_7.jpg"),
            client: "Landing",
            title: "Carousel",
            what: "UI / layout",
            moreHtml: `
              <h3 class="chMoreTitle">Landing Carousel</h3>
              <p class="chMoreText">Contenuto segnaposto: UX e output.</p>
            `,
          },
          {
            src: asset("img/PROGETTI/PROG_8.jpg"),
            client: "Cartolina",
            title: "Fronte",
            what: "Print / design",
            moreHtml: `
              <h3 class="chMoreTitle">Cartolina</h3>
              <p class="chMoreText">Contenuto segnaposto: concept e delivery.</p>
            `,
          },
          {
            src: asset("img/PROGETTI/PROG_9.jpg"),
            client: "Control",
            title: "Visual",
            what: "Brand / layout",
            moreHtml: `
              <h3 class="chMoreTitle">Control</h3>
              <p class="chMoreText">Contenuto segnaposto: obiettivo e output.</p>
            `,
          },
          {
            src: asset("img/PROGETTI/PROG_10.jpg"),
            client: "Amuchina",
            title: "Hai Vinto",
            what: "Campaign / visual",
            moreHtml: `
              <h3 class="chMoreTitle">Amuchina — Hai Vinto</h3>
              <p class="chMoreText">Contenuto segnaposto: campagna e risultati.</p>
            `,
          },
          {
            src: asset("img/PROGETTI/PROG_11.jpg"),
            client: "Campagna",
            title: "Hai Vinto",
            what: "Visual / layout",
            moreHtml: `
              <h3 class="chMoreTitle">Hai Vinto</h3>
              <p class="chMoreText">Contenuto segnaposto: brief e output.</p>
            `,
          },
          {
            src: asset("img/PROGETTI/PROG_12.jpg"),
            client: "Testata Home",
            title: "Visual",
            what: "Layout / design",
            moreHtml: `
              <h3 class="chMoreTitle">Testata Home</h3>
              <p class="chMoreText">Contenuto segnaposto: versione e varianti.</p>
            `,
          },
          {
            src: asset("img/PROGETTI/PROG_13.jpg"),
            client: "UILtemp",
            title: "App Site Play",
            what: "UI / layout",
            moreHtml: `
              <h3 class="chMoreTitle">UILtemp — App Site</h3>
              <p class="chMoreText">Contenuto segnaposto: UX, UI, output.</p>
            `,
          },
        ],
      },
    ],
  },

  "#videos": {
    title: "Video",
    html: `
      <div class="wii-card">
        <h3>Showreel</h3>
        <p>Link, embed o thumbs. (Poi mettiamo Vimeo/YouTube).</p>
      </div>
      <div class="wii-card">
        <h3>Underwater</h3>
        <p>Sezione dedicata alle immersioni e riprese sub.</p>
      </div>
    `,
  },

  "#about": {
    title: "Chi sono",
    html: `
      <div class="wii-card bio-card">
        <div class="bioCarousel" aria-label="Chi sono - carosello">
          <img class="bioMedia" src="${asset("img/BIO/BIO_1.jpg")}" alt="" loading="lazy" decoding="async">
          <img class="bioMedia" src="${asset("img/BIO/BIO_2.jpg")}" alt="" loading="lazy" decoding="async">
          <img class="bioMedia" src="${asset("img/BIO/BIO_3.jpg")}" alt="" loading="lazy" decoding="async">
        </div>
        <div class="bioDesc">
          <h3>Chi sono</h3>
          <p>Qui inserisco una breve descrizione bio e competenze (segnaposto).</p>
        </div>
      </div>
    `,
  },

  "#contact": {
    title: "Contatti",
    html: `
      <div class="wii-card">
        <h3>Scrivimi</h3>
        <p>Email, Instagram, WhatsApp business…</p>
      </div>
    `,
  },

  "#minigame": {
    title: "Bubble Pop",
    html: `
      <div class="mg">
        <div class="mgHud">
          <div class="mgStats">
            <div class="mgStat"><span>Punteggio:</span> <b id="mgScore">0</b></div>
            <div class="mgStat"><span>Tempo:</span> <b id="mgTime">30</b>s</div>
          </div>

          <div class="mgBtns">
            <button class="wii-pill" id="mgStart" type="button">Start</button>
            <button class="wii-pill" id="mgReset" type="button">Reset</button>
          </div>
        </div>

        <div class="mgStage">
          <canvas id="mgCanvas" width="900" height="520" style="width:100%; height:auto; display:block;"></canvas>

          <div class="mgOver" id="mgOver" aria-hidden="true">
            <div class="mgOverPanel">
              <div class="mgOverTitle">Game Over</div>
              <div class="mgOverSub">Punteggio: <b id="mgOverScore">0</b></div>

              <div class="mgOverBtns">
                <button class="wii-pill" id="mgOverRestart" type="button">Restart</button>
                <button class="wii-pill" id="mgOverClose" type="button">Close</button>
              </div>
            </div>
          </div>
        </div>

        <div class="mgHelp">Clicca le bolle prima che scadano i 30 secondi.</div>
      </div>
    `,
  },
};

function renderProjectsCarousel() {
  if (!overlayBody) return;
  const data = channelContent["#projects"];
  const project = data.projects[overlayState.projectIndex] || data.projects[0];
  const slides = project?.slides || [];
  if (!slides.length) return;

  overlayState.slideIndex = clamp(overlayState.slideIndex, 0, slides.length - 1);

 overlayBody.innerHTML = `
  <div class="chCarousel" data-channel="#projects">
    <div class="chStage">
      <div class="chFrame" data-ch-frame>
        ${slides
          .map(
            (sl, i) => `
              <img class="chMedia ${i === overlayState.slideIndex ? "is-on" : ""}"
                   src="${sl.src}" alt="" loading="lazy" decoding="async">
            `
          )
          .join("")}

        <div class="chMore" aria-hidden="true">
          <div class="chMoreContent"></div>
        </div>
      </div>

      <div class="chCaption">
        <div class="chClient" data-cap="client"></div>
        <div class="chTitle" data-cap="title"></div>
        <div class="chWhat" data-cap="what"></div>

        <div class="chActions">
          <button class="wii-pill" data-ch="prev" type="button">◀</button>
          <button class="wii-pill" data-ch="next" type="button">▶</button>
          <button class="wii-pill" data-ch="more" type="button">Scopri di più</button>
        </div>
      </div>
    </div>
  </div>
`;

  const dom = {
    frame: overlayBody.querySelector("[data-ch-frame]"),
    imgs: Array.from(overlayBody.querySelectorAll(".chMedia")),
    more: overlayBody.querySelector(".chMore"),
    moreContent: overlayBody.querySelector(".chMoreContent"),
    capClient: overlayBody.querySelector('[data-cap="client"]'),
    capTitle: overlayBody.querySelector('[data-cap="title"]'),
    capWhat: overlayBody.querySelector('[data-cap="what"]'),
  };
  overlayState.dom = dom;

  applyProjectSlideUI(slides, overlayState.slideIndex);
  const btnMore = overlayBody.querySelector('[data-ch="more"]');
if (btnMore) btnMore.textContent = "Scopri di più";

}

function applyProjectSlideUI(slides, idx) {
  const sl = slides[idx];
  const dom = overlayState.dom;
  if (!sl || !dom) return;

  if (dom.capClient) dom.capClient.textContent = sl.client || "";
  if (dom.capTitle) dom.capTitle.textContent = sl.title || "";
  if (dom.capWhat) dom.capWhat.textContent = sl.what || "";

  if (dom.frame) {
    dom.frame.style.setProperty("--ch-bg", `url("${sl.src}")`);
  }

  if (dom.moreContent) dom.moreContent.innerHTML = sl.moreHtml || "";
}

function isMoreOpen() {
  return !!overlayState.dom?.frame?.classList.contains("is-more");
}

function openMore(slides) {
  const dom = overlayState.dom;
  if (!dom?.frame || !dom?.more) return;

  dom.frame.classList.add("is-more"); // questa classe triggera il blur (CSS)
  dom.more.classList.add("is-open");
  dom.more.setAttribute("aria-hidden", "false");
  applyProjectSlideUI(slides, overlayState.slideIndex);
}

function closeMore() {
  const dom = overlayState.dom;
  if (!dom?.frame || !dom?.more) return;

  dom.frame.classList.remove("is-more");
  dom.more.classList.remove("is-open");
  dom.more.setAttribute("aria-hidden", "true");
}

/* =========================
   BIO carousel (auto)
========================= */
function setupBioCarousel() {
  stopBioCarousel();

  const frame = overlayBody?.querySelector(".bioCarousel");
  const card = overlayBody?.querySelector(".wii-card");
  const imgs = frame ? Array.from(frame.querySelectorAll(".bioMedia")) : [];
  if (!frame || !imgs.length) return;

  if (card) card.classList.add("bio-no-blur");

  let idx = 0;
  const apply = () => {
    imgs.forEach((img, i) => img.classList.toggle("is-on", i === idx));
    const src = imgs[idx]?.getAttribute("src");
    if (src) frame.style.setProperty("--bio-bg", `url("${src}")`);
  };

  apply();
  bioCarouselTimer = window.setInterval(() => {
    idx = (idx + 1) % imgs.length;
    apply();
  }, 3000);

  if (card) card.classList.add("bio-no-blur");
}

function stopBioCarousel() {
  if (bioCarouselTimer) {
    clearInterval(bioCarouselTimer);
    bioCarouselTimer = null;
  }
}

/* =========================
   OVERLAY open/close
========================= */
function openChannel(href) {
  if (!overlay || !overlayTitle || !overlayBody) return;

  overlayState.href = href;

  // reset overlay mode classes
  overlay.classList.toggle("is-game", href === "#minigame");
  overlay.classList.toggle("is-carousel", href === "#projects");

  const data = channelContent[href] || {
    title: "Canale",
    html: `<div class="wii-card"><h3>Coming soon</h3><p>Contenuto in arrivo.</p></div>`,
  };

  overlayTitle.textContent = data.title;

  // Projects carousel
  if (href === "#projects" && data.projects) {
    overlayState.projectIndex = 0;
    overlayState.slideIndex = 0;
    overlayState.dom = null;
    renderProjectsCarousel();
  } else if (href === "#about") {
    overlayBody.innerHTML = data.html || "";
    setupBioCarousel();
  } else {
    overlayBody.innerHTML = data.html || "";
  }

  overlay.classList.add("is-open");
  overlay.setAttribute("aria-hidden", "false");

  if (href === "#minigame") {
    requestAnimationFrame(() => {
      const ok = mgSetupDom();
      if (ok) mgReset();
    });
  } else {
    mgStop(false);
  }

  clickSound();
}

function closeChannel() {
  if (!overlay) return;

  closeMore();
  mgStop(false);
  stopBioCarousel();

  overlay.classList.remove("is-open", "is-game", "is-carousel");
  overlay.setAttribute("aria-hidden", "true");

  clickSound();
}

if (overlayBack) overlayBack.addEventListener("click", closeChannel);

/* =========================
   Image viewer (full size)
========================= */
function openImageViewer(src) {
  if (!imgViewer || !imgViewerSrc || !src) return;
  imgViewerSrc.src = src;
  imgViewer.classList.add("is-open");
  imgViewer.setAttribute("aria-hidden", "false");
}
function closeImageViewer() {
  if (!imgViewer || !imgViewerSrc) return;
  imgViewer.classList.remove("is-open");
  imgViewer.setAttribute("aria-hidden", "true");
  imgViewerSrc.src = "";
}
if (imgViewer) {
  imgViewer.addEventListener("click", closeImageViewer);
}

if (overlay) {
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeChannel();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && imgViewer?.classList.contains("is-open")) {
    closeImageViewer();
    return;
  }
  if (e.key === "Escape" && overlay?.classList.contains("is-open")) closeChannel();
});

/* click tile -> overlay */
document.addEventListener("click", (e) => {
  if (!appStarted) return;
  if (ENABLE_PAGES && performance.now() < suppressClickUntil) {
    e.preventDefault();
    e.stopPropagation();
    return;
  }

  const tile = e.target?.closest?.(".wii-tile");
  if (!tile) return;

  const href = tile.getAttribute("data-href") || tile.getAttribute("href");
  if (href && href.startsWith("#")) {
    e.preventDefault();
    openChannel(href);
  }
});

/* btnRight: minigame */
if (btnRight) {
  btnRight.addEventListener("click", (e) => {
    if (!appStarted) return;
    e.preventDefault();
    openChannel("#minigame");
  });
}

/* Overlay body events (projects controls + click to close more) */
overlayBody?.addEventListener("click", (e) => {
  // Full image viewer: only for Projects carousel
  if (overlayState.href === "#projects") {
    const frameEl = e.target?.closest?.("[data-ch-frame]");
    if (frameEl) {
      const currentImg = overlayState.dom?.imgs?.find((img) =>
        img.classList.contains("is-on")
      );
      const src = currentImg?.getAttribute("src");
      if (src) {
        e.preventDefault();
        e.stopPropagation();
        openImageViewer(src);
        return;
      }
    }
  }

  const btn = e.target?.closest?.("[data-ch]");
  const action = btn?.getAttribute("data-ch");

  // click sul frame mentre "more" è aperto -> chiudi (ma NON se clicchi sui bottoni)
  const frame = e.target?.closest?.("[data-ch-frame]");
  if (frame && isMoreOpen() && !btn) {
    closeMore();
    const btnMore = overlayBody.querySelector('[data-ch="more"]');
    if (btnMore) btnMore.textContent = "Scopri di più";
    return;
  }

  // se non è un bottone del carousel, fine
  if (!action) return;

  // solo projects
  if (overlayState.href !== "#projects") return;

  const data = channelContent["#projects"];
  const project = data.projects[overlayState.projectIndex] || data.projects[0];
  const slides = project?.slides || [];
  if (!slides.length) return;

  // TOGGLE sullo stesso bottone
  if (action === "more") {
    if (isMoreOpen()) {
      closeMore();
      btn.textContent = "Scopri di più";
    } else {
      openMore(slides);
      btn.textContent = "Chiudi";
    }
    return;
  }

  // se navighi (prev/next) mentre "more" è aperto, chiudilo e resetta testo
  if (action === "prev" || action === "next") {
    if (isMoreOpen()) {
      closeMore();
      const btnMore = overlayBody.querySelector('[data-ch="more"]');
      if (btnMore) btnMore.textContent = "Scopri di più";
    }

    if (action === "prev") {
      overlayState.slideIndex =
        (overlayState.slideIndex - 1 + slides.length) % slides.length;
    } else {
      overlayState.slideIndex =
        (overlayState.slideIndex + 1) % slides.length;
    }

    // update media + caption
    overlayState.dom?.imgs?.forEach((img, i) =>
      img.classList.toggle("is-on", i === overlayState.slideIndex)
    );
    applyProjectSlideUI(slides, overlayState.slideIndex);
    return;
  }
});


/* =========================
   PAGES (ready for later)
========================= */
function swooshTo(newIndex, dir) {
  if (!grid) return;

  grid.classList.remove("is-swoosh-in", "is-swoosh-out-left", "is-swoosh-out-right");
  grid.classList.add(dir === "left" ? "is-swoosh-out-left" : "is-swoosh-out-right");

  window.setTimeout(() => {
    pageIndex = newIndex;
    renderPage();
    grid.classList.remove("is-swoosh-out-left", "is-swoosh-out-right");
    void grid.offsetWidth;
    grid.classList.add("is-swoosh-in");
  }, 230);
}

function goNextPage() {
  const newIndex = (pageIndex + 1) % pages.length;
  swooshTo(newIndex, "left");
}
function goPrevPage() {
  const newIndex = (pageIndex - 1 + pages.length) % pages.length;
  swooshTo(newIndex, "right");
}

if (ENABLE_PAGES && boardEl) {
  let startX = 0;
  let startY = 0;
  let tracking = false;

  boardEl.addEventListener("pointerdown", (e) => {
    if (overlay?.classList.contains("is-open")) return;
    tracking = true;
    startX = e.clientX;
    startY = e.clientY;
    try { boardEl.setPointerCapture(e.pointerId); } catch {}
  });

  boardEl.addEventListener("pointerup", (e) => {
    if (!tracking) return;
    tracking = false;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const TH = 70;

    if (Math.abs(dx) > TH && Math.abs(dx) > Math.abs(dy)) {
      suppressClickUntil = performance.now() + 350;
      if (dx < 0) goNextPage();
      else goPrevPage();
    }
  });

  boardEl.addEventListener("pointercancel", () => {
    tracking = false;
  });
}

/* =========================
   POINTER (Wii cursor)
========================= */
let tx = 0, ty = 0;
let cx = 0, cy = 0;
let visible = false;
let lastPointerType = "mouse";
let currentHoverEl = null;

function showPointer() {
  if (!pointerEl) return;
  if (!visible) {
    visible = true;
    pointerEl.style.opacity = "1";
  }
}
function hidePointer() {
  if (!pointerEl) return;
  visible = false;
  pointerEl.style.opacity = "0";
}

function animatePointer() {
  cx += (tx - cx) * 0.18;
  cy += (ty - cy) * 0.18;

  const offsetX = -10;
  const offsetY = -4;

  if (pointerEl) pointerEl.style.transform = `translate3d(${cx + offsetX}px, ${cy + offsetY}px, 0)`;
  requestAnimationFrame(animatePointer);
}
requestAnimationFrame(animatePointer);

window.addEventListener("pointermove", (e) => {
  lastPointerType = e.pointerType || "mouse";
  if (lastPointerType !== "mouse") {
    hidePointer();
    return;
  }
  tx = e.clientX;
  ty = e.clientY;
  showPointer();
});

window.addEventListener("mouseleave", () => hidePointer());

const hoverSelector = ".wii-tile, .wii-pill";

function setHover(on) {
  if (!pointerEl) return;
  pointerEl.classList.toggle("is-hover", on);
}

document.addEventListener("pointerover", (e) => {
  if (lastPointerType !== "mouse") return;
  const clickable = e.target?.closest?.(hoverSelector);
  if (!clickable) return;
  if (clickable === currentHoverEl) return;

  currentHoverEl = clickable;
  setHover(true);
  hoverSound();
});

document.addEventListener("pointerout", (e) => {
  const clickable = e.target?.closest?.(hoverSelector);
  if (!clickable) return;

  if (clickable === currentHoverEl) {
    const toEl = e.relatedTarget;
    if (toEl && clickable.contains(toEl)) return;
    currentHoverEl = null;
    setHover(false);
  }
});

document.addEventListener("pointerdown", () => {
  if (audioEnabled) {
    unlockAudioOnce();
    unlockAudio();
    startMusic();
  }
  if (!pointerEl || lastPointerType !== "mouse") return;
  pointerEl.classList.add("is-down");
  clickSound();
});

document.addEventListener("pointerup", () => {
  if (!pointerEl) return;
  pointerEl.classList.remove("is-down");
});

/* =========================
   MINIGAME: Bubble Pop
   (il tuo codice invariato)
========================= */
let mg = {
  running: false,
  score: 0,
  timeLeft: 30,
  lastTs: 0,
  spawnAcc: 0,
  bubbles: [],
  rafId: null,
  timerId: null,
  canvas: null,
  ctx: null,
  scoreEl: null,
  timeEl: null,
  overEl: null,
  overScoreEl: null,
  overRestartBtn: null,
  overCloseBtn: null,
};

function mgHideGameOver() {
  if (!mg.overEl) return;
  mg.overEl.classList.remove("is-show");
  mg.overEl.setAttribute("aria-hidden", "true");
}
function mgShowGameOver() {
  if (!mg.overEl) return;
  if (mg.overScoreEl) mg.overScoreEl.textContent = String(mg.score);
  mg.overEl.classList.add("is-show");
  mg.overEl.setAttribute("aria-hidden", "false");
}

function mgSetupDom() {
  mg.canvas = document.getElementById("mgCanvas");
  mg.scoreEl = document.getElementById("mgScore");
  mg.timeEl = document.getElementById("mgTime");

  mg.overEl = document.getElementById("mgOver");
  mg.overScoreEl = document.getElementById("mgOverScore");
  mg.overRestartBtn = document.getElementById("mgOverRestart");
  mg.overCloseBtn = document.getElementById("mgOverClose");

  const startBtn = document.getElementById("mgStart");
  const resetBtn = document.getElementById("mgReset");

  if (!mg.canvas) return false;
  mg.ctx = mg.canvas.getContext("2d");

  mgHideGameOver();

  if (mg.overRestartBtn) {
    mg.overRestartBtn.onclick = () => {
      mgReset();
      mgStart();
    };
  }
  if (mg.overCloseBtn) {
    mg.overCloseBtn.onclick = () => closeChannel();
  }

  mg.canvas.onpointerdown = (e) => {
    if (!mg.running) return;

    const rect = mg.canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * mg.canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * mg.canvas.height;

    for (let i = mg.bubbles.length - 1; i >= 0; i--) {
      const b = mg.bubbles[i];
      const dx = x - b.x;
      const dy = y - b.y;
      if (dx * dx + dy * dy <= b.r * b.r) {
        mg.bubbles.splice(i, 1);
        mg.score += 1;
        if (mg.scoreEl) mg.scoreEl.textContent = String(mg.score);
        mgPopSound();
        return;
      }
    }
  };

  if (startBtn) startBtn.onclick = () => mgStart();
  if (resetBtn) resetBtn.onclick = () => mgReset();

  mgResizeCanvasForHiDpi();
  return true;
}

function mgResizeCanvasForHiDpi() {
  if (!mg.canvas) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const cssW = mg.canvas.clientWidth;
  const cssH = mg.canvas.clientHeight;
  if (!cssW || !cssH) return;

  const targetW = Math.round(cssW * dpr);
  const targetH = Math.round(cssH * dpr);

  if (mg.canvas.width !== targetW || mg.canvas.height !== targetH) {
    mg.canvas.width = targetW;
    mg.canvas.height = targetH;
  }
}

function mgReset() {
  mgStop(false);
  mgHideGameOver();
  mg.score = 0;
  mg.timeLeft = 30;
  mg.bubbles = [];
  if (mg.scoreEl) mg.scoreEl.textContent = "0";
  if (mg.timeEl) mg.timeEl.textContent = "30";
  mgDraw();
}

function mgStart() {
  if (mg.running) return;
  if (mg.timeLeft <= 0) mgReset();

  mgHideGameOver();
  mg.running = true;
  mg.lastTs = performance.now();
  mg.spawnAcc = 0;

  mg.timerId = window.setInterval(() => {
    if (!mg.running) return;
    mg.timeLeft -= 1;
    if (mg.timeEl) mg.timeEl.textContent = String(mg.timeLeft);

    if (mg.timeLeft <= 0) {
      mg.timeLeft = 0;
      if (mg.timeEl) mg.timeEl.textContent = "0";
      mgStop(true);
    }
  }, 1000);

  mg.rafId = requestAnimationFrame(mgLoop);
}

function mgStop(isGameOver = false) {
  mg.running = false;

  if (mg.timerId) {
    clearInterval(mg.timerId);
    mg.timerId = null;
  }
  if (mg.rafId) {
    cancelAnimationFrame(mg.rafId);
    mg.rafId = null;
  }

  if (isGameOver) {
    mgShowGameOver();
    mgGameOverSound();
  }
}

function mgSpawnBubble() {
  if (!mg.canvas) return;
  const w = mg.canvas.width;
  const h = mg.canvas.height;

  const r = 22 + Math.random() * 26;
  const x = r + Math.random() * (w - r * 2);
  const y = r + Math.random() * (h - r * 2);

  const vx = (-0.25 + Math.random() * 0.5) * (window.devicePixelRatio || 1);
  const vy = (-0.15 + Math.random() * 0.35) * (window.devicePixelRatio || 1);

  const life = 3.2 + Math.random() * 1.8;
  mg.bubbles.push({ x, y, r, vx, vy, born: performance.now(), life });
}

function mgLoop(ts) {
  if (!mg.running) return;

  const dt = Math.min((ts - mg.lastTs) / 1000, 0.05);
  mg.lastTs = ts;

  mgResizeCanvasForHiDpi();

  const difficulty = 1 + (30 - mg.timeLeft) * 0.03;
  const spawnEvery = 0.55 / difficulty;

  mg.spawnAcc += dt;
  while (mg.spawnAcc >= spawnEvery) {
    mg.spawnAcc -= spawnEvery;
    mgSpawnBubble();
  }

  const now = performance.now();
  for (let i = mg.bubbles.length - 1; i >= 0; i--) {
    const b = mg.bubbles[i];
    b.x += b.vx * 60 * dt;
    b.y += b.vy * 60 * dt;

    if (b.x - b.r < 0) { b.x = b.r; b.vx *= -1; }
    if (b.x + b.r > mg.canvas.width) { b.x = mg.canvas.width - b.r; b.vx *= -1; }
    if (b.y - b.r < 0) { b.y = b.r; b.vy *= -1; }
    if (b.y + b.r > mg.canvas.height) { b.y = mg.canvas.height - b.r; b.vy *= -1; }

    if ((now - b.born) / 1000 > b.life) mg.bubbles.splice(i, 1);
  }

  mgDraw();
  mg.rafId = requestAnimationFrame(mgLoop);
}

function mgDraw() {
  if (!mg.ctx || !mg.canvas) return;

  const ctx = mg.ctx;
  const w = mg.canvas.width;
  const h = mg.canvas.height;

  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "rgba(255,255,255,0.22)";
  ctx.fillRect(0, 0, w, h);

  for (const b of mg.bubbles) {
    const g = ctx.createRadialGradient(
      b.x - b.r * 0.35, b.y - b.r * 0.35, b.r * 0.2,
      b.x, b.y, b.r
    );
    g.addColorStop(0, "rgba(255,255,255,0.95)");
    g.addColorStop(0.35, "rgba(255,255,255,0.35)");
    g.addColorStop(1, "rgba(43,184,255,0.18)");

    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fillStyle = g;
    ctx.fill();

    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(43,184,255,0.35)";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(b.x - b.r * 0.25, b.y - b.r * 0.25, b.r * 0.28, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.28)";
    ctx.fill();
  }
}

function mgPopSound() {
  const ctx = ensureAudio();
  if (!ctx) return;

  const t0 = ctx.currentTime;
  const o = ctx.createOscillator();
  const g = ctx.createGain();

  o.type = "sine";
  o.frequency.setValueAtTime(620, t0);
  o.frequency.exponentialRampToValueAtTime(280, t0 + 0.06);

  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(0.08, t0 + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.10);

  o.connect(g);
  g.connect(ctx.destination);

  o.start(t0);
  o.stop(t0 + 0.12);
}

function mgGameOverSound() {
  const ctx = ensureAudio();
  if (!ctx) return;

  const t0 = ctx.currentTime;
  const notes = [880, 740, 622];

  notes.forEach((f, i) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();

    const t = t0 + i * 0.12;
    o.type = "triangle";
    o.frequency.setValueAtTime(f, t);

    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.06, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);

    o.connect(g);
    g.connect(ctx.destination);

    o.start(t);
    o.stop(t + 0.18);
  });
}

window.addEventListener("resize", () => {
  if (document.getElementById("mgCanvas")) mgResizeCanvasForHiDpi();
});
function startApp() {
  if (appStarted) return;
  appStarted = true;

  // chiudi intro
  if (introEl) {
    introEl.classList.add("is-hidden");
    introEl.setAttribute("aria-hidden", "true");
  }

  // audio: se vuoi far partire subito la musica al “click per iniziare”
  // (se preferisci che la musica parta solo col tuo bottone 🔊, commenta queste 2 righe)
  if (audioEnabled) {
    unlockAudioOnce();
    unlockAudio();
    startMusic();
  }

  clickSound();
}

function bindIntro() {
  if (!introEl) {
    appStarted = true;
    return;
  }

  // click/tap ovunque sull’intro
  introEl.addEventListener("click", (e) => {
    e.preventDefault();
    startApp();
  });
  introEl.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    startApp();
  });

  // tastiera: Enter / Space
  window.addEventListener("keydown", (e) => {
    if (appStarted) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      startApp();
    }
  });
}

/* =========================
   Viewport height fix (iOS/embedded browsers)
========================= */
function setViewportUnit() {
  const vh = window.visualViewport?.height || window.innerHeight;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

/* =========================
   INIT
========================= */
renderPage();
if (grid) grid.classList.add("is-swoosh-in");

tickClock();
setInterval(tickClock, 1000);
bindIntro();

setViewportUnit();
window.addEventListener("resize", setViewportUnit);
window.visualViewport?.addEventListener("resize", setViewportUnit);
