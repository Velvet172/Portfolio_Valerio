(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function i(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(s){if(s.ep)return;s.ep=!0;const a=i(s);fetch(s.href,a)}})();const We="/Portfolio_Valerio/",l=e=>`${We}${e.replace(/^\/+/,"")}`,$=window.matchMedia("(max-width: 640px)"),le=window.matchMedia("(prefers-reduced-motion: reduce)"),x=document.getElementById("wiiIntro");let R=!1;const I=document.getElementById("grid");document.getElementById("board");const be=document.getElementById("time"),we=document.getElementById("date"),H=document.getElementById("btnLeft"),q=document.getElementById("btnRight"),g=document.getElementById("wiiOverlay"),Te=document.getElementById("overlayBack"),M=document.getElementById("overlayTitle"),m=document.getElementById("overlayBody"),b=document.getElementById("wiiPointer"),S=document.getElementById("imgViewer"),N=document.getElementById("imgViewerSrc"),E=document.getElementById("videoViewer"),T=document.getElementById("videoViewerSrc");let de=[];function Ke(e,t,i){return Math.max(t,Math.min(i,e))}const Qe=[[{icon:"👋",t:"Chi sono",s:"Bio + competenze",href:"#about",previews:[l("img/BIO/BIO_1.jpg"),l("img/BIO/BIO_2.jpg"),l("img/BIO/BIO_3.jpg")]},{icon:"🎓",t:"Esperienze",s:"Formazione / studi",href:"#exp"},{icon:"✉️",t:"Contatti",s:"Mail e social",href:"#contact"},{icon:"🧩",t:"Progetti",s:"Case study e lavori",href:"#projects",previews:[l("img/PROGETTI/PROG_1.jpg"),l("img/PROGETTI/PROG_2.jpg"),l("img/PROGETTI/PROG_3.jpg")]},{icon:"📱",t:"Social",s:"I miei profili",href:"#social"},{icon:"🎬",t:"Video",s:"Social e progetti",href:"#videos"},{icon:"🛠️",t:"Skills",s:"Cosa so fare",href:"#tools"},{icon:"🤖",t:"AI",s:"Workflow",href:"#ai",previewVideo:{src:l("img/CHANNELS/ai.mp4"),poster:l("img/CHANNELS/ai.jpg")}},{icon:"📌",t:"Servizi",s:"Cosa offro",href:"#services",previewVideo:{src:l("img/CHANNELS/servizi.mp4"),poster:l("img/CHANNELS/servizi.jpg")}}],[{icon:"📷",t:"Galleria",s:"Foto e frame",href:"#gallery"},{icon:"🗂️",t:"Archivio",s:"Lavori passati",href:"#archive"},{icon:"📝",t:"Blog",s:"Note e making-of",href:"#blog"},{icon:"📍",t:"Dove sono",s:"Roma / contatti",href:"#where"}]];let V=0;const Ye=420,Xe=320,Je=900;function Ze(){return Qe[0]}function et(){if(!I)return;const e=Ze();I.innerHTML=e.map(t=>{const i=t.previewVideo?.src,o=t.previewVideo?.poster,s=Array.isArray(t.previews)?t.previews:[],a=o?` poster="${o}"`:"",r=o?` style="--preview-poster:url('${o}')"`:"",c=i?`
          <div class="wii-preview wii-preview--single wii-preview--video"${r} aria-hidden="true">
            <video class="preview-video" src="${t.previewVideo.src}"${a} muted loop playsinline preload="metadata"></video>
          </div>
        `:s.length?`
          <div class="wii-preview ${s.length===1?"wii-preview--single":""}" aria-hidden="true">
            ${s.map(u=>`<img src="${u}" alt="" loading="lazy" decoding="async">`).join("")}
          </div>
        `:"";return`
        <a class="wii-tile" href="${t.href}" data-href="${t.href}">
          ${c}
          <div class="wii-tileContent">
            <div class="wii-icon">${t.icon}</div>
            <div class="wii-tileText">
              <div class="wii-title">${t.t}</div>
              <div class="wii-sub">${t.s}</div>
            </div>
          </div>
        </a>
      `}).join(""),tt(),it(),Pe(),O()}function tt(){if(!I)return;Array.from(I.querySelectorAll(".wii-preview:not(.wii-preview--single)")).forEach(t=>{const i=Math.random()*12;t.style.setProperty("--preview-phase",`-${i.toFixed(2)}s`)})}function Pe(){if(!I)return;Array.from(I.querySelectorAll(".wii-preview--video")).forEach(t=>{const i=t.closest(".wii-tile");if(!i)return;const o=i.getBoundingClientRect();if(!o.height)return;const s=o.width/o.height,a=Math.max(1,Math.min(s,16/9));t.style.setProperty("--video-zoom",a.toFixed(3))})}function it(){if(!I)return;const e=Array.from(I.querySelectorAll(".wii-preview--video"));de=[],e.forEach(t=>{const i=t.closest(".wii-tile");if(!i)return;const o=t.querySelector(".preview-video");if(!o)return;de.push({preview:t,video:o}),o.muted=!0,o.loop=!0,o.setAttribute("playsinline","");const s=()=>{if(t.classList.add("is-ready"),o.paused)try{o.currentTime=0}catch{}};o.addEventListener("loadeddata",s,{once:!0});const a=()=>{t.classList.add("is-hover"),o.currentTime=0,o.play().catch(()=>{})},r=()=>{o.pause(),o.currentTime=0,t.classList.remove("is-hover")};i.addEventListener("mouseenter",a),i.addEventListener("mouseleave",r),i.addEventListener("pointerenter",a),i.addEventListener("pointerleave",r),i.addEventListener("focusin",a),i.addEventListener("focusout",r)})}function O(){const e=$.matches&&!le.matches;de.forEach(({preview:t,video:i})=>{if(e)t.classList.add("is-auto"),i.play().catch(()=>{});else{t.classList.remove("is-auto"),i.pause();try{i.currentTime=0}catch{}}})}function xe(){if(!be||!we)return;const e=new Date,t=String(e.getHours()).padStart(2,"0"),i=String(e.getMinutes()).padStart(2,"0");be.textContent=`${t}:${i}`;const o=["Dom","Lun","Mar","Mer","Gio","Ven","Sab"],s=["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"],a=e.getDate(),r=o[e.getDay()],c=s[e.getMonth()];we.textContent=`${r} ${a} ${c}`}let L=null,A=!0,Ee=!1,Ie=0;function k(){return A?(L||(L=new(window.AudioContext||window.webkitAudioContext)),L.state==="suspended"&&L.resume().catch(()=>{}),L):null}function W(){const e=k();if(e){e.state==="suspended"&&e.resume().catch(()=>{});try{const t=e.createBuffer(1,1,e.sampleRate),i=e.createBufferSource();i.buffer=t,i.connect(e.destination),i.start(0)}catch{}}}function K(){Ee||(Ee=!0,W())}function Oe({type:e="sine",freq:t=700,duration:i=.05,gain:o=.04,attack:s=.002,release:a=.035}={}){const r=k();if(!r)return;const c=r.currentTime,u=r.createOscillator(),p=r.createGain();u.type=e,u.frequency.setValueAtTime(t,c),p.gain.setValueAtTime(0,c),p.gain.linearRampToValueAtTime(o,c+s),p.gain.exponentialRampToValueAtTime(1e-4,c+s+a),u.connect(p),p.connect(r.destination),u.start(c),u.stop(c+i+a+.02)}function ot(){const e=performance.now();e-Ie<120||(Ie=e,Oe({type:"sine",freq:880,duration:.03,gain:.026,attack:.002,release:.03}))}function B(){Oe({type:"triangle",freq:520,duration:.03,gain:.05,attack:.001,release:.02})}let w=null;function Q(){const e=k();if(!e||w)return;const t=e.createGain();t.gain.value=0,t.connect(e.destination);const i=e.createDelay(.35);i.delayTime.value=.18;const o=e.createGain();o.gain.value=.2,i.connect(o),o.connect(i);const s=e.createGain();s.gain.value=.25;const a=e.createBiquadFilter();a.type="lowpass",a.frequency.value=2600,a.Q.value=.7,a.connect(t),a.connect(i),i.connect(s),s.connect(t);const r=e.createOscillator();r.type="sine",r.frequency.value=130.81;const c=e.createGain();c.gain.value=1e-4,r.connect(c),c.connect(a);const u=e.createOscillator();u.type="sine",u.frequency.value=.08;const p=e.createGain();p.gain.value=.007,u.connect(p),p.connect(c.gain);const C=e.currentTime;r.start(C),u.start(C);function J(P,v,z=.05){const f=e.createOscillator(),h=e.createGain(),y=e.createBiquadFilter();f.type="triangle",f.frequency.setValueAtTime(P,v),y.type="highpass",y.frequency.setValueAtTime(240,v),h.gain.setValueAtTime(1e-4,v),h.gain.exponentialRampToValueAtTime(z,v+.01),h.gain.exponentialRampToValueAtTime(1e-4,v+.22),f.connect(y),y.connect(h),h.connect(a),f.start(v),f.stop(v+.3)}function Ne(P,v,z=.018){const f=e.createOscillator(),h=e.createGain(),y=e.createBiquadFilter();f.type="sine",f.frequency.setValueAtTime(P,v),y.type="lowpass",y.frequency.setValueAtTime(520,v),h.gain.setValueAtTime(1e-4,v),h.gain.exponentialRampToValueAtTime(z,v+.008),h.gain.exponentialRampToValueAtTime(1e-4,v+.18),f.connect(y),y.connect(h),h.connect(a),f.start(v),f.stop(v+.22)}const Z=[{tones:[261.63,329.63,392],bass:130.81},{tones:[349.23,440,523.25],bass:174.61},{tones:[220,261.63,329.63],bass:110},{tones:[196,246.94,293.66],bass:98}],ee=[[0,1,2,1,0,2,1,2],[0,2,1,2,0,1,2,1],[0,1,0,2,1,2,1,0]],De=300,he=8,Fe=2;let te=0,ie=0,oe=0,ne=0;function ye(){if(!A||!L||!w)return;const P=L.currentTime,v=Z[oe%Z.length],z=ee[ne%ee.length],f=te%he,h=z[f]%v.tones.length,y=v.tones[h],Ue=f===0?.058:f===4?.05:.04;J(y,P+.01,Ue),f===0&&Ne(v.bass,P+.01,.016),Math.random()<.1&&J(y*2,P+.06,.026),te+=1,te%he===0&&(ie+=1,ie%2===0&&(ne=(ne+1)%ee.length),ie%Fe===0&&(oe=(oe+1)%Z.length)),w.timerId=window.setTimeout(ye,De)}w={musicGain:t,lp:a,delay:i,fb:o,delayMix:s,drone:r,droneGain:c,lfo:u,timerId:null},ye(),t.gain.setTargetAtTime(.4,e.currentTime,.7)}function nt(){if(!L||!w)return;const e=L.currentTime;w.timerId&&clearTimeout(w.timerId),w.musicGain.gain.setTargetAtTime(1e-4,e,.25),setTimeout(()=>{try{w.drone?.stop()}catch{}try{w.lfo?.stop()}catch{}w=null},400)}H&&(H.textContent="🔊",H.addEventListener("click",()=>{R&&(performance.now()<V||(A=!A,H.textContent=A?"🔊":"🔇",A?(K(),W(),Q(),B()):nt()))}));q&&(q.textContent="🎮");["pointerdown","touchstart","mousedown"].forEach(e=>{window.addEventListener(e,()=>{A&&(K(),Q())},{once:!0,passive:!0})});const d={href:null,projectIndex:0,slideIndex:0,dom:null,videoSectionId:null};let j=null;const Le="https://www.linkedin.com/in/valerio-serani-682a48215/",rt="https://www.instagram.com/velvet_172/",st="https://www.tiktok.com/@heyits172",at="https://vimeo.com/user95787021",ct="https://www.behance.net/velvet172",Ae="valerioserani@gmail.com",Se="+39 3469697747",G={"#projects":{title:"Progetti",projects:[{id:"bestof",slides:[{src:l("img/PROGETTI/PROG_1.jpg"),client:"Sunsilk",title:"Testata Home 2025",what:"Creativity + layout",moreHtml:`
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
            `}]}]},"#videos":{title:"Video",sections:[{id:"winsmart",title:"Video promozionali / Winsmart",kicker:"Winsmart",summary:"Selezione di video promozionali e contenuti ADV con focus su storytelling, ritmo e messaggio commerciale.",hero:{src:l("img/01.jpg"),alt:"Hero Winsmart"},videos:[{title:"Promo 01",desc:"Cut breve per social con focus su prodotto e CTA.",src:l("img/CHANNELS/ai.mp4"),poster:l("img/PROGETTI/PROG_1.jpg")},{title:"Promo 02",desc:"Versione dinamica con ritmo piu rapido e titoli.",src:l("img/CHANNELS/servizi.mp4"),poster:l("img/PROGETTI/PROG_2.jpg")}]},{id:"meschia",title:"Social per Meschia",kicker:"Meschia",summary:"Produzione di lavori social: format brevi, coerenza visiva e adattamenti multi-piattaforma.",hero:{src:l("img/02.jpg"),alt:"Hero Meschia"},videos:[{title:"Social 01",desc:"Format verticale con palette e typo coerenti al brand.",src:l("img/CHANNELS/servizi.mp4"),poster:l("img/PROGETTI/PROG_3.jpg")},{title:"Social 02",desc:"Teaser breve con focus su prodotto e ritmo.",src:l("img/CHANNELS/ai.mp4"),poster:l("img/PROGETTI/PROG_4.jpg")}]},{id:"personali",title:"Progetti personali",kicker:"Personal",summary:"Esperimenti e lavori personali: concept, visual design e piccoli short video nati da ricerca creativa.",hero:{src:l("img/01.jpg"),alt:"Hero Progetti personali"},videos:[{title:"Personal 01",desc:"Studio visivo e composizione per concept personale.",src:l("img/CHANNELS/ai.mp4"),poster:l("img/PROGETTI/PROG_7.jpg")},{title:"Personal 02",desc:"Short video sperimentale con focus su ritmo e mood.",src:l("img/CHANNELS/servizi.mp4"),poster:l("img/PROGETTI/PROG_8.jpg")}]},{id:"requiem",title:'48h Film Festival - "Requiem"',kicker:"48h Film Festival",summary:'Esperienza sul set come aiuto alla fotografia e grafico durante le riprese del corto "Requiem".',hero:{src:l("img/03.jpg"),alt:"Hero Requiem"},videos:[{title:"Backstage 01",desc:"Estratto dal set e supporto al reparto foto.",src:l("img/CHANNELS/ai.mp4"),poster:l("img/PROGETTI/PROG_5.jpg")},{title:"Backstage 02",desc:"Momenti di ripresa e supporto grafico.",src:l("img/CHANNELS/servizi.mp4"),poster:l("img/PROGETTI/PROG_6.jpg")}]}]},"#about":{title:"Chi sono",html:`
      <div class="wii-card bio-card">
        <div class="bioCarousel" aria-label="Chi sono - carosello">
          <img class="bioMedia" src="${l("img/BIO/BIO_1.jpg")}" alt="" loading="lazy" decoding="async">
          <img class="bioMedia" src="${l("img/BIO/BIO_2.jpg")}" alt="" loading="lazy" decoding="async">
          <img class="bioMedia" src="${l("img/BIO/BIO_3.jpg")}" alt="" loading="lazy" decoding="async">
        </div>
        <div class="bioDesc">
          <h3>Chi sono</h3>
          <p>Ciao, sono <strong>Valerio</strong>: <strong>graphic designer</strong> di <strong>Roma</strong> e autentico nerd. Ho approcciato il design attraverso <strong>videogiochi</strong>, <strong>copertine</strong> e <strong>cultura pop</strong>, trasformando questa passione in un percorso professionale.</p>
          <p>Il mio approccio unisce <strong>sperimentazione</strong>, <strong>rischio</strong> e <strong>senso estetico</strong> per creare output non solo appaganti, ma soprattutto <strong>funzionali</strong>.</p>
          <p>Negli ultimi mesi ho continuato a <strong>sperimentare</strong> con i <strong>video social</strong>: ho curato <strong>fotografia</strong>, <strong>regia</strong> e <strong>montaggio</strong>, uscendo dalla mia <strong>zona di comfort</strong>. Sperimentare e imparare sul campo è la parte che mi entusiasma di più.</p>
          <p class="wii-meta">Lingue: <strong>Italiano C2</strong>, <strong>English B2</strong></p>
        </div>
      </div>
    `},"#contact":{title:"Contatti",html:`
      <div class="wii-card">
        <h3>Contatti diretti</h3>
        <p><strong>Email</strong>: <a href="mailto:${Ae}">${Ae}</a></p>
        <p><strong>Telefono</strong>: <a href="tel:${Se.replace(/\s+/g,"")}">${Se}</a></p>
        <p class="wii-meta">Base: <strong>Roma</strong></p>
      </div>
      <div class="wii-card">
        <h3>Profilo LinkedIn</h3>
        <p><strong>Profilo LinkedIn</strong> con esperienza, formazione e contatti.</p>
        <div class="wii-links">
          <a class="wii-link" href="${Le}" target="_blank" rel="noopener noreferrer">
            Apri profilo LinkedIn
          </a>
        </div>
      </div>
    `},"#social":{title:"Social",html:`
      <div class="wii-card">
        <h3>Canali social</h3>
        <p>Qui trovi tutti i miei social: raccontano la mia parte piu professionale e quella piu ludica. Passione e lavoro sono sempre andati di pari passo nella mia vita, e qui li vedi convivere.</p>
        <div class="social-list">
          <a class="social-item" href="${Le}" target="_blank" rel="noopener noreferrer">
            <span class="social-ico">💼</span>
            <span class="social-text"><strong>LinkedIn</strong> /valerio-serani-682a48215</span>
          </a>
          <a class="social-item" href="${rt}" target="_blank" rel="noopener noreferrer">
            <span class="social-ico">📸</span>
            <span class="social-text"><strong>Instagram</strong> @velvet_172</span>
          </a>
          <a class="social-item" href="${st}" target="_blank" rel="noopener noreferrer">
            <span class="social-ico">🎵</span>
            <span class="social-text"><strong>TikTok</strong> @heyits172</span>
          </a>
          <a class="social-item" href="${at}" target="_blank" rel="noopener noreferrer">
            <span class="social-ico">🎬</span>
            <span class="social-text"><strong>Vimeo</strong> /user95787021</span>
          </a>
          <a class="social-item" href="${ct}" target="_blank" rel="noopener noreferrer">
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
          <li><strong>Collaborazione</strong>: Figma, Mural, Whimsical.</li>
          <li><strong>Video</strong>: art direction + video editing (ideazione, script, storyboard, montaggio), CapCut, editor video social e creazione di <strong>video social funzionali</strong>.</li>
          <li><strong>AI</strong>: prompting, ideazione, scrittura creativa, ricerca e analisi rapida, workflow AI/web e AI-assisted production per asset e variazioni di layout.</li>
        </ul>
      </div>
    `},"#ai":{title:"AI",html:`
      <div class="wii-card">
        <h3>Workflow AI</h3>
        <p>sono un <strong>"AI nerd"</strong>: uso l'<strong>AI</strong> per <strong>brainstorming</strong>, <strong>scrittura creativa</strong>, <strong>ricerca</strong> e direzione creativa, così da velocizzare l'esecuzione. Mi aiuta a gettare le basi del processo creativo e ad <strong>accelerare i tempi</strong>, mantenendo sempre il controllo umano su <strong>creatività</strong> e <strong>qualità</strong>. Questo sito è il mio <strong>showcase</strong>: è un <strong>esperimento</strong> in cui ho messo in pratica le mie competenze per costruire un progetto completo.</p>
        <p>Lavoro in <strong>sinergia</strong> tra <strong>Codex</strong> e <strong>Visual Studio Code</strong>: analisi dei file, riscrittura delle sezioni, struttura della griglia, generazione asset e iterazioni rapide. La pubblicazione passa da <strong>GitHub</strong> e il setup tecnico include <strong>Homebrew</strong> e <strong>Vite</strong> per dipendenze e build.</p>
        <p class="wii-meta">Obiettivo: <strong>accelerare tempi</strong> e <strong>qualità</strong>, mantenendo il controllo creativo umano su tono, priorità e coerenza finale.</p>
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
    `}};function lt(e){const i=G["#videos"]?.sections||[];return i.length?i.find(o=>o.id===e)||i[0]:null}function Re(){if(!m||!M||!g)return;const e=G["#videos"],t=e?.sections||[];if(!t.length)return;d.videoSectionId=null,g.classList.remove("is-video-detail"),M.textContent=e.title;const i=t.map(o=>{const s=o.hero?.src?` style="--thumb:url('${o.hero.src}')"`:"";return`
        <button class="wii-card video-hub-card" type="button" data-video-section="${o.id}">
          <div class="video-hub-thumb"${s} aria-hidden="true"></div>
          <div class="video-hub-copy">
            <h3>${o.title}</h3>
          </div>
        </button>
      `}).join("");m.innerHTML=`<div class="video-hub">${i}</div>`,m.scrollTop=0}function dt(e){if(!m||!M||!g)return;const t=lt(e);if(!t)return;d.videoSectionId=t.id,M.textContent=t.title,g.classList.add("is-video-detail");const i=t.hero?.src?` style="--hero:url('${t.hero.src}')"`:"",o=t.hero?.alt?` role="img" aria-label="${t.hero.alt}"`:"",s=(t.videos||[]).map(a=>{const r=!!a.src,c=a.poster||t.hero?.src||"",u=c?` style="--thumb:url('${c}')"`:"";return`
        <button class="video-feed-item" type="button"${r?` data-video-open data-video-src="${a.src}"${c?` data-video-poster="${c}"`:""}`:""}${r?"":" disabled"}>
          <div class="video-feed-thumb"${u}>
            <span class="video-feed-play">▶</span>
            ${r?"":'<span class="video-feed-badge">In arrivo</span>'}
          </div>
          <div class="video-feed-meta">
            <h4>${a.title}</h4>
            ${a.desc?`<p>${a.desc}</p>`:""}
          </div>
        </button>
      `}).join("");m.innerHTML=`
    <div class="video-detail">
      <div class="video-hero"${i}${o}>
        <div class="video-heroOverlay">
          <div class="video-heroKicker">${t.kicker||"Video"}</div>
          <h3>${t.title}</h3>
          <p>${t.summary}</p>
        </div>
      </div>
      <div class="video-feed">
        ${s}
      </div>
    </div>
  `,m.scrollTop=0}function ut(){if(!m)return;const e=G["#projects"],i=(e.projects[d.projectIndex]||e.projects[0])?.slides||[];if(!i.length)return;d.slideIndex=Ke(d.slideIndex,0,i.length-1),m.innerHTML=`
  <div class="chCarousel" data-channel="#projects">
    <div class="chStage">
      <div class="chFrame" data-ch-frame>
        ${i.map((a,r)=>`
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
`;const o={frame:m.querySelector("[data-ch-frame]"),imgs:Array.from(m.querySelectorAll(".chMedia")),more:m.querySelector(".chMore"),moreContent:m.querySelector(".chMoreContent"),capClient:m.querySelector('[data-cap="client"]'),capTitle:m.querySelector('[data-cap="title"]'),capWhat:m.querySelector('[data-cap="what"]')};d.dom=o,me(i,d.slideIndex);const s=m.querySelector('[data-ch="more"]');s&&(s.textContent="Scopri di più")}function me(e,t){const i=e[t],o=d.dom;!i||!o||(o.capClient&&(o.capClient.textContent=i.client||""),o.capTitle&&(o.capTitle.textContent=i.title||""),o.capWhat&&(o.capWhat.textContent=i.what||""),o.frame&&o.frame.style.setProperty("--ch-bg",`url("${i.src}")`),o.moreContent&&(o.moreContent.innerHTML=i.moreHtml||""))}function re(){return!!d.dom?.frame?.classList.contains("is-more")}function mt(e){const t=d.dom;!t?.frame||!t?.more||(t.frame.classList.add("is-more"),t.more.classList.add("is-open"),t.more.setAttribute("aria-hidden","false"),me(e,d.slideIndex))}function _(){const e=d.dom;!e?.frame||!e?.more||(e.frame.classList.remove("is-more"),e.more.classList.remove("is-open"),e.more.setAttribute("aria-hidden","true"))}function pt(){Me();const e=m?.querySelector(".bioCarousel"),t=m?.querySelector(".wii-card"),i=e?Array.from(e.querySelectorAll(".bioMedia")):[];if(!e||!i.length)return;t&&t.classList.add("bio-no-blur");let o=0;const s=()=>{i.forEach((r,c)=>r.classList.toggle("is-on",c===o));const a=i[o]?.getAttribute("src");a&&e.style.setProperty("--bio-bg",`url("${a}")`)};s(),j=window.setInterval(()=>{o=(o+1)%i.length,s()},3e3),t&&t.classList.add("bio-no-blur")}function Me(){j&&(clearInterval(j),j=null)}function ze(e){if(!g||!M||!m)return;d.href=e,g.classList.toggle("is-game",e==="#minigame"),g.classList.toggle("is-carousel",e==="#projects"),g.classList.toggle("is-about",e==="#about"),g.classList.toggle("is-exp",e==="#exp"),g.classList.toggle("is-videos",e==="#videos");const t=G[e]||{title:"Canale",html:'<div class="wii-card"><h3>Coming soon</h3><p>Contenuto in arrivo.</p></div>'};M.textContent=t.title,e==="#projects"&&t.projects?(d.projectIndex=0,d.slideIndex=0,d.dom=null,ut()):e==="#about"?(m.innerHTML=t.html||"",pt()):e==="#videos"&&t.sections?Re():m.innerHTML=t.html||"",g.classList.add("is-open"),g.setAttribute("aria-hidden","false"),e==="#minigame"?requestAnimationFrame(()=>{bt()&&U()}):X(!1),B()}function Y(){g&&(_(),pe(),X(!1),Me(),d.videoSectionId=null,g.classList.remove("is-open","is-game","is-carousel","is-videos","is-video-detail"),g.setAttribute("aria-hidden","true"),B())}function gt(){if(d.href==="#videos"&&g?.classList.contains("is-video-detail")){Re();return}Y()}Te&&Te.addEventListener("click",gt);function vt(e){!S||!N||!e||(N.src=e,S.classList.add("is-open"),S.setAttribute("aria-hidden","false"))}function Ve(){!S||!N||(S.classList.remove("is-open"),S.setAttribute("aria-hidden","true"),N.src="")}S&&S.addEventListener("click",Ve);function ft(e,t){if(!(!E||!T||!e)){T.src=e,t?T.setAttribute("poster",t):T.removeAttribute("poster"),E.classList.add("is-open"),E.setAttribute("aria-hidden","false");try{T.currentTime=0}catch{}T.play().catch(()=>{})}}function pe(){!E||!T||(E.classList.remove("is-open"),E.setAttribute("aria-hidden","true"),T.pause(),T.removeAttribute("src"),T.load())}E&&E.addEventListener("click",e=>{e.target===E&&pe()});g&&g.addEventListener("click",e=>{e.target===g&&Y()});document.addEventListener("keydown",e=>{if(e.key==="Escape"&&E?.classList.contains("is-open")){pe();return}if(e.key==="Escape"&&S?.classList.contains("is-open")){Ve();return}e.key==="Escape"&&g?.classList.contains("is-open")&&Y()});document.addEventListener("click",e=>{if(!R)return;if(performance.now()<V){e.preventDefault(),e.stopPropagation();return}const t=e.target?.closest?.(".wii-tile");if(!t)return;const i=t.getAttribute("data-href")||t.getAttribute("href");i&&i.startsWith("#")&&(e.preventDefault(),ze(i))});q&&q.addEventListener("click",e=>{R&&(performance.now()<V||(e.preventDefault(),ze("#minigame")))});m?.addEventListener("click",e=>{if(d.href==="#videos"){const c=e.target?.closest?.("[data-video-section]");if(c){const p=c.getAttribute("data-video-section");p&&dt(p);return}const u=e.target?.closest?.("[data-video-open]");if(u){const p=u.getAttribute("data-video-src");if(p){const C=u.getAttribute("data-video-poster")||"";ft(p,C)}return}}if(d.href==="#projects"&&e.target?.closest?.("[data-ch-frame]")){const p=d.dom?.imgs?.find(C=>C.classList.contains("is-on"))?.getAttribute("src");if(p){e.preventDefault(),e.stopPropagation(),vt(p);return}}const t=e.target?.closest?.("[data-ch]"),i=t?.getAttribute("data-ch");if(e.target?.closest?.("[data-ch-frame]")&&re()&&!t){_();const c=m.querySelector('[data-ch="more"]');c&&(c.textContent="Scopri di più");return}if(!i||d.href!=="#projects")return;const s=G["#projects"],r=(s.projects[d.projectIndex]||s.projects[0])?.slides||[];if(r.length){if(i==="more"){re()?(_(),t.textContent="Scopri di più"):(mt(r),t.textContent="Chiudi");return}if(i==="prev"||i==="next"){if(re()){_();const c=m.querySelector('[data-ch="more"]');c&&(c.textContent="Scopri di più")}i==="prev"?d.slideIndex=(d.slideIndex-1+r.length)%r.length:d.slideIndex=(d.slideIndex+1)%r.length,d.dom?.imgs?.forEach((c,u)=>c.classList.toggle("is-on",u===d.slideIndex)),me(r,d.slideIndex);return}}});let ke=0,Be=0,se=0,ae=0,ue=!1,D="mouse",F=null;function ht(){b&&(ue||(ue=!0,b.style.opacity="1"))}function Ge(){b&&(ue=!1,b.style.opacity="0")}function He(){se+=(ke-se)*.18,ae+=(Be-ae)*.18;const e=-10,t=-4;b&&(b.style.transform=`translate3d(${se+e}px, ${ae+t}px, 0)`),requestAnimationFrame(He)}requestAnimationFrame(He);window.addEventListener("pointermove",e=>{if(D=e.pointerType||"mouse",D!=="mouse"){Ge();return}ke=e.clientX,Be=e.clientY,ht()});window.addEventListener("mouseleave",()=>Ge());const $e=".wii-tile, .wii-pill";function je(e){b&&b.classList.toggle("is-hover",e)}document.addEventListener("pointerover",e=>{if(D!=="mouse")return;const t=e.target?.closest?.($e);t&&t!==F&&(F=t,je(!0),ot())});document.addEventListener("pointerout",e=>{const t=e.target?.closest?.($e);if(t&&t===F){const i=e.relatedTarget;if(i&&t.contains(i))return;F=null,je(!1)}});document.addEventListener("pointerdown",()=>{A&&(K(),W(),Q()),!(!b||D!=="mouse")&&(b.classList.add("is-down"),B())});document.addEventListener("pointerup",()=>{b&&b.classList.remove("is-down")});let n={running:!1,score:0,timeLeft:30,lastTs:0,spawnAcc:0,bubbles:[],rafId:null,timerId:null,canvas:null,ctx:null,scoreEl:null,timeEl:null,overEl:null,overScoreEl:null,overRestartBtn:null,overCloseBtn:null};function ge(){n.overEl&&(n.overEl.classList.remove("is-show"),n.overEl.setAttribute("aria-hidden","true"))}function yt(){n.overEl&&(n.overScoreEl&&(n.overScoreEl.textContent=String(n.score)),n.overEl.classList.add("is-show"),n.overEl.setAttribute("aria-hidden","false"))}function bt(){n.canvas=document.getElementById("mgCanvas"),n.scoreEl=document.getElementById("mgScore"),n.timeEl=document.getElementById("mgTime"),n.overEl=document.getElementById("mgOver"),n.overScoreEl=document.getElementById("mgOverScore"),n.overRestartBtn=document.getElementById("mgOverRestart"),n.overCloseBtn=document.getElementById("mgOverClose");const e=document.getElementById("mgStart"),t=document.getElementById("mgReset");return n.canvas?(n.ctx=n.canvas.getContext("2d"),ge(),n.overRestartBtn&&(n.overRestartBtn.onclick=()=>{U(),Ce()}),n.overCloseBtn&&(n.overCloseBtn.onclick=()=>Y()),n.canvas.onpointerdown=i=>{if(!n.running)return;const o=n.canvas.getBoundingClientRect(),s=(i.clientX-o.left)/o.width*n.canvas.width,a=(i.clientY-o.top)/o.height*n.canvas.height;for(let r=n.bubbles.length-1;r>=0;r--){const c=n.bubbles[r],u=s-c.x,p=a-c.y;if(u*u+p*p<=c.r*c.r){n.bubbles.splice(r,1),n.score+=1,n.scoreEl&&(n.scoreEl.textContent=String(n.score)),Tt();return}}},e&&(e.onclick=()=>Ce()),t&&(t.onclick=()=>U()),ve(),!0):!1}function ve(){if(!n.canvas)return;const e=Math.min(window.devicePixelRatio||1,2),t=n.canvas.clientWidth,i=n.canvas.clientHeight;if(!t||!i)return;const o=Math.round(t*e),s=Math.round(i*e);(n.canvas.width!==o||n.canvas.height!==s)&&(n.canvas.width=o,n.canvas.height=s)}function U(){X(!1),ge(),n.score=0,n.timeLeft=30,n.bubbles=[],n.scoreEl&&(n.scoreEl.textContent="0"),n.timeEl&&(n.timeEl.textContent="30"),qe()}function Ce(){n.running||(n.timeLeft<=0&&U(),ge(),n.running=!0,n.lastTs=performance.now(),n.spawnAcc=0,n.timerId=window.setInterval(()=>{n.running&&(n.timeLeft-=1,n.timeEl&&(n.timeEl.textContent=String(n.timeLeft)),n.timeLeft<=0&&(n.timeLeft=0,n.timeEl&&(n.timeEl.textContent="0"),X(!0)))},1e3),n.rafId=requestAnimationFrame(_e))}function X(e=!1){n.running=!1,n.timerId&&(clearInterval(n.timerId),n.timerId=null),n.rafId&&(cancelAnimationFrame(n.rafId),n.rafId=null),e&&(yt(),Et())}function wt(){if(!n.canvas)return;const e=n.canvas.width,t=n.canvas.height,i=22+Math.random()*26,o=i+Math.random()*(e-i*2),s=i+Math.random()*(t-i*2),a=(-.25+Math.random()*.5)*(window.devicePixelRatio||1),r=(-.15+Math.random()*.35)*(window.devicePixelRatio||1),c=3.2+Math.random()*1.8;n.bubbles.push({x:o,y:s,r:i,vx:a,vy:r,born:performance.now(),life:c})}function _e(e){if(!n.running)return;const t=Math.min((e-n.lastTs)/1e3,.05);n.lastTs=e,ve();const o=.55/(1+(30-n.timeLeft)*.03);for(n.spawnAcc+=t;n.spawnAcc>=o;)n.spawnAcc-=o,wt();const s=performance.now();for(let a=n.bubbles.length-1;a>=0;a--){const r=n.bubbles[a];r.x+=r.vx*60*t,r.y+=r.vy*60*t,r.x-r.r<0&&(r.x=r.r,r.vx*=-1),r.x+r.r>n.canvas.width&&(r.x=n.canvas.width-r.r,r.vx*=-1),r.y-r.r<0&&(r.y=r.r,r.vy*=-1),r.y+r.r>n.canvas.height&&(r.y=n.canvas.height-r.r,r.vy*=-1),(s-r.born)/1e3>r.life&&n.bubbles.splice(a,1)}qe(),n.rafId=requestAnimationFrame(_e)}function qe(){if(!n.ctx||!n.canvas)return;const e=n.ctx,t=n.canvas.width,i=n.canvas.height;e.clearRect(0,0,t,i),e.fillStyle="rgba(255,255,255,0.22)",e.fillRect(0,0,t,i);for(const o of n.bubbles){const s=e.createRadialGradient(o.x-o.r*.35,o.y-o.r*.35,o.r*.2,o.x,o.y,o.r);s.addColorStop(0,"rgba(255,255,255,0.95)"),s.addColorStop(.35,"rgba(255,255,255,0.35)"),s.addColorStop(1,"rgba(43,184,255,0.18)"),e.beginPath(),e.arc(o.x,o.y,o.r,0,Math.PI*2),e.fillStyle=s,e.fill(),e.lineWidth=2,e.strokeStyle="rgba(43,184,255,0.35)",e.stroke(),e.beginPath(),e.arc(o.x-o.r*.25,o.y-o.r*.25,o.r*.28,0,Math.PI*2),e.fillStyle="rgba(255,255,255,0.28)",e.fill()}}function Tt(){const e=k();if(!e)return;const t=e.currentTime,i=e.createOscillator(),o=e.createGain();i.type="sine",i.frequency.setValueAtTime(620,t),i.frequency.exponentialRampToValueAtTime(280,t+.06),o.gain.setValueAtTime(1e-4,t),o.gain.exponentialRampToValueAtTime(.08,t+.008),o.gain.exponentialRampToValueAtTime(1e-4,t+.1),i.connect(o),o.connect(e.destination),i.start(t),i.stop(t+.12)}function Et(){const e=k();if(!e)return;const t=e.currentTime;[880,740,622].forEach((o,s)=>{const a=e.createOscillator(),r=e.createGain(),c=t+s*.12;a.type="triangle",a.frequency.setValueAtTime(o,c),r.gain.setValueAtTime(1e-4,c),r.gain.exponentialRampToValueAtTime(.06,c+.01),r.gain.exponentialRampToValueAtTime(1e-4,c+.16),a.connect(r),r.connect(e.destination),a.start(c),a.stop(c+.18)})}window.addEventListener("resize",()=>{document.getElementById("mgCanvas")&&ve(),Pe(),O()});function ce(){R||(R=!0,x&&(x.classList.add("is-fading"),x.setAttribute("aria-hidden","true"),window.setTimeout(()=>{x.classList.add("is-hidden")},Xe),window.setTimeout(()=>{document.body?.classList.remove("is-intro-locked")},Je)),V=Math.max(V,performance.now()+Ye),A&&(K(),W(),Q()),B(),O())}function It(){if(!x){R=!0;return}document.body?.classList.add("is-intro-locked"),x.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),ce()}),x.addEventListener("pointerdown",e=>{e.pointerType!=="touch"&&(e.preventDefault(),e.stopPropagation(),ce())}),window.addEventListener("keydown",e=>{R||(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),ce())})}function fe(){const e=window.visualViewport?.height||window.innerHeight;document.documentElement.style.setProperty("--vh",`${e}px`)}et();I&&I.classList.add("is-swoosh-in");xe();setInterval(xe,1e3);It();fe();window.addEventListener("resize",fe);window.visualViewport?.addEventListener("resize",fe);$.addEventListener?($.addEventListener("change",O),le.addEventListener("change",O)):($.addListener(O),le.addListener(O));
