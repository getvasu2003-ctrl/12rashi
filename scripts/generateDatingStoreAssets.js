import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outScreenshotsDir = path.resolve('public/screenshots');
if (!fs.existsSync(outScreenshotsDir)) {
  fs.mkdirSync(outScreenshotsDir, { recursive: true });
}

// ==========================================
// 1. FEATURE GRAPHIC (1024 x 500 px)
// ==========================================
function getFeatureGraphicSvg() {
  const w = 1024;
  const h = 500;
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fgBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e0b2e" />
      <stop offset="45%" stop-color="#2d0a3d" />
      <stop offset="80%" stop-color="#180b29" />
      <stop offset="100%" stop-color="#0b0f19" />
    </linearGradient>

    <radialGradient id="fgAura" cx="50%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#e11d48" stop-opacity="0.35" />
      <stop offset="50%" stop-color="#9333ea" stop-opacity="0.18" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>

    <linearGradient id="goldText" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="35%" stop-color="#fef08a" />
      <stop offset="75%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>

    <linearGradient id="roseText" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f43f5e" />
      <stop offset="50%" stop-color="#fb7185" />
      <stop offset="100%" stop-color="#fda4af" />
    </linearGradient>

    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(255, 255, 255, 0.12)" />
      <stop offset="100%" stop-color="rgba(255, 255, 255, 0.04)" />
    </linearGradient>

    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>

    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#000000" flood-opacity="0.6" />
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="${w}" height="${h}" fill="url(#fgBg)" />
  <rect width="${w}" height="${h}" fill="url(#fgAura)" />

  <!-- Constellations & Ambient Stars -->
  <g fill="#fbcfe8" opacity="0.35">
    <circle cx="80" cy="80" r="2.5" />
    <circle cx="160" cy="120" r="1.8" />
    <circle cx="240" cy="70" r="2.2" />
    <circle cx="320" cy="140" r="1.5" />
    <circle cx="720" cy="80" r="2" />
    <circle cx="820" cy="130" r="2.5" />
    <circle cx="930" cy="90" r="3" />
    <circle cx="960" cy="180" r="2" />
    <circle cx="90" cy="400" r="2" />
    <circle cx="210" cy="430" r="2.5" />
    <circle cx="800" cy="420" r="2.5" />
    <circle cx="920" cy="390" r="1.8" />
  </g>

  <!-- Constellation Connections -->
  <g stroke="#f472b6" stroke-width="0.8" opacity="0.2" fill="none">
    <polyline points="80,80 160,120 240,70" />
    <polyline points="720,80 820,130 930,90 960,180" />
    <polyline points="800,420 920,390" />
  </g>

  <!-- Top Category Tag -->
  <g transform="translate(322, 42)">
    <rect width="380" height="38" rx="19" fill="url(#cardGrad)" stroke="rgba(244, 63, 94, 0.5)" stroke-width="1.5" />
    <text x="190" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="800" fill="#fecdd3" text-anchor="middle" letter-spacing="2">
      ✦ INDIA'S PREMIER 40+ DATING APP ✦
    </text>
  </g>

  <!-- Main Title: 12Rashi Dating -->
  <g transform="translate(512, 160)" text-anchor="middle">
    <!-- Heart & Ring Icon Graphic -->
    <text x="0" y="-12" font-family="Georgia, 'Times New Roman', serif" font-size="78" font-weight="900" fill="url(#goldText)" filter="url(#softGlow)" letter-spacing="1">
      12Rashi Dating
    </text>
  </g>

  <!-- Subtitle -->
  <text x="512" y="212" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="700" fill="#fbcfe8" text-anchor="middle" letter-spacing="1">
    EXCLUSIVE COMPANIONSHIP &amp; MEANINGFUL DATING FOR 40+ PROFESSIONALS
  </text>

  <!-- 3 Pillars Feature Cards -->
  <g transform="translate(62, 260)">
    <!-- Card 1: 100% Aadhaar Verified -->
    <g transform="translate(0, 0)" filter="url(#cardShadow)">
      <rect width="280" height="100" rx="20" fill="rgba(15, 23, 42, 0.75)" stroke="rgba(16, 185, 129, 0.45)" stroke-width="1.5" />
      <circle cx="45" cy="50" r="24" fill="rgba(16, 185, 129, 0.18)" />
      <text x="45" y="58" font-size="24" text-anchor="middle">🛡️</text>
      <text x="82" y="42" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="800" fill="#34d399">100% Aadhaar Verified</text>
      <text x="82" y="66" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500" fill="#94a3b8">Zero fake profiles or bots</text>
    </g>

    <!-- Card 2: AI Synergy & Rashi Match -->
    <g transform="translate(310, 0)" filter="url(#cardShadow)">
      <rect width="280" height="100" rx="20" fill="rgba(15, 23, 42, 0.75)" stroke="rgba(244, 63, 94, 0.45)" stroke-width="1.5" />
      <circle cx="45" cy="50" r="24" fill="rgba(244, 63, 94, 0.18)" />
      <text x="45" y="58" font-size="24" text-anchor="middle">💖</text>
      <text x="82" y="42" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="800" fill="#fb7185">AI Synergy &amp; Rashi Match</text>
      <text x="82" y="66" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500" fill="#94a3b8">Emotional &amp; cosmic harmony</text>
    </g>

    <!-- Card 3: Encrypted Chat & Video Dates -->
    <g transform="translate(620, 0)" filter="url(#cardShadow)">
      <rect width="280" height="100" rx="20" fill="rgba(15, 23, 42, 0.75)" stroke="rgba(168, 85, 247, 0.45)" stroke-width="1.5" />
      <circle cx="45" cy="50" r="24" fill="rgba(168, 85, 247, 0.18)" />
      <text x="45" y="58" font-size="24" text-anchor="middle">📹</text>
      <text x="82" y="42" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="800" fill="#c084fc">Private Chat &amp; Video Dates</text>
      <text x="82" y="66" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500" fill="#94a3b8">Discretion &amp; E2E encryption</text>
    </g>
  </g>

  <!-- Bottom Trust & Mature Demographics Ribbon -->
  <g transform="translate(162, 400)">
    <rect width="700" height="46" rx="23" fill="rgba(244, 63, 94, 0.15)" stroke="rgba(254, 205, 211, 0.4)" stroke-width="1.2" />
    <text x="350" y="29" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800" fill="#fef08a" text-anchor="middle">
      ★ 4.9/5 Rating • Exclusively for Accomplished Mature Singles, Divorcees &amp; Empty Nesters (Aged 40+)
    </text>
  </g>
</svg>`;
}

// ==========================================
// 2. MOBILE SCREENSHOT 1: Curated Dossiers for Singles 40+ (1080 x 1920)
// ==========================================
function getMobile1Svg() {
  const w = 1080;
  const h = 1920;
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#140722" />
      <stop offset="35%" stop-color="#1b0a2e" />
      <stop offset="100%" stop-color="#0b0f19" />
    </linearGradient>
    <linearGradient id="headerGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#be123c" />
      <stop offset="50%" stop-color="#881337" />
      <stop offset="100%" stop-color="#4c0519" />
    </linearGradient>
    <linearGradient id="gold1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="100%" stop-color="#f59e0b" />
    </linearGradient>
    <filter id="sh1" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="10" stdDeviation="16" flood-color="#000000" flood-opacity="0.6" />
    </filter>
  </defs>

  <rect width="${w}" height="${h}" fill="url(#bg1)" />

  <!-- Top Android Status Bar -->
  <g fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="24" font-weight="600">
    <text x="60" y="52">09:41</text>
    <text x="960" y="52" text-anchor="end">5G  100%</text>
  </g>

  <!-- App Header -->
  <g transform="translate(60, 90)">
    <circle cx="45" cy="45" r="45" fill="url(#headerGrad1)" />
    <text x="45" y="56" font-size="42" text-anchor="middle">💖</text>
    <text x="110" y="44" font-family="Georgia, serif" font-weight="900" font-size="46" fill="#ffffff">12Rashi Dating</text>
    <text x="110" y="78" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="700" font-size="20" fill="#f43f5e">
      40+ MATURE DATING &amp; MEANINGFUL COMPANIONSHIP
    </text>

    <!-- Profile & Boost Badges -->
    <rect x="740" y="15" width="220" height="56" rx="28" fill="rgba(244, 63, 94, 0.2)" stroke="#f43f5e" stroke-width="2" />
    <text x="850" y="50" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="22" fill="#fecdd3" text-anchor="middle">
      👑 Gold Member
    </text>
  </g>

  <!-- Big Marketing Banner -->
  <g transform="translate(60, 220)">
    <text x="480" y="40" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="900" font-size="42" fill="#ffffff" text-anchor="middle">
      Curated Dossiers for Accomplished Singles 40+
    </text>
    <text x="480" y="85" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="600" font-size="26" fill="#fb7185" text-anchor="middle">
      Aadhaar-Verified • Deep Conversations • High Emotional IQ
    </text>
  </g>

  <!-- Filter Pills -->
  <g transform="translate(60, 350)">
    <!-- Pill 1 -->
    <rect width="210" height="60" rx="30" fill="#f43f5e" />
    <text x="105" y="38" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="24" fill="#ffffff" text-anchor="middle">All 40+ Singles</text>

    <!-- Pill 2 -->
    <rect x="230" width="220" height="60" rx="30" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" />
    <text x="340" y="38" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="700" font-size="22" fill="#cbd5e1" text-anchor="middle">Empty Nesters</text>

    <!-- Pill 3 -->
    <rect x="470" width="240" height="60" rx="30" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" />
    <text x="590" y="38" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="700" font-size="22" fill="#cbd5e1" text-anchor="middle">Divorced &amp; Thriving</text>

    <!-- Pill 4 -->
    <rect x="730" width="230" height="60" rx="30" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" />
    <text x="845" y="38" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="700" font-size="22" fill="#cbd5e1" text-anchor="middle">Top Executives</text>
  </g>

  <!-- Main Profile Showcase Card -->
  <g transform="translate(60, 450)" filter="url(#sh1)">
    <!-- Card Container -->
    <rect width="960" height="1260" rx="36" fill="#1e142e" stroke="rgba(244, 63, 94, 0.4)" stroke-width="2" />

    <!-- Profile Photo Banner Representation -->
    <rect x="30" y="30" width="900" height="540" rx="28" fill="#2d1245" />
    <!-- Gradient overlay on photo -->
    <linearGradient id="photoCover" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#4c0519" stop-opacity="0.2" />
      <stop offset="70%" stop-color="#1e142e" stop-opacity="0.85" />
      <stop offset="100%" stop-color="#1e142e" stop-opacity="1" />
    </linearGradient>
    <rect x="30" y="30" width="900" height="540" rx="28" fill="url(#photoCover)" />

    <!-- Avatar Circle -->
    <circle cx="480" cy="230" r="140" fill="#4c0519" stroke="#f43f5e" stroke-width="6" />
    <!-- Icon representation of mature professional woman -->
    <text x="480" y="275" font-size="140" text-anchor="middle">👩‍⚕️</text>

    <!-- Top floating badges on photo -->
    <rect x="60" y="60" width="290" height="54" rx="27" fill="rgba(5, 150, 105, 0.9)" />
    <text x="205" y="95" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="22" fill="#ffffff" text-anchor="middle">
      ✓ UIDAI Aadhaar Verified
    </text>

    <rect x="650" y="60" width="250" height="54" rx="27" fill="rgba(190, 18, 60, 0.9)" />
    <text x="775" y="95" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="22" fill="#ffffff" text-anchor="middle">
      💖 94% AI Synergy
    </text>

    <!-- Name & Age -->
    <text x="60" y="620" font-family="Georgia, serif" font-weight="900" font-size="44" fill="#ffffff">
      Dr. Sunita Deshmukh, 48
    </text>

    <!-- Profession & Location -->
    <text x="60" y="665" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="700" font-size="26" fill="#fb7185">
      🩺 Chief of Pediatric Cardiology • Bandra West, Mumbai
    </text>
    <text x="60" y="705" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="500" font-size="22" fill="#94a3b8">
      🎓 MD &amp; Fellowship, KEM &amp; Johns Hopkins • 8 km away
    </text>

    <!-- Tags Row -->
    <g transform="translate(60, 735)">
      <rect width="250" height="46" rx="23" fill="rgba(244, 63, 94, 0.18)" stroke="#f43f5e" />
      <text x="125" y="30" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="700" font-size="20" fill="#fecdd3" text-anchor="middle">♉ Vrishabha (Taurus)</text>

      <rect x="270" width="290" height="46" rx="23" fill="rgba(168, 85, 247, 0.18)" stroke="#c084fc" />
      <text x="415" y="30" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="700" font-size="20" fill="#e9d5ff" text-anchor="middle">Proud Parent (Empty Nester)</text>

      <rect x="580" width="260" height="46" rx="23" fill="rgba(16, 185, 129, 0.18)" stroke="#34d399" />
      <text x="710" y="30" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="700" font-size="20" fill="#a7f3d0" text-anchor="middle">Trust Score: 99/100</text>
    </g>

    <!-- Bio Card -->
    <rect x="60" y="810" width="840" height="150" rx="20" fill="rgba(0,0,0,0.35)" />
    <text x="90" y="855" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="22" fill="#e2e8f0" font-style="italic">
      "Decades in medicine taught me true wealth is quiet presence &amp; authenticity.
    </text>
    <text x="90" y="895" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="22" fill="#e2e8f0" font-style="italic">
      Seeking an emotionally grounded equal who values warmth, intellect and easy laughter."
    </text>
    <text x="90" y="935" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="18" font-weight="700" fill="#f43f5e">
      Interests: Hindustani Classical • Marathon Running • Art Galleries • Mindful Living
    </text>

    <!-- Action Buttons -->
    <g transform="translate(60, 990)">
      <!-- AI Compatibility button -->
      <rect width="260" height="80" rx="40" fill="rgba(244, 63, 94, 0.2)" stroke="#f43f5e" stroke-width="2" />
      <text x="130" y="50" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="24" fill="#fb7185" text-anchor="middle">
        ✨ AI Synergy
      </text>

      <!-- Video Date button -->
      <rect x="285" width="260" height="80" rx="40" fill="rgba(168, 85, 247, 0.2)" stroke="#a855f7" stroke-width="2" />
      <text x="415" y="50" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="24" fill="#d8b4fe" text-anchor="middle">
        📹 Video Date
      </text>

      <!-- Direct Intro / Chat button -->
      <rect x="570" width="270" height="80" rx="40" fill="#f43f5e" />
      <text x="705" y="50" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="24" fill="#ffffff" text-anchor="middle">
        💬 Connect Now
      </text>
    </g>

    <!-- Security & Encryption Guarantee strip -->
    <rect x="60" y="1100" width="840" height="60" rx="16" fill="rgba(16, 185, 129, 0.12)" stroke="rgba(16, 185, 129, 0.3)" />
    <text x="480" y="1138" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="700" font-size="20" fill="#6ee7b7" text-anchor="middle">
      🔒 End-to-End Encrypted Dossier • Private UIDAI Identity Verified
    </text>
  </g>

  <!-- Bottom Navigation Bar -->
  <g transform="translate(0, 1750)">
    <rect width="${w}" height="170" fill="#0d0716" />
    <line x1="0" y1="0" x2="${w}" y2="0" stroke="rgba(255,255,255,0.1)" stroke-width="1.5" />

    <!-- Tab 1 Active: Dossiers -->
    <text x="135" y="65" font-size="44" text-anchor="middle">📇</text>
    <text x="135" y="105" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="22" fill="#f43f5e" text-anchor="middle">Dossiers</text>

    <!-- Tab 2: Synergy -->
    <text x="360" y="65" font-size="44" text-anchor="middle">✨</text>
    <text x="360" y="105" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="600" font-size="20" fill="#94a3b8" text-anchor="middle">Synergy</text>

    <!-- Tab 3: Messages -->
    <text x="585" y="65" font-size="44" text-anchor="middle">💬</text>
    <text x="585" y="105" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="600" font-size="20" fill="#94a3b8" text-anchor="middle">Chats</text>

    <!-- Tab 4: Trust Hub -->
    <text x="810" y="65" font-size="44" text-anchor="middle">🛡️</text>
    <text x="810" y="105" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="600" font-size="20" fill="#94a3b8" text-anchor="middle">Trust Hub</text>

    <!-- Tab 5: Profile -->
    <text x="980" y="65" font-size="44" text-anchor="middle">👤</text>
    <text x="980" y="105" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="600" font-size="20" fill="#94a3b8" text-anchor="middle">Profile</text>
  </g>
</svg>`;
}

