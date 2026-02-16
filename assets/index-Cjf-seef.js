(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function o(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(a){if(a.ep)return;a.ep=!0;const r=o(a);fetch(a.href,r)}})();const Xe="/Portfolio_Valerio/",c=e=>`${Xe}${e.replace(/^\/+/,"")}`,F=window.matchMedia("(max-width: 640px)"),de=window.matchMedia("(prefers-reduced-motion: reduce)"),V=document.getElementById("wiiIntro");let R=!1;const L=document.getElementById("grid");document.getElementById("board");const ye=document.getElementById("time"),Ie=document.getElementById("date"),q=document.getElementById("btnLeft"),Q=document.getElementById("btnRight"),g=document.getElementById("wiiOverlay"),Ae=document.getElementById("overlayBack"),M=document.getElementById("overlayTitle"),u=document.getElementById("overlayBody"),y=document.getElementById("wiiPointer"),S=document.getElementById("imgViewer"),K=document.getElementById("imgViewerSrc"),O=document.getElementById("videoViewer"),A=document.getElementById("videoViewerSrc");let pe=[];function Ye(e,t,o){return Math.max(t,Math.min(o,e))}const Je=[[{icon:"👋",t:"Chi sono",s:"Bio + competenze",href:"#about",previews:[c("img/BIO/BIO_1.jpg"),c("img/BIO/BIO_2.jpg"),c("img/BIO/BIO_3.jpg")]},{icon:"🎓",t:"Esperienze",s:"Formazione / studi",href:"#exp"},{icon:"✉️",t:"Contatti",s:"Mail e social",href:"#contact"},{icon:"🧩",t:"Progetti",s:"Case study e lavori",href:"#projects",previews:[c("img/PROGETTI/PROG_1.jpg"),c("img/PROGETTI/PROG_2.jpg"),c("img/PROGETTI/PROG_3.jpg")]},{icon:"📱",t:"Social",s:"I miei profili",href:"#social"},{icon:"🎬",t:"Video",s:"Social e progetti",href:"#videos",previewAnim:"wiiPreviewFadeTight",previews:[c("img/CHANNELS/VIDEO/VIDEO PROMO_3-frame.jpg"),c("img/CHANNELS/VIDEO/meschia-cover.jpg"),c("img/CHANNELS/VIDEO/PROGETTI PERSONALI_2-frame.jpg"),c("img/CHANNELS/VIDEO/REQUIEM LOCANDINA.jpg")]},{icon:"🛠️",t:"Skills",s:"Cosa so fare",href:"#tools"},{icon:"🤖",t:"AI",s:"Workflow",href:"#ai",previewVideo:{src:c("img/CHANNELS/ai.mp4"),poster:c("img/CHANNELS/ai-frame.jpg")}},{icon:"📌",t:"Servizi",s:"Cosa offro",href:"#services",previewVideo:{src:c("img/CHANNELS/servizi.mp4"),poster:c("img/CHANNELS/servizi-frame.jpg")}}],[{icon:"📷",t:"Galleria",s:"Foto e frame",href:"#gallery"},{icon:"🗂️",t:"Archivio",s:"Lavori passati",href:"#archive"},{icon:"📝",t:"Blog",s:"Note e making-of",href:"#blog"},{icon:"📍",t:"Dove sono",s:"Roma / contatti",href:"#where"}]];let z=0;const Ze=420,et=320,tt=900;function it(){return Je[0]}function ot(){if(!L)return;const e=it();L.innerHTML=e.map(t=>{const o=t.previewVideo?.src,i=t.previewVideo?.poster,a=Array.isArray(t.previews)?t.previews:[],r=i?` poster="${i}"`:"",s=i?` style="--preview-poster:url('${i}')"`:"",l=a.length>1?` style="--preview-step:3s; --preview-duration:${a.length*3}s${t.previewAnim?`; --preview-anim:${t.previewAnim}`:""}"`:"",p=o?`
          <div class="wii-preview wii-preview--single wii-preview--video"${s} aria-hidden="true">
            <video class="preview-video" src="${t.previewVideo.src}"${r} muted loop playsinline preload="metadata"></video>
          </div>
        `:a.length?`
          <div class="wii-preview ${a.length===1?"wii-preview--single":""}"${l} aria-hidden="true">
            ${a.map(m=>`<img src="${m}" alt="" loading="lazy" decoding="async">`).join("")}
          </div>
        `:"";return`
        <a class="wii-tile" href="${t.href}" data-href="${t.href}">
          ${p}
          <div class="wii-tileContent">
            <div class="wii-icon">${t.icon}</div>
            <div class="wii-tileText">
              <div class="wii-title">${t.t}</div>
              <div class="wii-sub">${t.s}</div>
            </div>
          </div>
        </a>
      `}).join(""),nt(),st(),Re(),P()}function nt(){if(!L)return;Array.from(L.querySelectorAll(".wii-preview:not(.wii-preview--single)")).forEach((t,o)=>{const i=window.getComputedStyle(t),a=parseFloat(i.getPropertyValue("--preview-duration"))||12,r=parseFloat(i.getPropertyValue("--preview-step"))||4,s=(o+1)*r*1.618%a;t.style.setProperty("--preview-phase",`-${s.toFixed(2)}s`)})}function Re(){if(!L)return;Array.from(L.querySelectorAll(".wii-preview--video")).forEach(t=>{const o=t.closest(".wii-tile");if(!o)return;const i=o.getBoundingClientRect();if(!i.height)return;const a=i.width/i.height,r=Math.max(1,Math.min(a,16/9));t.style.setProperty("--video-zoom",r.toFixed(3))})}function st(){if(!L)return;const e=Array.from(L.querySelectorAll(".wii-preview--video"));pe=[],e.forEach(t=>{const o=t.closest(".wii-tile");if(!o)return;const i=t.querySelector(".preview-video");if(!i)return;pe.push({preview:t,video:i}),i.muted=!0,i.loop=!0,i.setAttribute("playsinline","");const a=()=>{if(t.classList.add("is-ready"),i.paused)try{i.currentTime=0}catch{}};i.addEventListener("loadeddata",a,{once:!0});const r=()=>{t.classList.add("is-hover"),i.currentTime=0,i.play().catch(()=>{})},s=()=>{i.pause(),i.currentTime=0,t.classList.remove("is-hover")};o.addEventListener("mouseenter",r),o.addEventListener("mouseleave",s),o.addEventListener("pointerenter",r),o.addEventListener("pointerleave",s),o.addEventListener("focusin",r),o.addEventListener("focusout",s)})}function P(){const e=F.matches&&!de.matches;pe.forEach(({preview:t,video:o})=>{if(e)t.classList.add("is-auto"),o.play().catch(()=>{});else{t.classList.remove("is-auto"),o.pause();try{o.currentTime=0}catch{}}})}function Me(){if(!ye||!Ie)return;const e=new Date,t=String(e.getHours()).padStart(2,"0"),o=String(e.getMinutes()).padStart(2,"0");ye.textContent=`${t}:${o}`;const i=["Dom","Lun","Mar","Mer","Gio","Ven","Sab"],a=["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"],r=e.getDate(),s=i[e.getDay()],l=a[e.getMonth()];Ie.textContent=`${s} ${r} ${l}`}let T=null,I=!0,Oe=!1,Le=0;function D(){return I?(T||(T=new(window.AudioContext||window.webkitAudioContext)),T.state==="suspended"&&T.resume().catch(()=>{}),T):null}function B(){const e=D();if(e){e.state==="suspended"&&e.resume().catch(()=>{});try{const t=e.createBuffer(1,1,e.sampleRate),o=e.createBufferSource();o.buffer=t,o.connect(e.destination),o.start(0)}catch{}}}function k(){Oe||(Oe=!0,B())}function Ne({type:e="sine",freq:t=700,duration:o=.05,gain:i=.04,attack:a=.002,release:r=.035}={}){const s=D();if(!s)return;const l=s.currentTime,p=s.createOscillator(),m=s.createGain();p.type=e,p.frequency.setValueAtTime(t,l),m.gain.setValueAtTime(0,l),m.gain.linearRampToValueAtTime(i,l+a),m.gain.exponentialRampToValueAtTime(1e-4,l+a+r),p.connect(m),m.connect(s.destination),p.start(l),p.stop(l+o+r+.02)}function at(){const e=performance.now();e-Le<120||(Le=e,Ne({type:"sine",freq:880,duration:.03,gain:.026,attack:.002,release:.03}))}function j(){Ne({type:"triangle",freq:520,duration:.03,gain:.05,attack:.001,release:.02})}let b=null,H=!1;function G(){const e=D();if(!e||b)return;const t=e.createGain();t.gain.value=0,t.connect(e.destination);const o=e.createDelay(.35);o.delayTime.value=.18;const i=e.createGain();i.gain.value=.2,o.connect(i),i.connect(o);const a=e.createGain();a.gain.value=.25;const r=e.createBiquadFilter();r.type="lowpass",r.frequency.value=2600,r.Q.value=.7,r.connect(t),r.connect(o),o.connect(a),a.connect(t);const s=e.createOscillator();s.type="sine",s.frequency.value=130.81;const l=e.createGain();l.gain.value=1e-4,s.connect(l),l.connect(r);const p=e.createOscillator();p.type="sine",p.frequency.value=.08;const m=e.createGain();m.gain.value=.007,p.connect(m),m.connect(l.gain);const h=e.currentTime;s.start(h),p.start(h);function N(C,v,x=.05){const f=e.createOscillator(),E=e.createGain(),w=e.createBiquadFilter();f.type="triangle",f.frequency.setValueAtTime(C,v),w.type="highpass",w.frequency.setValueAtTime(240,v),E.gain.setValueAtTime(1e-4,v),E.gain.exponentialRampToValueAtTime(x,v+.01),E.gain.exponentialRampToValueAtTime(1e-4,v+.22),f.connect(w),w.connect(E),E.connect(r),f.start(v),f.stop(v+.3)}function Ee(C,v,x=.018){const f=e.createOscillator(),E=e.createGain(),w=e.createBiquadFilter();f.type="sine",f.frequency.setValueAtTime(C,v),w.type="lowpass",w.frequency.setValueAtTime(520,v),E.gain.setValueAtTime(1e-4,v),E.gain.exponentialRampToValueAtTime(x,v+.008),E.gain.exponentialRampToValueAtTime(1e-4,v+.18),f.connect(w),w.connect(E),E.connect(r),f.start(v),f.stop(v+.22)}const $=[{tones:[261.63,329.63,392],bass:130.81},{tones:[349.23,440,523.25],bass:174.61},{tones:[220,261.63,329.63],bass:110},{tones:[196,246.94,293.66],bass:98}],te=[[0,1,2,1,0,2,1,2],[0,2,1,2,0,1,2,1],[0,1,0,2,1,2,1,0]],We=300,we=8,Qe=2;let ie=0,oe=0,ne=0,se=0;function be(){if(!I||!T||!b)return;const C=T.currentTime,v=$[ne%$.length],x=te[se%te.length],f=ie%we,E=x[f]%v.tones.length,w=v.tones[E],Ke=f===0?.058:f===4?.05:.04;N(w,C+.01,Ke),f===0&&Ee(v.bass,C+.01,.016),Math.random()<.1&&N(w*2,C+.06,.026),ie+=1,ie%we===0&&(oe+=1,oe%2===0&&(se=(se+1)%te.length),oe%Qe===0&&(ne=(ne+1)%$.length)),b.timerId=window.setTimeout(be,We)}b={musicGain:t,lp:r,delay:o,fb:i,delayMix:a,drone:s,droneGain:l,lfo:p,timerId:null},be(),t.gain.setTargetAtTime(.4,e.currentTime,.7)}function xe(){if(!T||!b)return;const e=T.currentTime;b.timerId&&clearTimeout(b.timerId),b.musicGain.gain.setTargetAtTime(1e-4,e,.25),setTimeout(()=>{try{b.drone?.stop()}catch{}try{b.lfo?.stop()}catch{}b=null},400)}q&&(q.textContent="🔊",q.addEventListener("click",()=>{R&&(performance.now()<z||(I=!I,q.textContent=I?"🔊":"🔇",I?(k(),B(),G(),j()):xe()))}));Q&&(Q.textContent="🎮");["pointerdown","touchstart","mousedown"].forEach(e=>{window.addEventListener(e,()=>{I&&(k(),G())},{once:!0,passive:!0})});const d={href:null,projectIndex:0,slideIndex:0,dom:null,videoSectionId:null};let U=null;const Te="https://www.linkedin.com/in/valerio-serani-682a48215/",rt="https://www.instagram.com/velvet_172/",ct="https://www.tiktok.com/@heyits172",lt="https://vimeo.com/user95787021",dt="https://www.behance.net/velvet172",Se="valerioserani@gmail.com",Ce="+39 3469697747",_={"#projects":{title:"Progetti",projects:[{id:"bestof",slides:[{src:c("img/PROGETTI/PROG_1.jpg"),client:"Sunsilk",title:"Testata Home 2025",what:"Creativity + layout",moreHtml:`
              <h3 class="chMoreTitle">Sunsilk — Testata Home</h3>
              <p class="chMoreText">Progetto estratto dal portfolio accademico pubblicato su LinkedIn. Focus su gerarchia visiva, adattamento testata e leggibilità in home.</p>
            `},{src:c("img/PROGETTI/PROG_2.jpg"),client:"M&M’s / UCI",title:"Screentime Cinema",what:"Layout + output ADV",moreHtml:`
              <h3 class="chMoreTitle">M&M’s / UCI — Screentime</h3>
              <p class="chMoreText">Studio ADV dedicato al formato cinema: impaginazione del messaggio, bilanciamento brand/prodotto e output orientato alla visibilità.</p>
            `},{src:c("img/PROGETTI/PROG_3.jpg"),client:"Cliente",title:"Visual",what:"Creativity / design",moreHtml:`
              <h3 class="chMoreTitle">Visual</h3>
              <p class="chMoreText">Concept visual con approccio design-first: direzione creativa, composizione e resa finale pensata per contenuti social e digital.</p>
            `},{src:c("img/PROGETTI/PROG_4.jpg"),client:"Snickers / Twix",title:"Cover Adattamento",what:"Visual + layout",moreHtml:`
              <h3 class="chMoreTitle">Snickers / Twix</h3>
              <p class="chMoreText">Adattamento cover multi-brand con attenzione a consistenza grafica, impatto del key visual e coerenza tra linee prodotto.</p>
            `},{src:c("img/PROGETTI/PROG_5.jpg"),client:"Compeed",title:"Volantino Stop Brufoli",what:"Print / layout",moreHtml:`
              <h3 class="chMoreTitle">Compeed — Volantino</h3>
              <p class="chMoreText">Materiale print orientato alla conversione: struttura informativa chiara, call to action evidente e visual di supporto al messaggio.</p>
            `},{src:c("img/PROGETTI/PROG_6.jpg"),client:"Boem",title:"Visual",what:"Brand / creative",moreHtml:`
              <h3 class="chMoreTitle">Boem</h3>
              <p class="chMoreText">Esplorazione brand/creative: ricerca di tono visivo, elementi distintivi e applicazione coerente su formato statico.</p>
            `},{src:c("img/PROGETTI/PROG_7.jpg"),client:"Landing",title:"Carousel",what:"UI / layout",moreHtml:`
              <h3 class="chMoreTitle">Landing Carousel</h3>
              <p class="chMoreText">Proposta UI per carousel in landing: ordine dei contenuti, ritmo di navigazione e leggibilità mobile-first.</p>
            `},{src:c("img/PROGETTI/PROG_8.jpg"),client:"Cartolina",title:"Fronte",what:"Print / design",moreHtml:`
              <h3 class="chMoreTitle">Cartolina</h3>
              <p class="chMoreText">Output editoriale/print con focus su layout, equilibrio tipografico e resa visiva immediata sul formato ridotto.</p>
            `},{src:c("img/PROGETTI/PROG_9.jpg"),client:"Control",title:"Visual",what:"Brand / layout",moreHtml:`
              <h3 class="chMoreTitle">Control</h3>
              <p class="chMoreText">Visual brand-oriented sviluppato per rafforzare riconoscibilità e chiarezza del messaggio in ambiente digitale.</p>
            `},{src:c("img/PROGETTI/PROG_10.jpg"),client:"Amuchina",title:"Hai Vinto",what:"Campaign / visual",moreHtml:`
              <h3 class="chMoreTitle">Amuchina — Hai Vinto</h3>
              <p class="chMoreText">Creatività per campagna promozionale: headline e visual impostati per immediatezza, impatto e lettura rapida.</p>
            `},{src:c("img/PROGETTI/PROG_11.jpg"),client:"Campagna",title:"Hai Vinto",what:"Visual / layout",moreHtml:`
              <h3 class="chMoreTitle">Hai Vinto</h3>
              <p class="chMoreText">Variante visual della campagna con focus su adattamento grafico, coerenza narrativa e pulizia compositiva.</p>
            `},{src:c("img/PROGETTI/PROG_12.jpg"),client:"Testata Home",title:"Visual",what:"Layout / design",moreHtml:`
              <h3 class="chMoreTitle">Testata Home</h3>
              <p class="chMoreText">Sviluppo testata in piu varianti: priorita ai contenuti, bilanciamento spazi e ottimizzazione dell'impatto above-the-fold.</p>
            `},{src:c("img/PROGETTI/PROG_13.jpg"),client:"UILtemp",title:"App Site Play",what:"UI / layout",moreHtml:`
              <h3 class="chMoreTitle">UILtemp — App Site</h3>
              <p class="chMoreText">Case UI/layout per sito-app: struttura delle sezioni, chiarezza d'uso e coerenza visiva tra componenti.</p>
            `}]}]},"#videos":{title:"Video",sections:[{id:"winsmart",title:"Video promozionali / Winsmart",kicker:"PROMO",summary:"Selezione di video promozionali, materiali Winsmart e contenuti social: curati interamente montaggio, editing, VFX e musica.",hubThumb:c("img/CHANNELS/VIDEO/VIDEO PROMO_3-frame.jpg"),hero:{src:c("img/CHANNELS/VIDEO/VIDEO PROMO_3-frame.jpg"),alt:"Hero Winsmart"},videos:[{title:"Promo 01",desc:"Cut breve per social con focus su prodotto e CTA.",src:c("img/CHANNELS/VIDEO/VIDEO PROMO_1.mp4"),poster:c("img/CHANNELS/VIDEO/VIDEO PROMO_1-frame.jpg")},{title:"Promo 02",desc:"Versione dinamica con ritmo piu rapido e titoli.",src:c("img/CHANNELS/VIDEO/VIDEO PROMO_2.mp4"),poster:c("img/CHANNELS/VIDEO/VIDEO PROMO_2-frame.jpg")},{title:"Promo 03",desc:"Cut verticale pensato per social con ritmo veloce.",src:c("img/CHANNELS/VIDEO/VIDEO PROMO_3.mp4"),poster:c("img/CHANNELS/VIDEO/VIDEO PROMO_3-frame.jpg")},{title:"Promo 04",desc:"Variante con focus su titoli e prodotto.",src:c("img/CHANNELS/VIDEO/VIDEO PROMO_4.mp4"),poster:c("img/CHANNELS/VIDEO/VIDEO PROMO_4-frame.jpg")},{title:"Promo 05",desc:"Versione verticale con focus su ritmo e callout.",src:c("img/CHANNELS/VIDEO/VIDEO PROMO_5.mp4"),poster:c("img/CHANNELS/VIDEO/VIDEO PROMO_5-frame.jpg")}]},{id:"meschia",title:"Social per Meschia",kicker:"Meschia",summary:"Produzione di lavori social: format brevi, coerenza visiva e adattamenti multi-piattaforma.",hero:{src:c("img/CHANNELS/VIDEO/meschia-cover.jpg"),alt:"Hero Meschia"},videos:[{title:"Social 01",desc:"Formato verticale con ritmo pensato per social.",src:c("img/CHANNELS/VIDEO/CADERE_1.mp4"),poster:c("img/CHANNELS/VIDEO/CADERE_1-frame.jpg")},{title:"Social 02",desc:"Cut rapido per mantenere alta l'attenzione.",src:c("img/CHANNELS/VIDEO/CADERE_2.mp4"),poster:c("img/CHANNELS/VIDEO/CADERE_2-frame.jpg")},{title:"Social 03",desc:"Versione teaser con focus su mood e dettagli.",src:c("img/CHANNELS/VIDEO/CADERE_3.mp4"),poster:c("img/CHANNELS/VIDEO/CADERE_3-frame.jpg")},{title:"Social 04",desc:"Variante con taglio finale piu deciso.",src:c("img/CHANNELS/VIDEO/CADERE_4.mp4"),poster:c("img/CHANNELS/VIDEO/CADERE_4-frame.jpg")}]},{id:"personali",title:"Progetti personali",kicker:"Personal",summary:"Esperimenti e lavori accademici: tutto il processo di ideazione, illustrazione e montaggio e stato curato interamente da me.",hubThumb:c("img/CHANNELS/VIDEO/PROGETTI PERSONALI_2-frame.jpg"),hero:{src:c("img/CHANNELS/VIDEO/PROGETTI PERSONALI_1-frame.jpg"),alt:"Hero Progetti personali"},videos:[{title:"Personal 01",desc:"Studio visivo e composizione per concept personale.",src:c("img/CHANNELS/VIDEO/PROGETTI PERSONALI_1.mp4"),poster:c("img/CHANNELS/VIDEO/PROGETTI PERSONALI_1-frame.jpg")},{title:"Personal 02",desc:"Short video sperimentale con focus su ritmo e mood.",src:c("img/CHANNELS/VIDEO/PROGETTI PERSONALI_2.mp4"),poster:c("img/CHANNELS/VIDEO/PROGETTI PERSONALI_2-frame.jpg")}]},{id:"requiem",title:'48h Film Project - "Requiem"',kicker:"48h Film Project",summary:'Esperienza sul set come grafico, backstage e supporto alla fotografia durante le riprese del corto "Requiem", diretto da Lorenzo Russo.',hubThumb:c("img/CHANNELS/VIDEO/REQUIEM LOCANDINA.jpg"),hero:{src:c("img/CHANNELS/VIDEO/REQUIEM LOCANDINA.jpg"),alt:"Hero Requiem"},videos:[{title:"Backstage",desc:"Estratto dal set, girato e montato.",src:c("img/CHANNELS/VIDEO/REQUIEM BACKSTAGE.mp4"),poster:c("img/CHANNELS/VIDEO/REQUIEM BACKSTAGE-frame.jpg")},{title:"Locandina",desc:"Locandina ufficiale del corto.",poster:c("img/CHANNELS/VIDEO/REQUIEM LOCANDINA.jpg"),static:!0}]}]},"#about":{title:"Chi sono",html:`
      <div class="wii-card bio-card">
        <div class="bioCarousel" aria-label="Chi sono - carosello">
          <img class="bioMedia" src="${c("img/BIO/BIO_1.jpg")}" alt="" loading="lazy" decoding="async">
          <img class="bioMedia" src="${c("img/BIO/BIO_2.jpg")}" alt="" loading="lazy" decoding="async">
          <img class="bioMedia" src="${c("img/BIO/BIO_3.jpg")}" alt="" loading="lazy" decoding="async">
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
        <p><strong>Email</strong>: <a href="mailto:${Se}">${Se}</a></p>
        <p><strong>Telefono</strong>: <a href="tel:${Ce.replace(/\s+/g,"")}">${Ce}</a></p>
        <p class="wii-meta">Base: <strong>Roma</strong></p>
      </div>
      <div class="wii-card">
        <h3>Profilo LinkedIn</h3>
        <p><strong>Profilo LinkedIn</strong> con esperienza, formazione e contatti.</p>
        <div class="wii-links">
          <a class="wii-link" href="${Te}" target="_blank" rel="noopener noreferrer">
            Apri profilo LinkedIn
          </a>
        </div>
      </div>
    `},"#social":{title:"Social",html:`
      <div class="wii-card">
        <h3>Canali social</h3>
        <p>Qui trovi tutti i miei social: raccontano la mia parte piu professionale e quella piu ludica. Passione e lavoro sono sempre andati di pari passo nella mia vita, e qui li vedi convivere.</p>
        <div class="social-list">
          <a class="social-item" href="${Te}" target="_blank" rel="noopener noreferrer">
            <span class="social-ico">💼</span>
            <span class="social-text"><strong>LinkedIn</strong> /valerio-serani-682a48215</span>
          </a>
          <a class="social-item" href="${rt}" target="_blank" rel="noopener noreferrer">
            <span class="social-ico">📸</span>
            <span class="social-text"><strong>Instagram</strong> @velvet_172</span>
          </a>
          <a class="social-item" href="${ct}" target="_blank" rel="noopener noreferrer">
            <span class="social-ico">🎵</span>
            <span class="social-text"><strong>TikTok</strong> @heyits172</span>
          </a>
          <a class="social-item" href="${lt}" target="_blank" rel="noopener noreferrer">
            <span class="social-ico">🎬</span>
            <span class="social-text"><strong>Vimeo</strong> /user95787021</span>
          </a>
          <a class="social-item" href="${dt}" target="_blank" rel="noopener noreferrer">
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
    `}};function pt(e){const o=_["#videos"]?.sections||[];return o.length?o.find(i=>i.id===e)||o[0]:null}function He(){if(!u||!M||!g)return;const e=_["#videos"],t=e?.sections||[];if(!t.length)return;d.videoSectionId=null,g.classList.remove("is-video-detail"),M.textContent=e.title;const o=t.map(i=>{const a=i.hubThumb||i.hero?.src,r=a?` style="--thumb:url('${a}')"`:"";return`
        <button class="wii-card video-hub-card" type="button" data-video-section="${i.id}">
          <div class="video-hub-thumb"${r} aria-hidden="true"></div>
          <div class="video-hub-copy">
            <h3>${i.title}</h3>
          </div>
        </button>
      `}).join("");u.innerHTML=`<div class="video-hub">${o}</div>`,u.scrollTop=0}function ut(e){if(!u||!M||!g)return;const t=pt(e);if(!t)return;d.videoSectionId=t.id,M.textContent=t.title,g.classList.add("is-video-detail");const o=t.hero?.src?` style="--hero:url('${t.hero.src}')"`:"",i=t.hero?.alt?` role="img" aria-label="${t.hero.alt}"`:"",a=(t.videos||[]).map(r=>{const s=!!r.src,l=!!r.static,p=r.poster||t.hero?.src||"",m=p?` style="--thumb:url('${p}')"`:"";return`
        <button class="video-feed-item" type="button"${s?` data-video-open data-video-src="${r.src}"${p?` data-video-poster="${p}"`:""}`:l&&p?` data-image-open data-image-src="${p}"`:""}${s||l?"":" disabled"}>
          <div class="video-feed-thumb"${m}>
            ${s?'<span class="video-feed-play">▶</span>':""}
            ${s||l?"":'<span class="video-feed-badge">In arrivo</span>'}
          </div>
          <div class="video-feed-meta">
            <h4>${r.title}</h4>
            ${r.desc?`<p>${r.desc}</p>`:""}
          </div>
        </button>
      `}).join("");u.innerHTML=`
    <div class="video-detail">
      <div class="video-hero"${o}${i}>
        <div class="video-heroOverlay">
          <div class="video-heroKicker">${t.kicker||"Video"}</div>
          <h3>${t.title}</h3>
          <p>${t.summary}</p>
        </div>
      </div>
      <div class="video-feed">
        ${a}
      </div>
    </div>
  `,u.scrollTop=0}function mt(){if(!u)return;const e=_["#projects"],o=(e.projects[d.projectIndex]||e.projects[0])?.slides||[];if(!o.length)return;d.slideIndex=Ye(d.slideIndex,0,o.length-1),u.innerHTML=`
  <div class="chCarousel" data-channel="#projects">
    <div class="chStage">
      <div class="chFrame" data-ch-frame>
        ${o.map((r,s)=>`
              <img class="chMedia ${s===d.slideIndex?"is-on":""}"
                   src="${r.src}" alt="" loading="lazy" decoding="async">
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
`;const i={frame:u.querySelector("[data-ch-frame]"),imgs:Array.from(u.querySelectorAll(".chMedia")),more:u.querySelector(".chMore"),moreContent:u.querySelector(".chMoreContent"),capClient:u.querySelector('[data-cap="client"]'),capTitle:u.querySelector('[data-cap="title"]'),capWhat:u.querySelector('[data-cap="what"]')};d.dom=i,me(o,d.slideIndex);const a=u.querySelector('[data-ch="more"]');a&&(a.textContent="Scopri di più")}function me(e,t){const o=e[t],i=d.dom;!o||!i||(i.capClient&&(i.capClient.textContent=o.client||""),i.capTitle&&(i.capTitle.textContent=o.title||""),i.capWhat&&(i.capWhat.textContent=o.what||""),i.frame&&i.frame.style.setProperty("--ch-bg",`url("${o.src}")`),i.moreContent&&(i.moreContent.innerHTML=o.moreHtml||""))}function ae(){return!!d.dom?.frame?.classList.contains("is-more")}function gt(e){const t=d.dom;!t?.frame||!t?.more||(t.frame.classList.add("is-more"),t.more.classList.add("is-open"),t.more.setAttribute("aria-hidden","false"),me(e,d.slideIndex))}function W(){const e=d.dom;!e?.frame||!e?.more||(e.frame.classList.remove("is-more"),e.more.classList.remove("is-open"),e.more.setAttribute("aria-hidden","true"))}function vt(){ze();const e=u?.querySelector(".bioCarousel"),t=u?.querySelector(".wii-card"),o=e?Array.from(e.querySelectorAll(".bioMedia")):[];if(!e||!o.length)return;t&&t.classList.add("bio-no-blur");let i=0;const a=()=>{o.forEach((s,l)=>s.classList.toggle("is-on",l===i));const r=o[i]?.getAttribute("src");r&&e.style.setProperty("--bio-bg",`url("${r}")`)};a(),U=window.setInterval(()=>{i=(i+1)%o.length,a()},3e3),t&&t.classList.add("bio-no-blur")}function ze(){U&&(clearInterval(U),U=null)}function De(e){if(!g||!M||!u)return;d.href=e,g.classList.toggle("is-game",e==="#minigame"),g.classList.toggle("is-carousel",e==="#projects"),g.classList.toggle("is-about",e==="#about"),g.classList.toggle("is-exp",e==="#exp"),g.classList.toggle("is-videos",e==="#videos");const t=_[e]||{title:"Canale",html:'<div class="wii-card"><h3>Coming soon</h3><p>Contenuto in arrivo.</p></div>'};M.textContent=t.title,e==="#projects"&&t.projects?(d.projectIndex=0,d.slideIndex=0,d.dom=null,mt()):e==="#about"?(u.innerHTML=t.html||"",vt()):e==="#videos"&&t.sections?He():u.innerHTML=t.html||"",g.classList.add("is-open"),g.setAttribute("aria-hidden","false"),e==="#minigame"?requestAnimationFrame(()=>{bt()&&J()}):ee(!1),j()}function Z(){g&&(W(),ge(),ee(!1),ze(),d.videoSectionId=null,g.classList.remove("is-open","is-game","is-carousel","is-videos","is-video-detail"),g.setAttribute("aria-hidden","true"),j())}function ft(){if(d.href==="#videos"&&g?.classList.contains("is-video-detail")){He();return}Z()}Ae&&Ae.addEventListener("click",ft);function Ve(e){!S||!K||!e||(document.body?.classList.add("is-img-viewer-open"),K.src=e,S.classList.add("is-open"),S.setAttribute("aria-hidden","false"))}function Be(){!S||!K||(document.body?.classList.remove("is-img-viewer-open"),S.classList.remove("is-open"),S.setAttribute("aria-hidden","true"),K.src="")}S&&S.addEventListener("click",Be);function ht(e,t){if(!(!O||!A||!e)){document.body?.classList.add("is-video-viewer-open"),H=!!(I&&b),H&&xe(),A.src=e,t?A.setAttribute("poster",t):A.removeAttribute("poster"),O.classList.add("is-open"),O.setAttribute("aria-hidden","false");try{A.currentTime=0}catch{}A.play().catch(()=>{})}}function ge(){!O||!A||(document.body?.classList.remove("is-video-viewer-open"),O.classList.remove("is-open"),O.setAttribute("aria-hidden","true"),A.pause(),A.removeAttribute("src"),A.load(),H&&I?(H=!1,k(),B(),G()):H=!1)}O&&O.addEventListener("click",e=>{e.target===O&&ge()});g&&g.addEventListener("click",e=>{e.target===g&&Z()});document.addEventListener("keydown",e=>{if(e.key==="Escape"&&O?.classList.contains("is-open")){ge();return}if(e.key==="Escape"&&S?.classList.contains("is-open")){Be();return}e.key==="Escape"&&g?.classList.contains("is-open")&&Z()});document.addEventListener("click",e=>{if(!R)return;if(performance.now()<z){e.preventDefault(),e.stopPropagation();return}const t=e.target?.closest?.(".wii-tile");if(!t)return;const o=t.getAttribute("data-href")||t.getAttribute("href");o&&o.startsWith("#")&&(e.preventDefault(),De(o))});Q&&Q.addEventListener("click",e=>{R&&(performance.now()<z||(e.preventDefault(),De("#minigame")))});u?.addEventListener("click",e=>{if(d.href==="#videos"){const l=e.target?.closest?.("[data-video-section]");if(l){const h=l.getAttribute("data-video-section");h&&ut(h);return}const p=e.target?.closest?.("[data-image-open]");if(p){const h=p.getAttribute("data-image-src");h&&Ve(h);return}const m=e.target?.closest?.("[data-video-open]");if(m){const h=m.getAttribute("data-video-src");if(h){const N=m.getAttribute("data-video-poster")||"";ht(h,N)}return}}if(d.href==="#projects"&&e.target?.closest?.("[data-ch-frame]")){const m=d.dom?.imgs?.find(h=>h.classList.contains("is-on"))?.getAttribute("src");if(m){e.preventDefault(),e.stopPropagation(),Ve(m);return}}const t=e.target?.closest?.("[data-ch]"),o=t?.getAttribute("data-ch");if(e.target?.closest?.("[data-ch-frame]")&&ae()&&!t){W();const l=u.querySelector('[data-ch="more"]');l&&(l.textContent="Scopri di più");return}if(!o||d.href!=="#projects")return;const a=_["#projects"],s=(a.projects[d.projectIndex]||a.projects[0])?.slides||[];if(s.length){if(o==="more"){ae()?(W(),t.textContent="Scopri di più"):(gt(s),t.textContent="Chiudi");return}if(o==="prev"||o==="next"){if(ae()){W();const l=u.querySelector('[data-ch="more"]');l&&(l.textContent="Scopri di più")}o==="prev"?d.slideIndex=(d.slideIndex-1+s.length)%s.length:d.slideIndex=(d.slideIndex+1)%s.length,d.dom?.imgs?.forEach((l,p)=>l.classList.toggle("is-on",p===d.slideIndex)),me(s,d.slideIndex);return}}});let ke=0,je=0,re=0,ce=0,ue=!1,X="mouse",Y=null;function Et(){y&&(ue||(ue=!0,y.style.opacity="1"))}function Ge(){y&&(ue=!1,y.style.opacity="0")}function _e(){re+=(ke-re)*.18,ce+=(je-ce)*.18;const e=-10,t=-4;y&&(y.style.transform=`translate3d(${re+e}px, ${ce+t}px, 0)`),requestAnimationFrame(_e)}requestAnimationFrame(_e);window.addEventListener("pointermove",e=>{if(X=e.pointerType||"mouse",X!=="mouse"){Ge();return}ke=e.clientX,je=e.clientY,Et()});window.addEventListener("mouseleave",()=>Ge());const $e=".wii-tile, .wii-pill";function qe(e){y&&y.classList.toggle("is-hover",e)}document.addEventListener("pointerover",e=>{if(X!=="mouse")return;const t=e.target?.closest?.($e);t&&t!==Y&&(Y=t,qe(!0),at())});document.addEventListener("pointerout",e=>{const t=e.target?.closest?.($e);if(t&&t===Y){const o=e.relatedTarget;if(o&&t.contains(o))return;Y=null,qe(!1)}});document.addEventListener("pointerdown",()=>{I&&(k(),B(),G()),!(!y||X!=="mouse")&&(y.classList.add("is-down"),j())});document.addEventListener("pointerup",()=>{y&&y.classList.remove("is-down")});let n={running:!1,score:0,timeLeft:30,lastTs:0,spawnAcc:0,bubbles:[],rafId:null,timerId:null,canvas:null,ctx:null,scoreEl:null,timeEl:null,overEl:null,overScoreEl:null,overRestartBtn:null,overCloseBtn:null};function ve(){n.overEl&&(n.overEl.classList.remove("is-show"),n.overEl.setAttribute("aria-hidden","true"))}function wt(){n.overEl&&(n.overScoreEl&&(n.overScoreEl.textContent=String(n.score)),n.overEl.classList.add("is-show"),n.overEl.setAttribute("aria-hidden","false"))}function bt(){n.canvas=document.getElementById("mgCanvas"),n.scoreEl=document.getElementById("mgScore"),n.timeEl=document.getElementById("mgTime"),n.overEl=document.getElementById("mgOver"),n.overScoreEl=document.getElementById("mgOverScore"),n.overRestartBtn=document.getElementById("mgOverRestart"),n.overCloseBtn=document.getElementById("mgOverClose");const e=document.getElementById("mgStart"),t=document.getElementById("mgReset");return n.canvas?(n.ctx=n.canvas.getContext("2d"),ve(),n.overRestartBtn&&(n.overRestartBtn.onclick=()=>{J(),Pe()}),n.overCloseBtn&&(n.overCloseBtn.onclick=()=>Z()),n.canvas.onpointerdown=o=>{if(!n.running)return;const i=n.canvas.getBoundingClientRect(),a=(o.clientX-i.left)/i.width*n.canvas.width,r=(o.clientY-i.top)/i.height*n.canvas.height;for(let s=n.bubbles.length-1;s>=0;s--){const l=n.bubbles[s],p=a-l.x,m=r-l.y;if(p*p+m*m<=l.r*l.r){n.bubbles.splice(s,1),n.score+=1,n.scoreEl&&(n.scoreEl.textContent=String(n.score)),It();return}}},e&&(e.onclick=()=>Pe()),t&&(t.onclick=()=>J()),fe(),!0):!1}function fe(){if(!n.canvas)return;const e=Math.min(window.devicePixelRatio||1,2),t=n.canvas.clientWidth,o=n.canvas.clientHeight;if(!t||!o)return;const i=Math.round(t*e),a=Math.round(o*e);(n.canvas.width!==i||n.canvas.height!==a)&&(n.canvas.width=i,n.canvas.height=a)}function J(){ee(!1),ve(),n.score=0,n.timeLeft=30,n.bubbles=[],n.scoreEl&&(n.scoreEl.textContent="0"),n.timeEl&&(n.timeEl.textContent="30"),Ue()}function Pe(){n.running||(n.timeLeft<=0&&J(),ve(),n.running=!0,n.lastTs=performance.now(),n.spawnAcc=0,n.timerId=window.setInterval(()=>{n.running&&(n.timeLeft-=1,n.timeEl&&(n.timeEl.textContent=String(n.timeLeft)),n.timeLeft<=0&&(n.timeLeft=0,n.timeEl&&(n.timeEl.textContent="0"),ee(!0)))},1e3),n.rafId=requestAnimationFrame(Fe))}function ee(e=!1){n.running=!1,n.timerId&&(clearInterval(n.timerId),n.timerId=null),n.rafId&&(cancelAnimationFrame(n.rafId),n.rafId=null),e&&(wt(),At())}function yt(){if(!n.canvas)return;const e=n.canvas.width,t=n.canvas.height,o=22+Math.random()*26,i=o+Math.random()*(e-o*2),a=o+Math.random()*(t-o*2),r=(-.25+Math.random()*.5)*(window.devicePixelRatio||1),s=(-.15+Math.random()*.35)*(window.devicePixelRatio||1),l=3.2+Math.random()*1.8;n.bubbles.push({x:i,y:a,r:o,vx:r,vy:s,born:performance.now(),life:l})}function Fe(e){if(!n.running)return;const t=Math.min((e-n.lastTs)/1e3,.05);n.lastTs=e,fe();const i=.55/(1+(30-n.timeLeft)*.03);for(n.spawnAcc+=t;n.spawnAcc>=i;)n.spawnAcc-=i,yt();const a=performance.now();for(let r=n.bubbles.length-1;r>=0;r--){const s=n.bubbles[r];s.x+=s.vx*60*t,s.y+=s.vy*60*t,s.x-s.r<0&&(s.x=s.r,s.vx*=-1),s.x+s.r>n.canvas.width&&(s.x=n.canvas.width-s.r,s.vx*=-1),s.y-s.r<0&&(s.y=s.r,s.vy*=-1),s.y+s.r>n.canvas.height&&(s.y=n.canvas.height-s.r,s.vy*=-1),(a-s.born)/1e3>s.life&&n.bubbles.splice(r,1)}Ue(),n.rafId=requestAnimationFrame(Fe)}function Ue(){if(!n.ctx||!n.canvas)return;const e=n.ctx,t=n.canvas.width,o=n.canvas.height;e.clearRect(0,0,t,o),e.fillStyle="rgba(255,255,255,0.22)",e.fillRect(0,0,t,o);for(const i of n.bubbles){const a=e.createRadialGradient(i.x-i.r*.35,i.y-i.r*.35,i.r*.2,i.x,i.y,i.r);a.addColorStop(0,"rgba(255,255,255,0.95)"),a.addColorStop(.35,"rgba(255,255,255,0.35)"),a.addColorStop(1,"rgba(43,184,255,0.18)"),e.beginPath(),e.arc(i.x,i.y,i.r,0,Math.PI*2),e.fillStyle=a,e.fill(),e.lineWidth=2,e.strokeStyle="rgba(43,184,255,0.35)",e.stroke(),e.beginPath(),e.arc(i.x-i.r*.25,i.y-i.r*.25,i.r*.28,0,Math.PI*2),e.fillStyle="rgba(255,255,255,0.28)",e.fill()}}function It(){const e=D();if(!e)return;const t=e.currentTime,o=e.createOscillator(),i=e.createGain();o.type="sine",o.frequency.setValueAtTime(620,t),o.frequency.exponentialRampToValueAtTime(280,t+.06),i.gain.setValueAtTime(1e-4,t),i.gain.exponentialRampToValueAtTime(.08,t+.008),i.gain.exponentialRampToValueAtTime(1e-4,t+.1),o.connect(i),i.connect(e.destination),o.start(t),o.stop(t+.12)}function At(){const e=D();if(!e)return;const t=e.currentTime;[880,740,622].forEach((i,a)=>{const r=e.createOscillator(),s=e.createGain(),l=t+a*.12;r.type="triangle",r.frequency.setValueAtTime(i,l),s.gain.setValueAtTime(1e-4,l),s.gain.exponentialRampToValueAtTime(.06,l+.01),s.gain.exponentialRampToValueAtTime(1e-4,l+.16),r.connect(s),s.connect(e.destination),r.start(l),r.stop(l+.18)})}window.addEventListener("resize",()=>{document.getElementById("mgCanvas")&&fe(),Re(),P()});function le(){R||(R=!0,V&&(V.classList.add("is-fading"),V.setAttribute("aria-hidden","true"),window.setTimeout(()=>{V.classList.add("is-hidden")},et),window.setTimeout(()=>{document.body?.classList.remove("is-intro-locked")},tt)),z=Math.max(z,performance.now()+Ze),I&&(k(),B(),G()),j(),P())}function Ot(){if(!V){R=!0;return}document.body?.classList.add("is-intro-locked"),V.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),le()}),V.addEventListener("pointerdown",e=>{e.pointerType!=="touch"&&(e.preventDefault(),e.stopPropagation(),le())}),window.addEventListener("keydown",e=>{R||(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),le())})}function he(){const e=window.visualViewport?.height||window.innerHeight;document.documentElement.style.setProperty("--vh",`${e}px`)}ot();L&&L.classList.add("is-swoosh-in");Me();setInterval(Me,1e3);Ot();he();window.addEventListener("resize",he);window.visualViewport?.addEventListener("resize",he);F.addEventListener?(F.addEventListener("change",P),de.addEventListener("change",P)):(F.addListener(P),de.addListener(P));
