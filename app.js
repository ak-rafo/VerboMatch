/*BUILD v18*/
/* topics added in later versions are kept through older migrations */
function vxKnown(x){return VX_KEYS.includes(x)||x==="net"}
function vmKnown(x){return VM_CATS.includes(x)||x==="net"}

const $=id=>document.getElementById(id);
const LS={get:(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}},set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
/*@@H1@@*/
const RAW=[
/*@@H2@@*/
["tomar","to take / drink","take","took"],
/*@@H3@@*/
["entrar","to enter / go in","enter","entered"],
/*@@H4@@*/
["abrir","to open","open","opened"],
/*@@H5@@*/
["comer","to eat","eat","ate"],
["beber","to drink","drink","drank"],
/*@@H6@@*/
["correr","to run","run","ran"],
/*@@H7@@*/
["aprender","to learn","learn","learned"],
/*@@H8@@*/
["responder","to answer","answer","answered"],
/*@@H9@@*/
["comprar","to buy","buy","bought"],
["vender","to sell","sell","sold"],
["pagar","to pay","pay","paid"],
["usar","to use / wear","use","used"],
/*@@H10@@*/
["lavar","to wash","wash","washed"],
/*@@H11@@*/
["viajar","to travel","travel","traveled"],
["nadar","to swim","swim","swam"],
/*@@H12@@*/
["cantar","to sing","sing","sang"],
/*@@H13@@*/
["decidir","to decide","decide","decided"],
/*@@H14@@*/
["subir","to go up / climb","go up","went up"],
/*@@H15@@*/
["existir","to exist","exist","existed"],
/*@@H16@@*/
["explicar","to explain","explain","explained"],
/*@@H17@@*/
["gritar","to shout / scream","shout","shouted"],
/*@@H18@@*/
["cortar","to cut","cut","cut (past)"],
["pintar","to paint","paint","painted"],
/*@@H19@@*/
["guardar","to put away / keep","put away","put away (past)"],
["esconder","to hide","hide","hid"],
/*@@H20@@*/
["prometer","to promise","promise","promised"],
/*@@H21@@*/
["visitar","to visit","visit","visited"],
/*@@H22@@*/
["secar","to dry","dry","dried"],
["preparar","to prepare","prepare","prepared"],
/*@@H23@@*/
];
/*@@H24@@*/
const IRR={
/*@@H25@@*/
};
const S=x=>x.split(" ");
/*@@H26@@*/
const _simple={};
function simple(inf){
  if(_simple[inf]) return _simple[inf];
/*@@H27@@*/
  const imp=I.imp?S(I.imp):E.imp.map(e=>st+e);
/*@@H28@@*/
  let psub;
  if(I.psub) psub=S(I.psub);
/*@@H29@@*/
}
function full(inf){
/*@@H30@@*/
  const w=(aux,x)=>aux.map(a=>a+" "+x);
/*@@H31@@*/
}
/*@@H32@@*/
/* ---------- persons & English builder ---------- */
const PERSONS={
/*@@H33@@*/
};
const beP=p=>p.g==="1"?"am":p.g==="3"?"is":"are";
function third(w){ if(w==="have")return"has"; if(w==="do")return"does"; if(w==="go")return"goes";
  if(/(s|sh|ch|x|z|o)$/.test(w))return w+"es"; if(/[^aeiou]y$/.test(w))return w.slice(0,-1)+"ies"; return w+"s"; }
function enPres(v,p){ if(v.can) return "can"; const w=v.eb.split(" ");
  if(w[0]==="am"){ w[0]=beP(p); return w.join(" "); }
  w[0]=w[0]==="be"?beP(p):p.g==="3"?third(w[0]):w[0]; return w.join(" "); }
function enPast(v,p){ return p.g==="1"||p.g==="3"?v.epast:v.epast.replace(/^was\b/,"were"); }
const enBase=v=>v.eb.replace(/^am\b/,"be");
const TENSES={
  pres:{label:"Present",c:"#009c3b",pt:(v,p,c)=>`${p.pt} ${c.pres[p.i]}`,en:(v,p)=>`${p.en} ${enPres(v,p)}`},
/*@@H34@@*/
  imp:{label:"Past · used to",c:"#f08c00",pt:(v,p,c)=>`${p.pt} ${c.imp[p.i]}`,en:(v,p)=>`${p.en} used to ${enBase(v)}`},
/*@@H35@@*/
  fut:{label:"Future · will",c:"#002776",pt:(v,p,c)=>`${p.pt} ${c.fut[p.i]}`,en:(v,p)=>`${p.en} will ${enBase(v)}`},
  psub:{label:"Subjunctive · que",c:"#6a4c93",pt:(v,p,c)=>`que ${p.pt} ${c.psub[p.i]}`,en:(v,p)=>`(that) ${p.en} ${enPres(v,p)}`}
};
const BANK_T=["pres","pret","imp","go","fut"];
/*@@H36@@*/
/* ---------- difficulty levels ---------- */
const ALLT=Object.keys(TENSES), ALLP=Object.keys(PERSONS);
const LEVELS=[
/*@@H37@@*/
];
/*@@H38@@*/

/* ---------- state & settings ---------- */
/*@@H39@@*/
const L=()=>LEVELS[SET.lvl];
/*@@H40@@*/
let round=null,timer=null,t0=0,focusQ=[];
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const rnd=a=>a[Math.random()*a.length|0];
/* ---------- controls UI ---------- */
function applyLevel(i,fromAuto){
  SET.lvl=i; const l=LEVELS[i]; SET.pairs=l.pairs; SET.tenses=[...l.tenses]; SET.persons=[...l.persons]; SET.runP=SET.runR=0; saveSet();
  if(fromAuto) toast((fromAuto>0?"⬆️ Level up: ":"⬇️ Easing to: ")+l.n);
  renderCtrls();
}
function renderCtrls(){
  const l=L();
  $("meter").innerHTML=LEVELS.map((x,i)=>`<button class="lv ${i<=SET.lvl?"fill":""} ${i===SET.lvl?"on":""}" style="--c:${x.c}" data-i="${i}"><i style="height:${6+i*5}px"></i>${x.n}</button>`).join("");
  $("meter").querySelectorAll(".lv").forEach(b=>b.onclick=()=>{applyLevel(+b.dataset.i);start()});
  $("autoBtn").classList.toggle("on",SET.auto);
  $("dirSeg").querySelectorAll("button").forEach(b=>b.classList.toggle("on",b.dataset.d===SET.dir));
  $("trapBtn").classList.toggle("on",SET.traps);
  $("pairs").value=SET.pairs;
  const tm=l.secPer?`${Math.round(l.secPer*SET.pairs)}s countdown`:"no time limit";
  $("lvDesc").innerHTML=`<b style="color:${l.c}">${l.n}${SET.auto?" (Auto)":""}:</b> top ${l.pool} verbs${l.irr?" (irregulars weighted)":""} · ${tm} · `+
    `${l.hints===Infinity?"unlimited hints":l.hints?l.hints+" hint"+(l.hints>1?"s":"")+" per round":"no hints"} · `+
    `${l.pen?"−"+l.pen+" pts per miss":l.reset?"miss resets streak":"no miss penalty"}${l.lives?` · ${l.lives} lives`:""}`+
    (SET.auto?` · <i>Auto: ${SET.runP}/3 perfect to level up</i>`:"");
  $("tenseChips").innerHTML=ALLT.map(k=>`<span class="chip ${SET.tenses.includes(k)?"on":""}" data-k="${k}" style="--c:${TENSES[k].c}">${TENSES[k].label}</span>`).join("");
  $("personChips").innerHTML=ALLP.map(k=>`<span class="chip ${SET.persons.includes(k)?"on":""}" data-k="${k}" style="--c:var(--blue)">${PERSONS[k].pt}</span>`).join("");
  const chipToggle=(box,key)=>$(box).querySelectorAll(".chip").forEach(c=>c.onclick=()=>{
    const k=c.dataset.k, arr=SET[key]; if(arr.includes(k)&&arr.length===1) return toast("Keep at least one on");
    SET[key]=arr.includes(k)?arr.filter(x=>x!==k):[...arr,k]; saveSet(); renderCtrls(); start();});
  chipToggle("tenseChips","tenses"); chipToggle("personChips","persons");
  updSummary();
}
$("autoBtn").onclick=()=>{SET.auto=!SET.auto;SET.runP=SET.runR=0;saveSet();renderCtrls();toast(SET.auto?"⚡ Auto difficulty on":"Auto difficulty off")};
$("dirSeg").querySelectorAll("button").forEach(b=>b.onclick=()=>{SET.dir=b.dataset.d;saveSet();renderCtrls();start()});
$("trapBtn").onclick=()=>{SET.traps=!SET.traps;saveSet();renderCtrls();toast(SET.traps?"🪤 Traps on: look-alike verbs will share rounds":"Traps off");start()};
$("pairs").onchange=()=>{SET.pairs=+$("pairs").value;saveSet();focusQ=[];renderCtrls();start()};
/* ---------- stats tracking ---------- */
function rec(inf,ok,tense,conf){
  const s=ST.verbs[inf]||(ST.verbs[inf]={r:0,w:0,c:{},last:0});
  if(ok) s.r++; else { s.w++; s.last=Date.now(); if(conf) s.c[conf]=(s.c[conf]||0)+1; }
  if(tense){ const t=ST.tenses[tense]||(ST.tenses[tense]={r:0,w:0}); ok?t.r++:t.w++; }
/*@@H41@@*/
}
function topConf(s){ const e=Object.entries(s.c||{}).sort((a,b)=>b[1]-a[1])[0]; return e?`“${e[0]}”`:""; }
function trouble(){
  return Object.entries(ST.verbs).filter(([inf,s])=>s.w>0&&VMAP[inf])
    .map(([inf,s])=>({inf,...s,acc:Math.round(s.r/(s.r+s.w)*100),score:(s.w+.5)/(s.r+s.w+1)*Math.log2(s.w+2)}))
    .sort((a,b)=>b.score-a.score||b.w-a.w);
}
/* ---------- audio ---------- */
let ac;
function tone(f,d=.12,type="sine",when=0){ if(!$("sfx").checked) return;
  try{ac=ac||new (window.AudioContext||window.webkitAudioContext)();}catch(e){return}
  const o=ac.createOscillator(),g=ac.createGain(),t=ac.currentTime+when;
  o.type=type;o.frequency.value=f;g.gain.setValueAtTime(.18,t);g.gain.exponentialRampToValueAtTime(.001,t+d);
  o.connect(g).connect(ac.destination);o.start(t);o.stop(t+d);}
const good=()=>{tone(660);tone(880,.15,"sine",.09)}, bad=()=>tone(180,.22,"square"), win=()=>[523,659,784,1047].forEach((f,i)=>tone(f,.18,"triangle",i*.11)),
      lose=()=>[392,330,262].forEach((f,i)=>tone(f,.25,"sawtooth",i*.16));
/* say() is replaced by the v12 speech engine further down */
var say=function(txt){ if(!$("voice").checked||!window.speechSynthesis) return;
  speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(txt); u.lang="pt-BR"; u.rate=.9;
  const vs=speechSynthesis.getVoices(), v=vs.find(v=>v.lang==="pt-BR")||vs.find(v=>v.lang.startsWith("pt")); if(v)u.voice=v;
  speechSynthesis.speak(u);};
/* ---------- top stats ---------- */
function stats(){ $("sScore").textContent=score; $("sStreak").textContent=streak; $("sBest").textContent=best;
  $("sMast").textContent=mastered.size+"/"+VERBS.length; $("mBar").style.width=(mastered.size/VERBS.length*100)+"%";
  const lv=round&&round.livesMax; $("livesBox").classList.toggle("hidden",!lv);
  if(lv) $("sLives").textContent="❤️".repeat(round.lives)+"🤍".repeat(round.livesMax-round.lives);
  const h=round?round.hints:0; $("hCount").textContent=h===Infinity?"∞":h; $("hintBtn").disabled=!round||h<=0||paused; $("pauseBtn").disabled=!round||round.over; }
function toast(m){const t=$("toast");t.textContent=m;t.classList.add("show");clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove("show"),1500)}
const fmt=s=>(s/60|0)+":"+String(Math.max(0,s)%60).padStart(2,"0");
let pausedMs=0,pauseAt=0,paused=false;
const elapsed=()=>((paused?pauseAt:Date.now())-t0-pausedMs)/1000;
function setPause(on,why){
  if(!round||round.over||on===paused) return;
  paused=on;
  if(on){ pauseAt=Date.now(); $("pauseWhy").textContent=why||"Your timer is stopped."; }
  else pausedMs+=Date.now()-pauseAt;
  $("pauseOv").classList.toggle("hidden",!on);
  $("pauseBtn").classList.toggle("on",on); $("pauseBtn").innerHTML=on?'▶️<span class="ab-l">&nbsp;Resume</span>':'⏸️<span class="ab-l">&nbsp;Pause</span>';
  $("hintBtn").disabled=on||!round||round.hints<=0;
  if(window.speechSynthesis&&on) speechSynthesis.cancel();
}
$("pauseBtn").onclick=()=>setPause(!paused);
$("resumeBtn").onclick=()=>setPause(false);
document.addEventListener("visibilitychange",()=>{ if(document.hidden) setPause(true,"Paused automatically while you were away."); });
document.addEventListener("keydown",e=>{ if((e.key==="p"||e.key==="P")&&!/INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)&&!$("gameCtrls").classList.contains("hidden")) setPause(!paused); });
function startTimer(){
  clearInterval(timer); t0=Date.now(); pausedMs=0; paused=false; $("pauseOv").classList.add("hidden");
  $("pauseBtn").classList.remove("on"); $("pauseBtn").innerHTML='⏸️<span class="ab-l">&nbsp;Pause</span>'; const lim=round.limit;
  $("sTimeLbl").textContent=lim?"Time left ⏳":"Time"; $("timeBox").classList.remove("warn");
  const tick=()=>{if(paused) return; const el=elapsed()|0;
    if(lim){const left=lim-el; $("sTime").textContent=fmt(left); $("timeBox").classList.toggle("warn",left<=10);
      if(left<=0){clearInterval(timer); gameOver("time");}}
    else $("sTime").textContent=fmt(el);};
  tick(); timer=setInterval(tick,250);
}
function addPoints(){ streak++; const pts=10+Math.min(streak,10)*2+SET.lvl*3; score+=pts;
/*@@H42@@*/
  stats(); }
function penalize(){ const l=L(); if(l.reset) streak=0; if(l.pen) score=Math.max(0,score-l.pen);
  bad(); if(round.livesMax){ round.lives--; stats(); if(round.lives<=0){ clearInterval(timer); setTimeout(()=>gameOver("lives"),450); return true; } }
  stats(); return false; }
