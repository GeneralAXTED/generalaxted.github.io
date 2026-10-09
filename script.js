/**
 * @AxteD Landing Page - Interactive Logic & Visual Effects
 * Features: Rain & Starfield Canvas, Web Audio Ambient Synthesizer,
 * Quote Filtering & Search, Share & Copy actions.
 */

// ================= CURATED UZBEK QUOTES DATABASE =================
const quotesDatabase = [
  {
    id: 1,
    text: "Sokinlik — bu shovqinning yo'qligi emas, balki shovqin ichida o'z qalbing ovozini eshita olishingdir.",
    author: "AxteD Falsafasi",
    category: "sokinlik",
    source: "@AxteD"
  },
  {
    id: 2,
    text: "Dunyodagi eng qimmat narsa — vaqtida aytilgan rost so'z va o'rnida saqlangan sokinlikdir.",
    author: "Kitoblardan Satrlar",
    category: "kitoblardan",
    source: "Klassik Hikmat"
  },
  {
    id: 3,
    text: "Qorong'ulikdan qo'rqma, chunki eng yorug' yulduzlar faqat qorong'i osmondagina ko'rinadi.",
    author: "Jaloliddin Rumiy",
    category: "falsafa",
    source: "Masnaviy"
  },
  {
    id: 4,
    text: "Ba'zida birgina jimlik, minglab so'zlar bera olmagan javobni beradi.",
    author: "Lev Tolstoy",
    category: "falsafa",
    source: "Iqrornoma"
  },
  {
    id: 5,
    text: "Har bir inson o'z ichida butun bir olamni tashiydi. O'z olamingizni tashqi shovqinlar bilan bulg'amang.",
    author: "AxteD Hikmatlari",
    category: "sokinlik",
    source: "@AxteD"
  },
  {
    id: 6,
    text: "Kitob — bu insonning o'zi bilan yolg'iz qolib, asl mohiyatini anglashi uchun eng go'zal suhbatdoshdir.",
    author: "Alisher Navoiy",
    category: "kitoblardan",
    source: "Xamsa"
  },
  {
    id: 7,
    text: "Yomg'ir faqat yerga emas, charchagan ko'ngillarga ham yog'adi va ularni poklaydi.",
    author: "Sokin Tunning Ovozi",
    category: "sokinlik",
    source: "@AxteD"
  },
  {
    id: 8,
    text: "Odamlar seni qanday ko'rishlari muhim emas, Xudo seni qanday bilishi va sen o'zingni kim deb his qilishing muhim.",
    author: "Fyodor Dostoyevskiy",
    category: "hayot",
    source: "Jinoyat va Jazo"
  },
  {
    id: 9,
    text: "Ko'ngil shunday bir sirli ko'zguki, u faqat xolis va sokin lahzalarda haqiqatni aks ettiradi.",
    author: "Al-G'azoliy",
    category: "falsafa",
    source: "Ihyou Ulumiddin"
  },
  {
    id: 10,
    text: "Sevgi bu — ikki qalbning bir-biriga qarab emas, birgalikda bir xil tomonga qarashidir.",
    author: "Antuan de Sent-Ekzyuperi",
    category: "ishq",
    source: "Kichkina Shahzoda"
  },
  {
    id: 11,
    text: "Kechiring, lekin unutmang. Chunki kechirish — ruhingizni ozod qiladi, unutmaslik esa sizni qayta xatodan asraydi.",
    author: "Hayotiy Falsafa",
    category: "hayot",
    source: "Saboqlar"
  },
  {
    id: 12,
    text: "Kechalari hamma uxlaganda osmonga boq. O'sha cheksizlik ichida sening qayg'ularing qanchalik kichik ekanini his qilasan.",
    author: "AxteD Tungi Satrlari",
    category: "sokinlik",
    source: "@AxteD"
  }
];

