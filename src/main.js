import "./style.css";

/* =========================
   CONFIG
========================= */
const BASE = import.meta.env.BASE_URL; // es: "/Portfolio_Valerio/"
const asset = (p) => `${BASE}${p.replace(/^\/+/, "")}`; // normalizza
const ENABLE_PAGES = false; // quando vorrai 2 pagine: metti true
const MOBILE_MQ = window.matchMedia("(max-width: 640px)");
const REDUCED_MOTION_MQ = window.matchMedia("(prefers-reduced-motion: reduce)");

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
const videoViewer = document.getElementById("videoViewer");
const videoViewerSrc = document.getElementById("videoViewerSrc");
let videoPreviewItems = [];

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
    {
      icon: "🎓",
      t: "Esperienze",
      s: "Formazione / studi",
      href: "#exp",
    },
    {
      icon: "📬",
      t: "Contatti",
      s: "Mail e social",
      href: "#contact",
    },

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
    {
      icon: "📱",
      t: "Social",
      s: "I miei profili",
      href: "#social",
    },
    {
      icon: "🎬",
      t: "Video",
      s: "Social e progetti",
      href: "#videos",
      previewAnim: "wiiPreviewFadeTight",
      previews: [
        asset("img/CHANNELS/VIDEO/VIDEO PROMO_3-frame.jpg"),
        asset("img/CHANNELS/VIDEO/meschia-cover.jpg"),
        asset("img/CHANNELS/VIDEO/PROGETTI PERSONALI_2-frame.jpg"),
        asset("img/CHANNELS/VIDEO/REQUIEM LOCANDINA.jpg"),
      ],
    },

    {
      icon: "🛠️",
      t: "Skills",
      s: "Cosa so fare",
      href: "#tools",
    },
    {
      icon: "🤖",
      t: "AI",
      s: "Workflow",
      href: "#ai",
      previewVideo: {
        src: asset("img/CHANNELS/ai.mp4"),
        poster: asset("img/CHANNELS/ai-frame.jpg"),
      },
    },
    {
      icon: "📌",
      t: "Servizi",
      s: "Cosa offro",
      href: "#services",
      previewVideo: {
        src: asset("img/CHANNELS/servizi.mp4"),
        poster: asset("img/CHANNELS/servizi-frame.jpg"),
      },
    },
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
const INTRO_SUPPRESS_MS = 420;
const INTRO_HIDE_DELAY_MS = 320;
const INTRO_LOCK_MS = 900;

function getCurrentItems() {
  return ENABLE_PAGES ? pages[pageIndex] : pages[0];
}