// ==========================================
// 3. MOBILE SCREENSHOT 2: AI Synergy & Rashi Compatibility (1080 x 1920)
// ==========================================
function getMobile2Svg() {
  const w = 1080;
  const h = 1920;
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#180b2a" />
      <stop offset="40%" stop-color="#2a0d3b" />
      <stop offset="100%" stop-color="#090d16" />
    </linearGradient>
    <linearGradient id="roseGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f43f5e" />
      <stop offset="100%" stop-color="#be123c" />
    </linearGradient>
    <filter id="sh2" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="10" stdDeviation="16" flood-color="#000000" flood-opacity="0.6" />
    </filter>
  </defs>

  <rect width="${w}" height="${h}" fill="url(#bg2)" />

  <!-- Status Bar -->
  <g fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="24" font-weight="600">
    <text x="60" y="52">09:41</text>
    <text x="960" y="52" text-anchor="end">5G  100%</text>
  </g>

  <!-- Header -->
  <g transform="translate(60, 90)">
    <rect width="70" height="70" rx="35" fill="rgba(255,255,255,0.08)" />
    <text x="35" y="46" font-size="34" fill="#ffffff" text-anchor="middle">←</text>
    <text x="100" y="48" font-family="Georgia, serif" font-weight="900" font-size="40" fill="#ffffff">AI Synergy &amp; Rashi Match</text>
    <text x="100" y="80" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="700" font-size="20" fill="#f43f5e">
      COSMIC ALIGNMENT + EMOTIONAL INTELLIGENCE
    </text>
  </g>

  <!-- Big Marketing Tagline -->
  <g transform="translate(60, 210)">
    <text x="480" y="40" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="900" font-size="42" fill="#ffffff" text-anchor="middle">
      Deep Compatibility Beyond Surface Swipes
    </text>
    <text x="480" y="85" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="600" font-size="26" fill="#fb7185" text-anchor="middle">
      Vedic Rashi Harmony • Life Stage Alignment • Shared Values
    </text>
  </g>

  <!-- Match Circular Visualizer -->
  <g transform="translate(60, 340)" filter="url(#sh2)">
    <rect width="960" height="340" rx="32" fill="#1e142e" stroke="rgba(244,63,94,0.4)" stroke-width="1.5" />

    <!-- Left Member -->
    <g transform="translate(140, 70)">
      <circle cx="80" cy="80" r="75" fill="#311042" stroke="#f43f5e" stroke-width="4" />
      <text x="80" y="105" font-size="70" text-anchor="middle">👨‍💼</text>
      <text x="80" y="195" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="26" fill="#ffffff" text-anchor="middle">You (46)</text>
      <text x="80" y="225" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="600" font-size="20" fill="#f43f5e" text-anchor="middle">♈ Mesh (Aries)</text>
    </g>

    <!-- Center Compatibility Ring -->
    <g transform="translate(480, 150)">
      <circle cx="0" cy="0" r="85" fill="#4c0519" stroke="#f43f5e" stroke-width="6" />
      <text x="0" y="-12" font-family="Georgia, serif" font-weight="900" font-size="48" fill="#fef08a" text-anchor="middle">94%</text>
      <text x="0" y="24" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="18" fill="#ffffff" text-anchor="middle">SYNERGY</text>
      <text x="0" y="52" font-size="24" text-anchor="middle">⚡💖</text>
    </g>

    <!-- Right Member -->
    <g transform="translate(660, 70)">
      <circle cx="80" cy="80" r="75" fill="#311042" stroke="#f43f5e" stroke-width="4" />
      <text x="80" y="105" font-size="70" text-anchor="middle">👩‍⚕️</text>
      <text x="80" y="195" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="26" fill="#ffffff" text-anchor="middle">Sunita (48)</text>
      <text x="80" y="225" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="600" font-size="20" fill="#f43f5e" text-anchor="middle">♉ Vrishabha</text>
    </g>
  </g>

  <!-- Detailed Compatibility Breakdown Cards -->
  <g transform="translate(60, 720)">
    <!-- Dimension 1: Rashi & Astrological Harmony -->
    <g transform="translate(0, 0)" filter="url(#sh2)">
      <rect width="960" height="210" rx="24" fill="#1b1228" stroke="rgba(244,63,94,0.3)" />
      <circle cx="60" cy="60" r="30" fill="rgba(244,63,94,0.2)" />
      <text x="60" y="70" font-size="30" text-anchor="middle">✨</text>

      <text x="110" y="55" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="28" fill="#ffffff">
        Rashi &amp; Cosmic Chemistry
      </text>
      <rect x="740" y="30" width="180" height="44" rx="22" fill="#059669" />
      <text x="830" y="60" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="20" fill="#ffffff" text-anchor="middle">32 / 36 Gunas</text>

      <text x="110" y="98" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="500" font-size="22" fill="#cbd5e1">
        Mesh (Fire) provides drive while Vrishabha (Earth) anchors stability.
      </text>
      <text x="110" y="132" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="500" font-size="20" fill="#94a3b8">
        Planetary ruler alignment indicates effortless communication &amp; deep mutual warmth.
      </text>

      <!-- Progress bar -->
      <rect x="110" y="165" width="810" height="12" rx="6" fill="rgba(255,255,255,0.1)" />
      <rect x="110" y="165" width="740" height="12" rx="6" fill="#f43f5e" />
    </g>

    <!-- Dimension 2: 40+ Life Stage & Independence -->
    <g transform="translate(0, 240)" filter="url(#sh2)">
      <rect width="960" height="210" rx="24" fill="#1b1228" stroke="rgba(168,85,247,0.3)" />
      <circle cx="60" cy="60" r="30" fill="rgba(168,85,247,0.2)" />
      <text x="60" y="70" font-size="30" text-anchor="middle">🏡</text>

      <text x="110" y="55" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="28" fill="#ffffff">
        Life Stage &amp; Autonomy Balance
      </text>
      <rect x="740" y="30" width="180" height="44" rx="22" fill="#7c3aed" />
      <text x="830" y="60" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="20" fill="#ffffff" text-anchor="middle">98% Match</text>

      <text x="110" y="98" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="500" font-size="22" fill="#cbd5e1">
        Both are accomplished empty nesters with grown adult children.
      </text>
      <text x="110" y="132" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="500" font-size="20" fill="#94a3b8">
        Full emotional readiness for independent, unencumbered companionship.
      </text>

      <!-- Progress bar -->
      <rect x="110" y="165" width="810" height="12" rx="6" fill="rgba(255,255,255,0.1)" />
      <rect x="110" y="165" width="790" height="12" rx="6" fill="#a855f7" />
    </g>

    <!-- Dimension 3: Lifestyle & Values Alignment -->
    <g transform="translate(0, 480)" filter="url(#sh2)">
      <rect width="960" height="210" rx="24" fill="#1b1228" stroke="rgba(245,158,11,0.3)" />
      <circle cx="60" cy="60" r="30" fill="rgba(245,158,11,0.2)" />
      <text x="60" y="70" font-size="30" text-anchor="middle">🎯</text>

      <text x="110" y="55" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="28" fill="#ffffff">
        Executive Lifestyle &amp; Quiet Luxury
      </text>
      <rect x="740" y="30" width="180" height="44" rx="22" fill="#d97706" />
      <text x="830" y="60" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="20" fill="#ffffff" text-anchor="middle">92% Match</text>

      <text x="110" y="98" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="500" font-size="22" fill="#cbd5e1">
        Shared values: Mindful mornings, low drama, intellectual conversations.
      </text>
      <text x="110" y="132" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="500" font-size="20" fill="#94a3b8">
        Retirement vision: Quiet coastal sanctuaries &amp; philanthropic initiatives.
      </text>

      <!-- Progress bar -->
      <rect x="110" y="165" width="810" height="12" rx="6" fill="rgba(255,255,255,0.1)" />
      <rect x="110" y="165" width="745" height="12" rx="6" fill="#f59e0b" />
    </g>
  </g>

  <!-- Big Action CTA Button -->
  <g transform="translate(60, 1500)">
    <rect width="960" height="96" rx="48" fill="#f43f5e" filter="url(#sh2)" />
    <text x="480" y="60" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="900" font-size="32" fill="#ffffff" text-anchor="middle">
      💬 Start Private Conversation With Sunita
    </text>
  </g>

  <!-- Bottom Discretion Note -->
  <text x="540" y="1650" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="600" font-size="22" fill="#6ee7b7" text-anchor="middle">
    🛡️ Powered by 12Rashi Proprietary Synergy &amp; Vedic AI Algorithm
  </text>
</svg>`;
}

// ==========================================
// 4. MOBILE SCREENSHOT 3: Private Encrypted Chats & Video Dates (1080 x 1920)
// ==========================================
function getMobile3Svg() {
  const w = 1080;
  const h = 1920;
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg3" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#140722" />
      <stop offset="35%" stop-color="#1b0a2e" />
      <stop offset="100%" stop-color="#0b0f19" />
    </linearGradient>
    <filter id="sh3" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="10" stdDeviation="16" flood-color="#000000" flood-opacity="0.6" />
    </filter>
  </defs>

  <rect width="${w}" height="${h}" fill="url(#bg3)" />

  <!-- Status Bar -->
  <g fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="24" font-weight="600">
    <text x="60" y="52">09:41</text>
    <text x="960" y="52" text-anchor="end">5G  100%</text>
  </g>

  <!-- Header -->
  <g transform="translate(60, 90)">
    <circle cx="45" cy="45" r="45" fill="#311042" stroke="#f43f5e" stroke-width="3" />
    <text x="45" y="58" font-size="44" text-anchor="middle">👨‍⚖️</text>
    <text x="110" y="44" font-family="Georgia, serif" font-weight="900" font-size="38" fill="#ffffff">Rajesh Singhania, 52</text>
    <text x="110" y="78" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="700" font-size="20" fill="#34d399">
      ✓ Aadhaar Verified • Senior Corporate Partner
    </text>

    <!-- Video Call Button -->
    <rect x="760" y="15" width="200" height="60" rx="30" fill="#f43f5e" />
    <text x="860" y="52" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="22" fill="#ffffff" text-anchor="middle">
      📹 Video Date
    </text>
  </g>

  <!-- Big Marketing Tagline -->
  <g transform="translate(60, 210)">
    <text x="480" y="40" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="900" font-size="42" fill="#ffffff" text-anchor="middle">
      Discretion, Privacy &amp; Face-to-Face Dates
    </text>
    <text x="480" y="85" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="600" font-size="26" fill="#fb7185" text-anchor="middle">
      End-to-End Cryptographic Encryption • High Definition Video Room
    </text>
  </g>

  <!-- Encryption Security Pill -->
  <g transform="translate(60, 320)">
    <rect width="960" height="54" rx="27" fill="rgba(16, 185, 129, 0.15)" stroke="rgba(16, 185, 129, 0.4)" stroke-width="1.5" />
    <text x="480" y="35" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="700" font-size="20" fill="#6ee7b7" text-anchor="middle">
      🔒 End-to-End Encrypted • Verified Key: SHA256:UIDAI-A48F920
    </text>
  </g>

  <!-- Chat Messages Stream -->
  <g transform="translate(60, 410)">
    <!-- Rajesh Incoming Bubble -->
    <g transform="translate(0, 0)">
      <rect width="720" height="150" rx="24" fill="#241538" stroke="rgba(255,255,255,0.08)" />
      <text x="36" y="50" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="24" fill="#f1f5f9">
        "Good evening Vasu. I truly appreciated your
      </text>
      <text x="36" y="85" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="24" fill="#f1f5f9">
        thoughts on quiet retreats and classical music."
      </text>
      <text x="36" y="122" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="18" fill="#94a3b8">
        Yesterday, 7:14 PM • Sent with E2E Discretion
      </text>
    </g>

    <!-- Outgoing Bubble (You) -->
    <g transform="translate(240, 180)">
      <rect width="720" height="150" rx="24" fill="#be123c" />
      <text x="36" y="50" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="24" fill="#ffffff">
        "Thank you Rajesh! It's rare to meet someone who
      </text>
      <text x="36" y="85" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="24" fill="#ffffff">
        prioritizes genuine depth over casual chatter."
      </text>
      <text x="36" y="122" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="18" fill="#fecdd3">
        Yesterday, 7:22 PM • Delivered ✓✓
      </text>
    </g>

    <!-- Rajesh Incoming Bubble 2 with Video Invitation -->
    <g transform="translate(0, 360)">
      <rect width="760" height="150" rx="24" fill="#241538" stroke="rgba(255,255,255,0.08)" />
      <text x="36" y="50" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="24" fill="#f1f5f9">
        "Would you be open to an HD Video Date this Saturday?
      </text>
      <text x="36" y="85" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="24" fill="#f1f5f9">
        A calm evening tea over a virtual conversation?"
      </text>
      <text x="36" y="122" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="18" fill="#94a3b8">
        Today, 10:15 AM
      </text>
    </g>
  </g>

  <!-- Video Date Floating Experience Card -->
  <g transform="translate(60, 970)" filter="url(#sh3)">
    <rect width="960" height="580" rx="32" fill="#1b0e2b" stroke="rgba(244, 63, 94, 0.5)" stroke-width="2" />

    <!-- Video Header Bar -->
    <rect x="30" y="30" width="900" height="60" rx="16" fill="rgba(0,0,0,0.5)" />
    <circle cx="65" cy="60" r="12" fill="#ef4444" />
    <text x="95" y="67" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="22" fill="#ffffff">
      LIVE VIDEO DATE ROOM (HD 1080P) • ENCRYPTED
    </text>
    <text x="890" y="67" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="700" font-size="20" fill="#34d399" text-anchor="end">
      08:24
    </text>

    <!-- Video Canvas Mockup Area -->
    <rect x="30" y="110" width="900" height="340" rx="20" fill="#2d1645" />

    <!-- Main Member Video Preview -->
    <circle cx="340" cy="270" r="110" fill="#4c0519" stroke="#f43f5e" stroke-width="4" />
    <text x="340" y="315" font-size="110" text-anchor="middle">👩‍⚕️</text>
    <rect x="230" y="400" width="220" height="40" rx="20" fill="rgba(0,0,0,0.7)" />
    <text x="340" y="427" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="700" font-size="18" fill="#ffffff" text-anchor="middle">
      Dr. Sunita Deshmukh
    </text>

    <!-- Pip Camera (Self) -->
    <rect x="680" y="140" width="220" height="280" rx="18" fill="#140722" stroke="#f43f5e" stroke-width="3" />
    <circle cx="790" cy="240" r="60" fill="#311042" />
    <text x="790" y="265" font-size="60" text-anchor="middle">👨‍💼</text>
    <text x="790" y="390" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="700" font-size="18" fill="#ffffff" text-anchor="middle">
      You (HD Video)
    </text>

    <!-- Video Controls -->
    <g transform="translate(180, 480)">
      <circle cx="70" cy="40" r="35" fill="rgba(255,255,255,0.15)" />
      <text x="70" y="52" font-size="34" text-anchor="middle">🎤</text>

      <circle cx="210" cy="40" r="35" fill="rgba(255,255,255,0.15)" />
      <text x="210" y="52" font-size="34" text-anchor="middle">📹</text>

      <circle cx="350" cy="40" r="35" fill="rgba(244,63,94,0.3)" stroke="#f43f5e" />
      <text x="350" y="52" font-size="34" text-anchor="middle">💖</text>

      <circle cx="490" cy="40" r="35" fill="#ef4444" />
      <text x="490" y="52" font-size="34" text-anchor="middle">📞</text>
    </g>
  </g>

  <!-- Bottom Safe & Verified Assurance -->
  <g transform="translate(60, 1600)">
    <rect width="960" height="80" rx="20" fill="rgba(16, 185, 129, 0.15)" stroke="rgba(16, 185, 129, 0.4)" />
    <text x="480" y="48" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="22" fill="#a7f3d0" text-anchor="middle">
      🛡️ 100% Privacy-Guaranteed • No Recording • Discretion Protected
    </text>
  </g>
</svg>`;
}

