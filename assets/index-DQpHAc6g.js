(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(s){if(s.ep)return;s.ep=!0;const a=n(s);fetch(s.href,a)}})();const Ve="/Portfolio_Valerio/",l=e=>`${Ve}${e.replace(/^\/+/,"")}`,x=document.getElementById("wiiIntro");let L=!1;const C=document.getElementById("grid");document.getElementById("board");const de=document.getElementById("time"),ue=document.getElementById("date"),O=document.getElementById("btnLeft"),G=document.getElementById("btnRight"),v=document.getElementById("wiiOverlay"),ge=document.getElementById("overlayBack"),me=document.getElementById("overlayTitle"),g=document.getElementById("overlayBody"),b=document.getElementById("wiiPointer"),E=document.getElementById("imgViewer"),k=document.getElementById("imgViewerSrc");function je(e,t,n){return Math.max(t,Math.min(n,e))}const He=[[{icon:"👋",t:"Chi sono",s:"Bio + competenze",href:"#about",previews:[l("img/BIO/BIO_1.jpg"),l("img/BIO/BIO_2.jpg"),l("img/BIO/BIO_3.jpg")]},{icon:"🎓",t:"Esperienze",s:"Formazione / studi",href:"#exp"},{icon:"✉️",t:"Contatti",s:"Mail e social",href:"#contact"},{icon:"🧩",t:"Progetti",s:"Case study e lavori",href:"#projects",previews:[l("img/PROGETTI/PROG_1.jpg"),l("img/PROGETTI/PROG_2.jpg"),l("img/PROGETTI/PROG_3.jpg")]},{icon:"📱",t:"Social",s:"I miei profili",href:"#social"},{icon:"🎬",t:"Video",s:"Reel e underwater",href:"#videos"},{icon:"🛠️",t:"Skills",s:"Cosa so fare",href:"#tools"},{icon:"🤖",t:"AI",s:"Workflow",href:"#ai",previewGif:{still:l("img/CHANNELS/ai.gif.png"),gif:l("img/CHANNELS/AI.gif")}},{icon:"📌",t:"Servizi",s:"Cosa offro",href:"#services",previewGif:{still:l("img/CHANNELS/gif-lavori.png"),gif:l("img/CHANNELS/gif-lavori.gif")}}],[{icon:"📷",t:"Galleria",s:"Foto e frame",href:"#gallery"},{icon:"🗂️",t:"Archivio",s:"Lavori passati",href:"#archive"},{icon:"📝",t:"Blog",s:"Note e making-of",href:"#blog"},{icon:"📍",t:"Dove sono",s:"Roma / contatti",href:"#where"}]];function qe(){return He[0]}function $e(){if(!C)return;const e=qe();C.innerHTML=e.map(t=>{const n=t.previewGif?.still&&t.previewGif?.gif,o=Array.isArray(t.previews)?t.previews:[],s=n?`
          <div class="wii-preview wii-preview--single" aria-hidden="true">
            <img
              src="${t.previewGif.still}"
              data-preview-still="${t.previewGif.still}"
              data-preview-gif="${t.previewGif.gif}"
              alt=""
              loading="lazy"
              decoding="async"
            >
          </div>
        `:o.length?`
          <div class="wii-preview ${o.length===1?"wii-preview--single":""}" aria-hidden="true">
            ${o.map(a=>`<img src="${a}" alt="" loading="lazy" decoding="async">`).join("")}
          </div>
        `:"";return`
        <a class="wii-tile" href="${t.href}" data-href="${t.href}">
          ${s}
          <div class="wii-tileContent">
            <div class="wii-icon">${t.icon}</div>
            <div class="wii-tileText">
              <div class="wii-title">${t.t}</div>
              <div class="wii-sub">${t.s}</div>
            </div>
          </div>
        </a>
      `}).join(""),_e(),De()}function _e(){if(!C)return;Array.from(C.querySelectorAll(".wii-preview:not(.wii-preview--single)")).forEach(t=>{const n=Math.random()*12;t.style.setProperty("--preview-phase",`-${n.toFixed(2)}s`)})}function De(){if(!C)return;Array.from(C.querySelectorAll("img[data-preview-gif]")).forEach(t=>{const n=t.closest(".wii-tile");if(!n)return;const o=t.getAttribute("data-preview-still"),s=t.getAttribute("data-preview-gif");if(!o||!s)return;const a=()=>{t.src=`${s}?t=${Date.now()}`},r=()=>{t.src=o};n.addEventListener("mouseenter",a),n.addEventListener("mouseleave",r),n.addEventListener("pointerenter",a),n.addEventListener("pointerleave",r),n.addEventListener("touchstart",a,{passive:!0}),n.addEventListener("touchend",r,{passive:!0}),n.addEventListener("touchcancel",r,{passive:!0}),n.addEventListener("focusin",a),n.addEventListener("focusout",r)})}function ye(){if(!de||!ue)return;const e=new Date,t=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0");de.textContent=`${t}:${n}`;const o=["Dom","Lun","Mar","Mer","Gio","Ven","Sab"],s=["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"],a=e.getDate(),r=o[e.getDay()],c=s[e.getMonth()];ue.textContent=`${r} ${a} ${c}`}let T=null,I=!0,pe=!1,fe=0;function P(){return I?(T||(T=new(window.AudioContext||window.webkitAudioContext)),T.state==="suspended"&&T.resume().catch(()=>{}),T):null}function q(){const e=P();if(e){e.state==="suspended"&&e.resume().catch(()=>{});try{const t=e.createBuffer(1,1,e.sampleRate),n=e.createBufferSource();n.buffer=t,n.connect(e.destination),n.start(0)}catch{}}}function $(){pe||(pe=!0,q())}function Te({type:e="sine",freq:t=700,duration:n=.05,gain:o=.04,attack:s=.002,release:a=.035}={}){const r=P();if(!r)return;const c=r.currentTime,m=r.createOscillator(),f=r.createGain();m.type=e,m.frequency.setValueAtTime(t,c),f.gain.setValueAtTime(0,c),f.gain.linearRampToValueAtTime(o,c+s),f.gain.exponentialRampToValueAtTime(1e-4,c+s+a),m.connect(f),f.connect(r.destination),m.start(c),m.stop(c+n+a+.02)}function Ne(){const e=performance.now();e-fe<120||(fe=e,Te({type:"sine",freq:880,duration:.03,gain:.026,attack:.002,release:.03}))}function M(){Te({type:"triangle",freq:520,duration:.03,gain:.05,attack:.001,release:.02})}let y=null;function _(){const e=P();if(!e||y)return;const t=e.createGain();t.gain.value=0,t.connect(e.destination);const n=e.createDelay(.35);n.delayTime.value=.18;const o=e.createGain();o.gain.value=.2,n.connect(o),o.connect(n);const s=e.createGain();s.gain.value=.25;const a=e.createBiquadFilter();a.type="lowpass",a.frequency.value=2600,a.Q.value=.7,a.connect(t),a.connect(n),n.connect(s),s.connect(t);const r=e.createOscillator();r.type="sine",r.frequency.value=130.81;const c=e.createGain();c.gain.value=1e-4,r.connect(c),c.connect(a);const m=e.createOscillator();m.type="sine",m.frequency.value=.08;const f=e.createGain();f.gain.value=.007,m.connect(f),f.connect(c.gain);const R=e.currentTime;r.start(R),m.start(R);function ae(A,u,S=.05){const p=e.createOscillator(),h=e.createGain(),w=e.createBiquadFilter();p.type="triangle",p.frequency.setValueAtTime(A,u),w.type="highpass",w.frequency.setValueAtTime(240,u),h.gain.setValueAtTime(1e-4,u),h.gain.exponentialRampToValueAtTime(S,u+.01),h.gain.exponentialRampToValueAtTime(1e-4,u+.22),p.connect(w),w.connect(h),h.connect(a),p.start(u),p.stop(u+.3)}function ze(A,u,S=.018){const p=e.createOscillator(),h=e.createGain(),w=e.createBiquadFilter();p.type="sine",p.frequency.setValueAtTime(A,u),w.type="lowpass",w.frequency.setValueAtTime(520,u),h.gain.setValueAtTime(1e-4,u),h.gain.exponentialRampToValueAtTime(S,u+.008),h.gain.exponentialRampToValueAtTime(1e-4,u+.18),p.connect(w),w.connect(h),h.connect(a),p.start(u),p.stop(u+.22)}const F=[{tones:[261.63,329.63,392],bass:130.81},{tones:[349.23,440,523.25],bass:174.61},{tones:[220,261.63,329.63],bass:110},{tones:[196,246.94,293.66],bass:98}],U=[[0,1,2,1,0,2,1,2],[0,2,1,2,0,1,2,1],[0,1,0,2,1,2,1,0]],Be=300,ce=8,Ge=2;let W=0,K=0,X=0,Y=0;function le(){if(!I||!T||!y)return;const A=T.currentTime,u=F[X%F.length],S=U[Y%U.length],p=W%ce,h=S[p]%u.tones.length,w=u.tones[h],ke=p===0?.058:p===4?.05:.04;ae(w,A+.01,ke),p===0&&ze(u.bass,A+.01,.016),Math.random()<.1&&ae(w*2,A+.06,.026),W+=1,W%ce===0&&(K+=1,K%2===0&&(Y=(Y+1)%U.length),K%Ge===0&&(X=(X+1)%F.length)),y.timerId=window.setTimeout(le,Be)}y={musicGain:t,lp:a,delay:n,fb:o,delayMix:s,drone:r,droneGain:c,lfo:m,timerId:null},le(),t.gain.setTargetAtTime(.4,e.currentTime,.7)}function Fe(){if(!T||!y)return;const e=T.currentTime;y.timerId&&clearTimeout(y.timerId),y.musicGain.gain.setTargetAtTime(1e-4,e,.25),setTimeout(()=>{try{y.drone?.stop()}catch{}try{y.lfo?.stop()}catch{}y=null},400)}O&&(O.textContent="🔊",O.addEventListener("click",()=>{I=!I,O.textContent=I?"🔊":"🔇",I?($(),q(),_(),M()):Fe()}));G&&(G.textContent="🎮");["pointerdown","touchstart","mousedown"].forEach(e=>{window.addEventListener(e,()=>{I&&($(),_())},{once:!0,passive:!0})});const d={href:null,projectIndex:0,slideIndex:0,dom:null};let z=null;const ve="https://www.linkedin.com/in/valerio-serani-682a48215/",Ue="https://www.instagram.com/velvet_172/",We="https://www.tiktok.com/@heyits172",Ke="https://vimeo.com/user95787021",Xe="https://www.behance.net/velvet172",he="valerioserani@gmail.com",we="+39 3469697747",ie={"#projects":{title:"Progetti",projects:[{id:"bestof",slides:[{src:l("img/PROGETTI/PROG_1.jpg"),client:"Sunsilk",title:"Testata Home 2025",what:"Creativity + layout",moreHtml:`
              <h3 class="chMoreTitle">Sunsilk — Testata Home</h3>
              <p class="chMoreText">Progetto estratto dal portfolio accademico pubblicato su LinkedIn. Focus su gerarchia visiva, adattamento testata e leggibilità in home.</p>
            `},{src:l("img/PROGETTI/PROG_2.jpg"),client:"M&M’s / UCI",title:"Screentime Cinema",what:"Layout + output ADV",moreHtml:`
              <h3 class="chMoreTitle">M&M’s / UCI — Screentime</h3>
              <p class="chMoreText">Studio ADV dedicato al formato cinema: impaginazione del messaggio, bilanciamento brand/prodotto e output orientato alla visibilità.</p>
            `},{src:l("img/PROGETTI/PROG_3.jpg"),client:"Cliente",title:"Visual",what:"Creativity / design",moreHtml:`
              <h3 class="chMoreTitle">Visual</h3>
              <p class="chMoreText">Concept visual con approccio design-first: direzione creativa, composizione e resa finale pensata per contenuti social e digital.</p>
            `},{src:l("img/PROGETTI/PROG_4.jpg"),client:"Snickers / Twix",title:"Cover Adattamento",what:"Visual + layout",moreHtml:`
              <h3 class="chMoreTitle">Snickers / Twix</h3>
              <p class="chMoreText">Adattamento cover multi-brand con attenzione a consistenza grafica, impatto del key visual e coerenza tra linee prodotto.</p>
            `},{src:l("img/PROGETTI/PROG_5.jpg"),client:"Compeed",title:"Volantino Stop Brufoli",what:"Print / layout",moreHtml:`
              <h3 class="chMoreTitle">Compeed — Volantino</h3>
              <p class="chMoreText">Materiale print orientato alla conversione: struttura informativa chiara, call to action evidente e visual di supporto al messaggio.</p>
            `},{src:l("img/PROGETTI/PROG_6.jpg"),client:"Boem",title:"Visual",what:"Brand / creative",moreHtml:`
              <h3 class="chMoreTitle">Boem</h3>
              <p class="chMoreText">Esplorazione brand/creative: ricerca di tono visivo, elementi distintivi e applicazione coerente su formato statico.</p>
            `},{src:l("img/PROGETTI/PROG_7.jpg"),client:"Landing",title:"Carousel",what:"UI / layout",moreHtml:`
              <h3 class="chMoreTitle">Landing Carousel</h3>
              <p class="chMoreText">Proposta UI per carousel in landing: ordine dei contenuti, ritmo di navigazione e leggibilità mobile-first.</p>
            `},{src:l("img/PROGETTI/PROG_8.jpg"),client:"Cartolina",title:"Fronte",what:"Print / design",moreHtml:`
              <h3 class="chMoreTitle">Cartolina</h3>
              <p class="chMoreText">Output editoriale/print con focus su layout, equilibrio tipografico e resa visiva immediata sul formato ridotto.</p>
            `},{src:l("img/PROGETTI/PROG_9.jpg"),client:"Control",title:"Visual",what:"Brand / layout",moreHtml:`
              <h3 class="chMoreTitle">Control</h3>
              <p class="chMoreText">Visual brand-oriented sviluppato per rafforzare riconoscibilità e chiarezza del messaggio in ambiente digitale.</p>
            `},{src:l("img/PROGETTI/PROG_10.jpg"),client:"Amuchina",title:"Hai Vinto",what:"Campaign / visual",moreHtml:`
              <h3 class="chMoreTitle">Amuchina — Hai Vinto</h3>
              <p class="chMoreText">Creatività per campagna promozionale: headline e visual impostati per immediatezza, impatto e lettura rapida.</p>
            `},{src:l("img/PROGETTI/PROG_11.jpg"),client:"Campagna",title:"Hai Vinto",what:"Visual / layout",moreHtml:`
              <h3 class="chMoreTitle">Hai Vinto</h3>
              <p class="chMoreText">Variante visual della campagna con focus su adattamento grafico, coerenza narrativa e pulizia compositiva.</p>
            `},{src:l("img/PROGETTI/PROG_12.jpg"),client:"Testata Home",title:"Visual",what:"Layout / design",moreHtml:`
              <h3 class="chMoreTitle">Testata Home</h3>
              <p class="chMoreText">Sviluppo testata in piu varianti: priorita ai contenuti, bilanciamento spazi e ottimizzazione dell'impatto above-the-fold.</p>
            `},{src:l("img/PROGETTI/PROG_13.jpg"),client:"UILtemp",title:"App Site Play",what:"UI / layout",moreHtml:`
              <h3 class="chMoreTitle">UILtemp — App Site</h3>
              <p class="chMoreText">Case UI/layout per sito-app: struttura delle sezioni, chiarezza d'uso e coerenza visiva tra componenti.</p>
            `}]}]},"#videos":{title:"Video",html:`
      <div class="wii-card">
        <h3>Showreel</h3>
        <p><strong>Selezione</strong> dei progetti <strong>visual</strong> e <strong>ADV</strong> presenti nel portfolio pubblicato su <strong>LinkedIn</strong>, sintetizzati in formato breve.</p>
      </div>
      <div class="wii-card">
        <h3>Underwater</h3>
        <p><strong>Produzione video</strong> dedicata alle riprese subacquee: <strong>storytelling visivo</strong>, controllo <strong>luce/colore</strong> e contenuti per <strong>social</strong>.</p>
      </div>
    `},"#about":{title:"Chi sono",html:`
      <div class="wii-card bio-card">
        <div class="bioCarousel" aria-label="Chi sono - carosello">
          <img class="bioMedia" src="${l("img/BIO/BIO_1.jpg")}" alt="" loading="lazy" decoding="async">
          <img class="bioMedia" src="${l("img/BIO/BIO_2.jpg")}" alt="" loading="lazy" decoding="async">
          <img class="bioMedia" src="${l("img/BIO/BIO_3.jpg")}" alt="" loading="lazy" decoding="async">
        </div>
        <div class="bioDesc">
          <h3>Chi sono</h3>
          <p>Ciao, sono <strong>Valerio</strong>: junior <strong>graphic designer</strong> di <strong>Roma</strong> e autentico nerd. Ho approcciato il design attraverso <strong>videogiochi</strong>, <strong>copertine</strong> e <strong>cultura pop</strong>, trasformando questa passione in un percorso professionale.</p>
          <p>Il mio approccio unisce <strong>sperimentazione</strong>, <strong>rischio</strong> e <strong>senso estetico</strong> per creare output non solo appaganti, ma soprattutto <strong>funzionali</strong>.</p>
          <p>Negli ultimi mesi ho continuato a <strong>sperimentare</strong> con i <strong>video social</strong>: ho curato <strong>fotografia</strong>, <strong>regia</strong> e <strong>montaggio</strong>, uscendo dalla mia <strong>zona di comfort</strong>. Sperimentare e imparare sul campo è la parte che mi entusiasma di più.</p>
          <p class="wii-meta">Lingue: <strong>Italiano C2</strong>, <strong>English B2</strong></p>
        </div>
      </div>
    `},"#contact":{title:"Contatti",html:`
      <div class="wii-card">
        <h3>Contatti diretti</h3>
        <p><strong>Email</strong>: <a href="mailto:${he}">${he}</a></p>
        <p><strong>Telefono</strong>: <a href="tel:${we.replace(/\s+/g,"")}">${we}</a></p>
        <p class="wii-meta">Base: <strong>Roma</strong></p>
      </div>
      <div class="wii-card">
        <h3>Profilo LinkedIn</h3>
        <p><strong>Profilo LinkedIn</strong> con esperienza, formazione e contatti.</p>
        <div class="wii-links">
          <a class="wii-link" href="${ve}" target="_blank" rel="noopener noreferrer">
            Apri profilo LinkedIn
          </a>
        </div>
      </div>
    `},"#social":{title:"Social",html:`
      <div class="wii-card">
        <h3>Canali social</h3>
        <p>Qui trovi tutti i miei social: raccontano la mia parte piu professionale e quella piu ludica. Passione e lavoro sono sempre andati di pari passo nella mia vita, e qui li vedi convivere.</p>
        <div class="social-list">
          <a class="social-item" href="${ve}" target="_blank" rel="noopener noreferrer">
            <span class="social-ico">💼</span>
            <span class="social-text"><strong>LinkedIn</strong> /valerio-serani-682a48215</span>
          </a>
          <a class="social-item" href="${Ue}" target="_blank" rel="noopener noreferrer">
            <span class="social-ico">📸</span>
            <span class="social-text"><strong>Instagram</strong> @velvet_172</span>
          </a>
          <a class="social-item" href="${We}" target="_blank" rel="noopener noreferrer">
            <span class="social-ico">🎵</span>
            <span class="social-text"><strong>TikTok</strong> @heyits172</span>
          </a>
          <a class="social-item" href="${Ke}" target="_blank" rel="noopener noreferrer">
            <span class="social-ico">🎬</span>
            <span class="social-text"><strong>Vimeo</strong> /user95787021</span>
          </a>
          <a class="social-item" href="${Xe}" target="_blank" rel="noopener noreferrer">
            <span class="social-ico">🅱️</span>
            <span class="social-text"><strong>Behance</strong> /velvet172</span>
          </a>
        </div>
      </div>
    `},"#exp":{title:"Esperienze",html:`
      <div class="wii-card">
        <h3>Graphic Designer Jr - Cube Proemotion</h3>
        <p class="wii-meta"><strong>Gen 2024 - Gen 2026</strong> | <strong>Roma</strong></p>
        <ul class="wii-list">
          <li>Collaborazione con <strong>team creativo</strong> per <strong>concept</strong> in linea con esigenze <strong>marketing</strong> e <strong>branding</strong>.</li>
          <li>Realizzazione <strong>materiali grafici</strong> per campagne pubblicitarie, promozione e social.</li>
          <li>Progettazione <strong>layout</strong> per sito web, social media e newsletter.</li>
          <li>Gestione file per <strong>produzione</strong> e coordinamento qualita con attenzione al dettaglio.</li>
          <li>Supporto nella creazione <strong>contenuti visivi</strong> per eventi e promozioni aziendali.</li>
        </ul>
      </div>
      <div class="wii-card">
        <h3>Formazione</h3>
        <ul class="wii-list">
          <li><strong>LEARNN</strong> - Percorsi completati su <strong>marketing digitale</strong>, <strong>social media</strong>, <strong>AI</strong> e produttivita creativa.</li>
          <li>Corso <strong>Digital Skills</strong>, <strong>Marketing</strong>, <strong>SEO</strong> (LV8 Certification Badge, Roma).</li>
          <li><strong>NFT e Metaverso</strong> con Davide Cardea (Giu 2022, Roma).</li>
          <li><strong>AANT</strong> - Accademia delle Arti e Nuove Tecnologie, <strong>Graphic Design</strong> (Nov 2019 - Giu 2022, Roma).</li>
          <li><strong>Liceo Scientifico Francesco d'Assisi</strong> (Set 2012 - Giu 2018, Roma).</li>
        </ul>
      </div>
    `},"#services":{title:"Servizi",html:`
      <div class="wii-card">
        <h3>Cosa offro</h3>
        <ul class="wii-list">
          <li><strong>Visual design</strong> per campagne <strong>ADV</strong> e social.</li>
          <li><strong>Art direction</strong> e sviluppo <strong>concept</strong>.</li>
          <li><strong>Layout</strong> per sito, newsletter e contenuti digital.</li>
          <li>Adattamenti creativi <strong>multi-formato</strong> (print e digital).</li>
          <li>Supporto al team marketing con output orientati alla <strong>comunicazione</strong> e alla funzione.</li>
        </ul>
      </div>
    `},"#tools":{title:"Tool",html:`
      <div class="wii-card">
        <h3>Hard Skills</h3>
        <ul class="wii-list">
          <li><strong>Adobe Suite</strong> (Photoshop, Illustrator, InDesign, After Effects, Premiere Pro).</li>
          <li><strong>Art direction</strong> e <strong>copywriting</strong>.</li>
          <li><strong>3D</strong>: Cinema4D, Substance Designer, V-Ray, Chitubox.</li>
          <li><strong>Collaborazione</strong>: Figma, Mural, Whimsical.</li>
          <li><strong>Video art direction</strong> e video editing (ideazione, script, storyboard, montaggio).</li>
        </ul>
      </div>
    `},"#ai":{title:"AI",html:`
      <div class="wii-card">
        <h3>Workflow AI</h3>
        <p>Sono un <strong>"AI nerd"</strong>: uso l'<strong>AI</strong> per <strong>ricerca</strong>, direzione creativa e velocita di esecuzione, mantenendo controllo umano su <strong>concept</strong> e <strong>qualita</strong>. In questo sito applico un <strong>workflow AI/web</strong> completo: revisione contenuti, riscrittura sezioni, struttura della griglia, aggiornamento esperienze e sincronizzazione con <strong>portfolio/CV</strong>. Ho integrato <strong>chat</strong> e <strong>coding</strong> (vibe coding) e un processo a catena tra analisi file, generazione asset, modifiche front-end e test, rendendo questo sito un vero e proprio <strong>showcase</strong> delle mie abilita con l'AI.</p>
        <p class="wii-meta">Obiettivo: <strong>accelerare tempi</strong> e <strong>qualita</strong>, mantenendo controllo creativo umano su tono, priorita e coerenza finale.</p>
      </div>
    `},"#auto":{title:"Automotive",html:`
      <div class="wii-card">
        <h3>Automotive Visuals</h3>
        <p>Canale dedicato a contenuti automotive: visual campaign, branding e creativita per officine o brand di settore.</p>
      </div>
    `},"#underwater":{title:"Underwater",html:`
      <div class="wii-card">
        <h3>Riprese Sub</h3>
        <p>Produzione visual e video underwater con focus su storytelling, composizione e color mood.</p>
      </div>
    `},"#high":{title:"Highlight",html:`
      <div class="wii-card">
        <h3>In evidenza dal portfolio</h3>
        <ul class="wii-list">
          <li>Visione creativa ispirata a cultura pop, videogiochi e fumetti.</li>
          <li>Ricerca di equilibrio tra sperimentazione e funzionalita.</li>
          <li>Esperienza attiva come Graphic Designer Jr.</li>
          <li>Background accademico in Graphic Design.</li>
          <li>Competenze trasversali tra ADV, digital layout, social e video direction.</li>
          <li>Soft skills: teamwork, empatia, problem solving, creativita.</li>
        </ul>
      </div>
    `},"#minigame":{title:"Bubble Pop",html:`
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
    `}};function Ye(){if(!g)return;const e=ie["#projects"],n=(e.projects[d.projectIndex]||e.projects[0])?.slides||[];if(!n.length)return;d.slideIndex=je(d.slideIndex,0,n.length-1),g.innerHTML=`
  <div class="chCarousel" data-channel="#projects">
    <div class="chStage">
      <div class="chFrame" data-ch-frame>
        ${n.map((a,r)=>`
              <img class="chMedia ${r===d.slideIndex?"is-on":""}"
                   src="${a.src}" alt="" loading="lazy" decoding="async">
            `).join("")}

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
`;const o={frame:g.querySelector("[data-ch-frame]"),imgs:Array.from(g.querySelectorAll(".chMedia")),more:g.querySelector(".chMore"),moreContent:g.querySelector(".chMoreContent"),capClient:g.querySelector('[data-cap="client"]'),capTitle:g.querySelector('[data-cap="title"]'),capWhat:g.querySelector('[data-cap="what"]')};d.dom=o,ne(n,d.slideIndex);const s=g.querySelector('[data-ch="more"]');s&&(s.textContent="Scopri di più")}function ne(e,t){const n=e[t],o=d.dom;!n||!o||(o.capClient&&(o.capClient.textContent=n.client||""),o.capTitle&&(o.capTitle.textContent=n.title||""),o.capWhat&&(o.capWhat.textContent=n.what||""),o.frame&&o.frame.style.setProperty("--ch-bg",`url("${n.src}")`),o.moreContent&&(o.moreContent.innerHTML=n.moreHtml||""))}function J(){return!!d.dom?.frame?.classList.contains("is-more")}function Je(e){const t=d.dom;!t?.frame||!t?.more||(t.frame.classList.add("is-more"),t.more.classList.add("is-open"),t.more.setAttribute("aria-hidden","false"),ne(e,d.slideIndex))}function B(){const e=d.dom;!e?.frame||!e?.more||(e.frame.classList.remove("is-more"),e.more.classList.remove("is-open"),e.more.setAttribute("aria-hidden","true"))}function Qe(){Ie();const e=g?.querySelector(".bioCarousel"),t=g?.querySelector(".wii-card"),n=e?Array.from(e.querySelectorAll(".bioMedia")):[];if(!e||!n.length)return;t&&t.classList.add("bio-no-blur");let o=0;const s=()=>{n.forEach((r,c)=>r.classList.toggle("is-on",c===o));const a=n[o]?.getAttribute("src");a&&e.style.setProperty("--bio-bg",`url("${a}")`)};s(),z=window.setInterval(()=>{o=(o+1)%n.length,s()},3e3),t&&t.classList.add("bio-no-blur")}function Ie(){z&&(clearInterval(z),z=null)}function Ee(e){if(!v||!me||!g)return;d.href=e,v.classList.toggle("is-game",e==="#minigame"),v.classList.toggle("is-carousel",e==="#projects"),v.classList.toggle("is-about",e==="#about"),v.classList.toggle("is-exp",e==="#exp");const t=ie[e]||{title:"Canale",html:'<div class="wii-card"><h3>Coming soon</h3><p>Contenuto in arrivo.</p></div>'};me.textContent=t.title,e==="#projects"&&t.projects?(d.projectIndex=0,d.slideIndex=0,d.dom=null,Ye()):e==="#about"?(g.innerHTML=t.html||"",Qe()):g.innerHTML=t.html||"",v.classList.add("is-open"),v.setAttribute("aria-hidden","false"),e==="#minigame"?requestAnimationFrame(()=>{it()&&H()}):N(!1),M()}function D(){v&&(B(),N(!1),Ie(),v.classList.remove("is-open","is-game","is-carousel"),v.setAttribute("aria-hidden","true"),M())}ge&&ge.addEventListener("click",D);function Ze(e){!E||!k||!e||(k.src=e,E.classList.add("is-open"),E.setAttribute("aria-hidden","false"))}function Ce(){!E||!k||(E.classList.remove("is-open"),E.setAttribute("aria-hidden","true"),k.src="")}E&&E.addEventListener("click",Ce);v&&v.addEventListener("click",e=>{e.target===v&&D()});document.addEventListener("keydown",e=>{if(e.key==="Escape"&&E?.classList.contains("is-open")){Ce();return}e.key==="Escape"&&v?.classList.contains("is-open")&&D()});document.addEventListener("click",e=>{if(!L)return;const t=e.target?.closest?.(".wii-tile");if(!t)return;const n=t.getAttribute("data-href")||t.getAttribute("href");n&&n.startsWith("#")&&(e.preventDefault(),Ee(n))});G&&G.addEventListener("click",e=>{L&&(e.preventDefault(),Ee("#minigame"))});g?.addEventListener("click",e=>{if(d.href==="#projects"&&e.target?.closest?.("[data-ch-frame]")){const f=d.dom?.imgs?.find(R=>R.classList.contains("is-on"))?.getAttribute("src");if(f){e.preventDefault(),e.stopPropagation(),Ze(f);return}}const t=e.target?.closest?.("[data-ch]"),n=t?.getAttribute("data-ch");if(e.target?.closest?.("[data-ch-frame]")&&J()&&!t){B();const c=g.querySelector('[data-ch="more"]');c&&(c.textContent="Scopri di più");return}if(!n||d.href!=="#projects")return;const s=ie["#projects"],r=(s.projects[d.projectIndex]||s.projects[0])?.slides||[];if(r.length){if(n==="more"){J()?(B(),t.textContent="Scopri di più"):(Je(r),t.textContent="Chiudi");return}if(n==="prev"||n==="next"){if(J()){B();const c=g.querySelector('[data-ch="more"]');c&&(c.textContent="Scopri di più")}n==="prev"?d.slideIndex=(d.slideIndex-1+r.length)%r.length:d.slideIndex=(d.slideIndex+1)%r.length,d.dom?.imgs?.forEach((c,m)=>c.classList.toggle("is-on",m===d.slideIndex)),ne(r,d.slideIndex);return}}});let Ae=0,xe=0,Q=0,Z=0,te=!1,V="mouse",j=null;function et(){b&&(te||(te=!0,b.style.opacity="1"))}function Le(){b&&(te=!1,b.style.opacity="0")}function Se(){Q+=(Ae-Q)*.18,Z+=(xe-Z)*.18;const e=-10,t=-4;b&&(b.style.transform=`translate3d(${Q+e}px, ${Z+t}px, 0)`),requestAnimationFrame(Se)}requestAnimationFrame(Se);window.addEventListener("pointermove",e=>{if(V=e.pointerType||"mouse",V!=="mouse"){Le();return}Ae=e.clientX,xe=e.clientY,et()});window.addEventListener("mouseleave",()=>Le());const Pe=".wii-tile, .wii-pill";function Me(e){b&&b.classList.toggle("is-hover",e)}document.addEventListener("pointerover",e=>{if(V!=="mouse")return;const t=e.target?.closest?.(Pe);t&&t!==j&&(j=t,Me(!0),Ne())});document.addEventListener("pointerout",e=>{const t=e.target?.closest?.(Pe);if(t&&t===j){const n=e.relatedTarget;if(n&&t.contains(n))return;j=null,Me(!1)}});document.addEventListener("pointerdown",()=>{I&&($(),q(),_()),!(!b||V!=="mouse")&&(b.classList.add("is-down"),M())});document.addEventListener("pointerup",()=>{b&&b.classList.remove("is-down")});let i={running:!1,score:0,timeLeft:30,lastTs:0,spawnAcc:0,bubbles:[],rafId:null,timerId:null,canvas:null,ctx:null,scoreEl:null,timeEl:null,overEl:null,overScoreEl:null,overRestartBtn:null,overCloseBtn:null};function oe(){i.overEl&&(i.overEl.classList.remove("is-show"),i.overEl.setAttribute("aria-hidden","true"))}function tt(){i.overEl&&(i.overScoreEl&&(i.overScoreEl.textContent=String(i.score)),i.overEl.classList.add("is-show"),i.overEl.setAttribute("aria-hidden","false"))}function it(){i.canvas=document.getElementById("mgCanvas"),i.scoreEl=document.getElementById("mgScore"),i.timeEl=document.getElementById("mgTime"),i.overEl=document.getElementById("mgOver"),i.overScoreEl=document.getElementById("mgOverScore"),i.overRestartBtn=document.getElementById("mgOverRestart"),i.overCloseBtn=document.getElementById("mgOverClose");const e=document.getElementById("mgStart"),t=document.getElementById("mgReset");return i.canvas?(i.ctx=i.canvas.getContext("2d"),oe(),i.overRestartBtn&&(i.overRestartBtn.onclick=()=>{H(),be()}),i.overCloseBtn&&(i.overCloseBtn.onclick=()=>D()),i.canvas.onpointerdown=n=>{if(!i.running)return;const o=i.canvas.getBoundingClientRect(),s=(n.clientX-o.left)/o.width*i.canvas.width,a=(n.clientY-o.top)/o.height*i.canvas.height;for(let r=i.bubbles.length-1;r>=0;r--){const c=i.bubbles[r],m=s-c.x,f=a-c.y;if(m*m+f*f<=c.r*c.r){i.bubbles.splice(r,1),i.score+=1,i.scoreEl&&(i.scoreEl.textContent=String(i.score)),ot();return}}},e&&(e.onclick=()=>be()),t&&(t.onclick=()=>H()),re(),!0):!1}function re(){if(!i.canvas)return;const e=Math.min(window.devicePixelRatio||1,2),t=i.canvas.clientWidth,n=i.canvas.clientHeight;if(!t||!n)return;const o=Math.round(t*e),s=Math.round(n*e);(i.canvas.width!==o||i.canvas.height!==s)&&(i.canvas.width=o,i.canvas.height=s)}function H(){N(!1),oe(),i.score=0,i.timeLeft=30,i.bubbles=[],i.scoreEl&&(i.scoreEl.textContent="0"),i.timeEl&&(i.timeEl.textContent="30"),Oe()}function be(){i.running||(i.timeLeft<=0&&H(),oe(),i.running=!0,i.lastTs=performance.now(),i.spawnAcc=0,i.timerId=window.setInterval(()=>{i.running&&(i.timeLeft-=1,i.timeEl&&(i.timeEl.textContent=String(i.timeLeft)),i.timeLeft<=0&&(i.timeLeft=0,i.timeEl&&(i.timeEl.textContent="0"),N(!0)))},1e3),i.rafId=requestAnimationFrame(Re))}function N(e=!1){i.running=!1,i.timerId&&(clearInterval(i.timerId),i.timerId=null),i.rafId&&(cancelAnimationFrame(i.rafId),i.rafId=null),e&&(tt(),rt())}function nt(){if(!i.canvas)return;const e=i.canvas.width,t=i.canvas.height,n=22+Math.random()*26,o=n+Math.random()*(e-n*2),s=n+Math.random()*(t-n*2),a=(-.25+Math.random()*.5)*(window.devicePixelRatio||1),r=(-.15+Math.random()*.35)*(window.devicePixelRatio||1),c=3.2+Math.random()*1.8;i.bubbles.push({x:o,y:s,r:n,vx:a,vy:r,born:performance.now(),life:c})}function Re(e){if(!i.running)return;const t=Math.min((e-i.lastTs)/1e3,.05);i.lastTs=e,re();const o=.55/(1+(30-i.timeLeft)*.03);for(i.spawnAcc+=t;i.spawnAcc>=o;)i.spawnAcc-=o,nt();const s=performance.now();for(let a=i.bubbles.length-1;a>=0;a--){const r=i.bubbles[a];r.x+=r.vx*60*t,r.y+=r.vy*60*t,r.x-r.r<0&&(r.x=r.r,r.vx*=-1),r.x+r.r>i.canvas.width&&(r.x=i.canvas.width-r.r,r.vx*=-1),r.y-r.r<0&&(r.y=r.r,r.vy*=-1),r.y+r.r>i.canvas.height&&(r.y=i.canvas.height-r.r,r.vy*=-1),(s-r.born)/1e3>r.life&&i.bubbles.splice(a,1)}Oe(),i.rafId=requestAnimationFrame(Re)}function Oe(){if(!i.ctx||!i.canvas)return;const e=i.ctx,t=i.canvas.width,n=i.canvas.height;e.clearRect(0,0,t,n),e.fillStyle="rgba(255,255,255,0.22)",e.fillRect(0,0,t,n);for(const o of i.bubbles){const s=e.createRadialGradient(o.x-o.r*.35,o.y-o.r*.35,o.r*.2,o.x,o.y,o.r);s.addColorStop(0,"rgba(255,255,255,0.95)"),s.addColorStop(.35,"rgba(255,255,255,0.35)"),s.addColorStop(1,"rgba(43,184,255,0.18)"),e.beginPath(),e.arc(o.x,o.y,o.r,0,Math.PI*2),e.fillStyle=s,e.fill(),e.lineWidth=2,e.strokeStyle="rgba(43,184,255,0.35)",e.stroke(),e.beginPath(),e.arc(o.x-o.r*.25,o.y-o.r*.25,o.r*.28,0,Math.PI*2),e.fillStyle="rgba(255,255,255,0.28)",e.fill()}}function ot(){const e=P();if(!e)return;const t=e.currentTime,n=e.createOscillator(),o=e.createGain();n.type="sine",n.frequency.setValueAtTime(620,t),n.frequency.exponentialRampToValueAtTime(280,t+.06),o.gain.setValueAtTime(1e-4,t),o.gain.exponentialRampToValueAtTime(.08,t+.008),o.gain.exponentialRampToValueAtTime(1e-4,t+.1),n.connect(o),o.connect(e.destination),n.start(t),n.stop(t+.12)}function rt(){const e=P();if(!e)return;const t=e.currentTime;[880,740,622].forEach((o,s)=>{const a=e.createOscillator(),r=e.createGain(),c=t+s*.12;a.type="triangle",a.frequency.setValueAtTime(o,c),r.gain.setValueAtTime(1e-4,c),r.gain.exponentialRampToValueAtTime(.06,c+.01),r.gain.exponentialRampToValueAtTime(1e-4,c+.16),a.connect(r),r.connect(e.destination),a.start(c),a.stop(c+.18)})}window.addEventListener("resize",()=>{document.getElementById("mgCanvas")&&re()});function ee(){L||(L=!0,x&&(x.classList.add("is-hidden"),x.setAttribute("aria-hidden","true")),I&&($(),q(),_()),M())}function st(){if(!x){L=!0;return}x.addEventListener("click",e=>{e.preventDefault(),ee()}),x.addEventListener("pointerdown",e=>{e.preventDefault(),ee()}),window.addEventListener("keydown",e=>{L||(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),ee())})}function se(){const e=window.visualViewport?.height||window.innerHeight;document.documentElement.style.setProperty("--vh",`${e}px`)}$e();C&&C.classList.add("is-swoosh-in");ye();setInterval(ye,1e3);st();se();window.addEventListener("resize",se);window.visualViewport?.addEventListener("resize",se);