/*@@H43@@*/
/* ---------- build round items ---------- */
function poolVerbs(){ return VERBS.filter(v=>v.rank<L().pool); }
function pickVerb(used){
  if(focusQ.length){ const v=VMAP[focusQ.shift()]; v._focus=true; return v; }
  const pool=poolVerbs().filter(v=>!used.has(v.inf));
  if(L().irr&&Math.random()<.5){ const ir=pool.filter(v=>v.irr); if(ir.length) return rnd(ir); }
  return rnd(pool);
}
function makeItem(v,force,focused){
  if(SET.fmt!=="conj") return {v,pt:v.inf,en:v.gloss,tense:null};
  let ts=SET.tenses.filter(k=>!(k==="go"&&v.noGo)); if(!ts.length){ if(!focused) return null; ts=["pres"]; }
  const tense=force&&force.tense||rnd(ts), pk=force&&force.person||rnd(SET.persons), p=PERSONS[pk], c=simple(v.inf);
  return {v,tense,person:pk,pt:TENSES[tense].pt(v,p,c),en:TENSES[tense].en(v,p)};
}
function buildItems(n){
  const items=[],seenP=new Set(),seenE=new Set(),used=new Set();
  const add=it=>{ if(!it||items.length>=n||seenP.has(it.pt)||seenE.has(it.en)) return false;
    seenP.add(it.pt);seenE.add(it.en);used.add(it.v.inf);it.id=items.length;it.missed=false;items.push(it);return true; };
  if(SET.traps&&!focusQ.length){
    const goal=Math.ceil(n*.6);
    const pool=L().pool;
    for(const g of shuffle(TRAPS.filter(x=>x.every(i=>VMAP[i].rank<pool)).map(x=>[...x]))){ if(items.length>=goal) break;
      if(g.some(x=>used.has(x))) continue; g.forEach(inf=>add(makeItem(VMAP[inf]))); }
    if(SET.fmt==="conj"&&items.length<n-1){
      const v=pickVerb(used), base=makeItem(v); if(base&&add(base)){
        const alt=SET.persons.filter(x=>x!==base.person);
        add(makeItem(v,alt.length?{tense:base.tense,person:rnd(alt)}:{person:base.person})); }
    }
  }
  let guard=0;
  while(items.length<n&&guard++<600){ const v=pickVerb(used); if(!v){used.clear();continue} const f=!!v._focus; delete v._focus;
    let it=makeItem(v,null,f); for(let k=0;f&&k<8&&!add(it);k++) it=makeItem(v,null,f); if(!f) add(it); }
  return items;
}
/* ---------- MATCH (column) game ---------- */
function newRoundState(items){
  const l=L();
  return {items,done:0,mistakes:0,moves:0,hints:l.hints,lives:l.lives,livesMax:l.lives,
    limit:l.secPer?Math.round(l.secPer*items.length*(mode==="memory"?1.6:1)):0,over:false};
}
function newMatch(){
  const items=buildItems(SET.pairs);
  round=Object.assign(newRoundState(items),{sel:{L:null,R:null}});
  items.forEach(it=>it.flip=SET.dir==="en"||(SET.dir==="mix"&&Math.random()<.5));
  const tile=(it,side)=>{const left=side==="L", showPt=left!==it.flip, lang=showPt?"pt":"en";
/*@@H44@@*/
  $("play").innerHTML=`<div class="board"><div><p class="colhead">${head[0]}</p><div class="tiles">${shuffle([...items]).map(i=>tile(i,"L")).join("")}</div></div>
    <div><p class="colhead">${head[1]}</p><div class="tiles">${shuffle([...items]).map(i=>tile(i,"R")).join("")}</div></div></div>`;
  $("play").querySelectorAll(".tile").forEach(t=>t.onclick=()=>pick(t));
  stats(); startTimer();
}
function pick(el){
  if(paused||round.over||el.classList.contains("ok")) return;
  const s=el.dataset.side, sel=round.sel;
  if(sel[s]===el){el.classList.remove("sel");sel[s]=null;return}
  if(sel[s]) sel[s].classList.remove("sel");
  sel[s]=el; el.classList.add("sel");
  if(el.dataset.lang==="pt") say(el.firstChild.textContent);
  if(sel.L&&sel.R){
    const a=sel.L,b=sel.R; round.moves++; round.sel={L:null,R:null};
    a.classList.remove("sel");b.classList.remove("sel");
    if(a.dataset.id===b.dataset.id){
      a.classList.add("ok");b.classList.add("ok"); const it=round.items[+a.dataset.id];
      good(); addPoints(); if(!it.missed){rec(it.v.inf,true,it.tense);master(it.v.inf);} round.done++;
      if(round.done===round.items.length) finish();
    } else {
      const ia=round.items[+a.dataset.id], ib=round.items[+b.dataset.id];
      ia.missed=ib.missed=true; round.mistakes++;
      logMiss(a,b);
      a.classList.add("wrong");b.classList.add("wrong");
      setTimeout(()=>{a.classList.remove("wrong");b.classList.remove("wrong")},420);
      if(penalize()) round.over=true;
    }
  }
}
function logMiss(a,b){
  const ia=round.items[+a.dataset.id], ib=round.items[+b.dataset.id];
  const la=a.dataset.lang, lb=b.dataset.lang;
  if(la!==lb){ const ptT=la==="pt"?a:b, enT=ptT===a?b:a, ip=round.items[+ptT.dataset.id], ie=round.items[+enT.dataset.id];
    rec(ip.v.inf,false,ip.tense,ie.en); unmaster(ip.v.inf); }
  else { [ia,ib].forEach(it=>{rec(it.v.inf,false,it.tense,null);unmaster(it.v.inf);}); }
}
/* ---------- MEMORY game ---------- */
function newMemory(){
  const items=buildItems(SET.pairs);
  round=Object.assign(newRoundState(items),{open:[],lock:false});
  const cards=shuffle(items.flatMap(it=>[{id:it.id,side:"pt",txt:it.pt},{id:it.id,side:"en",txt:it.en}]));
  const n=items.length, cols=n>=12?6:n>=10?5:4;
/*@@H45@@*/
  $("play").querySelectorAll(".card").forEach(c=>c.onclick=()=>flip(c));
  stats(); startTimer();
}
function flip(c){
  if(paused||round.over||round.lock||c.classList.contains("flip")||c.classList.contains("ok")) return;
  c.classList.add("flip"); tone(440,.06,"triangle"); round.open.push(c);
  if(c.dataset.side==="pt") say(c.querySelector(".front span").textContent);
  if(round.open.length===2){
    const [a,b]=round.open; round.moves++; round.open=[];
    if(a.dataset.id===b.dataset.id&&a.dataset.side!==b.dataset.side){
      setTimeout(()=>{a.classList.add("ok");b.classList.add("ok");good();addPoints();
        const it=round.items[+a.dataset.id]; if(!it.missed){rec(it.v.inf,true,it.tense);master(it.v.inf);}
        if(++round.done===round.items.length) finish();},350);
    } else {
      round.lock=true; round.mistakes++;
      if(a.dataset.side!==b.dataset.side){
        const p=a.dataset.side==="pt"?a:b, e=p===a?b:a, ip=round.items[+p.dataset.id], ie=round.items[+e.dataset.id];
        ip.missed=true; rec(ip.v.inf,false,ip.tense,ie.en); unmaster(ip.v.inf);
        if(penalize()) round.over=true;
      } else { if(L().reset) streak=0; stats(); }
      setTimeout(()=>{a.classList.remove("flip");b.classList.remove("flip");round.lock=false},950);
    }
  }
}
/* ---------- hint ---------- */
$("hintBtn").onclick=()=>{
  if(!round||paused||round.over||round.hints<=0) return; round.hints--; streak=0; stats();
  if(mode==="memory"){ round.lock=true; document.querySelectorAll(".card:not(.ok)").forEach(c=>c.classList.add("flip"));
    setTimeout(()=>{document.querySelectorAll(".card:not(.ok)").forEach(c=>c.classList.remove("flip"));round.open=[];round.lock=false},1300); return; }
  const left=[...document.querySelectorAll('.tile[data-side="L"]:not(.ok)')]; if(!left.length) return;
  const id=rnd(left).dataset.id; round.items[+id].missed=true;
  document.querySelectorAll(`.tile[data-id="${id}"]`).forEach(x=>{x.classList.remove("hint");void x.offsetWidth;x.classList.add("hint")});
};
/* ---------- auto difficulty ---------- */
function autoAdjust(acc,perfect,failed){
  if(!SET.auto||focusQ.length) return;
  if(perfect){SET.runP++;SET.runR=0} else if(failed||acc<70){SET.runR++;SET.runP=0} else {SET.runP=0;SET.runR=0}
  if(SET.runP>=3&&SET.lvl<3) applyLevel(SET.lvl+1,1);
  else if(SET.runR>=2&&SET.lvl>0) applyLevel(SET.lvl-1,-1);
  else { saveSet(); renderCtrls(); }
}
/* ---------- finish / game over ---------- */
function reviewHTML(){
  return round.items.map(it=>`<div><span>${it.missed?"❌":round.failed&&!it.done?"⏸️":"✅"} <b class="rv" data-v="${it.v.inf}" style="color:var(--green);cursor:pointer;text-decoration:underline dotted">${it.pt}</b> = ${it.en}</span>${it.tense?`<span class="tag" style="--c:${TENSES[it.tense].c}">${TENSES[it.tense].label}</span>`:`<span style="color:var(--muted);font-size:12px">${it.v.p} · ${it.v.pt} · ${it.v.f}</span>`}</div>`).join("");
}
function showModal(title,sub,sum,btn){
  $("mTitle").textContent=title; $("mSub").textContent=sub; $("mSum").innerHTML=sum; $("mReview").innerHTML=reviewHTML(); $("mNext").textContent=btn;
  $("mReview").querySelectorAll(".rv").forEach(b=>b.onclick=()=>{ if(VMAP[b.dataset.v]) openVerb(b.dataset.v); });
  setTimeout(()=>$("modal").classList.add("show"),450);
}
/*@@H46@@*/
function finish(){
  clearInterval(timer); round.over=true; const secs=Math.round(elapsed());
  const timeBonus=round.limit?Math.max(0,round.limit-secs):Math.max(0,90-secs);
  const bonus=timeBonus+(round.mistakes===0?50:0)+(round.livesMax?round.lives*15:0);
/*@@H47@@*/
  const acc=Math.round(round.items.length/(round.items.length+round.mistakes)*100);
  logRound(acc,secs,false); win(); confetti(); $("banner").classList.add("hidden");
  const lvBefore=SET.lvl; autoAdjust(acc,round.mistakes===0,false);
  const lvMsg=SET.lvl!==lvBefore?` Auto moved you to ${L().n}.`:"";
/*@@H48@@*/
    (round.mistakes===0?"Flawless round. +50 perfect bonus!":"Missed words are saved to My Stats. Click any verb below to study it.")+lvMsg,
/*@@H49@@*/
}
function gameOver(why){
  if(!round||round.failed||(round.over&&round.done===round.items.length)) return; round.over=true; round.failed=true; clearInterval(timer);
  const secs=Math.round(elapsed()), acc=Math.round(round.done/Math.max(1,round.done+round.mistakes)*100);
  logRound(acc,secs,true); lose(); streak=0; stats();
  round.items.forEach(it=>{ const done=document.querySelector(`[data-id="${it.id}"].ok`); it.done=!!done; });
  const lvBefore=SET.lvl; autoAdjust(acc,false,true);
/*@@H50@@*/
    `You matched ${round.done} of ${round.items.length} pairs.`+(SET.lvl!==lvBefore?` Auto moved you to ${L().n}.`:""),
/*@@H51@@*/
}
$("mClose").onclick=()=>$("modal").classList.remove("show");
$("mNext").onclick=()=>{$("modal").classList.remove("show");start()};
/* ---------- confetti ---------- */
function confetti(){
  const cv=$("fx"),x=cv.getContext("2d"); cv.width=innerWidth; cv.height=innerHeight;
/*@@H52@@*/
  const P=Array.from({length:170},()=>({x:innerWidth/2,y:innerHeight*.35,vx:(Math.random()-.5)*16,vy:Math.random()*-14-4,r:Math.random()*6+4,c:cols[Math.random()*5|0],a:Math.random()*6,s:Math.random()>.5}));
  let f=0;(function loop(){x.clearRect(0,0,cv.width,cv.height);
    P.forEach(p=>{p.vy+=.45;p.vx*=.99;p.x+=p.vx;p.y+=p.vy;p.a+=.2;x.save();x.translate(p.x,p.y);x.rotate(p.a);x.fillStyle=p.c;
      if(p.s){x.fillRect(-p.r/2,-p.r/4,p.r,p.r/2)}else{x.beginPath();x.moveTo(0,-p.r/1.4);x.lineTo(p.r/1.4,0);x.lineTo(0,p.r/1.4);x.lineTo(-p.r/1.4,0);x.fill()}x.restore()});
    if(++f<150)requestAnimationFrame(loop);else x.clearRect(0,0,cv.width,cv.height)})();
}
/* ---------- verb detail pop-up ---------- */
/*@@H53@@*/
const VSECTIONS=[
 {name:"Indicative",cards:[
/*@@H54@@*/
 {name:"Subjunctive",cards:[
/*@@H55@@*/
 {name:"Compound",cards:[
/*@@H56@@*/
  ["impA","Imperativo afirmativo","#e63946",v=>`${enBase(v)[0].toUpperCase()+enBase(v).slice(1)}!`],
/*@@H57@@*/
];
let vTab=0, vInf=null;
function openVerb(inf){
  vInf=inf; $("vSpeak").onclick=vSpeakVerb; const v=VMAP[inf], c=full(inf), s=ST.verbs[inf];
  $("vTitle").textContent=inf;
/*@@H58@@*/
  const traps=TRAPS.filter(g=>g.includes(inf)).flat().filter(x=>x!==inf);
/*@@H59@@*/
    (traps.length?`<span>🪤 Don't confuse with <b>${[...new Set(traps)].join(", ")}</b></span>`:"")+(mastered.has(inf)?`<span>★ Mastered</span>`:"");
  $("vTabs").innerHTML=VSECTIONS.map((x,i)=>`<button data-i="${i}" class="${i===vTab?"on":""}">${x.name}</button>`).join("")+`<button data-i="all" class="${vTab==="all"?"on":""}">Show all</button>`;
  $("vTabs").querySelectorAll("button").forEach(b=>b.onclick=()=>{vTab=b.dataset.i==="all"?"all":+b.dataset.i;openVerb(inf)});
/*@@H60@@*/
  const secs=vTab==="all"?VSECTIONS:[VSECTIONS[vTab]];
  const statLine=s&&(s.r+s.w)?`<div class="vstat">📊 Your record: <b>${s.r}</b> right · <b>${s.w}</b> wrong (${Math.round(s.r/(s.r+s.w)*100)}% accuracy)${topConf(s)?` · most often confused with <b>${topConf(s)}</b>`:""}</div>`:"";
  $("vBody").innerHTML=statLine+secs.map(sec=>`${vTab==="all"?`<h3 style="margin:14px 0 8px;color:var(--blue)">${sec.name}</h3>`:""}<div class="vgrid">${sec.cards.map(([k,name,col,en,pre=""])=>
    `<div class="vc" style="--c:${col}"><h4>${name}</h4><div class="en">${en(v)}</div><table>${c[k].map((f,i)=>
      `<tr><td class="pn">${pre}${PERS5[i]}</td><td class="f" data-s="${f==="—"?"":(k==="impA"||k==="impN"?f:PERS5[i].split(" /")[0]+" "+f)}">${f}</td><td class="pe">${f==="—"?"":persEn(k,i)}</td></tr>`).join("")}</table></div>`).join("")}</div>`).join("")+
/*@@H61@@*/
  $("vBody").querySelectorAll("td.f").forEach(td=>td.onclick=()=>td.dataset.s&&say(td.dataset.s));
  $("vBody").scrollTop=0; const ot=$("vTabs").querySelector(".on"); if(ot) ot.scrollIntoView({block:"nearest",inline:"center"});
  $("vmodal").classList.add("show");
}
$("vClose").onclick=()=>$("vmodal").classList.remove("show");
$("vmodal").onclick=e=>{if(e.target.id==="vmodal")$("vmodal").classList.remove("show")};
/*@@H62@@*/
document.addEventListener("keydown",e=>{if(e.key==="Escape"){document.querySelectorAll(".modal.show").forEach(m=>m.classList.remove("show"))}});

/* ---------- STATS page ---------- */
const MODE_LBL={meaning:"🎯 Match Up",conj:"🔁 Conjugation",memory:"🃏 Memory",wfill:"✏️ Fill the Blank",wmatch:"🔗 Sentence Match"};
function ago(t){const m=(Date.now()-t)/60000;return m<1?"just now":m<60?Math.round(m)+" min ago":m<1440?Math.round(m/60)+" h ago":Math.round(m/1440)+" d ago"}
var renderStats=function(){
  const vs=Object.values(ST.verbs), R=vs.reduce((a,s)=>a+s.r,0), W=vs.reduce((a,s)=>a+s.w,0), tr=trouble();
  const acc=R+W?Math.round(R/(R+W)*100):0;
  const card=(l,v)=>`<div class="stat"><span>${l}</span><b>${v}</b></div>`;
  const rows=tr.slice(0,15).map((t,i)=>`<tr><td>${i+1}</td><td class="v" data-v="${t.inf}">${t.inf}</td><td>${VMAP[t.inf].gloss}</td>
    <td style="color:var(--bad);font-weight:800">${t.w}</td><td>${t.r}</td>
    <td><div style="display:flex;align-items:center;gap:6px"><div class="mbar"><i style="width:${100-t.acc}%"></i></div>${t.acc}%</div></td>
    <td style="font-size:12px">${topConf(t)||"—"}</td><td style="font-size:12px;color:var(--muted)">${ago(t.last)}</td></tr>`).join("");
  const tb=ALLT.map(k=>{const t=TENSES[k],s=ST.tenses[k]||{r:0,w:0},n=s.r+s.w,a=n?Math.round(s.r/n*100):0;
    return `<div class="tbar"><span>${t.label}</span><div class="tr"><i style="width:${a}%;background:${t.c}"></i></div><b style="width:72px;text-align:right">${n?a+"%":"—"}</b></div>`}).join("");
  const last=ST.rounds.slice(-20);
  const spark=last.length>1?(()=>{const Wd=320,H=70,y=a=>(H-4-(a/100)*(H-8)).toFixed(1),xx=i=>(i/(last.length-1)*Wd).toFixed(1);
    return `<svg viewBox="0 0 ${Wd} ${H}" style="width:100%;height:80px"><line x1="0" x2="${Wd}" y1="${y(75)}" y2="${y(75)}" stroke="#ffdf00" stroke-dasharray="4"/><polyline points="${last.map((r,i)=>xx(i)+","+y(r.a)).join(" ")}" fill="none" stroke="#009c3b" stroke-width="3" stroke-linejoin="round"/>${last.map((r,i)=>`<circle cx="${xx(i)}" cy="${y(r.a)}" r="3.5" fill="${r.f?"#6a4c93":r.x?"#e63946":"#009c3b"}"/>`).join("")}</svg><div style="font-size:11px;color:var(--muted)">Accuracy, last ${last.length} rounds · dashed line = 75% · purple = timed out / out of lives</div>`})():`<div class="empty">Play two or more rounds to see your trend.</div>`;
  const hist=ST.rounds.slice(-8).reverse().map(r=>`<tr><td>${MODE_LBL[r.m]||r.m}</td><td>${r.l!=null?`<span style="color:${LEVELS[r.l].c};font-weight:700">${LEVELS[r.l].n}</span>`:"—"}</td><td>${r.n} ${r.m==="story"?"Qs":"pairs"}</td><td>${r.f?"❌ "+r.a+"%":r.a+"%"}</td><td>${r.s}s</td><td style="color:var(--muted)">${ago(r.d)}</td></tr>`).join("");
  $("statsView").innerHTML=`
   <div class="st-grid">${card("Rounds",ST.rounds.length)}${card("Correct",R)}${card("Misses",W)}${card("Accuracy",acc+"%")}${card("Best streak",ST.bestStreak||0)}${card("Level",`<span style="color:${L().c}">${L().n}</span>`)}</div>
   <div class="panel"><h3>🎯 Words you get wrong most <span class="spacer"></span>
     <button class="btn alt sm" id="drill" ${tr.length?"":"disabled"}>Practice these now</button>
     <button class="btn alt sm" id="drillC" ${tr.length?"":"disabled"}>Practice conjugations</button></h3>
     ${tr.length?`<div class="bank" style="box-shadow:none;max-height:none"><table class="miss"><thead><tr><th>#</th><th>Verb</th><th>Meaning</th><th>Wrong</th><th>Right</th><th>Accuracy</th><th>You confused it with</th><th>Last missed</th></tr></thead><tbody>${rows}</tbody></table></div>
     <div class="vnote">Ranked by how often and how consistently you miss them. Click a verb to open its full conjugation.</div>`:`<div class="empty">No misses yet. Play a few rounds and your trouble verbs will show up here.</div>`}
   </div>
   <div class="two">
     <div class="panel"><h3>📈 Progress</h3>${spark}
       ${hist?`<table style="margin-top:8px"><thead><tr><th>Mode</th><th>Level</th><th>Size</th><th>Accuracy</th><th>Time</th><th>When</th></tr></thead><tbody>${hist}</tbody></table>`:""}</div>
     <div class="panel"><h3>⏱️ Accuracy by tense</h3>${tb}<div class="vnote">From Conjugation Match rounds.</div>
       <div style="margin-top:14px;display:flex;gap:6px;justify-content:flex-end;flex-wrap:wrap">
         <button class="btn ghost sm" id="bkExport">⬇️ Back up progress</button>
         <button class="btn ghost sm" id="bkImport">⬆️ Restore backup</button>
         <button class="btn ghost sm" id="reset">Reset all stats</button></div>
       <div class="vnote">Backups save your stats, mastered verbs, learned slang, finished stories and settings to a file. On iPhone it goes to the Files app.</div></div>
   </div>`;
  $("statsView").querySelectorAll("td.v").forEach(td=>td.onclick=()=>openVerb(td.dataset.v));
  const drill=m=>{const list=tr.slice(0,SET.pairs).map(t=>t.inf);focusQ=shuffle(list);
    $("banner").textContent=`🎯 Practice round: your ${list.length} most-missed verb${list.length>1?"s":""}${list.length<SET.pairs?" plus a few others":""}. Traps and Auto pause for this round.`;
    $("banner").classList.remove("hidden"); setMode(m,true);};
  if($("drill")) $("drill").onclick=()=>drill("meaning");
  if($("drillC")) $("drillC").onclick=()=>drill("conj");
  $("bkExport").onclick=exportBackup; $("bkImport").onclick=importBackup;
  $("reset").onclick=()=>{ if(!confirm("Reset all stats, best score and mastered verbs?")) return;
    ST={verbs:{},tenses:{},rounds:[],bestStreak:0}; mastered.clear(); best=0;
/*@@H63@@*/
}
/* ---------- Verb bank ---------- */
const G=[
/*@@H64@@*/
];
/*@@H65@@*/
$("guide").innerHTML=G.map(([h,c,b])=>`<div class="g" style="--c:${c}"><h4>${h}</h4>${b}</div>`).join("");
$("bankHead").innerHTML=`<th>#</th><th>Verb</th><th>Meaning</th>`+BANK_T.map(k=>`<th style="background:${TENSES[k].c}">${TENSES[k].label}</th>`).join("");
function renderBank(){
  const q=$("q").value.trim().toLowerCase(), only=$("onlyMast").checked, om=$("onlyMiss").checked;
  $("bankBody").innerHTML=VERBS.filter(v=>(!q||v.inf.includes(q)||v.gloss.toLowerCase().includes(q))&&(!only||mastered.has(v.inf))&&(!om||(ST.verbs[v.inf]&&ST.verbs[v.inf].w)))
/*@@H66@@*/
  $("bankBody").querySelectorAll("td.v").forEach(td=>td.onclick=()=>openVerb(td.dataset.v));
}
$("q").oninput=renderBank; $("onlyMast").onchange=renderBank; $("onlyMiss").onchange=renderBank;
/* ---------- navigation ---------- */
function start(){
  $("modal").classList.remove("show");
  const isBank=mode==="bank", isStats=mode==="stats", isWords=mode==="words", isSlang=mode==="slang", isVocab=mode==="vocab", game=!isBank&&!isStats&&!isWords&&!isSlang&&!isVocab;
  $("vocabView").classList.toggle("hidden",!isVocab);
  $("slangView").classList.toggle("hidden",!isSlang);
  $("wordsView").classList.toggle("hidden",!isWords);
  $("bankView").classList.toggle("hidden",!isBank); $("statsView").classList.toggle("hidden",!isStats);
  $("play").classList.toggle("hidden",!game); $("gameCtrls").classList.toggle("hidden",!game);$("stats").classList.toggle("hidden",!game);
  $("conjCtrls").classList.toggle("hidden",SET.fmt!=="conj");
  $("dirSeg").style.opacity=mode==="memory"?.45:1; $("dirSeg").title=mode==="memory"?"Direction doesn't apply to Memory Flip":"";
  if(window.__storyReady) stopStory();
  if(!game){clearInterval(timer);paused=false;$("pauseOv").classList.add("hidden");round=null;$("banner").classList.add("hidden");isBank?renderBank():isStats?renderStats():isSlang?renderSlang():isVocab?renderVocab():renderWords();return}
  if(!focusQ.length) $("banner").classList.add("hidden");
  mode==="memory"?newMemory():newMatch();
}
function setMode(m,keepFocus){ if(!keepFocus) focusQ=[]; mode=m; $("nav").querySelectorAll("button").forEach(x=>x.classList.toggle("on",x.dataset.m===m)); start(); }
$("nav").querySelectorAll("button").forEach(b=>b.onclick=()=>setMode(b.dataset.m));
$("newBtn").onclick=()=>{focusQ=[];start()};

renderCtrls(); stats(); start();
/* =====================================================================
   ARTICLES & CONNECTORS
   ===================================================================== */
const WGROUPS={
/*@@H67@@*/
  mix:{label:"Which preposition?",c:"#e63946"},
  conn:{label:"Connectors",c:"#b5651d"}
};
/*@@H68@@*/
const WITEMS=[
/*@@H69@@*/
].map(([s,a,en,g,opts],id)=>({id,s,a,en,g,opts}));
/*@@H70@@*/
const cap=x=>x[0].toUpperCase()+x.slice(1);
/*@@H71@@*/
const fillS=(it,w)=>it.s.replace("__",atStart(it)?cap(w):w);
function whyOf(it){
  const a=it.a;
/*@@H72@@*/
  if(ART_INFO[a]) return `<b>${a}</b> = ${ART_INFO[a]}`;
/*@@H73@@*/
}
/*@@H74@@*/
let WR=null;
if(!ST.words) ST.words={}; if(!ST.wcats) ST.wcats={};
function wrec(it,ok,picked){
  const k=it.a, s=ST.words[k]||(ST.words[k]={r:0,w:0,c:{},g:it.g,last:0});
  if(ok) s.r++; else { s.w++; s.last=Date.now(); if(picked) s.c[picked]=(s.c[picked]||0)+1; }
  const c=ST.wcats[it.g]||(ST.wcats[it.g]={r:0,w:0}); ok?c.r++:c.w++;
/*@@H75@@*/
}
var wpool=function(){
  const pool=WITEMS.filter(i=>WSET.cats.includes(i.g));
  const weak=Object.entries(ST.words).filter(([,s])=>s.w>s.r/2).map(([k])=>k);
  return shuffle(pool).sort((x,y)=>(weak.includes(y.a)?1:0)-(weak.includes(x.a)?1:0)+(Math.random()-.5)*.8);
};
function renderWords(){
  const v=$("wordsView"), sub=WSET.sub;
  v.innerHTML=`
   <div class="controls">
     <div class="seg" id="wSub">
       <button data-s="guide" class="${sub==="guide"?"on":""}">📖 Guide</button>
       <button data-s="fill" class="${sub==="fill"?"on":""}">✏️ Fill the Blank</button>
       <button data-s="match" class="${sub==="match"?"on":""}">🔗 Sentence Match</button>
     </div>
     ${sub==="guide"?"":`<span class="spacer"></span><label>Questions <select id="wLen">${[6,8,10,15,20].map(n=>`<option ${n===WSET.len?"selected":""}>${n}</option>`).join("")}</select></label>
       <button class="btn go" id="wNew">New round</button>
       <button class="fbtn ${WSET.copen?"on":""}" id="wCatBtn">${WSET.cats.length===Object.keys(WGROUPS).length?"All topics":WSET.cats.length+" topic"+(WSET.cats.length>1?"s":"")} ▾</button>
       <div class="fpanel ${WSET.copen?"":"hidden"}" style="flex-direction:row;flex-wrap:wrap;align-items:center;gap:6px"><span class="ctl-lbl">Practice</span>
       <span class="chip ${WSET.cats.length===Object.keys(WGROUPS).length?"on":""}" id="wAll" style="--c:var(--blue)">All</span>
       ${Object.entries(WGROUPS).map(([k,g])=>`<span class="chip ${WSET.cats.includes(k)?"on":""}" data-k="${k}" style="--c:${g.c}">${g.label}</span>`).join("")}</div>`}
   </div>
   <div id="wBody"></div>`;
  v.querySelectorAll("#wSub button").forEach(b=>b.onclick=()=>{WSET.sub=b.dataset.s;saveW();renderWords()});
  if(sub!=="guide"){
    $("wLen").onchange=()=>{WSET.len=+$("wLen").value;saveW();renderWords()};
    $("wNew").onclick=()=>renderWords();
    $("wCatBtn").onclick=()=>{WSET.copen=!WSET.copen;saveW();renderWords()};
    $("wAll").onclick=()=>{WSET.cats=Object.keys(WGROUPS);saveW();renderWords()};
    v.querySelectorAll(".chip[data-k]").forEach(c=>c.onclick=()=>{const k=c.dataset.k;
      if(WSET.cats.length===Object.keys(WGROUPS).length) WSET.cats=[k];
      else if(WSET.cats.includes(k)){ if(WSET.cats.length===1) return toast("Keep at least one on"); WSET.cats=WSET.cats.filter(x=>x!==k); }
      else WSET.cats.push(k);
      saveW(); renderWords();});
  }
  sub==="guide"?renderGuide():sub==="fill"?newFill():newSMatch();
}
function renderGuide(){
  const T=(head,rows)=>`<table class="gt"><thead><tr>${head.map(h=>`<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
  const b=x=>`<b class="hl">${x}</b>`;
  $("wBody").innerHTML=`
  <div class="panel"><h3>🧩 The big idea</h3>
/*@@H76@@*/
  <div class="two" style="grid-template-columns:1fr 1fr">
   <div class="panel"><h3>“The” · definite articles</h3>
/*@@H77@@*/
   <div class="panel"><h3>“A / an / some” · indefinite articles</h3>
/*@@H78@@*/
  </div>
/*@@H79@@*/
   <div class="ex-grid">
/*@@H80@@*/
   </div>
/*@@H81@@*/
  <div class="two" style="grid-template-columns:1fr 1fr">
/*@@H82@@*/
    <ul class="gl">
/*@@H83@@*/
    </ul></div>
  </div>
  <div class="panel"><h3>📌 Key rules</h3>
   <div class="rules">
/*@@H84@@*/
   </div></div>
  <div class="panel"><h3>🧵 Connectors: words that join sentences</h3>
   ${T(["Job","Connectors","Example"],[
/*@@H85@@*/
  <div style="text-align:center;margin:6px 0 18px"><button class="btn go" onclick="WSET.sub='fill';saveW();renderWords()">✏️ Test yourself</button></div>`;
}
/*@@H86@@*/
function optsFor(it){
  let o=it.opts?[...it.opts]:[...WGROUPS[it.g].forms];
  if(atStart(it)) o=o.map(cap);
  return shuffle(o);
}
function newFill(){
  const items=wpool().slice(0,WSET.len);
  WR={type:"fill",items,i:0,right:0,wrong:[],streak:0,answered:false};
  showQ();
}
function showQ(){
  const it=WR.items[WR.i], g=WGROUPS[it.g], opts=optsFor(it);
  const pct=Math.round(WR.i/WR.items.length*100);
  $("wBody").innerHTML=`
   <div class="panel q">
    <div class="qtop"><span class="tag" style="--c:${g.c}">${g.label}</span><span class="gn">Question ${WR.i+1} of ${WR.items.length} · ✅ ${WR.right} · 🔥 ${WR.streak}</span></div>
    <div class="bar" style="margin:8px 0 18px"><i style="width:${pct}%"></i></div>
    <div class="qs">${it.s.replace("__",'<span class="blank" id="blank">?</span>')}</div>
    <div class="qen">${it.en}</div>
    <div class="qopts">${opts.map((o,k)=>`<button class="qo" data-o="${o}"><small>${k+1}</small>${o}</button>`).join("")}</div>
    <div id="qfb" class="qfb"></div>
   </div>`;
  $("wBody").querySelectorAll(".qo").forEach(b=>b.onclick=()=>answer(b));
}
function answer(btn){
  if(WR.answered) return; WR.answered=true;
  const it=WR.items[WR.i], pick=btn.dataset.o.toLowerCase(), ok=pick===it.a;
  const correct=fillS(it,it.a);
  $("wBody").querySelectorAll(".qo").forEach(b=>{b.disabled=true; if(b.dataset.o.toLowerCase()===it.a) b.classList.add("right");});
  const bl=$("blank"); bl.textContent=atStart(it)?cap(it.a):it.a; bl.classList.add(ok?"ok":"bad");
  if(ok){ WR.right++; WR.streak++; good(); score+=10+Math.min(WR.streak,10)*2; }
  else { btn.classList.add("wrong"); WR.streak=0; bad(); WR.wrong.push({it,pick}); }
  wrec(it,ok,ok?null:pick);
/*@@H87@@*/
  say(correct);
/*@@H88@@*/
    <button class="btn go" id="qNext">${WR.i+1<WR.items.length?"Next ➜":"See results"}</button> <span class="gn">or press Enter</span>`;
  $("qNext").onclick=nextQ; $("qNext").focus();
}
function nextQ(){ WR.answered=false; if(++WR.i<WR.items.length) showQ(); else wFinish(); }
function newSMatch(){
  const n=Math.min(WSET.len,10), pool=wpool(), items=[], seenEn=new Set();
  for(const it of pool){ if(items.length>=n) break; if(seenEn.has(it.en)) continue;
    items.push(it); seenEn.add(it.en);
    const sib=pool.find(x=>x.g===it.g&&x.a!==it.a&&!items.includes(x)&&!seenEn.has(x.en));
    if(sib&&items.length<n){items.push(sib);seenEn.add(sib.en);} }
  WR={type:"match",items,done:0,mistakes:0,missed:new Set(),sel:{L:null,R:null},wrong:[]};
  const hl=it=>fillS(it,`<b class="hl">${atStart(it)?cap(it.a):it.a}</b>`);
  const tile=(it,side)=>`<div class="tile" data-side="${side}" data-id="${it.id}" data-lang="${side==="L"?"pt":"en"}"><span>${side==="L"?hl(it):it.en.replace(/\s*\(.*\)$/,"")}</span></div>`;
/*@@H89@@*/
   <div><p class="colhead">🇺🇸 English</p><div class="tiles">${shuffle([...items]).map(i=>tile(i,"R")).join("")}</div></div></div>`;
  $("wBody").querySelectorAll(".tile").forEach(t=>t.onclick=()=>spick(t));
}
const WIT=id=>WITEMS[+id];
function spick(el){
  if(el.classList.contains("ok")) return;
  const s=el.dataset.side, sel=WR.sel;
  if(sel[s]===el){el.classList.remove("sel");sel[s]=null;return}
  if(sel[s]) sel[s].classList.remove("sel"); sel[s]=el; el.classList.add("sel");
  if(s==="L") say(el.textContent);
  if(sel.L&&sel.R){
    const a=sel.L,b=sel.R; WR.sel={L:null,R:null}; a.classList.remove("sel"); b.classList.remove("sel");
    const it=WIT(a.dataset.id);
    if(a.dataset.id===b.dataset.id){
      a.classList.add("ok"); b.classList.add("ok"); good(); score+=12;
      if(!WR.missed.has(it.id)) wrec(it,true);
      if(++WR.done===WR.items.length) wFinish();
    } else {
      WR.mistakes++; bad(); WR.missed.add(it.id); WR.wrong.push({it,pick:WIT(b.dataset.id).en});
      wrec(it,false,WIT(b.dataset.id).a); score=Math.max(0,score-3);
      a.classList.add("wrong"); b.classList.add("wrong");
      setTimeout(()=>{a.classList.remove("wrong");b.classList.remove("wrong")},420);
    }
/*@@H90@@*/
  }
}
function wFinish(){
  const total=WR.items.length, right=WR.type==="fill"?WR.right:total-WR.missed.size, acc=Math.round(right/total*100);
  ST.rounds.push({d:Date.now(),m:WR.type==="fill"?"wfill":"wmatch",n:total,x:WR.type==="fill"?total-right:WR.mistakes,s:0,a:acc});
/*@@H91@@*/
  if(acc===100){win();confetti();}
  const seen=new Set(), wrongs=WR.wrong.filter(w=>!seen.has(w.it.id)&&seen.add(w.it.id));
  $("wBody").innerHTML=`<div class="panel" style="text-align:center">
/*@@H92@@*/
    <div class="sum"><div><b>${right}/${total}</b><span>Correct</span></div><div><b>${acc}%</b><span>Accuracy</span></div><div><b>${score}</b><span>Score</span></div></div>
    ${wrongs.length?`<div class="review">${wrongs.map(w=>`<div><span>❌ ${fillS(w.it,`<b class="hl">${atStart(w.it)?cap(w.it.a):w.it.a}</b>`)}<br><span class="gn">${w.it.en}</span></span><span class="gn" style="text-align:right">${whyOf(w.it)}</span></div>`).join("")}</div>`:`<p class="gn">No mistakes this round!</p>`}
    <div style="margin-top:16px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
      ${wrongs.length?`<button class="btn alt" id="wRetry">Retry my misses</button>`:""}
      <button class="btn ghost" onclick="WSET.sub='guide';saveW();renderWords()">📖 Guide</button>
/*@@H93@@*/
  if($("wRetry")) $("wRetry").onclick=()=>{ const its=wrongs.map(w=>w.it);
    if(WR.type==="fill"){WR={type:"fill",items:shuffle(its),i:0,right:0,wrong:[],streak:0,answered:false};showQ();}
    else { const keep=WSET.len; WSET.len=Math.max(4,its.length); newSMatchFrom(its); WSET.len=keep; } };
}
function newSMatchFrom(its){ const orig=wpool; wpool=()=>{const rest=orig().filter(x=>!its.includes(x));return [...its,...rest]}; newSMatch(); wpool=orig; }
document.addEventListener("keydown",e=>{
  if(mode!=="words"||!WR||WR.type!=="fill"||/INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)&&document.activeElement.id!=="qNext") return;
  if(!WR.answered&&/^[1-4]$/.test(e.key)){ const b=$("wBody").querySelectorAll(".qo")[+e.key-1]; if(b) answer(b); }
  else if(WR.answered&&e.key==="Enter"){ e.preventDefault(); nextQ(); }
});
function wordsStatsHTML(){
  const rows=Object.entries(ST.words||{}).filter(([,s])=>s.w>0).map(([k,s])=>({k,...s,acc:Math.round(s.r/(s.r+s.w)*100)}))
    .sort((a,b)=>b.w/(b.r+b.w+1)-a.w/(a.r+a.w+1)||b.w-a.w).slice(0,12);
  const cats=Object.entries(WGROUPS).map(([k,g])=>{const s=(ST.wcats||{})[k]||{r:0,w:0},n=s.r+s.w,a=n?Math.round(s.r/n*100):0;
    return `<div class="tbar"><span>${g.label}</span><div class="tr"><i style="width:${a}%;background:${g.c}"></i></div><b style="width:60px;text-align:right">${n?a+"%":"—"}</b></div>`}).join("");
  const conf=s=>{const e=Object.entries(s.c||{}).sort((a,b)=>b[1]-a[1])[0];return e?`<b>${e[0]}</b>`:"—"};
  return `<div class="two"><div class="panel"><h3>🧩 Grammar words you miss most <span class="spacer"></span><button class="btn alt sm" id="wDrill" ${rows.length?"":"disabled"}>Practice these</button></h3>
    ${rows.length?`<table class="miss"><thead><tr><th>Word</th><th>What it is</th><th>Wrong</th><th>Right</th><th>Accuracy</th><th>You picked instead</th></tr></thead><tbody>${rows.map(r=>
/*@@H94@@*/
       <td><div style="display:flex;align-items:center;gap:6px"><div class="mbar"><i style="width:${100-r.acc}%"></i></div>${r.acc}%</div></td><td>${conf(r)}</td></tr>`).join("")}</tbody></table>`
     :`<div class="empty">No misses yet. Try the Grammar tab.</div>`}</div>
    <div class="panel"><h3>📊 Accuracy by word type</h3>${cats}</div></div>`;
}
const _renderStats=renderStats;
renderStats=function(){
  _renderStats();
  const box=document.createElement("div"); box.innerHTML=wordsStatsHTML();
  const panels=$("statsView").querySelectorAll(".panel"); panels[0].after(box);
  if($("wDrill")) $("wDrill").onclick=()=>{
    const weak=Object.entries(ST.words).filter(([,s])=>s.w>0).sort((a,b)=>b[1].w-a[1].w).map(([k])=>k);
    const its=shuffle(WITEMS.filter(i=>weak.includes(i.a))).slice(0,WSET.len);
    WSET.sub="fill"; saveW(); setMode("words");
    WR={type:"fill",items:its,i:0,right:0,wrong:[],streak:0,answered:false}; showQ(); };
  const MLBL={wfill:"✏️ Fill the Blank",wmatch:"🔗 Sentence Match"};
  $("statsView").querySelectorAll("td").forEach(td=>{ if(MLBL[td.textContent]) td.textContent=MLBL[td.textContent]; });
};

/* =====================================================================
   BRAZILIAN SLANG (gírias) · São Paulo first
   ===================================================================== */
const SRAW=[
/*@@H95@@*/
];
/*@@H96@@*/
const SLANG=SRAW.map(([t,m,ex,en,r,c,n],i)=>({i,t,m,ex,en,r,c,n}))
  .sort((a,b)=>REG_ORDER.indexOf(a.r)-REG_ORDER.indexOf(b.r)||a.i-b.i).map((s,k)=>Object.assign(s,{rank:k+1}));
const SCATS=[...new Set(SLANG.map(s=>s.c))];
/*@@H97@@*/
function renderSlang(){
  const v=$("slangView");
  const regCount=r=>SLANG.filter(s=>r==="all"||s.r===r).length;
  v.innerHTML=`
/*@@H98@@*/
   <div class="controls searchbar">
     <input type="search" id="sQ" placeholder="🔍 Search slang or meaning…" value="${SSET.q.replace(/"/g,"&quot;")}" style="flex:1;min-width:160px">
     <button class="fbtn ${SSET.fopen?"on":""}" id="sFiltBtn">Filters${(SSET.reg!=="all")+(SSET.cat!=="all")+(SSET.learned?1:0)?` <b>${(SSET.reg!=="all")+(SSET.cat!=="all")+(SSET.learned?1:0)}</b>`:""} ▾</button>
     <div class="fpanel ${SSET.fopen?"":"hidden"}" id="sFilt">
     <label><input type="checkbox" id="sLearned" ${SSET.learned?"checked":""}> Hide learned</label>
     <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center"><span class="ctl-lbl">Region</span>
      <span class="chip ${SSET.reg==="all"?"on":""}" data-r="all" style="--c:var(--ink)">All (${regCount("all")})</span>
/*@@H99@@*/
     <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center"><span class="ctl-lbl">Type</span>
      <span class="chip ${SSET.cat==="all"?"on":""}" data-c="all" style="--c:var(--blue)">All</span>
      ${SCATS.map(c=>`<span class="chip ${SSET.cat===c?"on":""}" data-c="${c}" style="--c:var(--blue)">${c}</span>`).join("")}</div>
     </div>
   </div>
/*@@H100@@*/
   <p class="foot">Tap a term for examples and notes · 🔊 to hear it · ✓ marks it learned. Slang is casual: great with friends, skip it in work emails.</p>`;
  $("sFiltBtn").onclick=()=>{SSET.fopen=!SSET.fopen;saveS();renderSlang()};
  $("sQ").oninput=()=>{SSET.q=$("sQ").value;saveS();slangRows()};
  $("sLearned").onchange=()=>{SSET.learned=$("sLearned").checked;saveS();renderSlang()};
  v.querySelectorAll("[data-r]").forEach(c=>c.onclick=()=>{SSET.reg=c.dataset.r;saveS();renderSlang()});
  v.querySelectorAll("[data-c]").forEach(c=>c.onclick=()=>{SSET.cat=c.dataset.c;saveS();renderSlang()});
  $("sRand").onclick=()=>{const l=slangList();openSlang(rnd(l.length?l:SLANG).rank)};
  slangRows();
}
function slangList(){
  const q=SSET.q.trim().toLowerCase();
  return SLANG.filter(s=>(SSET.reg==="all"||s.r===SSET.reg)&&(SSET.cat==="all"||s.c===SSET.cat)&&(!SSET.learned||!SLEARN.has(s.t))&&
    (!q||(s.t+" "+s.m+" "+s.ex+" "+s.en).toLowerCase().includes(q)));
}
function slangRows(){
  const L=slangList();
  $("sBody").innerHTML=L.length?L.map(s=>`<tr class="${SLEARN.has(s.t)?"learned":""}"><td>${s.rank}</td>
    <td class="v" data-s="${s.rank}">${s.t}</td><td>${s.m}</td>
/*@@H101@@*/
    <td><input type="checkbox" data-l="${s.t.replace(/"/g,"&quot;")}" ${SLEARN.has(s.t)?"checked":""}></td></tr>`).join("")
   :`<tr><td colspan="7" class="empty" style="text-align:center">No slang matches. Try clearing a filter.</td></tr>`;
  $("sBody").querySelectorAll("td.v").forEach(td=>td.onclick=()=>openSlang(+td.dataset.s));
/*@@H102@@*/
  $("sBody").querySelectorAll("[data-l]").forEach(c=>c.onchange=()=>{c.checked?SLEARN.add(c.dataset.l):SLEARN.delete(c.dataset.l);saveS();renderSlang();});
}
function sayAlways(t,opts){const v=$("voice"),was=v.checked;v.checked=true;say(t,opts);v.checked=was;}
function openSlang(rank){
  const s=SLANG.find(x=>x.rank===rank), list=slangList(), idx=list.findIndex(x=>x.rank===rank);
/*@@H103@@*/
  $("vTitle").textContent=s.t; $("vMean").textContent=s.m;
/*@@H104@@*/
  $("vTabs").innerHTML="";
  $("vBody").innerHTML=`
    <div class="sl-ex"><button class="spk" id="slSay">🔊</button><div><div class="sl-pt">${s.ex}</div><div class="sl-en">${s.en}</div></div></div>
    ${s.n?`<div class="vstat">💡 ${s.n}</div>`:""}
    ${rel.length?`<h4 style="margin:14px 0 8px;color:var(--blue)">Similar vibe</h4><div class="sl-rel">${rel.map(r=>`<button data-s="${r.rank}"><b>${r.t}</b><span>${r.m}</span></button>`).join("")}</div>`:""}
    <div style="display:flex;gap:10px;justify-content:space-between;margin-top:18px;flex-wrap:wrap">
      <button class="btn ghost" id="slPrev" ${idx<=0?"disabled":""}>◀ Previous</button>
      <button class="btn ${SLEARN.has(s.t)?"ghost":"go"}" id="slLearn">${SLEARN.has(s.t)?"↺ Mark not learned":"✓ Mark learned"}</button>
      <button class="btn ghost" id="slNext" ${idx<0||idx>=list.length-1?"disabled":""}>Next ▶</button></div>`;
  $("vBody").scrollTop=0;
/*@@H105@@*/
  $("vBody").querySelectorAll(".sl-rel button").forEach(b=>b.onclick=()=>openSlang(+b.dataset.s));
  $("slPrev").onclick=()=>openSlang(list[idx-1].rank);
  $("slNext").onclick=()=>openSlang(list[idx+1].rank);
  $("slLearn").onclick=()=>{SLEARN.has(s.t)?SLEARN.delete(s.t):SLEARN.add(s.t);saveS();openSlang(rank);if(mode==="slang")renderSlang();};
  $("vmodal").classList.add("show");
}
/* ===== PWA: icons in tabs, bank labels, backup, install tip, service worker ===== */
const NAV_IC={play:"🎯",bank:"📚",words:"🧩",vocab:"🔢",slang:"😎",stats:"📊"};
/*@@H106@@*/
document.querySelectorAll("nav button").forEach(b=>{const m=b.dataset.m;b.dataset.full=b.textContent.trim();
  b.innerHTML=`<span class="ic">${NAV_IC[m]}</span><span class="lb">${b.dataset.full.replace(/^\S+\s/,"")}</span>`;});
function fitNav(){const small=innerWidth<=700;document.querySelectorAll("nav button").forEach(b=>{
  b.querySelector(".lb").textContent=small?NAV_SHORT[b.dataset.m]:b.dataset.full.replace(/^\S+\s/,"");});}
addEventListener("resize",fitNav); fitNav();
const _rb=renderBank; renderBank=function(){_rb();const L=["","","",...BANK_T.map(k=>TENSES[k].label)];
  $("bankBody").querySelectorAll("tr").forEach(tr=>tr.querySelectorAll("td").forEach((td,i)=>{if(L[i])td.dataset.l=L[i];}));};
/*@@H107@@*/
function exportBackup(){
/*@@H108@@*/
  BK_KEYS.forEach(k=>{const v=localStorage.getItem(k);if(v!=null)data.data[k]=v;});
/*@@H109@@*/
  const file=new File([blob],name,{type:"application/json"});
  if(navigator.canShare&&navigator.canShare({files:[file]})) navigator.share({files:[file],title:"Verbo Match backup"}).catch(()=>{});
  else{const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),2000);}
  toast("⬇️ Backup created");
}
function importBackup(){
  const inp=document.createElement("input");inp.type="file";inp.accept=".json,application/json";
  inp.onchange=()=>{const f=inp.files[0];if(!f)return;f.text().then(t=>{
/*@@H110@@*/
      if(!confirm("Replace your current progress with this backup?"))return;
      BK_KEYS.forEach(k=>localStorage.removeItem(k));Object.entries(j.data).forEach(([k,v])=>localStorage.setItem(k,v));
      toast("✅ Backup restored");setTimeout(()=>location.reload(),700);
/*@@H111@@*/
  inp.click();
}
(function(){
  const ios=/iphone|ipad|ipod/i.test(navigator.userAgent), standalone=navigator.standalone||matchMedia("(display-mode: standalone)").matches;
/*@@H112@@*/
  const d=document.createElement("div");d.className="install-tip";
  d.innerHTML=`📲 Install this app: tap <b>Share</b> <span style="font-size:15px">⬆️</span> then <b>Add to Home Screen</b>.<button aria-label="Close">✕</button>`;
/*@@H113@@*/
})();
if(navigator.storage&&navigator.storage.persist) navigator.storage.persist().catch(()=>{});
if("serviceWorker" in navigator&&location.protocol.startsWith("http")){ const _reg=()=>navigator.serviceWorker.register("sw.js").catch(()=>{}); document.readyState==="complete"?_reg():addEventListener("load",_reg); }
/* ===== v8: collapsible settings + pop-up scroll lock ===== */
/*@@H114@@*/
$("setToggle").onclick=()=>setPanel(!UI.setOpen);
function updSummary(){
  if(!$("setSummary")) return;
/*@@H115@@*/
  const bits=[`<span class="lvdot" style="background:${l.c}"></span><b>${l.n}${SET.auto?" ⚡":""}</b>`];
  if(mode!=="memory") bits.push(dir);
  bits.push(SET.pairs+" pairs");
  if(mode==="conj") bits.push(SET.tenses.length+" tense"+(SET.tenses.length>1?"s":""));
  if(SET.traps) bits.push("🪤");
  $("setSummary").innerHTML=bits.join(" · ");
}
const _start=start; start=function(){_start();updSummary();};
let lockY=0;
function syncLock(){
  const open=!!document.querySelector(".modal.show"), b=document.body;
  if(open&&!b.classList.contains("locked")){lockY=scrollY;b.style.top=`-${lockY}px`;b.classList.add("locked");}
  else if(!open&&b.classList.contains("locked")){b.classList.remove("locked");b.style.top="";scrollTo(0,lockY);}
}
function watchModal(m){
  new MutationObserver(syncLock).observe(m,{attributes:true,attributeFilter:["class"]});
  m.addEventListener("touchmove",e=>{if(e.target===m)e.preventDefault();},{passive:false});
}
document.querySelectorAll(".modal").forEach(watchModal);
setPanel(UI.setOpen); updSummary();
/* ===================================================================
   v9 · combined Verb Match (format + style live in Settings)
   =================================================================== */
const GAME_MODES=["meaning","conj","memory"];
if(!SET.fmt) SET.fmt="inf"; if(!SET.style) SET.style="tiles";
function gameMode(){return SET.style==="memory"?"memory":(SET.fmt==="conj"?"conj":"meaning")}
setMode=function(m,keepFocus){
  if(!keepFocus) focusQ=[];
  if(m==="meaning"){SET.fmt="inf";SET.style="tiles";saveSet();}
  else if(m==="conj"){SET.fmt="conj";SET.style="tiles";saveSet();}
  else if(m==="memory"){SET.style="memory";saveSet();}
  mode=(m==="play"||GAME_MODES.includes(m))?gameMode():m;
  const navKey=GAME_MODES.includes(mode)?"play":mode;
  $("nav").querySelectorAll("button").forEach(x=>x.classList.toggle("on",x.dataset.m===navKey));
  renderCtrls(); start();
};
const _rcV9=renderCtrls;
renderCtrls=function(){
  _rcV9();
  $("styleSeg").querySelectorAll("button").forEach(b=>b.classList.toggle("on",b.dataset.v===SET.style));
  $("fmtSeg").querySelectorAll("button").forEach(b=>b.classList.toggle("on",b.dataset.v===SET.fmt));
};
$("styleSeg").querySelectorAll("button").forEach(b=>b.onclick=()=>{SET.style=b.dataset.v;saveSet();setMode("play")});
$("fmtSeg").querySelectorAll("button").forEach(b=>b.onclick=()=>{SET.fmt=b.dataset.v;saveSet();setMode("play")});

/* ===================================================================
   VOCAB data
   =================================================================== */
/*@@H116@@*/
const VX_TOPICS={
  num:{label:"Numbers",ic:"🔢"}, abc:{label:"Alphabet",ic:"🔤"}, time:{label:"Time",ic:"🕒"},
  days:{label:"Days",ic:"📅"}, weeks:{label:"Weeks",ic:"🗓️"}, months:{label:"Months",ic:"🌙"}, years:{label:"Years",ic:"🎆"},
  house:{label:"Kitchen & house",ic:"🏠"}, city:{label:"Neighborhood & city",ic:"🏙️"}
};
const VX_KEYS=Object.keys(VX_TOPICS);
/*@@H117@@*/
function timeToPt(h,m){
/*@@H118@@*/
}
/*@@H119@@*/
function time24Pt(h,m){
/*@@H120@@*/
  const h12=h%12||12;
/*@@H121@@*/
}
const time24En=(h,m)=>h===0&&m===0?"midnight":h===12&&m===0?"noon":`${h%12||12}:${String(m).padStart(2,"0")} ${h<12?"AM":"PM"}`;
const pad2=n=>String(n).padStart(2,"0");
const rint=n=>Math.random()*n|0;
const VX_RAW={
/*@@H122@@*/
};
const VX={};
VX_KEYS.forEach(t=>VX[t]=VX_RAW[t].map(([pt,en,note,sy])=>({t,pt,en,note:note||"",say:sy||pt})));
const VX_GEN={
  num:()=>{const n=rnd([()=>21+rint(79),()=>101+rint(899),()=>1000+rint(9000)])();return mkNum(n)},
  time:()=>mkTime(1+rint(12),rnd([0,5,10,15,20,30,45])),
  years:()=>mkYear(1950+rint(86))
};
function mkNum(n){const w=numToPt(n);return {t:"num",pt:w,en:n.toLocaleString("en-US"),say:w,gen:"num",val:n,note:""}}
/*@@H123@@*/
function mkYear(y){const w=numToPt(y);return {t:"years",pt:w,en:String(y),say:w,gen:"years",val:y,note:""}}
/* ---------- body parts ---------- */
const BP=[
/*@@H124@@*/
].map(([k,pt,en,view,x,y,note,keys])=>({k,pt,en,view,x,y,note:note||"",keys:keys||[k]}));
const BPK=Object.fromEntries(BP.map(p=>[p.k,p]));
/*@@H125@@*/
function bodySVG(){
  const leg=`<path class="bp" data-k="coxa" d="M112,330 L158,330 L151,428 L118,428 Z"/>
   <path class="bp" data-k="canela" d="M121,452 L149,452 L144,546 L126,546 Z"/>
   <circle class="bp joint" data-k="joelho" cx="135" cy="440" r="15"/>
   <ellipse class="bp" data-k="pe" cx="141" cy="572" rx="21" ry="11"/>
   <ellipse class="bp joint" data-k="dedope" cx="117" cy="575" rx="9" ry="7"/>
   <circle class="bp joint" data-k="tornozelo" cx="135" cy="553" r="9"/>`;
  const arm=`<path class="bp" data-k="braco" d="M92,142 L116,160 L95,256 L68,250 Z"/>
   <path class="bp" data-k="antebraco" d="M69,262 L94,262 L84,342 L60,340 Z"/>
   <ellipse class="bp joint" data-k="dedo" cx="69" cy="403" rx="12" ry="12"/>
   <ellipse class="bp" data-k="mao" cx="70" cy="372" rx="16" ry="21"/>
   <ellipse class="bp joint" data-k="polegar" cx="88" cy="362" rx="5.5" ry="12" transform="rotate(-18 88 362)"/>
   <circle class="bp joint" data-k="cotovelo" cx="81" cy="256" r="11"/>
   <circle class="bp joint" data-k="pulso" cx="72" cy="348" r="9"/>
   <circle class="bp joint" data-k="ombro" cx="101" cy="153" r="15"/>`;
  const M=s=>`${s}<g transform="matrix(-1 0 0 1 320 0)">${s}</g>`;
  return `${M(leg)}
   <rect class="bp" data-k="pescoco" x="145" y="108" width="30" height="40" rx="6"/>
   <path class="bp" data-k="peito" d="M101,146 Q160,130 219,146 L215,214 L105,214 Z"/>
   <path class="bp" data-k="barriga" d="M105,214 L215,214 L212,264 L108,264 Z"/>
   <path class="bp band" data-k="cintura" d="M108,264 L212,264 L211,283 L109,283 Z"/>
   <path class="bp shorts" data-k="quadril" d="M109,283 L211,283 Q219,312 212,334 L108,334 Q101,312 109,283 Z"/>
   <circle class="bp joint" data-k="umbigo" cx="160" cy="246" r="6"/>
   ${M(arm)}
   <ellipse class="bp" data-k="cabeca" cx="160" cy="72" rx="40" ry="47"/>
   <path class="bp hair" data-k="cabelo" d="M119,74 C112,20 208,20 201,74 C194,44 126,44 119,74 Z"/>
   <g class="deco"><circle cx="146" cy="76" r="3.5" fill="#2b2b2b"/><circle cx="174" cy="76" r="3.5" fill="#2b2b2b"/>
   <path d="M147,96 Q160,105 173,96" stroke="#8a4b3c" stroke-width="2.5" fill="none" stroke-linecap="round"/></g>`;
}
function faceSVG(){
  const half=`<ellipse class="bp" data-k="orelha" cx="54" cy="212" rx="19" ry="34"/>`;
  const feat=`<rect class="bp brow" data-k="sobrancelha" x="88" y="146" width="58" height="10" rx="5" transform="rotate(-6 117 151)"/>
   <ellipse class="bp white" data-k="olho" cx="117" cy="182" rx="25" ry="14"/>
   <circle class="bp iris" data-k="olho" cx="119" cy="182" r="9"/><circle class="bp pupil" data-k="olho" cx="119" cy="182" r="4"/>
   <circle class="bp cheek" data-k="bochecha" cx="98" cy="254" r="23"/>`;
  const M=s=>`${s}<g transform="matrix(-1 0 0 1 320 0)">${s}</g>`;
  return `<rect class="bp" data-k="fpescoco" x="118" y="330" width="84" height="90" rx="10"/>
   ${M(half)}
   <ellipse class="bp" data-k="rosto" cx="160" cy="215" rx="108" ry="146"/>
   <ellipse class="bp zone" data-k="testa" cx="160" cy="128" rx="74" ry="23"/>
   <path class="bp hair" data-k="fcabelo" d="M52,205 C38,60 110,28 160,28 C210,28 282,60 268,205 C258,128 228,100 160,98 C92,100 62,128 52,205 Z"/>
   ${M(feat)}
   <path class="bp nose" data-k="nariz" d="M160,186 C152,212 140,236 143,247 Q160,262 177,247 C180,236 168,212 160,186 Z"/>
   <ellipse class="bp lip" data-k="labios" cx="160" cy="302" rx="50" ry="21"/>
   <ellipse class="bp mouth" data-k="boca" cx="160" cy="305" rx="36" ry="11"/>
   <rect class="bp teeth" data-k="dentes" x="135" y="294" width="50" height="9" rx="3"/>
   <ellipse class="bp zone" data-k="queixo" cx="160" cy="345" rx="44" ry="14"/>`;
}
/* ---------- vocab tab state ---------- */
/*@@H126@@*/
VXS.topics=VXS.topics.filter(t=>vxKnown(t)); if(!VXS.topics.length) VXS.topics=[...VX_KEYS];
if(!["learn","body","stories"].includes(VXS.sub)) VXS.sub="learn";
/*@@H127@@*/
let BQ=null, bSel=null;
function vxrec(t,pt,en,ok){
/*@@H128@@*/
}
function vxWeak(it){const s=ST.vx&&ST.vx[it.pt];return s&&s.w>s.r/2?1:0}
/*@@H129@@*/
function vxSummary(){
  const all=VXS.topics.length===VX_KEYS.length;
  const tp=all?"All topics":VXS.topics.map(t=>VX_TOPICS[t].label).join(", ");
  if(VXS.sub==="learn") return `<b>📖 Learn</b> · ${tp}`;
  if(VXS.sub==="stories") return storySummary();
  return `<b>🧍 Body</b> · ${VXS.bmode==="quiz"?"Quiz":"Explore"} · ${VX_DIRL[VXS.dir]} · ${VXS.len} Qs`;
}
function renderVocab(){
  const v=$("vocabView"), sub=VXS.sub, all=VXS.topics.length===VX_KEYS.length;
  if(sub!=="stories"&&window.__storyReady) stopStory();
  v.innerHTML=`
   <div class="controls"><div class="seg full" id="vxSub">
     <button data-s="learn" class="${sub==="learn"?"on":""}">📖 Learn</button>
     <button data-s="body" class="${sub==="body"?"on":""}">🧍 Body</button>
     <button data-s="stories" class="${sub==="stories"?"on":""}">📚 Stories</button></div></div>
   <div class="actionbar">
     <button class="sumbtn" id="vxSetToggle" aria-expanded="${VXS.open}"><span class="sum-ic">⚙️</span><span id="vxSum" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">${vxSummary()}</span><span class="chev">▾</span></button>
     ${sub==="learn"?`<button class="btn alt ab" id="vxToMatch" title="Practice these words in the Match tab">🎯 Match these</button>`
       :sub==="body"?`<button class="btn go ab ${VXS.bmode!=="quiz"?"hidden":""}" id="vxNew">↻ New</button>`
       :`<button class="btn alt ab" id="stRand" title="Open a random story at your level">🎲 Random</button>`}
   </div>
   <div class="setpanel ${VXS.open?"open":""}" id="vxSetPanel">
     ${sub==="learn"?`<div class="sp-row"><span class="ctl-lbl">Topics</span><div class="chips">
       <span class="chip ${all?"on":""}" id="vxAll" style="--c:var(--blue)">All</span>
       ${VX_KEYS.map(k=>`<span class="chip ${!all&&VXS.topics.includes(k)?"on":""}" data-t="${k}" style="--c:var(--green)">${VX_TOPICS[k].ic} ${VX_TOPICS[k].label}</span>`).join("")}</div></div>
       <div class="lvdesc">Tap a topic to study just that one. Tap All to bring every topic back. To test yourself, use 🎯 Match these.</div>`
     :sub==="body"?`<div class="sp-row"><span class="ctl-lbl">Body quiz</span>
       <div class="seg" id="vxDir">${Object.entries(VX_DIRL).map(([k,l])=>`<button data-v="${k}" class="${VXS.dir===k?"on":""}">${l}</button>`).join("")}</div>
       <label>Questions <select id="vxLen">${[6,8,10,15,20].map(n=>`<option ${n===VXS.len?"selected":""}>${n}</option>`).join("")}</select></label></div>
/*@@H130@@*/
     :storySettingsHTML()}
   </div>
   <div id="vxArea"></div>`;
  v.querySelectorAll("#vxSub button").forEach(b=>b.onclick=()=>{VXS.sub=b.dataset.s;saveVX();if(b.dataset.s==="stories")STV.open=null;renderVocab()});
  $("vxSetToggle").onclick=()=>{VXS.open=!VXS.open;saveVX();$("vxSetPanel").classList.toggle("open",VXS.open);$("vxSetToggle").setAttribute("aria-expanded",VXS.open)};
  if($("vxNew")) $("vxNew").onclick=()=>{BQ=null;renderBody()};
  if($("vxToMatch")) $("vxToMatch").onclick=vxGoMatch;
  if($("vxAll")) $("vxAll").onclick=()=>{VXS.topics=[...VX_KEYS];saveVX();renderVocab()};
  v.querySelectorAll(".chip[data-t]").forEach(c=>c.onclick=()=>{const k=c.dataset.t;
    if(VXS.topics.length===VX_KEYS.length) VXS.topics=[k];
    else if(VXS.topics.includes(k)){ if(VXS.topics.length===1) return toast("Keep at least one topic on"); VXS.topics=VXS.topics.filter(x=>x!==k); }
    else VXS.topics=VX_KEYS.filter(x=>VXS.topics.includes(x)||x===k);
    saveVX(); renderVocab();});
  v.querySelectorAll("#vxDir button").forEach(b=>b.onclick=()=>{VXS.dir=b.dataset.v;saveVX();renderVocab()});
  if($("vxLen")) $("vxLen").onchange=()=>{VXS.len=+$("vxLen").value;saveVX();renderVocab()};
  if(sub==="learn") vxLearn($("vxArea"));
  else if(sub==="body"){ if(VXS.bmode==="quiz") BQ=null; renderBody(); }
  else { bindStorySettings(); renderStories(); }
}
function vxGoMatch(){SET.fmt="vocab";SET.vcats=[...VXS.topics];saveSet();setMode("play");toast("🎯 Vocab match: "+(SET.vcats.length===VX_KEYS.length?"all topics":SET.vcats.map(k=>VM_LBL(k).label).join(", ")))}
function vxLearn(a){
  a.innerHTML=VXS.topics.filter(t=>VX_TOPICS[t]&&VX[t]).map(t=>{
    const T=VX_TOPICS[t], items=VX[t];
    let tool="";
    if(t==="num") tool=`<div class="vx-tool"><input type="number" inputmode="numeric" min="0" max="999999" placeholder="Type any number…" data-conv="num" value="347"><div class="vx-out" id="conv-num">${numToPt(347)}</div><button class="spk2" data-convsay="num" title="Hear it">🔊</button></div>`;
    if(t==="years") tool=`<div class="vx-tool"><input type="number" inputmode="numeric" min="1" max="2999" placeholder="Type a year…" data-conv="years" value="2026"><div class="vx-out" id="conv-years">${numToPt(2026)}</div><button class="spk2" data-convsay="years" title="Hear it">🔊</button></div>`;
    if(t==="time") tool=`<div class="vx-tool"><input type="time" class="clkin" id="clkIn" value="14:45" step="60" aria-label="Pick any time">
       <div class="vx-out"><span id="clkP">${time24Pt(14,45)}.</span><div class="clk-en" id="clkE">${time24En(14,45)}</div></div>
       <button class="btn ghost sm" id="clkNew">🎲 New time</button><button class="spk2" id="clkSay" title="Hear it">🔊</button></div>
       <p class="vx-tip">Tap the clock to set any hour and minute, or tap 🎲 for a random one.</p>`;
/*@@H131@@*/
    const grid=t==="abc"
      ? `<div class="vx-grid abc">${items.map(x=>`<button class="vx-it abc" data-say="${x.say}" title="${x.note}"><b>${x.en}</b><span>${x.pt}</span></button>`).join("")}</div>
         <div class="vx-grid" style="margin-top:8px">${items.filter(x=>x.note).map(x=>`<div class="vx-it" style="cursor:default"><b>${x.en} · ${x.pt}</b><i>${x.note}</i></div>`).join("")}</div>`
      : `<div class="vx-grid">${items.map(x=>`<button class="vx-it" data-say="${x.say.replace(/"/g,"&quot;")}"><b>${x.pt}</b><span>${x.en}</span>${x.note?`<i>💡 ${x.note}</i>`:""}</button>`).join("")}</div>`;
    return `<details class="fold vx-sec" open><summary>${T.ic} ${T.label}<span class="gn">${items.length} words · tap to hear</span></summary><div class="vx-in">${tool}${tip}${grid}</div></details>`;
  }).join("")+`<div style="text-align:center;margin:6px 0 18px"><button class="btn go" id="vxGoMatch2">🎯 Match these words</button></div>`;
  a.querySelectorAll(".vx-it[data-say]").forEach(b=>b.onclick=()=>{sayAlways(b.dataset.say);b.classList.add("playing");setTimeout(()=>b.classList.remove("playing"),700)});
  a.querySelectorAll("[data-conv]").forEach(inp=>inp.oninput=()=>{const n=parseInt(inp.value,10),o=$("conv-"+inp.dataset.conv);
    o.textContent=isNaN(n)||n<0||n>999999?"Enter 0 – 999,999":numToPt(n);});
  a.querySelectorAll("[data-convsay]").forEach(b=>b.onclick=()=>sayAlways($("conv-"+b.dataset.convsay).textContent));
  if($("clkIn")){
    const show=(speak)=>{const [h,m]=($("clkIn").value||"00:00").split(":").map(Number); if(isNaN(h)||isNaN(m)) return;
      const w=time24Pt(h,m); $("clkP").textContent=w+"."; $("clkE").textContent=time24En(h,m); if(speak) sayAlways(w);};
    $("clkIn").oninput=()=>show(false); $("clkIn").onchange=()=>show(true);
    $("clkNew").onclick=()=>{$("clkIn").value=pad2(rint(24))+":"+pad2(rnd([0,5,10,15,20,25,30,40,45,50]));show(true)};
    $("clkSay").onclick=()=>sayAlways($("clkP").textContent);
  }
  $("vxGoMatch2").onclick=vxGoMatch;
}
function vxFinish(Q,kind){
  const total=Q.items.length, right=Q.right, acc=Math.round(right/Math.max(1,total)*100);
/*@@H132@@*/
  if(acc===100){win();confetti();}
  const seen=new Set(), wr=Q.wrong.filter(w=>!seen.has(w.pt)&&seen.add(w.pt));
  $("bStage").innerHTML=`<div class="panel" style="text-align:center;box-shadow:none">
/*@@H133@@*/
    <div class="sum"><div><b>${right}/${total}</b><span>Correct</span></div><div><b>${acc}%</b><span>Accuracy</span></div><div><b>${score}</b><span>Score</span></div></div>
    ${wr.length?`<div class="review">${wr.map(w=>`<div><span>❌ <b class="hl">${w.pt}</b></span><span class="gn">${w.en}</span></div>`).join("")}</div>`:`<p class="gn">No mistakes this round!</p>`}
    <div style="margin-top:16px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
      ${wr.length?`<button class="btn alt" id="vxRetry">Retry my misses</button>`:""}
/*@@H134@@*/
  $("vxAgain").onclick=()=>{BQ=null;renderBody();};
  if($("vxRetry")) $("vxRetry").onclick=()=>{BQ=bqState(shuffle(wr));renderBody();};
}
function bqState(items){return {items,i:0,right:0,wrong:[],streak:0,answered:false}}
function renderBody(){
  const a=$("vxArea"); const quiz=VXS.bmode==="quiz";
  if(quiz&&!BQ) BQ=bqState(shuffle([...BP]).slice(0,VXS.len));
  if(quiz&&BQ.i<BQ.items.length) VXS.bview=BQ.items[BQ.i].view;
  const view=VXS.bview, parts=BP.filter(p=>p.view===view);
  let n=0; const num={}; parts.forEach(p=>{if(p.x!=null) num[p.k]=++n});
  a.innerHTML=`<div class="body-wrap">
    <div class="body-stage" id="bStage">
      <div class="body-top">
        <div class="seg" id="bMode"><button data-v="explore" class="${!quiz?"on":""}">👆 Explore</button><button data-v="quiz" class="${quiz?"on":""}">🎯 Quiz</button></div>
        <div class="seg" id="bView"><button data-v="body" class="${view==="body"?"on":""}">🧍 Body</button><button data-v="face" class="${view==="face"?"on":""}">🙂 Face</button></div>
        <button class="toggle ${VXS.labels?"on":""}" id="bLabels" style="${quiz?"display:none":""}">🔢 Labels</button>
      </div>
      <div id="bPrompt"></div>
      <svg id="bodySvg" class="body-svg" viewBox="${view==="body"?"0 0 320 595":"0 0 320 420"}" role="img" aria-label="Body diagram">
        ${view==="body"?bodySVG():faceSVG()}
        ${VXS.labels&&!quiz?parts.filter(p=>p.x!=null).map(p=>`<g class="badge"><circle cx="${p.x}" cy="${p.y}" r="9"/><text x="${p.x}" y="${p.y+.5}">${num[p.k]}</text></g>`).join(""):""}
      </svg>
      <div id="bInfo" class="pinfo ${quiz?"hidden":""}"><span class="sm">👆 Tap any part of the ${view==="body"?"body":"face"} to see and hear its name.</span></div>
    </div>
    <div class="plist ${quiz?"hidden":""}" id="bList"><h4>${view==="body"?"🧍 Body":"🙂 Face"} · ${parts.length} words</h4>
      ${parts.map(p=>`<button class="pi" data-k="${p.k}"><span class="num ${num[p.k]?"":"nb"}">${num[p.k]||"·"}</span><b>${p.pt}</b><span class="en">${p.en}</span></button>`).join("")}</div>
  </div>`;
  if(quiz) a.querySelector(".body-wrap").style.gridTemplateColumns="1fr";
  a.querySelectorAll("#bMode button").forEach(b=>b.onclick=()=>{VXS.bmode=b.dataset.v;BQ=null;bSel=null;saveVX();renderVocab()});
  a.querySelectorAll("#bView button").forEach(b=>b.onclick=()=>{ if(quiz) return toast("The quiz switches views for you"); VXS.bview=b.dataset.v;bSel=null;saveVX();renderBody()});
  $("bLabels").onclick=()=>{VXS.labels=!VXS.labels;saveVX();renderBody()};
  $("bodySvg").addEventListener("click",e=>{const el=e.target.closest("[data-k]"); if(!el) return; quiz?bAnswer(el.dataset.k):bSelect(el.dataset.k)});
  a.querySelectorAll(".pi").forEach(b=>b.onclick=()=>bSelect(b.dataset.k));
  if(quiz){ if(BQ.i>=BQ.items.length) vxFinish(BQ,"vbody"); else bShowQ(); }
  else if(bSel&&BPK[bSel]&&BPK[bSel].view===view) bSelect(bSel,true);
}
function bMark(keys,cls){keys.forEach(k=>$("bodySvg").querySelectorAll(`.bp[data-k="${k}"]`).forEach(e=>e.classList.add(cls)))}
function bClear(){$("bodySvg").querySelectorAll(".bp").forEach(e=>e.classList.remove("hi","ok","bad"))}
function bSelect(k,silent){
  const p=BPK[k]; if(!p) return; bSel=k; bClear(); bMark(p.keys,"hi");
  document.querySelectorAll(".pi").forEach(b=>b.classList.toggle("on",b.dataset.k===k));
  $("bInfo").innerHTML=`<button class="spk" id="bSay" title="Hear it">🔊</button><div><div class="big">${p.pt}</div><div class="sm">${p.en} · ${genderOf(p.pt)}${p.note?` · 💡 ${p.note}`:""}</div></div>`;
  $("bSay").onclick=()=>sayAlways(p.pt);
  if(!silent) sayAlways(p.pt);
}
function bShowQ(){
  const t=BQ.items[BQ.i];
  const label=VXS.dir==="en"?t.en:VXS.dir==="listen"?"":t.pt;
/*@@H135@@*/
    <span class="gn">${BQ.i+1} / ${BQ.items.length} · ✅ ${BQ.right} · 🔥 ${BQ.streak}</span>
    <button class="spk" id="bqSay" title="Hear it">🔊</button></div>`;
  $("bqSay").onclick=()=>sayAlways(t.pt);
  if(VXS.dir==="listen") setTimeout(()=>sayAlways(t.pt),250);
  BQ.answered=false;
}
function bAnswer(k){
  if(!BQ||BQ.answered) return;
  const t=BQ.items[BQ.i], ok=t.keys.includes(k), tapped=BP.find(p=>p.k===k&&p.view===t.view)||BPK[k];
  BQ.answered=true; bClear();
  if(ok){ BQ.right++; BQ.streak++; good(); score+=12; bMark(t.keys,"ok"); sayAlways(t.pt);
/*@@H136@@*/
    vxrec("body",t.pt,t.en,true);
    setTimeout(bNext,1000);
  } else { BQ.streak=0; bad(); BQ.wrong.push(t); bMark([k],"bad"); bMark(t.keys,"hi"); sayAlways(t.pt);
    vxrec("body",t.pt,t.en,false);
    $("bPrompt").innerHTML=`<div class="bprompt bad"><span>❌ That's <b style="font-size:16px">${tapped?tapped.pt:"?"}</b>${tapped?` (${tapped.en})`:""}. <b>${t.pt}</b> (${t.en}) is in yellow.</span>
      <button class="btn go sm" id="bqNext">Next ➜</button></div>`;
    $("bqNext").onclick=bNext;
  }
/*@@H137@@*/
}
function bNext(){ if(!BQ) return; BQ.i++; renderBody(); }
/* ===================================================================
   v10 · VOCAB MATCH inside the Match tab
   =================================================================== */
const VM_CATS=[...VX_KEYS,"body"];
const VM_LBL=k=>k==="body"?{label:"Body",ic:"🧍"}:(VX_TOPICS[k]||{label:k,ic:"•"});
if(!Array.isArray(SET.vcats)) SET.vcats=[...VM_CATS];
SET.vcats=SET.vcats.filter(k=>vmKnown(k)); if(!SET.vcats.length) SET.vcats=[...VM_CATS];
const VX_BODY=[]; {const seen=new Set(); BP.forEach(p=>{if(!seen.has(p.pt)){seen.add(p.pt);VX_BODY.push({t:"body",pt:p.pt,en:p.en,say:p.pt,note:p.note})}})}
const vmList=k=>k==="body"?VX_BODY:(VX[k]||[]);
const VXMAP={};
function vmItem(x){const key="vx:"+x.t+":"+x.pt; VXMAP[key]=x; return {v:{inf:key,vx:true},pt:x.pt,en:x.en,tense:null,vxi:x};}
function buildVocabItems(n){
  let cats=SET.vcats.filter(k=>vmList(k).length); if(!cats.length) cats=VM_CATS.filter(k=>vmList(k).length);
  const lists=shuffle([...cats]).map(k=>{let arr=vmList(k).map(x=>({...x}));
    if(VX_GEN[k]) for(let i=0;i<Math.max(3,Math.round(arr.length/5));i++) arr.push(VX_GEN[k]());
    return shuffle(arr).sort((a,b)=>vxWeak(b)-vxWeak(a));});
  const items=[],sp=new Set(),se=new Set(); let i=0,guard=0;
  while(items.length<n&&lists.some(l=>l.length)&&guard++<2000){
    const l=lists[i++%lists.length]; if(!l.length) continue; const x=l.shift();
    const ek=x.en.toLowerCase().replace(/\s*\(.*\)$/,"");
    if(sp.has(x.pt)||se.has(ek)) continue; sp.add(x.pt); se.add(ek);
    const it=vmItem(x); it.id=items.length; it.missed=false; items.push(it);
  }
  return items;
}
const _biV10=buildItems; buildItems=function(n){return SET.fmt==="vocab"?buildVocabItems(n):_biV10(n)};
const _recV10=rec; rec=function(inf,ok,tense,conf){
  if(typeof inf==="string"&&inf.startsWith("vx:")){const x=VXMAP[inf]; if(x) vxrec(x.t,x.gen?`${VM_LBL(x.t).label} (built)`:x.pt,x.gen?"numbers, times & years you build":x.en,ok); return;}
  _recV10(inf,ok,tense,conf);
};
const _masterV10=master; master=function(inf){ if(String(inf).startsWith("vx:")) return; _masterV10(inf); };
const _unmasterV10=unmaster; unmaster=function(inf){ if(String(inf).startsWith("vx:")) return; _unmasterV10(inf); };
const _rvV10=reviewHTML; reviewHTML=function(){
  if(!round.items.length||!round.items[0].vxi) return _rvV10();
  return round.items.map(it=>{const c=VM_LBL(it.vxi.t);return `<div><span>${it.missed?"❌":round.failed&&!it.done?"⏸️":"✅"} <b style="color:var(--green)">${it.pt}</b> = ${it.en}</span><span class="tag" style="--c:var(--green)">${c.ic} ${c.label}</span></div>`}).join("");
};
/*@@H138@@*/
MODE_LBL.vmatch="🔢 Vocab match"; MODE_LBL.vbody="🧍 Body quiz"; MODE_LBL.vquiz="🔢 Vocab quiz"; MODE_LBL.story="📚 Story quiz";
const _rcV10=renderCtrls;
renderCtrls=function(){
  _rcV10();
  const voc=SET.fmt==="vocab", all=SET.vcats.length===VM_CATS.length;
  $("vcatCtrls").classList.toggle("hidden",!voc);
  $("conjCtrls").classList.toggle("hidden",SET.fmt!=="conj");
  $("trapBtn").classList.toggle("hidden",voc);
  $("vcatChips").innerHTML=`<span class="chip ${all?"on":""}" data-vc="all" style="--c:var(--blue)">All</span>`+
    VM_CATS.map(k=>`<span class="chip ${!all&&SET.vcats.includes(k)?"on":""}" data-vc="${k}" style="--c:var(--green)">${VM_LBL(k).ic} ${VM_LBL(k).label}</span>`).join("");
  $("vcatChips").querySelectorAll(".chip").forEach(c=>c.onclick=()=>{const k=c.dataset.vc;
    if(k==="all") SET.vcats=[...VM_CATS];
    else if(SET.vcats.length===VM_CATS.length) SET.vcats=[k];
    else if(SET.vcats.includes(k)){ if(SET.vcats.length===1) return toast("Keep at least one category on"); SET.vcats=SET.vcats.filter(x=>x!==k); }
    else SET.vcats=VM_CATS.filter(x=>SET.vcats.includes(x)||x===k);
    saveSet(); renderCtrls(); start();});
  if(voc) $("lvDesc").innerHTML=$("lvDesc").innerHTML.replace(/top \d+ verbs( \(irregulars weighted\))?/,"words from your categories");
};
updSummary=function(){
  if(!$("setSummary")) return;
/*@@H139@@*/
  const fmt=SET.fmt==="conj"?"Conjugated":SET.fmt==="vocab"?(SET.vcats.length===VM_CATS.length?"Vocab · all":SET.vcats.length<=2?"Vocab · "+SET.vcats.map(k=>VM_LBL(k).label).join(", "):`Vocab · ${SET.vcats.length} categories`):"Infinitive";
  const bits=[`<b>${SET.style==="memory"?"🃏 Memory":"🎯 Tiles"}</b>`,fmt,`<span class="lvdot" style="background:${l.c}"></span>${l.n}${SET.auto?" ⚡":""}`];
  if(SET.style!=="memory") bits.push(dir);
  bits.push(SET.pairs+" pairs");
  if(SET.fmt==="conj") bits.push(SET.tenses.length+" tense"+(SET.tenses.length>1?"s":""));
  if(SET.traps&&SET.fmt!=="vocab") bits.push("🪤");
  $("setSummary").innerHTML=bits.join(" · ");
};
const _rsV9=renderStats;
renderStats=function(){
  _rsV9();
  const rows=Object.entries(ST.vx||{}).filter(([,s])=>s.w>0).map(([k,s])=>({k,...s,acc:Math.round(s.r/(s.r+s.w)*100)}))
    .sort((a,b)=>b.w/(b.r+b.w+1)-a.w/(a.r+a.w+1)||b.w-a.w).slice(0,12);
  const tl=t=>VM_LBL(t)?VM_LBL(t).ic+" "+VM_LBL(t).label:t;
  const box=document.createElement("div"); box.className="panel";
  box.innerHTML=`<h3>🔢 Vocab &amp; body parts you miss most</h3>${rows.length?`<table class="miss"><thead><tr><th>Word</th><th>Meaning</th><th>Topic</th><th>Wrong</th><th>Right</th><th>Accuracy</th></tr></thead><tbody>${rows.map(r=>
    `<tr><td style="font-weight:800;color:var(--green)">${r.k}</td><td style="font-size:12px">${r.en||""}</td><td style="font-size:12px">${tl(r.t)}</td><td style="color:var(--bad);font-weight:800">${r.w}</td><td>${r.r}</td>
     <td><div style="display:flex;align-items:center;gap:6px"><div class="mbar"><i style="width:${100-r.acc}%"></i></div>${r.acc}%</div></td></tr>`).join("")}</tbody></table>`
    :`<div class="empty">No misses yet. Try Vocab in the Match tab, or the Body quiz.</div>`}`;
  const sv=$("statsView"); sv.insertBefore(box, sv.lastElementChild);
};

/* ===================================================================
   v12 · STORIES  ({word|meaning|verb} = tappable word)
   =================================================================== */
/*@@H140@@*/
const STORIES=[
/*@@H141@@*/
].map((s,i)=>Object.assign(s,{id:i}));

/* ===================================================================
   v12 · SPEECH ENGINE: best voice, speed control, slow mode
   =================================================================== */
const SPEEDS=[{k:"slow",n:"🐢 Slow",r:.6},{k:"relaxed",n:"🚶 Relaxed",r:.78},{k:"normal",n:"Normal",r:.95},{k:"fast",n:"⚡ Fast",r:1.12}];
/*@@H142@@*/
const speedRate=()=> (SPEEDS.find(s=>s.k===SPEECH.speed)||SPEEDS[2]).r;
let PT_VOICES=[];
/*@@H143@@*/
  let s=0; const n=(v.name||"").toLowerCase(), l=(v.lang||"").toLowerCase().replace("_","-");
/*@@H144@@*/
  if(v.localService) s+=5;
  return s;
/*@@H145@@*/
}
function rankVoices(){
  if(!window.speechSynthesis) return;
  PT_VOICES=speechSynthesis.getVoices().map(v=>({v,s:voiceScore(v)})).filter(x=>x.s>=0).sort((a,b)=>b.s-a.s).map(x=>x.v);
}
function loadVoices(){ rankVoices(); if($("spModal")&&$("spModal").classList.contains("show")) fillVoiceSelect(); }
function pickVoice(){
  if(!PT_VOICES.length) rankVoices();
  return (SPEECH.voice&&PT_VOICES.find(v=>v.voiceURI===SPEECH.voice))||PT_VOICES[0]||null;
}
if(window.speechSynthesis){ loadVoices(); speechSynthesis.onvoiceschanged=loadVoices; setTimeout(loadVoices,800); }
/* clean text so it sounds natural */
function speakable(t){
  return String(t).replace(/\s*\/\s*/g,", ").replace(/[{}]/g,"").replace(/…/g,"").replace(/\s+—\s+/g,", ").replace(/^—\s*/,"").replace(/kkkk+/gi,"rá rá rá").replace(/\s+/g," ").trim();
}
let _sayTimer=null;
say=function(txt,opts={}){
  if(!opts.force&&!$("voice").checked) return;
  if(!window.speechSynthesis){ if(opts.onend) opts.onend(); return; }
  clearTimeout(_sayTimer);
  if(!opts.queue) speechSynthesis.cancel();
  const go=()=>{
    const u=new SpeechSynthesisUtterance(speakable(txt));
/*@@H146@@*/
    u.rate=opts.rate||speedRate(); u.pitch=1; u.volume=1;
    if(opts.onend){u.onend=opts.onend;u.onerror=opts.onend;}
    if(opts.onstart) u.onstart=opts.onstart;
    speechSynthesis.speak(u);
    if(speechSynthesis.paused) speechSynthesis.resume();
  };
  _sayTimer=setTimeout(go,opts.queue?0:40);   // tiny gap avoids the Chrome/Safari "cancel then silence" bug
};
sayAlways=function(t,opts){say(t,Object.assign({force:true},opts||{}))};
/* speech settings sheet */
function fillVoiceSelect(){
  const sel=$("spVoice"); if(!sel) return;
  const cur=pickVoice();
  sel.innerHTML=`<option value="">✨ Auto (best available)</option>`+PT_VOICES.map(v=>`<option value="${v.voiceURI.replace(/"/g,"&quot;")}" ${SPEECH.voice===v.voiceURI?"selected":""}>${v.name} · ${v.lang}${v.localService?"":" ☁️"}</option>`).join("");
/*@@H147@@*/
}
function renderSpeedSeg(id){
  const el=$(id); if(!el) return;
  el.innerHTML=SPEEDS.map(s=>`<button data-v="${s.k}" class="${SPEECH.speed===s.k?"on":""}">${s.n}</button>`).join("");
/*@@H148@@*/
}
function syncSpeedUI(){ renderSpeedSeg("spSpeed"); renderSpeedSeg("stSpeed"); const b=$("spkSet"); if(b) b.classList.toggle("slow",SPEECH.speed==="slow"||SPEECH.speed==="relaxed"); }
function openSpeech(){ loadVoices(); fillVoiceSelect(); syncSpeedUI(); $("spModal").classList.add("show"); }
$("spkSet").onclick=openSpeech;
$("spClose").onclick=()=>$("spModal").classList.remove("show");
$("spModal").onclick=e=>{if(e.target.id==="spModal")$("spModal").classList.remove("show")};
/*@@H149@@*/
syncSpeedUI();

/* ===================================================================
   v12 · STORIES UI
   =================================================================== */
/*@@H150@@*/
STV.done=STV.done||{};
/*@@H151@@*/
let storyPlay=null;
function stopStory(){ if(storyPlay){storyPlay.stop=true;storyPlay=null;} if(window.speechSynthesis) speechSynthesis.cancel();
  document.querySelectorAll(".sline.on").forEach(x=>x.classList.remove("on")); const b=$("stPlay"); if(b) b.innerHTML="▶️ Play story"; }
window.__storyReady=true;
function storySummary(){
  const done=Object.keys(STV.done).length;
  return `<b>📚 Stories</b> · ${STV.lv==="all"?"All levels":STORY_LV[STV.lv].n} · ${done}/${STORIES.length} finished · ${(SPEEDS.find(s=>s.k===SPEECH.speed)||SPEEDS[2]).n}`;
}
function storySettingsHTML(){
  return `<div class="sp-row"><span class="ctl-lbl">Level</span><div class="chips" id="stLvChips">
     <span class="chip ${STV.lv==="all"?"on":""}" data-l="all" style="--c:var(--blue)">All</span>
     ${STORY_LV.map((l,i)=>`<span class="chip ${STV.lv===i?"on":""}" data-l="${i}" style="--c:${l.c}">${l.n}</span>`).join("")}</div></div>
   <div class="sp-row"><span class="ctl-lbl">Speech</span><div class="seg" id="stSpeed"></div></div>
   <div class="sp-row"><label><input type="checkbox" id="stEn" ${STV.en?"checked":""}> Show English translations by default</label></div>
/*@@H152@@*/
}
function bindStorySettings(){
  document.querySelectorAll("#stLvChips .chip").forEach(c=>c.onclick=()=>{STV.lv=c.dataset.l==="all"?"all":+c.dataset.l;STV.open=null;saveStory();renderVocab();});
  if($("stEn")) $("stEn").onchange=()=>{STV.en=$("stEn").checked;saveStory();renderStories();};
  renderSpeedSeg("stSpeed");
  if($("stRand")) $("stRand").onclick=()=>{const l=storyList();openStory(rnd(l.length?l:STORIES).id)};
}
const storyList=()=>STORIES.filter(s=>STV.lv==="all"||s.lv===STV.lv);
function renderStories(){ STV.open!=null?renderStory(STV.open):renderStoryList(); }
function renderStoryList(){
  stopStory();
  const list=storyList();
  const groups=STORY_LV.map((L,i)=>({L,i,items:list.filter(s=>s.lv===i)})).filter(g=>g.items.length);
  $("vxArea").innerHTML=groups.map(g=>`<div class="st-group"><h3 style="color:${g.L.c}">${g.L.n} <span class="gn">· ${g.L.d}</span></h3>
     <div class="st-grid">${g.items.map(s=>{const d=STV.done[s.id];return `<button class="st-card" data-id="${s.id}" style="--c:${g.L.c}">
       <span class="st-ic">${s.ic}</span><span class="st-tx"><b>${s.t}</b><span>${s.en}</span></span>
       <span class="st-meta">${s.l.length} lines${d?` · <b class="st-done">✓ ${d.best}/${s.q.length}</b>`:""}</span></button>`}).join("")}</div></div>`).join("")+
   `<p class="foot">Tap a story to read it. Highlighted words can be tapped for their meaning, and every line can be played aloud.</p>`;
  $("vxArea").querySelectorAll(".st-card").forEach(b=>b.onclick=()=>openStory(+b.dataset.id));
}
function openStory(id){ STV.open=id; renderStory(id); scrollTo({top:0,behavior:"smooth"}); }
const plainLine=s=>s.replace(/\{([^|}]+)\|[^}]*\}/g,"$1");
function lineHTML(s,li){
  return s.replace(/\{([^|}]+)\|([^|}]+)(?:\|([^}]+))?\}/g,(m,w,en,inf)=>`<span class="gw" data-w="${w}" data-en="${en.replace(/"/g,"&quot;")}"${inf&&VMAP[inf]?` data-v="${inf}"`:""}>${w}</span>`);
}
function renderStory(id){
  stopStory();
  const s=STORIES[id], L=STORY_LV[s.lv], list=storyList(), idx=list.findIndex(x=>x.id===id);
  const prev=idx>0?list[idx-1]:null, next=idx>=0&&idx<list.length-1?list[idx+1]:null;
  $("vxArea").innerHTML=`<div class="panel st-view">
    <div class="st-top"><button class="btn ghost sm" id="stBack">◀ All stories</button><span class="tag" style="--c:${L.c}">${L.n}</span></div>
    <h2 class="st-title">${s.ic} ${s.t}</h2><div class="st-sub">${s.en}</div>
    <div class="st-ctrls">
      <button class="btn go" id="stPlay">▶️ Play story</button>
      <div class="seg" id="stSpeed2"></div>
      <label class="st-entg"><input type="checkbox" id="stEn2" ${STV.en?"checked":""}> 🇺🇸 English</label>
    </div>
    <div class="st-lines ${STV.en?"show-en":""}" id="stLines">${s.l.map(([pt,en],i)=>`
      <div class="sline" data-i="${i}"><button class="spk2 st-ls" data-i="${i}" title="Play this line">🔊</button>
        <div class="st-txt"><div class="st-pt">${lineHTML(pt,i)}</div><div class="st-en">${en}</div><div class="gpop hidden"></div></div></div>`).join("")}</div>
    <p class="gn" style="margin:6px 0 0">Tip: tap a <span class="gw" style="pointer-events:none">highlighted</span> word for its meaning · tap a line's text to show its English.</p>
  </div>
  <div class="panel st-quiz" id="stQuiz"><h3>✅ Check your understanding</h3>${s.q.map((q,qi)=>{const opts=shuffle([q[2],q[3],q[4]]);return `
    <div class="sq" data-q="${qi}"><div class="sq-q"><b>${qi+1}. ${q[0]}</b> <button class="spk2" data-sayq="${qi}" title="Hear the question">🔊</button><div class="gn">${q[1]}</div></div>
      <div class="sq-opts">${opts.map(o=>`<button class="sq-o" data-o="${o.replace(/"/g,"&quot;")}">${o}</button>`).join("")}</div></div>`}).join("")}
    <div id="stResult"></div></div>
  <div class="st-nav"><button class="btn ghost" id="stPrev" ${prev?"":"disabled"}>◀ ${prev?prev.t:"Previous"}</button><button class="btn ghost" id="stNext" ${next?"":"disabled"}>${next?next.t:"Next"} ▶</button></div>`;
  const speedSeg=$("stSpeed2"); speedSeg.id="stSpeed2"; 
  speedSeg.innerHTML=SPEEDS.filter(x=>x.k!=="fast").map(x=>`<button data-v="${x.k}" class="${SPEECH.speed===x.k?"on":""}">${x.n}</button>`).join("");
  speedSeg.querySelectorAll("button").forEach(b=>b.onclick=()=>{SPEECH.speed=b.dataset.v;saveSpeech();syncSpeedUI();speedSeg.querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b));});
  $("stBack").onclick=()=>{STV.open=null;renderStoryList();};
  if(prev) $("stPrev").onclick=()=>openStory(prev.id);
  if(next) $("stNext").onclick=()=>openStory(next.id);
  $("stEn2").onchange=()=>{STV.en=$("stEn2").checked;saveStory();$("stLines").classList.toggle("show-en",STV.en);};
  $("stPlay").onclick=()=>storyPlay?stopStory():playStory(s,0);
  document.querySelectorAll(".st-ls").forEach(b=>b.onclick=e=>{e.stopPropagation();stopStory();playLine(s,+b.dataset.i,false);});
  document.querySelectorAll(".sline .st-pt").forEach(p=>p.onclick=e=>{ if(e.target.closest(".gw")) return; p.closest(".sline").classList.toggle("en-on"); });
  document.querySelectorAll(".sline .gw").forEach(w=>w.onclick=e=>{
    e.stopPropagation(); const pop=w.closest(".st-txt").querySelector(".gpop");
    document.querySelectorAll(".gpop").forEach(g=>{if(g!==pop)g.classList.add("hidden")});
    document.querySelectorAll(".gw.sel").forEach(g=>g.classList.remove("sel")); w.classList.add("sel");
    pop.innerHTML=`<b>${w.dataset.w}</b> = ${w.dataset.en}${w.dataset.v?` · <a href="#" class="gv" data-v="${w.dataset.v}">📖 ${w.dataset.v} conjugations</a>`:""}`;
    pop.classList.remove("hidden"); sayAlways(w.dataset.w);
    const gv=pop.querySelector(".gv"); if(gv) gv.onclick=ev=>{ev.preventDefault();openVerb(gv.dataset.v);};
  });
  document.querySelectorAll("[data-sayq]").forEach(b=>b.onclick=()=>sayAlways(s.q[+b.dataset.sayq][0]));
  const ans={};
  document.querySelectorAll(".sq").forEach(box=>{const qi=+box.dataset.q, q=s.q[qi];
    box.querySelectorAll(".sq-o").forEach(o=>o.onclick=()=>{
      if(ans[qi]!=null) return; const ok=o.dataset.o===q[2]; ans[qi]=ok;
      box.querySelectorAll(".sq-o").forEach(x=>{x.disabled=true;if(x.dataset.o===q[2])x.classList.add("right")});
      if(!ok) o.classList.add("wrong"); ok?good():bad(); sayAlways(q[2]);
/*@@H153@@*/
      if(Object.keys(ans).length===s.q.length) storyDone(s,ans);
    });});
}
function storyDone(s,ans){
  const right=Object.values(ans).filter(Boolean).length, n=s.q.length, prev=STV.done[s.id];
  STV.done[s.id]={best:Math.max(right,prev?prev.best:0),d:Date.now()}; saveStory();
/*@@H154@@*/
  if(right===n){win();confetti();}
  const list=storyList(), idx=list.findIndex(x=>x.id===s.id), next=list[idx+1];
/*@@H155@@*/
    ${next?`<button class="btn go sm" id="stGoNext">Next story: ${next.t} ▶</button>`:""}</div>`;
  if(next) $("stGoNext").onclick=()=>openStory(next.id);
}
function playLine(s,i,cont){
  const el=document.querySelector(`.sline[data-i="${i}"]`); if(!el) return;
  document.querySelectorAll(".sline.on").forEach(x=>x.classList.remove("on")); el.classList.add("on");
  el.scrollIntoView({block:"center",behavior:"smooth"});
  const me=storyPlay;
  sayAlways(plainLine(s.l[i][0]),{onend:()=>{
    if(!cont){el.classList.remove("on");return;}
    if(!storyPlay||storyPlay!==me||storyPlay.stop) return;
    if(i+1<s.l.length) setTimeout(()=>{ if(storyPlay===me&&!me.stop) playLine(s,i+1,true); },350);
    else { stopStory(); }
  }});
}
function playStory(s,i){ storyPlay={stop:false}; $("stPlay").innerHTML="⏹ Stop"; playLine(s,i,true); }
const _rsV12=renderStats;
renderStats=function(){
  _rsV12();
  const done=Object.keys(STV.done).length;
  const box=document.createElement("div"); box.className="panel";
  box.innerHTML=`<h3>📚 Stories</h3><div class="tbar"><span>Finished</span><div class="tr"><i style="width:${done/STORIES.length*100}%;background:var(--green)"></i></div><b style="width:72px;text-align:right">${done}/${STORIES.length}</b></div>
   ${STORY_LV.map((L,i)=>{const all=STORIES.filter(s=>s.lv===i),d=all.filter(s=>STV.done[s.id]).length;return `<div class="tbar"><span>${L.n}</span><div class="tr"><i style="width:${d/all.length*100}%;background:${L.c}"></i></div><b style="width:72px;text-align:right">${d}/${all.length}</b></div>`}).join("")}`;
  const sv=$("statsView"); sv.insertBefore(box, sv.lastElementChild);
};
/* boot */
renderCtrls(); updSummary();
if(GAME_MODES.includes(mode)) { mode=gameMode(); start(); }

/* ===== v14: alphabetical verb bank, accent-insensitive search, vocab + body search ===== */
const LANGC=document.documentElement.dataset.lang==="es"?"es":"pt";
const LNAME=LANGC==="es"?"Spanish":"Portuguese";
const LKEY=k=>(LANGC==="es"?"es_":"vm_")+k;
const norm=s=>String(s||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
let BANK_SORT=LS.get(LKEY("banksort"),"az");
(function(){
  const q=$("q"); if(!q) return;
  q.placeholder=`🔍 Search ${LNAME} or English…`;
  const sel=document.createElement("select"); sel.className="sortsel"; sel.id="bankSort"; sel.title="Sort verbs";
  sel.innerHTML=`<option value="az">A–Z</option><option value="freq">Most common</option>`; sel.value=BANK_SORT;
  q.after(sel); sel.onchange=()=>{BANK_SORT=sel.value;LS.set(LKEY("banksort"),BANK_SORT);renderBank();};
})();
const goForm=v=>LANGC==="es"?"voy a "+v.inf:(v.noGo?"vou (= I'm going)":"vou "+v.inf);
renderBank=function(){
  const q=norm($("q").value.trim()), only=$("onlyMast").checked, om=$("onlyMiss").checked;
  let list=VERBS.filter(v=>(!q||norm(v.inf).includes(q)||norm(v.gloss).includes(q)||norm(v.eb).includes(q))&&(!only||mastered.has(v.inf))&&(!om||(ST.verbs[v.inf]&&ST.verbs[v.inf].w)));
  if(BANK_SORT==="az") list=[...list].sort((a,b)=>a.inf.localeCompare(b.inf,LANGC));
  /* when searching, exact / starts-with matches first */
  if(q) list=[...list].sort((a,b)=>{const s=v=>norm(v.inf)===q?0:norm(v.inf).startsWith(q)?1:norm(v.gloss).split(/[\s/(),·]+/).includes(q)?2:3;return s(a)-s(b)});
  const L=["","","",...BANK_T.map(k=>TENSES[k].label)];
  let html="",last="",n=0;
  list.forEach(v=>{
    const letter=norm(v.inf)[0].toUpperCase();
    if(BANK_SORT==="az"&&!q&&letter!==last){ last=letter; html+=`<tr class="lt-row"><td colspan="8">${letter}</td></tr>`; }
    const w=ST.verbs[v.inf]?.w||0; n++;
    const cells=[n,`${v.inf}${mastered.has(v.inf)?' <span class="star">★</span>':""}${w?`<span class="miss-b">${w}</span>`:""}`,v.gloss,v.p,v.pt,v.i,goForm(v),v.f];
    html+=`<tr>${cells.map((c,i)=>i===1?`<td class="v" data-v="${v.inf}">${c}</td>`:`<td${L[i]?` data-l="${L[i]}"`:""}>${c}</td>`).join("")}</tr>`;
  });
  $("bankBody").innerHTML=html||`<tr><td colspan="8" class="empty" style="text-align:center;white-space:normal">No verbs match “${$("q").value}”. Try the English meaning, e.g. “to eat”.</td></tr>`;
  $("bankBody").querySelectorAll("td.v").forEach(td=>td.onclick=()=>openVerb(td.dataset.v));
};
$("q").oninput=()=>renderBank(); $("onlyMast").onchange=()=>renderBank(); $("onlyMiss").onchange=()=>renderBank();
/* slang: accent-insensitive search */
slangList=function(){
  const q=norm(SSET.q.trim());
  return SLANG.filter(s=>(SSET.reg==="all"||s.r===SSET.reg)&&(SSET.cat==="all"||s.c===SSET.cat)&&(!SSET.learned||!SLEARN.has(s.t))&&
    (!q||norm(s.t+" "+s.m+" "+s.ex+" "+s.en).includes(q)));
};
/* ---------- Vocab › Learn search ---------- */
let VXQS="";
const _vxLearn14=vxLearn;
vxLearn=function(a){
  a.innerHTML=`<div class="controls vx-search"><input type="search" id="vxQ" placeholder="🔍 Search ${LNAME} or English (all topics)…" value="${VXQS.replace(/"/g,"&quot;")}" autocomplete="off"></div><div id="vxLearnList"></div>`;
  const run=()=>{
    const raw=VXQS.trim(), q=norm(raw), box=$("vxLearnList");
    if(!q){ _vxLearn14(box); return; }
    const groups={};
    const add=(t,x)=>{(groups[t]=groups[t]||[]).push(x)};
    if(/^\d{1,6}$/.test(raw)) add("num",{pt:numToPt(+raw),en:(+raw).toLocaleString("en-US"),say:numToPt(+raw),note:"Built from your search"});
    VX_KEYS.forEach(t=>VX[t].forEach(x=>{ if(norm(x.pt+" | "+x.en).includes(q)) add(t,x); }));
    VX_BODY.forEach(x=>{ if(norm(x.pt+" | "+x.en).includes(q)) add("body",x); });
    const keys=Object.keys(groups), total=keys.reduce((s,k)=>s+groups[k].length,0);
    box.innerHTML=total?`<div class="vx-res-h">${total} result${total>1?"s":""} for “${raw.replace(/</g,"&lt;")}” · tap to hear</div>`+keys.map(t=>{const T=VM_LBL(t);
      return `<details class="fold vx-sec" open><summary>${T.ic} ${T.label}<span class="gn">${groups[t].length}</span></summary><div class="vx-in"><div class="vx-grid">${groups[t].map(x=>
        `<button class="vx-it" data-say="${String(x.say||x.pt).replace(/"/g,"&quot;")}"><b>${x.pt}</b><span>${x.en}</span>${x.note?`<i>💡 ${x.note}</i>`:""}</button>`).join("")}</div></div></details>`}).join("")
      :`<div class="panel empty">No words match “${raw.replace(/</g,"&lt;")}”. Try the ${LNAME} word or its English meaning.</div>`;
    box.querySelectorAll(".vx-it[data-say]").forEach(b=>b.onclick=()=>{sayAlways(b.dataset.say);b.classList.add("playing");setTimeout(()=>b.classList.remove("playing"),700)});
  };
  $("vxQ").oninput=()=>{VXQS=$("vxQ").value;run()};
  run();
};
/* ---------- Vocab › Body search (Explore) ---------- */
let BQS="";
const _renderBody14=renderBody;
renderBody=function(){
  _renderBody14();
  if(VXS.bmode==="quiz"||!$("bList")) return;
  const h4=$("bList").querySelector("h4");
  const inp=document.createElement("input"); inp.type="search"; inp.className="bsearch"; inp.id="bQ"; inp.autocomplete="off";
  inp.placeholder=`🔍 ${LNAME} or English…`; inp.value=BQS; h4.after(inp);
  const res=document.createElement("div"); res.id="bRes"; res.style.display="contents"; inp.after(res);
  const filter=()=>{
    const q=norm(BQS.trim()), orig=[...$("bList").querySelectorAll(".pi:not(.res)")];
    if(!q){ orig.forEach(b=>b.style.display=""); res.innerHTML=""; return; }
    orig.forEach(b=>b.style.display="none");
    const seen=new Set(), hits=BP.filter(p=>norm(p.pt+" | "+p.en).includes(q)&&!seen.has(p.view+p.pt)&&seen.add(p.view+p.pt))
      .sort((a,b)=>(a.view===VXS.bview?0:1)-(b.view===VXS.bview?0:1));
    res.innerHTML=hits.length?hits.map(p=>`<button class="pi res" data-k="${p.k}"><b>${p.pt}</b><span class="en">${p.en}</span>${p.view!==VXS.bview?`<span class="vtag">${p.view==="face"?"🙂 Face":"🧍 Body"}</span>`:""}</button>`).join("")
      :`<div class="empty-s">No match. Try the English word, e.g. “knee”.</div>`;
    res.querySelectorAll(".pi").forEach(b=>b.onclick=()=>{const p=BPK[b.dataset.k];
      if(p.view!==VXS.bview){ VXS.bview=p.view; bSel=p.k; saveVX(); renderBody(); sayAlways(p.pt); }
      else bSelect(p.k);
      res.querySelectorAll(".pi").forEach(x=>x.classList.toggle("on",x.dataset.k===p.k)); });
  };
  inp.oninput=()=>{BQS=inp.value;filter()};
  inp.onkeydown=e=>{ if(e.key==="Enter"){ const f=res.querySelector(".pi"); if(f) f.click(); } };
  filter();
};
if(mode==="bank") renderBank();

/* =====================================================================
   v15 · TYPE-THE-ANSWER · DAILY GOAL & STREAK · REVIEW QUEUE
   ===================================================================== */
const TLANG=LANGC==="es"?"Spanish":"Portuguese";
const ACC_KEYS=LANGC==="es"?["á","é","í","ó","ú","ñ","ü","¿","¡"]:["á","â","ã","à","é","ê","í","ó","ô","õ","ú","ç"];
const PUNCT=/[¿?¡!.,;:"“”«»()]/g;
const cleanX=s=>String(s||"").toLowerCase().replace(PUNCT,"").replace(/\s+/g," ").trim();
const cleanN=s=>norm(String(s||"")).replace(PUNCT,"").replace(/\s+/g," ").trim();
const ART_RE=LANGC==="es"?/^(el|la|los|las|un|una) /:/^(o|a|os|as|um|uma) /;
function accKeysHTML(){return `<div class="acc-keys">${ACC_KEYS.map(k=>`<button type="button" data-k="${k}" tabindex="-1">${k}</button>`).join("")}</div>`}
function bindAccKeys(box,inp){box.querySelectorAll(".acc-keys button").forEach(b=>b.onmousedown=e=>{e.preventDefault();
  const s=inp.selectionStart??inp.value.length,t=inp.selectionEnd??s; inp.value=inp.value.slice(0,s)+b.dataset.k+inp.value.slice(t);
  inp.setSelectionRange(s+1,s+1); inp.focus();});}
/* grade one typed answer against an item; returns {ok,note} */
function gradeTyped(v,it){
  const alts=new Set();
  String(it.pt).split(/\s*\/\s*/).forEach(a=>alts.add(a));
  if(it.person){ const pr=PERSONS[it.person].pt;
    [...alts].forEach(a=>{ let x=a.replace(/^que /,""); alts.add(x); if(x.startsWith(pr+" ")) alts.add(x.slice(pr.length+1)); }); }
  const ve=cleanX(v), vn=cleanN(v);
  if(!vn) return {ok:false};
  for(const a of alts) if(cleanX(a)===ve) return {ok:true};
  for(const a of alts) if(cleanN(a)===vn) return {ok:true,note:`✍️ Watch the accents: <b>${it.pt}</b>`};
  for(const a of alts){ const na=cleanN(a); if(ART_RE.test(na)&&na.replace(ART_RE,"")===vn) return {ok:true,note:`💡 Include the article next time: <b>${it.pt}</b>`}; }
  return {ok:false};
}
/* ---------- ⌨️ Type-it game (Match tab) ---------- */
let TY=null;
const _newMatch15=newMatch;
newMatch=function(){ if(SET.style==="type") newType(); else _newMatch15(); };
function newType(){
  const items=buildItems(SET.pairs);
  round=Object.assign(newRoundState(items),{type:true}); if(round.limit) round.limit=Math.round(round.limit*2.5);
  TY={i:0,answered:false,hint:0};
  $("play").innerHTML=`<div class="ty-card" id="tyCard"></div><div class="tmarks">${items.map(it=>`<i data-id="${it.id}"></i>`).join("")}</div>`;
  stats(); startTimer(); showType();
}
function showType(){
  const it=round.items[TY.i]; TY.answered=false; TY.hint=0;
  const tag=it.tense?`<span class="tag" style="--c:${TENSES[it.tense].c}">${TENSES[it.tense].label}</span>`:it.vxi?`<span class="tag" style="--c:var(--green)">${VM_LBL(it.vxi.t).ic} ${VM_LBL(it.vxi.t).label}</span>`:`<span class="tag" style="--c:var(--blue)">Verb</span>`;
  $("tyCard").innerHTML=`
    <div class="ty-top">${tag}<span>${TY.i+1} / ${round.items.length}</span></div>
    <div class="ty-prompt">${it.en}</div>
    <div class="ty-sub">Type it in ${TLANG}${it.person?" · include the pronoun or not, your choice":""}</div>
    <div class="ty-row"><input class="ty-in" id="tyIn" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" lang="${LANGC}" placeholder="Your answer…"></div>
    ${accKeysHTML()}
    <div class="ty-acts"><button class="btn go" id="tyCheck">Check ↵</button><button class="btn ghost" id="tyIdk">I don't know</button></div>
    <div class="ty-fb" id="tyFb"></div>
    <div class="ty-dots">${round.items.map((x,k)=>`<i class="${k<TY.i?(x.missed?"bad":"ok"):k===TY.i?"cur":""}"></i>`).join("")}</div>`;
  const inp=$("tyIn"); bindAccKeys($("tyCard"),inp);
  inp.onkeydown=e=>{ if(e.key==="Enter"){ e.preventDefault(); TY.answered?nextType():checkType(); } };
  $("tyCheck").onclick=()=>TY.answered?nextType():checkType();
  $("tyIdk").onclick=()=>{ if(!TY.answered) checkType(true); };
  setTimeout(()=>inp.focus({preventScroll:true}),60);
}
function checkType(giveUp){
  if(!round||round.over||paused||TY.answered) return;
  const it=round.items[TY.i], inp=$("tyIn"), v=inp.value;
  if(!giveUp&&!v.trim()){ inp.focus(); return toast("Type an answer first"); }
  const g=giveUp?{ok:false}:gradeTyped(v,it);
  TY.answered=true; inp.readOnly=true; inp.classList.add(g.ok?"ok":"bad");
  document.querySelector(`.tmarks i[data-id="${it.id}"]`).classList.add("ok");
  if(g.ok){ good(); addPoints(); if(!it.missed){rec(it.v.inf,true,it.tense);master(it.v.inf);} }
  else { it.missed=true; round.mistakes++; rec(it.v.inf,false,it.tense,v.trim()||null); unmaster(it.v.inf); }
  say(it.pt);
  $("tyFb").innerHTML=g.ok?`<div class="fb-ok">✅ ${LANGC==="es"?"¡Correcto!":"Certo!"}</div><div class="ans">${it.pt}</div>${g.note?`<div class="note">${g.note}</div>`:""}`
    :`<div class="fb-bad">${giveUp?"👀 Here it is:":"❌ Not quite."}</div><div class="ans">${it.pt}</div>${v.trim()?`<div class="gn">You typed: <s>${v.replace(/</g,"&lt;")}</s></div>`:""}`;
  $("tyCheck").textContent=TY.i+1<round.items.length?"Next ➜":"See results"; $("tyIdk").classList.add("hidden");
  round.done++;
  if(!g.ok&&penalize()){ round.over=true; return; }
  setTimeout(()=>{ const b=$("tyCheck"); if(b) b.focus({preventScroll:true}); },30);
}
function nextType(){ if(!round||round.over&&round.done<round.items.length) return;
  if(TY.i+1<round.items.length){ TY.i++; showType(); } else finish(); }
/* hint in type mode = reveal the next letter */
const _hint15=$("hintBtn").onclick;
$("hintBtn").onclick=()=>{
  if(SET.style!=="type"||!round||!round.type) return _hint15();
  if(paused||round.over||round.hints<=0||TY.answered) return;
  const it=round.items[TY.i], ans=String(it.pt).split(/\s*\/\s*/)[0];
  TY.hint=Math.min(ans.length,TY.hint+1); round.hints--; streak=0; it.missed=true; stats();
  const inp=$("tyIn"); inp.value=ans.slice(0,TY.hint); inp.focus();
};
/* direction doesn't apply in type mode (always English → target) */
const _start15=start;
start=function(){ _start15();
  const ds=$("dirSeg"); if(SET.style==="type"){ds.style.opacity=.45;ds.title="Type it always shows English and you write the "+TLANG;}
  renderDaily(); };
const _upd15=updSummary;
updSummary=function(){ _upd15(); if(SET.style==="type"&&$("setSummary")) $("setSummary").innerHTML=$("setSummary").innerHTML.replace(/<b>🎯 Tiles<\/b>/,"<b>⌨️ Type it</b>").replace(/ · (PT|ES)→EN| · EN→(PT|ES)| · Mixed/,""); };
const _lr15=logRound; logRound=function(a,s,f){ _lr15(a,s,f); if(SET.style==="type"){ST.rounds[ST.rounds.length-1].m=SET.fmt==="vocab"?"tvocab":"type";LS.set(LKEY("stats"),ST);} };
MODE_LBL.type="⌨️ Type it"; MODE_LBL.tvocab="⌨️ Type vocab";
if(SET.style==="type") updSummary();

/* ---------- ⌨️ Type answers in Fill the Blank ---------- */
const _rw15=renderWords;
renderWords=function(){
  _rw15();
  if(WSET.sub!=="fill") return;
  const lab=document.createElement("label"); lab.className="ty-tog";
  lab.innerHTML=`<input type="checkbox" id="wType" ${WSET.type?"checked":""}> ⌨️ Type answers`;
  $("wSub").after(lab);
  $("wType").onchange=()=>{WSET.type=$("wType").checked;saveW();renderWords();};
};
const _showQ15=showQ;
showQ=function(){
  _showQ15();
  if(!WSET.type) return;
  const it=WR.items[WR.i], box=$("wBody").querySelector(".qopts");
  box.outerHTML=`<div class="qtype"><div class="ty-row"><input class="ty-in" id="wIn" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" lang="${LANGC}" placeholder="Type the missing word…"><button class="btn go" id="wChk">Check</button></div>${accKeysHTML()}</div>`;
  const inp=$("wIn"); bindAccKeys($("wBody"),inp);
  const go=()=>{ if(WR.answered) return; const v=inp.value; if(!v.trim()) return toast("Type an answer first");
    const exact=cleanX(v)===cleanX(it.a), loose=cleanN(v)===cleanN(it.a);
    inp.readOnly=true; inp.classList.add(loose?"ok":"bad");
    answer({dataset:{o:loose?it.a:v.trim()},classList:{add(){}}});
    if(loose&&!exact) $("qfb").insertAdjacentHTML("beforeend",`<div class="ty-fb"><span class="note">✍️ Watch the accents: <b>${it.a}</b></span></div>`); };
  inp.onkeydown=e=>{ if(e.key==="Enter"){ e.preventDefault(); e.stopPropagation(); go(); } };
  $("wChk").onclick=go;
  setTimeout(()=>inp.focus({preventScroll:true}),60);
};

/* ---------- 📅 DAILY GOAL · STREAK · SPACED REVIEW ---------- */
let DAILY=Object.assign({goal:20,days:{},best:0},LS.get(LKEY("daily"),{}));
const saveDaily=()=>LS.set(LKEY("daily"),DAILY);
const dayKey=(d=new Date())=>{const x=new Date(d);return x.getFullYear()+"-"+String(x.getMonth()+1).padStart(2,"0")+"-"+String(x.getDate()).padStart(2,"0")};
const todayN=()=>DAILY.days[dayKey()]||0;
function streakDays(){
  let n=0; const d=new Date();
  if(todayN()<DAILY.goal) d.setDate(d.getDate()-1);
  while((DAILY.days[dayKey(d)]||0)>=DAILY.goal){ n++; d.setDate(d.getDate()-1); }
  return n;
}
function bumpDay(){
  const k=dayKey(), was=DAILY.days[k]||0; DAILY.days[k]=was+1;
  const keys=Object.keys(DAILY.days).sort(); while(keys.length>120) delete DAILY.days[keys.shift()];
  const s=streakDays(); if(s>DAILY.best) DAILY.best=s; saveDaily();
  if(was+1===DAILY.goal){ toast(`🎯 Daily goal hit! 🔥 ${s}-day streak`); win(); }
  renderDaily();
}
/* simple Leitner boxes for verbs: wrong → due now, right → push further out */
const SRS_DAYS=[0,1,3,7,14,30];
ST.srs=ST.srs||{};
(function seed(){ let ch=0; Object.entries(ST.verbs||{}).forEach(([inf,s])=>{ if(!VMAP[inf]||ST.srs[inf]) return; ch=1;
  ST.srs[inf]=s.w>s.r/2?{b:0,due:Date.now()}:{b:1,due:(s.last||Date.now())+864e5}; }); if(ch) LS.set(LKEY("stats"),ST); })();
function srsUpdate(inf,ok){
  const s=ST.srs[inf]||(ST.srs[inf]={b:0,due:0});
  if(ok){ s.b=Math.min(SRS_DAYS.length-1,s.b+1); s.due=Date.now()+SRS_DAYS[s.b]*864e5-36e5; }
  else { s.b=0; s.due=Date.now(); }
  s.seen=Date.now();
}
const dueList=()=>Object.entries(ST.srs).filter(([inf,s])=>VMAP[inf]&&s.due<=Date.now()).sort((a,b)=>a[1].b-b[1].b||a[1].due-b[1].due).map(([inf])=>inf);
const _rec15=rec;
rec=function(inf,ok,tense,conf){
  _rec15(inf,ok,tense,conf);
  if(typeof inf==="string"&&!inf.startsWith("vx:")&&VMAP[inf]){ srsUpdate(inf,ok); LS.set(LKEY("stats"),ST); }
  if(ok&&!(typeof inf==="string"&&inf.startsWith("vx:"))) bumpDay();
};
const _vxrec15=vxrec; vxrec=function(t,pt,en,ok){ _vxrec15(t,pt,en,ok); if(ok) bumpDay(); };
const _wrec15=wrec; wrec=function(it,ok,p){ _wrec15(it,ok,p); if(ok) bumpDay(); };
const _sd15=storyDone; storyDone=function(s,ans){ _sd15(s,ans); Object.values(ans).filter(Boolean).forEach(()=>bumpDay()); };
function startReview(){
  const due=dueList(); if(!due.length) return toast("Nothing due. Nice work! 🎉");
  if(SET.fmt==="vocab"){SET.fmt="inf";saveSet();}
  const list=due.slice(0,SET.pairs); focusQ=shuffle([...list]);
  $("banner").textContent=`📅 Review: ${list.length} verb${list.length>1?"s":""} due today${due.length>list.length?` (${due.length-list.length} more after this round)`:""}.`;
  $("banner").classList.remove("hidden"); setMode("play",true); scrollTo({top:0,behavior:"smooth"});
}
/* bar on the Match tab */
(function(){ const d=document.createElement("div"); d.id="dailyBar"; d.className="daily"; $("stats").before(d); })();
function renderDaily(){
  const bar=$("dailyBar"); if(!bar) return;
  const game=!$("gameCtrls").classList.contains("hidden"); bar.classList.toggle("hidden",!game); if(!game) return;
  const n=todayN(), g=DAILY.goal, s=streakDays(), due=dueList().length;
  bar.innerHTML=`<span class="fire" title="Days in a row you hit your goal">🔥 ${s} day${s===1?"":"s"}</span>
    <span class="goal"><span class="gnum ${n>=g?"done":""}">${n>=g?"✅ ":""}${Math.min(n,999)}/${g} today</span><span class="gbar"><i style="width:${Math.min(100,n/g*100)}%"></i></span></span>
    <span class="due">📚 ${due} due</span>
    ${due?`<button class="btn alt sm" id="revBtn">Review now</button>`:""}`;
  if($("revBtn")) $("revBtn").onclick=startReview;
}
/* stats panel */
const _rs15=renderStats;
renderStats=function(){
  _rs15();
  const s=streakDays(), n=todayN(), due=dueList();
  const days=[...Array(14)].map((_,i)=>{const d=new Date();d.setDate(d.getDate()-13+i);return d});
  const mx=Math.max(DAILY.goal,...days.map(d=>DAILY.days[dayKey(d)]||0));
  const box=document.createElement("div"); box.className="panel";
  box.innerHTML=`<h3>📅 Daily goal &amp; review <span class="spacer"></span>
      <label class="gn">Goal <select id="goalSel">${[10,20,30,50,80].map(v=>`<option ${v===DAILY.goal?"selected":""}>${v}</option>`).join("")}</select> correct / day</label></h3>
    <div class="big3"><div><b>🔥 ${s}</b><span>Day streak</span></div><div><b>${n}/${DAILY.goal}</b><span>Today</span></div><div><b>${DAILY.best}</b><span>Best streak</span></div></div>
    <div class="cal">${days.map(d=>{const v=DAILY.days[dayKey(d)]||0;return `<div class="${v>=DAILY.goal?"met":v?"part":""}" style="height:${Math.max(6,v/mx*100)}%" title="${dayKey(d)}: ${v}"></div>`}).join("")}</div>
    <div class="cal-l">${days.map(d=>`<span>${"SMTWTFS"[d.getDay()]}</span>`).join("")}</div>
    <div style="margin-top:12px;display:flex;align-items:center;gap:10px;flex-wrap:wrap"><b>📚 ${due.length} verb${due.length===1?"":"s"} due for review</b>
      ${due.length?`<button class="btn alt sm" id="revBtn2">Review now</button>`:`<span class="gn">You're all caught up.</span>`}</div>
    ${due.length?`<div class="due-list">${due.slice(0,30).map(v=>`<span data-v="${v}">${v}</span>`).join("")}${due.length>30?`<span>+${due.length-30} more</span>`:""}</div>`:""}
    <div class="vnote">Any correct answer counts toward your goal. Verbs you miss come back today; ones you get right come back in 1, 3, 7, 14, then 30 days.</div>`;
  const sv=$("statsView"); sv.insertBefore(box, sv.children[1]||null);
  $("goalSel").onchange=()=>{DAILY.goal=+$("goalSel").value;saveDaily();renderStats();};
  if($("revBtn2")) $("revBtn2").onclick=startReview;
  box.querySelectorAll(".due-list span[data-v]").forEach(x=>x.onclick=()=>openVerb(x.dataset.v));
};
/* backups include the daily log */
if(typeof BK_KEYS!=="undefined"&&!BK_KEYS.includes(LKEY("daily"))) BK_KEYS.push(LKEY("daily"),LKEY("banksort"));
renderDaily();
/* iPhone voice note inside the voice sheet */
(function(){
  const ios=/iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);
  if(!ios) return;
  const n=document.createElement("div"); n.className="sp-tip"; n.id="iosNote";
  n.innerHTML="📱 <b>You're on iPhone/iPad:</b> only Apple's built-in voices listed above can be used in a web app. That's an Apple limit, not a setting you missed.";
  $("spWarn").after(n);
})();

/*@@H156@@*/
const G16T=(head,rows)=>`<table class="gt"><thead><tr>${head.map(h=>`<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const G16B=x=>`<b class="hl">${x}</b>`;
const G16={
/*@@H157@@*/
   mapDesc:"Quiz: read or listen to the directions, starting at ⭐ facing north, then tap the place you end up at. 🎧 Listen plays the directions without text.",
/*@@H158@@*/
   mapStart:"⭐ You start here, facing north", mapTapHint:"Tap a building to see and hear its name.", treeTapHint:"Tap a relative to see and hear the word.", listenDir:"Listen to the directions, then tap where you end up."},
/*@@H159@@*/
   quest:{label:"Question words",c:"#e67700"},neg:{label:"Negatives",c:"#c92a2a"},cmp:{label:"Comparisons",c:"#1864ab"},place:{label:"Place words",c:"#862e9c"}},
/*@@H160@@*/
 witems:[
/*@@H161@@*/
 ],
 guideHTML:`
 <div class="panel" id="g-pron"><h3>🙋 Pronouns: I, me, my, it, they…</h3>
/*@@H162@@*/
 <div class="two" style="grid-template-columns:1fr 1fr">
  <div class="panel"><h3>🫥 Where did “it” go?</h3><ul class="gl">
/*@@H163@@*/
 </div>
 <div class="two" style="grid-template-columns:1fr 1fr">
  <div class="panel"><h3>🏷️ Possessives</h3><ul class="gl">
/*@@H164@@*/
  <div class="panel"><h3>🪞 Reflexive verbs</h3><ul class="gl">
/*@@H165@@*/
 </div>
 <div class="panel" id="g-qn"><h3>❓ Question words</h3>
/*@@H166@@*/
  <h3 style="margin-top:14px">🚫 Negatives</h3>
/*@@H167@@*/
 <div class="two" style="grid-template-columns:1fr 1fr" id="g-cmp">
  <div class="panel"><h3>📏 Comparisons</h3><ul class="gl">
/*@@H168@@*/
  <div class="panel"><h3>📍 Place words</h3>
/*@@H169@@*/
 </div>`,
 vx:{
/*@@H170@@*/
 },
/*@@H171@@*/
 mapEn:{go:n=>`Go straight ${["","one block","two blocks","three blocks"][n]}.`,right:"Turn right.",left:"Turn left.",final:s=>`The place is on the corner, on your ${s}.`},
/*@@H172@@*/
 phrases:[
/*@@H173@@*/
 ],
 idioms:[
/*@@H174@@*/
 ],
 stories:[
/*@@H175@@*/
 ]
};

/* =====================================================================
   v16 · GRAMMAR TAB · NEW VOCAB TOPICS · MAP & FAMILY DIAGRAMS ·
         PHRASES & IDIOMS · NEW STORIES
   ===================================================================== */
const U16=G16.ui;
/* ---------- nav: Articles & Connectors → Grammar ---------- */
(function(){ const b=document.querySelector('nav [data-m="words"]'); if(!b) return;
  b.dataset.full="🧩 Grammar"; NAV_SHORT.words="Grammar"; fitNav(); })();

/* ---------- 1 · GRAMMAR: new groups, items, guide sections ---------- */
Object.assign(WGROUPS,G16.wgroups);
G16.witems.forEach(([s,a,en,g,opts])=>WITEMS.push({id:WITEMS.length,s,a,en,g,opts}));
(function(){ const rw=LS.get(LKEY("wset"),{}), all=Object.keys(WGROUPS);
  let k=Array.isArray(rw.cats)?rw.cats.filter(x=>WGROUPS[x]):all;
  if(!rw.v16) k=[...new Set([...k,...Object.keys(G16.wgroups)])];
  WSET.cats=k.length?k:all; WSET.v16=1; })();
WSET.cats=WSET.cats.filter(k=>WGROUPS[k]);
const _why16=whyOf;
whyOf=function(it){ if(G16.wgroups[it.g]) return `<b>${it.a}</b> · ${G16.winfo[it.a]||G16.gexpl[it.g]}`; return _why16(it); };
const _rg16=renderGuide;
renderGuide=function(){
  _rg16();
  const body=$("wBody"), kids=[...body.children];
  if(kids[0]) kids[0].id="g-art";
  const conn=[...body.querySelectorAll(".panel")].find(p=>/Connectors/.test((p.querySelector("h3")||{}).textContent||""));
  if(conn) conn.id="g-conn";
  body.lastElementChild.insertAdjacentHTML("beforebegin",G16.guideHTML);
  const nav=[["g-art","🔤 Articles"],["g-pron","🙋 Pronouns"],["g-conn","🧵 Connectors"],["g-qn","❓ Questions & negatives"],["g-cmp","📏 Compare & place"]];
  body.insertAdjacentHTML("afterbegin",`<div class="gnav">${nav.map(([id,l])=>`<button data-g="${id}">${l}</button>`).join("")}</div>`);
  body.querySelectorAll(".gnav button").forEach(b=>b.onclick=()=>{const t=$(b.dataset.g); if(t) t.scrollIntoView({behavior:"smooth",block:"start"});});
  body.querySelectorAll("[data-say]").forEach(x=>x.onclick=()=>sayAlways(x.dataset.say));
};

/* ---------- 2 · VOCAB: weather · directions · family (+ phrases & idioms for Match) ---------- */
const OLD_VX=VX_KEYS.length, OLD_VM=VM_CATS.length;
Object.assign(VX_TOPICS,{weather:{label:"Weather",ic:"🌦️"},dir:{label:"Directions",ic:"🧭"},family:{label:"Family",ic:"👨‍👩‍👧"},
  phrase:{label:"Phrases",ic:"💬"},idiom:{label:"Idioms",ic:"🦜"},map:{label:"Map quiz",ic:"🗺️"},ftree:{label:"Family tree",ic:"🌳"}});
["weather","dir","family"].forEach(k=>{ VX_KEYS.push(k); VX[k]=G16.vx[k].map(([pt,en,note,sy])=>({t:k,pt,en,note:note||"",say:sy||pt})); });
VX.phrase=G16.phrases.flatMap(([cat,list])=>list.map(([pt,en,note])=>({t:"phrase",pt,en,note:note||"",say:pt,cat})));
VX.idiom=G16.idioms.map(([pt,lit,mean,eq,ex,exen])=>({t:"idiom",pt,en:mean,note:"≈ "+eq,say:pt,lit,eq,ex,exen}));
VM_CATS.splice(VM_CATS.indexOf("body"),0,"weather","dir","family","phrase","idiom");
/* earlier code filtered saved choices against the old key lists; re-read the raw saved values */
(function(){
  const rs=LS.get(LKEY("set"),{}), rv=LS.get(LKEY("vxset"),{});
  if(Array.isArray(rs.vcats)){ const k=rs.vcats.filter(x=>vmKnown(x)); SET.vcats=!rs.v16&&k.length>=OLD_VM?[...VM_CATS]:(k.length?k:[...VM_CATS]); }
  else SET.vcats=[...VM_CATS];
  if(Array.isArray(rv.topics)){ const k=rv.topics.filter(x=>vxKnown(x)); VXS.topics=!rv.v16&&k.length>=OLD_VX?[...VX_KEYS]:(k.length?k:[...VX_KEYS]); }
  else VXS.topics=[...VX_KEYS];
  SET.v16=1; VXS.v16=1; /* saved by v17 migration */
})();
/* temperature tool injected into the Weather section of Learn */
function g16Temp(sec){
  if(!sec||sec.querySelector(".temp-tool")) return;
  const host=sec.querySelector(".vx-in"); if(!host) return;
  host.insertAdjacentHTML("afterbegin",`<div class="vx-tool temp-tool"><input type="number" id="tIn" value="30" step="1" inputmode="numeric" aria-label="Temperature">
    <div class="seg" id="tUnit"><button data-u="C" class="on">°C</button><button data-u="F">°F</button></div>
    <div class="vx-out"><span id="tP"></span><div class="clk-en" id="tE"></div></div><button class="spk2" id="tSay" title="Hear it">🔊</button></div>
    <p class="vx-tip">${U16.tempTip}</p>`);
  let unit="C";
  const run=speak=>{ const v=parseFloat($("tIn").value); if(isNaN(v)) return;
    const c=unit==="C"?Math.round(v):Math.round((v-32)*5/9), f=unit==="F"?Math.round(v):Math.round(v*9/5+32);
    const p=G16.tempPhrase(c), fe=G16.feel(c);
    $("tP").textContent=p+"."; $("tE").textContent=`${c} °C = ${f} °F${fe?` · ${fe[0]} (${fe[1]})`:""}`; if(speak) sayAlways(p+(fe?". "+fe[0]:"")); };
  $("tIn").oninput=()=>run(false); $("tIn").onchange=()=>run(true);
  $("tUnit").querySelectorAll("button").forEach(b=>b.onclick=()=>{unit=b.dataset.u;$("tUnit").querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b));
    $("tIn").value=unit==="F"?86:30; run(true);});
  $("tSay").onclick=()=>sayAlways($("tP").textContent);
  run(false);
}
new MutationObserver(()=>{ const s=[...document.querySelectorAll("#vocabView details.vx-sec")].find(d=>/^🌦️/.test(d.querySelector("summary").textContent.trim())); if(s) g16Temp(s); })
  .observe($("vocabView"),{childList:true,subtree:true});

/* ---------- 3 · VOCAB sub-tabs: 🗺️ Map and 🌳 Family tree ---------- */
let MQ=null, FQ=null, mSel=null, fSel=null;
if(!VXS.mmode) VXS.mmode="explore"; if(!VXS.fmode) VXS.fmode="explore"; if(VXS.flabels==null) VXS.flabels=true; if(VXS.mlabels==null) VXS.mlabels=true;
const _rv16=renderVocab;
renderVocab=function(){
  const xs=VXS.xsub;
  if(xs){ const keep=VXS.sub; VXS.sub="learn"; _rv16(); VXS.sub=keep; } else _rv16();
  const seg=$("vxSub");
  seg.insertAdjacentHTML("beforeend",`<button data-s="map">🗺️ Map</button><button data-s="ftree">🌳 Family</button>`);
  seg.querySelectorAll("button").forEach(b=>{ b.classList.toggle("on",xs?b.dataset.s===xs:b.dataset.s===VXS.sub);
    b.onclick=()=>{ const s=b.dataset.s; if(s==="map"||s==="ftree"){VXS.xsub=s;MQ=null;FQ=null;} else {VXS.xsub=null;VXS.sub=s;if(s==="stories")STV.open=null;} saveVX(); renderVocab(); }; });
  if(!xs) return;
  const isMap=xs==="map", qmode=isMap?VXS.mmode:VXS.fmode;
  $("vxSum").innerHTML=`<b>${isMap?"🗺️ Map":"🌳 Family tree"}</b> · ${qmode==="quiz"?"Quiz":"Explore"} · ${VX_DIRL[VXS.dir]} · ${VXS.len} Qs`;
  const ab=$("vxSetToggle").parentElement; [...ab.children].forEach(c=>{ if(c.id!=="vxSetToggle") c.remove(); });
  ab.insertAdjacentHTML("beforeend",`<button class="btn go ab ${qmode!=="quiz"?"hidden":""}" id="vxNew16">↻ New</button>`);
  $("vxNew16").onclick=()=>{ if(isMap) MQ=null; else FQ=null; isMap?renderMap():renderTree(); };
  $("vxSetPanel").innerHTML=`<div class="sp-row"><span class="ctl-lbl">Quiz</span>
     <div class="seg" id="vxDir16">${Object.entries(VX_DIRL).map(([k,l])=>`<button data-v="${k}" class="${VXS.dir===k?"on":""}">${l}</button>`).join("")}</div>
     <label>Questions <select id="vxLen16">${[6,8,10,15,20].map(n=>`<option ${n===VXS.len?"selected":""}>${n}</option>`).join("")}</select></label></div>
     <div class="lvdesc">${isMap?U16.mapDesc:U16.treeDesc}</div>`;
  $("vxSetPanel").querySelectorAll("#vxDir16 button").forEach(b=>b.onclick=()=>{VXS.dir=b.dataset.v;saveVX();MQ=null;FQ=null;renderVocab()});
  $("vxLen16").onchange=()=>{VXS.len=+$("vxLen16").value;saveVX();MQ=null;FQ=null;renderVocab()};
  isMap?renderMap():renderTree();
};
function g16Result(host,Q,kind,again,retry){
  const total=Q.n, right=Q.right, acc=Math.round(right/Math.max(1,total)*100);
  ST.rounds.push({d:Date.now(),m:kind,n:total,x:total-right,s:0,a:acc}); ST.rounds=ST.rounds.slice(-60); LS.set(LKEY("stats"),ST);
  if(acc===100){win();confetti();}
  const seen=new Set(), wr=Q.wrong.filter(w=>!seen.has(w.pt)&&seen.add(w.pt));
  host.innerHTML=`<div class="panel" style="text-align:center;box-shadow:none">
    <h2 style="margin:0;color:var(--green);font-size:30px">${acc===100?U16.res[0]:acc>=75?U16.res[1]:U16.res[2]}</h2>
    <div class="sum"><div><b>${right}/${total}</b><span>Correct</span></div><div><b>${acc}%</b><span>Accuracy</span></div><div><b>${score}</b><span>Score</span></div></div>
    ${wr.length?`<div class="review">${wr.map(w=>`<div><span>❌ <b class="hl">${w.pt}</b></span><span class="gn">${w.en}</span></div>`).join("")}</div>`:`<p class="gn">No mistakes this round!</p>`}
    <div style="margin-top:16px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
      ${wr.length&&retry?`<button class="btn alt" id="g16Retry">Retry my misses</button>`:""}<button class="btn go" id="g16Again">${U16.nextRound}</button></div></div>`;
  $("g16Again").onclick=again; if($("g16Retry")) $("g16Retry").onclick=()=>retry(wr);
}
/* ---- 🗺️ Map ---- */
const LM=G16.landmarks; // [word, english, emoji]
const MX=x=>40+x*80, MY=y=>360-y*80;
const HD=[[0,1],[1,0],[0,-1],[-1,0]]; // N E S W
function frontBlock(x,y,h,side){ // side: "right" | "left"
  const t={0:{right:[x,y],left:[x-1,y]},1:{right:[x,y-1],left:[x,y]},2:{right:[x-1,y-1],left:[x,y-1]},3:{right:[x-1,y],left:[x-1,y-1]}}[h][side];
  return t[0]>=0&&t[0]<4&&t[1]>=0&&t[1]<4?(3-t[1])*4+t[0]:-1;
}
function genRoute(){
  for(let tries=0;tries<500;tries++){
    let x=2,y=0,h=0; const steps=[], path=[[x,y]]; const segs=1+rint(3); let ok=true;
    for(let s=0;s<segs;s++){
      if(s>0){ const turn=rnd(["right","left"]); h=(h+(turn==="right"?1:3))%4; steps.push({t:turn}); }
      const n=1+rint(3), nx=x+HD[h][0]*n, ny=y+HD[h][1]*n;
      if(nx<0||nx>4||ny<0||ny>4){ok=false;break;}
      x=nx;y=ny; steps.push({t:"go",n}); path.push([x,y]);
    }
    if(!ok) continue;
    const side=rnd(["right","left"]), target=frontBlock(x,y,h,side);
    if(target<0) continue;
    return {steps,side,target,path,end:[x,y,h]};
  }
}
function routeText(r,en){ const T=en?G16.mapEn:G16.mapTxt;
  return r.steps.map(s=>s.t==="go"?T.go(s.n):T[s.t]).concat(T.final(r.side)).join(" "); }
function renderMap(){
  const a=$("vxArea"), quiz=VXS.mmode==="quiz";
  if(quiz&&!MQ) MQ={i:0,n:VXS.len,right:0,wrong:[],streak:0,r:genRoute(),answered:false};
  const lab=VXS.mlabels&&!quiz;
  const blocks=LM.map(([w,en,e],i)=>{const bx=i%4, by=3-Math.floor(i/4), x=MX(bx)+10, y=MY(by+1)+10;
    return `<g class="mb" data-i="${i}"><rect x="${x}" y="${y}" width="60" height="60" rx="9"/><text class="me" x="${x+30}" y="${y+(lab?30:36)}">${e}</text>${lab?`<text class="ml" x="${x+30}" y="${y+52}">${w.replace(/^(o|a|os|as|el|la|los|las) /,"")}</text>`:""}</g>`}).join("");
  const streets=[0,1,2,3,4].map(i=>`<line x1="${MX(i)}" y1="${MY(0)}" x2="${MX(i)}" y2="${MY(4)}"/><line x1="${MX(0)}" y1="${MY(i)}" x2="${MX(4)}" y2="${MY(i)}"/>`).join("");
  a.innerHTML=`<div class="body-wrap">
    <div class="body-stage" id="mStage">
      <div class="body-top">
        <div class="seg" id="mMode"><button data-v="explore" class="${!quiz?"on":""}">👆 Explore</button><button data-v="quiz" class="${quiz?"on":""}">🎯 Quiz</button></div>
        <button class="toggle ${VXS.mlabels?"on":""}" id="mLabels" style="${quiz?"display:none":""}">🏷️ Labels</button>
        <span class="gn">${U16.mapStart}</span>
      </div>
      <div id="mPrompt"></div>
      <svg id="mapSvg" class="map-svg" viewBox="0 0 400 400" role="img" aria-label="Street map">
        <rect x="0" y="0" width="400" height="400" rx="16" class="mbg"/>
        <g class="mst">${streets}</g><g class="mcl">${streets}</g>
        ${blocks}
        <g id="mPath"></g>
        <g class="mstart" transform="translate(${MX(2)},${MY(0)})"><circle r="13"/><path d="M0,-8 L6,5 L0,2 L-6,5 Z"/></g>
        <text class="mnorth" x="372" y="30">N ↑</text>
      </svg>
      <div id="mInfo" class="pinfo ${quiz?"hidden":""}"><span class="sm">👆 ${U16.mapTapHint}</span></div>
    </div>
    <div class="plist ${quiz?"hidden":""}" id="mList"><h4>🏙️ ${LM.length} places</h4>
      ${LM.map(([w,en,e],i)=>`<button class="pi" data-i="${i}"><span class="num nb">${e}</span><b>${w}</b><span class="en">${en}</span></button>`).join("")}</div>
  </div>`;
  if(quiz) a.querySelector(".body-wrap").style.gridTemplateColumns="1fr";
  a.querySelectorAll("#mMode button").forEach(b=>b.onclick=()=>{VXS.mmode=b.dataset.v;MQ=null;mSel=null;saveVX();renderVocab()});
  $("mLabels").onclick=()=>{VXS.mlabels=!VXS.mlabels;saveVX();renderMap()};
  $("mapSvg").addEventListener("click",e=>{const g=e.target.closest(".mb"); if(!g) return; quiz?mAnswer(+g.dataset.i):mSelect(+g.dataset.i)});
  a.querySelectorAll("#mList .pi").forEach(b=>b.onclick=()=>mSelect(+b.dataset.i));
  if(quiz){ if(MQ.i>=MQ.n) g16Result($("mStage"),MQ,"vmap",()=>{MQ=null;renderMap()},null); else mShowQ(); }
  else if(mSel!=null) mSelect(mSel,true);
}
function mSelect(i,silent){
  mSel=i; const [w,en,e]=LM[i];
  $("mapSvg").querySelectorAll(".mb").forEach(g=>g.classList.toggle("hi",+g.dataset.i===i));
  document.querySelectorAll("#mList .pi").forEach(b=>b.classList.toggle("on",+b.dataset.i===i));
  $("mInfo").innerHTML=`<button class="spk" id="mSay" title="Hear it">🔊</button><div><div class="big">${e} ${w}</div><div class="sm">${en} · ${genderOf(w)}</div></div>`;
  $("mSay").onclick=()=>sayAlways(w); if(!silent) sayAlways(w);
}
function mShowQ(){
  const r=MQ.r, txt=routeText(r,false), en=routeText(r,true), lis=VXS.dir==="listen";
  $("mPrompt").innerHTML=`<div class="bprompt mq"><div class="mq-txt">${lis?`🎧 ${U16.listenDir}`:`<b class="mq-pt">${txt}</b>${VXS.dir==="en"?`<div class="gn">${en}</div>`:""}`}</div>
    <span class="gn">${MQ.i+1} / ${MQ.n} · ✅ ${MQ.right} · 🔥 ${MQ.streak}</span><button class="spk" id="mqSay" title="Hear the directions">🔊</button></div>`;
  $("mqSay").onclick=()=>sayAlways(txt);
  if(lis) setTimeout(()=>sayAlways(txt),250);
  MQ.answered=false;
}
function mDrawPath(r){
  const pts=r.path.map(([x,y])=>`${MX(x)},${MY(y)}`).join(" ");
  $("mPath").innerHTML=`<polyline points="${pts}" class="mroute"/><circle cx="${MX(r.end[0])}" cy="${MY(r.end[1])}" r="7" class="mend"/>`;
}
function mAnswer(i){
  if(!MQ||MQ.answered) return; MQ.answered=true;
  const r=MQ.r, ok=i===r.target, [w,en]=LM[r.target], txt=routeText(r,false), ten=routeText(r,true);
  mDrawPath(r);
  $("mapSvg").querySelectorAll(".mb").forEach(g=>{const k=+g.dataset.i; g.classList.toggle("ok",k===r.target&&ok); g.classList.toggle("hi",k===r.target&&!ok); g.classList.toggle("bad",k===i&&!ok);});
  vxrec("map",w,en,ok);
  if(ok){MQ.right++;MQ.streak++;good();score+=12;} else {MQ.streak=0;bad();MQ.wrong.push({pt:w,en});}
  if(score>best){best=score;LS.set(LKEY("best"),best)}
  sayAlways(w);
  $("mPrompt").innerHTML=`<div class="bprompt ${ok?"ok":"bad"} mq"><div class="mq-txt">${ok?`✅ ${U16.correct}`:`❌ ${U16.itWas}`} <b>${w}</b> (${en})
     <div class="gn" style="margin-top:4px">${txt}<br><i>${ten}</i></div></div>
     <button class="btn go sm" id="mqNext">Next ➜</button></div>`;
  $("mqNext").onclick=()=>{ MQ.i++; MQ.r=genRoute(); renderMap(); };
}
/* ---- 🌳 Family tree ---- */
const FT=G16.ftree; // key → [word, english, emoji, x, y]
const FT_K=Object.keys(FT);
const FT_LINKS=[["avo","avoa",["tio","pai"]],["tio","tia",["primo","prima"]],["pai","mae",["irmao","irma","eu"]],["sogro","sogra",["esposa","cunhado"]],["eu","esposa",["filho","filha"]],["irmao",null,["sobrinho"]],["irma",null,["sobrinha"]]];
function treeSVG(quiz){
  const P=k=>FT[k];
  let lines="";
  FT_LINKS.forEach(([a,b,kids])=>{ const A=P(a), B=b&&P(b); const mx=B?(A[3]+B[3])/2:A[3], y=A[4];
    if(B) lines+=`<line x1="${A[3]+22}" y1="${y}" x2="${B[3]-22}" y2="${y}" class="fcouple"/>`;
    const ky=P(kids[0])[4], bar=y+(ky-y)/2+(B?0:4);
    const xs=kids.map(k=>P(k)[3]).concat(mx);
    lines+=`<path d="M${mx},${B?y:y+24} V${bar} M${Math.min(...xs)},${bar} H${Math.max(...xs)} ${kids.map(k=>`M${P(k)[3]},${bar} V${P(k)[4]-24}`).join(" ")}" class="flink"/>`; });
  const nodes=FT_K.map(k=>{const [w,en,e,x,y]=FT[k], me=k==="eu";
    const lbl=me?U16.me:(VXS.flabels&&!quiz?w.replace(/^(o|a|os|as|el|la|los|las) /,""):"?");
    return `<g class="fn ${me?"me":""}" data-k="${k}"><circle cx="${x}" cy="${y}" r="23"/><text class="fe" x="${x}" y="${y+1}">${e}</text><text class="fl" x="${x}" y="${y+38}">${lbl}</text></g>`}).join("");
  return `<svg id="treeSvg" class="tree-svg" viewBox="0 0 660 430" role="img" aria-label="Family tree">${lines}${nodes}</svg>`;
}
function renderTree(){
  const a=$("vxArea"), quiz=VXS.fmode==="quiz";
  if(quiz&&!FQ) FQ={i:0,n:VXS.len,right:0,wrong:[],streak:0,items:shuffle(FT_K.filter(k=>k!=="eu")).concat(shuffle(FT_K.filter(k=>k!=="eu"))).slice(0,VXS.len),answered:false};
  a.innerHTML=`<div class="body-wrap">
    <div class="body-stage" id="fStage">
      <div class="body-top">
        <div class="seg" id="fMode"><button data-v="explore" class="${!quiz?"on":""}">👆 Explore</button><button data-v="quiz" class="${quiz?"on":""}">🎯 Quiz</button></div>
        <button class="toggle ${VXS.flabels?"on":""}" id="fLabels" style="${quiz?"display:none":""}">🏷️ Labels</button>
      </div>
      <div id="fPrompt"></div>
      ${treeSVG(quiz)}
      <div id="fInfo" class="pinfo ${quiz?"hidden":""}"><span class="sm">👆 ${U16.treeTapHint}</span></div>
    </div>
    <div class="plist ${quiz?"hidden":""}" id="fList"><h4>🌳 ${FT_K.length-1} relatives</h4>
      ${FT_K.filter(k=>k!=="eu").map(k=>`<button class="pi" data-k="${k}"><span class="num nb">${FT[k][2]}</span><b>${FT[k][0]}</b><span class="en">${FT[k][1].split(" (")[0]}</span></button>`).join("")}</div>
  </div>`;
  if(quiz) a.querySelector(".body-wrap").style.gridTemplateColumns="1fr";
  a.querySelectorAll("#fMode button").forEach(b=>b.onclick=()=>{VXS.fmode=b.dataset.v;FQ=null;fSel=null;saveVX();renderVocab()});
  $("fLabels").onclick=()=>{VXS.flabels=!VXS.flabels;saveVX();renderTree()};
  $("treeSvg").addEventListener("click",e=>{const g=e.target.closest(".fn"); if(!g||g.dataset.k==="eu") return; quiz?fAnswer(g.dataset.k):fSelect(g.dataset.k)});
  a.querySelectorAll("#fList .pi").forEach(b=>b.onclick=()=>fSelect(b.dataset.k));
  if(quiz){ if(FQ.i>=FQ.n) g16Result($("fStage"),FQ,"vtree",()=>{FQ=null;renderTree()},null); else fShowQ(); }
  else if(fSel) fSelect(fSel,true);
}
function fMark(k,cls){ const g=$("treeSvg").querySelector(`.fn[data-k="${k}"]`); if(g) g.classList.add(cls); }
function fSelect(k,silent){
  fSel=k; const [w,en,e]=FT[k];
  $("treeSvg").querySelectorAll(".fn").forEach(g=>g.classList.toggle("hi",g.dataset.k===k));
  document.querySelectorAll("#fList .pi").forEach(b=>b.classList.toggle("on",b.dataset.k===k));
  $("fInfo").innerHTML=`<button class="spk" id="fSay" title="Hear it">🔊</button><div><div class="big">${e} ${w}</div><div class="sm">${en} · ${genderOf(w)}</div></div>`;
  $("fSay").onclick=()=>sayAlways(w); if(!silent) sayAlways(w);
}
function fShowQ(){
  const k=FQ.items[FQ.i], [w,en]=FT[k];
  const label=VXS.dir==="en"?`your ${en}`:VXS.dir==="listen"?"":w;
  $("fPrompt").innerHTML=`<div class="bprompt"><span>${VXS.dir==="listen"?"🎧 Tap who you hear":`${U16.tap}: <b>${label}</b>`}</span>
    <span class="gn">${FQ.i+1} / ${FQ.n} · ✅ ${FQ.right} · 🔥 ${FQ.streak}</span><button class="spk" id="fqSay" title="Hear it">🔊</button></div>`;
  $("fqSay").onclick=()=>sayAlways(w); if(VXS.dir==="listen") setTimeout(()=>sayAlways(w),250);
  FQ.answered=false;
}
function fAnswer(k){
  if(!FQ||FQ.answered) return; FQ.answered=true;
  const t=FQ.items[FQ.i], [w,en]=FT[t], ok=k===t, [tw,ten]=FT[k];
  vxrec("ftree",w,en,ok);
  if(ok){ FQ.right++;FQ.streak++;good();score+=12;fMark(t,"ok");
    $("fPrompt").innerHTML=`<div class="bprompt ok"><span>✅ ${U16.correct} <b>${w}</b> = ${en}</span></div>`; setTimeout(fNext,1000); }
  else { FQ.streak=0;bad();FQ.wrong.push({pt:w,en});fMark(k,"bad");fMark(t,"hi");
    $("fPrompt").innerHTML=`<div class="bprompt bad"><span>❌ That's <b style="font-size:16px">${tw}</b> (${ten}). <b>${w}</b> (${en}) is in yellow.</span><button class="btn go sm" id="fqNext">Next ➜</button></div>`;
    $("fqNext").onclick=fNext; }
  sayAlways(w);
  if(score>best){best=score;LS.set(LKEY("best"),best)}
}
function fNext(){ if(!FQ) return; FQ.i++; renderTree(); }
MODE_LBL.vmap="🗺️ Map quiz"; MODE_LBL.vtree="🌳 Family quiz";

/* ---------- 4 · Gírias/Jerga tab: 😎 Slang · 💬 Phrases · 🦜 Idioms ---------- */
let PQ16="";
const _rsl16=renderSlang;
renderSlang=function(){
  const sub=SSET.sub||"slang";
  if(sub==="slang") _rsl16(); else renderPhr(sub);
  $("slangView").insertAdjacentHTML("afterbegin",`<div class="controls"><div class="seg full" id="slSub">
    <button data-s="slang" class="${sub==="slang"?"on":""}">😎 ${U16.slangTab}</button><button data-s="phrases" class="${sub==="phrases"?"on":""}">💬 Phrases</button><button data-s="idioms" class="${sub==="idioms"?"on":""}">🦜 Idioms</button></div></div>`);
  $("slSub").querySelectorAll("button").forEach(b=>b.onclick=()=>{SSET.sub=b.dataset.s;saveS();PQ16="";renderSlang();});
};
function renderPhr(sub){
  const v=$("slangView"), isP=sub==="phrases";
  const total=isP?VX.phrase.length:VX.idiom.length;
  v.innerHTML=`<div class="slang-hero"><div><h2>${isP?"💬 "+U16.phrHead:"🦜 "+U16.idHead}</h2><p>${isP?U16.phrSub:U16.idSub}</p></div>
      <div class="sh-stats"><div><b>${total}</b><span>${isP?"phrases":"idioms"}</span></div><button class="btn alt" id="phrMatch">🎯 Match these</button></div></div>
    <div class="controls searchbar"><input type="search" id="phrQ" placeholder="🔍 Search ${LNAME} or English…" value="${PQ16.replace(/"/g,"&quot;")}" style="flex:1;min-width:160px" autocomplete="off"></div>
    <div id="phrBody"></div>`;
  const draw=()=>{ const q=norm(PQ16.trim());
    if(isP){
      const html=G16.phrases.map(([cat,list])=>{const rows=list.filter(([pt,en,n])=>!q||norm(pt+" "+en+" "+(n||"")).includes(q));
        return rows.length?`<details class="fold vx-sec" open><summary>${cat}<span class="gn">${rows.length}</span></summary><div class="vx-in"><div class="vx-grid">${rows.map(([pt,en,n])=>
          `<button class="vx-it" data-say="${pt.replace(/"/g,"&quot;")}"><b>${pt}</b><span>${en}</span>${n?`<i>💡 ${n}</i>`:""}</button>`).join("")}</div></div></details>`:""}).join("");
      $("phrBody").innerHTML=html||`<div class="panel empty">No phrases match “${PQ16.replace(/</g,"&lt;")}”.</div>`;
    } else {
      const rows=VX.idiom.filter(x=>!q||norm([x.pt,x.lit,x.en,x.eq,x.ex,x.exen].join(" ")).includes(q));
      $("phrBody").innerHTML=rows.length?`<div class="id-grid">${rows.map(x=>`<div class="id-card">
        <div class="id-top"><b>${x.pt}</b><button class="spk2" data-say="${(x.pt+". "+x.ex).replace(/"/g,"&quot;")}" title="Hear it">🔊</button></div>
        <div class="id-row"><span>Literally</span>${x.lit}</div><div class="id-row"><span>Means</span>${x.en}</div><div class="id-row"><span>≈ English</span><b>${x.eq}</b></div>
        <div class="id-ex"><i>${x.ex}</i><div class="gn">${x.exen}</div></div></div>`).join("")}</div>`:`<div class="panel empty">No idioms match “${PQ16.replace(/</g,"&lt;")}”.</div>`;
    }
    v.querySelectorAll("[data-say]").forEach(b=>b.onclick=()=>{sayAlways(b.dataset.say);b.classList.add("playing");setTimeout(()=>b.classList.remove("playing"),700)});
  };
  $("phrQ").oninput=()=>{PQ16=$("phrQ").value;draw()};
  $("phrMatch").onclick=()=>{SET.fmt="vocab";SET.vcats=[isP?"phrase":"idiom"];saveSet();setMode("play");toast(`🎯 Vocab match: ${isP?"Phrases":"Idioms"}`)};
  draw();
}

/* ---------- 5 · New stories ---------- */
G16.stories.forEach(s=>STORIES.push(Object.assign(s,{id:STORIES.length})));

/* ---------- refresh ---------- */
renderCtrls(); updSummary();
if(mode==="words") renderWords(); if(mode==="vocab") renderVocab(); if(mode==="slang") renderSlang();

/*@@H176@@*/
const G17={
/*@@H177@@*/
   sbHint:"Tap the words in order to rebuild the sentence.",sbEmpty:"Tap the words below…",quizMe:"🎯 Quiz me",
/*@@H178@@*/
 vx:{
/*@@H179@@*/
 },
/*@@H180@@*/
 witems:[
/*@@H181@@*/
 ],
 guideHTML:`
 <div class="panel" id="g-se"><h3>⚖️ Ser vs estar <span class="spacer"></span><button class="btn alt sm" data-quiz="serestar">🎯 Quiz me</button></h3>
  <div class="two" style="grid-template-columns:1fr 1fr;gap:10px">
   <div class="sx-card ser"><b>SER</b> · what something <i>is</i><ul class="gl">
/*@@H182@@*/
   <div class="sx-card est"><b>ESTAR</b> · how or where something <i>is</i> now<ul class="gl">
/*@@H183@@*/
  </div>
  <div class="rules" style="margin-top:10px">
/*@@H184@@*/
  </div></div>
 <div class="panel" id="g-past"><h3>⏳ Past tense showdown <span class="spacer"></span><button class="btn alt sm" data-quiz="past">🎯 Quiz me</button></h3>
  <div class="two" style="grid-template-columns:1fr 1fr;gap:10px">
/*@@H185@@*/
  </div>
/*@@H186@@*/
};

/* =====================================================================
   v17 · SENTENCE BUILDER · ODD ONE OUT · 7 VOCAB TOPICS ·
         SER vs ESTAR · PAST SHOWDOWN · XP, LEVELS & BADGES
   ===================================================================== */
const U17=G17.ui;
ST.sb=ST.sb||{r:0,w:0}; ST.odd=ST.odd||{r:0,w:0};

/* ---------- 1 · seven new vocab topics ---------- */
const NEW17=["food","feel","clothes","work","health","animals","colors"];
const OLD17_VX=VX_KEYS.length, OLD17_VM=VM_CATS.length;
Object.assign(VX_TOPICS,{food:{label:"Food & drinks",ic:"🍽️"},feel:{label:"Feelings & personality",ic:"😊"},clothes:{label:"Clothes",ic:"👕"},
  work:{label:"Work & office",ic:"💼"},health:{label:"Health & doctor",ic:"🩺"},animals:{label:"Animals",ic:"🐾"},colors:{label:"Colors & adjectives",ic:"🎨"},
  odd:{label:"Odd one out",ic:"🕵️"},sbuild:{label:"Sentence builder",ic:"🧱"}});
NEW17.forEach(k=>{ VX_KEYS.push(k); VX[k]=G17.vx[k].map(([pt,en,note,sy])=>({t:k,pt,en,note:note||"",say:sy||pt})); });
VM_CATS.splice(VM_CATS.indexOf("phrase"),0,...NEW17);
(function(){
  const rs=LS.get(LKEY("set"),{}), rv=LS.get(LKEY("vxset"),{});
  const kv=(Array.isArray(rs.vcats)?rs.vcats:[]).filter(x=>vmKnown(x));
  SET.vcats=(!rs.v17&&(!kv.length||kv.length>=OLD17_VM))?[...VM_CATS]:(kv.length?kv:[...VM_CATS]);
  const kt=(Array.isArray(rv.topics)?rv.topics:[]).filter(x=>vxKnown(x));
  VXS.topics=(!rv.v17&&(!kt.length||kt.length>=OLD17_VX))?[...VX_KEYS]:(kt.length?kt:[...VX_KEYS]);
  SET.v17=1; VXS.v17=1; saveSet(); saveVX();
})();

/* ---------- 2 · ser vs estar + past showdown (guide + quiz) ---------- */
Object.assign(WGROUPS,G17.wgroups);
G17.witems.forEach(([s,a,en,g,opts,why])=>WITEMS.push({id:WITEMS.length,s,a,en,g,opts,why}));
(function(){ const rw=LS.get(LKEY("wset"),{});
  const raw=(Array.isArray(rw.cats)?rw.cats:[]).filter(k=>WGROUPS[k]);
  if(raw.length) WSET.cats=raw;
  if(!rw.v17) WSET.cats=[...new Set([...WSET.cats,...Object.keys(G17.wgroups)])];
  WSET.cats=WSET.cats.filter(k=>WGROUPS[k]); if(!WSET.cats.length) WSET.cats=Object.keys(WGROUPS);
  WSET.v17=1; saveW(); })();
const _why17=whyOf;
whyOf=function(it){ return it.why?`<b>${it.a}</b> · ${it.why}`:_why17(it); };
const _rg17=renderGuide;
renderGuide=function(){
  _rg17();
  const body=$("wBody");
  body.lastElementChild.insertAdjacentHTML("beforebegin",G17.guideHTML);
  const nav=body.querySelector(".gnav");
  if(nav){ nav.insertAdjacentHTML("beforeend",`<button data-g="g-se">⚖️ Ser vs estar</button><button data-g="g-past">⏳ Past tenses</button>`);
    nav.querySelectorAll("button").forEach(b=>b.onclick=()=>{const t=$(b.dataset.g); if(t) t.scrollIntoView({behavior:"smooth",block:"start"});}); }
  body.querySelectorAll("[data-quiz]").forEach(b=>b.onclick=()=>quizOnly(b.dataset.quiz));
};
function quizOnly(g){
  const keep=[...WSET.cats]; WSET.cats=[g]; WSET.sub="fill"; WSET.type=false;
  renderWords(); WSET.cats=keep; saveW();
  scrollTo({top:0,behavior:"smooth"}); toast(`🎯 ${WGROUPS[g].label} quiz`);
}

/* ---------- 3 · 🧱 Sentence Builder (Grammar tab) ---------- */
let SBS=Object.assign({lv:"all",len:8},LS.get(LKEY("sbset"),{}));
const saveSB=()=>LS.set(LKEY("sbset"),SBS);
let SB=null;
function sbPool(){
  const out=[], seen=new Set();
  STORIES.forEach(s=>{ if(SBS.lv!=="all"&&s.lv!==SBS.lv) return;
    s.l.forEach(([pt,en])=>{
      let t=plainLine(pt).replace(/^[—–\-]\s*/,"").trim();
      if(/[—"“”«»…]/.test(t)) return;
      const toks=t.split(/\s+/);
      if(toks.length<4||toks.length>11||seen.has(t)) return;
      seen.add(t); out.push({pt:t,en,toks,lv:s.lv});
    }); });
  return out;
}
function sbShuffle(n,toks){
  const idx=[...Array(n).keys()];
  for(let k=0;k<12;k++){ shuffle(idx); if(idx.map(i=>toks[i]).join(" ")!==toks.join(" ")) break; }
  return idx;
}
function newSB(list){
  const items=list||shuffle(sbPool()).slice(0,SBS.len);
  if(!items.length){ $("wBody").innerHTML=`<div class="panel empty">No sentences at this level yet.</div>`; return; }
  SB={items,i:0,n:items.length,right:0,wrong:[],streak:0};
  sbShow();
}
function sbShow(){
  const it=SB.items[SB.i]; SB.order=sbShuffle(it.toks.length,it.toks); SB.placed=[]; SB.tries=0; SB.done=false; SB.missed=false;
  const L=STORY_LV[it.lv];
  $("wBody").innerHTML=`<div class="panel sb">
    <div class="qtop"><span class="tag" style="--c:${L.c}">${L.n}</span><span class="gn">${SB.i+1} / ${SB.n} · ✅ ${SB.right} · 🔥 ${SB.streak}</span></div>
    <div class="bar" style="margin:8px 0 14px"><i style="width:${Math.round(SB.i/SB.n*100)}%"></i></div>
    <div class="sb-en">🇺🇸 ${it.en}</div>
    <div class="sb-ans" id="sbAns"></div>
    <div class="sb-bank" id="sbBank"></div>
    <div class="ty-acts"><button class="btn ghost" id="sbHear">🔊 Hear it</button><button class="btn ghost" id="sbReset">↺ Reset</button>
      <button class="btn go" id="sbCheck" disabled>Check ✓</button><button class="btn ghost" id="sbSkip">Show answer</button></div>
    <div class="ty-fb" id="sbFb"><span class="gn">${U17.sbHint}</span></div></div>`;
  $("sbHear").onclick=()=>sayAlways(it.pt);
  $("sbReset").onclick=()=>{ if(SB.done) return; SB.placed=[]; sbDraw(); };
  $("sbCheck").onclick=()=>SB.done?sbNext():sbCheck();
  $("sbSkip").onclick=()=>{ if(!SB.done) sbReveal(false,true); };
  sbDraw();
}
function sbDraw(){
  const it=SB.items[SB.i];
  $("sbAns").innerHTML=SB.placed.length?SB.placed.map((k,p)=>`<button class="sbt in" data-p="${p}">${it.toks[k]}</button>`).join(""):`<span class="sb-ph">${U17.sbEmpty}</span>`;
  $("sbBank").innerHTML=SB.order.filter(k=>!SB.placed.includes(k)).map(k=>`<button class="sbt" data-k="${k}">${it.toks[k]}</button>`).join("");
  $("sbAns").querySelectorAll(".sbt").forEach(b=>b.onclick=()=>{ if(SB.done) return; SB.placed.splice(+b.dataset.p,1); sbDraw(); });
  $("sbBank").querySelectorAll(".sbt").forEach(b=>b.onclick=()=>{ if(SB.done) return; SB.placed.push(+b.dataset.k); tone(520,.05,"triangle"); sbDraw(); });
  $("sbCheck").disabled=!SB.done&&SB.placed.length<it.toks.length;
}
function sbCheck(){
  const it=SB.items[SB.i], guess=SB.placed.map(k=>it.toks[k]).join(" ");
  if(guess.toLowerCase()===it.pt.toLowerCase()) return sbReveal(true);
  SB.tries++; SB.missed=true; bad();
  $("sbAns").classList.remove("shake"); void $("sbAns").offsetWidth; $("sbAns").classList.add("shake");
  if(SB.tries<2){ $("sbFb").innerHTML=`<div class="fb-bad">❌ ${U17.tryAgain}</div>`;
    const firstBad=SB.placed.findIndex((k,p)=>it.toks[k]!==it.toks[p]);
    if(firstBad>=0){ const t=$("sbAns").querySelectorAll(".sbt")[firstBad]; if(t) t.classList.add("bad"); } }
  else sbReveal(false);
}
function sbReveal(ok,gaveUp){
  const it=SB.items[SB.i]; SB.done=true;
  if(ok&&!SB.missed){ SB.right++; SB.streak++; good(); score+=15+Math.min(SB.streak,10)*2; ST.sb.r++; bumpDay(); }
  else { SB.streak=0; if(ok) good(); ST.sb.w++; SB.wrong.push({pt:it.pt,en:it.en}); if(!ok) bad(); }
  if(score>best){best=score;LS.set(LKEY("best"),best)}
  LS.set(LKEY("stats"),ST);
  SB.placed=it.toks.map((_,i)=>i); SB.order=[]; sbDraw();
  $("sbAns").classList.add(ok?"ok":"rev");
  $("sbFb").innerHTML=ok?`<div class="fb-ok">✅ ${U17.correct}${SB.missed?" <span class='gn'>(on your second try)</span>":""}</div>`
    :`<div class="fb-bad">${gaveUp?"👀 Here it is:":"❌ The right order is:"}</div><div class="ans">${it.pt}</div>`;
  $("sbCheck").textContent=SB.i+1<SB.n?"Next ➜":"See results"; $("sbCheck").disabled=false;
  $("sbSkip").classList.add("hidden"); $("sbReset").classList.add("hidden");
  sayAlways(it.pt);
}
function sbNext(){ if(++SB.i<SB.n) sbShow(); else g16Result($("wBody").querySelector(".sb")||$("wBody"),SB,"sbuild",()=>newSB(),wr=>newSB(SB.items.filter(x=>wr.some(w=>w.pt===x.pt)))); }
document.addEventListener("keydown",e=>{
  if(mode!=="words"||WSET.sub!=="build"||!SB||/INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)) return;
  if(e.key==="Enter"&&$("sbCheck")&&!$("sbCheck").disabled){ e.preventDefault(); $("sbCheck").click(); }
  else if(e.key==="Backspace"&&!SB.done&&SB.placed.length){ e.preventDefault(); SB.placed.pop(); sbDraw(); }
});
const _rw17=renderWords;
renderWords=function(){
  const b=WSET.sub==="build";
  if(b){ WSET.sub="guide"; _rw17(); WSET.sub="build"; } else _rw17();
  const seg=$("wSub");
  seg.insertAdjacentHTML("beforeend",`<button data-s="build">🧱 Build</button>`);
  seg.querySelectorAll("button").forEach(x=>x.classList.toggle("on",x.dataset.s===WSET.sub));
  seg.querySelector('[data-s="build"]').onclick=()=>{WSET.sub="build";saveW();renderWords();};
  if(!b) return;
  WR=null;
  seg.parentElement.insertAdjacentHTML("beforeend",`<span class="spacer"></span><div class="chips" id="sbLv">
    <span class="chip ${SBS.lv==="all"?"on":""}" data-l="all" style="--c:var(--blue)">All levels</span>
    ${STORY_LV.map((l,i)=>`<span class="chip ${SBS.lv===i?"on":""}" data-l="${i}" style="--c:${l.c}">${l.n}</span>`).join("")}</div>
    <button class="btn go" id="sbNew">New round</button>`);
  $("sbLv").querySelectorAll(".chip").forEach(c=>c.onclick=()=>{SBS.lv=c.dataset.l==="all"?"all":+c.dataset.l;saveSB();renderWords();});
  $("sbNew").onclick=()=>newSB();
  newSB();
};

/* ---------- 4 · 🕵️ Odd One Out (Vocab tab) ---------- */
const ODD_CATS=["family","weather","house","city","food","feel","clothes","work","health","animals","colors","months","body"];
const ODD_CLASH=[["health","city"],["food","house"],["weather","colors"],["feel","colors"],["work","city"],["clothes","body"],["house","city"]];
const ART_ODD=LANGC==="es"?/^(el|la|los|las) /:/^(o|a|os|as) /;
function oddList(k){
  return vmList(k).filter(x=>!/[.?!/]/.test(x.pt)&&x.pt.split(" ").length<=3&&(k!=="family"||ART_ODD.test(x.pt)));
}
function oddRound(){
  for(let t=0;t<200;t++){
    const A=rnd(ODD_CATS), B=rnd(ODD_CATS);
    if(A===B||ODD_CLASH.some(([x,y])=>(x===A&&y===B)||(x===B&&y===A))) continue;
    const la=shuffle(oddList(A)), lb=oddList(B).filter(x=>!la.some(y=>y.pt===x.pt||y.en===x.en));
    if(la.length<3||!lb.length) continue;
    const three=[];
    for(const x of la){ if(three.length===3) break; if(!three.some(y=>y.en===x.en)) three.push(x); }
    if(three.length<3) continue;
    const odd=rnd(lb), cards=shuffle([...three.map(x=>({x,t:A})),{x:odd,t:B}]);
    return {cards,odd:cards.findIndex(c=>c.x===odd),A,B};
  }
}
let OQ=null;
function renderOdd(){
  const a=$("vxArea");
  if(!OQ) OQ={i:0,n:VXS.len,right:0,wrong:[],streak:0,r:oddRound(),answered:false};
  if(OQ.i>=OQ.n){ a.innerHTML=`<div class="body-stage" id="oStage"></div>`; g16Result($("oStage"),OQ,"vodd",()=>{OQ=null;renderOdd()},null); return; }
  const r=OQ.r;
  a.innerHTML=`<div class="body-stage odd" id="oStage">
    <div class="qtop"><span class="tag" style="--c:var(--blue)">🕵️ ${U17.oddQ}</span><span class="gn">${OQ.i+1} / ${OQ.n} · ✅ ${OQ.right} · 🔥 ${OQ.streak}</span></div>
    <p class="gn" style="margin:6px 0 10px">${U17.oddSub}</p>
    <div class="odd-grid">${r.cards.map((c,i)=>`<button class="odd-c" data-i="${i}"><small>${i+1}</small><b>${c.x.pt}</b><span class="odd-en"></span></button>`).join("")}</div>
    <div class="ty-acts"><button class="btn ghost" id="oHear">🔊 Hear all four</button></div>
    <div class="ty-fb" id="oFb"></div></div>`;
  a.querySelectorAll(".odd-c").forEach(b=>b.onclick=()=>oddAnswer(+b.dataset.i));
  $("oHear").onclick=()=>sayAlways(r.cards.map(c=>c.x.say||c.x.pt).join(". "));
  OQ.answered=false;
}
function oddAnswer(i){
  if(!OQ||OQ.answered) return; OQ.answered=true;
  const r=OQ.r, ok=i===r.odd, o=r.cards[r.odd].x, TA=VM_LBL(r.A), TB=VM_LBL(r.B);
  document.querySelectorAll(".odd-c").forEach((b,k)=>{ const c=r.cards[k];
    b.querySelector(".odd-en").textContent=`${c.x.en} · ${VM_LBL(c.t).ic}`;
    b.classList.add(k===r.odd?(ok?"ok":"hi"):(k===i?"bad":"dim")); b.disabled=true; });
  if(ok){ OQ.right++; OQ.streak++; good(); score+=12; ST.odd.r++; bumpDay(); }
  else { OQ.streak=0; bad(); ST.odd.w++; OQ.wrong.push({pt:o.pt,en:o.en}); }
  LS.set(LKEY("stats"),ST); if(score>best){best=score;LS.set(LKEY("best"),best)}
  sayAlways(o.say||o.pt);
  $("oFb").innerHTML=`<div class="${ok?"fb-ok":"fb-bad"}">${ok?"✅ "+U17.correct:"❌ Not quite."}</div>
    <div class="fb-why">Three are <b>${TA.ic} ${TA.label}</b> · <b class="hl">${o.pt}</b> is <b>${TB.ic} ${TB.label}</b></div>
    <button class="btn go" id="oNext">${OQ.i+1<OQ.n?"Next ➜":"See results"}</button> <span class="gn">or press Enter</span>`;
  $("oNext").onclick=oddNext;
}
function oddNext(){ if(!OQ) return; OQ.i++; OQ.r=oddRound(); renderOdd(); }
document.addEventListener("keydown",e=>{
  if(mode!=="vocab"||VXS.xsub!=="odd"||!OQ||/INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)) return;
  if(!OQ.answered&&/^[1-4]$/.test(e.key)) oddAnswer(+e.key-1);
  else if(OQ.answered&&e.key==="Enter"){ e.preventDefault(); oddNext(); }
});
const _rv17=renderVocab;
renderVocab=function(){
  const isOdd=VXS.xsub==="odd";
  if(isOdd){ VXS.xsub=null; const ks=VXS.sub; VXS.sub="stories"; const ko=STV.open; STV.open=null; _rv17(); VXS.sub=ks; STV.open=ko; VXS.xsub="odd"; }
  else _rv17();
  const seg=$("vxSub");
  seg.insertAdjacentHTML("beforeend",`<button data-s="odd">🕵️ Odd</button>`);
  seg.querySelector('[data-s="odd"]').onclick=()=>{VXS.xsub="odd";OQ=null;saveVX();renderVocab();};
  if(!isOdd) return;
  seg.querySelectorAll("button").forEach(b=>b.classList.toggle("on",b.dataset.s==="odd"));
  $("vxSum").innerHTML=`<b>🕵️ Odd one out</b> · ${VXS.len} rounds · 13 topics`;
  const ab=$("vxSetToggle").parentElement; [...ab.children].forEach(c=>{ if(c.id!=="vxSetToggle") c.remove(); });
  ab.insertAdjacentHTML("beforeend",`<button class="btn go ab" id="oNew">↻ New</button>`);
  $("oNew").onclick=()=>{OQ=null;renderOdd();};
  $("vxSetPanel").innerHTML=`<div class="sp-row"><span class="ctl-lbl">Rounds</span><label><select id="oLen">${[6,8,10,15,20].map(n=>`<option ${n===VXS.len?"selected":""}>${n}</option>`).join("")}</select></label></div>
    <div class="lvdesc">Four words appear: three share a topic, one doesn't. Uses Family, Food, Feelings, Clothes, Work, Health, Animals, Colors, House, City, Weather, Months and Body. Keys 1–4 work on a keyboard.</div>`;
  $("oLen").onchange=()=>{VXS.len=+$("oLen").value;saveVX();OQ=null;renderVocab();};
  renderOdd();
};
MODE_LBL.sbuild="🧱 Sentence builder"; MODE_LBL.vodd="🕵️ Odd one out";

/* ---------- 5 · ⭐ XP, levels & 🏅 badges ---------- */
let XP=LS.get(LKEY("xp"),0);
let BADGE_ON=LS.get(LKEY("badges"),{});
function lvlOf(xp){ let lv=1,need=100,acc=0; while(xp>=acc+need){acc+=need;lv++;need=100+50*(lv-1);} return {lv,into:xp-acc,need}; }
const tierOf=lv=>G17.tiers[lv>=15?3:lv>=10?2:lv>=5?1:0];
function addXP(n){
  const before=lvlOf(XP).lv; XP+=n; LS.set(LKEY("xp"),XP);
  const after=lvlOf(XP).lv;
  if(after>before){ const t=tierOf(after); setTimeout(()=>{toast(`${t[0]} ${U17.levelUp} Lv ${after} · ${t[1]}`);win();confetti();},400); }
  renderDaily(); checkBadges();
}
const vxSum=t=>Object.values(ST.vx||{}).filter(s=>s.t===t).reduce((a,s)=>a+s.r,0);
const vxDistinct=t=>Object.values(ST.vx||{}).filter(s=>s.t===t&&s.r>0).length;
const wcat=g=>((ST.wcats||{})[g]||{r:0}).r;
const BADGES=[
 ["first","🎉","First steps","Get your first answer right",()=>XP>0],
 ["perfect","🏆","Perfect round","Finish a round with no mistakes",()=>ST.rounds.some(r=>!r.f&&r.x===0&&r.n>=5)],
 ["s3","🔥","On fire","Hit your daily goal 3 days in a row",()=>DAILY.best>=3],
 ["s7","📅","Week warrior","7-day streak",()=>DAILY.best>=7],
 ["s30","🌟","Unstoppable","30-day streak",()=>DAILY.best>=30],
 ["m25","📗","Verb rookie","Master 25 verbs",()=>mastered.size>=25],
 ["m100","📘","Verb pro","Master 100 verbs",()=>mastered.size>=100],
 ["m200","📕","Verb legend","Master all 200 verbs",()=>mastered.size>=VERBS.length],
 ["type","⌨️","Typist","Finish 5 Type-it rounds",()=>ST.rounds.filter(r=>r.m==="type"||r.m==="tvocab").length>=5],
 ["map","🗺️","Map explorer","10 correct map routes",()=>vxSum("map")>=10],
 ["tree","🌳","Family pro","15 correct family-tree answers",()=>vxSum("ftree")>=15],
 ["idiom","🦜","Idiom master","Get 15 different idioms right",()=>vxDistinct("idiom")>=15],
 ["build","🧱","Sentence builder","Build 20 sentences",()=>ST.sb.r>=20],
 ["odd","🕵️","Detective","Spot 20 odd ones out",()=>ST.odd.r>=20],
 ["gram","🧩","Grammar guru","100 grammar answers right",()=>Object.values(ST.wcats||{}).reduce((a,c)=>a+c.r,0)>=100],
 ["serest","⚖️","Ser or estar?","10 ser / estar answers right",()=>wcat("serestar")>=10],
 ["past","⏳","Time traveler","10 past-tense answers right",()=>wcat("past")>=10],
 ["story5","📖","Bookworm","Finish 5 stories",()=>Object.keys(STV.done).length>=5],
 ["storyAll","📚","Storyteller","Finish every story",()=>Object.keys(STV.done).length>=STORIES.length],
 ["lv5","🎒",G17.tiers[1][1],"Reach level 5",()=>lvlOf(XP).lv>=5],
 ["lv10","🏠",G17.tiers[2][1],"Reach level 10",()=>lvlOf(XP).lv>=10],
 ["lv15","👑",G17.tiers[3][1],"Reach level 15",()=>lvlOf(XP).lv>=15]
];
function checkBadges(silent){
  const fresh=[];
  BADGES.forEach(([id,ic,name,,test])=>{ if(BADGE_ON[id]) return; let ok=false; try{ok=test()}catch(e){} if(ok){ BADGE_ON[id]=Date.now(); fresh.push(ic+" "+name); } });
  if(!fresh.length) return;
  LS.set(LKEY("badges"),BADGE_ON);
  if(!silent) setTimeout(()=>toast(fresh.length===1?`🏅 New badge: ${fresh[0]}`:`🏅 ${fresh.length} new badges!`),900);
}
/* every correct answer = +10 XP · daily goal = +50 · perfect round = +25 */
const _bd17=bumpDay;
bumpDay=function(){ _bd17(); addXP(10); if(todayN()===DAILY.goal) addXP(50); };
const _lr17=logRound;
logRound=function(a,s,f){ _lr17(a,s,f); if(!f&&round&&round.mistakes===0) addXP(25); else checkBadges(); };
const _g16r=g16Result;
g16Result=function(host,Q,kind,again,retry){ _g16r(host,Q,kind,again,retry); if(Q.right===Q.n&&Q.n>=5) addXP(25); else checkBadges(); };
const _sd17=storyDone; storyDone=function(s,ans){ _sd17(s,ans); checkBadges(); };
const _wf17=wFinish; wFinish=function(){ _wf17(); checkBadges(); };
/* XP chip in the daily bar */
const _rd17=renderDaily;
renderDaily=function(){
  _rd17(); const bar=$("dailyBar"); if(!bar||bar.classList.contains("hidden")) return;
  const L=lvlOf(XP), t=tierOf(L.lv);
  bar.insertAdjacentHTML("afterbegin",`<span class="xpchip" title="${XP} XP total">${t[0]} <b>Lv ${L.lv}</b> ${t[1]}<span class="xpbar"><i style="width:${L.into/L.need*100}%"></i></span><span class="gn">${L.into}/${L.need}</span></span>`);
};
/* Stats: level + badges panel */
const _rs17=renderStats;
renderStats=function(){
  _rs17();
  const L=lvlOf(XP), t=tierOf(L.lv), got=BADGES.filter(b=>BADGE_ON[b[0]]).length;
  const box=document.createElement("div"); box.className="panel";
  box.innerHTML=`<h3>🏅 Level &amp; badges <span class="spacer"></span><span class="gn">${got}/${BADGES.length} badges</span></h3>
    <div class="lvl-card"><div class="lvl-ic">${t[0]}</div><div style="flex:1;min-width:0">
      <div class="lvl-t"><b>Level ${L.lv} · ${t[1]}</b><span class="gn">${XP.toLocaleString()} XP</span></div>
      <div class="xpbar big"><i style="width:${L.into/L.need*100}%"></i></div>
      <div class="gn">${L.need-L.into} XP to level ${L.lv+1} · ${G17.tiers.map((x,i)=>`${x[0]} ${x[1]} ${["1","5","10","15"][i]}+`).join(" · ")}</div></div></div>
    <div class="badge-grid">${BADGES.map(([id,ic,name,desc])=>{const on=BADGE_ON[id];
      return `<div class="bdg ${on?"on":""}" title="${desc}"><span class="bi">${on?ic:"🔒"}</span><b>${name}</b><span>${desc}</span>${on?`<i>${new Date(on).toLocaleDateString()}</i>`:""}</div>`}).join("")}</div>
    <div class="vnote">+10 XP for every correct answer · +25 for a perfect round · +50 when you hit your daily goal.</div>`;
  const sv=$("statsView"); sv.insertBefore(box, sv.children[1]||null);
};
if(typeof BK_KEYS!=="undefined") BK_KEYS.push(LKEY("xp"),LKEY("badges"),LKEY("sbset"));
checkBadges(true); renderDaily();

/* ---------- refresh ---------- */
renderCtrls(); updSummary();
if(mode==="words") renderWords(); if(mode==="vocab") renderVocab();

/* ===== v13: language switch + tab routing ===== */
(function(){
  const cur=document.documentElement.dataset.lang||"pt";
  try{localStorage.setItem("vm_lang",cur)}catch(e){}
  document.querySelectorAll("#langSw button").forEach(b=>{
    b.classList.toggle("on",b.dataset.l===cur);
    b.onclick=()=>{ if(b.dataset.l===cur) return;
      const on=document.querySelector("nav button.on"), tab=on?on.dataset.m:"play";
      try{localStorage.setItem("vm_lang",b.dataset.l)}catch(e){}
      if(window.speechSynthesis) speechSynthesis.cancel();
      location.href=(b.dataset.l==="es"?"es.html":"index.html?pt")+"#"+tab; };
  });
  const h=location.hash.slice(1);
  if(["bank","words","vocab","slang","stats"].includes(h)) setMode(h);
})();


/* =====================================================================
   v18 · DISPLAY (dark mode + text size) · FULL KEYBOARD PLAY
   This file is shared: every change here applies to both languages.
   ===================================================================== */
const DISP_KEY="vmdisplay";
let DISP=Object.assign({theme:"light",size:"m"},LS.get(DISP_KEY,{}));
const SIZES={s:.9,m:1,l:1.12,xl:1.25};
const darkMQ=window.matchMedia?matchMedia("(prefers-color-scheme: dark)"):null;
function applyDisplay(){
  const dark=DISP.theme==="dark"||(DISP.theme==="auto"&&darkMQ&&darkMQ.matches);
  document.documentElement.classList.toggle("dark",dark);
  document.documentElement.style.setProperty("--zoom",SIZES[DISP.size]||1);
  const tc=document.querySelector('meta[name="theme-color"]');
  if(tc){ tc.dataset.light=tc.dataset.light||tc.content; tc.content=dark?"#10161d":tc.dataset.light; }
}
if(darkMQ&&darkMQ.addEventListener) darkMQ.addEventListener("change",()=>{ if(DISP.theme==="auto") applyDisplay(); });
applyDisplay();
(function(){
  const spk=$("spkSet"), wrap=document.createElement("div"); wrap.className="hdr-btns";
  spk.before(wrap);
  wrap.innerHTML=`<button class="hdr-spk" id="dispBtn" title="Display: dark mode & text size">Aa</button>`;
  wrap.appendChild(spk);
  document.body.insertAdjacentHTML("beforeend",`<div class="modal" id="dispModal"><div class="box sp-box">
    <h2>🎨 Display</h2>
    <div class="sp-row2">Theme</div>
    <div class="seg" id="dTheme"><button data-v="light">☀️ Light</button><button data-v="dark">🌙 Dark</button><button data-v="auto">🌓 Auto</button></div>
    <div class="gn" style="margin-top:6px">Auto follows your phone or computer setting.</div>
    <div class="sp-row2">Text size</div>
    <div class="seg" id="dSize"><button data-v="s">A−</button><button data-v="m">A</button><button data-v="l">A+</button><button data-v="xl">A++</button></div>
    <p class="d-prev" id="dPrev">${LANGC==="es"?"¡Hola! ¿Qué tal? <b>hablar</b> = to speak":"Oi! Tudo bem? <b>falar</b> = to speak"}</p>
    <div style="display:flex;justify-content:flex-end;margin-top:12px"><button class="btn go" id="dClose">Done</button></div>
  </div></div>`);
  watchModal($("dispModal"));
  const sync=()=>{ $("dTheme").querySelectorAll("button").forEach(b=>b.classList.toggle("on",b.dataset.v===DISP.theme));
    $("dSize").querySelectorAll("button").forEach(b=>b.classList.toggle("on",b.dataset.v===DISP.size)); };
  $("dTheme").querySelectorAll("button").forEach(b=>b.onclick=()=>{DISP.theme=b.dataset.v;LS.set(DISP_KEY,DISP);applyDisplay();sync();});
  $("dSize").querySelectorAll("button").forEach(b=>b.onclick=()=>{DISP.size=b.dataset.v;LS.set(DISP_KEY,DISP);applyDisplay();sync();});
  $("dispBtn").onclick=()=>{sync();$("dispModal").classList.add("show");};
  $("dClose").onclick=()=>$("dispModal").classList.remove("show");
  $("dispModal").onclick=e=>{if(e.target.id==="dispModal")$("dispModal").classList.remove("show")};
})();

/* ---------- ⌨️ full keyboard play in Match ---------- */
const KL="1234567890-=", KR="asdfgjklzxcv", KM="abcdefghijklmnoqrstuvwxyz";
function tagKeys(){
  if(!$("play")||$("play").classList.contains("hidden")) return;
  const tiles=$("play").querySelectorAll(".tile");
  if(tiles.length){
    $("play").querySelectorAll('.tile[data-side="L"]').forEach((t,i)=>{ if(!t.dataset.key&&KL[i]){t.dataset.key=KL[i];t.insertAdjacentHTML("afterbegin",`<kbd class="kk">${KL[i]}</kbd>`);} });
    $("play").querySelectorAll('.tile[data-side="R"]').forEach((t,i)=>{ if(!t.dataset.key&&KR[i]){t.dataset.key=KR[i];t.insertAdjacentHTML("afterbegin",`<kbd class="kk">${KR[i].toUpperCase()}</kbd>`);} });
  }
  $("play").querySelectorAll(".card").forEach((c,i)=>{ if(!c.dataset.key&&KM[i]){c.dataset.key=KM[i];c.insertAdjacentHTML("beforeend",`<kbd class="kk kc">${KM[i].toUpperCase()}</kbd>`);} });
  keyHelp();
}
function keyHelp(){
  let h=$("keyHelp");
  if(!h){ h=document.createElement("div"); h.id="keyHelp"; h.className="keyhelp"; $("gameCtrls").after(h); }
  const st=SET.style;
  h.innerHTML=st==="type"?`⌨️ <b>Enter</b> check / next · <b>/</b> hint · <b>Esc</b> I don't know · <b>Shift+N</b> new round · <b>P</b> pause`
    :st==="memory"?`⌨️ <b>A–Z</b> flip a card · <b>/</b> hint · <b>Shift+N</b> new round · <b>P</b> pause · <b>Enter</b> next round`
    :`⌨️ <b>1–0</b> pick left · <b>A–V</b> pick right · <b>Backspace</b> clear · <b>/</b> hint · <b>Shift+N</b> new round · <b>P</b> pause · <b>Enter</b> next round`;
}
new MutationObserver(()=>tagKeys()).observe($("play"),{childList:true});
document.addEventListener("keydown",e=>{
  if(e.metaKey||e.ctrlKey||e.altKey) return;
  const tag=document.activeElement&&document.activeElement.tagName, typing=/INPUT|SELECT|TEXTAREA/.test(tag);
  const anyModal=document.querySelector(".modal.show");
  if($("modal").classList.contains("show")){ if(e.key==="Enter"){ e.preventDefault(); $("mNext").click(); } return; }
  if(anyModal) return;
  const game=!$("gameCtrls").classList.contains("hidden"); if(!game) return;
  if(e.key==="N"&&e.shiftKey&&!typing){ e.preventDefault(); $("newBtn").click(); return; }
  if(SET.style==="type"){
    if(e.key==="/"&&$("tyIn")&&!TY.answered){ e.preventDefault(); $("hintBtn").click(); }
    else if(e.key==="Escape"&&$("tyIdk")&&!TY.answered){ e.preventDefault(); $("tyIdk").click(); }
    return;
  }
  if(typing) return;
  if(e.key==="/"){ e.preventDefault(); $("hintBtn").click(); return; }
  if(e.key==="Backspace"&&round&&round.sel){ e.preventDefault(); ["L","R"].forEach(s=>{ if(round.sel[s]){round.sel[s].classList.remove("sel");round.sel[s]=null;} }); return; }
  const k=e.key.toLowerCase(); if(k.length!==1||k==="p") return;
  const el=$("play").querySelector(`[data-key="${CSS.escape(k)}"]`+(SET.style==="memory"?".card":".tile"));
  if(el){ e.preventDefault(); el.click(); }
});
tagKeys();

/* =====================================================================
   v19 · ONE ⚙️ SETTINGS BUTTON (voice, speed, display, sound) · CLEAN HEADER
   ===================================================================== */
(function(){
  /* header: [logo][title][PT|ES] ……… [⚙️] */
  const brand=document.querySelector(".brand"), btns=document.querySelector(".hdr-btns");
  const gear=document.createElement("button"); gear.className="hdr-gear"; gear.id="gearBtn"; gear.title="Settings"; gear.setAttribute("aria-label","Settings");
  gear.innerHTML=`⚙️<span class="slowdot hidden" title="Slow speech on">🐢</span>`;
  if(btns) btns.style.display="none";
  brand.appendChild(gear);
  /* move display controls into the voice sheet, then rename it Settings */
  const sp=$("spModal").querySelector(".box"), dbox=$("dispModal").querySelector(".box");
  sp.querySelector("h2").textContent="⚙️ Settings";
  const disp=document.createElement("div"); disp.className="set-sec";
  disp.innerHTML=`<div class="set-h">🎨 Display</div>`;
  [...dbox.children].forEach(c=>{ if(c.tagName!=="H2"&&!c.querySelector("#dClose")) disp.appendChild(c); });
  const voiceH=document.createElement("div"); voiceH.className="set-h"; voiceH.textContent="🔊 Voice & speed";
  sp.querySelector("h2").after(voiceH);
  const doneRow=$("spClose").parentElement; doneRow.before(disp);
  const snd=document.createElement("div"); snd.className="set-sec";
  snd.innerHTML=`<div class="set-h">🎵 Sound</div><div class="sp-row" style="gap:16px">
    <label><input type="checkbox" id="gVoice"> Read words aloud in games</label><label><input type="checkbox" id="gSfx"> Sound effects</label></div>`;
  doneRow.before(snd);
  const lv=LANGC==="es"?"Spanish":"Portuguese";
  const syncSnd=()=>{ $("gVoice").checked=$("voice").checked; $("gSfx").checked=$("sfx").checked; };
  $("gVoice").onchange=()=>{ $("voice").checked=$("gVoice").checked; LS.set(LKEY("snd"),{v:$("voice").checked,s:$("sfx").checked}); };
  $("gSfx").onchange=()=>{ $("sfx").checked=$("gSfx").checked; LS.set(LKEY("snd"),{v:$("voice").checked,s:$("sfx").checked}); };
  $("voice").addEventListener("change",()=>LS.set(LKEY("snd"),{v:$("voice").checked,s:$("sfx").checked}));
  $("sfx").addEventListener("change",()=>LS.set(LKEY("snd"),{v:$("voice").checked,s:$("sfx").checked}));
  const saved=LS.get(LKEY("snd"),null); if(saved){ $("voice").checked=saved.v; $("sfx").checked=saved.s; }
  /* hide the duplicate checkboxes in the Match panel */
  [$("voice"),$("sfx")].forEach(x=>x.closest("label").classList.add("hidden"));
  /* collapse long tips behind a toggle */
  const tips=[...sp.querySelectorAll(".sp-tip")].filter(t=>t.id!=="spWarn");
  if(tips.length){ const d=document.createElement("details"); d.className="set-tips"; d.innerHTML=`<summary>ℹ️ Why do voices sound different?</summary>`; tips[0].before(d); tips.forEach(t=>d.appendChild(t)); }
  const open=()=>{ openSpeech(); syncSnd(); $("dTheme").querySelectorAll("button").forEach(b=>b.classList.toggle("on",b.dataset.v===DISP.theme));
    $("dSize").querySelectorAll("button").forEach(b=>b.classList.toggle("on",b.dataset.v===DISP.size)); };
  gear.onclick=open; $("spkSet").onclick=open; $("dispBtn").onclick=open;
  const slow=()=>gear.querySelector(".slowdot").classList.toggle("hidden",!(SPEECH.speed==="slow"||SPEECH.speed==="relaxed"));
  const _ss=syncSpeedUI; syncSpeedUI=function(){ _ss(); slow(); }; slow();
  /* the "Pairs" row only has the dropdown left: keep it tidy */
})();

/* =====================================================================
   v20 · MAP & ODD ONE OUT IN THE MATCH TAB · KEY HINTS ONLY ON MATCH ·
         STORIES LAST IN VOCAB · MAP DIRECTIONS FOR ANY BUILDING
   ===================================================================== */
const MINI=["map","odd"];
const isMini=()=>MINI.includes(SET.style);
if(MINI.includes(VXS.xsub)){ VXS.xsub=null; saveVX(); }

/* ---- 🧭 directions from ⭐ to any building ---- */
function routeTo(t){
  let best=null,bc=1e9;
  const rec=(x,y,h,steps,path,segs,cost)=>{
    for(let n=1;n<=3;n++){
      const nx=x+HD[h][0]*n, ny=y+HD[h][1]*n; if(nx<0||nx>4||ny<0||ny>4) break;
      const st=[...steps,{t:"go",n}], p=[...path,[nx,ny]], c=cost+n;
      ["right","left"].forEach(side=>{ if(frontBlock(nx,ny,h,side)===t&&c+segs*2<bc){ bc=c+segs*2; best={steps:st,side,target:t,path:p,end:[nx,ny,h]}; } });
      if(segs<3) ["right","left"].forEach(turn=>rec(nx,ny,(h+(turn==="right"?1:3))%4,[...st,{t:turn}],p,segs+1,c));
    }
  };
  rec(2,0,0,[],[[2,0]],1,0); return best;
}
const _mSel20=mSelect;
mSelect=function(i,silent){
  _mSel20(i,true);
  const r=routeTo(i); if(!r) return;
  const pt=routeText(r,false), en=routeText(r,true);
  mDrawPath(r);
  $("mInfo").insertAdjacentHTML("beforeend",`<div class="mroute-txt">🧭 <b>${pt}</b><div class="gn"><i>${en}</i></div><button class="spk2" id="mRouteSay" title="Hear the directions">🔊</button></div>`);
  $("mRouteSay").onclick=()=>sayAlways(pt);
  if(!silent) sayAlways(LM[i][0]+". "+pt);
};

/* ---- Vocab: drop Map & Odd (now in Match), Stories at the end ---- */
const _rv20=renderVocab;
renderVocab=function(){
  if(MINI.includes(VXS.xsub)) VXS.xsub=null;
  const pv=$("play").querySelector("#vxArea"); if(pv) pv.removeAttribute("id");
  _rv20();
  const seg=$("vxSub"); if(!seg) return;
  seg.querySelectorAll('[data-s="map"],[data-s="odd"]').forEach(b=>b.remove());
  const st=seg.querySelector('[data-s="stories"]'); if(st) seg.appendChild(st);
};

/* ---- Match: 🗺️ Map and 🕵️ Odd as game styles ---- */
(function(){
  const seg=$("styleSeg");
  seg.insertAdjacentHTML("beforeend",`<button data-v="map">🗺️ Map</button><button data-v="odd">🕵️ Odd one out</button>`);
  seg.querySelectorAll("button").forEach(b=>b.onclick=()=>{SET.style=b.dataset.v;saveSet();setMode("play")});
  const row=document.createElement("div"); row.id="miniRow"; row.className="sp-row hidden"; $("styleSeg").closest(".sp-row").after(row);
})();
function miniSettings(){
  const row=$("miniRow"), on=isMini();
  $("setPanel").classList.toggle("mini",on); row.classList.toggle("hidden",!on);
  if(!on) return;
  row.innerHTML=`${SET.style==="map"?`<span class="ctl-lbl">Directions</span><div class="seg" id="miniDir">${Object.entries(VX_DIRL).map(([k,l])=>`<button data-v="${k}" class="${VXS.dir===k?"on":""}">${l}</button>`).join("")}</div>`:""}
    <label>Rounds <select id="miniLen">${[6,8,10,15,20].map(n=>`<option ${n===VXS.len?"selected":""}>${n}</option>`).join("")}</select></label>
    <div class="lvdesc" style="flex-basis:100%">${SET.style==="map"?"Explore: tap any building to see and hear how to get there from ⭐. Quiz: follow the directions and tap where you end up. 🎧 Listen hides the text.":"Four words appear: three share a topic, one doesn't. Keys 1–4 work on a keyboard."}</div>`;
  row.querySelectorAll("#miniDir button").forEach(b=>b.onclick=()=>{VXS.dir=b.dataset.v;saveVX();MQ=null;newMini();miniSettings();updSummary();});
  $("miniLen").onchange=()=>{VXS.len=+$("miniLen").value;saveVX();MQ=null;OQ=null;newMini();updSummary();};
}
function newMini(){
  const vv=$("vocabView"); if(vv.querySelector("#vxArea")) vv.innerHTML="";
  clearInterval(timer); round=null; paused=false; $("pauseOv").classList.add("hidden");
  $("play").innerHTML=`<div id="vxArea"></div>`;
  if(SET.style==="map"){ if(!VXS.mmode) VXS.mmode="quiz"; MQ=null; renderMap(); } else { OQ=null; renderOdd(); }
  stats();
}
const _rm20=renderMap;
renderMap=function(){
  _rm20();
  if(!$("play").contains($("vxArea"))) return;
  document.querySelectorAll("#mMode button").forEach(b=>b.onclick=()=>{VXS.mmode=b.dataset.v;MQ=null;mSel=null;saveVX();newMini();updSummary();});
};
const _nm20=newMatch;
newMatch=function(){ if(isMini()) newMini(); else _nm20(); };
const _st20=start;
start=function(){
  const pv=$("play").querySelector("#vxArea"); if(pv&&!(isMini()&&GAME_MODES.includes(mode))) $("play").innerHTML="";
  _st20();
  const game=!$("gameCtrls").classList.contains("hidden"), mini=game&&isMini();
  $("stats").classList.toggle("hidden",!game||mini);
  ["hintBtn","pauseBtn"].forEach(id=>$(id).classList.toggle("hidden",mini));
  const kh=$("keyHelp"); if(kh) kh.classList.toggle("hidden",!game||SET.style==="map");
  miniSettings();
};
const _kh20=keyHelp;
keyHelp=function(){ _kh20(); const h=$("keyHelp"); if(!h) return;
  if(SET.style==="odd") h.innerHTML=`⌨️ <b>1–4</b> pick a word · <b>Enter</b> next · <b>Shift+N</b> new round`;
  h.classList.toggle("hidden",$("gameCtrls").classList.contains("hidden")||SET.style==="map"); };
const _rc20=renderCtrls;
renderCtrls=function(){ _rc20(); $("styleSeg").querySelectorAll("button").forEach(b=>b.classList.toggle("on",b.dataset.v===SET.style)); miniSettings(); };
const _us20=updSummary;
updSummary=function(){
  if(!isMini()) return _us20();
  if(!$("setSummary")) return;
  $("setSummary").innerHTML=SET.style==="map"?`<b>🗺️ Map</b> · ${VXS.mmode==="quiz"?"Quiz":"Explore"} · ${VX_DIRL[VXS.dir]} · ${VXS.len} rounds`:`<b>🕵️ Odd one out</b> · ${VXS.len} rounds`;
};
document.addEventListener("keydown",e=>{
  if(SET.style!=="odd"||$("gameCtrls").classList.contains("hidden")||!OQ||document.querySelector(".modal.show")||/INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)) return;
  if(!OQ.answered&&/^[1-4]$/.test(e.key)){ e.preventDefault(); oddAnswer(+e.key-1); }
  else if(OQ.answered&&e.key==="Enter"){ e.preventDefault(); oddNext(); }
});
/* jumping to Review / Match-these from elsewhere switches back to tile matching */
const _sr20=startReview; startReview=function(){ if(isMini()){SET.style="tiles";saveSet();} _sr20(); };
const _vg20=vxGoMatch; vxGoMatch=function(){ if(isMini()){SET.style="tiles";saveSet();} _vg20(); };
const _rp20=renderPhr; renderPhr=function(sub){ _rp20(sub); const b=$("phrMatch"); if(!b) return; const o=b.onclick; b.onclick=()=>{ if(isMini()){SET.style="tiles";saveSet();} o(); }; };
renderCtrls(); updSummary();
if(GAME_MODES.includes(mode)) start(); else if(mode==="vocab") renderVocab();

