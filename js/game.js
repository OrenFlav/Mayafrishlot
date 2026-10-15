/* Give or Keep: a classroom game for two teams.
   It reads its questions from a JSON setup file (see "game" in js/data.js). */
(function(){
const E = s => String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const LET = ["A","B","C","D"];
const MYSTERY = [5,10,20,30];           // free points the rivals get after a wrong answer
const shuffle = a => { a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };

function parseOutcome(o){
  const t = String(o||"").trim().toLowerCase();
  if(t.startsWith("swap")) return {kind:"swap", big:"SWAP", label:"Magpalitan ng score"};
  if(t.startsWith("lose")) return {kind:"lose", big:"LOSE ALL", label:"Mawawala ang lahat ng puntos"};
  const n = parseInt(t.replace(/\s/g,""),10);
  if(isNaN(n)) return {kind:"plus", n:0, big:"+0", label:"Walang puntos"};
  return n>=0 ? {kind:"plus", n, big:"+"+n, label:`Dagdag na ${n} puntos`}
              : {kind:"minus", n:-n, big:"\u2212"+(-n), label:`Bawas na ${-n} puntos`};
}
const realOptions = q => (q.options||[]).map((t,i)=>({t:String(t||"").trim(),i}))
                          .filter(o => o.t && !/^option [a-d]$/i.test(o.t));
function answerText(q){
  if(q.type==="multiple"){ const o=(q.options||[])[q.correct]; if(o && String(o).trim()) return String(o).trim(); }
  return String(q.answer||"").trim() || "(Sagot ng guro)";
}

window.playGame = async function(g, it){
  const root = document.getElementById("app");
  root.innerHTML = '<p class="gnote">Loading...</p>';
  let data;
  try{
    const r = await fetch(encodeURI(it.game));
    if(!r.ok) throw 0;
    data = await r.json();
    if(!Array.isArray(data) || !data.length) throw 0;
  }catch(e){
    root.innerHTML = `<div class="gnote">Hindi ma-load ang mga tanong ng laro. Siguraduhing nasa tamang folder ang setup file at na-host ang site (hindi nakabukas mula sa file).<br><br><a class="btn ghost" href="#${E(g.id)}">Bumalik</a></div>`;
    return;
  }

  const S = {scores:[0,0], turn:0, used:new Set(), order:shuffle(data.map((_,i)=>i)),
             phase:"grid", slot:null, q:null, pick:null, step:0, result:null};
  root.innerHTML = '<div class="game" id="game"></div>';
  const box = document.getElementById("game");
  const other = () => 1-S.turn;

  function board(){
    return `<div class="gscore">${[0,1].map(t =>
      `<div class="gteam${S.turn===t && S.phase!=="final" ? " on":""}"><span>TEAM ${t+1}</span><b>${S.scores[t]}</b></div>`).join("")}</div>`;
  }
  function head(){
    return `<div class="ghead"><a class="btn ghost" href="#${E(g.id)}">Umalis sa laro</a><h2>${E(it.title)}</h2></div>`;
  }

  function render(){
    let h = head() + board();
    if(S.phase==="grid"){
      const tiles = S.order.map((qi,n) =>
        `<button class="tile" data-a="slot" data-n="${n}" ${S.used.has(n)?"disabled":""}>${S.used.has(n)?"":n+1}</button>`).join("");
      h += `<p class="gturn">Turn ni <strong>Team ${S.turn+1}</strong>. Pumili ng numero.</p><div class="grid">${tiles}</div>
            <p class="gfoot"><button class="btn ghost" data-a="end">Tapusin ang laro</button></p>`;
    }
    else if(S.phase==="ask"){
      const q=S.q, opts = q.type==="multiple" ? realOptions(q) : [];
      const optHtml = opts.length ? `<div class="opts">${opts.map(o=>{
          let c="opt";
          if(S.pick===o.i) c+=" picked";
          if(S.step===2 && o.i===q.correct) c+=" right";
          return `<button class="${c}" data-a="pick" data-i="${o.i}" ${S.step>0?"disabled":""}><b>${LET[opts.indexOf(o)]}</b> ${E(o.t)}</button>`;}).join("")}</div>` : "";
      let acts="";
      if(S.step===0) acts=`<button class="btn" data-a="lock" ${opts.length&&S.pick==null?"disabled":""}>Lock Answer</button>`;
      else if(S.step===1) acts=`<button class="btn" data-a="reveal">Reveal Answer</button>`;
      else {
        const hint = opts.length && S.pick!=null ? (S.pick===q.correct ? "Tama ang pinili ng team." : "Mali ang pinili ng team.") : "";
        acts=`<div class="reveal"><span>Sagot</span> <strong>${E(answerText(q))}</strong>${hint?`<em>${hint}</em>`:""}</div>
              <button class="btn" data-a="right">&#10003; Tama</button> <button class="btn ghost" data-a="wrong">&#10007; Mali</button>`;
      }
      h += `<section class="gcard"><p class="gq">${E(String(q.text||"").trim())}</p>
            ${q.image?`<img class="gimg" src="${E(q.image)}" alt="">`:""}${optHtml}<div class="gacts">${acts}</div></section>`;
    }
    else if(S.phase==="decide"){
      h += `<section class="gcard center"><p class="gq">Tamang sagot! May nakatagong gantimpala.</p>
            <p>Itatago ba ito ni Team ${S.turn+1} o ibibigay sa Team ${other()+1}?</p>
            <div class="gacts"><button class="btn" data-a="keep">KEEP IT</button> <button class="btn ghost" data-a="give">GIVE IT AWAY</button></div></section>`;
    }
    else if(S.phase==="result"){
      const r=S.result;
      h += `<section class="gcard center"><p class="gkind">${E(r.title)}</p><p class="gbig">${E(r.big)}</p>
            <p>${E(r.text)}</p><div class="gacts"><button class="btn" data-a="next">Susunod na Turn</button></div></section>`;
    }
    else if(S.phase==="final"){
      const [a,b]=S.scores, win = a===b ? "Tabla ang laro!" : `Panalo ang Team ${a>b?1:2}!`;
      h += `<section class="gcard center"><p class="gkind">Pangwakas na Resulta</p><p class="gbig">${E(win)}</p>
            <div class="gacts"><button class="btn" data-a="again">Maglaro Muli</button> <a class="btn ghost" href="#${E(g.id)}">Bumalik sa PALARO</a></div></section>`;
    }
    box.innerHTML = h;
  }

  function finishTurn(){
    S.used.add(S.slot);
    S.turn = other();
    S.phase = S.used.size>=S.order.length ? "final" : "grid";
    render();
  }

  function applyOutcome(o, target){
    const s=S.scores;
    if(o.kind==="plus"){ s[target]+=o.n; return `Nadagdagan ng ${o.n} puntos ang Team ${target+1}.`; }
    if(o.kind==="minus"){ s[target]=Math.max(0,s[target]-o.n); return `Nabawasan ng ${o.n} puntos ang Team ${target+1}.`; }
    if(o.kind==="swap"){ [s[0],s[1]]=[s[1],s[0]]; return "Nagpalitan ng score ang dalawang team!"; }
    s[target]=0; return `Nawala ang lahat ng puntos ng Team ${target+1}!`;
  }

  box.addEventListener("click", e=>{
    const b = e.target.closest("[data-a]"); if(!b || b.disabled) return;
    const a = b.dataset.a;
    if(a==="slot"){
      S.slot=+b.dataset.n; S.q=data[S.order[S.slot]]; S.pick=null; S.step=0; S.phase="ask"; render(); window.scrollTo(0,0);
    }
    else if(a==="pick"){ S.pick=+b.dataset.i; render(); }
    else if(a==="lock"){ S.step=1; render(); }
    else if(a==="reveal"){ S.step=2; render(); }
    else if(a==="right"){ S.phase="decide"; render(); }
    else if(a==="wrong"){
      const pts = MYSTERY[Math.floor(Math.random()*MYSTERY.length)];
      S.scores[other()] += pts;
      S.result = {title:"Mystery Box", big:"+"+pts, text:`Mali ang sagot. Nakakuha ng ${pts} libreng puntos ang Team ${other()+1}!`};
      S.phase="result"; render();
    }
    else if(a==="keep" || a==="give"){
      const o = parseOutcome(S.q.outcome), target = a==="keep" ? S.turn : other();
      const text = applyOutcome(o, target);
      S.result = {title: a==="keep" ? `Itinago ng Team ${S.turn+1}` : `Ibinigay ng Team ${S.turn+1} sa Team ${other()+1}`, big:o.big, text};
      S.phase="result"; render();
    }
    else if(a==="next"){ finishTurn(); }
    else if(a==="end"){ if(confirm("Tapusin na ang laro at ipakita ang resulta?")){ S.phase="final"; render(); } }
    else if(a==="again"){ window.playGame(g,it); }
  });
  render();
};
})();
