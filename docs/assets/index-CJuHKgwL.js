(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function s(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(r){if(r.ep)return;r.ep=!0;const a=s(r);fetch(r.href,a)}})();const x=document.getElementById("grid");document.getElementById("board");const U=document.getElementById("time"),X=document.getElementById("date"),T=document.getElementById("btnLeft"),A=document.getElementById("btnRight"),pe=[[{icon:"🧩",t:"Progetti",s:"Case study e lavori",href:"#projects",previews:["/img/01.jpg","/img/02.jpg","/img/03.jpg"]},{icon:"🎬",t:"Video",s:"Reel e underwater",href:"#videos"},{icon:"👋",t:"Chi sono",s:"Bio + competenze",href:"#about"},{icon:"✉️",t:"Contatti",s:"Mail e social",href:"#contact"},{icon:"🛞",t:"Automotive",s:"Officina / brand",href:"#auto"},{icon:"🌊",t:"Underwater",s:"Riprese sub",href:"#underwater"},{icon:"🎥",t:"Social",s:"Reel / ads",href:"#social"},{icon:"🧠",t:"AI",s:"Workflow",href:"#ai"},{icon:"📌",t:"Servizi",s:"Cosa offro",href:"#services"},{icon:"🏁",t:"Esperienze",s:"Pista / progetti",href:"#exp"},{icon:"🧰",t:"Tool",s:"Setup",href:"#tools"},{icon:"⭐️",t:"Highlight",s:"Selezionati",href:"#high"}],[{icon:"📷",t:"Galleria",s:"Foto e frame",href:"#gallery"},{icon:"🗂️",t:"Archivio",s:"Lavori passati",href:"#archive"},{icon:"📝",t:"Blog",s:"Note e making-of",href:"#blog"},{icon:"📍",t:"Dove sono",s:"Roma / contatti",href:"#where"}]];function he(){return pe[0]}function ye(){if(!x)return;const e=he();x.innerHTML=e.map(n=>{const s=Array.isArray(n.previews)?n.previews:[],o=s.length?`
          <div class="wii-preview" aria-hidden="true">
            ${s.map(r=>`<img src="${r}" alt="" loading="lazy" decoding="async">`).join("")}
          </div>
        `:"";return`
        <a class="wii-tile" href="${n.href}" data-href="${n.href}">
          ${o}
          <div class="wii-tileContent">
            <div class="wii-icon">${n.icon}</div>
            <div>
              <div class="wii-title">${n.t}</div>
              <div class="wii-sub">${n.s}</div>
            </div>
          </div>
        </a>
      `}).join("")}function ee(){if(!U||!X)return;const e=new Date,n=String(e.getHours()).padStart(2,"0"),s=String(e.getMinutes()).padStart(2,"0");U.textContent=`${n}:${s}`;const o=["Dom","Lun","Mar","Mer","Gio","Ven","Sab"],r=["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"],a=e.getDate(),i=o[e.getDay()],c=r[e.getMonth()];X.textContent=`${i} ${a} ${c}`}let y=null,w=!0,Q=0;function B(){return w?(y||(y=new(window.AudioContext||window.webkitAudioContext)),y.state==="suspended"&&y.resume().catch(()=>{}),y):null}function te({type:e="sine",freq:n=700,duration:s=.05,gain:o=.04,attack:r=.002,release:a=.035}={}){const i=B();if(!i)return;const c=i.currentTime,u=i.createOscillator(),f=i.createGain();u.type=e,u.frequency.setValueAtTime(n,c),f.gain.setValueAtTime(0,c),f.gain.linearRampToValueAtTime(o,c+r),f.gain.exponentialRampToValueAtTime(1e-4,c+r+a),u.connect(f),f.connect(i.destination),u.start(c),u.stop(c+s+a+.02)}function be(){const e=performance.now();e-Q<120||(Q=e,te({type:"sine",freq:880,duration:.03,gain:.026,attack:.002,release:.03}))}function D(){te({type:"triangle",freq:520,duration:.03,gain:.05,attack:.001,release:.02})}let h=null;function ne(){const e=B();if(!e||h)return;const n=e.createGain();n.gain.value=0,n.connect(e.destination);const s=e.createDelay(.35);s.delayTime.value=.18;const o=e.createGain();o.gain.value=.2,s.connect(o),o.connect(s);const r=e.createGain();r.gain.value=.25;const a=e.createBiquadFilter();a.type="lowpass",a.frequency.value=2600,a.Q.value=.7,a.connect(n),a.connect(s),s.connect(r),r.connect(n);const i=e.createOscillator();i.type="sine",i.frequency.value=130.81;const c=e.createGain();c.gain.value=1e-4,i.connect(c),c.connect(a);const u=e.createOscillator();u.type="sine",u.frequency.value=.08;const f=e.createGain();f.gain.value=.007,u.connect(f),f.connect(c.gain);const N=e.currentTime;i.start(N),u.start(N);function W(b,l,E=.05){const d=e.createOscillator(),m=e.createGain(),g=e.createBiquadFilter();d.type="triangle",d.frequency.setValueAtTime(b,l),g.type="highpass",g.frequency.setValueAtTime(240,l),m.gain.setValueAtTime(1e-4,l),m.gain.exponentialRampToValueAtTime(E,l+.01),m.gain.exponentialRampToValueAtTime(1e-4,l+.22),d.connect(g),g.connect(m),m.connect(a),d.start(l),d.stop(l+.3)}function me(b,l,E=.018){const d=e.createOscillator(),m=e.createGain(),g=e.createBiquadFilter();d.type="sine",d.frequency.setValueAtTime(b,l),g.type="lowpass",g.frequency.setValueAtTime(520,l),m.gain.setValueAtTime(1e-4,l),m.gain.exponentialRampToValueAtTime(E,l+.008),m.gain.exponentialRampToValueAtTime(1e-4,l+.18),d.connect(g),g.connect(m),m.connect(a),d.start(l),d.stop(l+.22)}const O=[{tones:[261.63,329.63,392],bass:130.81},{tones:[349.23,440,523.25],bass:174.61},{tones:[220,261.63,329.63],bass:110},{tones:[196,246.94,293.66],bass:98}],V=[[0,1,2,1,0,2,1,2],[0,2,1,2,0,1,2,1],[0,1,0,2,1,2,1,0]],fe=300,j=8,ge=2;let M=0,P=0,k=0,G=0;function Y(){if(!w||!y||!h)return;const b=y.currentTime,l=O[k%O.length],E=V[G%V.length],d=M%j,m=E[d]%l.tones.length,g=l.tones[m],ve=d===0?.058:d===4?.05:.04;W(g,b+.01,ve),d===0&&me(l.bass,b+.01,.016),Math.random()<.1&&W(g*2,b+.06,.026),M+=1,M%j===0&&(P+=1,P%2===0&&(G=(G+1)%V.length),P%ge===0&&(k=(k+1)%O.length)),h.timerId=window.setTimeout(Y,fe)}h={musicGain:n,lp:a,delay:s,fb:o,delayMix:r,drone:i,droneGain:c,lfo:u,timerId:null},Y(),n.gain.setTargetAtTime(.02,e.currentTime,.7)}function we(){if(!y||!h)return;const e=y.currentTime;h.timerId&&clearTimeout(h.timerId),h.musicGain.gain.setTargetAtTime(1e-4,e,.25),setTimeout(()=>{try{h.drone?.stop()}catch{}try{h.lfo?.stop()}catch{}h=null},400)}T&&(T.textContent="🔊",T.addEventListener("click",()=>{w=!w,T.textContent=w?"🔊":"🔇",w?ne():we()}));A&&(A.textContent="🎮");const v=document.getElementById("wiiOverlay"),K=document.getElementById("overlayBack"),J=document.getElementById("overlayTitle"),Z=document.getElementById("overlayBody"),Ee={"#projects":{title:"Progetti",html:`
      <div class="wii-card">
        <h3>Case study</h3>
        <p>Qui mettiamo i tuoi progetti migliori con immagini, ruolo, risultati.</p>
      </div>
      <div class="wii-card">
        <h3>Selezionati</h3>
        <p>Una lista “best of” in stile canale Wii.</p>
      </div>
    `},"#videos":{title:"Video",html:`
      <div class="wii-card">
        <h3>Showreel</h3>
        <p>Link, embed o thumbs. (Poi mettiamo Vimeo/YouTube).</p>
      </div>
      <div class="wii-card">
        <h3>Underwater</h3>
        <p>Sezione dedicata alle immersioni e riprese sub.</p>
      </div>
    `},"#about":{title:"Chi sono",html:`
      <div class="wii-card">
        <h3>Bio</h3>
        <p>Roberto Serani — videomaker, underwater + automotive.</p>
      </div>
      <div class="wii-card">
        <h3>Skills</h3>
        <p>Riprese, montaggio, storytelling, workflow AI.</p>
      </div>
    `},"#contact":{title:"Contatti",html:`
      <div class="wii-card">
        <h3>Scrivimi</h3>
        <p>Email, Instagram, WhatsApp business…</p>
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

          <!-- GAME OVER LAYER (DEVE stare DENTRO mgStage) -->
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
    `}};function ie(e){if(!v||!J||!Z)return;v.classList.toggle("is-game",e==="#minigame");const n=Ee[e]||{title:"Canale",html:'<div class="wii-card"><h3>Coming soon</h3><p>Contenuto in arrivo.</p></div>'};J.textContent=n.title,Z.innerHTML=n.html,v.classList.add("is-open"),v.setAttribute("aria-hidden","false"),e==="#minigame"?requestAnimationFrame(()=>{Ae()&&C()}):R(!1),D()}function L(){v&&(R(!1),v.classList.remove("is-open"),v.classList.remove("is-game"),v.setAttribute("aria-hidden","true"),D())}K&&K.addEventListener("click",L);v&&v.addEventListener("click",e=>{e.target===v&&L()});document.addEventListener("keydown",e=>{e.key==="Escape"&&v?.classList.contains("is-open")&&L()});document.addEventListener("click",e=>{const n=e.target?.closest?.(".wii-tile");if(!n)return;const s=n.getAttribute("data-href")||n.getAttribute("href");s&&s.startsWith("#")&&(e.preventDefault(),ie(s))});A&&A.addEventListener("click",e=>{e.preventDefault(),ie("#minigame")});const p=document.getElementById("wiiPointer");let oe=0,se=0,q=0,H=0,$=!1,S="mouse";function Te(){p&&($||($=!0,p.style.opacity="1"))}function re(){p&&($=!1,p.style.opacity="0")}function ae(){q+=(oe-q)*.18,H+=(se-H)*.18;const e=-10,n=-4;p&&(p.style.transform=`translate3d(${q+e}px, ${H+n}px, 0)`),requestAnimationFrame(ae)}requestAnimationFrame(ae);window.addEventListener("pointermove",e=>{if(S=e.pointerType||"mouse",S!=="mouse"){re();return}oe=e.clientX,se=e.clientY,Te()});window.addEventListener("mouseleave",()=>re());const ce=".wii-tile, .wii-pill";let I=null;function le(e){p&&p.classList.toggle("is-hover",e)}document.addEventListener("pointerover",e=>{if(S!=="mouse")return;const n=e.target?.closest?.(ce);n&&n!==I&&(I=n,le(!0),be())});document.addEventListener("pointerout",e=>{const n=e.target?.closest?.(ce);if(n&&n===I){const s=e.relatedTarget;if(s&&n.contains(s))return;I=null,le(!1)}});document.addEventListener("pointerdown",()=>{w&&ne(),!(!p||S!=="mouse")&&(p.classList.add("is-down"),D())});document.addEventListener("pointerup",()=>{p&&p.classList.remove("is-down")});let t={running:!1,score:0,timeLeft:30,lastTs:0,spawnAcc:0,bubbles:[],rafId:null,timerId:null,canvas:null,ctx:null,scoreEl:null,timeEl:null,overEl:null,overScoreEl:null,overRestartBtn:null,overCloseBtn:null};function F(){t.overEl&&(t.overEl.classList.remove("is-show"),t.overEl.setAttribute("aria-hidden","true"))}function xe(){t.overEl&&(t.overScoreEl&&(t.overScoreEl.textContent=String(t.score)),t.overEl.classList.add("is-show"),t.overEl.setAttribute("aria-hidden","false"))}function Ae(){t.canvas=document.getElementById("mgCanvas"),t.scoreEl=document.getElementById("mgScore"),t.timeEl=document.getElementById("mgTime"),t.overEl=document.getElementById("mgOver"),t.overScoreEl=document.getElementById("mgOverScore"),t.overRestartBtn=document.getElementById("mgOverRestart"),t.overCloseBtn=document.getElementById("mgOverClose");const e=document.getElementById("mgStart"),n=document.getElementById("mgReset");return t.canvas?(t.ctx=t.canvas.getContext("2d"),F(),t.overRestartBtn&&(t.overRestartBtn.onclick=()=>{C(),_()}),t.overCloseBtn&&(t.overCloseBtn.onclick=()=>L()),t.canvas.onpointerdown=s=>{if(!t.running)return;const o=t.canvas.getBoundingClientRect(),r=(s.clientX-o.left)/o.width*t.canvas.width,a=(s.clientY-o.top)/o.height*t.canvas.height;for(let i=t.bubbles.length-1;i>=0;i--){const c=t.bubbles[i],u=r-c.x,f=a-c.y;if(u*u+f*f<=c.r*c.r){t.bubbles.splice(i,1),t.score+=1,t.scoreEl&&(t.scoreEl.textContent=String(t.score)),Ie();return}}},e&&(e.onclick=()=>_()),n&&(n.onclick=()=>C()),z(),!0):!1}function z(){if(!t.canvas)return;const e=Math.min(window.devicePixelRatio||1,2),n=t.canvas.clientWidth,s=t.canvas.clientHeight;if(!n||!s)return;const o=Math.round(n*e),r=Math.round(s*e);(t.canvas.width!==o||t.canvas.height!==r)&&(t.canvas.width=o,t.canvas.height=r)}function C(){R(!1),F(),t.score=0,t.timeLeft=30,t.bubbles=[],t.scoreEl&&(t.scoreEl.textContent="0"),t.timeEl&&(t.timeEl.textContent="30"),ue()}function _(){t.running||(t.timeLeft<=0&&C(),F(),t.running=!0,t.lastTs=performance.now(),t.spawnAcc=0,t.timerId=window.setInterval(()=>{t.running&&(t.timeLeft-=1,t.timeEl&&(t.timeEl.textContent=String(t.timeLeft)),t.timeLeft<=0&&(t.timeLeft=0,t.timeEl&&(t.timeEl.textContent="0"),R(!0)))},1e3),t.rafId=requestAnimationFrame(de))}function R(e=!1){t.running=!1,t.timerId&&(clearInterval(t.timerId),t.timerId=null),t.rafId&&(cancelAnimationFrame(t.rafId),t.rafId=null),e&&(xe(),Ce())}function Se(){if(!t.canvas)return;const e=t.canvas.width,n=t.canvas.height,s=22+Math.random()*26,o=s+Math.random()*(e-s*2),r=s+Math.random()*(n-s*2),a=(-.25+Math.random()*.5)*(window.devicePixelRatio||1),i=(-.15+Math.random()*.35)*(window.devicePixelRatio||1),c=3.2+Math.random()*1.8;t.bubbles.push({x:o,y:r,r:s,vx:a,vy:i,born:performance.now(),life:c})}function de(e){if(!t.running)return;const n=Math.min((e-t.lastTs)/1e3,.05);t.lastTs=e,z();const o=.55/(1+(30-t.timeLeft)*.03);for(t.spawnAcc+=n;t.spawnAcc>=o;)t.spawnAcc-=o,Se();const r=performance.now();for(let a=t.bubbles.length-1;a>=0;a--){const i=t.bubbles[a];i.x+=i.vx*60*n,i.y+=i.vy*60*n,i.x-i.r<0&&(i.x=i.r,i.vx*=-1),i.x+i.r>t.canvas.width&&(i.x=t.canvas.width-i.r,i.vx*=-1),i.y-i.r<0&&(i.y=i.r,i.vy*=-1),i.y+i.r>t.canvas.height&&(i.y=t.canvas.height-i.r,i.vy*=-1),(r-i.born)/1e3>i.life&&t.bubbles.splice(a,1)}ue(),t.rafId=requestAnimationFrame(de)}function ue(){if(!t.ctx||!t.canvas)return;const e=t.ctx,n=t.canvas.width,s=t.canvas.height;e.clearRect(0,0,n,s),e.fillStyle="rgba(255,255,255,0.22)",e.fillRect(0,0,n,s);for(const o of t.bubbles){const r=e.createRadialGradient(o.x-o.r*.35,o.y-o.r*.35,o.r*.2,o.x,o.y,o.r);r.addColorStop(0,"rgba(255,255,255,0.95)"),r.addColorStop(.35,"rgba(255,255,255,0.35)"),r.addColorStop(1,"rgba(43,184,255,0.18)"),e.beginPath(),e.arc(o.x,o.y,o.r,0,Math.PI*2),e.fillStyle=r,e.fill(),e.lineWidth=2,e.strokeStyle="rgba(43,184,255,0.35)",e.stroke(),e.beginPath(),e.arc(o.x-o.r*.25,o.y-o.r*.25,o.r*.28,0,Math.PI*2),e.fillStyle="rgba(255,255,255,0.28)",e.fill()}}function Ie(){const e=B();if(!e)return;const n=e.currentTime,s=e.createOscillator(),o=e.createGain();s.type="sine",s.frequency.setValueAtTime(620,n),s.frequency.exponentialRampToValueAtTime(280,n+.06),o.gain.setValueAtTime(1e-4,n),o.gain.exponentialRampToValueAtTime(.08,n+.008),o.gain.exponentialRampToValueAtTime(1e-4,n+.1),s.connect(o),o.connect(e.destination),s.start(n),s.stop(n+.12)}function Ce(){const e=B();if(!e)return;const n=e.currentTime;[880,740,622].forEach((o,r)=>{const a=e.createOscillator(),i=e.createGain(),c=n+r*.12;a.type="triangle",a.frequency.setValueAtTime(o,c),i.gain.setValueAtTime(1e-4,c),i.gain.exponentialRampToValueAtTime(.06,c+.01),i.gain.exponentialRampToValueAtTime(1e-4,c+.16),a.connect(i),i.connect(e.destination),a.start(c),a.stop(c+.18)})}window.addEventListener("resize",()=>{document.getElementById("mgCanvas")&&z()});ye();x&&x.classList.add("is-swoosh-in");ee();setInterval(ee,1e3);
