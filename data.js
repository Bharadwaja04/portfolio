/* ============ DATA: edit these arrays to customise the site ============ */
const PERSON = {
  name: "Bharadwaja Vadali",
  first: "Bharadwaja",
  email: "bharathvadali@gmail.com",
  github: "https://github.com/Bharadwaja04",
  linkedin: "https://www.linkedin.com/in/bharadwaj-v-672820225/",
  location: "Hyderabad, India",
  roles: ["builder who ships", "AI/ML engineer", "Python and FastAPI developer", "LLM and RAG builder", "computer vision engineer"],
  intro: "I'm an AI/ML engineer who likes to build things end to end and put a number on the result: language models trained from scratch, LLM features inside real apps, and a full-stack cashflow tool. I have applied ML across satellite imagery, language, fintech, drones and music."
};

const STATS = [
  { v: "25.3M", l: "parameter Transformer trained from scratch, Hindi and Nepali" },
  { v: "500 m", l: "GPS-denied visual servoing on a physical drone" },
  { v: "400+", l: "simulated and 100+ real-world controller tests" },
  { v: "16.8%", l: "lower wind-forecast error across 10 terrains" }
];

const GH = "https://github.com/Bharadwaja04/";
/* Each skill: name + proof lines. A proof is [text, link]; links starting with # open case studies. */
const SKILLS = [
  { cat: "Languages and data", items: [
    { n: "Python", p: [["Trained a 25.3M-parameter Transformer from scratch, with 33 automated tests and CI","#case-hindi-nepali-llm"],["FastAPI backend and ML notebooks across the other projects",GH+"FinSaarthi"]] },
    { n: "SQL", p: [["FinSaarthi stores its data in Supabase PostgreSQL",GH+"FinSaarthi"],["PlantGuard AI keeps incident history in SQLite tables",GH+"incident-assistant"],["University SQL lab: five query files",null]] },
    { n: "pandas", p: [["Data prep in the flood-segmentation and super-resolution notebooks",GH+"AISE-Phase-2-Flood_detection"],["Sales analysis notebooks for price optimisation",GH+"Static-Price-Optimisation-System"]] },
    { n: "NumPy", p: [["Probability and statistics from scratch: bootstrap, variance, PMFs",GH+"TensorTonic-Solutions"],["Array work in the satellite-imagery notebooks",GH+"AI-driven-Satellite-Image-Super-Resolution"]] }
  ]},
  { cat: "ML and LLMs", items: [
    { n: "Machine learning", p: [["XGBoost wind-forecast correction: 16.8% lower error across 10 terrains","#case-wind-correction"],["Linear regression by hand: normal equation and gradient descent",GH+"Linear_Regression"]] },
    { n: "PyTorch", p: [["Transformer language models for Hindi and Nepali","#case-hindi-nepali-llm"],["U-Net (ResNet-34) flood segmentation with mixed precision",GH+"AISE-Phase-2-Flood_detection"],["SRCNN super-resolution, about 32 dB PSNR and 0.90 SSIM",GH+"AI-driven-Satellite-Image-Super-Resolution"]] },
    { n: "LLMs and RAG", p: [["Q&A chatbot with RAG and long-context strategies over published posts","#case-apache-roller"],["LLM pipeline that runs on every post save, with fail-safe fallback","#case-apache-roller"]] },
    { n: "Computer vision", p: [["Pixel-level flood mapping from 6-channel satellite imagery",GH+"AISE-Phase-2-Flood_detection"],["10 m to 5 m Sentinel-2 super-resolution",GH+"AI-driven-Satellite-Image-Super-Resolution"],["500 m GPS-denied visual servoing on a real drone","#case-drone-digital-twin"]] },
    { n: "Fine-tuning", p: [["Fine-tuned for logic Q&A: Nepali looping 73% to 0%, exact match 0/60 to 6/60","#case-hindi-nepali-llm"]] },
    { n: "Agentic flows", p: [["Benchmarked two LLMs in agentic vs non-agentic mode: 5/5 known smells found vs 3/5","#case-apache-roller"]] }
  ]},
  { cat: "Backend", items: [
    { n: "FastAPI", p: [["FinSaarthi backend with 12 routers (auth, transactions, forecast, insights, invoices and more), live on the web","#case-finsaarthi"]] },
    { n: "REST APIs", p: [["20+ endpoints in FinSaarthi, consumed by its React dashboard",GH+"FinSaarthi"]] }
  ]}
];
const EXPOSURE = ["React","Supabase","XGBoost","llama.cpp","Java","Gazebo","ArduPilot"];

