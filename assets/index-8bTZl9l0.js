(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function o(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=o(s);fetch(s.href,r)}})();const nt="/Portfolio_Valerio/",c=e=>`${nt}${e.replace(/^\/+/,"")}`,K=window.matchMedia("(max-width: 640px)"),ge=window.matchMedia("(prefers-reduced-motion: reduce)"),N=document.getElementById("wiiIntro");let H=!1;const M=document.getElementById("grid");document.getElementById("board");const Ve=document.getElementById("time"),Pe=document.getElementById("date"),Q=document.getElementById("btnLeft"),te=document.getElementById("btnRight"),y=document.getElementById("wiiOverlay"),Re=document.getElementById("overlayBack"),z=document.getElementById("overlayTitle"),b=document.getElementById("overlayBody"),S=document.getElementById("wiiPointer"),R=document.getElementById("imgViewer"),ie=document.getElementById("imgViewerSrc"),C=document.getElementById("videoViewer"),O=document.getElementById("videoViewerSrc");let fe=[];function ve(e,t,o){return Math.max(t,Math.min(o,e))}const st=[[{icon:"👋",t:"Chi sono",s:"Bio + competenze",href:"#about",previews:[c("img/BIO/BIO_1.jpg"),c("img/BIO/BIO_2.jpg"),c("img/BIO/BIO_3.jpg")]},{icon:"🎓",t:"Esperienze",s:"Formazione / studi",href:"#exp"},{icon:"📬",t:"Contatti",s:"Mail e social",href:"#contact"},{icon:"🧩",t:"Progetti",s:"Case study e lavori",href:"#projects",previews:[c("img/PROGETTI/PROG_1.jpg"),c("img/PROGETTI/PROG_2.jpg"),c("img/PROGETTI/PROG_3.jpg")]},{icon:"📱",t:"Social",s:"I miei profili",href:"#social"},{icon:"🎬",t:"Video",s:"Social e progetti",href:"#videos",previewAnim:"wiiPreviewFadeTight",previews:[c("img/CHANNELS/VIDEO/VIDEO PROMO_3-frame.jpg"),c("img/CHANNELS/VIDEO/meschia-cover.jpg"),c("img/CHANNELS/VIDEO/PROGETTI PERSONALI_2-frame.jpg"),c("img/CHANNELS/VIDEO/REQUIEM LOCANDINA.jpg")]},{icon:"🛠️",t:"Skills",s:"Cosa so fare",href:"#tools"},{icon:"🤖",t:"AI",s:"Workflow",href:"#ai",previewVideo:{src:c("img/CHANNELS/ai.mp4"),poster:c("img/CHANNELS/ai-frame.jpg")}},{icon:"📌",t:"Servizi",s:"Cosa offro",href:"#services",previewVideo:{src:c("img/CHANNELS/servizi.mp4"),poster:c("img/CHANNELS/servizi-frame.jpg")}}],[{icon:"📷",t:"Galleria",s:"Foto e frame",href:"#gallery"},{icon:"🗂️",t:"Archivio",s:"Lavori passati",href:"#archive"},{icon:"📝",t:"Blog",s:"Note e making-of",href:"#blog"},{icon:"📍",t:"Dove sono",s:"Roma / contatti",href:"#where"}]];let j=0;const rt=420,ct=320,lt=900;function dt(){return st[0]}function mt(){if(!M)return;const e=dt();M.innerHTML=e.map(t=>{const o=t.previewVideo?.src,a=t.previewVideo?.poster,s=Array.isArray(t.previews)?t.previews:[],n=!o&&!s.length?"wii-tile wii-tile--iconPreview":"wii-tile",l=a?` poster="${a}"`:"",p=a?` style="--preview-poster:url('${a}')"`:"",m=s.length>1?` style="--preview-step:3s; --preview-duration:${s.length*3}s${t.previewAnim?`; --preview-anim:${t.previewAnim}`:""}"`:"",u=o?`
          <div class="wii-preview wii-preview--single wii-preview--video"${p} aria-hidden="true">
            <video class="preview-video" src="${t.previewVideo.src}"${l} muted loop playsinline preload="metadata"></video>
          </div>
        `:s.length?`
          <div class="wii-preview ${s.length===1?"wii-preview--single":""}"${m} aria-hidden="true">
            ${s.map(T=>`<img src="${T}" alt="" loading="lazy" decoding="async">`).join("")}
          </div>
        `:`
          <div class="wii-preview wii-preview--icon" aria-hidden="true">
            <span>${t.icon}</span>
          </div>
        `;return`
        <a class="${n}" href="${t.href}" data-href="${t.href}">
          ${u}
          <div class="wii-tileContent">
            <div class="wii-icon">${t.icon}</div>
            <div class="wii-tileText">
              <div class="wii-title">${t.t}</div>
              <div class="wii-sub">${t.s}</div>
            </div>
          </div>
        </a>
      `}).join(""),pt(),ut(),$e(),k()}function pt(){if(!M)return;Array.from(M.querySelectorAll(".wii-preview:not(.wii-preview--single)")).forEach((t,o)=>{const a=window.getComputedStyle(t),s=parseFloat(a.getPropertyValue("--preview-duration"))||12,r=parseFloat(a.getPropertyValue("--preview-step"))||4,n=(o+1)*r*1.618%s;t.style.setProperty("--preview-phase",`-${n.toFixed(2)}s`)})}function $e(){if(!M)return;Array.from(M.querySelectorAll(".wii-preview--video")).forEach(t=>{const o=t.closest(".wii-tile");if(!o)return;const a=o.getBoundingClientRect();if(!a.height)return;const s=a.width/a.height,r=Math.max(1,Math.min(s,16/9));t.style.setProperty("--video-zoom",r.toFixed(3))})}function ut(){if(!M)return;const e=Array.from(M.querySelectorAll(".wii-preview--video"));fe=[],e.forEach(t=>{const o=t.closest(".wii-tile");if(!o)return;const a=t.querySelector(".preview-video");if(!a)return;fe.push({preview:t,video:a}),a.muted=!0,a.loop=!0,a.setAttribute("playsinline","");const s=()=>{if(t.classList.add("is-ready"),a.paused)try{a.currentTime=0}catch{}};a.addEventListener("loadeddata",s,{once:!0});const r=()=>{t.classList.add("is-hover"),a.currentTime=0,a.play().catch(()=>{})},n=()=>{a.pause(),a.currentTime=0,t.classList.remove("is-hover")};o.addEventListener("mouseenter",r),o.addEventListener("mouseleave",n),o.addEventListener("pointerenter",r),o.addEventListener("pointerleave",n),o.addEventListener("focusin",r),o.addEventListener("focusout",n)})}function k(){const e=K.matches&&!ge.matches;fe.forEach(({preview:t,video:o})=>{if(e)t.classList.add("is-auto"),o.play().catch(()=>{});else{t.classList.remove("is-auto"),o.pause();try{o.currentTime=0}catch{}}})}function _e(){if(!Ve||!Pe)return;const e=new Date,t=String(e.getHours()).padStart(2,"0"),o=String(e.getMinutes()).padStart(2,"0");Ve.textContent=`${t}:${o}`;const a=["Dom","Lun","Mar","Mer","Gio","Ven","Sab"],s=["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"],r=e.getDate(),n=a[e.getDay()],l=s[e.getMonth()];Pe.textContent=`${n} ${r} ${l}`}let P=null,L=!0,ze=!1,Ne=0;function x(){return L?(P||(P=new(window.AudioContext||window.webkitAudioContext)),P.state==="suspended"&&P.resume().catch(()=>{}),P):null}function _(){const e=x();if(e){e.state==="suspended"&&e.resume().catch(()=>{});try{const t=e.createBuffer(1,1,e.sampleRate),o=e.createBufferSource();o.buffer=t,o.connect(e.destination),o.start(0)}catch{}}}function q(){ze||(ze=!0,_())}function qe({type:e="sine",freq:t=700,duration:o=.05,gain:a=.04,attack:s=.002,release:r=.035}={}){const n=x();if(!n)return;const l=n.currentTime,p=n.createOscillator(),m=n.createGain();p.type=e,p.frequency.setValueAtTime(t,l),m.gain.setValueAtTime(0,l),m.gain.linearRampToValueAtTime(a,l+s),m.gain.exponentialRampToValueAtTime(1e-4,l+s+r),p.connect(m),m.connect(n.destination),p.start(l),p.stop(l+o+r+.02)}function gt(){const e=performance.now();e-Ne<120||(Ne=e,qe({type:"sine",freq:880,duration:.03,gain:.026,attack:.002,release:.03}))}function B(){qe({type:"triangle",freq:520,duration:.03,gain:.05,attack:.001,release:.02})}let A=null,G=!1;function F(){const e=x();if(!e||A)return;const t=e.createGain();t.gain.value=0,t.connect(e.destination);const o=e.createGain();o.gain.value=.82;const a=e.createBiquadFilter();a.type="lowpass",a.frequency.value=3100,a.Q.value=.55;const s=e.createDelay(.8);s.delayTime.value=.36;const r=e.createGain();r.gain.value=.18;const n=e.createGain();n.gain.value=.34,o.connect(a),a.connect(t),a.connect(s),s.connect(r),r.connect(s),s.connect(n),n.connect(t);const l=e.currentTime,p=e.createOscillator();p.type="sine",p.frequency.value=261.63;const m=e.createGain();m.gain.value=1e-4;const u=e.createOscillator();u.type="sine",u.frequency.value=.045;const T=e.createGain();T.gain.value=.012,p.connect(m),u.connect(T),T.connect(m.gain),m.connect(o),p.start(l),u.start(l),m.gain.setTargetAtTime(.01,l+.2,1.8);function D(E,d,I=.035,g=.34){const f=e.createOscillator(),h=e.createGain(),w=e.createBiquadFilter();f.type="sine",f.frequency.setValueAtTime(E,d),f.frequency.exponentialRampToValueAtTime(E*1.004,d+g),w.type="highpass",w.frequency.setValueAtTime(420,d),h.gain.setValueAtTime(1e-4,d),h.gain.exponentialRampToValueAtTime(I,d+.018),h.gain.exponentialRampToValueAtTime(1e-4,d+g),f.connect(w),w.connect(h),h.connect(o),f.start(d),f.stop(d+g+.04)}function Le(E,d,I=.018){E.forEach((g,f)=>{const h=e.createOscillator(),w=e.createGain(),V=e.createBiquadFilter();h.type=f===1?"triangle":"sine",h.frequency.setValueAtTime(g,d),h.detune.setValueAtTime((f-1)*4,d),V.type="lowpass",V.frequency.setValueAtTime(1350,d),w.gain.setValueAtTime(1e-4,d),w.gain.exponentialRampToValueAtTime(I,d+.12+f*.03),w.gain.exponentialRampToValueAtTime(1e-4,d+1.7),h.connect(V),V.connect(w),w.connect(o),h.start(d),h.stop(d+1.9)})}function Oe(E,d,I=.016){const g=e.createOscillator(),f=e.createGain(),h=e.createBiquadFilter();g.type="triangle",g.frequency.setValueAtTime(E*.72,d),g.frequency.exponentialRampToValueAtTime(E,d+.16),h.type="bandpass",h.frequency.setValueAtTime(E*2.2,d),h.Q.setValueAtTime(1.2,d),f.gain.setValueAtTime(1e-4,d),f.gain.exponentialRampToValueAtTime(I,d+.025),f.gain.exponentialRampToValueAtTime(1e-4,d+.3),g.connect(h),h.connect(f),f.connect(o),g.start(d),g.stop(d+.34)}function Ce(E,d,I=.012){const g=e.createOscillator(),f=e.createGain(),h=e.createBiquadFilter();g.type="sine",g.frequency.setValueAtTime(E,d),g.frequency.exponentialRampToValueAtTime(E*.995,d+.42),h.type="lowpass",h.frequency.setValueAtTime(360,d),f.gain.setValueAtTime(1e-4,d),f.gain.exponentialRampToValueAtTime(I,d+.04),f.gain.exponentialRampToValueAtTime(1e-4,d+.48),g.connect(h),h.connect(f),f.connect(o),g.start(d),g.stop(d+.52)}function it(E,d=.006){const I=Math.max(1,Math.floor(e.sampleRate*.08)),g=e.createBuffer(1,I,e.sampleRate),f=g.getChannelData(0);for(let X=0;X<I;X+=1){const me=1-X/I;f[X]=(Math.random()*2-1)*me*me*me}const h=e.createBufferSource(),w=e.createGain(),V=e.createBiquadFilter();V.type="highpass",V.frequency.value=5200,w.gain.setValueAtTime(d,E),w.gain.exponentialRampToValueAtTime(1e-4,E+.09),h.buffer=g,h.connect(V),V.connect(w),w.connect(o),h.start(E)}const W=[{chord:[261.63,329.63,392],bass:130.81,motif:[392,523.25,493.88,329.63]},{chord:[293.66,369.99,440],bass:146.83,motif:[440,587.33,554.37,369.99]},{chord:[220,329.63,392],bass:110,motif:[329.63,440,392,261.63]},{chord:[246.94,293.66,392],bass:123.47,motif:[392,493.88,587.33,493.88]}],ot=[{beat:0,kind:"chord"},{beat:1,kind:"lead",note:0},{beat:2.5,kind:"bubble",note:1},{beat:4,kind:"lead",note:2},{beat:5.5,kind:"hush"},{beat:7,kind:"lead",note:3},{beat:8,kind:"chord"},{beat:9.5,kind:"bubble",note:2},{beat:11,kind:"lead",note:1},{beat:13.5,kind:"hush"}],le=380,at=16;let de=0;function Me(){if(!L||!P||!A)return;const E=P.currentTime+.03,d=W[de%W.length],I=W[(de+1)%W.length];if(p.frequency.setTargetAtTime(d.chord[0],E,.8),Ce(d.bass,E+.02,.01),ot.forEach(g=>{const f=E+g.beat*(le/1e3);if(g.kind==="chord"){Le(g.beat>=8?I.chord:d.chord,f,.014),Ce(g.beat>=8?I.bass:d.bass,f+.04,.009);return}if(g.kind==="lead"){const h=d.motif[g.note%d.motif.length];D(h,f,g.beat===1?.038:.03,.42),Math.random()<.35&&D(h*1.5,f+.18,.014,.28);return}if(g.kind==="bubble"){Oe(d.motif[g.note%d.motif.length],f,.014);return}it(f,.005)}),Math.random()<.55){const g=d.motif[Math.floor(Math.random()*d.motif.length)];Oe(g*2,E+(14.5+Math.random())*(le/1e3),.01)}de+=1,A.timerId=window.setTimeout(Me,at*le)}A={musicGain:t,toneBus:o,toneFilter:a,delay:s,fb:r,delayMix:n,air:p,airGain:m,airLfo:u,timerId:null},Me(),t.gain.setTargetAtTime(.36,e.currentTime,.9)}function Fe(){if(!P||!A)return;const e=P.currentTime;A.timerId&&clearTimeout(A.timerId),A.musicGain.gain.setTargetAtTime(1e-4,e,.25),setTimeout(()=>{try{A.air?.stop()}catch{}try{A.airLfo?.stop()}catch{}A=null},400)}Q&&(Q.textContent="🔊",Q.addEventListener("click",()=>{H&&(performance.now()<j||(L=!L,Q.textContent=L?"🔊":"🔇",L?(q(),_(),F(),B()):Fe()))}));te&&(te.textContent="🎮");["pointerdown","touchstart","mousedown"].forEach(e=>{window.addEventListener(e,()=>{L&&(q(),F())},{once:!0,passive:!0})});const v={href:null,projectIndex:0,slideIndex:0,dom:null,videoSectionId:null};let Y=null;const ke="https://www.linkedin.com/in/valerio-serani-682a48215/",ft="https://www.instagram.com/velvet_172/",vt="https://www.tiktok.com/@heyits172",ht="https://vimeo.com/user95787021",bt="https://www.behance.net/velvet172",He="valerioserani@gmail.com",xe="+39 3469697747",U={"#projects":{title:"Progetti",projects:[{id:"bestof",slides:[{src:c("img/PROGETTI/PROG_1.jpg"),client:"Sunsilk",title:"Materiali promozionali",what:"Creativity + layout",moreHtml:`
              <h3 class="chMoreTitle">Sunsilk — Testata Home</h3>
              <p class="chMoreText">Ho lavorato al riadattamento degli asset forniti per Smartwin su mobile, mantenendo coerenza visiva e leggibilità tra formati. In diverse occasioni ho curato anche siti dedicati alle promozioni, con focus su gerarchia, adattamento della testata e chiarezza in home.</p>
            `},{src:c("img/PROGETTI/PROG_2.jpg"),client:"M&M’s / UCI",title:"Screentime Cinema",what:"Layout + output video",moreHtml:`
              <h3 class="chMoreTitle">M&M’s / UCI — Screentime</h3>
              <p class="chMoreText">Studio ADV dedicato al formato cinema: impaginazione del messaggio, bilanciamento brand/prodotto e sviluppo dell'output definitivo, un video promozionale trasmesso negli UCI Cinema italiani.</p>
            `},{src:c("img/PROGETTI/PROG_3.jpg"),client:"PAM",title:"Sito + materiale promozionale",what:"Creativity / design",moreHtml:`
              <h3 class="chMoreTitle">PAM — San Valentino</h3>
              <p class="chMoreText">Concept visual con approccio design-first: direzione creativa, composizione e sviluppo dell'output definitivo, un sito promozionale speciale dedicato a San Valentino.</p>
            `},{src:c("img/PROGETTI/PROG_4.jpg"),client:"Snickers / Twix",title:"Cover Adattamento",what:"Visual + layout",moreHtml:`
              <h3 class="chMoreTitle">Snickers / Twix</h3>
              <p class="chMoreText">Visual ideato per la back cover di un magazine di settore: adattamento multi-brand con attenzione a consistenza grafica, impatto del key visual e coerenza tra linee prodotto.</p>
            `},{src:c("img/PROGETTI/PROG_5.jpg"),client:"Compeed",title:"Materiale promozionale",what:"Print / layout",moreHtml:`
              <h3 class="chMoreTitle">Compeed — Volantino</h3>
              <p class="chMoreText">Materiale print orientato alla conversione: struttura informativa chiara, call to action evidente e visual di supporto al messaggio.</p>
            `},{src:c("img/PROGETTI/PROG_6.jpg"),client:"Boem",title:"Materiale promozionale",what:"Brand / creative",moreHtml:`
              <h3 class="chMoreTitle">Boem</h3>
              <p class="chMoreText">Con Boem ci sono state diverse occasioni di lavoro: materiale print, diversi siti e materiale promozionale, mantenendo coerenza visiva tra formati e punti di contatto.</p>
            `},{src:c("img/PROGETTI/PROG_7.jpg"),client:"L'Or x Ferrari Hypercar",title:"UX/UI + materiale promozionale",what:"Materiale print + landing",moreHtml:`
              <h3 class="chMoreTitle">L'Or x Ferrari Hypercar</h3>
              <p class="chMoreText">Ho lavorato al visual della campagna promozionale italiana, confrontandomi direttamente con Ferrari e L'Or per mantenere coerenza tra identità, tono e materiali di comunicazione. L'output finale è stato un sito dedicato alla partecipazione alla promozione.</p>
            `},{src:c("img/PROGETTI/PROG_14.jpg"),client:"Raffo",title:"UX/UI + materiale promozionale",what:"Landing + materiale print e web",moreHtml:`
              <h3 class="chMoreTitle">Raffo — Decisamente Pugliese</h3>
              <p class="chMoreText">Visual e materiali promozionali per iniziativa Raffo: sviluppo di asset per landing, comunicazione web e supporti print, mantenendo coerenza con il tono grafico della campagna.</p>
            `},{src:c("img/PROGETTI/PROG_8.jpg"),client:"Degustazioni a corte",title:"Produzione materiali evento",what:"Print / design",moreHtml:`
              <h3 class="chMoreTitle">Degustazioni a corte</h3>
              <p class="chMoreText">Ho curato tutti i materiali necessari all'evento "Degustazioni a corte": cartoline, photo frame, striscioni e altri supporti di comunicazione, rinnovando anche il logo per l'edizione 2025.</p>
            `},{src:c("img/PROGETTI/PROG_9.jpg"),client:"Control",title:"Materiale promozionale",what:"Brand / layout",moreHtml:`
              <h3 class="chMoreTitle">Control</h3>
              <p class="chMoreText">Con Control ci sono state diverse occasioni di lavoro: materiali promozionali, siti, visual di campagna e adattamenti di volantini, sviluppati mantenendo coerenza con le direttive del brand e chiarezza sui diversi formati.</p>
            `},{src:c("img/PROGETTI/PROG_10.jpg"),client:"Amuchina",title:"Materiale promozionale",what:"Campaign / visual",moreHtml:`
              <h3 class="chMoreTitle">Amuchina - materiale promozionale</h3>
              <p class="chMoreText">Layout e sviluppo di materiali promozionali per Winsmart, adattando i visual di campagna per accompagnare il sito a cui è legata la promozione.</p>
            `},{src:c("img/PROGETTI/PROG_11.jpg"),client:"Mentadent",title:"Materiali promozionali",what:"Visual / layout",moreHtml:`
              <h3 class="chMoreTitle">Mentadent — materiali promozionali</h3>
              <p class="chMoreText">Ho adattato il visual di campagna in materiali Winsmart per una promozione legata al "mese della prevenzione", mantenendo coerenza grafica, leggibilità e chiarezza del messaggio.</p>
            `},{src:c("img/PROGETTI/PROG_12.jpg"),client:"Snickers",title:"Materiale promozionale",what:"Layout + video promozionale",moreHtml:`
              <h3 class="chMoreTitle">Snickers - materiale promozionale</h3>
              <p class="chMoreText">Ho lavorato alla creazione di materiali Winsmart e video promozionali per la campagna, curando adattamenti visual, layout e output pensati per mantenere il messaggio chiaro e riconoscibile sui diversi formati.</p>
            `},{src:c("img/PROGETTI/PROG_13.jpg"),client:"UILtemp",title:"App Site Play",what:"UI / layout",moreHtml:`
              <h3 class="chMoreTitle">UILtemp — App Site</h3>
              <p class="chMoreText">Case UI/layout per sito-app: struttura delle sezioni, chiarezza d'uso e coerenza visiva tra componenti. Ho lavorato anche a diversi materiali print, mantenendo continuità tra comunicazione digitale e supporti fisici.</p>
            `}]}]},"#videos":{title:"Video",sections:[{id:"winsmart",title:"Video promozionali / Winsmart",kicker:"PROMO",summary:"Selezione di video promozionali, materiali Winsmart e contenuti social: curati interamente montaggio, editing, VFX e musica.",hubThumb:c("img/CHANNELS/VIDEO/VIDEO PROMO_3-frame.jpg"),hero:{src:c("img/CHANNELS/VIDEO/VIDEO PROMO_3-frame.jpg"),alt:"Hero Winsmart"},videos:[{title:"Promo 01",desc:"Cut breve per social con focus su prodotto e CTA.",src:c("img/CHANNELS/VIDEO/VIDEO PROMO_1.mp4"),poster:c("img/CHANNELS/VIDEO/VIDEO PROMO_1-frame.jpg")},{title:"Promo 02",desc:"Versione dinamica con ritmo più rapido e titoli.",src:c("img/CHANNELS/VIDEO/VIDEO PROMO_2.mp4"),poster:c("img/CHANNELS/VIDEO/VIDEO PROMO_2-frame.jpg")},{title:"Promo 03",desc:"Cut verticale pensato per social con ritmo veloce.",src:c("img/CHANNELS/VIDEO/VIDEO PROMO_3.mp4"),poster:c("img/CHANNELS/VIDEO/VIDEO PROMO_3-frame.jpg")},{title:"Promo 04",desc:"Variante con focus su titoli e prodotto.",src:c("img/CHANNELS/VIDEO/VIDEO PROMO_4.mp4"),poster:c("img/CHANNELS/VIDEO/VIDEO PROMO_4-frame.jpg")},{title:"Promo 05",desc:"Versione verticale con focus su ritmo e callout.",src:c("img/CHANNELS/VIDEO/VIDEO PROMO_5.mp4"),poster:c("img/CHANNELS/VIDEO/VIDEO PROMO_5-frame.jpg")}]},{id:"meschia",title:"Social per Meschia",kicker:"Meschia",summary:"Produzione di lavori social: format brevi, coerenza visiva e adattamenti multi-piattaforma.",hero:{src:c("img/CHANNELS/VIDEO/meschia-cover.jpg"),alt:"Hero Meschia"},videos:[{title:"Social 01",desc:"Formato verticale con ritmo pensato per social.",src:c("img/CHANNELS/VIDEO/MESCHIA_SOCIAL_01.mp4"),poster:c("img/CHANNELS/VIDEO/MESCHIA_SOCIAL_01-frame.jpg")},{title:"Social 02",desc:"Cut rapido per mantenere alta l'attenzione.",src:c("img/CHANNELS/VIDEO/CADERE_2.mp4"),poster:c("img/CHANNELS/VIDEO/CADERE_2-frame.jpg")},{title:"Social 03",desc:"Versione teaser con focus su mood e dettagli.",src:c("img/CHANNELS/VIDEO/CADERE_3.mp4"),poster:c("img/CHANNELS/VIDEO/CADERE_3-frame.jpg")},{title:"Social 04",desc:"Variante con taglio finale più deciso.",src:c("img/CHANNELS/VIDEO/CADERE_4.mp4"),poster:c("img/CHANNELS/VIDEO/CADERE_4-frame.jpg")}]},{id:"meschia-videoclip",title:"Videoclip",kicker:"Meschia",hubLabel:"Coming soon",hubDesc:"Ho lavorato al videoclip di una canzone di Meschia, in uscita il 12 giugno.",summary:"Ho lavorato al videoclip di una canzone di Meschia, in uscita il 12 giugno.",videos:[{title:"Coming soon",desc:"Videoclip di una canzone di Meschia in uscita il 12 giugno."}]},{id:"personali",title:"Progetti personali",kicker:"Personal",summary:"Esperimenti e lavori accademici: tutto il processo di ideazione, illustrazione e montaggio è stato curato interamente da me.",hubThumb:c("img/CHANNELS/VIDEO/PROGETTI PERSONALI_2-frame.jpg"),hero:{src:c("img/CHANNELS/VIDEO/PROGETTI PERSONALI_1-frame.jpg"),alt:"Hero Progetti personali"},videos:[{title:"Personal 01",desc:"Studio visivo e composizione per concept personale.",src:c("img/CHANNELS/VIDEO/PROGETTI PERSONALI_1.mp4"),poster:c("img/CHANNELS/VIDEO/PROGETTI PERSONALI_1-frame.jpg")},{title:"Personal 02",desc:"Short video sperimentale con focus su ritmo e mood.",src:c("img/CHANNELS/VIDEO/PROGETTI PERSONALI_2.mp4"),poster:c("img/CHANNELS/VIDEO/PROGETTI PERSONALI_2-frame.jpg")}]},{id:"requiem",title:'48h Film Project - "Requiem"',kicker:"48h Film Project",summary:'Esperienza sul set come grafico, backstage e supporto alla fotografia durante le riprese del corto "Requiem", diretto da Lorenzo Russo.',hubThumb:c("img/CHANNELS/VIDEO/REQUIEM LOCANDINA.jpg"),hero:{src:c("img/CHANNELS/VIDEO/REQUIEM LOCANDINA.jpg"),alt:"Hero Requiem"},videos:[{title:"Backstage",desc:"Estratto dal set, girato e montato.",src:c("img/CHANNELS/VIDEO/REQUIEM BACKSTAGE.mp4"),poster:c("img/CHANNELS/VIDEO/REQUIEM BACKSTAGE-frame.jpg")},{title:"Locandina",desc:"Locandina ufficiale del corto.",poster:c("img/CHANNELS/VIDEO/REQUIEM LOCANDINA.jpg"),static:!0}]}]},"#about":{title:"Chi sono",html:`
      <div class="wii-card bio-card">
        <div class="bioCarousel" aria-label="Chi sono - carosello">
          <img class="bioMedia" src="${c("img/BIO/BIO_1.jpg")}" alt="" loading="lazy" decoding="async">
          <img class="bioMedia" src="${c("img/BIO/BIO_2.jpg")}" alt="" loading="lazy" decoding="async">
          <img class="bioMedia" src="${c("img/BIO/BIO_3.jpg")}" alt="" loading="lazy" decoding="async">
          <img class="bioMedia" src="${c("img/BIO/BIO_4.jpg")}" alt="" loading="lazy" decoding="async">
          <img class="bioMedia" src="${c("img/BIO/BIO_5.jpg")}" alt="" loading="lazy" decoding="async">
        </div>
        <div class="bioDesc">
          <h3>Chi sono</h3>
          <p>Ciao, sono <strong>Valerio</strong>: <strong>graphic designer</strong> di <strong>Roma</strong> e autentico nerd. Ho approcciato il design attraverso <strong>videogiochi</strong>, <strong>copertine</strong> e <strong>cultura pop</strong>, trasformando questa passione in un percorso professionale.</p>
          <p>Il mio approccio unisce <strong>sperimentazione</strong>, <strong>rischio</strong> e <strong>senso estetico</strong> per creare output non solo appaganti, ma soprattutto <strong>funzionali</strong>.</p>
          <p>Negli ultimi mesi ho continuato a <strong>sperimentare</strong> con i <strong>video social</strong>: ho curato <strong>fotografia</strong>, <strong>regia</strong> e <strong>montaggio</strong>, uscendo dalla mia <strong>zona di comfort</strong>. Sperimentare e imparare sul campo è la parte che mi entusiasma di più.</p>
          <p class="wii-meta">Lingue: <strong>Italiano madrelingua</strong>, <strong>English B2</strong></p>
        </div>
      </div>
    `},"#contact":{title:"Contatti",html:`
      <div class="wii-card">
        <h3>Contatti diretti</h3>
        <p><strong>Email</strong>: <a href="mailto:${He}">${He}</a></p>
        <p><strong>Telefono</strong>: <a href="tel:${xe.replace(/\s+/g,"")}">${xe}</a></p>
        <p class="wii-meta">Base: <strong>Roma</strong></p>
        <div class="wii-links">
          <a class="wii-link" href="${c("Valerio-Serani-CV.pdf")}" download>
            Scarica CV
          </a>
        </div>
      </div>
      <div class="wii-card">
        <h3>Profilo LinkedIn</h3>
        <p><strong>Profilo LinkedIn</strong> con esperienza, formazione e contatti.</p>
        <div class="wii-links">
          <a class="wii-link" href="${ke}" target="_blank" rel="noopener noreferrer">
            Apri profilo LinkedIn
          </a>
        </div>
      </div>
    `},"#social":{title:"Social",html:`
      <div class="wii-card">
        <h3>Canali social</h3>
        <p>Qui trovi tutti i miei social: raccontano la mia parte più professionale e quella più ludica. Passione e lavoro sono sempre andati di pari passo nella mia vita, e qui li vedi convivere.</p>
        <div class="social-list">
          <a class="social-item" href="${ke}" target="_blank" rel="noopener noreferrer">
            <span class="social-ico">💼</span>
            <span class="social-text"><strong>LinkedIn</strong> /valerio-serani-682a48215</span>
          </a>
          <a class="social-item" href="${ft}" target="_blank" rel="noopener noreferrer">
            <span class="social-ico">📸</span>
            <span class="social-text"><strong>Instagram</strong> @velvet_172</span>
          </a>
          <a class="social-item" href="${vt}" target="_blank" rel="noopener noreferrer">
            <span class="social-ico">🎵</span>
            <span class="social-text"><strong>TikTok</strong> @heyits172</span>
          </a>
          <a class="social-item" href="${ht}" target="_blank" rel="noopener noreferrer">
            <span class="social-ico">🎬</span>
            <span class="social-text"><strong>Vimeo</strong> /user95787021</span>
          </a>
          <a class="social-item" href="${bt}" target="_blank" rel="noopener noreferrer">
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
    `},"#services":{title:"Servizi",html:`
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
        <p>Sono un <strong>"AI nerd"</strong>: uso l'<strong>AI</strong> per <strong>brainstorming</strong>, <strong>scrittura creativa</strong>, <strong>ricerca</strong> e direzione creativa, così da velocizzare l'esecuzione. Mi aiuta a gettare le basi del processo creativo e ad <strong>accelerare i tempi</strong>, mantenendo sempre il controllo umano su <strong>creatività</strong> e <strong>qualità</strong>. Questo sito è il mio <strong>showcase</strong>: è un <strong>esperimento</strong> in cui ho messo in pratica le mie competenze per costruire un progetto completo.</p>
        <p>Lavoro in <strong>sinergia</strong> tra <strong>Codex</strong> e <strong>Visual Studio Code</strong>: analisi dei file, riscrittura delle sezioni, struttura della griglia, generazione asset e iterazioni rapide. La pubblicazione passa da <strong>GitHub</strong> e il setup tecnico include <strong>Homebrew</strong> e <strong>Vite</strong> per dipendenze e build.</p>
        <p class="wii-meta">Obiettivo: <strong>accelerare tempi</strong> e <strong>qualità</strong>, mantenendo il controllo creativo umano su tono, priorità e coerenza finale.</p>
      </div>
    `},"#auto":{title:"Automotive",html:`
      <div class="wii-card">
        <h3>Automotive Visuals</h3>
        <p>Canale dedicato a contenuti automotive: visual campaign, branding e creatività per officine o brand di settore.</p>
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
          <li>Ricerca di equilibrio tra sperimentazione e funzionalità.</li>
          <li>Esperienza attiva come Graphic Designer Jr.</li>
          <li>Background accademico in Graphic Design.</li>
          <li>Competenze trasversali tra ADV, digital layout, social e video direction.</li>
          <li>Soft skills: teamwork, empatia, problem solving, creatività.</li>
        </ul>
      </div>
    `},"#minigame":{title:"Giochi",html:`
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
          <canvas id="mgCanvas" width="900" height="520"></canvas>

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
    `}};function Et(e){const o=U["#videos"]?.sections||[];return o.length?o.find(a=>a.id===e)||o[0]:null}function Ue(){if(!b||!z||!y)return;const e=U["#videos"],t=e?.sections||[];if(!t.length)return;v.videoSectionId=null,y.classList.remove("is-video-detail"),z.textContent=e.title;const o=t.map(a=>{const s=a.hubThumb||a.hero?.src,r=s?` style="--thumb:url('${s}')"`:"";return`
        <button class="wii-card video-hub-card" type="button" data-video-section="${a.id}">
          <div class="video-hub-thumb"${r} aria-hidden="true">
            ${a.hubLabel?`<span class="video-hub-label">${a.hubLabel}</span>`:""}
          </div>
          <div class="video-hub-copy">
            <h3>${a.title}</h3>
            ${a.hubDesc?`<p>${a.hubDesc}</p>`:""}
          </div>
        </button>
      `}).join("");b.innerHTML=`<div class="video-hub">${o}</div>`,b.scrollTop=0}function yt(e){if(!b||!z||!y)return;const t=Et(e);if(!t)return;v.videoSectionId=t.id,z.textContent=t.title,y.classList.add("is-video-detail");const o=t.hero?.src?` style="--hero:url('${t.hero.src}')"`:"",a=t.hero?.alt?` role="img" aria-label="${t.hero.alt}"`:"",s=(t.videos||[]).map(r=>{const n=!!r.src,l=!!r.static,p=r.poster||t.hero?.src||"",m=p?` style="--thumb:url('${p}')"`:"";return`
        <button class="video-feed-item" type="button"${n?` data-video-open data-video-src="${r.src}"${p?` data-video-poster="${p}"`:""}`:l&&p?` data-image-open data-image-src="${p}"`:""}${n||l?"":" disabled"}>
          <div class="video-feed-thumb"${m}>
            ${n?'<span class="video-feed-play">▶</span>':""}
            ${n||l?"":'<span class="video-feed-badge">In arrivo</span>'}
          </div>
          <div class="video-feed-meta">
            <h4>${r.title}</h4>
            ${r.desc?`<p>${r.desc}</p>`:""}
          </div>
        </button>
      `}).join("");b.innerHTML=`
    <div class="video-detail">
      <div class="video-hero"${o}${a}>
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
  `,b.scrollTop=0}function wt(){if(!b)return;const e=U["#projects"],o=(e.projects[v.projectIndex]||e.projects[0])?.slides||[];if(!o.length)return;v.slideIndex=ve(v.slideIndex,0,o.length-1),b.innerHTML=`
  <div class="chCarousel" data-channel="#projects">
    <div class="chStage">
      <div class="chFrame" data-ch-frame>
        ${o.map((r,n)=>`
              <img class="chMedia ${n===v.slideIndex?"is-on":""}"
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
`;const a={frame:b.querySelector("[data-ch-frame]"),imgs:Array.from(b.querySelectorAll(".chMedia")),more:b.querySelector(".chMore"),moreContent:b.querySelector(".chMoreContent"),capClient:b.querySelector('[data-cap="client"]'),capTitle:b.querySelector('[data-cap="title"]'),capWhat:b.querySelector('[data-cap="what"]')};v.dom=a,we(o,v.slideIndex);const s=b.querySelector('[data-ch="more"]');s&&(s.textContent="Scopri di più")}function we(e,t){const o=e[t],a=v.dom;!o||!a||(a.capClient&&(a.capClient.textContent=o.client||""),a.capTitle&&(a.capTitle.textContent=o.title||""),a.capWhat&&(a.capWhat.textContent=o.what||""),a.frame&&a.frame.style.setProperty("--ch-bg",`url("${o.src}")`),a.moreContent&&(a.moreContent.innerHTML=o.moreHtml||""))}function pe(){return!!v.dom?.frame?.classList.contains("is-more")}function It(e){const t=v.dom;!t?.frame||!t?.more||(t.frame.classList.add("is-more"),t.more.classList.add("is-open"),t.more.setAttribute("aria-hidden","false"),we(e,v.slideIndex))}function J(){const e=v.dom;!e?.frame||!e?.more||(e.frame.classList.remove("is-more"),e.more.classList.remove("is-open"),e.more.setAttribute("aria-hidden","true"))}function Tt(){We();const e=b?.querySelector(".bioCarousel"),t=b?.querySelector(".wii-card"),o=e?Array.from(e.querySelectorAll(".bioMedia")):[];if(!e||!o.length)return;t&&t.classList.add("bio-no-blur");let a=0;const s=()=>{o.forEach((n,l)=>n.classList.toggle("is-on",l===a));const r=o[a]?.getAttribute("src");r&&e.style.setProperty("--bio-bg",`url("${r}")`)};s(),Y=window.setInterval(()=>{a=(a+1)%o.length,s()},3e3),t&&t.classList.add("bio-no-blur")}function We(){Y&&(clearInterval(Y),Y=null)}function Xe(e){if(!y||!z||!b)return;v.href=e,y.classList.toggle("is-game",e==="#minigame"),y.classList.toggle("is-carousel",e==="#projects"),y.classList.toggle("is-about",e==="#about"),y.classList.toggle("is-exp",e==="#exp"),y.classList.toggle("is-videos",e==="#videos");const t=U[e]||{title:"Canale",html:'<div class="wii-card"><h3>Coming soon</h3><p>Contenuto in arrivo.</p></div>'};z.textContent=t.title,e==="#projects"&&t.projects?(v.projectIndex=0,v.slideIndex=0,v.dom=null,wt()):e==="#about"?(b.innerHTML=t.html||"",Tt()):e==="#videos"&&t.sections?Ue():b.innerHTML=t.html||"",y.classList.add("is-open"),y.setAttribute("aria-hidden","false"),e==="#minigame"?requestAnimationFrame(()=>{Ct()&&$()}):re(!1),B()}function se(){y&&(J(),Ie(),re(!1),We(),v.videoSectionId=null,y.classList.remove("is-open","is-game","is-carousel","is-videos","is-video-detail"),y.setAttribute("aria-hidden","true"),B())}function At(){if(v.href==="#videos"&&y?.classList.contains("is-video-detail")){Ue();return}se()}Re&&Re.addEventListener("click",At);function Be(e){!R||!ie||!e||(document.body?.classList.add("is-img-viewer-open"),ie.src=e,R.classList.add("is-open"),R.setAttribute("aria-hidden","false"))}function Qe(){!R||!ie||(document.body?.classList.remove("is-img-viewer-open"),R.classList.remove("is-open"),R.setAttribute("aria-hidden","true"),ie.src="")}R&&R.addEventListener("click",Qe);function St(e,t){if(!(!C||!O||!e)){document.body?.classList.add("is-video-viewer-open"),G=!!(L&&A),G&&Fe(),O.src=e,t?O.setAttribute("poster",t):O.removeAttribute("poster"),C.classList.add("is-open"),C.setAttribute("aria-hidden","false");try{O.currentTime=0}catch{}O.play().catch(()=>{})}}function Ie(){!C||!O||(document.body?.classList.remove("is-video-viewer-open"),C.classList.remove("is-open"),C.setAttribute("aria-hidden","true"),O.pause(),O.removeAttribute("src"),O.load(),G&&L?(G=!1,q(),_(),F()):G=!1)}C&&C.addEventListener("click",e=>{e.target===C&&Ie()});y&&y.addEventListener("click",e=>{e.target===y&&se()});document.addEventListener("keydown",e=>{if(e.key==="Escape"&&C?.classList.contains("is-open")){Ie();return}if(e.key==="Escape"&&R?.classList.contains("is-open")){Qe();return}e.key==="Escape"&&y?.classList.contains("is-open")&&se()});document.addEventListener("click",e=>{if(!H)return;if(performance.now()<j){e.preventDefault(),e.stopPropagation();return}const t=e.target?.closest?.(".wii-tile");if(!t)return;const o=t.getAttribute("data-href")||t.getAttribute("href");o&&o.startsWith("#")&&(e.preventDefault(),Xe(o))});te&&te.addEventListener("click",e=>{H&&(performance.now()<j||(e.preventDefault(),Xe("#minigame")))});b?.addEventListener("click",e=>{if(v.href==="#videos"){const l=e.target?.closest?.("[data-video-section]");if(l){const u=l.getAttribute("data-video-section");u&&yt(u);return}const p=e.target?.closest?.("[data-image-open]");if(p){const u=p.getAttribute("data-image-src");u&&Be(u);return}const m=e.target?.closest?.("[data-video-open]");if(m){const u=m.getAttribute("data-video-src");if(u){const T=m.getAttribute("data-video-poster")||"";St(u,T)}return}}if(v.href==="#projects"&&e.target?.closest?.("[data-ch-frame]")){const m=v.dom?.imgs?.find(u=>u.classList.contains("is-on"))?.getAttribute("src");if(m){e.preventDefault(),e.stopPropagation(),Be(m);return}}const t=e.target?.closest?.("[data-ch]"),o=t?.getAttribute("data-ch");if(e.target?.closest?.("[data-ch-frame]")&&pe()&&!t){J();const l=b.querySelector('[data-ch="more"]');l&&(l.textContent="Scopri di più");return}if(!o||v.href!=="#projects")return;const s=U["#projects"],n=(s.projects[v.projectIndex]||s.projects[0])?.slides||[];if(n.length){if(o==="more"){pe()?(J(),t.textContent="Scopri di più"):(It(n),t.textContent="Chiudi");return}if(o==="prev"||o==="next"){if(pe()){J();const l=b.querySelector('[data-ch="more"]');l&&(l.textContent="Scopri di più")}o==="prev"?v.slideIndex=(v.slideIndex-1+n.length)%n.length:v.slideIndex=(v.slideIndex+1)%n.length,v.dom?.imgs?.forEach((l,p)=>l.classList.toggle("is-on",p===v.slideIndex)),we(n,v.slideIndex);return}}});let he=0,be=0,Z=0,ee=0,Ee=!1,De=!1,oe="mouse",ae=null;function Lt(){S&&(Ee||(Ee=!0,S.style.opacity="1"))}function Ke(){S&&(Ee=!1,S.style.opacity="0")}function Ye(){Z+=(he-Z)*.42,ee+=(be-ee)*.42;const e=-10,t=-4;S&&(S.style.transform=`translate3d(${Z+e}px, ${ee+t}px, 0)`),requestAnimationFrame(Ye)}requestAnimationFrame(Ye);window.addEventListener("pointermove",e=>{if(oe=e.pointerType||"mouse",oe!=="mouse"){Ke();return}he=e.clientX,be=e.clientY,De||(Z=he,ee=be,De=!0),Lt()});window.addEventListener("mouseleave",()=>Ke());const Je=".wii-tile, .wii-pill";function Ze(e){S&&S.classList.toggle("is-hover",e)}document.addEventListener("pointerover",e=>{if(oe!=="mouse")return;const t=e.target?.closest?.(Je);t&&t!==ae&&(ae=t,Ze(!0),gt())});document.addEventListener("pointerout",e=>{const t=e.target?.closest?.(Je);if(t&&t===ae){const o=e.relatedTarget;if(o&&t.contains(o))return;ae=null,Ze(!1)}});document.addEventListener("pointerdown",()=>{L&&(q(),_(),F()),!(!S||oe!=="mouse")&&(S.classList.add("is-down"),B())});document.addEventListener("pointerup",()=>{S&&S.classList.remove("is-down")});let i={gameIndex:0,gameMode:"bubble",running:!1,score:0,timeLeft:30,lastTs:0,spawnAcc:0,bubbles:[],stars:[],paddleX:.5,rafId:null,timerId:null,canvas:null,ctx:null,scoreEl:null,timeEl:null,titleEl:null,helpEl:null,overEl:null,overScoreEl:null,overRestartBtn:null,overCloseBtn:null};const ne=[{mode:"bubble",title:"Bubble Pop",help:"Clicca le bolle prima che scadano i 30 secondi."},{mode:"star",title:"Star Catch",help:"Muovi il puntatore per prendere le stelle. Evita quelle rosse."}];function Te(){i.overEl&&(i.overEl.classList.remove("is-show"),i.overEl.setAttribute("aria-hidden","true"))}function Ot(){i.overEl&&(i.overScoreEl&&(i.overScoreEl.textContent=String(i.score)),i.overEl.classList.add("is-show"),i.overEl.setAttribute("aria-hidden","false"))}function Ct(){i.canvas=document.getElementById("mgCanvas"),i.scoreEl=document.getElementById("mgScore"),i.timeEl=document.getElementById("mgTime"),i.titleEl=document.getElementById("mgGameTitle"),i.helpEl=document.getElementById("mgHelp"),i.overEl=document.getElementById("mgOver"),i.overScoreEl=document.getElementById("mgOverScore"),i.overRestartBtn=document.getElementById("mgOverRestart"),i.overCloseBtn=document.getElementById("mgOverClose");const e=document.getElementById("mgStart"),t=document.getElementById("mgReset"),o=document.getElementById("mgPrevGame"),a=document.getElementById("mgNextGame");return i.canvas?(i.ctx=i.canvas.getContext("2d"),Te(),i.overRestartBtn&&(i.overRestartBtn.onclick=()=>{$(),je()}),i.overCloseBtn&&(i.overCloseBtn.onclick=()=>se()),i.canvas.onpointermove=s=>{if(i.gameMode!=="star")return;const r=i.canvas.getBoundingClientRect(),n=(s.clientX-r.left)/r.width*i.canvas.width;i.paddleX=ve(n/i.canvas.width,.06,.94)},i.canvas.onpointerdown=s=>{if(!i.running)return;const r=i.canvas.getBoundingClientRect(),n=(s.clientX-r.left)/r.width*i.canvas.width,l=(s.clientY-r.top)/r.height*i.canvas.height;if(i.gameMode==="star"){i.paddleX=ve(n/i.canvas.width,.06,.94);return}for(let p=i.bubbles.length-1;p>=0;p--){const m=i.bubbles[p],u=n-m.x,T=l-m.y;if(u*u+T*T<=m.r*m.r){i.bubbles.splice(p,1),i.score+=1,i.scoreEl&&(i.scoreEl.textContent=String(i.score)),tt();return}}},e&&(e.onclick=()=>je()),t&&(t.onclick=()=>$()),o&&(o.onclick=()=>Ge(-1)),a&&(a.onclick=()=>Ge(1)),Ae(),et(),!0):!1}function et(){const e=ne[i.gameIndex]||ne[0];i.gameMode=e.mode,i.titleEl&&(i.titleEl.textContent=e.title),i.helpEl&&(i.helpEl.textContent=e.help),z&&(z.textContent="Giochi")}function Ge(e){i.gameIndex=(i.gameIndex+e+ne.length)%ne.length,et(),$(),B()}function Ae(){if(!i.canvas)return;const e=Math.min(window.devicePixelRatio||1,2),t=i.canvas.clientWidth,o=i.canvas.clientHeight;if(!t||!o)return;const a=Math.round(t*e),s=Math.round(o*e);(i.canvas.width!==a||i.canvas.height!==s)&&(i.canvas.width=a,i.canvas.height=s)}function $(){re(!1),Te(),i.score=0,i.timeLeft=30,i.bubbles=[],i.stars=[],i.paddleX=.5,i.scoreEl&&(i.scoreEl.textContent="0"),i.timeEl&&(i.timeEl.textContent="30"),ce()}function je(){i.running||(i.timeLeft<=0&&$(),Te(),i.running=!0,i.lastTs=performance.now(),i.spawnAcc=0,i.timerId=window.setInterval(()=>{i.running&&(i.timeLeft-=1,i.timeEl&&(i.timeEl.textContent=String(i.timeLeft)),i.timeLeft<=0&&(i.timeLeft=0,i.timeEl&&(i.timeEl.textContent="0"),re(!0)))},1e3),i.rafId=requestAnimationFrame(ye))}function re(e=!1){i.running=!1,i.timerId&&(clearInterval(i.timerId),i.timerId=null),i.rafId&&(cancelAnimationFrame(i.rafId),i.rafId=null),e&&(Ot(),kt())}function Mt(){if(!i.canvas)return;const e=i.canvas.width,t=i.canvas.height,o=22+Math.random()*26,a=o+Math.random()*(e-o*2),s=o+Math.random()*(t-o*2),r=(-.25+Math.random()*.5)*(window.devicePixelRatio||1),n=(-.15+Math.random()*.35)*(window.devicePixelRatio||1),l=3.2+Math.random()*1.8;i.bubbles.push({x:a,y:s,r:o,vx:r,vy:n,born:performance.now(),life:l})}function Vt(){if(!i.canvas)return;const e=i.canvas.width,t=Math.random()<.22,o=(t?18:16)+Math.random()*12,a=o+Math.random()*(e-o*2),s=-o,n=(110+Math.random()*120+(30-i.timeLeft)*3)*(window.devicePixelRatio||1),l=(-30+Math.random()*60)*(window.devicePixelRatio||1);i.stars.push({x:a,y:s,size:o,vy:n,drift:l,bad:t,rot:Math.random()*Math.PI*2})}function ye(e){if(!i.running)return;const t=Math.min((e-i.lastTs)/1e3,.05);if(i.lastTs=e,Ae(),i.gameMode==="star"){Pt(t),i.rafId=requestAnimationFrame(ye);return}const a=.55/(1+(30-i.timeLeft)*.03);for(i.spawnAcc+=t;i.spawnAcc>=a;)i.spawnAcc-=a,Mt();const s=performance.now();for(let r=i.bubbles.length-1;r>=0;r--){const n=i.bubbles[r];n.x+=n.vx*60*t,n.y+=n.vy*60*t,n.x-n.r<0&&(n.x=n.r,n.vx*=-1),n.x+n.r>i.canvas.width&&(n.x=i.canvas.width-n.r,n.vx*=-1),n.y-n.r<0&&(n.y=n.r,n.vy*=-1),n.y+n.r>i.canvas.height&&(n.y=i.canvas.height-n.r,n.vy*=-1),(s-n.born)/1e3>n.life&&i.bubbles.splice(r,1)}ce(),i.rafId=requestAnimationFrame(ye)}function Pt(e){if(!i.canvas)return;const o=.62/(1+(30-i.timeLeft)*.035);for(i.spawnAcc+=e;i.spawnAcc>=o;)i.spawnAcc-=o,Vt();const a=i.canvas.width,s=i.canvas.height,r=Math.max(92,a*.16),n=Math.max(18,s*.035),l=i.paddleX*a,p=s-n*3.2;for(let m=i.stars.length-1;m>=0;m--){const u=i.stars[m];u.y+=u.vy*e,u.x+=u.drift*e,u.rot+=e*2.4;const T=Math.abs(u.x-l)<=r*.55+u.size*.4,D=Math.abs(u.y-p)<=n*1.2+u.size*.5;if(T&&D){i.stars.splice(m,1),i.score+=u.bad?-2:1,i.score=Math.max(0,i.score),i.scoreEl&&(i.scoreEl.textContent=String(i.score)),u.bad?Ht():tt();continue}u.y-u.size>s&&i.stars.splice(m,1)}ce()}function ce(){if(!i.ctx||!i.canvas)return;const e=i.ctx,t=i.canvas.width,o=i.canvas.height;if(e.clearRect(0,0,t,o),e.fillStyle="rgba(255,255,255,0.22)",e.fillRect(0,0,t,o),i.gameMode==="star"){Rt(e,t,o);return}for(const a of i.bubbles){const s=e.createRadialGradient(a.x-a.r*.35,a.y-a.r*.35,a.r*.2,a.x,a.y,a.r);s.addColorStop(0,"rgba(255,255,255,0.95)"),s.addColorStop(.35,"rgba(255,255,255,0.35)"),s.addColorStop(1,"rgba(43,184,255,0.18)"),e.beginPath(),e.arc(a.x,a.y,a.r,0,Math.PI*2),e.fillStyle=s,e.fill(),e.lineWidth=2,e.strokeStyle="rgba(43,184,255,0.35)",e.stroke(),e.beginPath(),e.arc(a.x-a.r*.25,a.y-a.r*.25,a.r*.28,0,Math.PI*2),e.fillStyle="rgba(255,255,255,0.28)",e.fill()}}function Rt(e,t,o){const a=e.createLinearGradient(0,0,0,o);a.addColorStop(0,"rgba(218,244,255,0.70)"),a.addColorStop(1,"rgba(255,255,255,0.38)"),e.fillStyle=a,e.fillRect(0,0,t,o);for(const m of i.stars)zt(e,m.x,m.y,m.size,m.rot,m.bad);const s=Math.max(92,t*.16),r=Math.max(18,o*.035),n=i.paddleX*t,l=o-r*3.2;e.save(),e.translate(n,l);const p=e.createLinearGradient(0,-r,0,r);p.addColorStop(0,"rgba(255,255,255,0.94)"),p.addColorStop(1,"rgba(43,184,255,0.30)"),e.fillStyle=p,e.strokeStyle="rgba(43,184,255,0.42)",e.lineWidth=2,Nt(e,-s/2,-r/2,s,r,r/2),e.fill(),e.stroke(),e.restore()}function zt(e,t,o,a,s,r){e.save(),e.translate(t,o),e.rotate(s),e.beginPath();for(let n=0;n<10;n+=1){const l=-Math.PI/2+n*Math.PI/5,p=n%2===0?a:a*.45,m=Math.cos(l)*p,u=Math.sin(l)*p;n===0?e.moveTo(m,u):e.lineTo(m,u)}e.closePath(),e.fillStyle=r?"rgba(255,96,96,0.78)":"rgba(255,218,80,0.86)",e.strokeStyle=r?"rgba(160,30,40,0.35)":"rgba(180,130,20,0.32)",e.lineWidth=2,e.fill(),e.stroke(),e.restore()}function Nt(e,t,o,a,s,r){e.beginPath(),e.moveTo(t+r,o),e.lineTo(t+a-r,o),e.quadraticCurveTo(t+a,o,t+a,o+r),e.lineTo(t+a,o+s-r),e.quadraticCurveTo(t+a,o+s,t+a-r,o+s),e.lineTo(t+r,o+s),e.quadraticCurveTo(t,o+s,t,o+s-r),e.lineTo(t,o+r),e.quadraticCurveTo(t,o,t+r,o),e.closePath()}function tt(){const e=x();if(!e)return;const t=e.currentTime,o=e.createOscillator(),a=e.createGain();o.type="sine",o.frequency.setValueAtTime(620,t),o.frequency.exponentialRampToValueAtTime(280,t+.06),a.gain.setValueAtTime(1e-4,t),a.gain.exponentialRampToValueAtTime(.08,t+.008),a.gain.exponentialRampToValueAtTime(1e-4,t+.1),o.connect(a),a.connect(e.destination),o.start(t),o.stop(t+.12)}function kt(){const e=x();if(!e)return;const t=e.currentTime;[880,740,622].forEach((a,s)=>{const r=e.createOscillator(),n=e.createGain(),l=t+s*.12;r.type="triangle",r.frequency.setValueAtTime(a,l),n.gain.setValueAtTime(1e-4,l),n.gain.exponentialRampToValueAtTime(.06,l+.01),n.gain.exponentialRampToValueAtTime(1e-4,l+.16),r.connect(n),n.connect(e.destination),r.start(l),r.stop(l+.18)})}function Ht(){const e=x();if(!e)return;const t=e.currentTime,o=e.createOscillator(),a=e.createGain();o.type="sawtooth",o.frequency.setValueAtTime(180,t),o.frequency.exponentialRampToValueAtTime(90,t+.1),a.gain.setValueAtTime(1e-4,t),a.gain.exponentialRampToValueAtTime(.035,t+.008),a.gain.exponentialRampToValueAtTime(1e-4,t+.14),o.connect(a),a.connect(e.destination),o.start(t),o.stop(t+.16)}window.addEventListener("resize",()=>{document.getElementById("mgCanvas")&&(Ae(),ce()),$e(),k()});function ue(){H||(H=!0,N&&(N.classList.add("is-fading"),N.setAttribute("aria-hidden","true"),window.setTimeout(()=>{N.classList.add("is-hidden")},ct),window.setTimeout(()=>{document.body?.classList.remove("is-intro-locked")},lt)),j=Math.max(j,performance.now()+rt),L&&(q(),_(),F()),B(),k())}function xt(){if(!N){H=!0;return}document.body?.classList.add("is-intro-locked"),N.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),ue()}),N.addEventListener("pointerdown",e=>{e.pointerType!=="touch"&&(e.preventDefault(),e.stopPropagation(),ue())}),window.addEventListener("keydown",e=>{H||(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),ue())})}function Se(){const e=window.visualViewport?.height||window.innerHeight;document.documentElement.style.setProperty("--vh",`${e}px`)}mt();M&&M.classList.add("is-swoosh-in");_e();setInterval(_e,1e3);xt();Se();window.addEventListener("resize",Se);window.visualViewport?.addEventListener("resize",Se);K.addEventListener?(K.addEventListener("change",k),ge.addEventListener("change",k)):(K.addListener(k),ge.addListener(k));
