import "./style.css";

/* ---------------------------
   UI / GRID
---------------------------- */
const grid = document.getElementById("grid");
const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const prevBtn = document.getElementById("prevPage");
const nextBtn = document.getElementById("nextPage");

const pages = [
  [
    { icon: "🧩", t: "Progetti", s: "Case study e lavori", href: "#projects" },
    { icon: "🎬", t: "Video", s: "Reel e underwater", href: "#videos" },
    { icon: "👋", t: "Chi sono", s: "Bio + competenze", href: "#about" },
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

    { icon: "🤝", t: "Collaborazioni", s: "Brand / team", href: "#collab" },
    { icon: "🎞️", t: "Showreel", s: "Best of", href: "#showreel" },
    { icon: "📦", t: "Pacchetti", s: "Offerte", href: "#packs" },
    { icon: "🔧", t: "Processo", s: "Come lavoro", href: "#process" },

    { icon: "📩", t: "Newsletter", s: "Aggiornamenti", href: "#news" },
    { icon: "🧭", t: "Mission", s: "Visione", href: "#mission" },
    { icon: "🗓️", t: "Disponibilità", s: "Date", href: "#dates" },
    { icon: "⚙️", t: "Impostazioni", s: "UI", href: "#settings" },
  ],
];

let pageIndex = 0;

function renderPage() {
  const items = pages[pageIndex];
  if (!grid) return;

  grid.innerHTML = items
    .map(
      (x) => `
      <a class="wii-tile" href="${x.href}">
        <div class="wii-tileContent">
          <div class="wii-icon">${x.icon}</div>
          <div>
            <div class="wii-title">${x.t}</div>
            <div class="wii-sub">${x.s}</div>
          </div>
        </div>
      </a>
    `
    )
    .join("");
}

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

function swooshTo(newIndex, dir) {
  // dir: "left" oppure "right"
  if (!grid) return;

  // esci
  grid.classList.remove("is-swoosh-in", "is-swoosh-out-left", "is-swoosh-out-right");
  grid.classList.add(dir === "left" ? "is-swoosh-out-left" : "is-swoosh-out-right");

  // dopo l’uscita, cambia pagina e rientra
  window.setTimeout(() => {
    pageIndex = newIndex;
    renderPage();

    // reset posizione e fai rientrare
    grid.classList.remove("is-swoosh-out-left", "is-swoosh-out-right");
    // forza reflow (assicura che l’animazione riparta)
    void grid.offsetWidth;
    grid.classList.add("is-swoosh-in");
  }, 230);
}

prevBtn.addEventListener("click", () => {
  const newIndex = (pageIndex - 1 + pages.length) % pages.length;
  swooshTo(newIndex, "right"); // tornando indietro, la griglia esce a destra
});

nextBtn.addEventListener("click", () => {
  const newIndex = (pageIndex + 1) % pages.length;
  swooshTo(newIndex, "left"); // andando avanti, la griglia esce a sinistra
});


renderPage();
tickClock();
setInterval(tickClock, 1000);

/* ---------------------------
   AUDIO (UI + MUSIC)
---------------------------- */
let audioCtx = null;
let audioEnabled = true;

// per evitare spam di hover
let lastHoverSoundAt = 0;