/* =====================================================================
   v21 · COMPACT MATCH SETTINGS ON MOBILE (same options, less space)
   ===================================================================== */
(function(){
  const SHORT={tiles:["🎯","Tiles"],memory:["🃏","Memory"],type:["⌨️","Type"],map:["🗺️","Map"],odd:["🕵️","Odd"]};
  $("styleSeg").querySelectorAll("button").forEach(b=>{ const s=SHORT[b.dataset.v]; if(!s) return;
    const full=b.textContent.replace(/^\S+\s/,"");
    b.innerHTML=`<span class="si">${s[0]}</span><span class="sl-f">${full}</span><span class="sl-s">${s[1]}</span>`; });
  /* pairs joins the direction row; traps becomes compact */
  const dirRow=$("dirSeg").closest(".sp-row"), pairsLbl=$("pairs").closest("label"), pairsRow=pairsLbl.parentElement;
  dirRow.appendChild(pairsLbl); if(![...pairsRow.children].some(c=>!c.classList.contains("hidden"))) pairsRow.classList.add("hidden");
  $("trapBtn").innerHTML=`🪤<span class="sl-f"> Traps</span>`;
  /* tenses / persons / categories fold away on phones */
  const wrap=document.createElement("div"); wrap.id="optWrap";
  $("vcatCtrls").before(wrap); wrap.append($("vcatCtrls"),$("conjCtrls"));
  const tog=document.createElement("button"); tog.id="optTog"; tog.className="opt-tog"; wrap.before(tog);
  tog.onclick=()=>{ wrap.classList.toggle("open"); tog.classList.toggle("open"); };
})();
function optLabel(){
  const t=$("optTog"); if(!t) return;
  let txt="";
  if(SET.fmt==="conj") txt=`⚙️ Tenses &amp; persons <b>${SET.tenses.length}</b> · <b>${SET.persons.length}</b>`;
  else if(SET.fmt==="vocab") txt=`⚙️ Categories <b>${SET.vcats.length===VM_CATS.length?"All":SET.vcats.length}</b>`;
  t.innerHTML=txt+`<span class="chev">▾</span>`; t.classList.toggle("none",!txt||isMini());
}
const _rc21=renderCtrls; renderCtrls=function(){ _rc21(); optLabel(); };
const _st21=start; start=function(){ _st21(); optLabel(); };
optLabel();

