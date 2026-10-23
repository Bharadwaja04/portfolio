/* ============ RENDER (data lives in data.js, demos in demos.js) ============ */
const $ = (s, r=document) => r.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const NAV = [["about","About"],["skills","Skills"],["projects","Projects"],["open-source","Open source"],["experience","Experience"],["contact","Contact"]];

function art(kind){
  const A = "#F2B24B", G = "#8FD3A4", D = "#6F7D8A", L = "#D6DDE4";
  const wrap = inner => `<svg viewBox="0 0 640 360" role="img" aria-label="Illustration of the project" preserveAspectRatio="xMidYMid slice"><rect width="640" height="360" fill="#0D141B"/>${inner}</svg>`;
  if(kind==="phone") return wrap(`
    <rect x="228" y="24" width="184" height="312" rx="26" fill="#131C25" stroke="#2A3745" stroke-width="3"/>
    <rect x="248" y="58" width="120" height="30" rx="8" fill="#22303D"/><rect x="272" y="100" width="120" height="30" rx="8" fill="#2D2614"/>
    <rect x="248" y="142" width="132" height="30" rx="8" fill="#22303D"/>
    <g font-family="monospace" font-size="11" fill="${D}"><text x="252" y="196">type      gas leak</text><text x="252" y="214">location  loading dock</text><text x="252" y="232" fill="${A}">severity  high</text></g>
    <circle cx="320" cy="296" r="20" fill="${A}"/><rect x="314" y="285" width="12" height="18" rx="6" fill="#0D141B"/>
    <g stroke="${G}" stroke-width="3" stroke-linecap="round" opacity=".8"><path d="M96 170v20M114 155v50M132 168v24M150 146v68M168 162v36"/><path d="M472 170v20M490 150v60M508 164v32M526 140v80M544 160v40"/></g>`);
  if(kind==="chart") return wrap(`
    <g stroke="#22303D"><path d="M60 80H580M60 140H580M60 200H580M60 260H580"/></g>
    <g fill="${A}"><rect x="84" y="170" width="34" height="90"/><rect x="142" y="130" width="34" height="130"/><rect x="200" y="150" width="34" height="110"/><rect x="258" y="100" width="34" height="160"/><rect x="316" y="140" width="34" height="120"/></g>
    <g fill="none" stroke="${G}" stroke-width="4" stroke-dasharray="8 7"><path d="M350 150L400 128 450 170 500 110 556 94"/></g>
    <g fill="${G}"><circle cx="400" cy="128" r="5"/><circle cx="450" cy="170" r="5"/><circle cx="500" cy="110" r="5"/><circle cx="556" cy="94" r="5"/></g>
    <text x="360" y="292" font-family="monospace" font-size="13" fill="${D}">7-day forecast</text>`);
  if(kind==="tokens") {
    let s="", words=["▁है","▁में","ने","▁का","▁की","▁और","▁से","▁यह","▁को","▁पर","▁नहीं","▁था"];
    words.forEach((w,i)=>{const x=50+(i%4)*140,y=60+Math.floor(i/4)*54;s+=`<rect x="${x}" y="${y}" width="124" height="38" rx="6" fill="#131C25" stroke="${i%5===0?A:'#2A3745'}"/><text x="${x+62}" y="${y+25}" text-anchor="middle" font-family="sans-serif" font-size="17" fill="${L}">${w}</text>`});
    return wrap(s+`<g font-family="monospace" font-size="13" fill="${D}"><text x="50" y="270">vocab 31,744</text><text x="50" y="294">params 25.3M</text><text x="300" y="270" fill="${A}">perplexity 12.8 / 13.5</text><text x="300" y="294">~500M tokens per language</text></g>`);
  }
  if(kind==="drone") return wrap(`
    <g stroke="#2A3745" fill="none"><path d="M60 300H580M60 250H580" /></g>
    <g fill="#131C25" stroke="${A}" stroke-width="2"><rect x="90" y="120" width="170" height="110" rx="12"/><rect x="380" y="120" width="170" height="110" rx="12" stroke="${G}"/></g>
    <g font-family="monospace" font-size="13" fill="${L}"><text x="175" y="160" text-anchor="middle">Gazebo twin</text><text x="465" y="160" text-anchor="middle">real drone</text></g>
    <g font-family="monospace" font-size="12" fill="${D}"><text x="175" y="190" text-anchor="middle">400+ tests</text><text x="465" y="190" text-anchor="middle">100+ tests</text></g>
    <path d="M262 175h116" stroke="${A}" stroke-width="3" stroke-dasharray="6 6"/><text x="320" y="160" text-anchor="middle" font-family="monospace" font-size="13" fill="${A}">90%</text>
    <g stroke="${L}" stroke-width="3" stroke-linecap="round"><path d="M300 40l20 14 20-14M320 54v22"/></g><text x="320" y="96" text-anchor="middle" font-family="monospace" font-size="12" fill="${D}">500 m, no GPS</text>
    <text x="90" y="282" font-family="monospace" font-size="13" fill="${D}">Monte Carlo tuning → hardware validation</text>`);
  if(kind==="wind") return wrap(`
    <g stroke="#22303D"><path d="M60 80H580M60 140H580M60 200H580M60 260H580"/></g>
    <path d="M60 210C130 110 190 270 260 170S400 240 470 120 560 190 580 150" fill="none" stroke="${D}" stroke-width="3"/>
    <path d="M60 200C130 130 190 235 260 180S400 220 470 135 560 175 580 160" fill="none" stroke="${A}" stroke-width="4"/>
    <g font-family="monospace" font-size="13"><text x="70" y="300" fill="${D}">raw forecast</text><text x="230" y="300" fill="${A}">corrected</text><text x="380" y="300" fill="${G}">-16.8% error</text></g>`);
  return wrap(`
    ${[0,1,2,3].map(i=>`<rect x="${40+i*148}" y="120" width="120" height="70" rx="10" fill="#131C25" stroke="${i===3?G:A}" stroke-width="2"/><text x="${100+i*148}" y="161" text-anchor="middle" font-family="monospace" font-size="13" fill="${L}">${["profanity","summary","tags","mood"][i]}</text>${i<3?`<path d="M${164+i*148} 155h20" stroke="${A}" stroke-width="3"/>`:""}`).join("")}
    <g font-family="monospace" font-size="13" fill="${D}"><text x="40" y="232">toggle each step in the admin console</text><text x="40" y="256" fill="${G}">on error: keep the original text</text></g>
    <text x="40" y="86" font-family="monospace" font-size="14" fill="${A}">onSave(post) →</text>`);
}

