// Case study motion: the launch video, fade-up plates and the autoscrolling full-page plate.
(()=>{const fig=document.querySelector('.cs-vid');if(!fig)return;const v=fig.querySelector('video'),b=fig.querySelector('.cs-vid-btn'),rm=matchMedia('(prefers-reduced-motion: reduce)');
const set=p=>{b.textContent=p?'Play':'Pause';b.setAttribute('aria-pressed',p)};
const ready=()=>{if(fig.classList.contains('has-video'))return;fig.classList.add('has-video');if(!rm.matches){v.play().then(()=>set(false)).catch(()=>set(true))}else set(true)};v.addEventListener('loadedmetadata',ready);if(v.readyState>=1)ready();
b.addEventListener('click',()=>{if(v.paused){v.play();set(false)}else{v.pause();set(true)}});})();
(()=>{const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
/* fade up */
if(!rm&&'IntersectionObserver' in window){const io=new IntersectionObserver(es=>{const ins=es.filter(e=>e.isIntersecting);ins.forEach((e,i)=>{e.target.style.setProperty('--d',(i*0.08)+'s');e.target.classList.add('is-in');io.unobserve(e.target)})},{rootMargin:'0px 0px -6% 0px',threshold:.12});document.querySelectorAll('.fx').forEach(el=>io.observe(el))}else{document.documentElement.classList.remove('fx-on')}
/* full-page plate */
const fig=document.querySelector('.cs-scroll');if(!fig)return;const f=fig.querySelector('.cs-scroll-f'),img=f.querySelector('img'),hint=fig.querySelector('.cs-scroll-hint');
const dist=()=>Math.max(0,img.getBoundingClientRect().height-f.clientHeight);
if(rm){fig.classList.add('is-manual');hint.textContent='Scroll inside the frame';return}
const hover=matchMedia('(hover: hover) and (pointer: fine)').matches;
img.style.transition='none';let y=0,anim=0,timer=0,inView=false,held=false;
const setY=v=>{y=v;img.style.transform='translate3d(0,'+(-v)+'px,0)'};
const rnd=(a,b)=>a+Math.random()*(b-a),sine=k=>(1-Math.cos(Math.PI*k))/2;
/* cubic-bezier(0.17, 0.66, 0.34, 0.98) for each scroll */
const bez=(x1,y1,x2,y2)=>{const cx=3*x1,bx=3*(x2-x1)-cx,ax=1-cx-bx,cy=3*y1,by=3*(y2-y1)-cy,ay=1-cy-by,X=t=>((ax*t+bx)*t+cx)*t,Yb=t=>((ay*t+by)*t+cy)*t,dX=t=>(3*ax*t+2*bx)*t+cx;
 return k=>{if(k<=0)return 0;if(k>=1)return 1;let t=k;for(let i=0;i<8;i++){const e=X(t)-k,d=dX(t);if(Math.abs(e)<1e-6)break;if(Math.abs(d)<1e-6)break;t-=e/d}if(t<0||t>1||Math.abs(X(t)-k)>1e-4){let lo=0,hi=1;t=k;for(let i=0;i<30;i++){X(t)<k?lo=t:hi=t;t=(lo+hi)/2}}return Yb(t)}};
const flick=bez(0.17,0.66,0.34,0.98);
const stop=()=>{cancelAnimationFrame(anim);clearTimeout(timer);anim=timer=0};
const tween=(to,dur,done,ease=flick)=>{cancelAnimationFrame(anim);const from=y,t0=performance.now();const st=now=>{const k=Math.min(1,Math.max(0,(now-t0)/dur));setY(from+(to-from)*ease(k));if(k<1)anim=requestAnimationFrame(st);else{anim=0;done&&done()}};anim=requestAnimationFrame(st)};
const sc=()=>f.clientHeight/720,live=()=>inView&&!held&&!document.hidden;
/* autoscroll: each scroll eases in and out gently, then pauses to read; back to the top at the end */
const next=()=>{timer=0;if(!live())return;const max=dist();
 if(y>=max-1){timer=setTimeout(()=>{timer=0;if(live())tween(0,2600,()=>{timer=setTimeout(next,1600)},sine)},2200);return}
 const d=rnd(360,860)*sc();tween(Math.min(max,y+d),1100+d*.9,()=>{timer=setTimeout(next,rnd(700,1500))})};
const run=d=>{if(!anim&&!timer&&live())timer=setTimeout(next,d)};
const hold=()=>{if(held)return;held=true;stop()},release=()=>{if(!held)return;held=false;run(600)};
/* starts once the frame is mostly on screen (about when the Overview reaches the top), stops when it has left */
new IntersectionObserver(es=>{const r=es[0].intersectionRatio;if(r>=.6&&!inView){inView=true;run(400)}else if(r===0&&inView){inView=false;stop()}},{threshold:[0,.6]}).observe(f);
document.addEventListener('visibilitychange',()=>{document.hidden?stop():run(600)});
f.addEventListener('focus',hold);f.addEventListener('blur',release);
if(hover){hint.textContent='Hover to pause';
 /* pause only when the pointer is moved over the frame; scrolling the page lets it carry on */
 f.addEventListener('pointermove',hold);f.addEventListener('pointerleave',release);
 addEventListener('wheel',release,{passive:true});addEventListener('scroll',release,{passive:true})}
else{hint.textContent='Tap to pause';f.addEventListener('click',()=>{held?release():hold();hint.textContent=held?'Tap to play':'Tap to pause'})}
})();