/* Case studies double as project cards. cat: filter tags. repo null = private. */
const FILTERS = [["all","All"],["iot","Edge and drones"],["llm","LLM apps"],["fullstack","Full-stack"],["research","ML research"]];
const PROJECTS = [
  {
    id: "plantguard-ai", title: "PlantGuard AI", art: "phone", cat: ["iot","llm"],
    outcome: "A prototype that lets site workers file a structured incident report by voice, running offline.",
    biz: "Site incident reports tend to be written later, from memory, and cannot count on a network connection.",
    approach: "A Qwen3-1.7B model, Whisper and Piper run fully offline on a Snapdragon 8 Gen 3 board. Every extracted field is checked against the transcript.",
    metric: { big: "100% offline", label: "on-device, evaluation cases it is tested against", bars: [["sentences",25,25],["shaky speech",13,25],["audio clips",10,25],["dialogues",6,25]] },
    desc: "",
    tags: ["Qwen3-1.7B","llama.cpp","whisper.cpp","sherpa-onnx","React Native","TypeScript"],
    repo: "https://github.com/Bharadwaja04/incident-assistant", demo: null,
    facts: [["Built for","Site workers (prototype)"],["Hardware","Snapdragon 8 Gen 3 (HDK8650)"],["Stack","llama.cpp, whisper.cpp, Piper, Expo"],["Status","Working prototype"]],
    sub: "An incident assistant for people on site. They talk, it listens, asks follow-ups and files the report. The model, the ears and the voice all live on the device.",
    problem: [
      "The idea: on a construction site or in a plant, an incident is easier to report by talking than by typing a form, and the report should not depend on having a network.",
      "PlantGuard AI lets a worker say what happened and answer a few follow-up questions, and produces a structured report. To avoid needing a connection, everything runs on the device. It is a working prototype that I test on a Snapdragon 8 Gen 3 board, not a deployed product."
    ],
    constraints: [
      ["A small model, so it can be wrong","A 1.7B model quantised to Q4_K_M fits and runs on the board, but it will invent details. So nothing it extracts is trusted: every field is checked against the transcript before it is accepted. In a safety report, a wrong field is worse than a missing one."],
      ["Three servers, one phone","The language model (port 8080), speech-to-text (8090) and text-to-speech (8100) run as separate on-device servers. That keeps each piece replaceable and debuggable, at the cost of a start-up script and more moving parts."],
      ["Native builds for one chip","llama.cpp and whisper.cpp are compiled with the NDK for arm64 with the i8mm and dotprod instructions the Snapdragon 8 Gen 3 supports, which is where the speed comes from."]
    ],
    flow: [["Microphone","Expo app records the worker"],["whisper.cpp","Speech to transcript, port 8090"],["Dialogue manager","Decides the next question, fills fields"],["Qwen3-1.7B","llama-server, port 8080, extraction"],["Field validator","Rejects anything not in the transcript"],["Piper TTS","Reads the report aloud, port 8100"]],
    states: [
      {cap:"Listening and asking follow-ups", html:'<span class="bub me">Scaffold clamp came loose on level three, around nine.</span><span class="bub ai">Understood. Was anyone hurt, and how serious is it?</span><span class="bub me">No injuries. Pretty serious, we cleared the area.</span>'},
      {cap:"Structured report, filled by the model", html:'<div class="row"><span>type</span><span>loose scaffold clamp</span></div><div class="row"><span>location</span><span>level 3</span></div><div class="row"><span>time</span><span>around 9:00</span></div><div class="row"><span>severity</span><span>high</span></div><div class="row"><span>actions</span><span>area cleared</span></div>'},
      {cap:"Correcting a field by voice", html:'<span class="bub me">Change severity to critical.</span><span class="bub ai">Severity updated: high → critical. Anything else?</span><div class="row"><span>severity</span><span>critical</span></div>'}
    ],
    illustrative: true,
    results: [["25","evaluation sentences"],["6","multi-turn dialogues"],["10","audio clips"],["13","shaky-speech scenarios"]],
    lessons: [
      "Treat the model as a suggestion engine. Checking each field against the source text catches the mistakes a small model makes, and costs little.",
      "A Python reference implementation first, then a TypeScript port, made it easy to test the logic against the same cases on both sides.",
      "Splitting the stack into small servers made failures easy to locate: each port has a health check."
    ]
  },
  {
    id: "drone-digital-twin", title: "Drone Digital Twin", art: "drone", cat: ["iot"],
    outcome: "Failure scenarios tested safely in simulation, ending in 500 m GPS-denied flight on the real drone.",
    biz: "Testing drone failure scenarios on a real aircraft is risky and hard to repeat.",
    approach: "A digital twin in Gazebo and ArduPilot built from measured dimensions and inertia, tuned with Monte Carlo simulation, then validated on hardware.",
    metric: { big: "90% similarity", label: "with the real platform, checked by simulated and real tests", bars: [["simulated tests",400,500],["real-world tests",100,500]] },
    desc: "",
    tags: ["Gazebo","ArduPilot","Monte Carlo","Visual servoing","Python"],
    repo: null, demo: null,
    facts: [["Role","AI Engineer, Terrablue XT"],["When","May to Jul. 2026"],["Tools","Gazebo, ArduPilot"],["Code","Private (company work)"]],
    sub: "A simulated copy of a real drone, good enough to trust. It let failure scenarios run repeatedly and safely before anything left the ground.",
    problem: [
      "Autonomous drones need to be tested against failure scenarios. Doing that only on the real aircraft is risky and hard to repeat.",
      "The aim was a digital twin accurate enough that what passes in simulation is a fair predictor of the real drone, so most testing could happen safely at a desk."
    ],
    constraints: [
      ["Sim-to-real gap","A twin is only useful if it behaves like the real thing. I rebuilt the drone in Gazebo and ArduPilot from measured dimensions and inertia, rather than from datasheet guesses."],
      ["Tuning by search","Flight parameters were tuned through Monte Carlo simulation, which reached 90% similarity with the real platform."],
      ["No GPS","The final target was visual servoing without GPS, which is why controllers were validated in simulation before real flights."]
    ],
    flow: [["Measure","Dimensions and inertia of the real drone"],["Model","Gazebo and ArduPilot twin"],["Tune","Monte Carlo over flight parameters"],["Simulate","400+ controller tests"],["Fly","100+ real-world tests"],["Deploy","500 m GPS-denied visual servoing"]],
    states: [
      {cap:"Twin vs real platform", html:'<div class="row"><span>similarity</span><span>90%</span></div><div class="row"><span>method</span><span>Monte Carlo tuning</span></div>'},
      {cap:"Validation ladder", html:'<div class="row"><span>simulated</span><span>400+ tests</span></div><div class="row"><span>real-world</span><span>100+ tests</span></div>'},
      {cap:"Final result", html:'<div class="row"><span>visual servoing</span><span>500 m</span></div><div class="row"><span>GPS</span><span>denied</span></div>'}
    ],
    illustrative: false,
    results: [["90%","similarity with the real platform"],["400+","simulated controller tests"],["100+","real-world tests"],["500 m","GPS-denied visual servoing"]],
    lessons: [
      "Measure the real thing first. Dimensions and inertia from the actual drone made the twin believable.",
      "A cheap, repeatable simulation is what lets you test the dangerous cases at all.",
      "Run the same tests in simulation and on hardware, so the twin's 90% is a number you can check."
    ]
  },
  {
    id: "wind-correction", title: "Wind Forecast Correction", art: "wind", cat: ["iot","research"],
    outcome: "16.8% lower wind-speed forecast error across 10 Indian terrains.",
    biz: "Wind forecasts are off by a consistent amount that varies by location, which matters for drone flights.",
    approach: "XGBoost models learn the forecast's bias and correct it, trained and checked across 10 different terrains.",
    metric: { big: "-16.8%", label: "wind-speed forecast error (index: raw forecast = 100)", bars: [["raw forecast",100,100],["corrected",83.2,100]] },
    desc: "",
    tags: ["XGBoost","Python","Forecasting","Feature engineering"],
    repo: null, demo: null,
    facts: [["Terrains","10 across India"],["Model","XGBoost"],["Result","16.8% lower error"],["Code","Private repository"]],
    sub: "A small ML project that learns how a wind forecast is biased and corrects it.",
    problem: [
      "Wind speed matters for drone flights, and forecasts do not match what is measured.",
      "The project treats the gap as a bias to learn: a model predicts the correction, and the result is judged against the raw forecast."
    ],
    constraints: [
      ["More than one terrain","The model is trained and evaluated across 10 Indian terrains, not one."],
      ["Model choice","XGBoost (gradient-boosted trees) suits tabular correction problems like this one."],
      ["Measure against the raw forecast","The honest baseline is the uncorrected forecast. The result is reported as the improvement over it."]
    ],
    flow: [["Raw forecast","Wind speed from the weather model"],["Features","Terrain and weather context"],["XGBoost","Learns the forecast bias"],["Corrected wind","Closer to observed wind"],["Use","Better wind inputs for flight planning"]],
    states: [
      {cap:"Error, relative to the raw forecast", html:'<div class="row"><span>raw forecast</span><span>100</span></div><div class="row"><span>corrected</span><span>83.2</span></div>'},
      {cap:"Coverage", html:'<div class="row"><span>terrains</span><span>10</span></div><div class="row"><span>country</span><span>India</span></div>'}
    ],
    illustrative: false,
    results: [["16.8%","lower wind-speed forecast error"],["10","terrains in the evaluation"]],
    lessons: [
      "Start from the raw forecast as the baseline, so the improvement is a fair number.",
      "Evaluate across all terrains. A model that only works on one place is not a correction."
    ]
  },
  {
    id: "finsaarthi", title: "FinSaarthi", art: "chart", cat: ["fullstack"],
    outcome: "Small businesses see where money goes without keeping a ledger.",
    biz: "Many small shops run on bank SMS alerts and have no bookkeeping and no idea if next week is safe.",
    approach: "Parse SMS into categorised entries, store them in Supabase, serve them through FastAPI and chart them with a 7-day forecast.",
    metric: { big: "7-day forecast", label: "from SMS to dashboard, live on Vercel", bars: [["parsed from SMS",100,100],["typed by hand",0,100]] },
    desc: "",
    tags: ["FastAPI","React","Vite","Recharts","Supabase","PostgreSQL"],
    repo: "https://github.com/Bharadwaja04/FinSaarthi", demo: "https://fin-saarthi.vercel.app",
    facts: [["Role","Full-stack build"],["Backend","FastAPI + Supabase (PostgreSQL)"],["Frontend","React, Vite, Recharts"],["Status","Live"]],
    sub: "A cashflow copilot that starts from the data a shopkeeper already has: the SMS their bank sends.",
    problem: [
      "Many small businesses in India run on a phone full of bank SMS alerts and no bookkeeping. They cannot easily say what came in, what went out, and whether next week is safe.",
      "FinSaarthi reads those alerts and does the bookkeeping for them: it sorts transactions into categories, charts them, and projects the next seven days of cashflow."
    ],
    constraints: [
      ["Messy input","Bank SMS formats differ and carry little structure. The parser has to pull amount, direction and counterparty out of free text, and the product needs to keep working when it cannot."],
      ["Forecast honesty","A seven-day horizon keeps the forecast short enough to be useful and hard to oversell. It is a planning aid, not a promise."],
      ["Ship it live","FastAPI, a Supabase-hosted PostgreSQL database and a Vite/React front end deployed on Vercel meant no servers to babysit and a public demo link anyone can open."]
    ],
    flow: [["Bank SMS","Pasted or imported alerts"],["Parser","Amount, direction, merchant"],["Categoriser","Groups spending and income"],["Supabase","PostgreSQL storage"],["FastAPI","Serves summaries and forecast"],["React dashboard","Recharts views, 7-day outlook"]],
    states: [
      {cap:"Alerts become categorised entries", html:'<div class="row"><span>Rent</span><span>- 18,000</span></div><div class="row"><span>Customer UPI</span><span>+ 4,250</span></div><div class="row"><span>Supplier</span><span>- 6,400</span></div><div class="row"><span>Electricity</span><span>- 1,820</span></div>'},
      {cap:"Spending by category", html:'<div class="row"><span>Stock</span><span>████████ 46%</span></div><div class="row"><span>Rent</span><span>█████ 28%</span></div><div class="row"><span>Utilities</span><span>██ 12%</span></div><div class="row"><span>Other</span><span>██ 14%</span></div>'},
      {cap:"7-day cashflow outlook", html:'<div class="row"><span>Mon</span><span>▁▂▃</span></div><div class="row"><span>Wed</span><span>▃▃▂</span></div><div class="row"><span>Fri</span><span>▂▁▁ low</span></div><div class="row"><span>Sun</span><span>▃▄▅</span></div>'}
    ],
    illustrative: true,
    results: [["7-day","rolling cashflow forecast"],["Live","deployed on Vercel"],["SMS → data","no manual entry"]],
    lessons: [
      "Starting from data people already have (SMS) removes the hardest part of any finance tool: getting the first entry in.",
      "A hosted database and a static front end make a demo link that stays up without any upkeep."
    ]
  },
  {
    id: "hindi-nepali-llm", title: "Hindi and Nepali LMs from scratch", art: "tokens", cat: ["research","llm"],
    outcome: "A 25.3M-parameter model per language, trained with no pretrained parts.",
    biz: "Off-the-shelf models treat Hindi and Nepali as an afterthought, and the pipeline behind them is a black box.",
    approach: "Dedupe with MinHash-LSH, train byte-level BPE tokenizers, pretrain a decoder-only Transformer on about 500M tokens per language, fine-tune and evaluate against baselines.",
    metric: { big: "73% → 0%", label: "Nepali looping after fine-tuning", bars: [["before fine-tuning",73,100],["after",0,100]] },
    desc: "",
    tags: ["PyTorch","Python","BPE","Transformer","MinHash-LSH","pytest"],
    repo: "https://github.com/Bharadwaja04/hindi-nepali-llm", demo: null,
    facts: [["Model","25.3M-parameter decoder-only"],["Data","~500M tokens per language"],["Tokenizer","Byte-level BPE, 31,744 tokens"],["Tests","33 automated, with CI"]],
    sub: "Every stage built by hand: data cleaning, tokenizer, model, training, fine-tuning and evaluation.",
    problem: [
      "Most language-model work starts from someone else's weights. I wanted to understand the whole pipeline, so I built it for two languages that share a script and a lot of vocabulary: Hindi and Nepali.",
      "The rule was no pretrained components at all, and every design choice had to be backed by a measurement instead of a default."
    ],
    constraints: [
      ["Small context","The model uses a 128-token context. A diagnosis showed about 45% of tokens were spaces, which halved the usable context. Finding that and fixing the design was one of the most valuable parts of the project."],
      ["Tokenizer size","Rather than guess, I measured fertility across 8k to 65k token vocabularies (2.73 down to 2.37) and chose the size from the curve."],
      ["Data quality","Web text is full of near-duplicates, so MinHash-LSH removal comes before tokenisation."]
    ],
    flow: [["Raw text","Hindi and Nepali news"],["MinHash-LSH","Near-duplicate removal"],["Byte-level BPE","31,744-token vocabulary"],["Transformer","25.3M params, ~500M tokens"],["Fine-tune","Logic Q&A"],["Evaluate","Held-out and baselines"]],
    states: [
      {cap:"Held-out perplexity", html:'<div class="row"><span>Hindi</span><span>12.8</span></div><div class="row"><span>Nepali</span><span>13.5</span></div>'},
      {cap:"Tokenizer fertility study", html:'<div class="row"><span>8k vocab</span><span>2.73</span></div><div class="row"><span>65k vocab</span><span>2.37</span></div>'},
      {cap:"Fine-tuning for logic Q&A (Nepali)", html:'<div class="row"><span>looping</span><span>73% → 0%</span></div><div class="row"><span>exact match</span><span>0/60 → 6/60</span></div>'}
    ],
    illustrative: false,
    results: [["12.8 / 13.5","held-out perplexity, Hindi / Nepali"],["73% → 0%","Nepali looping after fine-tuning"],["957","held-out Hindi questions scored vs baselines"],["33","automated tests, CI and a design doc per stage"]],
    lessons: [
      "Look at the tokens. The wasted spaces only showed up because I inspected what the model actually saw.",
      "Compare against baselines, not just a headline score. A number means little without something to beat.",
      "Treat a research project like a library: tests, CI and a design doc per stage kept it maintainable."
    ]
  },
  {
    id: "apache-roller", title: "Apache Roller: AI features and refactoring", art: "pipeline", cat: ["llm","fullstack"],
    outcome: "Admin-switchable LLM features in a real Java blog server, with safe fallbacks.",
    biz: "LLM features in a mature app are a risk: a flaky model must never block publishing.",
    approach: "A Chain of Responsibility pipeline on every post save, strategy-pattern fallbacks, a RAG chatbot, and smell-driven refactoring.",
    metric: { big: "-42% lines", label: "in JPAWeblogManagerImpl after refactoring", bars: [["WeblogEntry",17,42],["Weblog",18,42],["JPAWeblogManagerImpl",42,42]] },
    desc: "",
    tags: ["Java","Maven","LLM APIs","RAG","Design patterns","SonarQube"],
    repo: "https://github.com/Bharadwaja04/Apache-Roller", demo: null,
    facts: [["Context","Course project on a real codebase"],["Language","Java, Maven"],["Patterns","Chain of Responsibility, Strategy"],["Analysis","SonarQube, DesigniteJava"]],
    sub: "Adding AI to a large existing application without breaking what already works.",
    problem: [
      "Apache Roller is a multi-user blogging platform with years of accumulated code. The task was to add LLM features and refactor the parts that made change hard.",
      "The risk with LLM features in a mature app is that a flaky model breaks publishing. Every feature had to be optional and fail safe."
    ],
    constraints: [
      ["Never block a post","Each pipeline step (profanity rewrite, summary, tags, mood) can be switched on or off in the admin console, and on any failure the original text is kept."],
      ["Fallbacks over errors","Comment analysis uses the strategy pattern: try the LLM, and fall back to keyword clustering automatically."],
      ["Refactor with evidence","Design smells came from SonarQube and DesigniteJava reports, and business logic moved out of god-class POJOs into focused services."]
    ],
    flow: [["Post save","Author publishes"],["Profanity rewrite","LLM step, switchable"],["Summary","LLM step, switchable"],["Tags and mood","LLM step, switchable"],["Fail safe","Any error keeps original text"],["Published post","Plus Q&A chatbot over posts"]],
    states: [
      {cap:"Admin console toggles", html:'<div class="row"><span>profanity rewrite</span><span>on</span></div><div class="row"><span>summary</span><span>on</span></div><div class="row"><span>tags</span><span>on</span></div><div class="row"><span>mood</span><span>off</span></div>'},
      {cap:"Comment analysis with fallback", html:'<div class="row"><span>strategy 1</span><span>LLM themes</span></div><div class="row"><span>on failure</span><span>keyword clusters</span></div>'},
      {cap:"Refactoring: lines removed", html:'<div class="row"><span>WeblogEntry</span><span>-17%</span></div><div class="row"><span>Weblog</span><span>-18%</span></div><div class="row"><span>JPAWeblogManagerImpl</span><span>-42%</span></div>'}
    ],
    illustrative: false,
    results: [["-42%","lines in JPAWeblogManagerImpl"],["5/5 vs 3/5","known smells found, agentic vs non-agentic"],["2 LLMs","benchmarked on a refactoring pipeline"],["RAG","Q&A chatbot over published posts"]],
    lessons: [
      "Make every AI feature a switch with a safe default. Admins trust a feature they can turn off.",
      "Agentic setups found more known smells (5/5 vs 3/5) than a single-shot prompt in my benchmark, which is a concrete reason to pay their extra cost.",
      "Metrics tell you where to cut, and a smaller class is a result you can show."
    ]
  }
];