// ================= DOM ELEMENTS =================
const canvas = document.getElementById('ambient-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
const quotesGrid = document.getElementById('quotesGrid');
const searchInput = document.getElementById('quote-search-input');
const clearSearchBtn = document.getElementById('clear-search-btn');
const categoryTabs = document.querySelectorAll('.tab-btn');
const noResults = document.getElementById('noResults');
const resetFilterBtn = document.getElementById('resetFilterBtn');
const randomQuoteBtn = document.getElementById('random-quote-btn');
const copyDailyBtn = document.getElementById('copyDailyBtn');
const shareTelegramDailyBtn = document.getElementById('shareTelegramDailyBtn');
const rainSoundBtn = document.getElementById('rain-sound-btn');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

// Spotlight Elements
const dailyQuoteText = document.getElementById('dailyQuoteText');
const dailyQuoteAuthor = document.getElementById('dailyQuoteAuthor');
const dailyQuoteCategory = document.getElementById('dailyQuoteCategory');
const currentDateEl = document.getElementById('currentDate');

// Card Generator / Preview Elements
const customQuoteInput = document.getElementById('customQuoteInput');
const customAuthorInput = document.getElementById('customAuthorInput');
const previewQuoteText = document.getElementById('previewQuoteText');
const previewAuthorText = document.getElementById('previewAuthorText');
const copyCustomCardBtn = document.getElementById('copyCustomCardBtn');

let currentCategory = 'all';
let searchQuery = '';

// ================= AMBIENT CANVAS (RAIN & STARS) =================
let width = 0;
let height = 0;
let raindrops = [];
let stars = [];

function initCanvas() {
  if (!canvas || !ctx) return;
  
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

  // Generate gentle raindrops
  raindrops = [];
  const dropCount = Math.min(Math.floor(width / 14), 80);
  for (let i = 0; i < dropCount; i++) {
    raindrops.push({
      x: Math.random() * width,
      y: Math.random() * height,
      length: Math.random() * 20 + 10,
      speed: Math.random() * 4 + 3,
      opacity: Math.random() * 0.4 + 0.1,
      splashRadius: 0
    });
  }

  // Generate subtle stars
  stars = [];
  const starCount = Math.min(Math.floor(width / 12), 100);
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * (height * 0.7),
      radius: Math.random() * 1.3 + 0.3,
      alpha: Math.random() * 0.7 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.005
    });
  }
}

