// Synthetic Web Audio SFX
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function unmuteBattleVideo() {
  const battleVid = document.getElementById('battle-bg-video');
  const btn = document.getElementById('unmute-battle-btn');
  if (battleVid) {
    battleVid.muted = false;
    battleVid.play().catch(err => console.log(err));
  }
  if (btn) btn.style.display = 'none';
}
function playClickSound() {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(600, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.08);
  gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
  gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.08);
}

function playAttackSound() {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(300, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.3);
  gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
  gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.3);
}

// MOUSE PARALLAX CONTROLLER
document.addEventListener('mousemove', (e) => {
  const viewport = document.getElementById('parallax-viewport');
  if (!viewport) return;
  
  const rect = viewport.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  const deltaX = (e.clientX - centerX) / (rect.width / 2);
  const deltaY = (e.clientY - centerY) / (rect.height / 2);

  document.querySelectorAll('.parallax-layer').forEach(layer => {
    const speed = parseFloat(layer.getAttribute('data-speed')) || 0.05;
    const moveX = deltaX * speed * 120;
    const moveY = deltaY * speed * 120;
    layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
  });
});

const quizQuestions = [
  {
    id: "q1",
    questTitle: "QUEST 1: THE SPEED TRIAL OF FRIDAY'S LAUNCH",
    text: "A new tool launches, and you need to use it by Friday. What would you reach for first?",
    options: [
      { key: "A", icon: "📹", text: "A quick video that shows me exactly what to do", persona: "Agile" },
      { key: "B", icon: "📜", text: "A searchable guide I can use while working", persona: "Guided" },
      { key: "C", icon: "🔮", text: "A live demonstration where I can ask questions", persona: "Social" },
      { key: "D", icon: "🛠️", text: "A practice space where I can click around and experiment", persona: "HandsOn" },
      { key: "E", icon: "🤝", text: "A coworker or expert who can walk through it with me", persona: "Connected" }
    ]
  },
  {
    id: "q2",
    questTitle: "QUEST 2: ARCHITECTING MASTERY",
    text: "You are developing a more complex skill, such as coaching, strategic thinking, or leading change. Which experience sounds most useful?",
    options: [
      { key: "A", icon: "⚡", text: "A series of short lessons I can complete over time", persona: "Agile" },
      { key: "B", icon: "🧭", text: "A structured pathway with resources and clear milestones", persona: "Guided" },
      { key: "C", icon: "💬", text: "A live workshop with discussion and expert guidance", persona: "Social" },
      { key: "D", icon: "🎯", text: "A realistic challenge where I can practice the skill", persona: "HandsOn" },
      { key: "E", icon: "👥", text: "A cohort where I can learn alongside other people", persona: "Connected" }
    ]
  },
  {
    id: "q3",
    questTitle: "QUEST 3: THE TIME CHALICE",
    text: "Your calendar unexpectedly gives you room to learn. How much time could you realistically protect?",
    options: [
      { key: "A", icon: "⏱️", text: "5–10 minutes", persona: "Agile" },
      { key: "B", icon: "⌛", text: "15–20 minutes", persona: "Guided" },
      { key: "C", icon: "🕰️", text: "30 minutes", persona: "Social" },
      { key: "D", icon: "🔮", text: "45–60 minutes", persona: "HandsOn" },
      { key: "E", icon: "📅", text: "I would rather complete a series of shorter experiences over several days", persona: "Connected" }
    ]
  },
  {
    id: "q4",
    questTitle: "QUEST 4: ANCHORING KNOWLEDGE",
    text: "When you are learning something new, what helps it stick?",
    options: [
      { key: "A", icon: "🖼️", text: "Seeing a clear example", persona: "Agile" },
      { key: "B", icon: "📋", text: "Having a guide, checklist, or template to reference", persona: "Guided" },
      { key: "C", icon: "🗣️", text: "Hearing an expert explain the thinking behind it", persona: "Social" },
      { key: "D", icon: "🧪", text: "Trying it myself and learning from what happens", persona: "HandsOn" },
      { key: "E", icon: "👥", text: "Talking it through with other people", persona: "Connected" }
    ]
  },
  {
    id: "q5",
    questTitle: "QUEST 5: THE ULTIMATE TRADE-OFF",
    text: "You can choose only one learning experience. Which one wins?",
    options: [
      { key: "A", icon: "⚡", text: "A 15-minute self-paced lesson available whenever I need it", persona: "Agile" },
      { key: "B", icon: "🗺️", text: "A curated collection that lets me choose my own path", persona: "Guided" },
      { key: "C", icon: "🏛️", text: "A 60-minute live session with an expert and time for questions", persona: "Social" },
      { key: "D", icon: "🎮", text: "A 45-minute interactive simulation with practice and feedback", persona: "HandsOn" },
      { key: "E", icon: "⚔️", text: "A multi-session cohort with peer discussion and accountability", persona: "Connected" }
    ]
  },
  {
    id: "q6",
    questTitle: "QUEST 6: THE BEACON OF DISCOVERY",
    text: "How do useful learning opportunities most often find their way to you?",
    options: [
      { key: "A", icon: "🔍", text: "I search for something when I need it", persona: "Agile" },
      { key: "B", icon: "📚", text: "I browse the learning platform, intranet, or resource collections", persona: "Guided" },
      { key: "C", icon: "📢", text: "I notice announcements through email, Slack, or Teams", persona: "Social" },
      { key: "D", icon: "🎖️", text: "My manager recommends or assigns something", persona: "HandsOn" },
      { key: "E", icon: "🤝", text: "A coworker, community, or trusted colleague shares it", persona: "Connected" }
    ]
  },
  {
    id: "q7",
    questTitle: "QUEST 7: CONFRONTING THE WORKPLACE BARRIER",
    text: "Your learning plans have been dramatically interrupted. Who is the most likely culprit?",
    options: [
      { key: "A", icon: "🐙", thumb: "/images/monsters/calendar_kraken.png", text: "The Calendar Kraken: I do not have enough uninterrupted time", villain: "The Calendar Kraken" },
      { key: "B", icon: "🧩", thumb: "/images/monsters/relevance_riddle.png", text: "The Relevance Riddle: I cannot tell whether the learning applies to me", villain: "The Relevance Riddle" },
      { key: "C", icon: "🕵️", thumb: "/images/monsters/hidden_opportunity.png", text: "The Hidden Opportunity: I often find out too late or not at all", villain: "The Hidden Opportunity" },
      { key: "D", icon: "⚙️", thumb: "/images/monsters/format_friction.png", text: "The Format Friction: The schedule, length, or experience does not work for me", villain: "The Format Friction" },
      { key: "E", icon: "🌀", thumb: "/images/monsters/priority_maze.png", text: "The Priority Maze: Learning gets pushed aside by workload or manager priorities", villain: "The Priority Maze" }
    ]
  }
];