function renderPage() {
  if (!grid) return;
  const items = getCurrentItems();

  grid.innerHTML = items
    .map((x) => {
      const hasVideoPreview = x.previewVideo?.src;
      const videoPoster = x.previewVideo?.poster;
      const previews = Array.isArray(x.previews) ? x.previews : [];
      const hasIconPreview = !hasVideoPreview && !previews.length;
      const tileClass = hasIconPreview ? "wii-tile wii-tile--iconPreview" : "wii-tile";
      const posterAttr = videoPoster ? ` poster="${videoPoster}"` : "";
      const posterStyle = videoPoster ? ` style="--preview-poster:url('${videoPoster}')"` : "";
      const previewStyle =
        previews.length > 1
          ? ` style="--preview-step:3s; --preview-duration:${previews.length * 3}s${x.previewAnim ? `; --preview-anim:${x.previewAnim}` : ""}"`
          : "";
      const previewHtml = hasVideoPreview
        ? `
          <div class="wii-preview wii-preview--single wii-preview--video"${posterStyle} aria-hidden="true">
            <video class="preview-video" src="${x.previewVideo.src}"${posterAttr} muted loop playsinline preload="metadata"></video>
          </div>
        `
        : previews.length
        ? `
          <div class="wii-preview ${previews.length === 1 ? "wii-preview--single" : ""}"${previewStyle} aria-hidden="true">
            ${previews.map((src) => `<img src="${src}" alt="" loading="lazy" decoding="async">`).join("")}
          </div>
        `
        : `
          <div class="wii-preview wii-preview--icon" aria-hidden="true">
            <span>${x.icon}</span>
          </div>
        `;

      return `
        <a class="${tileClass}" href="${x.href}" data-href="${x.href}">
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

  setupTilePreviewPhases();
  setupTileVideoPreviews();
  setTileVideoZooms();
  updateVideoPreviewPlayback();
}

function setupTilePreviewPhases() {
  if (!grid) return;

  const previews = Array.from(grid.querySelectorAll(".wii-preview:not(.wii-preview--single)"));
  previews.forEach((preview, idx) => {
    // Keep same cycle duration, but shift phase per tile so carousels are not synchronized.
    const styles = window.getComputedStyle(preview);
    const duration = parseFloat(styles.getPropertyValue("--preview-duration")) || 12;
    const step = parseFloat(styles.getPropertyValue("--preview-step")) || 4;
    const phase = ((idx + 1) * step * 1.618) % duration;
    preview.style.setProperty("--preview-phase", `-${phase.toFixed(2)}s`);
  });
}

function setTileVideoZooms() {
  if (!grid) return;

  const previews = Array.from(grid.querySelectorAll(".wii-preview--video"));
  previews.forEach((preview) => {
    const tile = preview.closest(".wii-tile");
    if (!tile) return;

    const rect = tile.getBoundingClientRect();
    if (!rect.height) return;

    const ratio = rect.width / rect.height;
    const zoom = Math.max(1, Math.min(ratio, 16 / 9));
    preview.style.setProperty("--video-zoom", zoom.toFixed(3));
  });
}

function setupTileVideoPreviews() {
  if (!grid) return;

  const previews = Array.from(grid.querySelectorAll(".wii-preview--video"));
  videoPreviewItems = [];
  previews.forEach((preview) => {
    const tile = preview.closest(".wii-tile");
    if (!tile) return;

    const video = preview.querySelector(".preview-video");
    if (!video) return;

    videoPreviewItems.push({ preview, video });

    video.muted = true;
    video.loop = true;
    video.setAttribute("playsinline", "");

    // Ensure the first frame is visible when paused
    const onReady = () => {
      preview.classList.add("is-ready");
      if (video.paused) {
        try { video.currentTime = 0; } catch {}
      }
    };
    video.addEventListener("loadeddata", onReady, { once: true });

    const startVid = () => {
      preview.classList.add("is-hover");
      video.currentTime = 0;
      video.play().catch(() => {});
    };
    const stopVid = () => {
      video.pause();
      video.currentTime = 0;
      preview.classList.remove("is-hover");
    };

    tile.addEventListener("mouseenter", startVid);
    tile.addEventListener("mouseleave", stopVid);
    tile.addEventListener("pointerenter", startVid);
    tile.addEventListener("pointerleave", stopVid);
    tile.addEventListener("focusin", startVid);
    tile.addEventListener("focusout", stopVid);
  });
}

function updateVideoPreviewPlayback() {
  const autoPlay = MOBILE_MQ.matches && !REDUCED_MOTION_MQ.matches;
  videoPreviewItems.forEach(({ preview, video }) => {
    if (autoPlay) {
      preview.classList.add("is-auto");
      video.play().catch(() => {});
    } else {
      preview.classList.remove("is-auto");
      video.pause();
      try { video.currentTime = 0; } catch {}
    }
  });
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
let resumeMusicAfterVideo = false;

function startMusic() {
  const ctx = ensureAudio();
  if (!ctx || musicNodes) return;

  const musicGain = ctx.createGain();
  musicGain.gain.value = 0.0;
  musicGain.connect(ctx.destination);

  const toneBus = ctx.createGain();
  toneBus.gain.value = 0.82;

  const toneFilter = ctx.createBiquadFilter();
  toneFilter.type = "lowpass";
  toneFilter.frequency.value = 3100;
  toneFilter.Q.value = 0.55;

  const delay = ctx.createDelay(0.8);
  delay.delayTime.value = 0.36;

  const fb = ctx.createGain();
  fb.gain.value = 0.18;
  const delayMix = ctx.createGain();
  delayMix.gain.value = 0.34;

  toneBus.connect(toneFilter);
  toneFilter.connect(musicGain);
  toneFilter.connect(delay);
  delay.connect(fb);
  fb.connect(delay);
  delay.connect(delayMix);
  delayMix.connect(musicGain);

  const t0 = ctx.currentTime;

  const air = ctx.createOscillator();
  air.type = "sine";
  air.frequency.value = 261.63;

  const airGain = ctx.createGain();
  airGain.gain.value = 0.0001;

  const airLfo = ctx.createOscillator();
  airLfo.type = "sine";
  airLfo.frequency.value = 0.045;

  const airLfoGain = ctx.createGain();
  airLfoGain.gain.value = 0.012;

  air.connect(airGain);
  airLfo.connect(airLfoGain);
  airLfoGain.connect(airGain.gain);
  airGain.connect(toneBus);
  air.start(t0);
  airLfo.start(t0);
  airGain.gain.setTargetAtTime(0.010, t0 + 0.2, 1.8);

  function ping(freq, when, vel = 0.035, length = 0.34) {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    const hp = ctx.createBiquadFilter();

    o.type = "sine";
    o.frequency.setValueAtTime(freq, when);
    o.frequency.exponentialRampToValueAtTime(freq * 1.004, when + length);

    hp.type = "highpass";
    hp.frequency.setValueAtTime(420, when);

    g.gain.setValueAtTime(0.0001, when);
    g.gain.exponentialRampToValueAtTime(vel, when + 0.018);
    g.gain.exponentialRampToValueAtTime(0.0001, when + length);

    o.connect(hp);
    hp.connect(g);
    g.connect(toneBus);

    o.start(when);
    o.stop(when + length + 0.04);
  }

  function chordBloom(freqs, when, vel = 0.018) {
    freqs.forEach((freq, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      const lp2 = ctx.createBiquadFilter();

      o.type = i === 1 ? "triangle" : "sine";
      o.frequency.setValueAtTime(freq, when);
      o.detune.setValueAtTime((i - 1) * 4, when);

      lp2.type = "lowpass";
      lp2.frequency.setValueAtTime(1350, when);

      g.gain.setValueAtTime(0.0001, when);
      g.gain.exponentialRampToValueAtTime(vel, when + 0.12 + i * 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, when + 1.7);

      o.connect(lp2);
      lp2.connect(g);
      g.connect(toneBus);
      o.start(when);
      o.stop(when + 1.9);
    });
  }

  function bubble(freq, when, vel = 0.016) {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    const bp = ctx.createBiquadFilter();

    o.type = "triangle";
    o.frequency.setValueAtTime(freq * 0.72, when);
    o.frequency.exponentialRampToValueAtTime(freq, when + 0.16);

    bp.type = "bandpass";
    bp.frequency.setValueAtTime(freq * 2.2, when);
    bp.Q.setValueAtTime(1.2, when);

    g.gain.setValueAtTime(0.0001, when);
    g.gain.exponentialRampToValueAtTime(vel, when + 0.025);
    g.gain.exponentialRampToValueAtTime(0.0001, when + 0.30);

    o.connect(bp);
    bp.connect(g);
    g.connect(toneBus);
    o.start(when);
    o.stop(when + 0.34);
  }

  function bassPuff(freq, when, vel = 0.012) {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    const lp2 = ctx.createBiquadFilter();

    o.type = "sine";
    o.frequency.setValueAtTime(freq, when);
    o.frequency.exponentialRampToValueAtTime(freq * 0.995, when + 0.42);

    lp2.type = "lowpass";
    lp2.frequency.setValueAtTime(360, when);

    g.gain.setValueAtTime(0.0001, when);
    g.gain.exponentialRampToValueAtTime(vel, when + 0.04);
    g.gain.exponentialRampToValueAtTime(0.0001, when + 0.48);

    o.connect(lp2);
    lp2.connect(g);
    g.connect(toneBus);

    o.start(when);
    o.stop(when + 0.52);
  }

  function hush(when, vel = 0.006) {
    const len = Math.max(1, Math.floor(ctx.sampleRate * 0.08));
    const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < len; i += 1) {
      const fade = 1 - i / len;
      data[i] = (Math.random() * 2 - 1) * fade * fade * fade;
    }

    const src = ctx.createBufferSource();
    const g = ctx.createGain();
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 5200;

    g.gain.setValueAtTime(vel, when);
    g.gain.exponentialRampToValueAtTime(0.0001, when + 0.09);

    src.buffer = buffer;
    src.connect(hp);
    hp.connect(g);
    g.connect(toneBus);
    src.start(when);
  }

  const palette = [
    { chord: [261.63, 329.63, 392.0], bass: 130.81, motif: [392.0, 523.25, 493.88, 329.63] },
    { chord: [293.66, 369.99, 440.0], bass: 146.83, motif: [440.0, 587.33, 554.37, 369.99] },
    { chord: [220.0, 329.63, 392.0], bass: 110.0, motif: [329.63, 440.0, 392.0, 261.63] },
    { chord: [246.94, 293.66, 392.0], bass: 123.47, motif: [392.0, 493.88, 587.33, 493.88] },
  ];

  const phrase = [
    { beat: 0, kind: "chord" },
    { beat: 1, kind: "lead", note: 0 },
    { beat: 2.5, kind: "bubble", note: 1 },
    { beat: 4, kind: "lead", note: 2 },
    { beat: 5.5, kind: "hush" },
    { beat: 7, kind: "lead", note: 3 },
    { beat: 8, kind: "chord" },
    { beat: 9.5, kind: "bubble", note: 2 },
    { beat: 11, kind: "lead", note: 1 },
    { beat: 13.5, kind: "hush" },
  ];

  const beatMs = 380;
  const phraseBeats = 16;
  let phraseIndex = 0;

  function schedulePhrase() {
    if (!audioEnabled || !audioCtx || !musicNodes) return;

    const now = audioCtx.currentTime + 0.03;
    const section = palette[phraseIndex % palette.length];
    const nextSection = palette[(phraseIndex + 1) % palette.length];

    air.frequency.setTargetAtTime(section.chord[0], now, 0.8);
    bassPuff(section.bass, now + 0.02, 0.010);

    phrase.forEach((event) => {
      const when = now + event.beat * (beatMs / 1000);
      if (event.kind === "chord") {
        chordBloom(event.beat >= 8 ? nextSection.chord : section.chord, when, 0.014);
        bassPuff(event.beat >= 8 ? nextSection.bass : section.bass, when + 0.04, 0.009);
        return;
      }

      if (event.kind === "lead") {
        const note = section.motif[event.note % section.motif.length];
        ping(note, when, event.beat === 1 ? 0.038 : 0.030, 0.42);
        if (Math.random() < 0.35) ping(note * 1.5, when + 0.18, 0.014, 0.28);
        return;
      }

      if (event.kind === "bubble") {
        bubble(section.motif[event.note % section.motif.length], when, 0.014);
        return;
      }

      hush(when, 0.005);
    });

    if (Math.random() < 0.55) {
      const note = section.motif[Math.floor(Math.random() * section.motif.length)];
      bubble(note * 2, now + (14.5 + Math.random()) * (beatMs / 1000), 0.010);
    }

    phraseIndex += 1;
    musicNodes.timerId = window.setTimeout(schedulePhrase, phraseBeats * beatMs);
  }

  musicNodes = {
    musicGain,
    toneBus,
    toneFilter,
    delay,
    fb,
    delayMix,
    air,
    airGain,
    airLfo,
    timerId: null,
  };
  schedulePhrase();

  musicGain.gain.setTargetAtTime(0.360, ctx.currentTime, 0.9);
}

function stopMusic() {
  if (!audioCtx || !musicNodes) return;

  const t = audioCtx.currentTime;
  if (musicNodes.timerId) clearTimeout(musicNodes.timerId);

  musicNodes.musicGain.gain.setTargetAtTime(0.0001, t, 0.25);

  setTimeout(() => {
    try { musicNodes.air?.stop(); } catch {}
    try { musicNodes.airLfo?.stop(); } catch {}
    musicNodes = null;
  }, 400);
}

if (btnLeft) {
  btnLeft.textContent = "🔊";
  btnLeft.addEventListener("click", () => {
    if (!appStarted) return;
    if (performance.now() < suppressClickUntil) return;
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
  videoSectionId: null,
};
let bioCarouselTimer = null;
const LINKEDIN_PROFILE_URL = "https://www.linkedin.com/in/valerio-serani-682a48215/";
const INSTAGRAM_URL = "https://www.instagram.com/velvet_172/";
const TIKTOK_URL = "https://www.tiktok.com/@heyits172";
const VIMEO_URL = "https://vimeo.com/user95787021";
const BEHANCE_URL = "https://www.behance.net/velvet172";
const EMAIL = "valerioserani@gmail.com";
const PHONE = "+39 3469697747";

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
            title: "Materiali promozionali",
            what: "Creativity + layout",
            moreHtml: `
              <h3 class="chMoreTitle">Sunsilk — Testata Home</h3>
              <p class="chMoreText">Ho lavorato al riadattamento degli asset forniti per Smartwin su mobile, mantenendo coerenza visiva e leggibilità tra formati. In diverse occasioni ho curato anche siti dedicati alle promozioni, con focus su gerarchia, adattamento della testata e chiarezza in home.</p>
            `,
          },
          {
            src: asset("img/PROGETTI/PROG_2.jpg"),
            client: "M&M’s / UCI",
            title: "Screentime Cinema",
            what: "Layout + output video",
            moreHtml: `
              <h3 class="chMoreTitle">M&M’s / UCI — Screentime</h3>
              <p class="chMoreText">Studio ADV dedicato al formato cinema: impaginazione del messaggio, bilanciamento brand/prodotto e sviluppo dell'output definitivo, un video promozionale trasmesso negli UCI Cinema italiani.</p>
            `,
          },
          {
            src: asset("img/PROGETTI/PROG_3.jpg"),
            client: "PAM",
            title: "Sito + materiale promozionale",
            what: "Creativity / design",
            moreHtml: `
              <h3 class="chMoreTitle">PAM — San Valentino</h3>
              <p class="chMoreText">Concept visual con approccio design-first: direzione creativa, composizione e sviluppo dell'output definitivo, un sito promozionale speciale dedicato a San Valentino.</p>
            `,
          },
          {
            src: asset("img/PROGETTI/PROG_4.jpg"),
            client: "Snickers / Twix",
            title: "Cover Adattamento",
            what: "Visual + layout",
            moreHtml: `
              <h3 class="chMoreTitle">Snickers / Twix</h3>
              <p class="chMoreText">Visual ideato per la back cover di un magazine di settore: adattamento multi-brand con attenzione a consistenza grafica, impatto del key visual e coerenza tra linee prodotto.</p>
            `,
          },
          {
            src: asset("img/PROGETTI/PROG_5.jpg"),
            client: "Compeed",
            title: "Materiale promozionale",
            what: "Print / layout",
            moreHtml: `
              <h3 class="chMoreTitle">Compeed — Volantino</h3>
              <p class="chMoreText">Materiale print orientato alla conversione: struttura informativa chiara, call to action evidente e visual di supporto al messaggio.</p>
            `,
          },
          {
            src: asset("img/PROGETTI/PROG_6.jpg"),
            client: "Boem",
            title: "Materiale promozionale",
            what: "Brand / creative",
            moreHtml: `
              <h3 class="chMoreTitle">Boem</h3>
              <p class="chMoreText">Con Boem ci sono state diverse occasioni di lavoro: materiale print, diversi siti e materiale promozionale, mantenendo coerenza visiva tra formati e punti di contatto.</p>
            `,
          },
          {
            src: asset("img/PROGETTI/PROG_7.jpg"),
            client: "L'Or x Ferrari Hypercar",
            title: "UX/UI + materiale promozionale",
            what: "Materiale print + landing",
            moreHtml: `
              <h3 class="chMoreTitle">L'Or x Ferrari Hypercar</h3>
              <p class="chMoreText">Ho lavorato al visual della campagna promozionale italiana, confrontandomi direttamente con Ferrari e L'Or per mantenere coerenza tra identità, tono e materiali di comunicazione. L'output finale è stato un sito dedicato alla partecipazione alla promozione.</p>
            `,
          },
          {
            src: asset("img/PROGETTI/PROG_8.jpg"),
            client: "Degustazioni a corte",
            title: "Produzione materiali evento",
            what: "Print / design",
            moreHtml: `
              <h3 class="chMoreTitle">Degustazioni a corte</h3>
              <p class="chMoreText">Ho curato tutti i materiali necessari all'evento "Degustazioni a corte": cartoline, photo frame, striscioni e altri supporti di comunicazione, rinnovando anche il logo per l'edizione 2025.</p>
            `,
          },
          {
            src: asset("img/PROGETTI/PROG_9.jpg"),
            client: "Control",
            title: "Materiale promozionale",
            what: "Brand / layout",
            moreHtml: `
              <h3 class="chMoreTitle">Control</h3>
              <p class="chMoreText">Con Control ci sono state diverse occasioni di lavoro: materiali promozionali, siti, visual di campagna e adattamenti di volantini, sviluppati mantenendo coerenza con le direttive del brand e chiarezza sui diversi formati.</p>
            `,
          },
          {
            src: asset("img/PROGETTI/PROG_10.jpg"),
            client: "Amuchina",
            title: "Materiale promozionale",
            what: "Campaign / visual",
            moreHtml: `
              <h3 class="chMoreTitle">Amuchina - materiale promozionale</h3>
              <p class="chMoreText">Layout e sviluppo di materiali promozionali per Winsmart, adattando i visual di campagna per accompagnare il sito a cui è legata la promozione.</p>
            `,
          },
          {
            src: asset("img/PROGETTI/PROG_11.jpg"),
            client: "Mentadent",
            title: "Materiali promozionali",
            what: "Visual / layout",
            moreHtml: `
              <h3 class="chMoreTitle">Mentadent — materiali promozionali</h3>
              <p class="chMoreText">Ho adattato il visual di campagna in materiali Winsmart per una promozione legata al "mese della prevenzione", mantenendo coerenza grafica, leggibilità e chiarezza del messaggio.</p>
            `,
          },
          {
            src: asset("img/PROGETTI/PROG_12.jpg"),
            client: "Snickers",
            title: "Materiale promozionale",
            what: "Layout + video promozionale",
            moreHtml: `
              <h3 class="chMoreTitle">Snickers - materiale promozionale</h3>
              <p class="chMoreText">Ho lavorato alla creazione di materiali Winsmart e video promozionali per la campagna, curando adattamenti visual, layout e output pensati per mantenere il messaggio chiaro e riconoscibile sui diversi formati.</p>
            `,
          },
          {
            src: asset("img/PROGETTI/PROG_13.jpg"),
            client: "UILtemp",
            title: "App Site Play",
            what: "UI / layout",
            moreHtml: `
              <h3 class="chMoreTitle">UILtemp — App Site</h3>
              <p class="chMoreText">Case UI/layout per sito-app: struttura delle sezioni, chiarezza d'uso e coerenza visiva tra componenti. Ho lavorato anche a diversi materiali print, mantenendo continuità tra comunicazione digitale e supporti fisici.</p>
            `,
          },
        ],
      },
    ],
  },

  "#videos": {
    title: "Video",
    sections: [
      {
        id: "winsmart",
        title: "Video promozionali / Winsmart",
        kicker: "PROMO",
        summary:
          "Selezione di video promozionali, materiali Winsmart e contenuti social: curati interamente montaggio, editing, VFX e musica.",
        hubThumb: asset("img/CHANNELS/VIDEO/VIDEO PROMO_3-frame.jpg"),
        hero: {
          src: asset("img/CHANNELS/VIDEO/VIDEO PROMO_3-frame.jpg"),
          alt: "Hero Winsmart",
        },
        videos: [
          {
            title: "Promo 01",
            desc: "Cut breve per social con focus su prodotto e CTA.",
            src: asset("img/CHANNELS/VIDEO/VIDEO PROMO_1.mp4"),
            poster: asset("img/CHANNELS/VIDEO/VIDEO PROMO_1-frame.jpg"),
          },
          {
            title: "Promo 02",
            desc: "Versione dinamica con ritmo più rapido e titoli.",
            src: asset("img/CHANNELS/VIDEO/VIDEO PROMO_2.mp4"),
            poster: asset("img/CHANNELS/VIDEO/VIDEO PROMO_2-frame.jpg"),
          },
          {
            title: "Promo 03",
            desc: "Cut verticale pensato per social con ritmo veloce.",
            src: asset("img/CHANNELS/VIDEO/VIDEO PROMO_3.mp4"),
            poster: asset("img/CHANNELS/VIDEO/VIDEO PROMO_3-frame.jpg"),
          },
          {
            title: "Promo 04",
            desc: "Variante con focus su titoli e prodotto.",
            src: asset("img/CHANNELS/VIDEO/VIDEO PROMO_4.mp4"),
            poster: asset("img/CHANNELS/VIDEO/VIDEO PROMO_4-frame.jpg"),
          },
          {
            title: "Promo 05",
            desc: "Versione verticale con focus su ritmo e callout.",
            src: asset("img/CHANNELS/VIDEO/VIDEO PROMO_5.mp4"),
            poster: asset("img/CHANNELS/VIDEO/VIDEO PROMO_5-frame.jpg"),
          },
        ],
      },
      {
        id: "meschia",
        title: "Social per Meschia",
        kicker: "Meschia",
        summary:
          "Produzione di lavori social: format brevi, coerenza visiva e adattamenti multi-piattaforma.",
        hero: {
          src: asset("img/CHANNELS/VIDEO/meschia-cover.jpg"),
          alt: "Hero Meschia",
        },
        videos: [
          {
            title: "Social 01",
            desc: "Formato verticale con ritmo pensato per social.",
            src: asset("img/CHANNELS/VIDEO/MESCHIA_SOCIAL_01.mp4"),
            poster: asset("img/CHANNELS/VIDEO/MESCHIA_SOCIAL_01-frame.jpg"),
          },
          {
            title: "Social 02",
            desc: "Cut rapido per mantenere alta l'attenzione.",
            src: asset("img/CHANNELS/VIDEO/CADERE_2.mp4"),
            poster: asset("img/CHANNELS/VIDEO/CADERE_2-frame.jpg"),
          },
          {
            title: "Social 03",
            desc: "Versione teaser con focus su mood e dettagli.",
            src: asset("img/CHANNELS/VIDEO/CADERE_3.mp4"),
            poster: asset("img/CHANNELS/VIDEO/CADERE_3-frame.jpg"),
          },
          {
            title: "Social 04",
            desc: "Variante con taglio finale più deciso.",
            src: asset("img/CHANNELS/VIDEO/CADERE_4.mp4"),
            poster: asset("img/CHANNELS/VIDEO/CADERE_4-frame.jpg"),
          },
        ],
      },
      {
        id: "meschia-videoclip",
        title: "Videoclip",
        kicker: "Meschia",
        hubLabel: "Coming soon",
        hubDesc:
          "Ho lavorato al videoclip di una canzone di Meschia, in uscita il 12 giugno.",
        summary:
          "Ho lavorato al videoclip di una canzone di Meschia, in uscita il 12 giugno.",
        videos: [
          {
            title: "Coming soon",
            desc: "Videoclip di una canzone di Meschia in uscita il 12 giugno.",
          },
        ],
      },
      {
        id: "personali",
        title: "Progetti personali",
        kicker: "Personal",
        summary:
          "Esperimenti e lavori accademici: tutto il processo di ideazione, illustrazione e montaggio è stato curato interamente da me.",
        hubThumb: asset("img/CHANNELS/VIDEO/PROGETTI PERSONALI_2-frame.jpg"),
        hero: {
          src: asset("img/CHANNELS/VIDEO/PROGETTI PERSONALI_1-frame.jpg"),
          alt: "Hero Progetti personali",
        },
        videos: [
          {
            title: "Personal 01",
            desc: "Studio visivo e composizione per concept personale.",
            src: asset("img/CHANNELS/VIDEO/PROGETTI PERSONALI_1.mp4"),
            poster: asset("img/CHANNELS/VIDEO/PROGETTI PERSONALI_1-frame.jpg"),
          },
          {
            title: "Personal 02",
            desc: "Short video sperimentale con focus su ritmo e mood.",
            src: asset("img/CHANNELS/VIDEO/PROGETTI PERSONALI_2.mp4"),
            poster: asset("img/CHANNELS/VIDEO/PROGETTI PERSONALI_2-frame.jpg"),
          },
        ],
      },
      {
        id: "requiem",
        title: "48h Film Project - \"Requiem\"",
        kicker: "48h Film Project",
        summary:
          "Esperienza sul set come grafico, backstage e supporto alla fotografia durante le riprese del corto \"Requiem\", diretto da Lorenzo Russo.",
        hubThumb: asset("img/CHANNELS/VIDEO/REQUIEM LOCANDINA.jpg"),
        hero: {
          src: asset("img/CHANNELS/VIDEO/REQUIEM LOCANDINA.jpg"),
          alt: "Hero Requiem",
        },
        videos: [
          {
            title: "Backstage",
            desc: "Estratto dal set, girato e montato.",
            src: asset("img/CHANNELS/VIDEO/REQUIEM BACKSTAGE.mp4"),
            poster: asset("img/CHANNELS/VIDEO/REQUIEM BACKSTAGE-frame.jpg"),
          },
          {
            title: "Locandina",
            desc: "Locandina ufficiale del corto.",
            poster: asset("img/CHANNELS/VIDEO/REQUIEM LOCANDINA.jpg"),
            static: true,
          },
        ],
      },
    ],
  },

  "#about": {
    title: "Chi sono",
    html: `
      <div class="wii-card bio-card">
        <div class="bioCarousel" aria-label="Chi sono - carosello">
          <img class="bioMedia" src="${asset("img/BIO/BIO_1.jpg")}" alt="" loading="lazy" decoding="async">
          <img class="bioMedia" src="${asset("img/BIO/BIO_2.jpg")}" alt="" loading="lazy" decoding="async">
          <img class="bioMedia" src="${asset("img/BIO/BIO_3.jpg")}" alt="" loading="lazy" decoding="async">
          <img class="bioMedia" src="${asset("img/BIO/BIO_4.jpg")}" alt="" loading="lazy" decoding="async">
          <img class="bioMedia" src="${asset("img/BIO/BIO_5.jpg")}" alt="" loading="lazy" decoding="async">
        </div>
        <div class="bioDesc">
          <h3>Chi sono</h3>
          <p>Ciao, sono <strong>Valerio</strong>: <strong>graphic designer</strong> di <strong>Roma</strong> e autentico nerd. Ho approcciato il design attraverso <strong>videogiochi</strong>, <strong>copertine</strong> e <strong>cultura pop</strong>, trasformando questa passione in un percorso professionale.</p>
          <p>Il mio approccio unisce <strong>sperimentazione</strong>, <strong>rischio</strong> e <strong>senso estetico</strong> per creare output non solo appaganti, ma soprattutto <strong>funzionali</strong>.</p>
          <p>Negli ultimi mesi ho continuato a <strong>sperimentare</strong> con i <strong>video social</strong>: ho curato <strong>fotografia</strong>, <strong>regia</strong> e <strong>montaggio</strong>, uscendo dalla mia <strong>zona di comfort</strong>. Sperimentare e imparare sul campo è la parte che mi entusiasma di più.</p>
          <p class="wii-meta">Lingue: <strong>Italiano madrelingua</strong>, <strong>English B2</strong></p>
        </div>
      </div>
    `,
  },

  "#contact": {
    title: "Contatti",
    html: `
      <div class="wii-card">
        <h3>Contatti diretti</h3>
        <p><strong>Email</strong>: <a href="mailto:${EMAIL}">${EMAIL}</a></p>
        <p><strong>Telefono</strong>: <a href="tel:${PHONE.replace(/\s+/g, "")}">${PHONE}</a></p>
        <p class="wii-meta">Base: <strong>Roma</strong></p>
        <div class="wii-links">
          <a class="wii-link" href="${asset("Valerio-Serani-CV.pdf")}" download>
            Scarica CV
          </a>
        </div>
      </div>
      <div class="wii-card">
        <h3>Profilo LinkedIn</h3>
        <p><strong>Profilo LinkedIn</strong> con esperienza, formazione e contatti.</p>
        <div class="wii-links">
          <a class="wii-link" href="${LINKEDIN_PROFILE_URL}" target="_blank" rel="noopener noreferrer">
            Apri profilo LinkedIn
          </a>
        </div>
      </div>
    `,
  },

  "#social": {
    title: "Social",
    html: `
      <div class="wii-card">
        <h3>Canali social</h3>
        <p>Qui trovi tutti i miei social: raccontano la mia parte più professionale e quella più ludica. Passione e lavoro sono sempre andati di pari passo nella mia vita, e qui li vedi convivere.</p>
        <div class="social-list">
          <a class="social-item" href="${LINKEDIN_PROFILE_URL}" target="_blank" rel="noopener noreferrer">
            <span class="social-ico">💼</span>
            <span class="social-text"><strong>LinkedIn</strong> /valerio-serani-682a48215</span>
          </a>
          <a class="social-item" href="${INSTAGRAM_URL}" target="_blank" rel="noopener noreferrer">
            <span class="social-ico">📸</span>
            <span class="social-text"><strong>Instagram</strong> @velvet_172</span>
          </a>
          <a class="social-item" href="${TIKTOK_URL}" target="_blank" rel="noopener noreferrer">
            <span class="social-ico">🎵</span>
            <span class="social-text"><strong>TikTok</strong> @heyits172</span>
          </a>
          <a class="social-item" href="${VIMEO_URL}" target="_blank" rel="noopener noreferrer">
            <span class="social-ico">🎬</span>
            <span class="social-text"><strong>Vimeo</strong> /user95787021</span>
          </a>
          <a class="social-item" href="${BEHANCE_URL}" target="_blank" rel="noopener noreferrer">
            <span class="social-ico">🅱️</span>
            <span class="social-text"><strong>Behance</strong> /velvet172</span>
          </a>
        </div>
      </div>
    `,
  },

  "#exp": {
    title: "Esperienze",
    html: `
      <div class="wii-card">
        <h3>Graphic Designer Jr - Cube Proemotion</h3>
        <p class="wii-meta"><strong>Gen 2024 - Gen 2026</strong> | <strong>Roma</strong></p>
        <ul class="wii-list">
          <li>Collaborazione con <strong>team creativo</strong> per <strong>concept</strong> in linea con esigenze <strong>marketing</strong> e <strong>branding</strong>.</li>
          <li>Realizzazione <strong>materiali grafici</strong> per campagne pubblicitarie, promozione e social.</li>
          <li>Progettazione <strong>layout</strong> per sito web, social media e newsletter.</li>
          <li>Gestione file per <strong>produzione</strong> e coordinamento qualità con attenzione al dettaglio.</li>
          <li>Supporto nella creazione <strong>contenuti visivi</strong> per eventi e promozioni aziendali.</li>
        </ul>
      </div>
      <div class="wii-card">
        <h3>Formazione</h3>
        <ul class="wii-list">
          <li><strong>LEARNN</strong> - Percorsi completati su <strong>marketing digitale</strong>, <strong>social media</strong>, <strong>AI</strong> e produttività creativa.</li>
          <li>Corso <strong>Digital Skills</strong>, <strong>Marketing</strong>, <strong>SEO</strong> (LV8 Certification Badge, Roma).</li>
          <li><strong>NFT e Metaverso</strong> con Davide Cardea (Giu 2022, Roma).</li>
          <li><strong>AANT</strong> - Accademia delle Arti e Nuove Tecnologie, <strong>Graphic Design</strong> (Nov 2019 - Giu 2022, Roma).</li>
          <li><strong>Liceo Scientifico Francesco d'Assisi</strong> (Set 2012 - Giu 2018, Roma).</li>
        </ul>
      </div>
      <div class="wii-card">
        <h3>Clienti</h3>
        <p class="wii-meta">Alcuni dei brand e aziende con cui ho lavorato.</p>
        <div class="chip-list">
          <span class="chip">M&amp;M&apos;s</span>
          <span class="chip">Monini</span>
          <span class="chip">Cesar</span>
          <span class="chip">Ferrari Hypercar</span>
          <span class="chip">Control</span>
          <span class="chip">BOEM</span>
          <span class="chip">Angelini</span>
          <span class="chip">OKI</span>
          <span class="chip">Sensodyne</span>
          <span class="chip">Mentadent</span>
          <span class="chip">L&apos;Or</span>
          <span class="chip">Kellogg&apos;s</span>
          <span class="chip">Lavazza</span>
          <span class="chip">Mutti</span>
          <span class="chip">Peroni</span>
          <span class="chip">TIM</span>
          <span class="chip">Telepass</span>
          <span class="chip">CIF</span>
          <span class="chip">AMUCHINA</span>
          <span class="chip">Multicentrum</span>
          <span class="chip">Algida</span>
          <span class="chip">WIQO</span>
          <span class="chip">Sunsilk</span>
          <span class="chip">Sagre Autentiche</span>
        </div>
      </div>
    `,
  },

  "#services": {
    title: "Servizi",
    html: `
      <div class="wii-card">
        <h3>Cosa offro</h3>
        <ul class="wii-list">
          <li><strong>Visual design</strong> per campagne <strong>ADV</strong> e social.</li>
          <li><strong>Art direction</strong> e sviluppo <strong>concept</strong>.</li>
          <li><strong>Layout</strong> per sito, newsletter e contenuti digitali.</li>
          <li>Adattamenti creativi <strong>multi-formato</strong> (print e digital).</li>
          <li>Supporto al team marketing con output orientati alla <strong>comunicazione</strong> e alla funzione.</li>
        </ul>
      </div>
    `,
  },

  "#tools": {
    title: "Tool",
    html: `
      <div class="wii-card">
        <h3>Hard Skills</h3>
        <ul class="wii-list">
          <li><strong>Adobe Suite</strong> (Photoshop, Illustrator, InDesign, After Effects, Premiere Pro).</li>
          <li><strong>Art direction</strong> e <strong>copywriting</strong>.</li>
          <li><strong>Collaborazione</strong>: Figma, Mural, Whimsical.</li>
          <li><strong>Video</strong>: art direction + video editing (ideazione, script, storyboard, montaggio), CapCut, editor video social e creazione di <strong>video social funzionali</strong>.</li>
          <li><strong>AI</strong>: prompting, ideazione, scrittura creativa, ricerca e analisi rapida, workflow AI/web e AI-assisted production per asset e variazioni di layout.</li>
        </ul>
      </div>
    `,
  },

  "#ai": {
    title: "AI",
    html: `
      <div class="wii-card">
        <h3>Workflow AI</h3>
        <p>Sono un <strong>\"AI nerd\"</strong>: uso l'<strong>AI</strong> per <strong>brainstorming</strong>, <strong>scrittura creativa</strong>, <strong>ricerca</strong> e direzione creativa, così da velocizzare l'esecuzione. Mi aiuta a gettare le basi del processo creativo e ad <strong>accelerare i tempi</strong>, mantenendo sempre il controllo umano su <strong>creatività</strong> e <strong>qualità</strong>. Questo sito è il mio <strong>showcase</strong>: è un <strong>esperimento</strong> in cui ho messo in pratica le mie competenze per costruire un progetto completo.</p>
        <p>Lavoro in <strong>sinergia</strong> tra <strong>Codex</strong> e <strong>Visual Studio Code</strong>: analisi dei file, riscrittura delle sezioni, struttura della griglia, generazione asset e iterazioni rapide. La pubblicazione passa da <strong>GitHub</strong> e il setup tecnico include <strong>Homebrew</strong> e <strong>Vite</strong> per dipendenze e build.</p>
        <p class="wii-meta">Obiettivo: <strong>accelerare tempi</strong> e <strong>qualità</strong>, mantenendo il controllo creativo umano su tono, priorità e coerenza finale.</p>
      </div>
    `,
  },

  "#auto": {
    title: "Automotive",
    html: `
      <div class="wii-card">
        <h3>Automotive Visuals</h3>
        <p>Canale dedicato a contenuti automotive: visual campaign, branding e creatività per officine o brand di settore.</p>
      </div>
    `,
  },

  "#underwater": {
    title: "Underwater",
    html: `
      <div class="wii-card">
        <h3>Riprese Sub</h3>
        <p>Produzione visual e video underwater con focus su storytelling, composizione e color mood.</p>
      </div>
    `,
  },

  "#high": {
    title: "Highlight",
    html: `
      <div class="wii-card">
        <h3>In evidenza dal portfolio</h3>
        <ul class="wii-list">
          <li>Visione creativa ispirata a cultura pop, videogiochi e fumetti.</li>
          <li>Ricerca di equilibrio tra sperimentazione e funzionalità.</li>
          <li>Esperienza attiva come Graphic Designer Jr.</li>
          <li>Background accademico in Graphic Design.</li>
          <li>Competenze trasversali tra ADV, digital layout, social e video direction.</li>
          <li>Soft skills: teamwork, empatia, problem solving, creatività.</li>
        </ul>
      </div>
    `,
  },

  "#minigame": {
    title: "Giochi",
    html: `
      <div class="mg">
        <div class="mgSwitch" aria-label="Seleziona gioco">
          <button class="wii-pill mgArrow" id="mgPrevGame" type="button" aria-label="Gioco precedente">◀</button>
          <div class="mgGameTitle" id="mgGameTitle">Bubble Pop</div>
          <button class="wii-pill mgArrow" id="mgNextGame" type="button" aria-label="Gioco successivo">▶</button>
        </div>

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

        <div class="mgHelp" id="mgHelp">Clicca le bolle prima che scadano i 30 secondi.</div>
      </div>
    `,
  },
};

function getVideoSection(sectionId) {
  const data = channelContent["#videos"];
  const sections = data?.sections || [];
  if (!sections.length) return null;
  return sections.find((section) => section.id === sectionId) || sections[0];
}

function renderVideosHub() {
  if (!overlayBody || !overlayTitle || !overlay) return;
  const data = channelContent["#videos"];
  const sections = data?.sections || [];
  if (!sections.length) return;

  overlayState.videoSectionId = null;
  overlay.classList.remove("is-video-detail");
  overlayTitle.textContent = data.title;

  const cardsHtml = sections
    .map((section) => {
      const hubThumb = section.hubThumb || section.hero?.src;
      const thumbStyle = hubThumb
        ? ` style="--thumb:url('${hubThumb}')"`
        : "";
      return `
        <button class="wii-card video-hub-card" type="button" data-video-section="${section.id}">
          <div class="video-hub-thumb"${thumbStyle} aria-hidden="true">
            ${section.hubLabel ? `<span class="video-hub-label">${section.hubLabel}</span>` : ""}
          </div>
          <div class="video-hub-copy">
            <h3>${section.title}</h3>
            ${section.hubDesc ? `<p>${section.hubDesc}</p>` : ""}
          </div>
        </button>
      `;
    })
    .join("");

  overlayBody.innerHTML = `<div class="video-hub">${cardsHtml}</div>`;

  overlayBody.scrollTop = 0;
}

function renderVideoSection(sectionId) {
  if (!overlayBody || !overlayTitle || !overlay) return;
  const data = channelContent["#videos"];
  const section = getVideoSection(sectionId);
  if (!section) return;

  overlayState.videoSectionId = section.id;
  overlayTitle.textContent = section.title;
  overlay.classList.add("is-video-detail");

  const heroStyle = section.hero?.src ? ` style="--hero:url('${section.hero.src}')"` : "";
  const heroAria = section.hero?.alt ? ` role="img" aria-label="${section.hero.alt}"` : "";
  const videosHtml = (section.videos || [])
    .map((video) => {
      const hasSrc = !!video.src;
      const isStatic = !!video.static;
      const poster = video.poster || section.hero?.src || "";
      const thumbStyle = poster ? ` style="--thumb:url('${poster}')"` : "";
      const dataAttrs = hasSrc
        ? ` data-video-open data-video-src="${video.src}"${poster ? ` data-video-poster="${poster}"` : ""}`
        : isStatic && poster
          ? ` data-image-open data-image-src="${poster}"`
          : "";
      const disabledAttr = hasSrc || isStatic ? "" : " disabled";
      const badgeHtml = hasSrc || isStatic ? "" : `<span class="video-feed-badge">In arrivo</span>`;
      const playHtml = hasSrc ? `<span class="video-feed-play">▶</span>` : "";
      return `
        <button class="video-feed-item" type="button"${dataAttrs}${disabledAttr}>
          <div class="video-feed-thumb"${thumbStyle}>
            ${playHtml}
            ${badgeHtml}
          </div>
          <div class="video-feed-meta">
            <h4>${video.title}</h4>
            ${video.desc ? `<p>${video.desc}</p>` : ""}
          </div>
        </button>
      `;
    })
    .join("");

  overlayBody.innerHTML = `
    <div class="video-detail">
      <div class="video-hero"${heroStyle}${heroAria}>
        <div class="video-heroOverlay">
          <div class="video-heroKicker">${section.kicker || "Video"}</div>
          <h3>${section.title}</h3>
          <p>${section.summary}</p>
        </div>
      </div>
      <div class="video-feed">
        ${videosHtml}
      </div>
    </div>
  `;

  overlayBody.scrollTop = 0;
}

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
  overlay.classList.toggle("is-about", href === "#about");
  overlay.classList.toggle("is-exp", href === "#exp");
  overlay.classList.toggle("is-videos", href === "#videos");

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
  } else if (href === "#videos" && data.sections) {
    renderVideosHub();
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
  closeVideoViewer();
  mgStop(false);
  stopBioCarousel();
  overlayState.videoSectionId = null;

  overlay.classList.remove("is-open", "is-game", "is-carousel", "is-videos", "is-video-detail");
  overlay.setAttribute("aria-hidden", "true");

  clickSound();
}

function handleOverlayBack() {
  if (overlayState.href === "#videos" && overlay?.classList.contains("is-video-detail")) {
    renderVideosHub();
    return;
  }
  closeChannel();
}

if (overlayBack) overlayBack.addEventListener("click", handleOverlayBack);

/* =========================
   Image viewer (full size)
========================= */
function openImageViewer(src) {
  if (!imgViewer || !imgViewerSrc || !src) return;
  document.body?.classList.add("is-img-viewer-open");
  imgViewerSrc.src = src;
  imgViewer.classList.add("is-open");
  imgViewer.setAttribute("aria-hidden", "false");
}
function closeImageViewer() {
  if (!imgViewer || !imgViewerSrc) return;
  document.body?.classList.remove("is-img-viewer-open");
  imgViewer.classList.remove("is-open");
  imgViewer.setAttribute("aria-hidden", "true");
  imgViewerSrc.src = "";
}
if (imgViewer) {
  imgViewer.addEventListener("click", closeImageViewer);
}

/* =========================
   Video viewer (full size)
========================= */
function openVideoViewer(src, poster) {
  if (!videoViewer || !videoViewerSrc || !src) return;
  document.body?.classList.add("is-video-viewer-open");
  resumeMusicAfterVideo = !!(audioEnabled && musicNodes);
  if (resumeMusicAfterVideo) stopMusic();
  videoViewerSrc.src = src;
  if (poster) videoViewerSrc.setAttribute("poster", poster);
  else videoViewerSrc.removeAttribute("poster");
  videoViewer.classList.add("is-open");
  videoViewer.setAttribute("aria-hidden", "false");
  try { videoViewerSrc.currentTime = 0; } catch {}
  videoViewerSrc.play().catch(() => {});
}
function closeVideoViewer() {
  if (!videoViewer || !videoViewerSrc) return;
  document.body?.classList.remove("is-video-viewer-open");
  videoViewer.classList.remove("is-open");
  videoViewer.setAttribute("aria-hidden", "true");
  videoViewerSrc.pause();
  videoViewerSrc.removeAttribute("src");
  videoViewerSrc.load();
  if (resumeMusicAfterVideo && audioEnabled) {
    resumeMusicAfterVideo = false;
    unlockAudioOnce();
    unlockAudio();
    startMusic();
  } else {
    resumeMusicAfterVideo = false;
  }
}
if (videoViewer) {
  videoViewer.addEventListener("click", (e) => {
    if (e.target === videoViewer) closeVideoViewer();
  });
}

if (overlay) {
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeChannel();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && videoViewer?.classList.contains("is-open")) {
    closeVideoViewer();
    return;
  }
  if (e.key === "Escape" && imgViewer?.classList.contains("is-open")) {
    closeImageViewer();
    return;
  }
  if (e.key === "Escape" && overlay?.classList.contains("is-open")) closeChannel();
});

/* click tile -> overlay */
document.addEventListener("click", (e) => {
  if (!appStarted) return;
  if (performance.now() < suppressClickUntil) {
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
    if (performance.now() < suppressClickUntil) return;
    e.preventDefault();
    openChannel("#minigame");
  });
}

/* Overlay body events (projects controls + click to close more) */
overlayBody?.addEventListener("click", (e) => {
  if (overlayState.href === "#videos") {
    const sectionBtn = e.target?.closest?.("[data-video-section]");
    if (sectionBtn) {
      const sectionId = sectionBtn.getAttribute("data-video-section");
      if (sectionId) renderVideoSection(sectionId);
      return;
    }

    const imageBtn = e.target?.closest?.("[data-image-open]");
    if (imageBtn) {
      const src = imageBtn.getAttribute("data-image-src");
      if (src) openImageViewer(src);
      return;
    }

    const videoBtn = e.target?.closest?.("[data-video-open]");
    if (videoBtn) {
      const src = videoBtn.getAttribute("data-video-src");
      if (src) {
        const poster = videoBtn.getAttribute("data-video-poster") || "";
        openVideoViewer(src, poster);
      }
      return;
    }
  }

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
let pointerInitialized = false;
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
  cx += (tx - cx) * 0.42;
  cy += (ty - cy) * 0.42;

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
  if (!pointerInitialized) {
    cx = tx;
    cy = ty;
    pointerInitialized = true;
  }
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
  gameIndex: 0,
  gameMode: "bubble",
  running: false,
  score: 0,
  timeLeft: 30,
  lastTs: 0,
  spawnAcc: 0,
  bubbles: [],
  stars: [],
  paddleX: 0.5,
  rafId: null,
  timerId: null,
  canvas: null,
  ctx: null,
  scoreEl: null,
  timeEl: null,
  titleEl: null,
  helpEl: null,
  overEl: null,
  overScoreEl: null,
  overRestartBtn: null,
  overCloseBtn: null,
};

const mgGames = [
  {
    mode: "bubble",
    title: "Bubble Pop",
    help: "Clicca le bolle prima che scadano i 30 secondi.",
  },
  {
    mode: "star",
    title: "Star Catch",
    help: "Muovi il puntatore per prendere le stelle. Evita quelle rosse.",
  },
];

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
  mg.titleEl = document.getElementById("mgGameTitle");
  mg.helpEl = document.getElementById("mgHelp");

  mg.overEl = document.getElementById("mgOver");
  mg.overScoreEl = document.getElementById("mgOverScore");
  mg.overRestartBtn = document.getElementById("mgOverRestart");
  mg.overCloseBtn = document.getElementById("mgOverClose");

  const startBtn = document.getElementById("mgStart");
  const resetBtn = document.getElementById("mgReset");
  const prevBtn = document.getElementById("mgPrevGame");
  const nextBtn = document.getElementById("mgNextGame");

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

  mg.canvas.onpointermove = (e) => {
    if (mg.gameMode !== "star") return;

    const rect = mg.canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * mg.canvas.width;
    mg.paddleX = clamp(x / mg.canvas.width, 0.06, 0.94);
  };

  mg.canvas.onpointerdown = (e) => {
    if (!mg.running) return;

    const rect = mg.canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * mg.canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * mg.canvas.height;

    if (mg.gameMode === "star") {
      mg.paddleX = clamp(x / mg.canvas.width, 0.06, 0.94);
      return;
    }

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
  if (prevBtn) prevBtn.onclick = () => mgSwitchGame(-1);
  if (nextBtn) nextBtn.onclick = () => mgSwitchGame(1);

  mgResizeCanvasForHiDpi();
  mgApplyGameUi();
  return true;
}

function mgApplyGameUi() {
  const game = mgGames[mg.gameIndex] || mgGames[0];
  mg.gameMode = game.mode;
  if (mg.titleEl) mg.titleEl.textContent = game.title;
  if (mg.helpEl) mg.helpEl.textContent = game.help;
  if (overlayTitle) overlayTitle.textContent = "Giochi";
}

function mgSwitchGame(dir) {
  mg.gameIndex = (mg.gameIndex + dir + mgGames.length) % mgGames.length;
  mgApplyGameUi();
  mgReset();
  clickSound();
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
  mg.stars = [];
  mg.paddleX = 0.5;
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

function mgSpawnStar() {
  if (!mg.canvas) return;
  const w = mg.canvas.width;
  const bad = Math.random() < 0.22;
  const size = (bad ? 18 : 16) + Math.random() * 12;
  const x = size + Math.random() * (w - size * 2);
  const y = -size;
  const speed = 110 + Math.random() * 120 + (30 - mg.timeLeft) * 3;
  const vy = speed * (window.devicePixelRatio || 1);
  const drift = (-30 + Math.random() * 60) * (window.devicePixelRatio || 1);
  mg.stars.push({ x, y, size, vy, drift, bad, rot: Math.random() * Math.PI * 2 });
}

function mgLoop(ts) {
  if (!mg.running) return;

  const dt = Math.min((ts - mg.lastTs) / 1000, 0.05);
  mg.lastTs = ts;

  mgResizeCanvasForHiDpi();

  if (mg.gameMode === "star") {
    mgLoopStars(dt);
    mg.rafId = requestAnimationFrame(mgLoop);
    return;
  }

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

function mgLoopStars(dt) {
  if (!mg.canvas) return;

  const difficulty = 1 + (30 - mg.timeLeft) * 0.035;
  const spawnEvery = 0.62 / difficulty;
  mg.spawnAcc += dt;
  while (mg.spawnAcc >= spawnEvery) {
    mg.spawnAcc -= spawnEvery;
    mgSpawnStar();
  }

  const w = mg.canvas.width;
  const h = mg.canvas.height;
  const paddleW = Math.max(92, w * 0.16);
  const paddleH = Math.max(18, h * 0.035);
  const paddleX = mg.paddleX * w;
  const paddleY = h - paddleH * 3.2;

  for (let i = mg.stars.length - 1; i >= 0; i--) {
    const s = mg.stars[i];
    s.y += s.vy * dt;
    s.x += s.drift * dt;
    s.rot += dt * 2.4;

    const hitX = Math.abs(s.x - paddleX) <= paddleW * 0.55 + s.size * 0.4;
    const hitY = Math.abs(s.y - paddleY) <= paddleH * 1.2 + s.size * 0.5;
    if (hitX && hitY) {
      mg.stars.splice(i, 1);
      mg.score += s.bad ? -2 : 1;
      mg.score = Math.max(0, mg.score);
      if (mg.scoreEl) mg.scoreEl.textContent = String(mg.score);
      if (s.bad) mgBadSound();
      else mgPopSound();
      continue;
    }

    if (s.y - s.size > h) mg.stars.splice(i, 1);
  }

  mgDraw();
}

function mgDraw() {
  if (!mg.ctx || !mg.canvas) return;

  const ctx = mg.ctx;
  const w = mg.canvas.width;
  const h = mg.canvas.height;

  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "rgba(255,255,255,0.22)";
  ctx.fillRect(0, 0, w, h);

  if (mg.gameMode === "star") {
    mgDrawStars(ctx, w, h);
    return;
  }

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

function mgDrawStars(ctx, w, h) {
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, "rgba(218,244,255,0.70)");
  sky.addColorStop(1, "rgba(255,255,255,0.38)");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  for (const s of mg.stars) {
    mgDrawStarShape(ctx, s.x, s.y, s.size, s.rot, s.bad);
  }

  const paddleW = Math.max(92, w * 0.16);
  const paddleH = Math.max(18, h * 0.035);
  const x = mg.paddleX * w;
  const y = h - paddleH * 3.2;

  ctx.save();
  ctx.translate(x, y);
  const g = ctx.createLinearGradient(0, -paddleH, 0, paddleH);
  g.addColorStop(0, "rgba(255,255,255,0.94)");
  g.addColorStop(1, "rgba(43,184,255,0.30)");
  ctx.fillStyle = g;
  ctx.strokeStyle = "rgba(43,184,255,0.42)";
  ctx.lineWidth = 2;
  mgRoundRect(ctx, -paddleW / 2, -paddleH / 2, paddleW, paddleH, paddleH / 2);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function mgDrawStarShape(ctx, x, y, r, rot, bad) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.beginPath();
  for (let i = 0; i < 10; i += 1) {
    const a = -Math.PI / 2 + i * Math.PI / 5;
    const rr = i % 2 === 0 ? r : r * 0.45;
    const px = Math.cos(a) * rr;
    const py = Math.sin(a) * rr;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fillStyle = bad ? "rgba(255,96,96,0.78)" : "rgba(255,218,80,0.86)";
  ctx.strokeStyle = bad ? "rgba(160,30,40,0.35)" : "rgba(180,130,20,0.32)";
  ctx.lineWidth = 2;
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function mgRoundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
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

function mgBadSound() {
  const ctx = ensureAudio();
  if (!ctx) return;

  const t0 = ctx.currentTime;
  const o = ctx.createOscillator();
  const g = ctx.createGain();

  o.type = "sawtooth";
  o.frequency.setValueAtTime(180, t0);
  o.frequency.exponentialRampToValueAtTime(90, t0 + 0.10);

  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(0.035, t0 + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.14);

  o.connect(g);
  g.connect(ctx.destination);
  o.start(t0);
  o.stop(t0 + 0.16);
}

window.addEventListener("resize", () => {
  if (document.getElementById("mgCanvas")) mgResizeCanvasForHiDpi();
  setTileVideoZooms();
  updateVideoPreviewPlayback();
});
function startApp() {
  if (appStarted) return;
  appStarted = true;

  // chiudi intro
  if (introEl) {
    introEl.classList.add("is-fading");
    introEl.setAttribute("aria-hidden", "true");
    window.setTimeout(() => {
      introEl.classList.add("is-hidden");
    }, INTRO_HIDE_DELAY_MS);
    window.setTimeout(() => {
      document.body?.classList.remove("is-intro-locked");
    }, INTRO_LOCK_MS);
  }
  suppressClickUntil = Math.max(suppressClickUntil, performance.now() + INTRO_SUPPRESS_MS);

  // audio: se vuoi far partire subito la musica al “click per iniziare”
  // (se preferisci che la musica parta solo col tuo bottone 🔊, commenta queste 2 righe)
  if (audioEnabled) {
    unlockAudioOnce();
    unlockAudio();
    startMusic();
  }

  clickSound();
  updateVideoPreviewPlayback();
}

function bindIntro() {
  if (!introEl) {
    appStarted = true;
    return;
  }
  document.body?.classList.add("is-intro-locked");

  // click/tap ovunque sull’intro
  introEl.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    startApp();
  });
  introEl.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "touch") return;
    e.preventDefault();
    e.stopPropagation();
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

if (MOBILE_MQ.addEventListener) {
  MOBILE_MQ.addEventListener("change", updateVideoPreviewPlayback);
  REDUCED_MOTION_MQ.addEventListener("change", updateVideoPreviewPlayback);
} else {
  MOBILE_MQ.addListener(updateVideoPreviewPlayback);
  REDUCED_MOTION_MQ.addListener(updateVideoPreviewPlayback);
}