function card(p){
  const m = p.metric;
  return `<article class="card" data-cat="${p.cat.join(" ")}">
    <div class="art" aria-hidden="true">${art(p.art)}</div>
    <div class="body">
      <h3><a href="#case-${p.id}">${esc(p.title)}</a></h3>
      <p class="outcome">${esc(p.outcome)}</p>
      <dl class="pao"><div><dt>Problem</dt><dd>${esc(p.biz)}</dd></div><div><dt>Approach</dt><dd>${esc(p.approach)}</dd></div></dl>
      <div class="metric"><div class="big">${esc(m.big)}</div><div class="mlabel">${esc(m.label)}</div>
        <ul class="bars" aria-label="Key result">${m.bars.map(b=>`<li><span>${esc(b[0])}</span><span class="track"><i style="width:${Math.max(2,Math.round(b[1]/b[2]*100))}%"></i></span><b>${b[1]}</b></li>`).join("")}</ul></div>
      <ul class="tags" aria-label="Tech stack">${p.tags.map(t=>`<li>${esc(t)}</li>`).join("")}</ul>
      <div class="links">
        <a class="cs" href="#case-${p.id}">Case study${DEMOS[p.id]?" + demo":""}</a>
        ${p.repo?`<a href="${p.repo}" target="_blank" rel="noopener">GitHub</a>`:`<span class="status">Private repo</span>`}
        ${p.demo?`<a href="${p.demo}" target="_blank" rel="noopener">Live demo</a>`:""}
      </div>
    </div>
  </article>`;
}