const personas = {
  Agile: {
    title: "The Agile Explorer",
    desc: "You want learning that is quick, flexible, and available at the moment you need it. You are energized by concise explanations that help you solve an immediate problem and return to your work.",
    img: "/images/avatars/agile_explorer.png",
    video: "/images/videos/agile_explorer.mp4",
    recipe: "Short, self-paced resources • Quick videos and demonstrations • Searchable answers • Clear examples • Immediate application",
    trap: "You may move so quickly toward the answer that you miss useful context, practice, or deeper skill development.",
    experiences: "Microlearning • Short tutorials • On-demand videos • Quick-reference guides • Just-in-time resources",
    next: "Choose one skill you need this week and find a resource you can apply within the next 24 hours."
  },
  Guided: {
    title: "The Guided Navigator",
    desc: "You learn best when the destination is clear and someone has mapped the route. You value structure, thoughtful sequencing, and resources that help you understand what to learn next.",
    img: "/images/avatars/guided_navigator.png",
    video: "/images/videos/guided_navigator.mp4",
    recipe: "Curated pathways • Clear milestones • Step-by-step resources • Checklists and templates • Recommended next steps",
    trap: "Too many choices or an unclear starting point can make it difficult to begin.",
    experiences: "Structured learning pathways • Certifications • Multi-part courses • Curated resource collections • Guided development plans",
    next: "Choose one goal and break it into three learning milestones you can complete over time."
  },
  Social: {
    title: "The Social Solver",
    desc: "You are energized by conversation, expert insight, and the opportunity to ask questions in real time. Learning becomes more meaningful when ideas are explored with other people.",
    img: "/images/avatars/social_solver.png",
    video: "/images/videos/social_solver.mp4",
    recipe: "Live facilitation • Expert instruction • Discussion • Questions and answers • Shared reflection",
    trap: "You may delay learning while waiting for the perfect live session or expert to become available.",
    experiences: "Live workshops • Office hours • Expert panels • Facilitated discussions • Coaching sessions",
    next: "Identify one question you are trying to solve and bring it to an expert, facilitator, or learning community."
  },
  HandsOn: {
    title: "The Hands-On Experimenter",
    desc: "You learn through action. You want to test ideas, make decisions, receive feedback, and discover what works through experience.",
    img: "/images/avatars/hands_on_experimenter.png",
    video: "/images/videos/hands_on_experimenter.mp4",
    recipe: "Practice • Simulations • Realistic scenarios • Demonstrations followed by action • Immediate feedback",
    trap: "You may jump into practice before building enough foundational knowledge to make the experience useful.",
    experiences: "Simulations • Workshops with practice • Sandboxes • Role-play • Stretch assignments",
    next: "Choose one small, low-risk way to practice a new skill during your regular work."
  },
  Connected: {
    title: "The Connected Collaborator",
    desc: "You learn through shared experience. Peer perspectives, accountability, and ongoing conversation help you remain engaged and turn ideas into action.",
    img: "/images/avatars/connected_collaborator.png",
    video: "/images/videos/connected_collaborator.mp4",
    recipe: "Cohort-based learning • Peer discussion • Group problem-solving • Accountability • Communities of practice",
    trap: "Learning alone may feel less motivating, even when a self-paced resource could quickly meet your need.",
    experiences: "Cohorts • Peer-learning circles • Mentoring • Communities of practice • Team-based challenges",
    next: "Invite a colleague to learn, practice, or reflect on one new skill with you."
  }
};