function ensureAudio() {
  if (!audioEnabled) return null;

  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  // su alcuni browser, resume è async: lo chiamiamo e basta
  if (audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function beep({
  type = "sine",
  freq = 700,
  duration = 0.05,
  gain = 0.04,
  attack = 0.002,
  release = 0.035,
} = {}) {
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
  if (now - lastHoverSoundAt < 90) return;
  lastHoverSoundAt = now;

  beep({ type: "sine", freq: 880, duration: 0.03, gain: 0.028, attack: 0.002, release: 0.03 });
}

function clickSound() {
  beep({ type: "triangle", freq: 520, duration: 0.03, gain: 0.05, attack: 0.001, release: 0.02 });
}

/* ---------------------------
   BACKGROUND MUSIC (Wii-ish + variation)
---------------------------- */
let musicNodes = null;

function startMusic() {
  const ctx = ensureAudio();
  if (!ctx || musicNodes) return;

  // master
  const musicGain = ctx.createGain();
  musicGain.gain.value = 0.0;
  musicGain.connect(ctx.destination);

  // delay leggero
  const delay = ctx.createDelay(0.35);
  delay.delayTime.value = 0.18;

  const fb = ctx.createGain();
  fb.gain.value = 0.20;
  delay.connect(fb);
  fb.connect(delay);

  const delayMix = ctx.createGain();
  delayMix.gain.value = 0.25;

  // filtro bright
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 2600;
  lp.Q.value = 0.7;

  // routing
  lp.connect(musicGain);
  lp.connect(delay);
  delay.connect(delayMix);
  delayMix.connect(musicGain);

  // drone aria
  const drone = ctx.createOscillator();
  drone.type = "sine";
  drone.frequency.value = 130.81;

  const droneGain = ctx.createGain();
  droneGain.gain.value = 0.0001;
  drone.connect(droneGain);
  droneGain.connect(lp);

  // respiro drone
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
    { tones: [261.63, 329.63, 392.0], bass: 130.81 }, // C
    { tones: [349.23, 440.0, 523.25], bass: 174.61 }, // F
    { tones: [220.0, 261.63, 329.63], bass: 110.0 }, // Am
    { tones: [196.0, 246.94, 293.66], bass: 98.0 }, // G
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

  let timerId = null;

  function step() {
    // se qualcuno ha stoppato, non continuare
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

    if (Math.random() < 0.10) {
      bellNote(freq * 2, now + 0.06, 0.026);
    }

    stepIndex += 1;

    if (stepIndex % stepsPerBar === 0) {
      barIndex += 1;

      if (barIndex % 2 === 0) patternIndex = (patternIndex + 1) % patterns.length;
      if (barIndex % barsPerChord === 0) chordIndex = (chordIndex + 1) % chords.length;
    }

    timerId = window.setTimeout(step, stepMs);
  }

  musicNodes = { musicGain, lp, delay, fb, delayMix, drone, droneGain, lfo, timerId };
  step();

  // fade in: un pelo più udibile ma sempre basso
  musicGain.gain.setTargetAtTime(0.800, ctx.currentTime, 0.7);
}

function stopMusic() {
  if (!audioCtx || !musicNodes) return;

  const t = audioCtx.currentTime;

  // stop timer
  if (musicNodes.timerId) {
    clearTimeout(musicNodes.timerId);
  }

  // fade out
  musicNodes.musicGain.gain.setTargetAtTime(0.0001, t, 0.25);

  setTimeout(() => {
    try { musicNodes.drone?.stop(); } catch {}
    try { musicNodes.lfo?.stop(); } catch {}
    musicNodes = null;
  }, 400);
}

// --- Toggle audio (btnLeft) ---
const btnLeft = document.getElementById("btnLeft");
if (btnLeft) {
  btnLeft.textContent = "🔊";

  btnLeft.addEventListener("click", () => {
    audioEnabled = !audioEnabled;
    btnLeft.textContent = audioEnabled ? "🔊" : "🔇";

    if (!audioEnabled) stopMusic();
    else startMusic();
  });
}

/* ---------------------------
   POINTER (Wii cursor) + UI sounds
---------------------------- */
const pointerEl = document.getElementById("wiiPointer");

// posizione target (mouse) e posizione attuale (smussata)
let tx = 0,
  ty = 0;
let cx = 0,
  cy = 0;
let visible = false;

// per disattivare su touch / penna
let lastPointerType = "mouse";

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

  if (pointerEl) {
    pointerEl.style.transform = `translate3d(${cx + offsetX}px, ${cy + offsetY}px, 0)`;
  }
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

const hoverSelector = ".wii-tile, .wii-pill, .wii-arrow";

let currentHoverEl = null;

function setHover(on) {
  if (!pointerEl) return;
  pointerEl.classList.toggle("is-hover", on);
}

// entra in un nuovo "clickable" (solo una volta)
document.addEventListener("pointerover", (e) => {
  if (lastPointerType !== "mouse") return;
  const clickable = e.target?.closest?.(hoverSelector);
  if (!clickable) return;

  // se stai ancora nello stesso elemento, non retriggerare
  if (clickable === currentHoverEl) return;

  currentHoverEl = clickable;
  setHover(true);
  hoverSound();
});

document.addEventListener("pointerout", (e) => {
  const clickable = e.target?.closest?.(hoverSelector);
  if (!clickable) return;

  // se stai uscendo dall'elemento attivo
  if (clickable === currentHoverEl) {
    // se stai andando verso un figlio interno, ignora (evita flicker)
    const toEl = e.relatedTarget;
    if (toEl && clickable.contains(toEl)) return;

    currentHoverEl = null;
    setHover(false);
  }
});

// click feedback
document.addEventListener("pointerdown", () => {
  // musica: parte al primo click ovunque (se abilitata)
  if (audioEnabled) startMusic();

  // feedback cursore/suono: solo mouse
  if (!pointerEl || lastPointerType !== "mouse") return;
  pointerEl.classList.add("is-down");
  clickSound();
});

document.addEventListener("pointerup", () => {
  if (!pointerEl) return;
  pointerEl.classList.remove("is-down");
});
