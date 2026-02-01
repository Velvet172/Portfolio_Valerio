import "./style.css";

document.getElementById("year").textContent = new Date().getFullYear();

const title = document.getElementById("viewTitle");
const grid = document.getElementById("grid");

const routes = {
  home: {
    title: "Home",
    tiles: [
      { icon: "🧩", t: "Progetti", s: "Case study e lavori", href: "#works" },
      { icon: "🎬", t: "Video", s: "Reel e underwater", href: "#videos" },
      { icon: "👋", t: "Chi sono", s: "Bio + competenze", href: "#about" },
      { icon: "✉️", t: "Contatti", s: "Mail, social, link", href: "#contact" },
    ],
  },
  works: {
    title: "Lavori",
    tiles: [
      { icon: "🛞", t: "Automotive", s: "Officina / brand / contenuti", href: "#work-1" },
      { icon: "🌊", t: "Underwater", s: "Riprese e progetti sub", href: "#work-2" },
      { icon: "🎥", t: "Social", s: "Vertical video, ads, reel", href: "#work-3" },
      { icon: "🧠", t: "AI & Processi", s: "Automazioni e workflow", href: "#work-4" },
    ],
  },
  about: {
    title: "Chi sono",
    tiles: [
      { icon: "🧭", t: "Profilo", s: "Cosa faccio e come lavoro", href: "#bio" },
      { icon: "🧰", t: "Competenze", s: "Tool e specialità", href: "#skills" },
      { icon: "🏁", t: "Esperienze", s: "Pista, workshop, progetti", href: "#exp" },
      { icon: "📌", t: "Valori", s: "Qualità, precisione, stile", href: "#values" },
    ],
  },
  contact: {
    title: "Contatti",
    tiles: [
      { icon: "📩", t: "Email", s: "Scrivimi", href: "mailto:hello@example.com" },
      { icon: "📸", t: "Instagram", s: "DM e portfolio", href: "#ig" },
      { icon: "▶️", t: "YouTube", s: "Video lunghi", href: "#yt" },
      { icon: "💬", t: "WhatsApp", s: "Messaggio veloce", href: "#wa" },
    ],
  },
};

function render(routeKey) {
  const r = routes[routeKey] ?? routes.home;
  title.textContent = r.title;

  grid.innerHTML = r.tiles
    .map(
      (x) => `
      <a class="tile" href="${x.href}">
        <div class="tileIcon">${x.icon}</div>
        <div class="tileText">
          <div class="tileTitle">${x.t}</div>
          <div class="tileSub">${x.s}</div>
        </div>
      </a>
    `
    )
    .join("");
}

document.querySelectorAll("[data-route]").forEach((btn) => {
  btn.addEventListener("click", () => render(btn.dataset.route));
});

render("home");