let currentQuestionIndex = 0;
const scores = { Agile: 0, Guided: 0, Social: 0, HandsOn: 0, Connected: 0 };
let question5Choice = "Agile"; 
let selectedVillain = "The Calendar Kraken";
let determinedPersonaKey = "Agile";
let userQuizAnswers = {};

let monsterHp = 100;
let isAttacking = false;

function startQuest() {
  playClickSound();
  goToStage(1);
}

function renderQuestion() {
  const q = quizQuestions[currentQuestionIndex];
  document.getElementById('quest-stage-title').innerText = q.questTitle;
  document.getElementById('question-number').innerText = `QUEST ${currentQuestionIndex + 1} OF ${quizQuestions.length}`;
  document.getElementById('question-text').innerText = q.text;
  
  const fillPct = Math.round(((currentQuestionIndex + 1) / quizQuestions.length) * 100);
  document.getElementById('quiz-progress-fill').style.width = `${fillPct}%`;

  const container = document.getElementById('options-container');
  container.innerHTML = '';

  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    
    let thumbHtml = opt.thumb ? `<img src="${opt.thumb}" class="monster-thumb" onerror="this.style.display='none'">` : '';
    btn.innerHTML = `${thumbHtml}<span class="option-key">${opt.key}</span> <span class="option-icon">${opt.icon}</span> <span>${opt.text}</span>`;
    
    btn.onclick = () => {
      playClickSound();
      selectOption(opt);
    };
    container.appendChild(btn);
  });
}