/*@@H187@@*/

/* =====================================================================
   v22 · CENTERED LEVEL LABELS · BIGGER DIAGRAMS ON PHONES ·
         LESSON NOTES MERGED IN (no duplicates)
   ===================================================================== */
if(G18){
  const ART22=LANGC==="es"?/^(el|la|los|las|un|una) /:/^(o|a|os|as|um|uma) /;
  const nk=s=>String(s).toLowerCase().normalize("NFC").replace(/[¿?¡!.,;:…]/g,"").replace(ART22,"").trim();
  const seen=new Set();
  const addKeys=pt=>String(pt).split(/\s*\/\s*/).forEach(p=>seen.add(nk(p)));
  Object.values(VX).forEach(list=>(list||[]).forEach(x=>addKeys(x.pt)));
  VX_BODY.forEach(x=>addKeys(x.pt));
  G16.phrases.forEach(([,l])=>l.forEach(([pt])=>addKeys(pt)));
  SLANG.forEach(s=>addKeys(s.t));
  const isDup=pt=>String(pt).split(/\s*\/\s*/).every(p=>seen.has(nk(p)));
  window.__dupSkipped=[];
  const take=pt=>{ if(isDup(pt)){ window.__dupSkipped.push(pt); return false; } addKeys(pt); return true; };
  /* vocab topics */
  Object.entries(G18.vx).forEach(([t,list])=>{ if(!VX[t]) return;
    list.forEach(([pt,en,note,sy])=>{ if(take(pt)) VX[t].push({t,pt,en,note:note||"",say:sy||pt}); }); });
  /* phrases: new groups or merged into existing ones */
  G18.phrases.forEach(([cat,list])=>{
    const keep=list.filter(([pt])=>take(pt)); if(!keep.length) return;
    const g=G16.phrases.find(([c])=>c===cat); if(g) g[1].push(...keep); else G16.phrases.push([cat,keep]);
    keep.forEach(([pt,en,note])=>VX.phrase.push({t:"phrase",pt,en,note:note||"",say:pt,cat})); });
  /* slang */
  G18.slang.forEach(([t,m,ex,en,r,c,n])=>{ if(!take(t)) return; SLANG.push({i:SLANG.length,t,m,ex,en,r,c,n}); if(!SCATS.includes(c)) SCATS.push(c); });
  SLANG.sort((a,b)=>REG_ORDER.indexOf(a.r)-REG_ORDER.indexOf(b.r)||a.i-b.i).forEach((s,k)=>s.rank=k+1);
  /* idioms */
  const idSeen=new Set(VX.idiom.map(x=>nk(x.pt)));
  G18.idioms.forEach(x=>{ if(idSeen.has(nk(x[0]))||isDup(x[0])){window.__dupSkipped.push(x[0]);return;} idSeen.add(nk(x[0])); G16.idioms.push(x);
    VX.idiom.push({t:"idiom",pt:x[0],en:x[2],note:"≈ "+x[3],say:x[0],lit:x[1],eq:x[3],ex:x[4],exen:x[5]}); });
  /* grammar: common-mistakes quiz */
  Object.assign(WGROUPS,G18.wgroups);
  const wSeen=new Set(WITEMS.map(i=>i.s));
  G18.witems.forEach(([s,a,en,g,opts,why])=>{ if(!wSeen.has(s)) WITEMS.push({id:WITEMS.length,s,a,en,g,opts,why}); });
  (function(){ const rw=LS.get(LKEY("wset"),{});
    if(!rw.v22){ WSET.cats=[...new Set([...WSET.cats,...Object.keys(G18.wgroups)])]; WSET.v22=1; saveW(); } })();
  /* grammar guide: this/that table, divertir-se, mau/mal, tenho/tinha/tive */
  const _rg22=renderGuide;
  renderGuide=function(){
    _rg22();
    const body=$("wBody"), h3=t=>[...body.querySelectorAll(".panel h3")].find(h=>h.textContent.includes(t));
    const tt=h3("this / that"); if(tt&&G18.thisThat) tt.closest(".panel").outerHTML=G18.thisThat;
    const rf=h3("Reflexive"); if(rf&&G18.divertir) rf.closest(".panel").insertAdjacentHTML("beforeend",G18.divertir);
    const cp=h3("Comparisons"); if(cp&&G18.mauMal){ const ul=cp.closest(".panel").querySelector("ul"); if(ul) ul.insertAdjacentHTML("beforeend",G18.mauMal); }
    const ps=$("g-past"); if(ps&&G18.tenhoTinha) ps.insertAdjacentHTML("beforeend",G18.tenhoTinha);
  };
  /* verb notes in the Verb Bank pop-up */
  const _ov22=openVerb;
  openVerb=function(inf){ _ov22(inf); const n=(G18.vnotes||{})[inf]; if(n) $("vBody").insertAdjacentHTML("afterbegin",`<div class="vstat">📝 ${n}</div>`); };
  /* alphabet: pronunciation patterns, A–Z list, sound-alikes */
  new MutationObserver(()=>{ const s=[...document.querySelectorAll("#vocabView details.vx-sec")].find(d=>/^🔤/.test(d.querySelector("summary").textContent.trim()));
    if(G18.abcTip&&s&&!s.querySelector(".abc-tip")){ const h=s.querySelector(".vx-in"); if(h){ h.insertAdjacentHTML("afterbegin",`<div class="abc-tip">${G18.abcTip}</div>`); } } })
    .observe($("vocabView"),{childList:true,subtree:true});
  /* slang tab: sensitive-words note at the bottom (never used in games) */
  const _rs22=renderSlang;
  renderSlang=function(){ _rs22(); if((SSET.sub||"slang")==="slang") $("slangView").insertAdjacentHTML("beforeend",G18.sensitive); };
}
/* one home per word: directions live in 🧭 Directions only (also clears older city / phrase repeats) */
(function(){ if(!VX.dir) return;
  const k=s=>String(s).toLowerCase().replace(/[¿?¡!.,;:…]/g,"").trim(), D=new Set(VX.dir.map(x=>k(x.pt)));
  ["city","phrase"].forEach(t=>{ if(VX[t]) VX[t]=VX[t].filter(x=>!D.has(k(x.pt))); });
  G16.phrases.forEach(g=>{ g[1]=g[1].filter(([pt])=>!D.has(k(pt))); });
})();
/* family tree: readable size on phones, scroll sideways, centered on ⭐ */
const _rt22=renderTree;
renderTree=function(){
  _rt22(); const svg=$("treeSvg"); if(!svg) return;
  const w=document.createElement("div"); w.className="tree-scroll"; svg.before(w); w.appendChild(svg);
  if(innerWidth<=700) setTimeout(()=>{ w.scrollLeft=Math.max(0,350/660*w.scrollWidth-w.clientWidth/2); },60);
};
renderCtrls(); updSummary();
if(mode==="words") renderWords(); if(mode==="vocab") renderVocab(); if(mode==="slang") renderSlang();

