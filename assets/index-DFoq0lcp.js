(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(a){if(a.ep)return;a.ep=!0;const s=n(a);fetch(a.href,s)}})();const Ve="/Portfolio_Valerio/",l=e=>`${Ve}${e.replace(/^\/+/,"")}`,x=document.getElementById("wiiIntro");let A=!1;const S=document.getElementById("grid");document.getElementById("board");const de=document.getElementById("time"),ue=document.getElementById("date"),O=document.getElementById("btnLeft"),G=document.getElementById("btnRight"),v=document.getElementById("wiiOverlay"),ge=document.getElementById("overlayBack"),me=document.getElementById("overlayTitle"),g=document.getElementById("overlayBody"),b=document.getElementById("wiiPointer"),E=document.getElementById("imgViewer"),k=document.getElementById("imgViewerSrc");function je(e,i,n){return Math.max(i,Math.min(n,e))}const He=[[{icon:"👋",t:"Chi sono",s:"Bio + competenze",href:"#about",previews:[l("img/BIO/BIO_1.jpg"),l("img/BIO/BIO_2.jpg"),l("img/BIO/BIO_3.jpg")]},{icon:"🎓",t:"Esperienze",s:"Formazione / studi",href:"#exp"},{icon:"✉️",t:"Contatti",s:"Mail e social",href:"#contact"},{icon:"🧩",t:"Progetti",s:"Case study e lavori",href:"#projects",previews:[l("img/PROGETTI/PROG_1.jpg"),l("img/PROGETTI/PROG_2.jpg"),l("img/PROGETTI/PROG_3.jpg")]},{icon:"📱",t:"Social",s:"I miei profili",href:"#social"},{icon:"🎬",t:"Video",s:"Reel e underwater",href:"#videos"},{icon:"🛠️",t:"Skills",s:"Cosa so fare",href:"#tools"},{icon:"🤖",t:"AI",s:"Workflow",href:"#ai",previewGif:{still:l("img/CHANNELS/ai.gif.png"),gif:l("img/CHANNELS/AI.gif")}},{icon:"📌",t:"Servizi",s:"Cosa offro",href:"#services",previewGif:{still:l("img/CHANNELS/gif-lavori.png"),gif:l("img/CHANNELS/gif-lavori.gif")}}],[{icon:"📷",t:"Galleria",s:"Foto e frame",href:"#gallery"},{icon:"🗂️",t:"Archivio",s:"Lavori passati",href:"#archive"},{icon:"📝",t:"Blog",s:"Note e making-of",href:"#blog"},{icon:"📍",t:"Dove sono",s:"Roma / contatti",href:"#where"}]];function qe(){return He[0]}function $e(){if(!S)return;const e=qe();S.innerHTML=e.map(i=>{const n=i.previewGif?.still&&i.previewGif?.gif,o=Array.isArray(i.previews)?i.previews:[],a=n?`
          <div class="wii-preview wii-preview--single wii-preview--gif" aria-hidden="true">
            <img class="preview-still" src="${i.previewGif.still}" alt="" loading="lazy" decoding="async">
            <img class="preview-gif" src="${i.previewGif.gif}" alt="" loading="eager" decoding="async">
          </div>
        `:o.length?`
          <div class="wii-preview ${o.length===1?"wii-preview--single":""}" aria-hidden="true">
            ${o.map(s=>`<img src="${s}" alt="" loading="lazy" decoding="async">`).join("")}
          </div>
        `:"";return`
        <a class="wii-tile" href="${i.href}" data-href="${i.href}">
          ${a}
          <div class="wii-tileContent">
            <div class="wii-icon">${i.icon}</div>
            <div class="wii-tileText">
              <div class="wii-title">${i.t}</div>
              <div class="wii-sub">${i.s}</div>
            </div>
          </div>
        </a>
      `}).join(""),_e()}function _e(){if(!S)return;Array.from(S.querySelectorAll(".wii-preview:not(.wii-preview--single)")).forEach(i=>{const n=Math.random()*12;i.style.setProperty("--preview-phase",`-${n.toFixed(2)}s`)})}function ye(){if(!de||!ue)return;const e=new Date,i=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0");de.textContent=`${i}:${n}`;const o=["Dom","Lun","Mar","Mer","Gio","Ven","Sab"],a=["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"],s=e.getDate(),r=o[e.getDay()],c=a[e.getMonth()];ue.textContent=`${r} ${s} ${c}`}let T=null,I=!0,pe=!1,fe=0;function P(){return I?(T||(T=new(window.AudioContext||window.webkitAudioContext)),T.state==="suspended"&&T.resume().catch(()=>{}),T):null}function q(){const e=P();if(e){e.state==="suspended"&&e.resume().catch(()=>{});try{const i=e.createBuffer(1,1,e.sampleRate),n=e.createBufferSource();n.buffer=i,n.connect(e.destination),n.start(0)}catch{}}}function $(){pe||(pe=!0,q())}function Te({type:e="sine",freq:i=700,duration:n=.05,gain:o=.04,attack:a=.002,release:s=.035}={}){const r=P();if(!r)return;const c=r.currentTime,m=r.createOscillator(),f=r.createGain();m.type=e,m.frequency.setValueAtTime(i,c),f.gain.setValueAtTime(0,c),f.gain.linearRampToValueAtTime(o,c+a),f.gain.exponentialRampToValueAtTime(1e-4,c+a+s),m.connect(f),f.connect(r.destination),m.start(c),m.stop(c+n+s+.02)}function De(){const e=performance.now();e-fe<120||(fe=e,Te({type:"sine",freq:880,duration:.03,gain:.026,attack:.002,release:.03}))}function M(){Te({type:"triangle",freq:520,duration:.03,gain:.05,attack:.001,release:.02})}let y=null;function _(){const e=P();if(!e||y)return;const i=e.createGain();i.gain.value=0,i.connect(e.destination);const n=e.createDelay(.35);n.delayTime.value=.18;const o=e.createGain();o.gain.value=.2,n.connect(o),o.connect(n);const a=e.createGain();a.gain.value=.25;const s=e.createBiquadFilter();s.type="lowpass",s.frequency.value=2600,s.Q.value=.7,s.connect(i),s.connect(n),n.connect(a),a.connect(i);const r=e.createOscillator();r.type="sine",r.frequency.value=130.81;const c=e.createGain();c.gain.value=1e-4,r.connect(c),c.connect(s);const m=e.createOscillator();m.type="sine",m.frequency.value=.08;const f=e.createGain();f.gain.value=.007,m.connect(f),f.connect(c.gain);const R=e.currentTime;r.start(R),m.start(R);function se(C,u,L=.05){const p=e.createOscillator(),h=e.createGain(),w=e.createBiquadFilter();p.type="triangle",p.frequency.setValueAtTime(C,u),w.type="highpass",w.frequency.setValueAtTime(240,u),h.gain.setValueAtTime(1e-4,u),h.gain.exponentialRampToValueAtTime(L,u+.01),h.gain.exponentialRampToValueAtTime(1e-4,u+.22),p.connect(w),w.connect(h),h.connect(s),p.start(u),p.stop(u+.3)}function ze(C,u,L=.018){const p=e.createOscillator(),h=e.createGain(),w=e.createBiquadFilter();p.type="sine",p.frequency.setValueAtTime(C,u),w.type="lowpass",w.frequency.setValueAtTime(520,u),h.gain.setValueAtTime(1e-4,u),h.gain.exponentialRampToValueAtTime(L,u+.008),h.gain.exponentialRampToValueAtTime(1e-4,u+.18),p.connect(w),w.connect(h),h.connect(s),p.start(u),p.stop(u+.22)}const F=[{tones:[261.63,329.63,392],bass:130.81},{tones:[349.23,440,523.25],bass:174.61},{tones:[220,261.63,329.63],bass:110},{tones:[196,246.94,293.66],bass:98}],U=[[0,1,2,1,0,2,1,2],[0,2,1,2,0,1,2,1],[0,1,0,2,1,2,1,0]],Be=300,ce=8,Ge=2;let W=0,K=0,X=0,Y=0;function le(){if(!I||!T||!y)return;const C=T.currentTime,u=F[X%F.length],L=U[Y%U.length],p=W%ce,h=L[p]%u.tones.length,w=u.tones[h],ke=p===0?.058:p===4?.05:.04;se(w,C+.01,ke),p===0&&ze(u.bass,C+.01,.016),Math.random()<.1&&se(w*2,C+.06,.026),W+=1,W%ce===0&&(K+=1,K%2===0&&(Y=(Y+1)%U.length),K%Ge===0&&(X=(X+1)%F.length)),y.timerId=window.setTimeout(le,Be)}y={musicGain:i,lp:s,delay:n,fb:o,delayMix:a,drone:r,droneGain:c,lfo:m,timerId:null},le(),i.gain.setTargetAtTime(.4,e.currentTime,.7)}function Ne(){if(!T||!y)return;const e=T.currentTime;y.timerId&&clearTimeout(y.timerId),y.musicGain.gain.setTargetAtTime(1e-4,e,.25),setTimeout(()=>{try{y.drone?.stop()}catch{}try{y.lfo?.stop()}catch{}y=null},400)}O&&(O.textContent="🔊",O.addEventListener("click",()=>{I=!I,O.textContent=I?"🔊":"🔇",I?($(),q(),_(),M()):Ne()}));G&&(G.textContent="🎮");["pointerdown","touchstart","mousedown"].forEach(e=>{window.addEventListener(e,()=>{I&&($(),_())},{once:!0,passive:!0})});const d={href:null,projectIndex:0,slideIndex:0,dom:null};let z=null;const ve="https://www.linkedin.com/in/valerio-serani-682a48215/",Fe="https://www.instagram.com/velvet_172/",Ue="https://www.tiktok.com/@heyits172",We="https://vimeo.com/user95787021",Ke="https://www.behance.net/velvet172",he="valerioserani@gmail.com",we="+39 3469697747",ie={"#projects":{title:"Progetti",projects:[{id:"bestof",slides:[{src:l("img/PROGETTI/PROG_1.jpg"),client:"Sunsilk",title:"Testata Home 2025",what:"Creativity + layout",moreHtml:`
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
          <a class="social-item" href="${Fe}" target="_blank" rel="noopener noreferrer">
            <span class="social-ico">📸</span>
            <span class="social-text"><strong>Instagram</strong> @velvet_172</span>
          </a>
          <a class="social-item" href="${Ue}" target="_blank" rel="noopener noreferrer">
            <span class="social-ico">🎵</span>
            <span class="social-text"><strong>TikTok</strong> @heyits172</span>
          </a>
          <a class="social-item" href="${We}" target="_blank" rel="noopener noreferrer">
            <span class="social-ico">🎬</span>
            <span class="social-text"><strong>Vimeo</strong> /user95787021</span>
          </a>
          <a class="social-item" href="${Ke}" target="_blank" rel="noopener noreferrer">
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
    `}};function Xe(){if(!g)return;const e=ie["#projects"],n=(e.projects[d.projectIndex]||e.projects[0])?.slides||[];if(!n.length)return;d.slideIndex=je(d.slideIndex,0,n.length-1),g.innerHTML=`
  <div class="chCarousel" data-channel="#projects">
    <div class="chStage">
      <div class="chFrame" data-ch-frame>
        ${n.map((s,r)=>`
              <img class="chMedia ${r===d.slideIndex?"is-on":""}"
                   src="${s.src}" alt="" loading="lazy" decoding="async">
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
`;const o={frame:g.querySelector("[data-ch-frame]"),imgs:Array.from(g.querySelectorAll(".chMedia")),more:g.querySelector(".chMore"),moreContent:g.querySelector(".chMoreContent"),capClient:g.querySelector('[data-cap="client"]'),capTitle:g.querySelector('[data-cap="title"]'),capWhat:g.querySelector('[data-cap="what"]')};d.dom=o,ne(n,d.slideIndex);const a=g.querySelector('[data-ch="more"]');a&&(a.textContent="Scopri di più")}function ne(e,i){const n=e[i],o=d.dom;!n||!o||(o.capClient&&(o.capClient.textContent=n.client||""),o.capTitle&&(o.capTitle.textContent=n.title||""),o.capWhat&&(o.capWhat.textContent=n.what||""),o.frame&&o.frame.style.setProperty("--ch-bg",`url("${n.src}")`),o.moreContent&&(o.moreContent.innerHTML=n.moreHtml||""))}function J(){return!!d.dom?.frame?.classList.contains("is-more")}function Ye(e){const i=d.dom;!i?.frame||!i?.more||(i.frame.classList.add("is-more"),i.more.classList.add("is-open"),i.more.setAttribute("aria-hidden","false"),ne(e,d.slideIndex))}function B(){const e=d.dom;!e?.frame||!e?.more||(e.frame.classList.remove("is-more"),e.more.classList.remove("is-open"),e.more.setAttribute("aria-hidden","true"))}function Je(){Ie();const e=g?.querySelector(".bioCarousel"),i=g?.querySelector(".wii-card"),n=e?Array.from(e.querySelectorAll(".bioMedia")):[];if(!e||!n.length)return;i&&i.classList.add("bio-no-blur");let o=0;const a=()=>{n.forEach((r,c)=>r.classList.toggle("is-on",c===o));const s=n[o]?.getAttribute("src");s&&e.style.setProperty("--bio-bg",`url("${s}")`)};a(),z=window.setInterval(()=>{o=(o+1)%n.length,a()},3e3),i&&i.classList.add("bio-no-blur")}function Ie(){z&&(clearInterval(z),z=null)}function Ee(e){if(!v||!me||!g)return;d.href=e,v.classList.toggle("is-game",e==="#minigame"),v.classList.toggle("is-carousel",e==="#projects"),v.classList.toggle("is-about",e==="#about"),v.classList.toggle("is-exp",e==="#exp");const i=ie[e]||{title:"Canale",html:'<div class="wii-card"><h3>Coming soon</h3><p>Contenuto in arrivo.</p></div>'};me.textContent=i.title,e==="#projects"&&i.projects?(d.projectIndex=0,d.slideIndex=0,d.dom=null,Xe()):e==="#about"?(g.innerHTML=i.html||"",Je()):g.innerHTML=i.html||"",v.classList.add("is-open"),v.setAttribute("aria-hidden","false"),e==="#minigame"?requestAnimationFrame(()=>{tt()&&H()}):N(!1),M()}function D(){v&&(B(),N(!1),Ie(),v.classList.remove("is-open","is-game","is-carousel"),v.setAttribute("aria-hidden","true"),M())}ge&&ge.addEventListener("click",D);function Qe(e){!E||!k||!e||(k.src=e,E.classList.add("is-open"),E.setAttribute("aria-hidden","false"))}function Ce(){!E||!k||(E.classList.remove("is-open"),E.setAttribute("aria-hidden","true"),k.src="")}E&&E.addEventListener("click",Ce);v&&v.addEventListener("click",e=>{e.target===v&&D()});document.addEventListener("keydown",e=>{if(e.key==="Escape"&&E?.classList.contains("is-open")){Ce();return}e.key==="Escape"&&v?.classList.contains("is-open")&&D()});document.addEventListener("click",e=>{if(!A)return;const i=e.target?.closest?.(".wii-tile");if(!i)return;const n=i.getAttribute("data-href")||i.getAttribute("href");n&&n.startsWith("#")&&(e.preventDefault(),Ee(n))});G&&G.addEventListener("click",e=>{A&&(e.preventDefault(),Ee("#minigame"))});g?.addEventListener("click",e=>{if(d.href==="#projects"&&e.target?.closest?.("[data-ch-frame]")){const f=d.dom?.imgs?.find(R=>R.classList.contains("is-on"))?.getAttribute("src");if(f){e.preventDefault(),e.stopPropagation(),Qe(f);return}}const i=e.target?.closest?.("[data-ch]"),n=i?.getAttribute("data-ch");if(e.target?.closest?.("[data-ch-frame]")&&J()&&!i){B();const c=g.querySelector('[data-ch="more"]');c&&(c.textContent="Scopri di più");return}if(!n||d.href!=="#projects")return;const a=ie["#projects"],r=(a.projects[d.projectIndex]||a.projects[0])?.slides||[];if(r.length){if(n==="more"){J()?(B(),i.textContent="Scopri di più"):(Ye(r),i.textContent="Chiudi");return}if(n==="prev"||n==="next"){if(J()){B();const c=g.querySelector('[data-ch="more"]');c&&(c.textContent="Scopri di più")}n==="prev"?d.slideIndex=(d.slideIndex-1+r.length)%r.length:d.slideIndex=(d.slideIndex+1)%r.length,d.dom?.imgs?.forEach((c,m)=>c.classList.toggle("is-on",m===d.slideIndex)),ne(r,d.slideIndex);return}}});let xe=0,Ae=0,Q=0,Z=0,te=!1,V="mouse",j=null;function Ze(){b&&(te||(te=!0,b.style.opacity="1"))}function Se(){b&&(te=!1,b.style.opacity="0")}function Le(){Q+=(xe-Q)*.18,Z+=(Ae-Z)*.18;const e=-10,i=-4;b&&(b.style.transform=`translate3d(${Q+e}px, ${Z+i}px, 0)`),requestAnimationFrame(Le)}requestAnimationFrame(Le);window.addEventListener("pointermove",e=>{if(V=e.pointerType||"mouse",V!=="mouse"){Se();return}xe=e.clientX,Ae=e.clientY,Ze()});window.addEventListener("mouseleave",()=>Se());const Pe=".wii-tile, .wii-pill";function Me(e){b&&b.classList.toggle("is-hover",e)}document.addEventListener("pointerover",e=>{if(V!=="mouse")return;const i=e.target?.closest?.(Pe);i&&i!==j&&(j=i,Me(!0),De())});document.addEventListener("pointerout",e=>{const i=e.target?.closest?.(Pe);if(i&&i===j){const n=e.relatedTarget;if(n&&i.contains(n))return;j=null,Me(!1)}});document.addEventListener("pointerdown",()=>{I&&($(),q(),_()),!(!b||V!=="mouse")&&(b.classList.add("is-down"),M())});document.addEventListener("pointerup",()=>{b&&b.classList.remove("is-down")});let t={running:!1,score:0,timeLeft:30,lastTs:0,spawnAcc:0,bubbles:[],rafId:null,timerId:null,canvas:null,ctx:null,scoreEl:null,timeEl:null,overEl:null,overScoreEl:null,overRestartBtn:null,overCloseBtn:null};function oe(){t.overEl&&(t.overEl.classList.remove("is-show"),t.overEl.setAttribute("aria-hidden","true"))}function et(){t.overEl&&(t.overScoreEl&&(t.overScoreEl.textContent=String(t.score)),t.overEl.classList.add("is-show"),t.overEl.setAttribute("aria-hidden","false"))}function tt(){t.canvas=document.getElementById("mgCanvas"),t.scoreEl=document.getElementById("mgScore"),t.timeEl=document.getElementById("mgTime"),t.overEl=document.getElementById("mgOver"),t.overScoreEl=document.getElementById("mgOverScore"),t.overRestartBtn=document.getElementById("mgOverRestart"),t.overCloseBtn=document.getElementById("mgOverClose");const e=document.getElementById("mgStart"),i=document.getElementById("mgReset");return t.canvas?(t.ctx=t.canvas.getContext("2d"),oe(),t.overRestartBtn&&(t.overRestartBtn.onclick=()=>{H(),be()}),t.overCloseBtn&&(t.overCloseBtn.onclick=()=>D()),t.canvas.onpointerdown=n=>{if(!t.running)return;const o=t.canvas.getBoundingClientRect(),a=(n.clientX-o.left)/o.width*t.canvas.width,s=(n.clientY-o.top)/o.height*t.canvas.height;for(let r=t.bubbles.length-1;r>=0;r--){const c=t.bubbles[r],m=a-c.x,f=s-c.y;if(m*m+f*f<=c.r*c.r){t.bubbles.splice(r,1),t.score+=1,t.scoreEl&&(t.scoreEl.textContent=String(t.score)),nt();return}}},e&&(e.onclick=()=>be()),i&&(i.onclick=()=>H()),re(),!0):!1}function re(){if(!t.canvas)return;const e=Math.min(window.devicePixelRatio||1,2),i=t.canvas.clientWidth,n=t.canvas.clientHeight;if(!i||!n)return;const o=Math.round(i*e),a=Math.round(n*e);(t.canvas.width!==o||t.canvas.height!==a)&&(t.canvas.width=o,t.canvas.height=a)}function H(){N(!1),oe(),t.score=0,t.timeLeft=30,t.bubbles=[],t.scoreEl&&(t.scoreEl.textContent="0"),t.timeEl&&(t.timeEl.textContent="30"),Oe()}function be(){t.running||(t.timeLeft<=0&&H(),oe(),t.running=!0,t.lastTs=performance.now(),t.spawnAcc=0,t.timerId=window.setInterval(()=>{t.running&&(t.timeLeft-=1,t.timeEl&&(t.timeEl.textContent=String(t.timeLeft)),t.timeLeft<=0&&(t.timeLeft=0,t.timeEl&&(t.timeEl.textContent="0"),N(!0)))},1e3),t.rafId=requestAnimationFrame(Re))}function N(e=!1){t.running=!1,t.timerId&&(clearInterval(t.timerId),t.timerId=null),t.rafId&&(cancelAnimationFrame(t.rafId),t.rafId=null),e&&(et(),ot())}function it(){if(!t.canvas)return;const e=t.canvas.width,i=t.canvas.height,n=22+Math.random()*26,o=n+Math.random()*(e-n*2),a=n+Math.random()*(i-n*2),s=(-.25+Math.random()*.5)*(window.devicePixelRatio||1),r=(-.15+Math.random()*.35)*(window.devicePixelRatio||1),c=3.2+Math.random()*1.8;t.bubbles.push({x:o,y:a,r:n,vx:s,vy:r,born:performance.now(),life:c})}function Re(e){if(!t.running)return;const i=Math.min((e-t.lastTs)/1e3,.05);t.lastTs=e,re();const o=.55/(1+(30-t.timeLeft)*.03);for(t.spawnAcc+=i;t.spawnAcc>=o;)t.spawnAcc-=o,it();const a=performance.now();for(let s=t.bubbles.length-1;s>=0;s--){const r=t.bubbles[s];r.x+=r.vx*60*i,r.y+=r.vy*60*i,r.x-r.r<0&&(r.x=r.r,r.vx*=-1),r.x+r.r>t.canvas.width&&(r.x=t.canvas.width-r.r,r.vx*=-1),r.y-r.r<0&&(r.y=r.r,r.vy*=-1),r.y+r.r>t.canvas.height&&(r.y=t.canvas.height-r.r,r.vy*=-1),(a-r.born)/1e3>r.life&&t.bubbles.splice(s,1)}Oe(),t.rafId=requestAnimationFrame(Re)}function Oe(){if(!t.ctx||!t.canvas)return;const e=t.ctx,i=t.canvas.width,n=t.canvas.height;e.clearRect(0,0,i,n),e.fillStyle="rgba(255,255,255,0.22)",e.fillRect(0,0,i,n);for(const o of t.bubbles){const a=e.createRadialGradient(o.x-o.r*.35,o.y-o.r*.35,o.r*.2,o.x,o.y,o.r);a.addColorStop(0,"rgba(255,255,255,0.95)"),a.addColorStop(.35,"rgba(255,255,255,0.35)"),a.addColorStop(1,"rgba(43,184,255,0.18)"),e.beginPath(),e.arc(o.x,o.y,o.r,0,Math.PI*2),e.fillStyle=a,e.fill(),e.lineWidth=2,e.strokeStyle="rgba(43,184,255,0.35)",e.stroke(),e.beginPath(),e.arc(o.x-o.r*.25,o.y-o.r*.25,o.r*.28,0,Math.PI*2),e.fillStyle="rgba(255,255,255,0.28)",e.fill()}}function nt(){const e=P();if(!e)return;const i=e.currentTime,n=e.createOscillator(),o=e.createGain();n.type="sine",n.frequency.setValueAtTime(620,i),n.frequency.exponentialRampToValueAtTime(280,i+.06),o.gain.setValueAtTime(1e-4,i),o.gain.exponentialRampToValueAtTime(.08,i+.008),o.gain.exponentialRampToValueAtTime(1e-4,i+.1),n.connect(o),o.connect(e.destination),n.start(i),n.stop(i+.12)}function ot(){const e=P();if(!e)return;const i=e.currentTime;[880,740,622].forEach((o,a)=>{const s=e.createOscillator(),r=e.createGain(),c=i+a*.12;s.type="triangle",s.frequency.setValueAtTime(o,c),r.gain.setValueAtTime(1e-4,c),r.gain.exponentialRampToValueAtTime(.06,c+.01),r.gain.exponentialRampToValueAtTime(1e-4,c+.16),s.connect(r),r.connect(e.destination),s.start(c),s.stop(c+.18)})}window.addEventListener("resize",()=>{document.getElementById("mgCanvas")&&re()});function ee(){A||(A=!0,x&&(x.classList.add("is-hidden"),x.setAttribute("aria-hidden","true")),I&&($(),q(),_()),M())}function rt(){if(!x){A=!0;return}x.addEventListener("click",e=>{e.preventDefault(),ee()}),x.addEventListener("pointerdown",e=>{e.preventDefault(),ee()}),window.addEventListener("keydown",e=>{A||(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),ee())})}function ae(){const e=window.visualViewport?.height||window.innerHeight;document.documentElement.style.setProperty("--vh",`${e}px`)}$e();S&&S.classList.add("is-swoosh-in");ye();setInterval(ye,1e3);rt();ae();window.addEventListener("resize",ae);window.visualViewport?.addEventListener("resize",ae);
