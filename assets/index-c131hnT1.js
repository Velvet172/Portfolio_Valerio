(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function o(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=o(s);fetch(s.href,r)}})();const Ye="/Portfolio_Valerio/",c=e=>`${Ye}${e.replace(/^\/+/,"")}`,F=window.matchMedia("(max-width: 640px)"),de=window.matchMedia("(prefers-reduced-motion: reduce)"),P=document.getElementById("wiiIntro");let z=!1;const O=document.getElementById("grid");document.getElementById("board");const Ae=document.getElementById("time"),Le=document.getElementById("date"),q=document.getElementById("btnLeft"),X=document.getElementById("btnRight"),g=document.getElementById("wiiOverlay"),Oe=document.getElementById("overlayBack"),R=document.getElementById("overlayTitle"),m=document.getElementById("overlayBody"),y=document.getElementById("wiiPointer"),C=document.getElementById("imgViewer"),Y=document.getElementById("imgViewerSrc"),L=document.getElementById("videoViewer"),A=document.getElementById("videoViewerSrc");let pe=[];function Je(e,t,o){return Math.max(t,Math.min(o,e))}const Ze=[[{icon:"👋",t:"Chi sono",s:"Bio + competenze",href:"#about",previews:[c("img/BIO/BIO_1.jpg"),c("img/BIO/BIO_2.jpg"),c("img/BIO/BIO_3.jpg")]},{icon:"🎓",t:"Esperienze",s:"Formazione / studi",href:"#exp"},{icon:"📬",t:"Contatti",s:"Mail e social",href:"#contact"},{icon:"🧩",t:"Progetti",s:"Case study e lavori",href:"#projects",previews:[c("img/PROGETTI/PROG_1.jpg"),c("img/PROGETTI/PROG_2.jpg"),c("img/PROGETTI/PROG_3.jpg")]},{icon:"📱",t:"Social",s:"I miei profili",href:"#social"},{icon:"🎬",t:"Video",s:"Social e progetti",href:"#videos",previewAnim:"wiiPreviewFadeTight",previews:[c("img/CHANNELS/VIDEO/VIDEO PROMO_3-frame.jpg"),c("img/CHANNELS/VIDEO/meschia-cover.jpg"),c("img/CHANNELS/VIDEO/PROGETTI PERSONALI_2-frame.jpg"),c("img/CHANNELS/VIDEO/REQUIEM LOCANDINA.jpg")]},{icon:"🛠️",t:"Skills",s:"Cosa so fare",href:"#tools"},{icon:"🤖",t:"AI",s:"Workflow",href:"#ai",previewVideo:{src:c("img/CHANNELS/ai.mp4"),poster:c("img/CHANNELS/ai-frame.jpg")}},{icon:"📌",t:"Servizi",s:"Cosa offro",href:"#services",previewVideo:{src:c("img/CHANNELS/servizi.mp4"),poster:c("img/CHANNELS/servizi-frame.jpg")}}],[{icon:"📷",t:"Galleria",s:"Foto e frame",href:"#gallery"},{icon:"🗂️",t:"Archivio",s:"Lavori passati",href:"#archive"},{icon:"📝",t:"Blog",s:"Note e making-of",href:"#blog"},{icon:"📍",t:"Dove sono",s:"Roma / contatti",href:"#where"}]];let H=0;const et=420,tt=320,it=900;function ot(){return Ze[0]}function nt(){if(!O)return;const e=ot();O.innerHTML=e.map(t=>{const o=t.previewVideo?.src,i=t.previewVideo?.poster,s=Array.isArray(t.previews)?t.previews:[],a=!o&&!s.length?"wii-tile wii-tile--iconPreview":"wii-tile",l=i?` poster="${i}"`:"",p=i?` style="--preview-poster:url('${i}')"`:"",u=s.length>1?` style="--preview-step:3s; --preview-duration:${s.length*3}s${t.previewAnim?`; --preview-anim:${t.previewAnim}`:""}"`:"",f=o?`
          <div class="wii-preview wii-preview--single wii-preview--video"${p} aria-hidden="true">
            <video class="preview-video" src="${t.previewVideo.src}"${l} muted loop playsinline preload="metadata"></video>
          </div>
        `:s.length?`
          <div class="wii-preview ${s.length===1?"wii-preview--single":""}"${u} aria-hidden="true">
            ${s.map(T=>`<img src="${T}" alt="" loading="lazy" decoding="async">`).join("")}
          </div>
        `:`
          <div class="wii-preview wii-preview--icon" aria-hidden="true">
            <span>${t.icon}</span>
          </div>
        `;return`
        <a class="${a}" href="${t.href}" data-href="${t.href}">
          ${f}
          <div class="wii-tileContent">
            <div class="wii-icon">${t.icon}</div>
            <div class="wii-tileText">
              <div class="wii-title">${t.t}</div>
              <div class="wii-sub">${t.s}</div>
            </div>
          </div>
        </a>
      `}).join(""),at(),st(),xe(),V()}function at(){if(!O)return;Array.from(O.querySelectorAll(".wii-preview:not(.wii-preview--single)")).forEach((t,o)=>{const i=window.getComputedStyle(t),s=parseFloat(i.getPropertyValue("--preview-duration"))||12,r=parseFloat(i.getPropertyValue("--preview-step"))||4,a=(o+1)*r*1.618%s;t.style.setProperty("--preview-phase",`-${a.toFixed(2)}s`)})}function xe(){if(!O)return;Array.from(O.querySelectorAll(".wii-preview--video")).forEach(t=>{const o=t.closest(".wii-tile");if(!o)return;const i=o.getBoundingClientRect();if(!i.height)return;const s=i.width/i.height,r=Math.max(1,Math.min(s,16/9));t.style.setProperty("--video-zoom",r.toFixed(3))})}function st(){if(!O)return;const e=Array.from(O.querySelectorAll(".wii-preview--video"));pe=[],e.forEach(t=>{const o=t.closest(".wii-tile");if(!o)return;const i=t.querySelector(".preview-video");if(!i)return;pe.push({preview:t,video:i}),i.muted=!0,i.loop=!0,i.setAttribute("playsinline","");const s=()=>{if(t.classList.add("is-ready"),i.paused)try{i.currentTime=0}catch{}};i.addEventListener("loadeddata",s,{once:!0});const r=()=>{t.classList.add("is-hover"),i.currentTime=0,i.play().catch(()=>{})},a=()=>{i.pause(),i.currentTime=0,t.classList.remove("is-hover")};o.addEventListener("mouseenter",r),o.addEventListener("mouseleave",a),o.addEventListener("pointerenter",r),o.addEventListener("pointerleave",a),o.addEventListener("focusin",r),o.addEventListener("focusout",a)})}function V(){const e=F.matches&&!de.matches;pe.forEach(({preview:t,video:o})=>{if(e)t.classList.add("is-auto"),o.play().catch(()=>{});else{t.classList.remove("is-auto"),o.pause();try{o.currentTime=0}catch{}}})}function Ne(){if(!Ae||!Le)return;const e=new Date,t=String(e.getHours()).padStart(2,"0"),o=String(e.getMinutes()).padStart(2,"0");Ae.textContent=`${t}:${o}`;const i=["Dom","Lun","Mar","Mer","Gio","Ven","Sab"],s=["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"],r=e.getDate(),a=i[e.getDay()],l=s[e.getMonth()];Le.textContent=`${a} ${r} ${l}`}let S=null,I=!0,Se=!1,Ce=0;function D(){return I?(S||(S=new(window.AudioContext||window.webkitAudioContext)),S.state==="suspended"&&S.resume().catch(()=>{}),S):null}function k(){const e=D();if(e){e.state==="suspended"&&e.resume().catch(()=>{});try{const t=e.createBuffer(1,1,e.sampleRate),o=e.createBufferSource();o.buffer=t,o.connect(e.destination),o.start(0)}catch{}}}function B(){Se||(Se=!0,k())}function He({type:e="sine",freq:t=700,duration:o=.05,gain:i=.04,attack:s=.002,release:r=.035}={}){const a=D();if(!a)return;const l=a.currentTime,p=a.createOscillator(),u=a.createGain();p.type=e,p.frequency.setValueAtTime(t,l),u.gain.setValueAtTime(0,l),u.gain.linearRampToValueAtTime(i,l+s),u.gain.exponentialRampToValueAtTime(1e-4,l+s+r),p.connect(u),u.connect(a.destination),p.start(l),p.stop(l+o+r+.02)}function rt(){const e=performance.now();e-Ce<120||(Ce=e,He({type:"sine",freq:880,duration:.03,gain:.026,attack:.002,release:.03}))}function j(){He({type:"triangle",freq:520,duration:.03,gain:.05,attack:.001,release:.02})}let b=null,N=!1;function $(){const e=D();if(!e||b)return;const t=e.createGain();t.gain.value=0,t.connect(e.destination);const o=e.createDelay(.35);o.delayTime.value=.18;const i=e.createGain();i.gain.value=.2,o.connect(i),i.connect(o);const s=e.createGain();s.gain.value=.25;const r=e.createBiquadFilter();r.type="lowpass",r.frequency.value=2600,r.Q.value=.7,r.connect(t),r.connect(o),o.connect(s),s.connect(t);const a=e.createOscillator();a.type="sine",a.frequency.value=130.81;const l=e.createGain();l.gain.value=1e-4,a.connect(l),l.connect(r);const p=e.createOscillator();p.type="sine",p.frequency.value=.08;const u=e.createGain();u.gain.value=.007,p.connect(u),u.connect(l.gain);const f=e.currentTime;a.start(f),p.start(f);function T(M,v,x=.05){const h=e.createOscillator(),E=e.createGain(),w=e.createBiquadFilter();h.type="triangle",h.frequency.setValueAtTime(M,v),w.type="highpass",w.frequency.setValueAtTime(240,v),E.gain.setValueAtTime(1e-4,v),E.gain.exponentialRampToValueAtTime(x,v+.01),E.gain.exponentialRampToValueAtTime(1e-4,v+.22),h.connect(w),w.connect(E),E.connect(r),h.start(v),h.stop(v+.3)}function be(M,v,x=.018){const h=e.createOscillator(),E=e.createGain(),w=e.createBiquadFilter();h.type="sine",h.frequency.setValueAtTime(M,v),w.type="lowpass",w.frequency.setValueAtTime(520,v),E.gain.setValueAtTime(1e-4,v),E.gain.exponentialRampToValueAtTime(x,v+.008),E.gain.exponentialRampToValueAtTime(1e-4,v+.18),h.connect(w),w.connect(E),E.connect(r),h.start(v),h.stop(v+.22)}const G=[{tones:[261.63,329.63,392],bass:130.81},{tones:[349.23,440,523.25],bass:174.61},{tones:[220,261.63,329.63],bass:110},{tones:[196,246.94,293.66],bass:98}],oe=[[0,1,2,1,0,2,1,2],[0,2,1,2,0,1,2,1],[0,1,0,2,1,2,1,0]],Qe=300,ye=8,Ke=2;let ne=0,ae=0,se=0,re=0;function Ie(){if(!I||!S||!b)return;const M=S.currentTime,v=G[se%G.length],x=oe[re%oe.length],h=ne%ye,E=x[h]%v.tones.length,w=v.tones[E],Xe=h===0?.058:h===4?.05:.04;T(w,M+.01,Xe),h===0&&be(v.bass,M+.01,.016),Math.random()<.1&&T(w*2,M+.06,.026),ne+=1,ne%ye===0&&(ae+=1,ae%2===0&&(re=(re+1)%oe.length),ae%Ke===0&&(se=(se+1)%G.length)),b.timerId=window.setTimeout(Ie,Qe)}b={musicGain:t,lp:r,delay:o,fb:i,delayMix:s,drone:a,droneGain:l,lfo:p,timerId:null},Ie(),t.gain.setTargetAtTime(.4,e.currentTime,.7)}function De(){if(!S||!b)return;const e=S.currentTime;b.timerId&&clearTimeout(b.timerId),b.musicGain.gain.setTargetAtTime(1e-4,e,.25),setTimeout(()=>{try{b.drone?.stop()}catch{}try{b.lfo?.stop()}catch{}b=null},400)}q&&(q.textContent="🔊",q.addEventListener("click",()=>{z&&(performance.now()<H||(I=!I,q.textContent=I?"🔊":"🔇",I?(B(),k(),$(),j()):De()))}));X&&(X.textContent="🎮");["pointerdown","touchstart","mousedown"].forEach(e=>{window.addEventListener(e,()=>{I&&(B(),$())},{once:!0,passive:!0})});const d={href:null,projectIndex:0,slideIndex:0,dom:null,videoSectionId:null};let U=null;const Te="https://www.linkedin.com/in/valerio-serani-682a48215/",ct="https://www.instagram.com/velvet_172/",lt="https://www.tiktok.com/@heyits172",dt="https://vimeo.com/user95787021",pt="https://www.behance.net/velvet172",Me="valerioserani@gmail.com",Pe="+39 3469697747",_={"#projects":{title:"Progetti",projects:[{id:"bestof",slides:[{src:c("img/PROGETTI/PROG_1.jpg"),client:"Sunsilk",title:"Materiali promozionali",what:"Creativity + layout",moreHtml:`
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
        <p><strong>Email</strong>: <a href="mailto:${Me}">${Me}</a></p>
        <p><strong>Telefono</strong>: <a href="tel:${Pe.replace(/\s+/g,"")}">${Pe}</a></p>
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
          <a class="wii-link" href="${Te}" target="_blank" rel="noopener noreferrer">
            Apri profilo LinkedIn
          </a>
        </div>
      </div>
    `},"#social":{title:"Social",html:`
      <div class="wii-card">
        <h3>Canali social</h3>
        <p>Qui trovi tutti i miei social: raccontano la mia parte più professionale e quella più ludica. Passione e lavoro sono sempre andati di pari passo nella mia vita, e qui li vedi convivere.</p>
        <div class="social-list">
          <a class="social-item" href="${Te}" target="_blank" rel="noopener noreferrer">
            <span class="social-ico">💼</span>
            <span class="social-text"><strong>LinkedIn</strong> /valerio-serani-682a48215</span>
          </a>
          <a class="social-item" href="${ct}" target="_blank" rel="noopener noreferrer">
            <span class="social-ico">📸</span>
            <span class="social-text"><strong>Instagram</strong> @velvet_172</span>
          </a>
          <a class="social-item" href="${lt}" target="_blank" rel="noopener noreferrer">
            <span class="social-ico">🎵</span>
            <span class="social-text"><strong>TikTok</strong> @heyits172</span>
          </a>
          <a class="social-item" href="${dt}" target="_blank" rel="noopener noreferrer">
            <span class="social-ico">🎬</span>
            <span class="social-text"><strong>Vimeo</strong> /user95787021</span>
          </a>
          <a class="social-item" href="${pt}" target="_blank" rel="noopener noreferrer">
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
    `}};function mt(e){const o=_["#videos"]?.sections||[];return o.length?o.find(i=>i.id===e)||o[0]:null}function ke(){if(!m||!R||!g)return;const e=_["#videos"],t=e?.sections||[];if(!t.length)return;d.videoSectionId=null,g.classList.remove("is-video-detail"),R.textContent=e.title;const o=t.map(i=>{const s=i.hubThumb||i.hero?.src,r=s?` style="--thumb:url('${s}')"`:"";return`
        <button class="wii-card video-hub-card" type="button" data-video-section="${i.id}">
          <div class="video-hub-thumb"${r} aria-hidden="true">
            ${i.hubLabel?`<span class="video-hub-label">${i.hubLabel}</span>`:""}
          </div>
          <div class="video-hub-copy">
            <h3>${i.title}</h3>
            ${i.hubDesc?`<p>${i.hubDesc}</p>`:""}
          </div>
        </button>
      `}).join("");m.innerHTML=`<div class="video-hub">${o}</div>`,m.scrollTop=0}function ut(e){if(!m||!R||!g)return;const t=mt(e);if(!t)return;d.videoSectionId=t.id,R.textContent=t.title,g.classList.add("is-video-detail");const o=t.hero?.src?` style="--hero:url('${t.hero.src}')"`:"",i=t.hero?.alt?` role="img" aria-label="${t.hero.alt}"`:"",s=(t.videos||[]).map(r=>{const a=!!r.src,l=!!r.static,p=r.poster||t.hero?.src||"",u=p?` style="--thumb:url('${p}')"`:"";return`
        <button class="video-feed-item" type="button"${a?` data-video-open data-video-src="${r.src}"${p?` data-video-poster="${p}"`:""}`:l&&p?` data-image-open data-image-src="${p}"`:""}${a||l?"":" disabled"}>
          <div class="video-feed-thumb"${u}>
            ${a?'<span class="video-feed-play">▶</span>':""}
            ${a||l?"":'<span class="video-feed-badge">In arrivo</span>'}
          </div>
          <div class="video-feed-meta">
            <h4>${r.title}</h4>
            ${r.desc?`<p>${r.desc}</p>`:""}
          </div>
        </button>
      `}).join("");m.innerHTML=`
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
  `,m.scrollTop=0}function gt(){if(!m)return;const e=_["#projects"],o=(e.projects[d.projectIndex]||e.projects[0])?.slides||[];if(!o.length)return;d.slideIndex=Je(d.slideIndex,0,o.length-1),m.innerHTML=`
  <div class="chCarousel" data-channel="#projects">
    <div class="chStage">
      <div class="chFrame" data-ch-frame>
        ${o.map((r,a)=>`
              <img class="chMedia ${a===d.slideIndex?"is-on":""}"
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
`;const i={frame:m.querySelector("[data-ch-frame]"),imgs:Array.from(m.querySelectorAll(".chMedia")),more:m.querySelector(".chMore"),moreContent:m.querySelector(".chMoreContent"),capClient:m.querySelector('[data-cap="client"]'),capTitle:m.querySelector('[data-cap="title"]'),capWhat:m.querySelector('[data-cap="what"]')};d.dom=i,ve(o,d.slideIndex);const s=m.querySelector('[data-ch="more"]');s&&(s.textContent="Scopri di più")}function ve(e,t){const o=e[t],i=d.dom;!o||!i||(i.capClient&&(i.capClient.textContent=o.client||""),i.capTitle&&(i.capTitle.textContent=o.title||""),i.capWhat&&(i.capWhat.textContent=o.what||""),i.frame&&i.frame.style.setProperty("--ch-bg",`url("${o.src}")`),i.moreContent&&(i.moreContent.innerHTML=o.moreHtml||""))}function ce(){return!!d.dom?.frame?.classList.contains("is-more")}function vt(e){const t=d.dom;!t?.frame||!t?.more||(t.frame.classList.add("is-more"),t.more.classList.add("is-open"),t.more.setAttribute("aria-hidden","false"),ve(e,d.slideIndex))}function W(){const e=d.dom;!e?.frame||!e?.more||(e.frame.classList.remove("is-more"),e.more.classList.remove("is-open"),e.more.setAttribute("aria-hidden","true"))}function ft(){Be();const e=m?.querySelector(".bioCarousel"),t=m?.querySelector(".wii-card"),o=e?Array.from(e.querySelectorAll(".bioMedia")):[];if(!e||!o.length)return;t&&t.classList.add("bio-no-blur");let i=0;const s=()=>{o.forEach((a,l)=>a.classList.toggle("is-on",l===i));const r=o[i]?.getAttribute("src");r&&e.style.setProperty("--bio-bg",`url("${r}")`)};s(),U=window.setInterval(()=>{i=(i+1)%o.length,s()},3e3),t&&t.classList.add("bio-no-blur")}function Be(){U&&(clearInterval(U),U=null)}function je(e){if(!g||!R||!m)return;d.href=e,g.classList.toggle("is-game",e==="#minigame"),g.classList.toggle("is-carousel",e==="#projects"),g.classList.toggle("is-about",e==="#about"),g.classList.toggle("is-exp",e==="#exp"),g.classList.toggle("is-videos",e==="#videos");const t=_[e]||{title:"Canale",html:'<div class="wii-card"><h3>Coming soon</h3><p>Contenuto in arrivo.</p></div>'};R.textContent=t.title,e==="#projects"&&t.projects?(d.projectIndex=0,d.slideIndex=0,d.dom=null,gt()):e==="#about"?(m.innerHTML=t.html||"",ft()):e==="#videos"&&t.sections?ke():m.innerHTML=t.html||"",g.classList.add("is-open"),g.setAttribute("aria-hidden","false"),e==="#minigame"?requestAnimationFrame(()=>{yt()&&ee()}):ie(!1),j()}function te(){g&&(W(),fe(),ie(!1),Be(),d.videoSectionId=null,g.classList.remove("is-open","is-game","is-carousel","is-videos","is-video-detail"),g.setAttribute("aria-hidden","true"),j())}function ht(){if(d.href==="#videos"&&g?.classList.contains("is-video-detail")){ke();return}te()}Oe&&Oe.addEventListener("click",ht);function Ve(e){!C||!Y||!e||(document.body?.classList.add("is-img-viewer-open"),Y.src=e,C.classList.add("is-open"),C.setAttribute("aria-hidden","false"))}function $e(){!C||!Y||(document.body?.classList.remove("is-img-viewer-open"),C.classList.remove("is-open"),C.setAttribute("aria-hidden","true"),Y.src="")}C&&C.addEventListener("click",$e);function Et(e,t){if(!(!L||!A||!e)){document.body?.classList.add("is-video-viewer-open"),N=!!(I&&b),N&&De(),A.src=e,t?A.setAttribute("poster",t):A.removeAttribute("poster"),L.classList.add("is-open"),L.setAttribute("aria-hidden","false");try{A.currentTime=0}catch{}A.play().catch(()=>{})}}function fe(){!L||!A||(document.body?.classList.remove("is-video-viewer-open"),L.classList.remove("is-open"),L.setAttribute("aria-hidden","true"),A.pause(),A.removeAttribute("src"),A.load(),N&&I?(N=!1,B(),k(),$()):N=!1)}L&&L.addEventListener("click",e=>{e.target===L&&fe()});g&&g.addEventListener("click",e=>{e.target===g&&te()});document.addEventListener("keydown",e=>{if(e.key==="Escape"&&L?.classList.contains("is-open")){fe();return}if(e.key==="Escape"&&C?.classList.contains("is-open")){$e();return}e.key==="Escape"&&g?.classList.contains("is-open")&&te()});document.addEventListener("click",e=>{if(!z)return;if(performance.now()<H){e.preventDefault(),e.stopPropagation();return}const t=e.target?.closest?.(".wii-tile");if(!t)return;const o=t.getAttribute("data-href")||t.getAttribute("href");o&&o.startsWith("#")&&(e.preventDefault(),je(o))});X&&X.addEventListener("click",e=>{z&&(performance.now()<H||(e.preventDefault(),je("#minigame")))});m?.addEventListener("click",e=>{if(d.href==="#videos"){const l=e.target?.closest?.("[data-video-section]");if(l){const f=l.getAttribute("data-video-section");f&&ut(f);return}const p=e.target?.closest?.("[data-image-open]");if(p){const f=p.getAttribute("data-image-src");f&&Ve(f);return}const u=e.target?.closest?.("[data-video-open]");if(u){const f=u.getAttribute("data-video-src");if(f){const T=u.getAttribute("data-video-poster")||"";Et(f,T)}return}}if(d.href==="#projects"&&e.target?.closest?.("[data-ch-frame]")){const u=d.dom?.imgs?.find(f=>f.classList.contains("is-on"))?.getAttribute("src");if(u){e.preventDefault(),e.stopPropagation(),Ve(u);return}}const t=e.target?.closest?.("[data-ch]"),o=t?.getAttribute("data-ch");if(e.target?.closest?.("[data-ch-frame]")&&ce()&&!t){W();const l=m.querySelector('[data-ch="more"]');l&&(l.textContent="Scopri di più");return}if(!o||d.href!=="#projects")return;const s=_["#projects"],a=(s.projects[d.projectIndex]||s.projects[0])?.slides||[];if(a.length){if(o==="more"){ce()?(W(),t.textContent="Scopri di più"):(vt(a),t.textContent="Chiudi");return}if(o==="prev"||o==="next"){if(ce()){W();const l=m.querySelector('[data-ch="more"]');l&&(l.textContent="Scopri di più")}o==="prev"?d.slideIndex=(d.slideIndex-1+a.length)%a.length:d.slideIndex=(d.slideIndex+1)%a.length,d.dom?.imgs?.forEach((l,p)=>l.classList.toggle("is-on",p===d.slideIndex)),ve(a,d.slideIndex);return}}});let me=0,ue=0,Q=0,K=0,ge=!1,ze=!1,J="mouse",Z=null;function wt(){y&&(ge||(ge=!0,y.style.opacity="1"))}function _e(){y&&(ge=!1,y.style.opacity="0")}function Ge(){Q+=(me-Q)*.42,K+=(ue-K)*.42;const e=-10,t=-4;y&&(y.style.transform=`translate3d(${Q+e}px, ${K+t}px, 0)`),requestAnimationFrame(Ge)}requestAnimationFrame(Ge);window.addEventListener("pointermove",e=>{if(J=e.pointerType||"mouse",J!=="mouse"){_e();return}me=e.clientX,ue=e.clientY,ze||(Q=me,K=ue,ze=!0),wt()});window.addEventListener("mouseleave",()=>_e());const qe=".wii-tile, .wii-pill";function Fe(e){y&&y.classList.toggle("is-hover",e)}document.addEventListener("pointerover",e=>{if(J!=="mouse")return;const t=e.target?.closest?.(qe);t&&t!==Z&&(Z=t,Fe(!0),rt())});document.addEventListener("pointerout",e=>{const t=e.target?.closest?.(qe);if(t&&t===Z){const o=e.relatedTarget;if(o&&t.contains(o))return;Z=null,Fe(!1)}});document.addEventListener("pointerdown",()=>{I&&(B(),k(),$()),!(!y||J!=="mouse")&&(y.classList.add("is-down"),j())});document.addEventListener("pointerup",()=>{y&&y.classList.remove("is-down")});let n={running:!1,score:0,timeLeft:30,lastTs:0,spawnAcc:0,bubbles:[],rafId:null,timerId:null,canvas:null,ctx:null,scoreEl:null,timeEl:null,overEl:null,overScoreEl:null,overRestartBtn:null,overCloseBtn:null};function he(){n.overEl&&(n.overEl.classList.remove("is-show"),n.overEl.setAttribute("aria-hidden","true"))}function bt(){n.overEl&&(n.overScoreEl&&(n.overScoreEl.textContent=String(n.score)),n.overEl.classList.add("is-show"),n.overEl.setAttribute("aria-hidden","false"))}function yt(){n.canvas=document.getElementById("mgCanvas"),n.scoreEl=document.getElementById("mgScore"),n.timeEl=document.getElementById("mgTime"),n.overEl=document.getElementById("mgOver"),n.overScoreEl=document.getElementById("mgOverScore"),n.overRestartBtn=document.getElementById("mgOverRestart"),n.overCloseBtn=document.getElementById("mgOverClose");const e=document.getElementById("mgStart"),t=document.getElementById("mgReset");return n.canvas?(n.ctx=n.canvas.getContext("2d"),he(),n.overRestartBtn&&(n.overRestartBtn.onclick=()=>{ee(),Re()}),n.overCloseBtn&&(n.overCloseBtn.onclick=()=>te()),n.canvas.onpointerdown=o=>{if(!n.running)return;const i=n.canvas.getBoundingClientRect(),s=(o.clientX-i.left)/i.width*n.canvas.width,r=(o.clientY-i.top)/i.height*n.canvas.height;for(let a=n.bubbles.length-1;a>=0;a--){const l=n.bubbles[a],p=s-l.x,u=r-l.y;if(p*p+u*u<=l.r*l.r){n.bubbles.splice(a,1),n.score+=1,n.scoreEl&&(n.scoreEl.textContent=String(n.score)),At();return}}},e&&(e.onclick=()=>Re()),t&&(t.onclick=()=>ee()),Ee(),!0):!1}function Ee(){if(!n.canvas)return;const e=Math.min(window.devicePixelRatio||1,2),t=n.canvas.clientWidth,o=n.canvas.clientHeight;if(!t||!o)return;const i=Math.round(t*e),s=Math.round(o*e);(n.canvas.width!==i||n.canvas.height!==s)&&(n.canvas.width=i,n.canvas.height=s)}function ee(){ie(!1),he(),n.score=0,n.timeLeft=30,n.bubbles=[],n.scoreEl&&(n.scoreEl.textContent="0"),n.timeEl&&(n.timeEl.textContent="30"),We()}function Re(){n.running||(n.timeLeft<=0&&ee(),he(),n.running=!0,n.lastTs=performance.now(),n.spawnAcc=0,n.timerId=window.setInterval(()=>{n.running&&(n.timeLeft-=1,n.timeEl&&(n.timeEl.textContent=String(n.timeLeft)),n.timeLeft<=0&&(n.timeLeft=0,n.timeEl&&(n.timeEl.textContent="0"),ie(!0)))},1e3),n.rafId=requestAnimationFrame(Ue))}function ie(e=!1){n.running=!1,n.timerId&&(clearInterval(n.timerId),n.timerId=null),n.rafId&&(cancelAnimationFrame(n.rafId),n.rafId=null),e&&(bt(),Lt())}function It(){if(!n.canvas)return;const e=n.canvas.width,t=n.canvas.height,o=22+Math.random()*26,i=o+Math.random()*(e-o*2),s=o+Math.random()*(t-o*2),r=(-.25+Math.random()*.5)*(window.devicePixelRatio||1),a=(-.15+Math.random()*.35)*(window.devicePixelRatio||1),l=3.2+Math.random()*1.8;n.bubbles.push({x:i,y:s,r:o,vx:r,vy:a,born:performance.now(),life:l})}function Ue(e){if(!n.running)return;const t=Math.min((e-n.lastTs)/1e3,.05);n.lastTs=e,Ee();const i=.55/(1+(30-n.timeLeft)*.03);for(n.spawnAcc+=t;n.spawnAcc>=i;)n.spawnAcc-=i,It();const s=performance.now();for(let r=n.bubbles.length-1;r>=0;r--){const a=n.bubbles[r];a.x+=a.vx*60*t,a.y+=a.vy*60*t,a.x-a.r<0&&(a.x=a.r,a.vx*=-1),a.x+a.r>n.canvas.width&&(a.x=n.canvas.width-a.r,a.vx*=-1),a.y-a.r<0&&(a.y=a.r,a.vy*=-1),a.y+a.r>n.canvas.height&&(a.y=n.canvas.height-a.r,a.vy*=-1),(s-a.born)/1e3>a.life&&n.bubbles.splice(r,1)}We(),n.rafId=requestAnimationFrame(Ue)}function We(){if(!n.ctx||!n.canvas)return;const e=n.ctx,t=n.canvas.width,o=n.canvas.height;e.clearRect(0,0,t,o),e.fillStyle="rgba(255,255,255,0.22)",e.fillRect(0,0,t,o);for(const i of n.bubbles){const s=e.createRadialGradient(i.x-i.r*.35,i.y-i.r*.35,i.r*.2,i.x,i.y,i.r);s.addColorStop(0,"rgba(255,255,255,0.95)"),s.addColorStop(.35,"rgba(255,255,255,0.35)"),s.addColorStop(1,"rgba(43,184,255,0.18)"),e.beginPath(),e.arc(i.x,i.y,i.r,0,Math.PI*2),e.fillStyle=s,e.fill(),e.lineWidth=2,e.strokeStyle="rgba(43,184,255,0.35)",e.stroke(),e.beginPath(),e.arc(i.x-i.r*.25,i.y-i.r*.25,i.r*.28,0,Math.PI*2),e.fillStyle="rgba(255,255,255,0.28)",e.fill()}}function At(){const e=D();if(!e)return;const t=e.currentTime,o=e.createOscillator(),i=e.createGain();o.type="sine",o.frequency.setValueAtTime(620,t),o.frequency.exponentialRampToValueAtTime(280,t+.06),i.gain.setValueAtTime(1e-4,t),i.gain.exponentialRampToValueAtTime(.08,t+.008),i.gain.exponentialRampToValueAtTime(1e-4,t+.1),o.connect(i),i.connect(e.destination),o.start(t),o.stop(t+.12)}function Lt(){const e=D();if(!e)return;const t=e.currentTime;[880,740,622].forEach((i,s)=>{const r=e.createOscillator(),a=e.createGain(),l=t+s*.12;r.type="triangle",r.frequency.setValueAtTime(i,l),a.gain.setValueAtTime(1e-4,l),a.gain.exponentialRampToValueAtTime(.06,l+.01),a.gain.exponentialRampToValueAtTime(1e-4,l+.16),r.connect(a),a.connect(e.destination),r.start(l),r.stop(l+.18)})}window.addEventListener("resize",()=>{document.getElementById("mgCanvas")&&Ee(),xe(),V()});function le(){z||(z=!0,P&&(P.classList.add("is-fading"),P.setAttribute("aria-hidden","true"),window.setTimeout(()=>{P.classList.add("is-hidden")},tt),window.setTimeout(()=>{document.body?.classList.remove("is-intro-locked")},it)),H=Math.max(H,performance.now()+et),I&&(B(),k(),$()),j(),V())}function Ot(){if(!P){z=!0;return}document.body?.classList.add("is-intro-locked"),P.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),le()}),P.addEventListener("pointerdown",e=>{e.pointerType!=="touch"&&(e.preventDefault(),e.stopPropagation(),le())}),window.addEventListener("keydown",e=>{z||(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),le())})}function we(){const e=window.visualViewport?.height||window.innerHeight;document.documentElement.style.setProperty("--vh",`${e}px`)}nt();O&&O.classList.add("is-swoosh-in");Ne();setInterval(Ne,1e3);Ot();we();window.addEventListener("resize",we);window.visualViewport?.addEventListener("resize",we);F.addEventListener?(F.addEventListener("change",V),de.addEventListener("change",V)):(F.addListener(V),de.addListener(V));
