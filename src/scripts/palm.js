// The sprout beside the name sways like a palm in the wind.
// The moon and trunk stay put; the crown bends about the top of the trunk and the fronds flutter.
// Hovering the name brings a stronger gust. Nothing moves for prefers-reduced-motion.
(()=>{
/* Palm in the wind: the moon and trunk stay put; the crown bends about the top of the trunk and the fronds flutter. */
const svg=document.querySelector('.mark .sym'),tree=svg&&svg.querySelector('.sym-tree');if(!tree)return;
const rm=matchMedia('(prefers-reduced-motion: reduce)');
const d0=tree.getAttribute('d'),tok=d0.match(/[MCZ]|-?\d*\.?\d+/g),pts=[],tpl=[];
for(let n=0;n<tok.length;){if(/[MCZ]/.test(tok[n])){tpl.push(tok[n]);n++}else{tpl.push(pts.length);pts.push([+tok[n],+tok[n+1]]);n+=2}}
const PX=99,PY=186,ss=v=>{v=Math.min(1,Math.max(0,v));return v*v*(3-2*v)};
const W=pts.map(([x,y])=>{if(y>PY)return[0,0];const r=Math.hypot(x-PX,y-PY);return[ss((r-10)/70),Math.atan2(y-PY,x-PX)]});
const TAU=Math.PI*2,A=8*Math.PI/180,F=3*Math.PI/180,L=10*Math.PI/180; /* L: soft limit that keeps the fronds clear of the moon */
let t0=null,last=0,raf=0,seen=true,hover=0,hoverT=0;
const gust=t=>.5*Math.sin(TAU*t/6.1)+.3*Math.sin(TAU*t/3.7+1.3)+.2*Math.sin(TAU*t/2.3+.4);
function frame(now){raf=0;if(t0===null){t0=now;last=now}const t=(now-t0)/1000,dt=Math.min(.1,(now-last)/1000);last=now;
 hover+=(hoverT-hover)*Math.min(1,dt/.5);
 const env=ss(t/2),a=A*env*((.3+.7*gust(t))+hover*.3),fa=F*env*(1+hover*1.2);
 let i=0,out='';
 for(const v of tpl){if(typeof v==='string'){out+=v+' ';continue}
  const[x,y]=pts[v],[w,ph]=W[v];let X=x,Y=y;
  if(w>0){const b=L*Math.tanh((a*w+fa*w*w*Math.sin(TAU*t/1.3+ph*1.6))/L),ca=Math.cos(b),sa=Math.sin(b),dx=x-PX,dy=y-PY;X=PX+dx*ca-dy*sa;Y=PY+dx*sa+dy*ca}
  out+=X.toFixed(2)+' '+Y.toFixed(2)+' '}
 tree.setAttribute('d',out.trim());go()}
function go(){if(!raf&&seen&&!rm.matches&&!document.hidden)raf=requestAnimationFrame(frame)}
function stop(){if(raf){cancelAnimationFrame(raf);raf=0}last=performance.now()}
new IntersectionObserver(e=>{seen=e[0].isIntersecting;seen?go():stop()}).observe(svg);
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();else{last=performance.now();go()}});
rm.addEventListener('change',()=>{if(rm.matches){stop();tree.setAttribute('d',d0)}else go()});
const mk=svg.closest('.mark');mk.addEventListener('pointerenter',()=>hoverT=1);mk.addEventListener('pointerleave',()=>hoverT=0);mk.addEventListener('focus',()=>hoverT=1);mk.addEventListener('blur',()=>hoverT=0);
go()})();