function homeHTML(){
  const P = PERSON;
  return `
  <section class="hero wrap" id="top" aria-labelledby="h1">
    <div class="hero-grid">
      <div>
        <p class="eyebrow">Developer portfolio · ${esc(P.location)}</p>
        <h1 id="h1">Hi, I'm <span>${esc(P.first)}</span></h1>
        <div class="roles" aria-label="Roles: ${esc(P.roles.join(", "))}"><span class="pre">&gt; I'm a</span><span><span id="typed">${esc(P.roles[0])}</span><span class="caret" aria-hidden="true"></span></span></div>
        <p class="intro">${esc(P.intro)}</p>
        <div class="cta-row">
          <a class="btn primary" href="#projects">View projects</a>
          <a class="btn ghost" href="#contact">Get in touch</a>
        </div>
        <div class="socials">
          <a href="${P.github}" target="_blank" rel="noopener">GitHub</a>
          <a href="${P.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
          <a href="#contact">Email</a>
        </div>
      </div>
      <div class="term" role="img" aria-label="Terminal showing a short profile of Bharadwaja as JSON">
        <div class="term-bar"><b></b><b></b><b></b><span>~/bharadwaja — zsh</span></div>
<pre><span class="t-p">$</span> cat builder.json
{
  <span class="t-k">"name"</span>: <span class="t-s">"Bharadwaja Vadali"</span>,
  <span class="t-k">"based_in"</span>: <span class="t-s">"Hyderabad"</span>,
  <span class="t-k">"studying"</span>: <span class="t-s">"M.Tech, IIIT Hyderabad"</span>,
  <span class="t-k">"building"</span>: [<span class="t-s">"CodeMind"</span>],
  <span class="t-k">"ships"</span>: [<span class="t-s">"on-device LLMs"</span>, <span class="t-s">"ML models"</span>],
  <span class="t-k">"open_to"</span>: <span class="t-s">"connections, experience, opportunities"</span>
}
<span class="t-p">$</span> ls projects/
<span class="t-d">plantguard-ai/   drone-digital-twin/  wind-correction/
finsaarthi/     hindi-nepali-llm/    apache-roller/
codemind/ (in progress)</span>
<span class="t-p">$</span> <span class="caret" aria-hidden="true"></span></pre>
      </div>
    </div>
    <div class="stats" role="list">${STATS.map(s=>`<div class="stat" role="listitem"><b>${esc(s.v)}</b><span>${esc(s.l)}</span></div>`).join("")}</div>
  </section>

  <section class="section wrap" id="about" aria-labelledby="about-h">
    <div class="sec-head"><p class="eyebrow">About</p><h2 id="about-h">AI/ML engineer who builds things end to end</h2></div>
    <div class="about-grid">
      <div>
        <p>I'm an AI/ML engineer based in Hyderabad, pursuing an M.Tech in Product Design and Management at IIIT Hyderabad, after a B.Tech in Computer Science. I like taking a problem from raw data to something people can use, and measuring the result against a baseline.</p>
        <p>At Terrablue XT I built a drone digital twin and validated flight controllers in simulation and on hardware. Outside work I train models from scratch, add LLM features to real applications and ship full-stack products.</p>
      </div>
      <aside class="now" aria-labelledby="now-h">
        <h3 id="now-h">// now</h3>
        <ul>
          <li><span>Studying</span><span>M.Tech, IIIT Hyderabad</span></li>
          <li><span>Building</span><span>CodeMind</span></li>
          <li><span>Last role</span><span>AI Engineer, Terrablue XT</span></li>
          <li><span>Looking for</span><span>People to connect with, and share experience and opportunities</span></li>
        </ul>
      </aside>
    </div>
  </section>

  <section class="section wrap" id="skills" aria-labelledby="skills-h">
    <div class="sec-head"><p class="eyebrow">Skills</p><h2 id="skills-h">What I build with</h2><p class="lede">What I work with. Each skill links to the project or code that shows it.</p></div>
    <div class="skill-cats">${SKILLS.map(c=>`<div class="cat"><h3>${esc(c.cat)}</h3><ul class="sk">${c.items.map(i=>`<li><b>${esc(i.n)}</b><ul class="proof">${i.p.map(p=>`<li>${p[1]?`<a href="${p[1]}"${p[1].startsWith("http")?' target="_blank" rel="noopener"':""}>${esc(p[0])}</a>`:esc(p[0])}</li>`).join("")}</ul></li>`).join("")}</ul></div>`).join("")}</div>
    <p class="exposure"><strong>Exposure through projects:</strong> ${EXPOSURE.join(", ")}.</p>
  </section>

  <section class="section wrap" id="projects" aria-labelledby="proj-h">
    <div class="sec-head"><p class="eyebrow">Projects</p><h2 id="proj-h">Selected work</h2><p class="lede">Six projects, each with the business problem, the approach and a number. Filter by area, open a case study, and try the interactive demos inside.</p></div>
    <div class="filters" role="group" aria-label="Filter projects">${FILTERS.map((f,i)=>`<button type="button" class="fbtn" data-f="${f[0]}" aria-pressed="${i===0}">${esc(f[1])}</button>`).join("")}</div>
    <p class="count" id="count" role="status" aria-live="polite"></p>
    <div class="grid" id="grid">${PROJECTS.map(card).join("")}</div>
    <div class="more"><h3>More I've built</h3><ul>${MORE.map(m=>`<li>${m.u?`<a href="${m.u}" target="_blank" rel="noopener">${esc(m.t)}</a>`:`<strong>${esc(m.t)}</strong>`}<span>${esc(m.d)}</span></li>`).join("")}</ul></div>
  </section>

  <section class="section wrap" id="open-source" aria-labelledby="os-h">
    <div class="sec-head"><p class="eyebrow">Open source</p><h2 id="os-h">Code in the open</h2></div>
    <div class="os">
      <div class="panel"><h3>Notable work</h3><ul class="log">${NOTES.map(n=>`<li><b>${esc(n.t)}</b><span>${esc(n.b)}</span></li>`).join("")}</ul></div>
      <div class="panel"><h3>Follow along on GitHub</h3><p class="desc">My live contribution graph and every repository are on my GitHub profile. It updates as I commit, so it shows what I'm working on this week.</p><div class="cta-row"><a class="btn primary" href="${PERSON.github}" target="_blank" rel="noopener">View GitHub profile</a></div></div>
    </div>
  </section>

  <section class="section wrap" id="experience" aria-labelledby="exp-h">
    <div class="sec-head"><p class="eyebrow">Experience</p><h2 id="exp-h">Where I've worked and studied</h2></div>
    <ol class="tl">${EXPERIENCE.map(e=>`<li><span class="when">${esc(e.when)}</span><h3>${esc(e.role)}</h3><div class="org">${esc(e.org)} · ${esc(e.place)}</div><p>${esc(e.text)}</p><ul class="tags" style="margin-top:12px">${e.tech.map(t=>`<li>${esc(t)}</li>`).join("")}</ul></li>`).join("")}</ol>
  </section>

  <section class="section wrap" id="contact" aria-labelledby="contact-h">
    <div class="contact">
      <div>
        <p class="eyebrow" style="color:var(--term-accent)">Contact</p>
        <h2 id="contact-h">Let's connect</h2>
        <p>I'd like to meet people who are happy to share their experience and any opportunities they know of. Tell me what you're working on.</p>
        <div class="mail"><code id="mailtext">${esc(PERSON.email)}</code><button type="button" id="copy">Copy email</button><span id="copied" class="ok" role="status" aria-live="polite"></span></div>
        <ul class="kinds"><li>Opportunity: send the role and what it involves.</li><li>Experience: tell me what you learned building something similar.</li><li>Collaboration: send the problem you are working on.</li></ul>
        <p style="font-size:.9rem">I usually reply within two days.</p>
      </div>
      <form id="form" novalidate>
        <div><label for="f-name">Name</label><input id="f-name" name="name" autocomplete="name" required></div>
        <div><label for="f-email">Your email</label><input id="f-email" name="email" type="email" autocomplete="email" required></div>
        <div><label for="f-kind">What's this about?</label><select id="f-kind"><option>Opportunity</option><option>Experience and advice</option><option>Collaboration</option><option>Something else</option></select></div>
        <div><label for="f-msg">Message</label><textarea id="f-msg" name="message" required placeholder="What are you building?"></textarea></div>
        <button class="btn primary" type="submit">Write my email</button>
        <p class="form-note" id="form-note">This opens your mail app with the message filled in. If nothing opens, copy the text that appears and send it to the address on the left.</p>
        <div id="draft" hidden></div>
      </form>
    </div>
  </section>
}

function caseHTML(p){
  const idx = PROJECTS.indexOf(p), nx = PROJECTS[(idx+1)%PROJECTS.length];
  return `<article class="case wrap" aria-labelledby="cs-h">
    <p class="crumbs"><a href="#projects">← All projects</a> / case study</p>
    <h1 id="cs-h">${esc(p.title)}</h1>
    <p class="sub">${esc(p.sub)}</p>
    <dl class="facts">${p.facts.map(f=>`<div><dt>${esc(f[0])}</dt><dd>${esc(f[1])}</dd></div>`).join("")}</dl>
    <div class="cta-row" style="margin-top:22px">${p.repo?`<a class="btn primary" href="${p.repo}" target="_blank" rel="noopener">View code on GitHub</a>`:`<span class="status" style="align-self:center">Code is in a private repository</span>`}${p.demo?`<a class="btn ghost" href="${p.demo}" target="_blank" rel="noopener">Open live demo</a>`:""}</div>
    <section class="cs-sec" aria-labelledby="c1"><h2 id="c1">Problem and context</h2>${p.problem.map(t=>`<p>${esc(t)}</p>`).join("")}</section>
    <section class="cs-sec" aria-labelledby="c2"><h2 id="c2">Constraints and tradeoffs</h2><div class="tradeoffs">${p.constraints.map(c=>`<div><b>${esc(c[0])}</b><span>${esc(c[1])}</span></div>`).join("")}</div></section>
    <section class="cs-sec" aria-labelledby="c3"><h2 id="c3">How it fits together</h2><div class="flow" role="list">${p.flow.map((n,i)=>`<div class="node${i<p.flow.length-1?" arrow":""}" role="listitem"><b>${esc(n[0])}</b><span>${esc(n[1])}</span></div>`).join("")}</div></section>
    ${DEMOS[p.id]?`<section class="cs-sec" aria-labelledby="c3b"><h2 id="c3b">${esc(DEMOS[p.id].title)}</h2><div class="demo" id="demo">${DEMOS[p.id].html}</div><p class="ill">${esc(DEMOS[p.id].note)}</p></section>`:""}
    <section class="cs-sec" aria-labelledby="c4"><h2 id="c4">${p.illustrative?"UI states":"Key numbers in context"}</h2><div class="states">${p.states.map(s=>`<figure class="state"><div class="mock">${s.html}</div><figcaption>${esc(s.cap)}</figcaption></figure>`).join("")}</div>${p.illustrative?`<p class="ill">Illustrative mock-ups drawn for this page. Real screenshots live in the repository.</p>`:""}</section>
    <section class="cs-sec" aria-labelledby="c5"><h2 id="c5">Results</h2><div class="results">${p.results.map(r=>`<div class="result"><b>${esc(r[0])}</b><span>${esc(r[1])}</span></div>`).join("")}</div></section>
    <section class="cs-sec" aria-labelledby="c6"><h2 id="c6">What I learned</h2><ul class="plain">${p.lessons.map(l=>`<li>${esc(l)}</li>`).join("")}</ul></section>
    <div class="next"><a class="btn ghost" href="#projects">← Back to projects</a><a class="btn primary" href="#case-${nx.id}">Next: ${esc(nx.title)} →</a></div>
  </article>`;
}

/* ============ BEHAVIOUR ============ */
const home = $("#home"), caseEl = $("#case");
home.innerHTML = homeHTML();

/* project filters */
function initFilters(){
  const fb = document.querySelectorAll(".fbtn"), cards = document.querySelectorAll("#grid .card"), count = document.getElementById("count");
  function apply(f){
    let n = 0;
    cards.forEach(c=>{ const ok = f==="all" || c.dataset.cat.split(" ").includes(f); c.hidden = !ok; if(ok) n++; });
    fb.forEach(b=>b.setAttribute("aria-pressed", b.dataset.f===f));
    count.textContent = `Showing ${n} of ${cards.length} projects`;
  }
  fb.forEach(b=>b.addEventListener("click",()=>apply(b.dataset.f)));
  apply("all");
}

initFilters();
$("#navlist").innerHTML = NAV.map(n=>`<li><a href="#${n[0]}" data-n="${n[0]}">${n[1]}</a></li>`).join("");

function route(){
  const h = location.hash.slice(1);
  const p = h.startsWith("case-") && PROJECTS.find(x=>"case-"+x.id===h);
  if(p){
    caseEl.innerHTML = caseHTML(p); caseEl.hidden = false; home.hidden = true;
    document.title = p.title + " case study | Bharadwaja Vadali";
    window.scrollTo(0,0); $("#main").focus({preventScroll:true});
    if(DEMOS[p.id]) DEMOS[p.id].init($("#demo"));
  } else {
    const wasCase = !caseEl.hidden;
    caseEl.hidden = true; home.hidden = false; caseEl.innerHTML = "";
    document.title = "Bharadwaja Vadali";
    if(wasCase){ const t = h && document.getElementById(h); (t||document.getElementById("top")).scrollIntoView(); }
  }
  closeMenu();
}
window.addEventListener("hashchange", route);

/* menu */
const nav = $("#nav"), menu = $("#menu");
function closeMenu(){ nav.classList.remove("open"); menu.setAttribute("aria-expanded","false"); menu.setAttribute("aria-label","Open menu"); }
menu.addEventListener("click", ()=>{ const o = nav.classList.toggle("open"); menu.setAttribute("aria-expanded", o); menu.setAttribute("aria-label", o?"Close menu":"Open menu"); });
document.addEventListener("keydown", e=>{ if(e.key==="Escape"){ closeMenu(); menu.focus(); } });

/* theme */
$("#theme").addEventListener("click", ()=>{
  const r = document.documentElement;
  const dark = r.getAttribute("data-theme")==="dark" || (!r.getAttribute("data-theme") && matchMedia("(prefers-color-scheme: dark)").matches);
  r.setAttribute("data-theme", dark ? "light" : "dark");
});

/* typing effect (static text first role under reduced motion) */
(function(){
  const el = $("#typed"); if(!el) return;
  if(matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let i = 0, j = PERSON.roles[0].length, del = true;
  function tick(){
    if(del){ j--; if(j<=0){ del=false; i=(i+1)%PERSON.roles.length; j=0; } }
    else { j++; if(j>=PERSON.roles[i].length){ del=true; el.textContent=PERSON.roles[i]; return setTimeout(tick,1800); } }
    el.textContent = PERSON.roles[i].slice(0,j);
    setTimeout(tick, del?35:65);
  }
  setTimeout(tick,1800);
})();

/* active nav link while scrolling */
if("IntersectionObserver" in window){
  const links = [...document.querySelectorAll("nav a")];
  const io = new IntersectionObserver(es=>{ es.forEach(e=>{ if(e.isIntersecting){ links.forEach(a=>a.removeAttribute("aria-current")); const a = links.find(x=>x.dataset.n===e.target.id); if(a) a.setAttribute("aria-current","true"); } }); },{rootMargin:"-40% 0px -55% 0px"});
  NAV.forEach(n=>{ const s = document.getElementById(n[0]); if(s) io.observe(s); });
}

/* contact */
$("#copy").addEventListener("click", async ()=>{
  const out = $("#copied");
  try{ await navigator.clipboard.writeText(PERSON.email); out.textContent = "Copied"; }
  catch(e){ const r = document.createRange(); r.selectNodeContents($("#mailtext")); const s = getSelection(); s.removeAllRanges(); s.addRange(r); out.textContent = "Selected, press copy"; }
  setTimeout(()=>out.textContent="",2500);
});
$("#form").addEventListener("submit", e=>{
  e.preventDefault();
  const n = $("#f-name").value.trim(), em = $("#f-email").value.trim(), m = $("#f-msg").value.trim(), k = $("#f-kind").value;
  const d = $("#draft");
  if(!n || !/^\S+@\S+\.\S+$/.test(em) || !m){ d.hidden=false; d.innerHTML = '<p class="form-note" role="alert">Add your name, a valid email and a message first.</p>'; return; }
  const subject = `${k}: message from ${n}`, body = `${m}\n\n${n}\n${em}`;
  d.hidden = false;
  d.innerHTML = `<label>Draft (copy this if your mail app doesn't open)</label><textarea id="draft-text" readonly rows="6"></textarea><p style="margin-top:10px"><a class="btn ghost" id="mailto" style="color:#fff;border-color:rgba(255,255,255,.3);background:transparent">Open in mail app</a></p>`;
  $("#draft-text").value = `To: ${PERSON.email}\nSubject: ${subject}\n\n${body}`;
  $("#mailto").href = `mailto:${PERSON.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

route();

/* cursor effect: fine pointers only, off for reduced motion */
(function(){
  if(!matchMedia("(hover:hover) and (pointer:fine)").matches || matchMedia("(prefers-reduced-motion:reduce)").matches) return;
  const root = document.documentElement; root.classList.add("fx");
  const cv = document.createElement("canvas"); cv.className = "fx-canvas"; cv.setAttribute("aria-hidden","true"); document.body.appendChild(cv);
  const ctx = cv.getContext("2d");
  const cur = document.createElement("div"); cur.className = "fx-cur"; cur.setAttribute("aria-hidden","true");
  cur.innerHTML = '<svg viewBox="0 0 34 34" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="17" cy="17" r="9"/><path d="M17 2v8M17 24v8M2 17h8M24 17h8"/><circle cx="17" cy="17" r="2" fill="currentColor" stroke="none"/></svg><span class="lab">x:0 y:0</span>';
  document.body.appendChild(cur);
  const lab = cur.querySelector(".lab");
  let dpr = 1, W = 0, H = 0;
  function size(){ dpr = Math.min(2, devicePixelRatio||1); W = innerWidth; H = innerHeight; cv.width = W*dpr; cv.height = H*dpr; ctx.setTransform(dpr,0,0,dpr,0,0); }
  size(); addEventListener("resize", size);
  const bits = []; let lx = -999, ly = -999, running = false, mx = 0, my = 0, tick = 0;
  function spawn(x,y){
    for(let i=0;i<2;i++){
      bits.push({x:x+(Math.random()-.5)*26, y:y+(Math.random()-.5)*26, vx:(Math.random()-.5)*.5, vy:-.15-Math.random()*.4, life:0, max:700+Math.random()*700, c:Math.random()<.5?"0":"1", s:11+Math.random()*7});
    }
    if(bits.length>140) bits.splice(0,bits.length-140);
  }
  function frame(){
    ctx.clearRect(0,0,W,H);
    const cs = getComputedStyle(root), col = cs.getPropertyValue("--accent").trim() || "#F2B24B";
    ctx.fillStyle = col; ctx.textBaseline = "middle"; ctx.textAlign = "center";
    for(let i=bits.length-1;i>=0;i--){
      const b = bits[i]; b.life += 16; b.x += b.vx; b.y += b.vy;
      const k = 1 - b.life/b.max; if(k<=0){ bits.splice(i,1); continue; }
      ctx.globalAlpha = k*.75; ctx.font = `${b.s}px "JetBrains Mono",monospace`; ctx.fillText(b.c,b.x,b.y);
    }
    ctx.globalAlpha = 1;
    if(bits.length) requestAnimationFrame(frame); else running = false;
  }
  addEventListener("mousemove", e=>{
    mx = e.clientX; my = e.clientY;
    cur.style.transform = `translate(${mx}px,${my}px)`;
    cur.classList.add("on");
    if(++tick%6===0) lab.textContent = `x:${Math.round(mx)} y:${Math.round(my)}`;
    const t = e.target, overField = t.closest && t.closest("input,textarea,select");
    cur.style.display = overField ? "none" : "";
    cur.classList.toggle("hot", !!(t.closest && t.closest("a,button,summary,label")));
    if(Math.hypot(mx-lx,my-ly)>14 && !overField){ spawn(mx,my); lx = mx; ly = my; if(!running){ running = true; requestAnimationFrame(frame); } }
  }, {passive:true});
  document.addEventListener("mouseleave", ()=>cur.classList.remove("on"));
})();
