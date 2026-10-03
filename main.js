/* ---------- pixel art ---------- */
const PAL={T:'#00D2BE',D:'#00978A',S:'#C8CDD3',K:'#13232D',W:'#F4F7F8',G:'#6B7680',P:'#FF8FB1',B:'#8A5A3C',L:'#C08457',C:'#F7D9A8',E:'#13232D',Y:'#FFCF4A',O:'#E0A21B',R:'#E2557F',N:'#F2A0B5',M:'#FFFFFF',H:'#B8794A'};
const ART={
 car:["TTT.........................","TTT.........KK..............","SS.........KWWK.............","SS.......SSDWWDSS...........","SSSTTTTTTTTTTTTTTTTTTTT.....",".SSTTTTDDTTTTTTTTTTTTTTTTT..",".KKKK.SSSSSSSSSSSSS.KKKK.SSS","KKKKKK.............KKKKKK...","KKGGKK.............KKGGKK...","KKKKKK.............KKKKKK...",".KKKK...............KKKK...."],
 helmet:["....KKKKKK....","...KTTTTTTK...","..KTTWWTTTTK..",".KTTWWTTTTTTK.",".KTTTTTTTTTTK.",".KKKKKKKKKTTK.",".KSSSSSSSKTTK.",".KSSSSSSSKTTK.",".KKKKKKKKKTTK.","..KDDDDDDDDK..","...KKKKKKKK..."],
 squirrel:["................","..BB............",".BLLB......BB...",".BLLLB....BLB...",".BLLLLB..BLLB...","..BLLLB.BLLLLB..","..BLLLLBLLELLB..","...BLLLBLLLLLLK.","...BLLLBLLLLBB..","....BLLBLCCLB...",".....BBLLCCLB...","......BLLCCLB...","......BLLLLLB...",".......BKBBKB..."],
 trophy:["..YYYYYYYYYY..","YYYOOOOOOOOYYY","Y.YOOOOOOOOY.Y","Y.YOOOMOOOOY.Y",".YYOOOMOOOOYY.","...YOOOOOOY...","....YOOOOY....",".....YOOY.....","......YY......","......YY......","....KKKKKK....","....KTTTTK....","...KKKKKKKK..."],
 menu:["KKKKKKKKKK","KMMMMMMMMK","KMKKKKKKMK","KMMMMMMMMK","KMKKKKMMMK","KMMMMMMMMK","KMKKKKKKMK","KMMMMMMMMK","KMKKKMMMMK","KMMMMMMMMK","KKKKKKKKKK"],
 pig:["..NN....NN..",".NRRNNNNRRN.",".NNNNNNNNNN.","NNNKNNNNKNNN","NNNNNNNNNNNN","NNNNRRRRNNNN","NNNRKRRKRNNN","NNNNRRRRNNNN",".NNNNNNNNNN.","..NN....NN.."]
};
function draw(svg,rows){const w=rows[0].length,h=rows.length;svg.setAttribute('viewBox',`0 0 ${w} ${h}`);let o='';rows.forEach((r,y)=>[...r].forEach((c,x)=>{if(PAL[c])o+=`<rect x="${x}" y="${y}" width="1.03" height="1.03" fill="${PAL[c]}"/>`}));svg.innerHTML=o;}
document.querySelectorAll('[data-art]').forEach(s=>draw(s,ART[s.dataset.art]));

/* ---------- flip cards (swap in real photos later) ---------- */
const SNAPS=[
 {img:'shellhacks.jpg',t:'shellhacks!',b:'ShellHacks 2026',d:'My SideQuest team and me at ShellHacks.'},
 {img:'cyberlaunch.jpg',t:'1st place!!',b:'CyberLaunch 2025',d:'My team getting our prize for 1st place in the Advanced division.'},
 {img:'demo-day.jpg',t:'demo day',b:'America on Tech',d:'My team at Demo Day. We placed 4th!'},
 {img:'ucf.jpg',t:'fave walk',b:'UCF',d:'My favorite spot to walk by on campus, behind L3Harris.'}
];
document.getElementById('flips').innerHTML=SNAPS.map(s=>`
 <button class="flip" aria-pressed="false" aria-label="${s.b}, flip for details">
  <div class="flip-in">
   <div class="side front polaroid"><div class="photo" data-img="${s.img}"></div><div class="pcap">${s.t}</div></div>
   <div class="side back"><div><b>${s.b}</b><p>${s.d}</p></div><small>tap to flip back</small></div>
  </div>
 </button>`).join('');