function selectOption(option) {
  userQuizAnswers[quizQuestions[currentQuestionIndex].id] = option.text;

  if (option.persona) {
    scores[option.persona]++;
  }

  if (quizQuestions[currentQuestionIndex].id === "q5") {
    question5Choice = option.persona;
  }

  if (option.villain) {
    selectedVillain = option.villain;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestions.length) {
    renderQuestion();
  } else {
    calculatePersonaAndTriggerAwakening();
  }
}

function calculatePersonaAndTriggerAwakening() {
  let maxScore = -1;
  let topPersonas = [];

  for (const personaKey in scores) {
    if (scores[personaKey] > maxScore) {
      maxScore = scores[personaKey];
      topPersonas = [personaKey];
    } else if (scores[personaKey] === maxScore) {
      topPersonas.push(personaKey);
    }
  }

  if (topPersonas.length > 1) {
    if (topPersonas.includes(question5Choice)) {
      determinedPersonaKey = question5Choice;
    } else {
      determinedPersonaKey = topPersonas[0];
    }
  } else {
    determinedPersonaKey = topPersonas[0];
  }

  const p = personas[determinedPersonaKey];
  
  document.getElementById('stage2-persona-title').innerText = p.title.toUpperCase();
  
  const videoEl = document.getElementById('hero-video');
  const videoSourceEl = document.getElementById('hero-video-source');
  const stillImgEl = document.getElementById('reveal-still-img');
  const unmuteBtn = document.getElementById('unmute-play-btn');

  videoEl.style.display = 'block';
  stillImgEl.className = 'reveal-still-hidden';
  stillImgEl.src = p.img;
  unmuteBtn.style.display = 'none';

  if (videoEl && videoSourceEl) {
    videoSourceEl.src = p.video;
    videoEl.load();
    videoEl.muted = false;

    videoEl.onended = () => {
      videoEl.style.display = 'none';
      stillImgEl.className = 'reveal-still-visible';
    };

    videoEl.play().catch(err => {
      console.log("Autoplay blocked by browser policy.");
      unmuteBtn.style.display = 'block';
    });
  }

  renderHeroCard();
  goToStage(2);
}

function forcePlayAudio() {
  const videoEl = document.getElementById('hero-video');
  const unmuteBtn = document.getElementById('unmute-play-btn');
  if (videoEl) {
    videoEl.muted = false;
    videoEl.play();
  }
  if (unmuteBtn) {
    unmuteBtn.style.display = 'none';
  }
}

function handleVideoError() {
  const videoEl = document.getElementById('hero-video');
  const stillImgEl = document.getElementById('reveal-still-img');
  if (videoEl) videoEl.style.display = 'none';
  if (stillImgEl) stillImgEl.className = 'reveal-still-visible';
}

function renderHeroCard() {
  const p = personas[determinedPersonaKey] || personas["Agile"];
  
  const imgEl = document.getElementById('card-hero-img');
  if (imgEl) imgEl.src = p.img;
  
  const titleEl = document.getElementById('card-hero-title');
  if (titleEl) titleEl.innerText = p.title;

  const descEl = document.getElementById('card-hero-desc');
  if (descEl) descEl.innerText = p.desc;
  
  const recipeEl = document.getElementById('card-recipe');
  if (recipeEl) recipeEl.innerText = p.recipe;

  const trapEl = document.getElementById('card-trap');
  if (trapEl) trapEl.innerText = p.trap;

  const expEl = document.getElementById('card-experiences');
  if (expEl) expEl.innerText = p.experiences;

  const nextEl = document.getElementById('card-next');
  if (nextEl) nextEl.innerText = p.next;
}

