(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const c of s)if(c.type==="childList")for(const a of c.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function o(s){const c={};return s.integrity&&(c.integrity=s.integrity),s.referrerPolicy&&(c.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?c.credentials="include":s.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function i(s){if(s.ep)return;s.ep=!0;const c=o(s);fetch(s.href,c)}})();const et="/Portfolio_Valerio/",r=e=>`${et}${e.replace(/^\/+/,"")}`,Q=window.matchMedia("(max-width: 640px)"),pe=window.matchMedia("(prefers-reduced-motion: reduce)"),z=document.getElementById("wiiIntro");let N=!1;const C=document.getElementById("grid");document.getElementById("board");const Le=document.getElementById("time"),Se=document.getElementById("date"),W=document.getElementById("btnLeft"),Z=document.getElementById("btnRight"),E=document.getElementById("wiiOverlay"),Ce=document.getElementById("overlayBack"),k=document.getElementById("overlayTitle"),h=document.getElementById("overlayBody"),T=document.getElementById("wiiPointer"),P=document.getElementById("imgViewer"),ee=document.getElementById("imgViewerSrc"),S=document.getElementById("videoViewer"),L=document.getElementById("videoViewerSrc");let ue=[];function tt(e,t,o){return Math.max(t,Math.min(o,e))}const it=[[{icon:"👋",t:"Chi sono",s:"Bio + competenze",href:"#about",previews:[r("img/BIO/BIO_1.jpg"),r("img/BIO/BIO_2.jpg"),r("img/BIO/BIO_3.jpg")]},{icon:"🎓",t:"Esperienze",s:"Formazione / studi",href:"#exp"},{icon:"📬",t:"Contatti",s:"Mail e social",href:"#contact"},{icon:"🧩",t:"Progetti",s:"Case study e lavori",href:"#projects",previews:[r("img/PROGETTI/PROG_1.jpg"),r("img/PROGETTI/PROG_2.jpg"),r("img/PROGETTI/PROG_3.jpg")]},{icon:"📱",t:"Social",s:"I miei profili",href:"#social"},{icon:"🎬",t:"Video",s:"Social e progetti",href:"#videos",previewAnim:"wiiPreviewFadeTight",previews:[r("img/CHANNELS/VIDEO/VIDEO PROMO_3-frame.jpg"),r("img/CHANNELS/VIDEO/meschia-cover.jpg"),r("img/CHANNELS/VIDEO/PROGETTI PERSONALI_2-frame.jpg"),r("img/CHANNELS/VIDEO/REQUIEM LOCANDINA.jpg")]},{icon:"🛠️",t:"Skills",s:"Cosa so fare",href:"#tools"},{icon:"🤖",t:"AI",s:"Workflow",href:"#ai",previewVideo:{src:r("img/CHANNELS/ai.mp4"),poster:r("img/CHANNELS/ai-frame.jpg")}},{icon:"📌",t:"Servizi",s:"Cosa offro",href:"#services",previewVideo:{src:r("img/CHANNELS/servizi.mp4"),poster:r("img/CHANNELS/servizi-frame.jpg")}}],[{icon:"📷",t:"Galleria",s:"Foto e frame",href:"#gallery"},{icon:"🗂️",t:"Archivio",s:"Lavori passati",href:"#archive"},{icon:"📝",t:"Blog",s:"Note e making-of",href:"#blog"},{icon:"📍",t:"Dove sono",s:"Roma / contatti",href:"#where"}]];let B=0;const ot=420,nt=320,at=900;function st(){return it[0]}function rt(){if(!C)return;const e=st();C.innerHTML=e.map(t=>{const o=t.previewVideo?.src,i=t.previewVideo?.poster,s=Array.isArray(t.previews)?t.previews:[],a=!o&&!s.length?"wii-tile wii-tile--iconPreview":"wii-tile",d=i?` poster="${i}"`:"",g=i?` style="--preview-poster:url('${i}')"`:"",f=s.length>1?` style="--preview-step:3s; --preview-duration:${s.length*3}s${t.previewAnim?`; --preview-anim:${t.previewAnim}`:""}"`:"",y=o?`
          <div class="wii-preview wii-preview--single wii-preview--video"${g} aria-hidden="true">
            <video class="preview-video" src="${t.previewVideo.src}"${d} muted loop playsinline preload="metadata"></video>
          </div>
        `:s.length?`
          <div class="wii-preview ${s.length===1?"wii-preview--single":""}"${f} aria-hidden="true">
            ${s.map(R=>`<img src="${R}" alt="" loading="lazy" decoding="async">`).join("")}
          </div>
        `:`
          <div class="wii-preview wii-preview--icon" aria-hidden="true">
            <span>${t.icon}</span>
          </div>
        `;return`
        <a class="${a}" href="${t.href}" data-href="${t.href}">
          ${y}
          <div class="wii-tileContent">
            <div class="wii-icon">${t.icon}</div>
            <div class="wii-tileText">
              <div class="wii-title">${t.t}</div>
              <div class="wii-sub">${t.s}</div>
            </div>
          </div>
        </a>
      `}).join(""),ct(),lt(),He(),x()}function ct(){if(!C)return;Array.from(C.querySelectorAll(".wii-preview:not(.wii-preview--single)")).forEach((t,o)=>{const i=window.getComputedStyle(t),s=parseFloat(i.getPropertyValue("--preview-duration"))||12,c=parseFloat(i.getPropertyValue("--preview-step"))||4,a=(o+1)*c*1.618%s;t.style.setProperty("--preview-phase",`-${a.toFixed(2)}s`)})}function He(){if(!C)return;Array.from(C.querySelectorAll(".wii-preview--video")).forEach(t=>{const o=t.closest(".wii-tile");if(!o)return;const i=o.getBoundingClientRect();if(!i.height)return;const s=i.width/i.height,c=Math.max(1,Math.min(s,16/9));t.style.setProperty("--video-zoom",c.toFixed(3))})}function lt(){if(!C)return;const e=Array.from(C.querySelectorAll(".wii-preview--video"));ue=[],e.forEach(t=>{const o=t.closest(".wii-tile");if(!o)return;const i=t.querySelector(".preview-video");if(!i)return;ue.push({preview:t,video:i}),i.muted=!0,i.loop=!0,i.setAttribute("playsinline","");const s=()=>{if(t.classList.add("is-ready"),i.paused)try{i.currentTime=0}catch{}};i.addEventListener("loadeddata",s,{once:!0});const c=()=>{t.classList.add("is-hover"),i.currentTime=0,i.play().catch(()=>{})},a=()=>{i.pause(),i.currentTime=0,t.classList.remove("is-hover")};o.addEventListener("mouseenter",c),o.addEventListener("mouseleave",a),o.addEventListener("pointerenter",c),o.addEventListener("pointerleave",a),o.addEventListener("focusin",c),o.addEventListener("focusout",a)})}function x(){const e=Q.matches&&!pe.matches;ue.forEach(({preview:t,video:o})=>{if(e)t.classList.add("is-auto"),o.play().catch(()=>{});else{t.classList.remove("is-auto"),o.pause();try{o.currentTime=0}catch{}}})}function Be(){if(!Le||!Se)return;const e=new Date,t=String(e.getHours()).padStart(2,"0"),o=String(e.getMinutes()).padStart(2,"0");Le.textContent=`${t}:${o}`;const i=["Dom","Lun","Mar","Mer","Gio","Ven","Sab"],s=["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"],c=e.getDate(),a=i[e.getDay()],d=s[e.getMonth()];Se.textContent=`${a} ${c} ${d}`}let V=null,O=!0,Me=!1,Ve=0;function D(){return O?(V||(V=new(window.AudioContext||window.webkitAudioContext)),V.state==="suspended"&&V.resume().catch(()=>{}),V):null}function j(){const e=D();if(e){e.state==="suspended"&&e.resume().catch(()=>{});try{const t=e.createBuffer(1,1,e.sampleRate),o=e.createBufferSource();o.buffer=t,o.connect(e.destination),o.start(0)}catch{}}}function $(){Me||(Me=!0,j())}function De({type:e="sine",freq:t=700,duration:o=.05,gain:i=.04,attack:s=.002,release:c=.035}={}){const a=D();if(!a)return;const d=a.currentTime,g=a.createOscillator(),f=a.createGain();g.type=e,g.frequency.setValueAtTime(t,d),f.gain.setValueAtTime(0,d),f.gain.linearRampToValueAtTime(i,d+s),f.gain.exponentialRampToValueAtTime(1e-4,d+s+c),g.connect(f),f.connect(a.destination),g.start(d),g.stop(d+o+c+.02)}function dt(){const e=performance.now();e-Ve<120||(Ve=e,De({type:"sine",freq:880,duration:.03,gain:.026,attack:.002,release:.03}))}function G(){De({type:"triangle",freq:520,duration:.03,gain:.05,attack:.001,release:.02})}let A=null,H=!1;function _(){const e=D();if(!e||A)return;const t=e.createGain();t.gain.value=0,t.connect(e.destination);const o=e.createGain();o.gain.value=.82;const i=e.createBiquadFilter();i.type="lowpass",i.frequency.value=3100,i.Q.value=.55;const s=e.createDelay(.8);s.delayTime.value=.36;const c=e.createGain();c.gain.value=.18;const a=e.createGain();a.gain.value=.34,o.connect(i),i.connect(t),i.connect(s),s.connect(c),c.connect(s),s.connect(a),a.connect(t);const d=e.currentTime,g=e.createOscillator();g.type="sine",g.frequency.value=261.63;const f=e.createGain();f.gain.value=1e-4;const y=e.createOscillator();y.type="sine",y.frequency.value=.045;const R=e.createGain();R.gain.value=.012,g.connect(f),y.connect(R),R.connect(f.gain),f.connect(o),g.start(d),y.start(d),f.gain.setTargetAtTime(.01,d+.2,1.8);function se(b,l,I=.035,m=.34){const p=e.createOscillator(),v=e.createGain(),w=e.createBiquadFilter();p.type="sine",p.frequency.setValueAtTime(b,l),p.frequency.exponentialRampToValueAtTime(b*1.004,l+m),w.type="highpass",w.frequency.setValueAtTime(420,l),v.gain.setValueAtTime(1e-4,l),v.gain.exponentialRampToValueAtTime(I,l+.018),v.gain.exponentialRampToValueAtTime(1e-4,l+m),p.connect(w),w.connect(v),v.connect(o),p.start(l),p.stop(l+m+.04)}function Ie(b,l,I=.018){b.forEach((m,p)=>{const v=e.createOscillator(),w=e.createGain(),M=e.createBiquadFilter();v.type=p===1?"triangle":"sine",v.frequency.setValueAtTime(m,l),v.detune.setValueAtTime((p-1)*4,l),M.type="lowpass",M.frequency.setValueAtTime(1350,l),w.gain.setValueAtTime(1e-4,l),w.gain.exponentialRampToValueAtTime(I,l+.12+p*.03),w.gain.exponentialRampToValueAtTime(1e-4,l+1.7),v.connect(M),M.connect(w),w.connect(o),v.start(l),v.stop(l+1.9)})}function Ae(b,l,I=.016){const m=e.createOscillator(),p=e.createGain(),v=e.createBiquadFilter();m.type="triangle",m.frequency.setValueAtTime(b*.72,l),m.frequency.exponentialRampToValueAtTime(b,l+.16),v.type="bandpass",v.frequency.setValueAtTime(b*2.2,l),v.Q.setValueAtTime(1.2,l),p.gain.setValueAtTime(1e-4,l),p.gain.exponentialRampToValueAtTime(I,l+.025),p.gain.exponentialRampToValueAtTime(1e-4,l+.3),m.connect(v),v.connect(p),p.connect(o),m.start(l),m.stop(l+.34)}function Te(b,l,I=.012){const m=e.createOscillator(),p=e.createGain(),v=e.createBiquadFilter();m.type="sine",m.frequency.setValueAtTime(b,l),m.frequency.exponentialRampToValueAtTime(b*.995,l+.42),v.type="lowpass",v.frequency.setValueAtTime(360,l),p.gain.setValueAtTime(1e-4,l),p.gain.exponentialRampToValueAtTime(I,l+.04),p.gain.exponentialRampToValueAtTime(1e-4,l+.48),m.connect(v),v.connect(p),p.connect(o),m.start(l),m.stop(l+.52)}function Ye(b,l=.006){const I=Math.max(1,Math.floor(e.sampleRate*.08)),m=e.createBuffer(1,I,e.sampleRate),p=m.getChannelData(0);for(let U=0;U<I;U+=1){const le=1-U/I;p[U]=(Math.random()*2-1)*le*le*le}const v=e.createBufferSource(),w=e.createGain(),M=e.createBiquadFilter();M.type="highpass",M.frequency.value=5200,w.gain.setValueAtTime(l,b),w.gain.exponentialRampToValueAtTime(1e-4,b+.09),v.buffer=m,v.connect(M),M.connect(w),w.connect(o),v.start(b)}const F=[{chord:[261.63,329.63,392],bass:130.81,motif:[392,523.25,493.88,329.63]},{chord:[293.66,369.99,440],bass:146.83,motif:[440,587.33,554.37,369.99]},{chord:[220,329.63,392],bass:110,motif:[329.63,440,392,261.63]},{chord:[246.94,293.66,392],bass:123.47,motif:[392,493.88,587.33,493.88]}],Je=[{beat:0,kind:"chord"},{beat:1,kind:"lead",note:0},{beat:2.5,kind:"bubble",note:1},{beat:4,kind:"lead",note:2},{beat:5.5,kind:"hush"},{beat:7,kind:"lead",note:3},{beat:8,kind:"chord"},{beat:9.5,kind:"bubble",note:2},{beat:11,kind:"lead",note:1},{beat:13.5,kind:"hush"}],re=380,Ze=16;let ce=0;function Oe(){if(!O||!V||!A)return;const b=V.currentTime+.03,l=F[ce%F.length],I=F[(ce+1)%F.length];if(g.frequency.setTargetAtTime(l.chord[0],b,.8),Te(l.bass,b+.02,.01),Je.forEach(m=>{const p=b+m.beat*(re/1e3);if(m.kind==="chord"){Ie(m.beat>=8?I.chord:l.chord,p,.014),Te(m.beat>=8?I.bass:l.bass,p+.04,.009);return}if(m.kind==="lead"){const v=l.motif[m.note%l.motif.length];se(v,p,m.beat===1?.038:.03,.42),Math.random()<.35&&se(v*1.5,p+.18,.014,.28);return}if(m.kind==="bubble"){Ae(l.motif[m.note%l.motif.length],p,.014);return}Ye(p,.005)}),Math.random()<.55){const m=l.motif[Math.floor(Math.random()*l.motif.length)];Ae(m*2,b+(14.5+Math.random())*(re/1e3),.01)}ce+=1,A.timerId=window.setTimeout(Oe,Ze*re)}A={musicGain:t,toneBus:o,toneFilter:i,delay:s,fb:c,delayMix:a,air:g,airGain:f,airLfo:y,timerId:null},Oe(),t.gain.setTargetAtTime(.36,e.currentTime,.9)}function je(){if(!V||!A)return;const e=V.currentTime;A.timerId&&clearTimeout(A.timerId),A.musicGain.gain.setTargetAtTime(1e-4,e,.25),setTimeout(()=>{try{A.air?.stop()}catch{}try{A.airLfo?.stop()}catch{}A=null},400)}W&&(W.textContent="🔊",W.addEventListener("click",()=>{N&&(performance.now()<B||(O=!O,W.textContent=O?"🔊":"🔇",O?($(),j(),_(),G()):je()))}));Z&&(Z.textContent="🎮");["pointerdown","touchstart","mousedown"].forEach(e=>{window.addEventListener(e,()=>{O&&($(),_())},{once:!0,passive:!0})});const u={href:null,projectIndex:0,slideIndex:0,dom:null,videoSectionId:null};let K=null;const Pe="https://www.linkedin.com/in/valerio-serani-682a48215/",mt="https://www.instagram.com/velvet_172/",pt="https://www.tiktok.com/@heyits172",ut="https://vimeo.com/user95787021",gt="https://www.behance.net/velvet172",Re="valerioserani@gmail.com",ze="+39 3469697747",q={"#projects":{title:"Progetti",projects:[{id:"bestof",slides:[{src:r("img/PROGETTI/PROG_1.jpg"),client:"Sunsilk",title:"Materiali promozionali",what:"Creativity + layout",moreHtml:`
              <h3 class="chMoreTitle">Sunsilk — Testata Home</h3>
              <p class="chMoreText">Ho lavorato al riadattamento degli asset forniti per Smartwin su mobile, mantenendo coerenza visiva e leggibilità tra formati. In diverse occasioni ho curato anche siti dedicati alle promozioni, con focus su gerarchia, adattamento della testata e chiarezza in home.</p>
            `},{src:r("img/PROGETTI/PROG_2.jpg"),client:"M&M’s / UCI",title:"Screentime Cinema",what:"Layout + output video",moreHtml:`
              <h3 class="chMoreTitle">M&M’s / UCI — Screentime</h3>
              <p class="chMoreText">Studio ADV dedicato al formato cinema: impaginazione del messaggio, bilanciamento brand/prodotto e sviluppo dell'output definitivo, un video promozionale trasmesso negli UCI Cinema italiani.</p>
            `},{src:r("img/PROGETTI/PROG_3.jpg"),client:"PAM",title:"Sito + materiale promozionale",what:"Creativity / design",moreHtml:`
              <h3 class="chMoreTitle">PAM — San Valentino</h3>
              <p class="chMoreText">Concept visual con approccio design-first: direzione creativa, composizione e sviluppo dell'output definitivo, un sito promozionale speciale dedicato a San Valentino.</p>
            `},{src:r("img/PROGETTI/PROG_4.jpg"),client:"Snickers / Twix",title:"Cover Adattamento",what:"Visual + layout",moreHtml:`
              <h3 class="chMoreTitle">Snickers / Twix</h3>
              <p class="chMoreText">Visual ideato per la back cover di un magazine di settore: adattamento multi-brand con attenzione a consistenza grafica, impatto del key visual e coerenza tra linee prodotto.</p>
            `},{src:r("img/PROGETTI/PROG_5.jpg"),client:"Compeed",title:"Materiale promozionale",what:"Print / layout",moreHtml:`
              <h3 class="chMoreTitle">Compeed — Volantino</h3>
              <p class="chMoreText">Materiale print orientato alla conversione: struttura informativa chiara, call to action evidente e visual di supporto al messaggio.</p>
            `},{src:r("img/PROGETTI/PROG_6.jpg"),client:"Boem",title:"Materiale promozionale",what:"Brand / creative",moreHtml:`
              <h3 class="chMoreTitle">Boem</h3>
              <p class="chMoreText">Con Boem ci sono state diverse occasioni di lavoro: materiale print, diversi siti e materiale promozionale, mantenendo coerenza visiva tra formati e punti di contatto.</p>
            `},{src:r("img/PROGETTI/PROG_7.jpg"),client:"L'Or x Ferrari Hypercar",title:"UX/UI + materiale promozionale",what:"Materiale print + landing",moreHtml:`
              <h3 class="chMoreTitle">L'Or x Ferrari Hypercar</h3>
              <p class="chMoreText">Ho lavorato al visual della campagna promozionale italiana, confrontandomi direttamente con Ferrari e L'Or per mantenere coerenza tra identità, tono e materiali di comunicazione. L'output finale è stato un sito dedicato alla partecipazione alla promozione.</p>
            `},{src:r("img/PROGETTI/PROG_8.jpg"),client:"Degustazioni a corte",title:"Produzione materiali evento",what:"Print / design",moreHtml:`
              <h3 class="chMoreTitle">Degustazioni a corte</h3>
              <p class="chMoreText">Ho curato tutti i materiali necessari all'evento "Degustazioni a corte": cartoline, photo frame, striscioni e altri supporti di comunicazione, rinnovando anche il logo per l'edizione 2025.</p>
            `},{src:r("img/PROGETTI/PROG_9.jpg"),client:"Control",title:"Materiale promozionale",what:"Brand / layout",moreHtml:`
              <h3 class="chMoreTitle">Control</h3>
              <p class="chMoreText">Con Control ci sono state diverse occasioni di lavoro: materiali promozionali, siti, visual di campagna e adattamenti di volantini, sviluppati mantenendo coerenza con le direttive del brand e chiarezza sui diversi formati.</p>
            `},{src:r("img/PROGETTI/PROG_10.jpg"),client:"Amuchina",title:"Materiale promozionale",what:"Campaign / visual",moreHtml:`
              <h3 class="chMoreTitle">Amuchina - materiale promozionale</h3>
              <p class="chMoreText">Layout e sviluppo di materiali promozionali per Winsmart, adattando i visual di campagna per accompagnare il sito a cui è legata la promozione.</p>
            `},{src:r("img/PROGETTI/PROG_11.jpg"),client:"Mentadent",title:"Materiali promozionali",what:"Visual / layout",moreHtml:`
              <h3 class="chMoreTitle">Mentadent — materiali promozionali</h3>
              <p class="chMoreText">Ho adattato il visual di campagna in materiali Winsmart per una promozione legata al "mese della prevenzione", mantenendo coerenza grafica, leggibilità e chiarezza del messaggio.</p>
            `},{src:r("img/PROGETTI/PROG_12.jpg"),client:"Snickers",title:"Materiale promozionale",what:"Layout + video promozionale",moreHtml:`
              <h3 class="chMoreTitle">Snickers - materiale promozionale</h3>
              <p class="chMoreText">Ho lavorato alla creazione di materiali Winsmart e video promozionali per la campagna, curando adattamenti visual, layout e output pensati per mantenere il messaggio chiaro e riconoscibile sui diversi formati.</p>
            `},{src:r("img/PROGETTI/PROG_13.jpg"),client:"UILtemp",title:"App Site Play",what:"UI / layout",moreHtml:`
              <h3 class="chMoreTitle">UILtemp — App Site</h3>
              <p class="chMoreText">Case UI/layout per sito-app: struttura delle sezioni, chiarezza d'uso e coerenza visiva tra componenti. Ho lavorato anche a diversi materiali print, mantenendo continuità tra comunicazione digitale e supporti fisici.</p>
            `}]}]},"#videos":{title:"Video",sections:[{id:"winsmart",title:"Video promozionali / Winsmart",kicker:"PROMO",summary:"Selezione di video promozionali, materiali Winsmart e contenuti social: curati interamente montaggio, editing, VFX e musica.",hubThumb:r("img/CHANNELS/VIDEO/VIDEO PROMO_3-frame.jpg"),hero:{src:r("img/CHANNELS/VIDEO/VIDEO PROMO_3-frame.jpg"),alt:"Hero Winsmart"},videos:[{title:"Promo 01",desc:"Cut breve per social con focus su prodotto e CTA.",src:r("img/CHANNELS/VIDEO/VIDEO PROMO_1.mp4"),poster:r("img/CHANNELS/VIDEO/VIDEO PROMO_1-frame.jpg")},{title:"Promo 02",desc:"Versione dinamica con ritmo più rapido e titoli.",src:r("img/CHANNELS/VIDEO/VIDEO PROMO_2.mp4"),poster:r("img/CHANNELS/VIDEO/VIDEO PROMO_2-frame.jpg")},{title:"Promo 03",desc:"Cut verticale pensato per social con ritmo veloce.",src:r("img/CHANNELS/VIDEO/VIDEO PROMO_3.mp4"),poster:r("img/CHANNELS/VIDEO/VIDEO PROMO_3-frame.jpg")},{title:"Promo 04",desc:"Variante con focus su titoli e prodotto.",src:r("img/CHANNELS/VIDEO/VIDEO PROMO_4.mp4"),poster:r("img/CHANNELS/VIDEO/VIDEO PROMO_4-frame.jpg")},{title:"Promo 05",desc:"Versione verticale con focus su ritmo e callout.",src:r("img/CHANNELS/VIDEO/VIDEO PROMO_5.mp4"),poster:r("img/CHANNELS/VIDEO/VIDEO PROMO_5-frame.jpg")}]},{id:"meschia",title:"Social per Meschia",kicker:"Meschia",summary:"Produzione di lavori social: format brevi, coerenza visiva e adattamenti multi-piattaforma.",hero:{src:r("img/CHANNELS/VIDEO/meschia-cover.jpg"),alt:"Hero Meschia"},videos:[{title:"Social 01",desc:"Formato verticale con ritmo pensato per social.",src:r("img/CHANNELS/VIDEO/MESCHIA_SOCIAL_01.mp4"),poster:r("img/CHANNELS/VIDEO/MESCHIA_SOCIAL_01-frame.jpg")},{title:"Social 02",desc:"Cut rapido per mantenere alta l'attenzione.",src:r("img/CHANNELS/VIDEO/CADERE_2.mp4"),poster:r("img/CHANNELS/VIDEO/CADERE_2-frame.jpg")},{title:"Social 03",desc:"Versione teaser con focus su mood e dettagli.",src:r("img/CHANNELS/VIDEO/CADERE_3.mp4"),poster:r("img/CHANNELS/VIDEO/CADERE_3-frame.jpg")},{title:"Social 04",desc:"Variante con taglio finale più deciso.",src:r("img/CHANNELS/VIDEO/CADERE_4.mp4"),poster:r("img/CHANNELS/VIDEO/CADERE_4-frame.jpg")}]},{id:"meschia-videoclip",title:"Videoclip",kicker:"Meschia",hubLabel:"Coming soon",hubDesc:"Ho lavorato al videoclip di una canzone di Meschia, in uscita il 12 giugno.",summary:"Ho lavorato al videoclip di una canzone di Meschia, in uscita il 12 giugno.",videos:[{title:"Coming soon",desc:"Videoclip di una canzone di Meschia in uscita il 12 giugno."}]},{id:"personali",title:"Progetti personali",kicker:"Personal",summary:"Esperimenti e lavori accademici: tutto il processo di ideazione, illustrazione e montaggio è stato curato interamente da me.",hubThumb:r("img/CHANNELS/VIDEO/PROGETTI PERSONALI_2-frame.jpg"),hero:{src:r("img/CHANNELS/VIDEO/PROGETTI PERSONALI_1-frame.jpg"),alt:"Hero Progetti personali"},videos:[{title:"Personal 01",desc:"Studio visivo e composizione per concept personale.",src:r("img/CHANNELS/VIDEO/PROGETTI PERSONALI_1.mp4"),poster:r("img/CHANNELS/VIDEO/PROGETTI PERSONALI_1-frame.jpg")},{title:"Personal 02",desc:"Short video sperimentale con focus su ritmo e mood.",src:r("img/CHANNELS/VIDEO/PROGETTI PERSONALI_2.mp4"),poster:r("img/CHANNELS/VIDEO/PROGETTI PERSONALI_2-frame.jpg")}]},{id:"requiem",title:'48h Film Project - "Requiem"',kicker:"48h Film Project",summary:'Esperienza sul set come grafico, backstage e supporto alla fotografia durante le riprese del corto "Requiem", diretto da Lorenzo Russo.',hubThumb:r("img/CHANNELS/VIDEO/REQUIEM LOCANDINA.jpg"),hero:{src:r("img/CHANNELS/VIDEO/REQUIEM LOCANDINA.jpg"),alt:"Hero Requiem"},videos:[{title:"Backstage",desc:"Estratto dal set, girato e montato.",src:r("img/CHANNELS/VIDEO/REQUIEM BACKSTAGE.mp4"),poster:r("img/CHANNELS/VIDEO/REQUIEM BACKSTAGE-frame.jpg")},{title:"Locandina",desc:"Locandina ufficiale del corto.",poster:r("img/CHANNELS/VIDEO/REQUIEM LOCANDINA.jpg"),static:!0}]}]},"#about":{title:"Chi sono",html:`
      <div class="wii-card bio-card">
        <div class="bioCarousel" aria-label="Chi sono - carosello">
          <img class="bioMedia" src="${r("img/BIO/BIO_1.jpg")}" alt="" loading="lazy" decoding="async">
          <img class="bioMedia" src="${r("img/BIO/BIO_2.jpg")}" alt="" loading="lazy" decoding="async">
          <img class="bioMedia" src="${r("img/BIO/BIO_3.jpg")}" alt="" loading="lazy" decoding="async">
          <img class="bioMedia" src="${r("img/BIO/BIO_4.jpg")}" alt="" loading="lazy" decoding="async">
          <img class="bioMedia" src="${r("img/BIO/BIO_5.jpg")}" alt="" loading="lazy" decoding="async">
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
        <p><strong>Email</strong>: <a href="mailto:${Re}">${Re}</a></p>
        <p><strong>Telefono</strong>: <a href="tel:${ze.replace(/\s+/g,"")}">${ze}</a></p>
        <p class="wii-meta">Base: <strong>Roma</strong></p>
        <div class="wii-links">
          <a class="wii-link" href="${r("Valerio-Serani-CV.pdf")}" download>
            Scarica CV
          </a>
        </div>
      </div>
      <div class="wii-card">
        <h3>Profilo LinkedIn</h3>
        <p><strong>Profilo LinkedIn</strong> con esperienza, formazione e contatti.</p>
        <div class="wii-links">
          <a class="wii-link" href="${Pe}" target="_blank" rel="noopener noreferrer">
            Apri profilo LinkedIn
          </a>
        </div>
      </div>
    `},"#social":{title:"Social",html:`
      <div class="wii-card">
        <h3>Canali social</h3>
        <p>Qui trovi tutti i miei social: raccontano la mia parte più professionale e quella più ludica. Passione e lavoro sono sempre andati di pari passo nella mia vita, e qui li vedi convivere.</p>
        <div class="social-list">
          <a class="social-item" href="${Pe}" target="_blank" rel="noopener noreferrer">
            <span class="social-ico">💼</span>
            <span class="social-text"><strong>LinkedIn</strong> /valerio-serani-682a48215</span>
          </a>
          <a class="social-item" href="${mt}" target="_blank" rel="noopener noreferrer">
            <span class="social-ico">📸</span>
            <span class="social-text"><strong>Instagram</strong> @velvet_172</span>
          </a>
          <a class="social-item" href="${pt}" target="_blank" rel="noopener noreferrer">
            <span class="social-ico">🎵</span>
            <span class="social-text"><strong>TikTok</strong> @heyits172</span>
          </a>
          <a class="social-item" href="${ut}" target="_blank" rel="noopener noreferrer">
            <span class="social-ico">🎬</span>
            <span class="social-text"><strong>Vimeo</strong> /user95787021</span>
          </a>
          <a class="social-item" href="${gt}" target="_blank" rel="noopener noreferrer">
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
    `}};function vt(e){const o=q["#videos"]?.sections||[];return o.length?o.find(i=>i.id===e)||o[0]:null}function $e(){if(!h||!k||!E)return;const e=q["#videos"],t=e?.sections||[];if(!t.length)return;u.videoSectionId=null,E.classList.remove("is-video-detail"),k.textContent=e.title;const o=t.map(i=>{const s=i.hubThumb||i.hero?.src,c=s?` style="--thumb:url('${s}')"`:"";return`
        <button class="wii-card video-hub-card" type="button" data-video-section="${i.id}">
          <div class="video-hub-thumb"${c} aria-hidden="true">
            ${i.hubLabel?`<span class="video-hub-label">${i.hubLabel}</span>`:""}
          </div>
          <div class="video-hub-copy">
            <h3>${i.title}</h3>
            ${i.hubDesc?`<p>${i.hubDesc}</p>`:""}
          </div>
        </button>
      `}).join("");h.innerHTML=`<div class="video-hub">${o}</div>`,h.scrollTop=0}function ft(e){if(!h||!k||!E)return;const t=vt(e);if(!t)return;u.videoSectionId=t.id,k.textContent=t.title,E.classList.add("is-video-detail");const o=t.hero?.src?` style="--hero:url('${t.hero.src}')"`:"",i=t.hero?.alt?` role="img" aria-label="${t.hero.alt}"`:"",s=(t.videos||[]).map(c=>{const a=!!c.src,d=!!c.static,g=c.poster||t.hero?.src||"",f=g?` style="--thumb:url('${g}')"`:"";return`
        <button class="video-feed-item" type="button"${a?` data-video-open data-video-src="${c.src}"${g?` data-video-poster="${g}"`:""}`:d&&g?` data-image-open data-image-src="${g}"`:""}${a||d?"":" disabled"}>
          <div class="video-feed-thumb"${f}>
            ${a?'<span class="video-feed-play">▶</span>':""}
            ${a||d?"":'<span class="video-feed-badge">In arrivo</span>'}
          </div>
          <div class="video-feed-meta">
            <h4>${c.title}</h4>
            ${c.desc?`<p>${c.desc}</p>`:""}
          </div>
        </button>
      `}).join("");h.innerHTML=`
    <div class="video-detail">
      <div class="video-hero"${o}${i}>
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
  `,h.scrollTop=0}function ht(){if(!h)return;const e=q["#projects"],o=(e.projects[u.projectIndex]||e.projects[0])?.slides||[];if(!o.length)return;u.slideIndex=tt(u.slideIndex,0,o.length-1),h.innerHTML=`
  <div class="chCarousel" data-channel="#projects">
    <div class="chStage">
      <div class="chFrame" data-ch-frame>
        ${o.map((c,a)=>`
              <img class="chMedia ${a===u.slideIndex?"is-on":""}"
                   src="${c.src}" alt="" loading="lazy" decoding="async">
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
`;const i={frame:h.querySelector("[data-ch-frame]"),imgs:Array.from(h.querySelectorAll(".chMedia")),more:h.querySelector(".chMore"),moreContent:h.querySelector(".chMoreContent"),capClient:h.querySelector('[data-cap="client"]'),capTitle:h.querySelector('[data-cap="title"]'),capWhat:h.querySelector('[data-cap="what"]')};u.dom=i,he(o,u.slideIndex);const s=h.querySelector('[data-ch="more"]');s&&(s.textContent="Scopri di più")}function he(e,t){const o=e[t],i=u.dom;!o||!i||(i.capClient&&(i.capClient.textContent=o.client||""),i.capTitle&&(i.capTitle.textContent=o.title||""),i.capWhat&&(i.capWhat.textContent=o.what||""),i.frame&&i.frame.style.setProperty("--ch-bg",`url("${o.src}")`),i.moreContent&&(i.moreContent.innerHTML=o.moreHtml||""))}function de(){return!!u.dom?.frame?.classList.contains("is-more")}function bt(e){const t=u.dom;!t?.frame||!t?.more||(t.frame.classList.add("is-more"),t.more.classList.add("is-open"),t.more.setAttribute("aria-hidden","false"),he(e,u.slideIndex))}function X(){const e=u.dom;!e?.frame||!e?.more||(e.frame.classList.remove("is-more"),e.more.classList.remove("is-open"),e.more.setAttribute("aria-hidden","true"))}function Et(){Ge();const e=h?.querySelector(".bioCarousel"),t=h?.querySelector(".wii-card"),o=e?Array.from(e.querySelectorAll(".bioMedia")):[];if(!e||!o.length)return;t&&t.classList.add("bio-no-blur");let i=0;const s=()=>{o.forEach((a,d)=>a.classList.toggle("is-on",d===i));const c=o[i]?.getAttribute("src");c&&e.style.setProperty("--bio-bg",`url("${c}")`)};s(),K=window.setInterval(()=>{i=(i+1)%o.length,s()},3e3),t&&t.classList.add("bio-no-blur")}function Ge(){K&&(clearInterval(K),K=null)}function _e(e){if(!E||!k||!h)return;u.href=e,E.classList.toggle("is-game",e==="#minigame"),E.classList.toggle("is-carousel",e==="#projects"),E.classList.toggle("is-about",e==="#about"),E.classList.toggle("is-exp",e==="#exp"),E.classList.toggle("is-videos",e==="#videos");const t=q[e]||{title:"Canale",html:'<div class="wii-card"><h3>Coming soon</h3><p>Contenuto in arrivo.</p></div>'};k.textContent=t.title,e==="#projects"&&t.projects?(u.projectIndex=0,u.slideIndex=0,u.dom=null,ht()):e==="#about"?(h.innerHTML=t.html||"",Et()):e==="#videos"&&t.sections?$e():h.innerHTML=t.html||"",E.classList.add("is-open"),E.setAttribute("aria-hidden","false"),e==="#minigame"?requestAnimationFrame(()=>{Tt()&&oe()}):ae(!1),G()}function ne(){E&&(X(),be(),ae(!1),Ge(),u.videoSectionId=null,E.classList.remove("is-open","is-game","is-carousel","is-videos","is-video-detail"),E.setAttribute("aria-hidden","true"),G())}function yt(){if(u.href==="#videos"&&E?.classList.contains("is-video-detail")){$e();return}ne()}Ce&&Ce.addEventListener("click",yt);function xe(e){!P||!ee||!e||(document.body?.classList.add("is-img-viewer-open"),ee.src=e,P.classList.add("is-open"),P.setAttribute("aria-hidden","false"))}function qe(){!P||!ee||(document.body?.classList.remove("is-img-viewer-open"),P.classList.remove("is-open"),P.setAttribute("aria-hidden","true"),ee.src="")}P&&P.addEventListener("click",qe);function wt(e,t){if(!(!S||!L||!e)){document.body?.classList.add("is-video-viewer-open"),H=!!(O&&A),H&&je(),L.src=e,t?L.setAttribute("poster",t):L.removeAttribute("poster"),S.classList.add("is-open"),S.setAttribute("aria-hidden","false");try{L.currentTime=0}catch{}L.play().catch(()=>{})}}function be(){!S||!L||(document.body?.classList.remove("is-video-viewer-open"),S.classList.remove("is-open"),S.setAttribute("aria-hidden","true"),L.pause(),L.removeAttribute("src"),L.load(),H&&O?(H=!1,$(),j(),_()):H=!1)}S&&S.addEventListener("click",e=>{e.target===S&&be()});E&&E.addEventListener("click",e=>{e.target===E&&ne()});document.addEventListener("keydown",e=>{if(e.key==="Escape"&&S?.classList.contains("is-open")){be();return}if(e.key==="Escape"&&P?.classList.contains("is-open")){qe();return}e.key==="Escape"&&E?.classList.contains("is-open")&&ne()});document.addEventListener("click",e=>{if(!N)return;if(performance.now()<B){e.preventDefault(),e.stopPropagation();return}const t=e.target?.closest?.(".wii-tile");if(!t)return;const o=t.getAttribute("data-href")||t.getAttribute("href");o&&o.startsWith("#")&&(e.preventDefault(),_e(o))});Z&&Z.addEventListener("click",e=>{N&&(performance.now()<B||(e.preventDefault(),_e("#minigame")))});h?.addEventListener("click",e=>{if(u.href==="#videos"){const d=e.target?.closest?.("[data-video-section]");if(d){const y=d.getAttribute("data-video-section");y&&ft(y);return}const g=e.target?.closest?.("[data-image-open]");if(g){const y=g.getAttribute("data-image-src");y&&xe(y);return}const f=e.target?.closest?.("[data-video-open]");if(f){const y=f.getAttribute("data-video-src");if(y){const R=f.getAttribute("data-video-poster")||"";wt(y,R)}return}}if(u.href==="#projects"&&e.target?.closest?.("[data-ch-frame]")){const f=u.dom?.imgs?.find(y=>y.classList.contains("is-on"))?.getAttribute("src");if(f){e.preventDefault(),e.stopPropagation(),xe(f);return}}const t=e.target?.closest?.("[data-ch]"),o=t?.getAttribute("data-ch");if(e.target?.closest?.("[data-ch-frame]")&&de()&&!t){X();const d=h.querySelector('[data-ch="more"]');d&&(d.textContent="Scopri di più");return}if(!o||u.href!=="#projects")return;const s=q["#projects"],a=(s.projects[u.projectIndex]||s.projects[0])?.slides||[];if(a.length){if(o==="more"){de()?(X(),t.textContent="Scopri di più"):(bt(a),t.textContent="Chiudi");return}if(o==="prev"||o==="next"){if(de()){X();const d=h.querySelector('[data-ch="more"]');d&&(d.textContent="Scopri di più")}o==="prev"?u.slideIndex=(u.slideIndex-1+a.length)%a.length:u.slideIndex=(u.slideIndex+1)%a.length,u.dom?.imgs?.forEach((d,g)=>d.classList.toggle("is-on",g===u.slideIndex)),he(a,u.slideIndex);return}}});let ge=0,ve=0,Y=0,J=0,fe=!1,Ne=!1,te="mouse",ie=null;function It(){T&&(fe||(fe=!0,T.style.opacity="1"))}function Fe(){T&&(fe=!1,T.style.opacity="0")}function Ue(){Y+=(ge-Y)*.42,J+=(ve-J)*.42;const e=-10,t=-4;T&&(T.style.transform=`translate3d(${Y+e}px, ${J+t}px, 0)`),requestAnimationFrame(Ue)}requestAnimationFrame(Ue);window.addEventListener("pointermove",e=>{if(te=e.pointerType||"mouse",te!=="mouse"){Fe();return}ge=e.clientX,ve=e.clientY,Ne||(Y=ge,J=ve,Ne=!0),It()});window.addEventListener("mouseleave",()=>Fe());const We=".wii-tile, .wii-pill";function Qe(e){T&&T.classList.toggle("is-hover",e)}document.addEventListener("pointerover",e=>{if(te!=="mouse")return;const t=e.target?.closest?.(We);t&&t!==ie&&(ie=t,Qe(!0),dt())});document.addEventListener("pointerout",e=>{const t=e.target?.closest?.(We);if(t&&t===ie){const o=e.relatedTarget;if(o&&t.contains(o))return;ie=null,Qe(!1)}});document.addEventListener("pointerdown",()=>{O&&($(),j(),_()),!(!T||te!=="mouse")&&(T.classList.add("is-down"),G())});document.addEventListener("pointerup",()=>{T&&T.classList.remove("is-down")});let n={running:!1,score:0,timeLeft:30,lastTs:0,spawnAcc:0,bubbles:[],rafId:null,timerId:null,canvas:null,ctx:null,scoreEl:null,timeEl:null,overEl:null,overScoreEl:null,overRestartBtn:null,overCloseBtn:null};function Ee(){n.overEl&&(n.overEl.classList.remove("is-show"),n.overEl.setAttribute("aria-hidden","true"))}function At(){n.overEl&&(n.overScoreEl&&(n.overScoreEl.textContent=String(n.score)),n.overEl.classList.add("is-show"),n.overEl.setAttribute("aria-hidden","false"))}function Tt(){n.canvas=document.getElementById("mgCanvas"),n.scoreEl=document.getElementById("mgScore"),n.timeEl=document.getElementById("mgTime"),n.overEl=document.getElementById("mgOver"),n.overScoreEl=document.getElementById("mgOverScore"),n.overRestartBtn=document.getElementById("mgOverRestart"),n.overCloseBtn=document.getElementById("mgOverClose");const e=document.getElementById("mgStart"),t=document.getElementById("mgReset");return n.canvas?(n.ctx=n.canvas.getContext("2d"),Ee(),n.overRestartBtn&&(n.overRestartBtn.onclick=()=>{oe(),ke()}),n.overCloseBtn&&(n.overCloseBtn.onclick=()=>ne()),n.canvas.onpointerdown=o=>{if(!n.running)return;const i=n.canvas.getBoundingClientRect(),s=(o.clientX-i.left)/i.width*n.canvas.width,c=(o.clientY-i.top)/i.height*n.canvas.height;for(let a=n.bubbles.length-1;a>=0;a--){const d=n.bubbles[a],g=s-d.x,f=c-d.y;if(g*g+f*f<=d.r*d.r){n.bubbles.splice(a,1),n.score+=1,n.scoreEl&&(n.scoreEl.textContent=String(n.score)),Lt();return}}},e&&(e.onclick=()=>ke()),t&&(t.onclick=()=>oe()),ye(),!0):!1}function ye(){if(!n.canvas)return;const e=Math.min(window.devicePixelRatio||1,2),t=n.canvas.clientWidth,o=n.canvas.clientHeight;if(!t||!o)return;const i=Math.round(t*e),s=Math.round(o*e);(n.canvas.width!==i||n.canvas.height!==s)&&(n.canvas.width=i,n.canvas.height=s)}function oe(){ae(!1),Ee(),n.score=0,n.timeLeft=30,n.bubbles=[],n.scoreEl&&(n.scoreEl.textContent="0"),n.timeEl&&(n.timeEl.textContent="30"),Xe()}function ke(){n.running||(n.timeLeft<=0&&oe(),Ee(),n.running=!0,n.lastTs=performance.now(),n.spawnAcc=0,n.timerId=window.setInterval(()=>{n.running&&(n.timeLeft-=1,n.timeEl&&(n.timeEl.textContent=String(n.timeLeft)),n.timeLeft<=0&&(n.timeLeft=0,n.timeEl&&(n.timeEl.textContent="0"),ae(!0)))},1e3),n.rafId=requestAnimationFrame(Ke))}function ae(e=!1){n.running=!1,n.timerId&&(clearInterval(n.timerId),n.timerId=null),n.rafId&&(cancelAnimationFrame(n.rafId),n.rafId=null),e&&(At(),St())}function Ot(){if(!n.canvas)return;const e=n.canvas.width,t=n.canvas.height,o=22+Math.random()*26,i=o+Math.random()*(e-o*2),s=o+Math.random()*(t-o*2),c=(-.25+Math.random()*.5)*(window.devicePixelRatio||1),a=(-.15+Math.random()*.35)*(window.devicePixelRatio||1),d=3.2+Math.random()*1.8;n.bubbles.push({x:i,y:s,r:o,vx:c,vy:a,born:performance.now(),life:d})}function Ke(e){if(!n.running)return;const t=Math.min((e-n.lastTs)/1e3,.05);n.lastTs=e,ye();const i=.55/(1+(30-n.timeLeft)*.03);for(n.spawnAcc+=t;n.spawnAcc>=i;)n.spawnAcc-=i,Ot();const s=performance.now();for(let c=n.bubbles.length-1;c>=0;c--){const a=n.bubbles[c];a.x+=a.vx*60*t,a.y+=a.vy*60*t,a.x-a.r<0&&(a.x=a.r,a.vx*=-1),a.x+a.r>n.canvas.width&&(a.x=n.canvas.width-a.r,a.vx*=-1),a.y-a.r<0&&(a.y=a.r,a.vy*=-1),a.y+a.r>n.canvas.height&&(a.y=n.canvas.height-a.r,a.vy*=-1),(s-a.born)/1e3>a.life&&n.bubbles.splice(c,1)}Xe(),n.rafId=requestAnimationFrame(Ke)}function Xe(){if(!n.ctx||!n.canvas)return;const e=n.ctx,t=n.canvas.width,o=n.canvas.height;e.clearRect(0,0,t,o),e.fillStyle="rgba(255,255,255,0.22)",e.fillRect(0,0,t,o);for(const i of n.bubbles){const s=e.createRadialGradient(i.x-i.r*.35,i.y-i.r*.35,i.r*.2,i.x,i.y,i.r);s.addColorStop(0,"rgba(255,255,255,0.95)"),s.addColorStop(.35,"rgba(255,255,255,0.35)"),s.addColorStop(1,"rgba(43,184,255,0.18)"),e.beginPath(),e.arc(i.x,i.y,i.r,0,Math.PI*2),e.fillStyle=s,e.fill(),e.lineWidth=2,e.strokeStyle="rgba(43,184,255,0.35)",e.stroke(),e.beginPath(),e.arc(i.x-i.r*.25,i.y-i.r*.25,i.r*.28,0,Math.PI*2),e.fillStyle="rgba(255,255,255,0.28)",e.fill()}}function Lt(){const e=D();if(!e)return;const t=e.currentTime,o=e.createOscillator(),i=e.createGain();o.type="sine",o.frequency.setValueAtTime(620,t),o.frequency.exponentialRampToValueAtTime(280,t+.06),i.gain.setValueAtTime(1e-4,t),i.gain.exponentialRampToValueAtTime(.08,t+.008),i.gain.exponentialRampToValueAtTime(1e-4,t+.1),o.connect(i),i.connect(e.destination),o.start(t),o.stop(t+.12)}function St(){const e=D();if(!e)return;const t=e.currentTime;[880,740,622].forEach((i,s)=>{const c=e.createOscillator(),a=e.createGain(),d=t+s*.12;c.type="triangle",c.frequency.setValueAtTime(i,d),a.gain.setValueAtTime(1e-4,d),a.gain.exponentialRampToValueAtTime(.06,d+.01),a.gain.exponentialRampToValueAtTime(1e-4,d+.16),c.connect(a),a.connect(e.destination),c.start(d),c.stop(d+.18)})}window.addEventListener("resize",()=>{document.getElementById("mgCanvas")&&ye(),He(),x()});function me(){N||(N=!0,z&&(z.classList.add("is-fading"),z.setAttribute("aria-hidden","true"),window.setTimeout(()=>{z.classList.add("is-hidden")},nt),window.setTimeout(()=>{document.body?.classList.remove("is-intro-locked")},at)),B=Math.max(B,performance.now()+ot),O&&($(),j(),_()),G(),x())}function Ct(){if(!z){N=!0;return}document.body?.classList.add("is-intro-locked"),z.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),me()}),z.addEventListener("pointerdown",e=>{e.pointerType!=="touch"&&(e.preventDefault(),e.stopPropagation(),me())}),window.addEventListener("keydown",e=>{N||(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),me())})}function we(){const e=window.visualViewport?.height||window.innerHeight;document.documentElement.style.setProperty("--vh",`${e}px`)}rt();C&&C.classList.add("is-swoosh-in");Be();setInterval(Be,1e3);Ct();we();window.addEventListener("resize",we);window.visualViewport?.addEventListener("resize",we);Q.addEventListener?(Q.addEventListener("change",x),pe.addEventListener("change",x)):(Q.addListener(x),pe.addListener(x));
