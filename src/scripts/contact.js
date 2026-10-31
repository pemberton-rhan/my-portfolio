// Contact: blanks size to their content, the note toggles open, and the form posts to /api/contact.
(()=>{const f=document.getElementById('ctForm');if(!f)return;const st=document.getElementById('ctStatus');
const m=document.createElement('span');m.style.cssText='position:absolute;visibility:hidden;white-space:pre;left:-9999px;top:0';document.body.appendChild(m);
const fit=el=>{const cs=getComputedStyle(el);m.style.font=cs.font;m.style.letterSpacing=cs.letterSpacing;let t=el.value||el.placeholder||'';if(el.tagName==='SELECT'){t=el.options[el.selectedIndex].text}m.textContent=t;const w=Math.ceil(m.getBoundingClientRect().width)+(el.tagName==='SELECT'?4:6);el.style.width=w+'px'};
const blanks=f.querySelectorAll('.cb-blank input,.cb-blank select');blanks.forEach(el=>{fit(el);el.addEventListener('input',()=>fit(el));el.addEventListener('change',()=>fit(el))});
window.addEventListener('resize',()=>blanks.forEach(fit));if(document.fonts)document.fonts.ready.then(()=>blanks.forEach(fit));
const ck=document.getElementById('cb-addnote'),nt=document.getElementById('cb-note');if(ck)ck.addEventListener('click',()=>{const o=nt.hidden;nt.hidden=!o;ck.setAttribute('aria-expanded',o);ck.querySelector('.cb-tl').textContent=o?'Remove note':'Add an additional note';if(o)document.getElementById('cb-msg').focus()});
f.addEventListener('submit',async e=>{e.preventDefault();let ok=true;f.querySelectorAll('[required]').forEach(el=>{const bad=!el.value.trim()||(el.type==='email'&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value));el.closest('.cb-blank').classList.toggle('is-bad',bad);if(bad)ok=false});
 if(!ok){st.textContent='Please fill in your name, a topic and a valid email.';return}
 const btn=f.querySelector('.ct-btn');btn.disabled=true;st.textContent='Sending…';
 try{const r=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(f)))});const j=await r.json().catch(()=>({}));
  if(!r.ok||!j.ok)throw new Error(j.error||'send failed');
  f.reset();blanks.forEach(fit);if(!nt.hidden)ck.click();st.textContent='Thanks, your message is on its way.'}
 catch(err){st.textContent='Something went wrong. You can email me at rhan@pemberton.dev instead.'}
 finally{btn.disabled=false}})})();
