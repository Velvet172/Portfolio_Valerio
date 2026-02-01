import "./style.css";

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

prevBtn.addEventListener("click", () => {
  pageIndex = (pageIndex - 1 + pages.length) % pages.length;
  renderPage();
});

nextBtn.addEventListener("click", () => {
  pageIndex = (pageIndex + 1) % pages.length;
  renderPage();
});

renderPage();
tickClock();
setInterval(tickClock, 1000);
// --- Wii pointer (hand) ---
const pointerEl = document.getElementById("wiiPointer");

// posizione target (mouse) e posizione attuale (smussata)
let tx = 0, ty = 0;
let cx = 0, cy = 0;
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

// smoothing (0.18 = abbastanza “Wii”)
function animatePointer() {
  cx += (tx - cx) * 0.18;
  cy += (ty - cy) * 0.18;

  // offset per far “puntare” l’indice un po’ più preciso
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

  // se non è mouse, nascondi
  if (lastPointerType !== "mouse") {
    hidePointer();
    return;
  }

  tx = e.clientX;
  ty = e.clientY;
  showPointer();
});

window.addEventListener("mouseleave", () => hidePointer());

// hover su elementi cliccabili: tile, bottoni, frecce
const hoverSelector = ".wii-tile, .wii-pill, .wii-arrow";

function setHover(on) {
  if (!pointerEl) return;
  pointerEl.classList.toggle("is-hover", on);
}

document.addEventListener("pointerover", (e) => {
  if (lastPointerType !== "mouse") return;
  if (e.target && e.target.closest && e.target.closest(hoverSelector)) setHover(true);
});

document.addEventListener("pointerout", (e) => {
  if (e.target && e.target.closest && e.target.closest(hoverSelector)) setHover(false);
});

// click feedback
document.addEventListener("pointerdown", () => {
  if (!pointerEl || lastPointerType !== "mouse") return;
  pointerEl.classList.add("is-down");
});

document.addEventListener("pointerup", () => {
  if (!pointerEl) return;
  pointerEl.classList.remove("is-down");
});