document.querySelectorAll('.flip').forEach(f=>f.addEventListener('click',()=>f.setAttribute('aria-pressed',f.getAttribute('aria-pressed')!=='true')));

/* ---------- photos ----------
   Any element with data-img="whatever.jpg" shows that image once the file exists.
   Until then it keeps the striped placeholder, so you can add photos one at a time. */
document.querySelectorAll('[data-img]').forEach(el=>{
  const img=new Image();
  img.onload=()=>{el.style.background=`center / cover no-repeat url("${el.dataset.img}")`;el.classList.add('has-img');};
  img.src=el.dataset.img;
});

/* ---------- router ---------- */
const pages=[...document.querySelectorAll('.page')], navLinks=[...document.querySelectorAll('.links a')];
const lapCar=document.getElementById('lapCar'), linksEl=document.getElementById('links'), menuBtn=document.getElementById('menuBtn');
let first=true;
function route(){
  let path=(location.hash.replace(/^#/,'')||'/'); if(!pages.some(p=>p.dataset.page===path)) path='/';
  pages.forEach(p=>p.classList.toggle('on',p.dataset.page===path));
  navLinks.forEach(a=>a.getAttribute('href')==='#'+path?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current'));
  const titles={'/':'Rachel Diaz | rvchi.dev','/about':'About | Rachel Diaz','/experience':'Experience | Rachel Diaz','/projects':'Projects | Rachel Diaz','/shelf':'Shelf | Rachel Diaz'};
  document.title=titles[path];
  linksEl.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');
  if(!first){window.scrollTo(0,0);lapCar.classList.remove('go');void lapCar.offsetWidth;lapCar.classList.add('go');}
  if(window.__onRoute)window.__onRoute(path,first);
  first=false;
}
addEventListener('hashchange',()=>window.__go?window.__go():route());route();
menuBtn.addEventListener('click',()=>{const o=linksEl.classList.toggle('open');menuBtn.setAttribute('aria-expanded',o);});

/* ---------- theme ---------- */
try{const t=localStorage.getItem('rd-theme');if(t)document.documentElement.dataset.theme=t;}catch(e){}
document.getElementById('themeBtn').addEventListener('click',()=>{
  const r=document.documentElement,cur=r.dataset.theme||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
  r.dataset.theme=cur==='dark'?'light':'dark';try{localStorage.setItem('rd-theme',r.dataset.theme);}catch(e){}
});

/* ---------- lights out ---------- */
const L=document.getElementById('lights');L.innerHTML=Array.from({length:5},()=>'<div class="light"><i></i><i></i></div>').join('');
const lights=[...L.children],rb=document.getElementById('reactBtn'),lastT=document.getElementById('lastT'),bestT=document.getElementById('bestT');
let st='idle',tm=[],out=0,best=null;
try{const b=localStorage.getItem('rd-best');if(b){best=+b;bestT.textContent=`Best: ${best.toFixed(3)}s`;}}catch(e){}
const reset=()=>{tm.forEach(clearTimeout);tm=[];lights.forEach(l=>l.classList.remove('on'));};
function press(){
  if(st==='idle'){reset();st='arm';rb.textContent='Wait for it...';
    lights.forEach((l,i)=>tm.push(setTimeout(()=>l.classList.add('on'),(i+1)*700)));
    tm.push(setTimeout(()=>{reset();out=performance.now();st='go';rb.textContent='Go!';},4000+Math.random()*2000));
  }else if(st==='arm'){reset();st='idle';lastT.textContent='Jump start!';rb.textContent='Try again';}
  else{const t=(performance.now()-out)/1000;st='idle';lastT.textContent=`Last: ${t.toFixed(3)}s`;
    if(best===null||t<best){best=t;bestT.textContent=`Best: ${t.toFixed(3)}s`;try{localStorage.setItem('rd-best',t)}catch(e){}}
    rb.textContent=t<.25?'Pole position! Again?':'Start lights';}
}
rb.addEventListener('pointerdown',e=>{e.preventDefault();press();});
rb.addEventListener('keydown',e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();press();}});

/* =========================================================
   PZAZZ: animations & on-screen effects
   ========================================================= */
(function(){
  const calm=matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* pixel wipe between pages */
  const wipe=document.createElement('div');wipe.className='wipe';wipe.setAttribute('aria-hidden','true');
  wipe.innerHTML=Array.from({length:8},(_,i)=>`<i style="--i:${i}"></i>`).join('');
  document.body.appendChild(wipe);
  let busy=false;
  window.__go=()=>{
    if(calm){route();return;}
    if(busy)return; busy=true;
    wipe.className='wipe in';
    setTimeout(()=>{route();wipe.className='wipe out';setTimeout(()=>{wipe.className='wipe';busy=false;},320);},300);
  };

  /* staggered reveal of things on each page */
  const SEL='h2,.frame,.polaroid,.xp,.flip,.currently,.win,.skill-row,.next,.sig';
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const el=e.target;el.classList.add('in');io.unobserve(el);
    /* once revealed, hand control back to the normal hover transitions */
    setTimeout(()=>{el.classList.remove('rv','in');el.style.removeProperty('--d');},700+(parseInt(el.style.getPropertyValue('--d'))||0));}}),{threshold:.12});
  function reveal(page){
    if(calm)return;
    let n=0;
    page.querySelectorAll(SEL).forEach(el=>{
      if(el.parentElement.closest('.rv-skip'))return;
      if(el.closest('.flip-in'))return;
      el.classList.remove('in');el.classList.add('rv');
      el.style.setProperty('--d',Math.min(n++,8)*70+'ms');
      io.observe(el);
    });
  }
  window.__onRoute=(path)=>reveal(document.querySelector(`.page[data-page="${path}"]`));
  reveal(document.querySelector('.page.on'));

  /* typewriter on the big name */
  const h=document.querySelector('.hero h1');
  if(h&&!calm){
    const text=h.textContent;h.setAttribute('aria-label',text);
    h.innerHTML='<span aria-hidden="true"></span><span class="caret" aria-hidden="true"></span>';
    const out=h.firstChild,caret=h.lastChild;let i=0;
    setTimeout(function type(){out.textContent=text.slice(0,++i);
      if(i<text.length)setTimeout(type,70+Math.random()*60);else caret.classList.add('done');},350);
  }

  /* click sparkles */
  const COLORS=['#00D2BE','#FF8FB1','#FFCF4A','#C8CDD3'];
  function burst(x,y,count,cls,spread,fall){
    for(let k=0;k<count;k++){
      const d=document.createElement('i');d.className=cls;
      const a=Math.random()*Math.PI*2,r=spread*(.5+Math.random()*.6);
      d.style.left=x+'px';d.style.top=y+'px';d.style.background=COLORS[k%COLORS.length];
      d.style.setProperty('--x',Math.cos(a)*r+'px');
      d.style.setProperty('--y',Math.sin(a)*r+(fall||0)+'px');
      d.style.setProperty('--r',(Math.random()*720-360)+'deg');
      document.body.appendChild(d);setTimeout(()=>d.remove(),1500);
    }
  }
  if(!calm)addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&e.button!==0)return;burst(e.clientX-3,e.clientY-3,7,'spark',34);});

  /* confetti when you set a new best on lights out */
  const best=document.getElementById('bestT'),btn=document.getElementById('reactBtn');
  if(best&&btn&&!calm){let last=best.textContent;
    new MutationObserver(()=>{if(best.textContent!==last){last=best.textContent;const b=btn.getBoundingClientRect();burst(b.left+b.width/2,b.top,36,'confetti',160,120);}}).observe(best,{childList:true});}

  /* exhaust puffs behind the cruising car */
  const track=document.querySelector('.track'),car=track&&track.querySelector('svg');
  if(track&&car&&!calm)setInterval(()=>{
    if(!document.querySelector('.page[data-page="/"]').classList.contains('on'))return;
    const tr=track.getBoundingClientRect(),cr=car.getBoundingClientRect();
    if(cr.right<tr.left||cr.left>tr.right)return;
    const p=document.createElement('span');p.className='puff';p.style.left=(cr.left-tr.left-4)+'px';
    track.appendChild(p);setTimeout(()=>p.remove(),950);
  },180);
})();
