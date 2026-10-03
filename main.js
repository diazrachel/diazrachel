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
 {img:'images/shellhacks.jpg',t:'shellhacks!',b:'ShellHacks 2026',d:'My SideQuest team and me at ShellHacks.'},
 {img:'images/cyberlaunch.jpg',t:'1st place!!',b:'CyberLaunch 2025',d:'My team getting our prize for 1st place in the Advanced division.'},
 {img:'images/demo-day.jpg',t:'demo day',b:'America on Tech',d:'My team at Demo Day. We placed 4th!'},
 {img:'images/ucf.jpg',t:'fave walk',b:'UCF',d:'My favorite spot to walk by on campus, behind L3Harris.'}
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
   Any element with data-img="images/whatever.jpg" shows that image once the file exists.
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
  first=false;
}
addEventListener('hashchange',route);route();
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