const MORE = [
  { t: "Flood segmentation (AISEHack 2026)", d: "U-Net with a ResNet-34 encoder on 6-channel satellite imagery, class-weighted for the rare flood class.", u: "https://github.com/Bharadwaja04/AISE-Phase-2-Flood_detection" },
  { t: "Satellite super-resolution (StratoHack, top 5)", d: "IIT Madras StratoHack, top 5. SRCNN from 10 m to 5 m Sentinel-2 imagery, about 32 dB PSNR and 0.90 SSIM.", u: "https://github.com/Bharadwaja04/AI-driven-Satellite-Image-Super-Resolution" },
  { t: "Swara detection", d: "Object detection on Hindustani classical notation, with a dataset labelled in Label Studio.", u: "https://github.com/Bharadwaja04/Swara-Detection-using-TensorFlow" },
  { t: "CodeMind (in progress)", d: "A map of your code that updates while AI agents edit it. Python engine plus a VS Code extension.", u: null },
  { t: "TalentScout", d: "Streamlit hiring assistant that generates technical questions from a candidate's stack.", u: "https://github.com/Bharadwaja04/TalentScout-" },
  { t: "TensorTonic solutions", d: "Probability and statistics from scratch: PMFs, t-tests, bootstrap.", u: "https://github.com/Bharadwaja04/TensorTonic-Solutions" }
];