function setupBattleArena() {
  const p = personas[determinedPersonaKey] || personas["Agile"];
  document.getElementById('battle-hero-img').src = p.img;
  document.getElementById('battle-hero-title').innerText = p.title.toUpperCase();
  
  monsterHp = 100;
  isAttacking = false;
  document.getElementById('monster-hp-fill').style.width = '100%';
  document.getElementById('monster-hp-text').innerText = 'HP: 100 / 100';
  document.getElementById('battle-log-text').innerText = `⚠️ FORMAT FRICTION ATTEMPTS TO BLOCK YOUR WORKDAY!`;
  
  const attackBtn = document.getElementById('attack-btn');
  attackBtn.style.display = 'inline-block';
  attackBtn.innerText = 'ATTACK WITH LEARNING RECIPE ⚡';
}

function executePlayerAttack() {
  if (isAttacking) return;
  unmuteBattleVideo();
  isAttacking = true;
  playAttackSound();

  const logEl = document.getElementById('battle-log-text');
  const p = personas[determinedPersonaKey];
  logEl.innerText = `💥 ${p.title} deployed custom learning recipe! It's super effective!`;

  monsterHp -= 50;
  if (monsterHp < 0) monsterHp = 0;

  document.getElementById('monster-hp-fill').style.width = `${monsterHp}%`;
  document.getElementById('monster-hp-text').innerText = `HP: ${monsterHp} / 100`;

  if (monsterHp <= 0) {
    setTimeout(() => {
      playClickSound();
      logEl.innerText = `🎉 VICTORY! FORMAT FRICTION BANISHED FROM YOUR WORKDAY!`;
      document.getElementById('attack-btn').style.display = 'none';
      
      setTimeout(() => {
        renderParallaxHub();
        goToStage(4);
      }, 1500);
    }, 600);
  } else {
    setTimeout(() => {
      isAttacking = false;
      logEl.innerText = `⚡ Strike again to clear the barrier!`;
    }, 1000);
  }
}

function renderParallaxHub() {
  const p = personas[determinedPersonaKey] || personas["Agile"];
  
  document.getElementById('base-welcome-title').innerText = `${p.title.toUpperCase()} HQ`;
  document.getElementById('parallax-hero-name').innerText = p.title;
  document.getElementById('parallax-hero-img').src = p.img;
}

function openFacilityModal(facilityType) {
  playClickSound();
  const p = personas[determinedPersonaKey];
  if (facilityType === 'sandbox') {
    alert(`🎮 SIMULATION SANDBOX\n\nTailored for ${p.title}:\n${p.experiences}\n\nRecommended Practice: ${p.next}`);
  } else if (facilityType === 'archives') {
    alert(`📜 KNOWLEDGE ARCHIVES\n\nYour Ideal Recipe:\n${p.recipe}\n\nWatch out for: ${p.trap}`);
  } else if (facilityType === 'guild') {
    alert(`🤝 SOCIAL GUILD HALL\n\nConnect with GoDaddy L&D Facilitators & Peers to stay ahead!`);
  }
}

async function submitFullProfile() {
  playClickSound();
  const skillSignal = document.getElementById('skill-input').value.trim() || "Not specified";

  const payload = {
    employeeId: "emp_" + Math.floor(1000 + Math.random() * 9000),
    timestamp: new Date().toISOString(),
    determinedPersona: personas[determinedPersonaKey].title,
    primaryVillainCulprit: selectedVillain,
    sixMonthSkillSignal: skillSignal,
    tieBreakerUsed: question5Choice,
    scoresBreakdown: scores,
    quizResponses: userQuizAnswers
  };

  try {
    await fetch('/api/character-build', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.error("Save error:", err);
  }

  setupBattleArena();
  goToStage('battle');
}

function goToStage(stageNum) {
  document.querySelectorAll('.stage-screen').forEach(s => s.classList.remove('active'));
  
  if (stageNum === 'battle') {
    document.getElementById('stage-battle').classList.add('active');
  } else {
    document.getElementById(`stage-${stageNum}`).classList.add('active');
  }

  if (stageNum === 3) {
    renderHeroCard();
  }
}

renderQuestion();