function renderCanvas() {
  if (!canvas || !ctx) return;

  ctx.clearRect(0, 0, width, height);

  // Draw Stars
  stars.forEach(star => {
    star.alpha += Math.sin(Date.now() * star.twinkleSpeed) * 0.008;
    const clampedAlpha = Math.max(0.1, Math.min(0.9, star.alpha));
    
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(226, 232, 240, ${clampedAlpha})`;
    ctx.shadowBlur = star.radius * 3;
    ctx.shadowColor = 'rgba(147, 197, 253, 0.8)';
    ctx.fill();
    ctx.shadowBlur = 0;
  });

  // Draw Raindrops with slight drift
  ctx.strokeStyle = 'rgba(186, 230, 253, 0.28)';
  ctx.lineWidth = 1;
  ctx.lineCap = 'round';

  raindrops.forEach(drop => {
    ctx.beginPath();
    ctx.moveTo(drop.x, drop.y);
    ctx.lineTo(drop.x - 1, drop.y + drop.length);
    ctx.strokeStyle = `rgba(186, 230, 253, ${drop.opacity})`;
    ctx.stroke();

    drop.y += drop.speed;
    drop.x -= 0.3; // subtle rain angle

    if (drop.y > height) {
      drop.y = -20;
      drop.x = Math.random() * width;
    }
  });

  requestAnimationFrame(renderCanvas);
}

window.addEventListener('resize', initCanvas);

// ================= WEB AUDIO RAIN SYNTHESIZER =================
// Autonomous soothing rain noise without any external audio file
let audioCtx = null;
let isAudioPlaying = false;
let noiseNode = null;
let gainNode = null;

function toggleRainSound() {
  if (!isAudioPlaying) {
    startRainSound();
  } else {
    stopRainSound();
  }
}

function startRainSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    if (!audioCtx) {
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    // Generate Pink Noise (natural rain frequency)
    const bufferSize = audioCtx.sampleRate * 2;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    noiseNode = audioCtx.createBufferSource();
    noiseNode.buffer = noiseBuffer;
    noiseNode.loop = true;

    // Filter to simulate soft raindrops hitting ground/leaves
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, audioCtx.currentTime);

    gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.4, audioCtx.currentTime + 1.5);

    noiseNode.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    noiseNode.start();
    isAudioPlaying = true;
    rainSoundBtn.classList.add('active');
    showToast('Sokin yomg\'ir tovushi yoqildi 🌧️');
  } catch (err) {
    console.warn('Audio start prevented or unsupported:', err);
  }
}

function stopRainSound() {
  if (gainNode && audioCtx) {
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
    setTimeout(() => {
      if (noiseNode) {
        noiseNode.stop();
        noiseNode.disconnect();
      }
      isAudioPlaying = false;
      rainSoundBtn.classList.remove('active');
      showToast('Ovoz o\'chirildi');
    }, 800);
  }
}

// ================= QUOTES RENDERING & FILTERING =================
function renderQuotes() {
  if (!quotesGrid) return;

  const filtered = quotesDatabase.filter(q => {
    const matchCategory = (currentCategory === 'all') || (q.category === currentCategory);
    const textToSearch = (q.text + ' ' + q.author + ' ' + q.source).toLowerCase();
    const matchSearch = textToSearch.includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  quotesGrid.innerHTML = '';

  if (filtered.length === 0) {
    noResults.classList.remove('hidden');
    return;
  } else {
    noResults.classList.add('hidden');
  }

  filtered.forEach(quote => {
    const card = document.createElement('div');
    card.className = 'quote-card animate-fade-up';
    card.innerHTML = `
      <div class="quote-card-header">
        <span class="card-category-badge">${getCategoryName(quote.category)}</span>
        <button class="card-heart-btn" title="Yoqtirish" aria-label="Yoqtirish" onclick="toggleLike(this)">♥</button>
      </div>
      <div class="quote-card-body">
        <p>“${escapeHtml(quote.text)}”</p>
        <div class="quote-card-author">${escapeHtml(quote.author)}</div>
      </div>
      <div class="quote-card-footer">
        <span class="card-source-tag">${escapeHtml(quote.source)}</span>
        <div class="card-actions">
          <button class="icon-btn" title="Nusxalash" onclick="copyQuote('${escapeQuoteForJs(quote.text)}', '${escapeQuoteForJs(quote.author)}')">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
          <button class="icon-btn" title="Telegramda ulashish" onclick="shareToTelegram('${escapeQuoteForJs(quote.text)}', '${escapeQuoteForJs(quote.author)}')">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
            </svg>
          </button>
        </div>
      </div>
    `;
    quotesGrid.appendChild(card);
  });
}

function getCategoryName(cat) {
  const map = {
    'sokinlik': 'Sokinlik',
    'kitoblardan': 'Kitoblardan',
    'falsafa': 'Falsafa',
    'hayot': 'Hayotiy',
    'ishq': 'Qalb & Ishq'
  };
  return map[cat] || 'Hikmat';
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function escapeQuoteForJs(str) {
  return str.replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\n/g, ' ');
}

window.toggleLike = function(btn) {
  btn.classList.toggle('liked');
  if (btn.classList.contains('liked')) {
    btn.style.transform = 'scale(1.3)';
    setTimeout(() => { btn.style.transform = 'scale(1)'; }, 200);
    showToast('Iqtibos yoqdi deb belgilandi ❤️');
  }
};

window.copyQuote = function(text, author) {
  const fullText = `"${text}"\n\n— ${author}\n\nManba: @AxteD (https://t.me/AxteD)`;
  navigator.clipboard.writeText(fullText).then(() => {
    showToast('Iqtibos nusxalandi! 📋');
  }).catch(() => {
    showToast('Nusxalashda xatolik bo\'ldi');
  });
};

window.shareToTelegram = function(text, author) {
  const msg = `"${text}"\n\n— ${author}\n\n🌙 Kanal: @AxteD`;
  const url = `https://t.me/share/url?url=${encodeURIComponent('https://t.me/AxteD')}&text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
};

// ================= TOAST NOTIFICATION =================
let toastTimeout;
function showToast(msg) {
  if (!toast) return;
  toastMessage.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ================= SPOTLIGHT / DAILY QUOTE =================
function updateDailyQuote() {
  const today = new Date();
  const options = { month: 'long', day: 'numeric', weekday: 'long' };
  if (currentDateEl) {
    currentDateEl.textContent = today.toLocaleDateString('uz-UZ', options);
  }

  // Pick deterministic quote based on day of year
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  const selectedQuote = quotesDatabase[dayOfYear % quotesDatabase.length];

  if (dailyQuoteText && selectedQuote) {
    dailyQuoteText.textContent = selectedQuote.text;
    dailyQuoteAuthor.textContent = `— ${selectedQuote.author}`;
    dailyQuoteCategory.textContent = getCategoryName(selectedQuote.category);
  }
}

function getRandomQuote() {
  const randomIdx = Math.floor(Math.random() * quotesDatabase.length);
  const quote = quotesDatabase[randomIdx];

  if (dailyQuoteText && quote) {
    dailyQuoteText.style.opacity = '0';
    setTimeout(() => {
      dailyQuoteText.textContent = quote.text;
      dailyQuoteAuthor.textContent = `— ${quote.author}`;
      dailyQuoteCategory.textContent = getCategoryName(quote.category);
      dailyQuoteText.style.opacity = '1';
      showToast('Yangi iqtibos tanlandi ✨');
    }, 200);
  }
}

// ================= EVENT LISTENERS =================
document.addEventListener('DOMContentLoaded', () => {
  initCanvas();
  renderCanvas();
  updateDailyQuote();
  renderQuotes();

  // Search input handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      if (clearSearchBtn) {
        clearSearchBtn.classList.toggle('visible', searchQuery.length > 0);
      }
      renderQuotes();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      clearSearchBtn.classList.remove('visible');
      renderQuotes();
    });
  }

  // Category Tabs
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.dataset.category;
      renderQuotes();
    });
  });

  // Reset Filter Button
  if (resetFilterBtn) {
    resetFilterBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchQuery = '';
      currentCategory = 'all';
      categoryTabs.forEach(t => t.classList.toggle('active', t.dataset.category === 'all'));
      if (clearSearchBtn) clearSearchBtn.classList.remove('visible');
      renderQuotes();
    });
  }

  // Random Quote CTA
  if (randomQuoteBtn) {
    randomQuoteBtn.addEventListener('click', getRandomQuote);
  }

  // Copy Daily Quote
  if (copyDailyBtn) {
    copyDailyBtn.addEventListener('click', () => {
      copyQuote(dailyQuoteText.textContent, dailyQuoteAuthor.textContent.replace('— ', ''));
    });
  }

  // Share Daily Quote to Telegram
  if (shareTelegramDailyBtn) {
    shareTelegramDailyBtn.addEventListener('click', () => {
      shareToTelegram(dailyQuoteText.textContent, dailyQuoteAuthor.textContent.replace('— ', ''));
    });
  }

  // Rain Audio Button
  if (rainSoundBtn) {
    rainSoundBtn.addEventListener('click', toggleRainSound);
  }

  // Live Card Preview Generator
  if (customQuoteInput && customAuthorInput) {
    const updatePreview = () => {
      if (previewQuoteText) previewQuoteText.textContent = customQuoteInput.value || 'Sokinlik qalbda boshlanadi...';
      if (previewAuthorText) previewAuthorText.textContent = customAuthorInput.value || '@AxteD';
    };
    customQuoteInput.addEventListener('input', updatePreview);
    customAuthorInput.addEventListener('input', updatePreview);
  }

  if (copyCustomCardBtn) {
    copyCustomCardBtn.addEventListener('click', () => {
      const q = customQuoteInput.value || '';
      const a = customAuthorInput.value || '@AxteD';
      copyQuote(q, a);
    });
  }

  // Interactive Parallax Moon on Mouse Move
  const moonContainer = document.getElementById('moonContainer');
  if (moonContainer) {
    window.addEventListener('mousemove', (e) => {
      const moveX = (e.clientX - window.innerWidth / 2) * 0.015;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.015;
      moonContainer.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  }

  // Dynamic Year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