const EXPERIENCE = [
  { when: "May 2026 to Jul. 2026", role: "AI Engineer", org: "Terrablue XT", place: "Bangalore",
    text: "Built a digital twin of a real drone in Gazebo and ArduPilot so failure scenarios could be tested safely and repeatedly. Tuned flight parameters with Monte Carlo simulation to reach 90% similarity with the real platform, and validated controllers across 400+ simulated and 100+ real-world tests, ending with 500 m GPS-denied visual servoing on the physical drone.",
    tech: ["Gazebo","ArduPilot","Monte Carlo","Visual servoing","Python"] },
  { when: "May 2025 to May 2027", role: "M.Tech, Product Design and Management", org: "International Institute of Information Technology", place: "Hyderabad",
    text: "Studying how products are designed, built and managed, alongside the on-device AI, full-stack and research projects shown above.",
    tech: ["Product design","Systems","Applied AI"] },
  { when: "Mar. 2021 to Mar. 2025", role: "B.Tech, Computer Science and Engineering", org: "XIM University", place: "Bhubaneswar",
    text: "Computer science foundations, plus the first computer-vision and machine-learning projects.",
    tech: ["DSA","OOP","ML"] }
];

const NOTES = [
  { t: "Open source and course forks", b: "Apache Roller: LLM pipeline, comment analysis, RAG chatbot, and refactoring of core classes, with benchmarks." },
  { t: "Built in the open", b: "PlantGuard AI, FinSaarthi and the Hindi and Nepali models are public, with setup steps and test suites." },
  { t: "Competition: AI satellite imagery", b: "IIT Madras StratoHack: top 5 with a satellite super-resolution model." }
];