// ==========================================
// 5. MOBILE SCREENSHOT 4: 100% Aadhaar & ID Verified Profiles (1080 x 1920)
// ==========================================
function getMobile4Svg() {
  const w = 1080;
  const h = 1920;
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg4" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#140722" />
      <stop offset="35%" stop-color="#180b2a" />
      <stop offset="100%" stop-color="#0b0f19" />
    </linearGradient>
    <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#059669" />
      <stop offset="100%" stop-color="#10b981" />
    </linearGradient>
    <filter id="sh4" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="10" stdDeviation="16" flood-color="#000000" flood-opacity="0.6" />
    </filter>
  </defs>

  <rect width="${w}" height="${h}" fill="url(#bg4)" />

  <!-- Status Bar -->
  <g fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="24" font-weight="600">
    <text x="60" y="52">09:41</text>
    <text x="960" y="52" text-anchor="end">5G  100%</text>
  </g>

  <!-- Header -->
  <g transform="translate(60, 90)">
    <circle cx="45" cy="45" r="45" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" stroke-width="2" />
    <text x="45" y="56" font-size="40" text-anchor="middle">🛡️</text>
    <text x="110" y="44" font-family="Georgia, serif" font-weight="900" font-size="42" fill="#ffffff">Trust &amp; Verification Hub</text>
    <text x="110" y="78" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="700" font-size="20" fill="#34d399">
      ZERO CATFISH • ZERO BOTS • 100% VERIFIED SINGLES 40+
    </text>
  </g>

  <!-- Big Marketing Tagline -->
  <g transform="translate(60, 210)">
    <text x="480" y="40" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="900" font-size="42" fill="#ffffff" text-anchor="middle">
      India's Only 100% Aadhaar-Verified Dating App
    </text>
    <text x="480" y="85" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="600" font-size="26" fill="#6ee7b7" text-anchor="middle">
      Every Member Confirmed Authentic • Background &amp; Age 40+ Certified
    </text>
  </g>

  <!-- UIDAI Official Trust Certificate Card -->
  <g transform="translate(60, 330)" filter="url(#sh4)">
    <rect width="960" height="420" rx="32" fill="#111827" stroke="#10b981" stroke-width="2" />

    <!-- Header badge -->
    <rect x="40" y="35" width="380" height="48" rx="24" fill="url(#greenGrad)" />
    <text x="230" y="67" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="20" fill="#ffffff" text-anchor="middle">
      ✓ UIDAI DIGITAL CERTIFICATE ACTIVE
    </text>

    <!-- Certificate details -->
    <text x="50" y="140" font-family="Georgia, serif" font-weight="900" font-size="34" fill="#ffffff">
      Aadhaar Verified Identity: Vasu Sharma
    </text>
    <text x="50" y="185" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="600" font-size="24" fill="#94a3b8">
      Masked Aadhaar Number: •••• •••• 6219  (UIDAI OTP-Verified)
    </text>
    <text x="50" y="225" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="600" font-size="24" fill="#94a3b8">
      Certified Age: 46 Years (Born 1980) • Eligible for 40+ Mature Dating
    </text>
    <text x="50" y="265" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="600" font-size="24" fill="#94a3b8">
      Cryptographic Signature: SHA256:UIDAI-IN-A48F920-E2EE-ACTIVE
    </text>

    <!-- Badges Row -->
    <g transform="translate(50, 310)">
      <rect width="260" height="60" rx="18" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" />
      <text x="130" y="38" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="20" fill="#34d399" text-anchor="middle">
        🛡️ Anti-Catfish Shield
      </text>

      <rect x="290" width="280" height="60" rx="18" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" />
      <text x="430" y="38" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="20" fill="#60a5fa" text-anchor="middle">
        🔒 Zero Identity Leak
      </text>

      <rect x="600" width="260" height="60" rx="18" fill="rgba(244, 63, 94, 0.15)" stroke="#f43f5e" />
      <text x="730" y="38" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="20" fill="#fb7185" text-anchor="middle">
        ★ Trust Score: 99%
      </text>
    </g>
  </g>

  <!-- 4 Trust Guard Pillars -->
  <g transform="translate(60, 790)">
    <!-- Pillar 1 -->
    <g transform="translate(0, 0)" filter="url(#sh4)">
      <rect width="960" height="150" rx="24" fill="#1b1228" stroke="rgba(255,255,255,0.08)" />
      <circle cx="65" cy="75" r="35" fill="rgba(16, 185, 129, 0.2)" />
      <text x="65" y="87" font-size="36" text-anchor="middle">✅</text>
      <text x="125" y="60" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="26" fill="#ffffff">
        Mandatory 40+ Age &amp; Identity Verification
      </text>
      <text x="125" y="100" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="20" fill="#94a3b8">
        No underage profiles. Strict OTP-based Government Aadhaar verification.
      </text>
    </g>

    <!-- Pillar 2 -->
    <g transform="translate(0, 180)" filter="url(#sh4)">
      <rect width="960" height="150" rx="24" fill="#1b1228" stroke="rgba(255,255,255,0.08)" />
      <circle cx="65" cy="75" r="35" fill="rgba(244, 63, 94, 0.2)" />
      <text x="65" y="87" font-size="36" text-anchor="middle">🕶️</text>
      <text x="125" y="60" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="26" fill="#ffffff">
        Executive Discretion Mode (Photo Privacy)
      </text>
      <text x="125" y="100" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="20" fill="#94a3b8">
        Keep photos discreetly blurred until you mutually grant access to a match.
      </text>
    </g>

    <!-- Pillar 3 -->
    <g transform="translate(0, 360)" filter="url(#sh4)">
      <rect width="960" height="150" rx="24" fill="#1b1228" stroke="rgba(255,255,255,0.08)" />
      <circle cx="65" cy="75" r="35" fill="rgba(168, 85, 247, 0.2)" />
      <text x="65" y="87" font-size="36" text-anchor="middle">🔐</text>
      <text x="125" y="60" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="26" fill="#ffffff">
        Private Cryptographic Messaging
      </text>
      <text x="125" y="100" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="20" fill="#94a3b8">
        Peer-to-peer security keys ensure zero third-party snooping on chats.
      </text>
    </g>

    <!-- Pillar 4 -->
    <g transform="translate(0, 540)" filter="url(#sh4)">
      <rect width="960" height="150" rx="24" fill="#1b1228" stroke="rgba(255,255,255,0.08)" />
      <circle cx="65" cy="75" r="35" fill="rgba(245, 158, 11, 0.2)" />
      <text x="65" y="87" font-size="36" text-anchor="middle">👑</text>
      <text x="125" y="60" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="26" fill="#ffffff">
        Accomplished Doctors, Lawyers &amp; Leaders
      </text>
      <text x="125" y="100" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="20" fill="#94a3b8">
        Join an elite circle of cultured, dignified, and emotionally mature singles.
      </text>
    </g>
  </g>

  <!-- Big Bottom Trust Banner -->
  <g transform="translate(60, 1540)">
    <rect width="960" height="110" rx="30" fill="url(#greenGrad)" filter="url(#sh4)" />
    <text x="480" y="68" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="900" font-size="32" fill="#ffffff" text-anchor="middle">
      🛡️ 100% Safe, Dignified &amp; Meaningful 40+ Dating
    </text>
  </g>
</svg>`;
}

// ==========================================
// 6. DESKTOP SCREENSHOT 1: Full Platform Experience (1920 x 1080)
// ==========================================
function getDesktop1Svg() {
  const w = 1920;
  const h = 1080;
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgDesk" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#140722" />
      <stop offset="50%" stop-color="#1f0a35" />
      <stop offset="100%" stop-color="#0b0f19" />
    </linearGradient>
    <filter id="shDesk" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.6" />
    </filter>
  </defs>

  <rect width="${w}" height="${h}" fill="url(#bgDesk)" />

  <!-- Top Navigation Header -->
  <rect width="${w}" height="80" fill="#0d0716" />
  <line x1="0" y1="80" x2="${w}" y2="80" stroke="rgba(255,255,255,0.1)" stroke-width="1.5" />

  <g transform="translate(60, 18)">
    <circle cx="22" cy="22" r="22" fill="#be123c" />
    <text x="22" y="28" font-size="22" text-anchor="middle">💖</text>
    <text x="60" y="28" font-family="Georgia, serif" font-weight="900" font-size="28" fill="#ffffff">12Rashi Dating</text>
    <rect x="260" y="6" width="180" height="32" rx="16" fill="rgba(244,63,94,0.2)" stroke="#f43f5e" />
    <text x="350" y="27" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="13" fill="#fecdd3" text-anchor="middle">40+ MATURE DATING</text>
  </g>

  <!-- Nav Links -->
  <g transform="translate(680, 48)" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="700" font-size="18" fill="#cbd5e1">
    <text x="0" y="0" fill="#f43f5e">Curated Dossiers</text>
    <text x="180" y="0">AI Synergy</text>
    <text x="320" y="0">Encrypted Chats</text>
    <text x="490" y="0">Video Dates</text>
    <text x="630" y="0">Trust Hub</text>
  </g>

  <!-- Right Profile Strip -->
  <g transform="translate(1620, 22)">
    <rect width="240" height="40" rx="20" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" />
    <text x="120" y="26" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="14" fill="#34d399" text-anchor="middle">✓ Aadhaar Verified</text>
  </g>

  <!-- Content 3-Column Layout -->
  <!-- Column 1: Filter & Dossiers Feed -->
  <g transform="translate(60, 110)" filter="url(#shDesk)">
    <rect width="560" height="920" rx="24" fill="#1b1228" stroke="rgba(244,63,94,0.3)" />

    <!-- Subhead -->
    <text x="40" y="55" font-family="Georgia, serif" font-weight="900" font-size="26" fill="#ffffff">Executive Dossiers (40+)</text>
    <text x="40" y="88" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="15" fill="#94a3b8">Curated daily for high emotional alignment</text>

    <!-- Mini Profile 1 -->
    <g transform="translate(30, 120)">
      <rect width="500" height="230" rx="18" fill="#261638" stroke="rgba(244,63,94,0.5)" stroke-width="2" />
      <circle cx="70" cy="80" r="45" fill="#4c0519" stroke="#f43f5e" stroke-width="3" />
      <text x="70" y="95" font-size="45" text-anchor="middle">👩‍⚕️</text>
      <text x="135" y="60" font-family="Georgia, serif" font-weight="900" font-size="22" fill="#ffffff">Dr. Sunita Deshmukh, 48</text>
      <text x="135" y="88" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="600" font-size="15" fill="#fb7185">Chief of Pediatric Cardiology • Mumbai</text>
      <text x="135" y="115" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" fill="#34d399">✓ 100% Aadhaar Verified • 94% Synergy</text>

      <rect x="30" y="155" width="210" height="48" rx="24" fill="#f43f5e" />
      <text x="135" y="185" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="15" fill="#ffffff" text-anchor="middle">✨ AI Compatibility</text>

      <rect x="260" y="155" width="210" height="48" rx="24" fill="rgba(168,85,247,0.2)" stroke="#a855f7" />
      <text x="365" y="185" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="15" fill="#d8b4fe" text-anchor="middle">💬 Private Chat</text>
    </g>

    <!-- Mini Profile 2 -->
    <g transform="translate(30, 380)">
      <rect width="500" height="230" rx="18" fill="#241538" stroke="rgba(255,255,255,0.08)" />
      <circle cx="70" cy="80" r="45" fill="#311042" stroke="#a855f7" stroke-width="2" />
      <text x="70" y="95" font-size="45" text-anchor="middle">👨‍⚖️</text>
      <text x="135" y="60" font-family="Georgia, serif" font-weight="900" font-size="22" fill="#ffffff">Rajesh Singhania, 52</text>
      <text x="135" y="88" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="600" font-size="15" fill="#fb7185">Senior Managing Partner • Delhi</text>
      <text x="135" y="115" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" fill="#34d399">✓ 100% Aadhaar Verified • 91% Synergy</text>

      <rect x="30" y="155" width="210" height="48" rx="24" fill="#f43f5e" />
      <text x="135" y="185" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="15" fill="#ffffff" text-anchor="middle">✨ AI Compatibility</text>

      <rect x="260" y="155" width="210" height="48" rx="24" fill="rgba(168,85,247,0.2)" stroke="#a855f7" />
      <text x="365" y="185" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="15" fill="#d8b4fe" text-anchor="middle">💬 Private Chat</text>
    </g>
  </g>

  <!-- Column 2: Detailed Synergy & Dossier View -->
  <g transform="translate(650, 110)" filter="url(#shDesk)">
    <rect width="700" height="920" rx="24" fill="#1b1228" stroke="rgba(244,63,94,0.3)" />

    <!-- Big compatibility card -->
    <rect x="40" y="40" width="620" height="300" rx="20" fill="#2d1345" />
    <text x="80" y="95" font-family="Georgia, serif" font-weight="900" font-size="32" fill="#ffffff">Cosmic &amp; Emotional Synergy</text>
    <text x="80" y="130" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="600" font-size="18" fill="#f43f5e">
      Mesh (Aries) ↔ Vrishabha (Taurus) • 94% Compatibility
    </text>

    <!-- Radar Scores -->
    <g transform="translate(80, 170)">
      <text x="0" y="25" font-size="16" fill="#cbd5e1">36 Gunas Vedic Milan: 32/36 Points</text>
      <rect x="300" y="12" width="260" height="12" rx="6" fill="rgba(255,255,255,0.1)" />
      <rect x="300" y="12" width="230" height="12" rx="6" fill="#f43f5e" />

      <text x="0" y="65" font-size="16" fill="#cbd5e1">Life Stage Harmony: 98% (Empty Nesters)</text>
      <rect x="300" y="52" width="260" height="12" rx="6" fill="rgba(255,255,255,0.1)" />
      <rect x="300" y="52" width="250" height="12" rx="6" fill="#a855f7" />

      <text x="0" y="105" font-size="16" fill="#cbd5e1">Lifestyle &amp; Pacing: 92% Alignment</text>
      <rect x="300" y="92" width="260" height="12" rx="6" fill="rgba(255,255,255,0.1)" />
      <rect x="300" y="92" width="240" height="12" rx="6" fill="#f59e0b" />
    </g>

    <!-- Live HD Video Room Preview -->
    <rect x="40" y="370" width="620" height="490" rx="20" fill="#11071e" stroke="rgba(244,63,94,0.4)" />
    <text x="70" y="420" font-family="Georgia, serif" font-weight="900" font-size="24" fill="#ffffff">Live HD Video Date Room</text>
    <text x="70" y="450" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="15" fill="#34d399">
      🔒 Peer-to-Peer Encrypted • Crystal Clear HD Audio/Video
    </text>

    <circle cx="350" cy="620" r="110" fill="#4c0519" stroke="#f43f5e" stroke-width="4" />
    <text x="350" y="665" font-size="110" text-anchor="middle">👩‍⚕️</text>
    <rect x="230" y="750" width="240" height="40" rx="20" fill="rgba(0,0,0,0.8)" />
    <text x="350" y="776" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="700" font-size="16" fill="#ffffff" text-anchor="middle">
      Dr. Sunita Deshmukh
    </text>
  </g>

  <!-- Column 3: Trust & Encrypted Chat Panel -->
  <g transform="translate(1380, 110)" filter="url(#shDesk)">
    <rect width="480" height="920" rx="24" fill="#1b1228" stroke="rgba(16, 185, 129, 0.3)" />

    <text x="40" y="55" font-family="Georgia, serif" font-weight="900" font-size="24" fill="#ffffff">UIDAI Trust Certificate</text>
    <text x="40" y="85" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" fill="#34d399">✓ 100% Genuine 40+ Community</text>

    <rect x="30" y="110" width="420" height="150" rx="16" fill="#0f172a" stroke="#10b981" />
    <text x="50" y="150" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="16" fill="#34d399">✓ Aadhaar Verified Member</text>
    <text x="50" y="180" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" fill="#cbd5e1">Masked ID: •••• •••• 6219</text>
    <text x="50" y="210" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" fill="#cbd5e1">Anti-Catfish Guarantee: Certified</text>

    <!-- Encrypted Chat Area -->
    <text x="40" y="300" font-family="Georgia, serif" font-weight="900" font-size="22" fill="#ffffff">Encrypted Messages</text>
    <rect x="30" y="325" width="420" height="540" rx="16" fill="#140722" />

    <g transform="translate(50, 360)">
      <rect width="320" height="70" rx="16" fill="#241538" />
      <text x="20" y="35" font-size="14" fill="#ffffff">"Loved your thoughts on music!"</text>
      <text x="20" y="55" font-size="11" fill="#94a3b8">7:14 PM</text>

      <rect y="90" x="60" width="320" height="70" rx="16" fill="#be123c" />
      <text x="80" y="125" font-size="14" fill="#ffffff">"Thank you! Let's connect soon."</text>
      <text x="80" y="145" font-size="11" fill="#fecdd3">7:22 PM • Delivered</text>
    </g>
  </g>
</svg>`;
}