/*@@H188@@*/
/* =====================================================================
   v25 · 💬 TEXTING, EMAIL & INTERNET vocab topic
   ===================================================================== */
(function(){
  if(typeof G19NET==="undefined"||VX.net) return;
  const OLD_VX=VX_KEYS.length, OLD_VM=VM_CATS.length;
  const k=s=>String(s).toLowerCase().replace(/[¿?¡!.,;:…]/g,"").trim();
  const have=new Set(); Object.values(VX).forEach(l=>(l||[]).forEach(x=>String(x.pt).split(/\s*\/\s*/).forEach(p=>have.add(k(p)))));
  SLANG.forEach(s=>String(s.t).split(/\s*\/\s*/).forEach(p=>have.add(k(p))));
  window.__netSkipped=[];
  VX_TOPICS.net={label:"Texting, email & internet",ic:"📱"};
  VX.net=G19NET.filter(([pt])=>{ const dup=String(pt).split(/\s*\/\s*/).every(p=>have.has(k(p))); if(dup) __netSkipped.push(pt); return !dup; })
    .map(([pt,en,note,sy])=>({t:"net",pt,en,note:note||"",say:sy||pt}));
  VX_KEYS.push("net"); VM_CATS.splice(VM_CATS.indexOf("phrase"),0,"net");
  const rs=LS.get(LKEY("set"),{}), rv=LS.get(LKEY("vxset"),{});
  if(!rs.v25){ const c=(rs.vcats||[]).filter(x=>vmKnown(x)); if(!c.length||c.length>=OLD_VM) SET.vcats=[...VM_CATS]; SET.v25=1; saveSet(); }
  if(!rv.v25){ const t=(rv.topics||[]).filter(x=>vxKnown(x)); if(!t.length||t.length>=OLD_VX) VXS.topics=[...VX_KEYS]; VXS.v25=1; saveVX(); }
})();
renderCtrls(); updSummary();
if(mode==="vocab") renderVocab(); else if(GAME_MODES.includes(mode)&&SET.fmt==="vocab") start();
