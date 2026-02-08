(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function o(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=o(s);fetch(s.href,a)}})();const qe="/Portfolio_Valerio/",d=e=>`${qe}${e.replace(/^\/+/,"")}`,A=document.getElementById("wiiIntro");let S=!1;const T=document.getElementById("grid");document.getElementById("board");const ue=document.getElementById("time"),me=document.getElementById("date"),z=document.getElementById("btnLeft"),k=document.getElementById("btnRight"),v=document.getElementById("wiiOverlay"),ge=document.getElementById("overlayBack"),pe=document.getElementById("overlayTitle"),m=document.getElementById("overlayBody"),y=document.getElementById("wiiPointer"),x=document.getElementById("imgViewer"),G=document.getElementById("imgViewerSrc");function He(e,t,o){return Math.max(t,Math.min(o,e))}const _e=[[{icon:"👋",t:"Chi sono",s:"Bio + competenze",href:"#about",previews:[d("img/BIO/BIO_1.jpg"),d("img/BIO/BIO_2.jpg"),d("img/BIO/BIO_3.jpg")]},{icon:"🎓",t:"Esperienze",s:"Formazione / studi",href:"#exp"},{icon:"✉️",t:"Contatti",s:"Mail e social",href:"#contact"},{icon:"🧩",t:"Progetti",s:"Case study e lavori",href:"#projects",previews:[d("img/PROGETTI/PROG_1.jpg"),d("img/PROGETTI/PROG_2.jpg"),d("img/PROGETTI/PROG_3.jpg")]},{icon:"📱",t:"Social",s:"I miei profili",href:"#social"},{icon:"🎬",t:"Video",s:"Social e progetti",href:"#videos"},{icon:"🛠️",t:"Skills",s:"Cosa so fare",href:"#tools"},{icon:"🤖",t:"AI",s:"Workflow",href:"#ai",previewVideo:{src:d("img/CHANNELS/ai.mp4")}},{icon:"📌",t:"Servizi",s:"Cosa offro",href:"#services",previewVideo:{src:d("img/CHANNELS/servizi.mp4")}}],[{icon:"📷",t:"Galleria",s:"Foto e frame",href:"#gallery"},{icon:"🗂️",t:"Archivio",s:"Lavori passati",href:"#archive"},{icon:"📝",t:"Blog",s:"Note e making-of",href:"#blog"},{icon:"📍",t:"Dove sono",s:"Roma / contatti",href:"#where"}]];let P=0;const $e=420,De=320;function Ne(){return _e[0]}function Fe(){if(!T)return;const e=Ne();T.innerHTML=e.map(t=>{const o=t.previewVideo?.src,n=Array.isArray(t.previews)?t.previews:[],s=o?`
          <div class="wii-preview wii-preview--single wii-preview--video" aria-hidden="true">
            <video class="preview-video" src="${t.previewVideo.src}" muted loop playsinline preload="auto"></video>
          </div>
        `:n.length?`
          <div class="wii-preview ${n.length===1?"wii-preview--single":""}" aria-hidden="true">
            ${n.map(a=>`<img src="${a}" alt="" loading="lazy" decoding="async">`).join("")}
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
      `}).join(""),Ue(),We(),Te()}function Ue(){if(!T)return;Array.from(T.querySelectorAll(".wii-preview:not(.wii-preview--single)")).forEach(t=>{const o=Math.random()*12;t.style.setProperty("--preview-phase",`-${o.toFixed(2)}s`)})}function Te(){if(!T)return;Array.from(T.querySelectorAll(".wii-preview--video")).forEach(t=>{const o=t.closest(".wii-tile");if(!o)return;const n=o.getBoundingClientRect();if(!n.height)return;const s=n.width/n.height,a=Math.max(1,Math.min(s,16/9));t.style.setProperty("--video-zoom",a.toFixed(3))})}function We(){if(!T)return;Array.from(T.querySelectorAll(".wii-preview--video")).forEach(t=>{const o=t.closest(".wii-tile");if(!o)return;const n=t.querySelector(".preview-video");if(!n)return;n.muted=!0,n.loop=!0,n.setAttribute("playsinline","");const s=()=>{if(n.paused)try{n.currentTime=0}catch{}};n.addEventListener("loadeddata",s,{once:!0});const a=()=>{t.classList.add("is-hover"),n.currentTime=0,n.play().catch(()=>{})},r=()=>{n.pause(),n.currentTime=0,t.classList.remove("is-hover")};o.addEventListener("mouseenter",a),o.addEventListener("mouseleave",r),o.addEventListener("pointerenter",a),o.addEventListener("pointerleave",r),o.addEventListener("focusin",a),o.addEventListener("focusout",r)})}function Ie(){if(!ue||!me)return;const e=new Date,t=String(e.getHours()).padStart(2,"0"),o=String(e.getMinutes()).padStart(2,"0");ue.textContent=`${t}:${o}`;const n=["Dom","Lun","Mar","Mer","Gio","Ven","Sab"],s=["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"],a=e.getDate(),r=n[e.getDay()],c=s[e.getMonth()];me.textContent=`${r} ${a} ${c}`}let I=null,E=!0,fe=!1,ve=0;function M(){return E?(I||(I=new(window.AudioContext||window.webkitAudioContext)),I.state==="suspended"&&I.resume().catch(()=>{}),I):null}function _(){const e=M();if(e){e.state==="suspended"&&e.resume().catch(()=>{});try{const t=e.createBuffer(1,1,e.sampleRate),o=e.createBufferSource();o.buffer=t,o.connect(e.destination),o.start(0)}catch{}}}function $(){fe||(fe=!0,_())}function Ee({type:e="sine",freq:t=700,duration:o=.05,gain:n=.04,attack:s=.002,release:a=.035}={}){const r=M();if(!r)return;const c=r.currentTime,g=r.createOscillator(),f=r.createGain();g.type=e,g.frequency.setValueAtTime(t,c),f.gain.setValueAtTime(0,c),f.gain.linearRampToValueAtTime(n,c+s),f.gain.exponentialRampToValueAtTime(1e-4,c+s+a),g.connect(f),f.connect(r.destination),g.start(c),g.stop(c+o+a+.02)}function Ke(){const e=performance.now();e-ve<120||(ve=e,Ee({type:"sine",freq:880,duration:.03,gain:.026,attack:.002,release:.03}))}function R(){Ee({type:"triangle",freq:520,duration:.03,gain:.05,attack:.001,release:.02})}let b=null;function D(){const e=M();if(!e||b)return;const t=e.createGain();t.gain.value=0,t.connect(e.destination);const o=e.createDelay(.35);o.delayTime.value=.18;const n=e.createGain();n.gain.value=.2,o.connect(n),n.connect(o);const s=e.createGain();s.gain.value=.25;const a=e.createBiquadFilter();a.type="lowpass",a.frequency.value=2600,a.Q.value=.7,a.connect(t),a.connect(o),o.connect(s),s.connect(t);const r=e.createOscillator();r.type="sine",r.frequency.value=130.81;const c=e.createGain();c.gain.value=1e-4,r.connect(c),c.connect(a);const g=e.createOscillator();g.type="sine",g.frequency.value=.08;const f=e.createGain();f.gain.value=.007,g.connect(f),f.connect(c.gain);const O=e.currentTime;r.start(O),g.start(O);function ce(C,u,L=.05){const p=e.createOscillator(),h=e.createGain(),w=e.createBiquadFilter();p.type="triangle",p.frequency.setValueAtTime(C,u),w.type="highpass",w.frequency.setValueAtTime(240,u),h.gain.setValueAtTime(1e-4,u),h.gain.exponentialRampToValueAtTime(L,u+.01),h.gain.exponentialRampToValueAtTime(1e-4,u+.22),p.connect(w),w.connect(h),h.connect(a),p.start(u),p.stop(u+.3)}function Ve(C,u,L=.018){const p=e.createOscillator(),h=e.createGain(),w=e.createBiquadFilter();p.type="sine",p.frequency.setValueAtTime(C,u),w.type="lowpass",w.frequency.setValueAtTime(520,u),h.gain.setValueAtTime(1e-4,u),h.gain.exponentialRampToValueAtTime(L,u+.008),h.gain.exponentialRampToValueAtTime(1e-4,u+.18),p.connect(w),w.connect(h),h.connect(a),p.start(u),p.stop(u+.22)}const U=[{tones:[261.63,329.63,392],bass:130.81},{tones:[349.23,440,523.25],bass:174.61},{tones:[220,261.63,329.63],bass:110},{tones:[196,246.94,293.66],bass:98}],W=[[0,1,2,1,0,2,1,2],[0,2,1,2,0,1,2,1],[0,1,0,2,1,2,1,0]],ke=300,le=8,Ge=2;let K=0,Y=0,X=0,J=0;function de(){if(!E||!I||!b)return;const C=I.currentTime,u=U[X%U.length],L=W[J%W.length],p=K%le,h=L[p]%u.tones.length,w=u.tones[h],je=p===0?.058:p===4?.05:.04;ce(w,C+.01,je),p===0&&Ve(u.bass,C+.01,.016),Math.random()<.1&&ce(w*2,C+.06,.026),K+=1,K%le===0&&(Y+=1,Y%2===0&&(J=(J+1)%W.length),Y%Ge===0&&(X=(X+1)%U.length)),b.timerId=window.setTimeout(de,ke)}b={musicGain:t,lp:a,delay:o,fb:n,delayMix:s,drone:r,droneGain:c,lfo:g,timerId:null},de(),t.gain.setTargetAtTime(.4,e.currentTime,.7)}function Ye(){if(!I||!b)return;const e=I.currentTime;b.timerId&&clearTimeout(b.timerId),b.musicGain.gain.setTargetAtTime(1e-4,e,.25),setTimeout(()=>{try{b.drone?.stop()}catch{}try{b.lfo?.stop()}catch{}b=null},400)}z&&(z.textContent="🔊",z.addEventListener("click",()=>{S&&(performance.now()<P||(E=!E,z.textContent=E?"🔊":"🔇",E?($(),_(),D(),R()):Ye()))}));k&&(k.textContent="🎮");["pointerdown","touchstart","mousedown"].forEach(e=>{window.addEventListener(e,()=>{E&&($(),D())},{once:!0,passive:!0})});const l={href:null,projectIndex:0,slideIndex:0,dom:null};let B=null;const he="https://www.linkedin.com/in/valerio-serani-682a48215/",Xe="https://www.instagram.com/velvet_172/",Je="https://www.tiktok.com/@heyits172",Qe="https://vimeo.com/user95787021",Ze="https://www.behance.net/velvet172",we="valerioserani@gmail.com",ye="+39 3469697747",ne={"#projects":{title:"Progetti",projects:[{id:"bestof",slides:[{src:d("img/PROGETTI/PROG_1.jpg"),client:"Sunsilk",title:"Testata Home 2025",what:"Creativity + layout",moreHtml:`
              <h3 class="chMoreTitle">Sunsilk — Testata Home</h3>
              <p class="chMoreText">Progetto estratto dal portfolio accademico pubblicato su LinkedIn. Focus su gerarchia visiva, adattamento testata e leggibilità in home.</p>
            `},{src:d("img/PROGETTI/PROG_2.jpg"),client:"M&M’s / UCI",title:"Screentime Cinema",what:"Layout + output ADV",moreHtml:`
              <h3 class="chMoreTitle">M&M’s / UCI — Screentime</h3>
              <p class="chMoreText">Studio ADV dedicato al formato cinema: impaginazione del messaggio, bilanciamento brand/prodotto e output orientato alla visibilità.</p>
            `},{src:d("img/PROGETTI/PROG_3.jpg"),client:"Cliente",title:"Visual",what:"Creativity / design",moreHtml:`
              <h3 class="chMoreTitle">Visual</h3>
              <p class="chMoreText">Concept visual con approccio design-first: direzione creativa, composizione e resa finale pensata per contenuti social e digital.</p>
            `},{src:d("img/PROGETTI/PROG_4.jpg"),client:"Snickers / Twix",title:"Cover Adattamento",what:"Visual + layout",moreHtml:`
              <h3 class="chMoreTitle">Snickers / Twix</h3>
              <p class="chMoreText">Adattamento cover multi-brand con attenzione a consistenza grafica, impatto del key visual e coerenza tra linee prodotto.</p>
            `},{src:d("img/PROGETTI/PROG_5.jpg"),client:"Compeed",title:"Volantino Stop Brufoli",what:"Print / layout",moreHtml:`
              <h3 class="chMoreTitle">Compeed — Volantino</h3>
              <p class="chMoreText">Materiale print orientato alla conversione: struttura informativa chiara, call to action evidente e visual di supporto al messaggio.</p>
            `},{src:d("img/PROGETTI/PROG_6.jpg"),client:"Boem",title:"Visual",what:"Brand / creative",moreHtml:`
              <h3 class="chMoreTitle">Boem</h3>
              <p class="chMoreText">Esplorazione brand/creative: ricerca di tono visivo, elementi distintivi e applicazione coerente su formato statico.</p>
            `},{src:d("img/PROGETTI/PROG_7.jpg"),client:"Landing",title:"Carousel",what:"UI / layout",moreHtml:`
              <h3 class="chMoreTitle">Landing Carousel</h3>
              <p class="chMoreText">Proposta UI per carousel in landing: ordine dei contenuti, ritmo di navigazione e leggibilità mobile-first.</p>
            `},{src:d("img/PROGETTI/PROG_8.jpg"),client:"Cartolina",title:"Fronte",what:"Print / design",moreHtml:`
              <h3 class="chMoreTitle">Cartolina</h3>
              <p class="chMoreText">Output editoriale/print con focus su layout, equilibrio tipografico e resa visiva immediata sul formato ridotto.</p>
            `},{src:d("img/PROGETTI/PROG_9.jpg"),client:"Control",title:"Visual",what:"Brand / layout",moreHtml:`
              <h3 class="chMoreTitle">Control</h3>
              <p class="chMoreText">Visual brand-oriented sviluppato per rafforzare riconoscibilità e chiarezza del messaggio in ambiente digitale.</p>
            `},{src:d("img/PROGETTI/PROG_10.jpg"),client:"Amuchina",title:"Hai Vinto",what:"Campaign / visual",moreHtml:`
              <h3 class="chMoreTitle">Amuchina — Hai Vinto</h3>
              <p class="chMoreText">Creatività per campagna promozionale: headline e visual impostati per immediatezza, impatto e lettura rapida.</p>
            `},{src:d("img/PROGETTI/PROG_11.jpg"),client:"Campagna",title:"Hai Vinto",what:"Visual / layout",moreHtml:`
              <h3 class="chMoreTitle">Hai Vinto</h3>
              <p class="chMoreText">Variante visual della campagna con focus su adattamento grafico, coerenza narrativa e pulizia compositiva.</p>
            `},{src:d("img/PROGETTI/PROG_12.jpg"),client:"Testata Home",title:"Visual",what:"Layout / design",moreHtml:`
              <h3 class="chMoreTitle">Testata Home</h3>
              <p class="chMoreText">Sviluppo testata in piu varianti: priorita ai contenuti, bilanciamento spazi e ottimizzazione dell'impatto above-the-fold.</p>
            `},{src:d("img/PROGETTI/PROG_13.jpg"),client:"UILtemp",title:"App Site Play",what:"UI / layout",moreHtml:`
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
          <img class="bioMedia" src="${d("img/BIO/BIO_1.jpg")}" alt="" loading="lazy" decoding="async">
          <img class="bioMedia" src="${d("img/BIO/BIO_2.jpg")}" alt="" loading="lazy" decoding="async">
          <img class="bioMedia" src="${d("img/BIO/BIO_3.jpg")}" alt="" loading="lazy" decoding="async">
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
        <p><strong>Email</strong>: <a href="mailto:${we}">${we}</a></p>
        <p><strong>Telefono</strong>: <a href="tel:${ye.replace(/\s+/g,"")}">${ye}</a></p>
        <p class="wii-meta">Base: <strong>Roma</strong></p>
      </div>
      <div class="wii-card">
        <h3>Profilo LinkedIn</h3>
        <p><strong>Profilo LinkedIn</strong> con esperienza, formazione e contatti.</p>
        <div class="wii-links">
          <a class="wii-link" href="${he}" target="_blank" rel="noopener noreferrer">
            Apri profilo LinkedIn
          </a>
        </div>
      </div>
    `},"#social":{title:"Social",html:`
      <div class="wii-card">
        <h3>Canali social</h3>
        <p>Qui trovi tutti i miei social: raccontano la mia parte piu professionale e quella piu ludica. Passione e lavoro sono sempre andati di pari passo nella mia vita, e qui li vedi convivere.</p>
        <div class="social-list">
          <a class="social-item" href="${he}" target="_blank" rel="noopener noreferrer">
            <span class="social-ico">💼</span>
            <span class="social-text"><strong>LinkedIn</strong> /valerio-serani-682a48215</span>
          </a>
          <a class="social-item" href="${Xe}" target="_blank" rel="noopener noreferrer">
            <span class="social-ico">📸</span>
            <span class="social-text"><strong>Instagram</strong> @velvet_172</span>
          </a>
          <a class="social-item" href="${Je}" target="_blank" rel="noopener noreferrer">
            <span class="social-ico">🎵</span>
            <span class="social-text"><strong>TikTok</strong> @heyits172</span>
          </a>
          <a class="social-item" href="${Qe}" target="_blank" rel="noopener noreferrer">
            <span class="social-ico">🎬</span>
            <span class="social-text"><strong>Vimeo</strong> /user95787021</span>
          </a>
          <a class="social-item" href="${Ze}" target="_blank" rel="noopener noreferrer">
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
    `}};function et(){if(!m)return;const e=ne["#projects"],o=(e.projects[l.projectIndex]||e.projects[0])?.slides||[];if(!o.length)return;l.slideIndex=He(l.slideIndex,0,o.length-1),m.innerHTML=`
  <div class="chCarousel" data-channel="#projects">
    <div class="chStage">
      <div class="chFrame" data-ch-frame>
        ${o.map((a,r)=>`
              <img class="chMedia ${r===l.slideIndex?"is-on":""}"
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
`;const n={frame:m.querySelector("[data-ch-frame]"),imgs:Array.from(m.querySelectorAll(".chMedia")),more:m.querySelector(".chMore"),moreContent:m.querySelector(".chMoreContent"),capClient:m.querySelector('[data-cap="client"]'),capTitle:m.querySelector('[data-cap="title"]'),capWhat:m.querySelector('[data-cap="what"]')};l.dom=n,oe(o,l.slideIndex);const s=m.querySelector('[data-ch="more"]');s&&(s.textContent="Scopri di più")}function oe(e,t){const o=e[t],n=l.dom;!o||!n||(n.capClient&&(n.capClient.textContent=o.client||""),n.capTitle&&(n.capTitle.textContent=o.title||""),n.capWhat&&(n.capWhat.textContent=o.what||""),n.frame&&n.frame.style.setProperty("--ch-bg",`url("${o.src}")`),n.moreContent&&(n.moreContent.innerHTML=o.moreHtml||""))}function Q(){return!!l.dom?.frame?.classList.contains("is-more")}function tt(e){const t=l.dom;!t?.frame||!t?.more||(t.frame.classList.add("is-more"),t.more.classList.add("is-open"),t.more.setAttribute("aria-hidden","false"),oe(e,l.slideIndex))}function V(){const e=l.dom;!e?.frame||!e?.more||(e.frame.classList.remove("is-more"),e.more.classList.remove("is-open"),e.more.setAttribute("aria-hidden","true"))}function it(){xe();const e=m?.querySelector(".bioCarousel"),t=m?.querySelector(".wii-card"),o=e?Array.from(e.querySelectorAll(".bioMedia")):[];if(!e||!o.length)return;t&&t.classList.add("bio-no-blur");let n=0;const s=()=>{o.forEach((r,c)=>r.classList.toggle("is-on",c===n));const a=o[n]?.getAttribute("src");a&&e.style.setProperty("--bio-bg",`url("${a}")`)};s(),B=window.setInterval(()=>{n=(n+1)%o.length,s()},3e3),t&&t.classList.add("bio-no-blur")}function xe(){B&&(clearInterval(B),B=null)}function Ce(e){if(!v||!pe||!m)return;l.href=e,v.classList.toggle("is-game",e==="#minigame"),v.classList.toggle("is-carousel",e==="#projects"),v.classList.toggle("is-about",e==="#about"),v.classList.toggle("is-exp",e==="#exp");const t=ne[e]||{title:"Canale",html:'<div class="wii-card"><h3>Coming soon</h3><p>Contenuto in arrivo.</p></div>'};pe.textContent=t.title,e==="#projects"&&t.projects?(l.projectIndex=0,l.slideIndex=0,l.dom=null,et()):e==="#about"?(m.innerHTML=t.html||"",it()):m.innerHTML=t.html||"",v.classList.add("is-open"),v.setAttribute("aria-hidden","false"),e==="#minigame"?requestAnimationFrame(()=>{st()&&H()}):F(!1),R()}function N(){v&&(V(),F(!1),xe(),v.classList.remove("is-open","is-game","is-carousel"),v.setAttribute("aria-hidden","true"),R())}ge&&ge.addEventListener("click",N);function nt(e){!x||!G||!e||(G.src=e,x.classList.add("is-open"),x.setAttribute("aria-hidden","false"))}function Ae(){!x||!G||(x.classList.remove("is-open"),x.setAttribute("aria-hidden","true"),G.src="")}x&&x.addEventListener("click",Ae);v&&v.addEventListener("click",e=>{e.target===v&&N()});document.addEventListener("keydown",e=>{if(e.key==="Escape"&&x?.classList.contains("is-open")){Ae();return}e.key==="Escape"&&v?.classList.contains("is-open")&&N()});document.addEventListener("click",e=>{if(!S)return;if(performance.now()<P){e.preventDefault(),e.stopPropagation();return}const t=e.target?.closest?.(".wii-tile");if(!t)return;const o=t.getAttribute("data-href")||t.getAttribute("href");o&&o.startsWith("#")&&(e.preventDefault(),Ce(o))});k&&k.addEventListener("click",e=>{S&&(performance.now()<P||(e.preventDefault(),Ce("#minigame")))});m?.addEventListener("click",e=>{if(l.href==="#projects"&&e.target?.closest?.("[data-ch-frame]")){const f=l.dom?.imgs?.find(O=>O.classList.contains("is-on"))?.getAttribute("src");if(f){e.preventDefault(),e.stopPropagation(),nt(f);return}}const t=e.target?.closest?.("[data-ch]"),o=t?.getAttribute("data-ch");if(e.target?.closest?.("[data-ch-frame]")&&Q()&&!t){V();const c=m.querySelector('[data-ch="more"]');c&&(c.textContent="Scopri di più");return}if(!o||l.href!=="#projects")return;const s=ne["#projects"],r=(s.projects[l.projectIndex]||s.projects[0])?.slides||[];if(r.length){if(o==="more"){Q()?(V(),t.textContent="Scopri di più"):(tt(r),t.textContent="Chiudi");return}if(o==="prev"||o==="next"){if(Q()){V();const c=m.querySelector('[data-ch="more"]');c&&(c.textContent="Scopri di più")}o==="prev"?l.slideIndex=(l.slideIndex-1+r.length)%r.length:l.slideIndex=(l.slideIndex+1)%r.length,l.dom?.imgs?.forEach((c,g)=>c.classList.toggle("is-on",g===l.slideIndex)),oe(r,l.slideIndex);return}}});let Se=0,Le=0,Z=0,ee=0,ie=!1,j="mouse",q=null;function ot(){y&&(ie||(ie=!0,y.style.opacity="1"))}function Pe(){y&&(ie=!1,y.style.opacity="0")}function Me(){Z+=(Se-Z)*.18,ee+=(Le-ee)*.18;const e=-10,t=-4;y&&(y.style.transform=`translate3d(${Z+e}px, ${ee+t}px, 0)`),requestAnimationFrame(Me)}requestAnimationFrame(Me);window.addEventListener("pointermove",e=>{if(j=e.pointerType||"mouse",j!=="mouse"){Pe();return}Se=e.clientX,Le=e.clientY,ot()});window.addEventListener("mouseleave",()=>Pe());const Re=".wii-tile, .wii-pill";function Oe(e){y&&y.classList.toggle("is-hover",e)}document.addEventListener("pointerover",e=>{if(j!=="mouse")return;const t=e.target?.closest?.(Re);t&&t!==q&&(q=t,Oe(!0),Ke())});document.addEventListener("pointerout",e=>{const t=e.target?.closest?.(Re);if(t&&t===q){const o=e.relatedTarget;if(o&&t.contains(o))return;q=null,Oe(!1)}});document.addEventListener("pointerdown",()=>{E&&($(),_(),D()),!(!y||j!=="mouse")&&(y.classList.add("is-down"),R())});document.addEventListener("pointerup",()=>{y&&y.classList.remove("is-down")});let i={running:!1,score:0,timeLeft:30,lastTs:0,spawnAcc:0,bubbles:[],rafId:null,timerId:null,canvas:null,ctx:null,scoreEl:null,timeEl:null,overEl:null,overScoreEl:null,overRestartBtn:null,overCloseBtn:null};function re(){i.overEl&&(i.overEl.classList.remove("is-show"),i.overEl.setAttribute("aria-hidden","true"))}function rt(){i.overEl&&(i.overScoreEl&&(i.overScoreEl.textContent=String(i.score)),i.overEl.classList.add("is-show"),i.overEl.setAttribute("aria-hidden","false"))}function st(){i.canvas=document.getElementById("mgCanvas"),i.scoreEl=document.getElementById("mgScore"),i.timeEl=document.getElementById("mgTime"),i.overEl=document.getElementById("mgOver"),i.overScoreEl=document.getElementById("mgOverScore"),i.overRestartBtn=document.getElementById("mgOverRestart"),i.overCloseBtn=document.getElementById("mgOverClose");const e=document.getElementById("mgStart"),t=document.getElementById("mgReset");return i.canvas?(i.ctx=i.canvas.getContext("2d"),re(),i.overRestartBtn&&(i.overRestartBtn.onclick=()=>{H(),be()}),i.overCloseBtn&&(i.overCloseBtn.onclick=()=>N()),i.canvas.onpointerdown=o=>{if(!i.running)return;const n=i.canvas.getBoundingClientRect(),s=(o.clientX-n.left)/n.width*i.canvas.width,a=(o.clientY-n.top)/n.height*i.canvas.height;for(let r=i.bubbles.length-1;r>=0;r--){const c=i.bubbles[r],g=s-c.x,f=a-c.y;if(g*g+f*f<=c.r*c.r){i.bubbles.splice(r,1),i.score+=1,i.scoreEl&&(i.scoreEl.textContent=String(i.score)),ct();return}}},e&&(e.onclick=()=>be()),t&&(t.onclick=()=>H()),se(),!0):!1}function se(){if(!i.canvas)return;const e=Math.min(window.devicePixelRatio||1,2),t=i.canvas.clientWidth,o=i.canvas.clientHeight;if(!t||!o)return;const n=Math.round(t*e),s=Math.round(o*e);(i.canvas.width!==n||i.canvas.height!==s)&&(i.canvas.width=n,i.canvas.height=s)}function H(){F(!1),re(),i.score=0,i.timeLeft=30,i.bubbles=[],i.scoreEl&&(i.scoreEl.textContent="0"),i.timeEl&&(i.timeEl.textContent="30"),Be()}function be(){i.running||(i.timeLeft<=0&&H(),re(),i.running=!0,i.lastTs=performance.now(),i.spawnAcc=0,i.timerId=window.setInterval(()=>{i.running&&(i.timeLeft-=1,i.timeEl&&(i.timeEl.textContent=String(i.timeLeft)),i.timeLeft<=0&&(i.timeLeft=0,i.timeEl&&(i.timeEl.textContent="0"),F(!0)))},1e3),i.rafId=requestAnimationFrame(ze))}function F(e=!1){i.running=!1,i.timerId&&(clearInterval(i.timerId),i.timerId=null),i.rafId&&(cancelAnimationFrame(i.rafId),i.rafId=null),e&&(rt(),lt())}function at(){if(!i.canvas)return;const e=i.canvas.width,t=i.canvas.height,o=22+Math.random()*26,n=o+Math.random()*(e-o*2),s=o+Math.random()*(t-o*2),a=(-.25+Math.random()*.5)*(window.devicePixelRatio||1),r=(-.15+Math.random()*.35)*(window.devicePixelRatio||1),c=3.2+Math.random()*1.8;i.bubbles.push({x:n,y:s,r:o,vx:a,vy:r,born:performance.now(),life:c})}function ze(e){if(!i.running)return;const t=Math.min((e-i.lastTs)/1e3,.05);i.lastTs=e,se();const n=.55/(1+(30-i.timeLeft)*.03);for(i.spawnAcc+=t;i.spawnAcc>=n;)i.spawnAcc-=n,at();const s=performance.now();for(let a=i.bubbles.length-1;a>=0;a--){const r=i.bubbles[a];r.x+=r.vx*60*t,r.y+=r.vy*60*t,r.x-r.r<0&&(r.x=r.r,r.vx*=-1),r.x+r.r>i.canvas.width&&(r.x=i.canvas.width-r.r,r.vx*=-1),r.y-r.r<0&&(r.y=r.r,r.vy*=-1),r.y+r.r>i.canvas.height&&(r.y=i.canvas.height-r.r,r.vy*=-1),(s-r.born)/1e3>r.life&&i.bubbles.splice(a,1)}Be(),i.rafId=requestAnimationFrame(ze)}function Be(){if(!i.ctx||!i.canvas)return;const e=i.ctx,t=i.canvas.width,o=i.canvas.height;e.clearRect(0,0,t,o),e.fillStyle="rgba(255,255,255,0.22)",e.fillRect(0,0,t,o);for(const n of i.bubbles){const s=e.createRadialGradient(n.x-n.r*.35,n.y-n.r*.35,n.r*.2,n.x,n.y,n.r);s.addColorStop(0,"rgba(255,255,255,0.95)"),s.addColorStop(.35,"rgba(255,255,255,0.35)"),s.addColorStop(1,"rgba(43,184,255,0.18)"),e.beginPath(),e.arc(n.x,n.y,n.r,0,Math.PI*2),e.fillStyle=s,e.fill(),e.lineWidth=2,e.strokeStyle="rgba(43,184,255,0.35)",e.stroke(),e.beginPath(),e.arc(n.x-n.r*.25,n.y-n.r*.25,n.r*.28,0,Math.PI*2),e.fillStyle="rgba(255,255,255,0.28)",e.fill()}}function ct(){const e=M();if(!e)return;const t=e.currentTime,o=e.createOscillator(),n=e.createGain();o.type="sine",o.frequency.setValueAtTime(620,t),o.frequency.exponentialRampToValueAtTime(280,t+.06),n.gain.setValueAtTime(1e-4,t),n.gain.exponentialRampToValueAtTime(.08,t+.008),n.gain.exponentialRampToValueAtTime(1e-4,t+.1),o.connect(n),n.connect(e.destination),o.start(t),o.stop(t+.12)}function lt(){const e=M();if(!e)return;const t=e.currentTime;[880,740,622].forEach((n,s)=>{const a=e.createOscillator(),r=e.createGain(),c=t+s*.12;a.type="triangle",a.frequency.setValueAtTime(n,c),r.gain.setValueAtTime(1e-4,c),r.gain.exponentialRampToValueAtTime(.06,c+.01),r.gain.exponentialRampToValueAtTime(1e-4,c+.16),a.connect(r),r.connect(e.destination),a.start(c),a.stop(c+.18)})}window.addEventListener("resize",()=>{document.getElementById("mgCanvas")&&se(),Te()});function te(){S||(S=!0,A&&(A.classList.add("is-fading"),A.setAttribute("aria-hidden","true"),window.setTimeout(()=>{A.classList.add("is-hidden")},De)),P=Math.max(P,performance.now()+$e),E&&($(),_(),D()),R())}function dt(){if(!A){S=!0;return}A.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),te()}),A.addEventListener("pointerdown",e=>{e.preventDefault(),e.stopPropagation(),te()}),window.addEventListener("keydown",e=>{S||(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),te())})}function ae(){const e=window.visualViewport?.height||window.innerHeight;document.documentElement.style.setProperty("--vh",`${e}px`)}Fe();T&&T.classList.add("is-swoosh-in");Ie();setInterval(Ie,1e3);dt();ae();window.addEventListener("resize",ae);window.visualViewport?.addEventListener("resize",ae);