// ==========================================
// RUN GENERATION
// ==========================================
async function run() {
  console.log('Generating 12Rashi 40+ Dating App feature graphic and screenshots...');

  // 1. Feature Graphic (1024 x 500)
  const fgSvg = getFeatureGraphicSvg();
  await sharp(Buffer.from(fgSvg))
    .png({ quality: 95, compressionLevel: 8 })
    .toFile('public/feature-graphic.png');
  console.log('✅ Generated public/feature-graphic.png (1024x500)');

  // 2. Mobile Screenshot 1 (1080 x 1920)
  const m1Svg = getMobile1Svg();
  await sharp(Buffer.from(m1Svg))
    .png({ quality: 95, compressionLevel: 8 })
    .toFile(path.join(outScreenshotsDir, 'screenshot-mobile-1.png'));
  console.log('✅ Generated public/screenshots/screenshot-mobile-1.png (1080x1920)');

  // 3. Mobile Screenshot 2 (1080 x 1920)
  const m2Svg = getMobile2Svg();
  await sharp(Buffer.from(m2Svg))
    .png({ quality: 95, compressionLevel: 8 })
    .toFile(path.join(outScreenshotsDir, 'screenshot-mobile-2.png'));
  console.log('✅ Generated public/screenshots/screenshot-mobile-2.png (1080x1920)');

  // 4. Mobile Screenshot 3 (1080 x 1920)
  const m3Svg = getMobile3Svg();
  await sharp(Buffer.from(m3Svg))
    .png({ quality: 95, compressionLevel: 8 })
    .toFile(path.join(outScreenshotsDir, 'screenshot-mobile-3.png'));
  console.log('✅ Generated public/screenshots/screenshot-mobile-3.png (1080x1920)');

  // 5. Mobile Screenshot 4 (1080 x 1920)
  const m4Svg = getMobile4Svg();
  await sharp(Buffer.from(m4Svg))
    .png({ quality: 95, compressionLevel: 8 })
    .toFile(path.join(outScreenshotsDir, 'screenshot-mobile-4.png'));
  console.log('✅ Generated public/screenshots/screenshot-mobile-4.png (1080x1920)');

  // 6. Desktop Screenshot 1 (1920 x 1080)
  const d1Svg = getDesktop1Svg();
  await sharp(Buffer.from(d1Svg))
    .png({ quality: 95, compressionLevel: 8 })
    .toFile(path.join(outScreenshotsDir, 'screenshot-desktop-1.png'));
  console.log('✅ Generated public/screenshots/screenshot-desktop-1.png (1920x1080)');

  console.log('All 12Rashi 40+ Dating App graphics created successfully!');
}

run().catch((err) => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
