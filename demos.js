/* ============ INTERACTIVE DEMOS (one per case study) ============ */
const DEMOS = {
 "plantguard-ai": {
  title: "Try the report flow",
  note: "A simulation of the dialogue and validation logic with canned model output. The real app runs Qwen3-1.7B on the device.",
  html: `<div class="demo-grid"><div><p class="dlabel">The worker says</p><div class="dbtns" id="pg-btns"></div><div class="dtool" style="margin-top:12px"><button type="button" class="dreset" id="pg-reset">Reset</button></div></div>
    <div><div class="dterm" id="pg-log" aria-live="polite"></div><div class="dterm" id="pg-fields"></div></div></div>`,
  init(root){
    const empty = {type:"",location:"",time:"",severity:"",injuries:"",actions:""};
    let f = {...empty}, log = [];
    const steps = [
      {say:"Scaffold clamp came loose on level three, around nine.", set:{type:"loose scaffold clamp",location:"level 3",time:"around 9:00"}, ai:"Understood. Was anyone hurt, and how serious is it?"},
      {say:"No injuries. Pretty serious, we cleared the area.", set:{injuries:"none",severity:"high",actions:"area cleared"}, ai:"Report is complete. Want me to read it back?"},
      {say:"Change severity to critical.", set:{severity:"critical"}, ai:"Severity updated: high → critical."},
      {say:"Simulate a model mistake: it proposes “injuries: broken arm”.", bad:true, ai:"Validator: “broken arm” is not in the transcript. Field rejected, original value kept."}
    ];
    const btns = root.querySelector("#pg-btns"), L = root.querySelector("#pg-log"), F = root.querySelector("#pg-fields");
    btns.innerHTML = steps.map((s,i)=>`<button type="button" class="dbtn${s.bad?" warn":""}" data-i="${i}">${esc(s.say)}</button>`).join("");
    function draw(){
      L.innerHTML = log.length ? log.map(x=>`<span class="bub ${x.who}">${esc(x.t)}</span>`).join("") : '<span class="empty" style="color:var(--term-dim)">Press a button to speak. The assistant listens, asks a follow-up and fills the report.</span>';
      F.innerHTML = Object.keys(empty).map(k=>`<div class="row"><span>${k}</span><span>${f[k]?esc(f[k]):'<span class="empty">—</span>'}</span></div>`).join("");
    }
    btns.addEventListener("click", e=>{
      const b = e.target.closest("button"); if(!b) return; const s = steps[+b.dataset.i];
      log.push({who:"me",t:s.bad?"(model output) injuries: broken arm":s.say}, {who:"ai",t:s.ai});
      if(s.set) Object.assign(f,s.set);
      b.classList.add("done"); draw();
    });
    root.querySelector("#pg-reset").addEventListener("click", ()=>{ f={...empty}; log=[]; btns.querySelectorAll("button").forEach(b=>b.classList.remove("done")); draw(); });
    draw();
  }
 },
 "finsaarthi": {
  title: "Try the SMS parser",
  note: "A simplified demo of the idea: amount, direction and category from a bank SMS. It is not the production parser, and the sample numbers are made up.",
  html: `<div class="demo-grid"><div><p class="dlabel">Pick or paste a bank SMS</p><div class="dbtns" id="fs-btns"></div>
    <textarea class="dtext" id="fs-in" aria-label="Bank SMS text" style="margin-top:10px"></textarea>
    <div class="dtool" style="margin-top:10px"><button type="button" class="dbtn" id="fs-go">Parse it</button></div></div>
    <div><div class="dterm" id="fs-out" aria-live="polite"></div></div></div>`,
  init(root){
    const samples = [
      "Rs.4,250.00 credited to A/c XX4821 by UPI/Meena Kirana. Avl bal Rs.31,820",
      "Rs.18,000.00 debited from A/c XX4821 to RENT/Sharma Properties via NEFT",
      "INR 1,820.50 spent at BESCOM electricity bill on card XX9921"
    ];
    const btns = root.querySelector("#fs-btns"), inp = root.querySelector("#fs-in"), out = root.querySelector("#fs-out");
    btns.innerHTML = samples.map((t,i)=>`<button type="button" class="dbtn" data-i="${i}">Sample ${i+1}</button>`).join("");
    function parse(t){
      const m = t.match(/(?:rs\.?|inr)\s*([\d,]+(?:\.\d+)?)/i);
      if(!m) return null;
      const amt = parseFloat(m[1].replace(/,/g,""));
      const inc = /credited|received|deposited/i.test(t), exp = /debited|spent|paid|withdrawn|sent/i.test(t);
      const dir = inc?"income":exp?"expense":"unknown";
      let cat = "Other";
      if(/rent/i.test(t)) cat="Rent"; else if(/bescom|electric|water|bill|gas/i.test(t)) cat="Utilities"; else if(inc && /upi/i.test(t)) cat="Customer sales";
      return {amt,dir,cat};
    }
    function show(){
      const r = parse(inp.value);
      out.innerHTML = r ? `<div class="row"><span>amount</span><span>₹ ${r.amt.toLocaleString("en-IN")}</span></div><div class="row"><span>direction</span><span>${r.dir}</span></div><div class="row"><span>category</span><span>${r.cat}</span></div><div class="row"><span>saved to</span><span>${r.dir==="unknown"?"needs review":"ledger"}</span></div>` : '<span class="bad">No amount found. The app keeps this message for review instead of guessing.</span>';
    }
    btns.addEventListener("click", e=>{ const b=e.target.closest("button"); if(!b) return; inp.value = samples[+b.dataset.i]; show(); });
    root.querySelector("#fs-go").addEventListener("click", show);
    inp.value = samples[0]; show();
  }
 },
 "hindi-nepali-llm": {
  title: "Explore the tokenizer finding",
  note: "The fertility values (2.73 at 8k, 2.37 at 65k) and the 45% space share are from the project. The 128-cell grid shows the proportion; it is not the real token sequence.",
  html: `<div class="demo-grid"><div><p class="dlabel">Vocabulary size: tokens per word (fertility)</p><div class="dbtns" id="hn-btns"></div>
    <div class="big2" id="hn-val" style="margin-top:14px"></div><div class="fertbar" style="margin-top:8px"><i id="hn-bar"></i></div></div>
    <div><p class="dlabel">128-token context, 45% spent on spaces</p><div class="cells" id="hn-cells" aria-hidden="true"></div>
    <div class="dtool" style="margin-top:12px"><button type="button" class="dbtn" id="hn-toggle" aria-pressed="false">Show wasted tokens</button></div>
    <p class="desc" id="hn-note" style="margin-top:10px"></p></div></div>`,
  init(root){
    const opts = [["8k vocab",2.73],["65k vocab",2.37]];
    const btns = root.querySelector("#hn-btns"), val = root.querySelector("#hn-val"), bar = root.querySelector("#hn-bar");
    btns.innerHTML = opts.map((o,i)=>`<button type="button" class="dbtn" data-i="${i}" aria-pressed="${i===0}">${o[0]}</button>`).join("");
    function pick(i){ btns.querySelectorAll("button").forEach((b,j)=>b.setAttribute("aria-pressed",j===i)); val.textContent = opts[i][1].toFixed(2)+" tokens per word"; bar.style.width = (opts[i][1]/3*100)+"%"; }
    btns.addEventListener("click", e=>{ const b=e.target.closest("button"); if(b) pick(+b.dataset.i); });
    pick(0);
    const cells = root.querySelector("#hn-cells"); let h="";
    for(let i=0;i<128;i++){ h+=`<i class="${i%20<9||(i%20===9&&i%3===0)?"sp":""}"></i>`; }
    cells.innerHTML = h;
    const tg = root.querySelector("#hn-toggle"), note = root.querySelector("#hn-note");
    note.textContent = "Lots of the context window went to spaces, so the model saw far less text than the 128-token budget suggests.";
    tg.addEventListener("click", ()=>{ const on = cells.classList.toggle("show"); tg.setAttribute("aria-pressed",on); tg.textContent = on?"Hide wasted tokens":"Show wasted tokens"; });
  }
 },
 "apache-roller": {
  title: "Try the save pipeline",
  note: "A simulation of the pipeline with canned LLM output. In the real app each step calls a configured LLM.",
  html: `<div class="demo-grid"><div><p class="dlabel">Admin console</p><div id="ar-steps" style="display:grid;gap:8px"></div>
    <label class="dcheck" style="margin-top:12px"><input type="checkbox" id="ar-down"> Simulate an LLM outage</label>
    <div class="dtool" style="margin-top:12px"><button type="button" class="dbtn" id="ar-pub">Publish post</button></div></div>
    <div><p class="dlabel">Draft</p><div class="dterm" id="ar-draft"></div><p class="dlabel" style="margin-top:12px">Published</p><div class="dterm" id="ar-out" aria-live="polite"></div></div></div>`,
  init(root){
    const draft = "this is a damn good guide to composting, read it all";
    const steps = [["profanity","Profanity rewrite",t=>t.replace("damn good","really good").replace(/^this/,"This")],["summary","Summary",null],["tags","Tags",null],["mood","Mood",null]];
    const extra = {summary:"A practical guide to composting at home.",tags:"#composting #gardening #howto",mood:"upbeat"};
    const st = {profanity:true,summary:true,tags:true,mood:false};
    const box = root.querySelector("#ar-steps");
    box.innerHTML = steps.map(s=>`<label class="dcheck"><input type="checkbox" data-k="${s[0]}" ${st[s[0]]?"checked":""}> ${s[1]}</label>`).join("");
    root.querySelector("#ar-draft").textContent = draft;
    const out = root.querySelector("#ar-out"), down = root.querySelector("#ar-down");
    function publish(){
      box.querySelectorAll("input").forEach(i=>st[i.dataset.k]=i.checked);
      let html = "", text = draft;
      if(down.checked){
        out.innerHTML = `<div class="bad">LLM unavailable.</div><div class="good">Original text kept, post published anyway.</div><div style="margin-top:8px">${esc(draft)}</div>`; return;
      }
      if(st.profanity) text = steps[0][2](draft);
      html = `<div>${esc(text)}</div>`;
      ["summary","tags","mood"].forEach(k=>{ if(st[k]) html += `<div class="row"><span>${k}</span><span>${esc(extra[k])}</span></div>`; });
      out.innerHTML = html;
    }
    root.querySelector("#ar-pub").addEventListener("click", publish);
    publish();
  }
 },
 "drone-digital-twin": {
  title: "Walk the validation ladder",
  note: "Numbers are from the project. Pick a rung to see what it proves.",
  html: `<div class="dbtns" id="dr-btns" role="group" aria-label="Validation stage"></div><div class="dterm" id="dr-out" aria-live="polite"></div><ul class="bars" id="dr-bar" style="margin:0"></ul>`,
  init(root){
    const st = [
      ["Twin","90% similarity","Rebuilt in Gazebo and ArduPilot from measured dimensions and inertia, tuned with Monte Carlo simulation until it matched the real platform.",90,100],
      ["Simulation","400+ tests","Controllers are pushed through failure scenarios in simulation first, where a crash costs nothing.",400,500],
      ["Real flights","100+ tests","Controllers that pass in simulation are validated on the real aircraft.",100,500],
      ["GPS-denied","500 m","Visual servoing on the physical drone with no GPS, the end goal of the whole chain.",500,500]
    ];
    const btns = root.querySelector("#dr-btns"), out = root.querySelector("#dr-out"), bar = root.querySelector("#dr-bar");
    btns.innerHTML = st.map((s,i)=>`<button type="button" class="dbtn" data-i="${i}" aria-pressed="${i===0}">${s[0]}</button>`).join("");
    function pick(i){ btns.querySelectorAll("button").forEach((b,j)=>b.setAttribute("aria-pressed",j===i)); const s=st[i];
      out.innerHTML = `<div class="big2" style="color:var(--term-accent)">${s[1]}</div><div style="margin-top:6px">${esc(s[2])}</div>`;
      bar.innerHTML = `<li><span>${s[0]}</span><span class="track"><i style="width:${s[3]/s[4]*100}%"></i></span><b>${s[1]}</b></li>`; }
    btns.addEventListener("click", e=>{ const b=e.target.closest("button"); if(b) pick(+b.dataset.i); });
    pick(0);
  }
 },
 "wind-correction": {
  title: "Compare raw and corrected forecasts",
  note: "Error is shown as an index: the raw forecast's error is 100. The 16.8% improvement is the project's result.",
  html: `<div class="dbtns" id="wd-btns" role="group" aria-label="Forecast"></div><div class="dterm" id="wd-out" aria-live="polite"></div><ul class="bars" id="wd-bar" style="margin:0"></ul>`,
  init(root){
    const o = [["Raw forecast",100,"The forecast wind speed as published, before any correction."],["XGBoost-corrected",83.2,"The same forecast after the learned correction: 16.8% less error across 10 Indian terrains."]];
    const btns = root.querySelector("#wd-btns"), out = root.querySelector("#wd-out"), bar = root.querySelector("#wd-bar");
    btns.innerHTML = o.map((s,i)=>`<button type="button" class="dbtn" data-i="${i}" aria-pressed="${i===0}">${s[0]}</button>`).join("");
    function pick(i){ btns.querySelectorAll("button").forEach((b,j)=>b.setAttribute("aria-pressed",j===i)); const s=o[i];
      out.innerHTML = `<div class="big2" style="color:var(--term-accent)">${s[1]}</div><div style="margin-top:6px">${esc(s[2])}</div>`;
      bar.innerHTML = o.map((x,j)=>`<li><span>${x[0]}</span><span class="track"><i style="width:${x[1]}%;${j===i?"":"opacity:.35"}"></i></span><b>${x[1]}</b></li>`).join(""); }
    btns.addEventListener("click", e=>{ const b=e.target.closest("button"); if(b) pick(+b.dataset.i); });
    pick(0);
  }
 }
};
