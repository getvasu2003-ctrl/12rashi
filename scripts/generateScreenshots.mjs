import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public/screenshots');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 1. Mobile Screenshot 1: Home & Live Consultations (1080 x 1920)
const svgMobile1 = `
<svg width="1080" height="1920" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fff7ed" />
      <stop offset="50%" stop-color="#ffedd5" />
      <stop offset="100%" stop-color="#fed7aa" />
    </linearGradient>
    <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ea580c" />
      <stop offset="50%" stop-color="#f97316" />
      <stop offset="100%" stop-color="#fb923c" />
    </linearGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#fffaf0" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#fbbf24" />
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#7c2d12" flood-opacity="0.12" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1080" height="1920" fill="url(#bgGrad)" />

  <!-- App Header -->
  <rect width="1080" height="180" fill="url(#headerGrad)" />
  <circle cx="100" cy="100" r="38" fill="#ffffff" opacity="0.2" />
  <text x="100" y="112" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="44" fill="#ffffff" text-anchor="middle">12R</text>
  <text x="165" y="108" font-family="'Cinzel', Georgia, serif" font-weight="800" font-size="48" fill="#ffffff">12Rashi</text>
  <text x="165" y="136" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="600" font-size="20" fill="#fef08a">INDIA'S PREMIER VEDIC ASTROLOGY</text>

  <!-- Notification / Profile Badges -->
  <rect x="880" y="75" width="140" height="52" rx="26" fill="#ffffff" />
  <text x="950" y="108" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="22" fill="#ea580c" text-anchor="middle">₹150 Wallet</text>

  <!-- Hero Banner -->
  <g transform="translate(60, 220)" filter="url(#shadow)">
    <rect width="960" height="260" rx="32" fill="url(#headerGrad)" />
    <text x="60" y="80" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="38" fill="#ffffff">✨ Talk to India's Best Astrologers</text>
    <text x="60" y="130" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="26" fill="#fed7aa">First 5 Mins FREE • 500+ Verified Gurus • Instant Call / Video</text>
    
    <!-- Hero Button -->
    <rect x="60" y="165" width="300" height="60" rx="30" fill="#ffffff" />
    <text x="210" y="204" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="24" fill="#ea580c" text-anchor="middle">📞 Consult Now</text>
  </g>

  <!-- Quick Category Strip -->
  <g transform="translate(60, 520)">
    <rect x="0" y="0" width="220" height="150" rx="24" fill="#ffffff" filter="url(#shadow)" />
    <text x="110" y="65" font-size="48" text-anchor="middle">🔮</text>
    <text x="110" y="115" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="700" font-size="22" fill="#78350f" text-anchor="middle">Kundli Chart</text>

    <rect x="245" y="0" width="220" height="150" rx="24" fill="#ffffff" filter="url(#shadow)" />
    <text x="355" y="65" font-size="48" text-anchor="middle">🌙</text>
    <text x="355" y="115" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="700" font-size="22" fill="#78350f" text-anchor="middle">Lunar Panchang</text>

    <rect x="490" y="0" width="220" height="150" rx="24" fill="#ffffff" filter="url(#shadow)" />
    <text x="600" y="65" font-size="48" text-anchor="middle">♈</text>
    <text x="600" y="115" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="700" font-size="22" fill="#78350f" text-anchor="middle">Daily Horoscope</text>

    <rect x="735" y="0" width="225" height="150" rx="24" fill="#ffffff" filter="url(#shadow)" />
    <text x="847" y="65" font-size="48" text-anchor="middle">🕉️</text>
    <text x="847" y="115" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="700" font-size="22" fill="#78350f" text-anchor="middle">Pooja Store</text>
  </g>

  <!-- Section Heading: Top Verified Astrologers -->
  <text x="60" y="730" font-family="'Cinzel', Georgia, serif" font-weight="800" font-size="36" fill="#7c2d12">Online Astrologers (Available Now)</text>
  <circle cx="860" cy="718" r="10" fill="#22c55e" />
  <text x="880" y="725" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="700" font-size="22" fill="#15803d">38 Active</text>

  <!-- Astrologer Card 1 -->
  <g transform="translate(60, 760)" filter="url(#shadow)">
    <rect width="960" height="240" rx="28" fill="url(#cardGrad)" stroke="#fde047" stroke-width="2" />
    <circle cx="120" cy="120" r="70" fill="#fed7aa" />
    <text x="120" y="135" font-size="56" text-anchor="middle">🧘‍♂️</text>
    <rect x="65" y="170" width="110" height="30" rx="15" fill="#22c55e" />
    <text x="120" y="191" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="16" fill="#ffffff" text-anchor="middle">★ 4.9 (1,240)</text>

    <text x="230" y="80" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="32" fill="#1c1917">Acharya Raman Shastri</text>
    <text x="230" y="120" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="600" font-size="22" fill="#78716c">Vedic Astrology • Kundli Dosha • Career</text>
    <text x="230" y="160" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="700" font-size="22" fill="#ea580c">Exp: 18+ Yrs • Hindi, English • ₹25/min</text>

    <rect x="740" y="70" width="180" height="65" rx="32" fill="#ea580c" />
    <text x="830" y="112" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="24" fill="#ffffff" text-anchor="middle">📞 Call Now</text>

    <rect x="740" y="145" width="180" height="55" rx="27" fill="#ffffff" stroke="#ea580c" stroke-width="2" />
    <text x="830" y="181" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="22" fill="#ea580c" text-anchor="middle">💬 Chat</text>
  </g>

  <!-- Astrologer Card 2 -->
  <g transform="translate(60, 1030)" filter="url(#shadow)">
    <rect width="960" height="240" rx="28" fill="url(#cardGrad)" stroke="#fde047" stroke-width="2" />
    <circle cx="120" cy="120" r="70" fill="#fed7aa" />
    <text x="120" y="135" font-size="56" text-anchor="middle">🧕</text>
    <rect x="65" y="170" width="110" height="30" rx="15" fill="#22c55e" />
    <text x="120" y="191" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="16" fill="#ffffff" text-anchor="middle">★ 4.95 (890)</text>

    <text x="230" y="80" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="32" fill="#1c1917">Dr. Meenakshi Sundaram</text>
    <text x="230" y="120" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="600" font-size="22" fill="#78716c">Tarot &amp; Numerology • Love &amp; Marriage</text>
    <text x="230" y="160" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="700" font-size="22" fill="#ea580c">Exp: 14+ Yrs • English, Tamil • ₹30/min</text>

    <rect x="740" y="70" width="180" height="65" rx="32" fill="#ea580c" />
    <text x="830" y="112" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="24" fill="#ffffff" text-anchor="middle">📞 Call Now</text>

    <rect x="740" y="145" width="180" height="55" rx="27" fill="#ffffff" stroke="#ea580c" stroke-width="2" />
    <text x="830" y="181" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="22" fill="#ea580c" text-anchor="middle">💬 Chat</text>
  </g>

  <!-- Daily Panchang Widget Preview -->
  <g transform="translate(60, 1300)" filter="url(#shadow)">
    <rect width="960" height="280" rx="28" fill="#ffffff" />
    <rect width="960" height="70" rx="28" fill="#fff7ed" />
    <text x="50" y="46" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="28" fill="#9a3412">🗓️ Aaj Ka Panchang • New Delhi</text>
    
    <text x="50" y="120" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="700" font-size="22" fill="#78716c">Tithi: Shukla Paksha Dashami</text>
    <text x="500" y="120" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="700" font-size="22" fill="#78716c">Nakshatra: Uttara Ashadha</text>
    
    <text x="50" y="170" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="700" font-size="22" fill="#15803d">Abhijit Muhurat: 11:45 AM - 12:35 PM</text>
    <text x="500" y="170" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="700" font-size="22" fill="#dc2626">Rahu Kaal: 04:30 PM - 06:00 PM</text>

    <text x="50" y="225" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="700" font-size="22" fill="#ea580c">🌕 Upcoming Purnima: Sharad Purnima (Oct 28)</text>
  </g>

  <!-- Bottom Nav Bar -->
  <g transform="translate(0, 1780)">
    <rect width="1080" height="140" fill="#ffffff" filter="url(#shadow)" />
    <text x="135" y="70" font-size="40" text-anchor="middle">🏠</text>
    <text x="135" y="105" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="18" fill="#ea580c" text-anchor="middle">Home</text>

    <text x="405" y="70" font-size="40" text-anchor="middle">📞</text>
    <text x="405" y="105" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="600" font-size="18" fill="#78716c" text-anchor="middle">Consult</text>

    <text x="675" y="70" font-size="40" text-anchor="middle">🔮</text>
    <text x="675" y="105" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="600" font-size="18" fill="#78716c" text-anchor="middle">Kundli</text>

    <text x="945" y="70" font-size="40" text-anchor="middle">👤</text>
    <text x="945" y="105" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="600" font-size="18" fill="#78716c" text-anchor="middle">Profile</text>
  </g>
</svg>
`;

// 2. Mobile Screenshot 2: Janam Kundli & Lunar Phase Calendar (1080 x 1920)
const svgMobile2 = `
<svg width="1080" height="1920" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fff7ed" />
      <stop offset="50%" stop-color="#ffedd5" />
      <stop offset="100%" stop-color="#fed7aa" />
    </linearGradient>
    <linearGradient id="headerGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ea580c" />
      <stop offset="100%" stop-color="#c2410c" />
    </linearGradient>
    <linearGradient id="moonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e1b4b" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    <filter id="shadow2" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#7c2d12" flood-opacity="0.12" />
    </filter>
  </defs>

  <rect width="1080" height="1920" fill="url(#bgGrad2)" />

  <!-- App Header -->
  <rect width="1080" height="180" fill="url(#headerGrad2)" />
  <text x="60" y="110" font-family="'Cinzel', Georgia, serif" font-weight="800" font-size="44" fill="#ffffff">Janam Kundli &amp; Lunar Ephemeris</text>
  <text x="60" y="145" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="22" fill="#fed7aa">Accurate Vedic Birth Chart &amp; Moon Calculations</text>

  <!-- Kundli Chart Diamond Card -->
  <g transform="translate(60, 220)" filter="url(#shadow2)">
    <rect width="960" height="660" rx="32" fill="#ffffff" />
    <text x="60" y="70" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="32" fill="#7c2d12">Lagna Kundli (D1 Birth Chart)</text>
    <text x="60" y="105" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="20" fill="#78716c">Ascendant: Leo (Simha) • Rashi: Taurus (Vrishabha) • Nakshatra: Rohini</text>

    <!-- Vedic Diamond Graphic -->
    <g transform="translate(240, 140)">
      <rect x="0" y="0" width="480" height="480" fill="#fffbeb" stroke="#ea580c" stroke-width="4" />
      <line x1="0" y1="0" x2="480" y2="480" stroke="#ea580c" stroke-width="3" />
      <line x1="0" y1="480" x2="480" y2="0" stroke="#ea580c" stroke-width="3" />
      <polygon points="240,0 480,240 240,480 0,240" fill="none" stroke="#ea580c" stroke-width="4" />

      <!-- House Numbers & Planetary Indicators -->
      <text x="240" y="170" font-family="'Cinzel', serif" font-weight="800" font-size="24" fill="#9a3412" text-anchor="middle">1: Sun, Mer</text>
      <text x="120" y="100" font-family="'Cinzel', serif" font-weight="700" font-size="20" fill="#9a3412" text-anchor="middle">2: Ven</text>
      <text x="360" y="100" font-family="'Cinzel', serif" font-weight="700" font-size="20" fill="#9a3412" text-anchor="middle">12: Mars</text>
      <text x="240" y="320" font-family="'Cinzel', serif" font-weight="800" font-size="24" fill="#9a3412" text-anchor="middle">7: Jup, Ketu</text>
      <text x="380" y="240" font-family="'Cinzel', serif" font-weight="700" font-size="20" fill="#9a3412" text-anchor="middle">10: Moon</text>
      <text x="100" y="240" font-family="'Cinzel', serif" font-weight="700" font-size="20" fill="#9a3412" text-anchor="middle">4: Rahu</text>
      <text x="240" y="440" font-family="'Cinzel', serif" font-weight="700" font-size="20" fill="#9a3412" text-anchor="middle">8: Saturn</text>
    </g>
  </g>

  <!-- Lunar Phase Spotlight Banner -->
  <g transform="translate(60, 920)" filter="url(#shadow2)">
    <rect width="960" height="400" rx="32" fill="url(#moonGrad)" />
    <circle cx="820" cy="180" r="110" fill="#fef08a" opacity="0.9" />
    <circle cx="790" cy="150" r="20" fill="#fde047" opacity="0.6" />
    <circle cx="850" cy="200" r="30" fill="#fde047" opacity="0.5" />

    <text x="60" y="80" font-family="'Cinzel', Georgia, serif" font-weight="800" font-size="34" fill="#fef08a">🌙 Vedic Lunar Phase Calendar</text>
    <text x="60" y="125" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="700" font-size="26" fill="#ffffff">Next Full Moon: Sharad Purnima (100% Illumination)</text>
    
    <text x="60" y="175" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="22" fill="#cbd5e1">📅 Date: October 28, 2026 • Ashwina Shukla Purnima</text>
    <text x="60" y="215" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="22" fill="#cbd5e1">⏰ Tithi Window: 04:15 AM to 02:40 AM (Next Day)</text>
    <text x="60" y="255" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="22" fill="#cbd5e1">🕉️ Sacred Ritual: Kheer under Moonlight • Chandra Dhyana</text>

    <rect x="60" y="295" width="280" height="60" rx="30" fill="#f59e0b" />
    <text x="200" y="335" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="22" fill="#1e1b4b" text-anchor="middle">🔔 Set Ritual Reminder</text>

    <rect x="360" y="295" width="300" height="60" rx="30" fill="#ffffff" opacity="0.15" stroke="#ffffff" stroke-width="2" />
    <text x="510" y="335" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="22" fill="#ffffff" text-anchor="middle">🔊 Listen Chandra Mantra</text>
  </g>

  <!-- My Astro Profile Summary Card -->
  <g transform="translate(60, 1360)" filter="url(#shadow2)">
    <rect width="960" height="380" rx="32" fill="#ffffff" />
    <text x="60" y="70" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="32" fill="#7c2d12">My Astro Profile &amp; Permanent Kundli</text>
    
    <rect x="60" y="100" width="840" height="100" rx="20" fill="#fff7ed" />
    <text x="90" y="140" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="700" font-size="24" fill="#ea580c">👤 Vasu Sharma • Born: 15 Aug 1998, 08:30 AM</text>
    <text x="90" y="175" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="20" fill="#78716c">📍 Jaipur, Rajasthan • Nakshatra: Krittika (Pada 2) • Manglik: No (Surya Balwan)</text>

    <text x="60" y="245" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="700" font-size="22" fill="#15803d">✅ Permanent Kundli summary synced across all devices</text>
    <text x="60" y="285" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="700" font-size="22" fill="#ea580c">✨ Current Mahadasha: Jupiter (Guru) - Golden Growth Period</text>

    <rect x="60" y="315" width="380" height="45" rx="22" fill="#ea580c" />
    <text x="250" y="344" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="20" fill="#ffffff" text-anchor="middle">Download PDF Janam Kundli</text>
  </g>

  <!-- Bottom Nav -->
  <g transform="translate(0, 1780)">
    <rect width="1080" height="140" fill="#ffffff" filter="url(#shadow2)" />
    <text x="135" y="70" font-size="40" text-anchor="middle">🏠</text>
    <text x="135" y="105" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="600" font-size="18" fill="#78716c" text-anchor="middle">Home</text>
    <text x="405" y="70" font-size="40" text-anchor="middle">📞</text>
    <text x="405" y="105" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="600" font-size="18" fill="#78716c" text-anchor="middle">Consult</text>
    <text x="675" y="70" font-size="40" text-anchor="middle">🔮</text>
    <text x="675" y="105" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="18" fill="#ea580c" text-anchor="middle">Kundli</text>
    <text x="945" y="70" font-size="40" text-anchor="middle">👤</text>
    <text x="945" y="105" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="600" font-size="18" fill="#78716c" text-anchor="middle">Profile</text>
  </g>
</svg>
`;

// 3. Desktop Screenshot: Wide Layout (1920 x 1080)
const svgDesktop = `
<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="dHeaderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ea580c" />
      <stop offset="100%" stop-color="#c2410c" />
    </linearGradient>
    <filter id="dShadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#7c2d12" flood-opacity="0.1" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1920" height="1080" fill="#fff7ed" />

  <!-- Top Bar -->
  <rect width="1920" height="90" fill="url(#dHeaderGrad)" />
  <circle cx="80" cy="45" r="26" fill="#ffffff" opacity="0.2" />
  <text x="80" y="53" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="28" fill="#ffffff" text-anchor="middle">12R</text>
  <text x="130" y="53" font-family="'Cinzel', Georgia, serif" font-weight="800" font-size="34" fill="#ffffff">12Rashi.com</text>

  <!-- Nav links -->
  <text x="500" y="52" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="20" fill="#ffffff">Talk to Astrologer</text>
  <text x="740" y="52" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="20" fill="#ffffff">Janam Kundli</text>
  <text x="930" y="52" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="20" fill="#ffffff">Lunar Panchang</text>
  <text x="1140" y="52" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="20" fill="#ffffff">Horoscope</text>
  <text x="1310" y="52" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="20" fill="#ffffff">AstroStore</text>

  <!-- Profile & Wallet -->
  <rect x="1680" y="24" width="180" height="42" rx="21" fill="#ffffff" />
  <text x="1770" y="51" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="18" fill="#ea580c" text-anchor="middle">₹150 In Wallet</text>

  <!-- Hero Row -->
  <g transform="translate(60, 120)">
    <rect width="1800" height="240" rx="24" fill="url(#dHeaderGrad)" filter="url(#dShadow)" />
    <text x="60" y="75" font-family="'Cinzel', Georgia, serif" font-weight="800" font-size="42" fill="#ffffff">India's Most Trusted Vedic Astrologers Online 24/7</text>
    <text x="60" y="125" font-family="'Plus Jakarta Sans', sans-serif" font-size="24" fill="#ffedd5">Get answers on Love, Career, Marriage &amp; Financial Wealth • 100% Confidential Private Calls</text>
    
    <rect x="60" y="155" width="260" height="55" rx="28" fill="#ffffff" />
    <text x="190" y="190" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="22" fill="#ea580c" text-anchor="middle">Start Consultation</text>

    <rect x="340" y="155" width="240" height="55" rx="28" fill="#ffffff" opacity="0.2" stroke="#ffffff" stroke-width="2" />
    <text x="460" y="190" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="22" fill="#ffffff" text-anchor="middle">Free Janam Kundli</text>
  </g>

  <!-- 3 Main Columns -->
  <!-- Col 1: Astrologer Cards -->
  <g transform="translate(60, 390)">
    <rect width="580" height="640" rx="24" fill="#ffffff" filter="url(#dShadow)" />
    <text x="30" y="50" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="26" fill="#7c2d12">Available Astrologers (Live)</text>
    
    <!-- Astro 1 -->
    <rect x="30" y="80" width="520" height="150" rx="16" fill="#fff7ed" stroke="#fed7aa" />
    <circle cx="85" cy="155" r="40" fill="#fdba74" />
    <text x="85" y="165" font-size="32" text-anchor="middle">🧘</text>
    <text x="145" y="125" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="22" fill="#1c1917">Acharya Raman</text>
    <text x="145" y="155" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" fill="#78716c">Vedic Astrology • 18+ Yrs Exp</text>
    <text x="145" y="185" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="18" fill="#ea580c">₹25/min • ★ 4.9</text>
    <rect x="420" y="130" width="110" height="45" rx="22" fill="#ea580c" />
    <text x="475" y="159" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="18" fill="#ffffff" text-anchor="middle">Call</text>

    <!-- Astro 2 -->
    <rect x="30" y="250" width="520" height="150" rx="16" fill="#fff7ed" stroke="#fed7aa" />
    <circle cx="85" cy="325" r="40" fill="#fdba74" />
    <text x="85" y="335" font-size="32" text-anchor="middle">🧕</text>
    <text x="145" y="295" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="22" fill="#1c1917">Dr. Meenakshi</text>
    <text x="145" y="325" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" fill="#78716c">Tarot &amp; Numerology • 14+ Yrs</text>
    <text x="145" y="355" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="18" fill="#ea580c">₹30/min • ★ 4.95</text>
    <rect x="420" y="300" width="110" height="45" rx="22" fill="#ea580c" />
    <text x="475" y="329" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="18" fill="#ffffff" text-anchor="middle">Call</text>

    <!-- Astro 3 -->
    <rect x="30" y="420" width="520" height="150" rx="16" fill="#fff7ed" stroke="#fed7aa" />
    <circle cx="85" cy="495" r="40" fill="#fdba74" />
    <text x="85" y="505" font-size="32" text-anchor="middle">🙏</text>
    <text x="145" y="465" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="22" fill="#1c1917">Pt. Vidya Sagar</text>
    <text x="145" y="495" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" fill="#78716c">Prashna Kundli • 22+ Yrs</text>
    <text x="145" y="525" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="18" fill="#ea580c">₹20/min • ★ 4.88</text>
    <rect x="420" y="470" width="110" height="45" rx="22" fill="#ea580c" />
    <text x="475" y="499" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="18" fill="#ffffff" text-anchor="middle">Call</text>
  </g>

  <!-- Col 2: Kundli Generator & Astro Profile -->
  <g transform="translate(670, 390)">
    <rect width="580" height="640" rx="24" fill="#ffffff" filter="url(#dShadow)" />
    <text x="30" y="50" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="26" fill="#7c2d12">Personal Janam Kundli</text>

    <rect x="30" y="80" width="520" height="280" rx="20" fill="#fffbeb" stroke="#fde047" stroke-width="2" />
    <!-- Diamond Kundli graphic -->
    <g transform="translate(170, 100)">
      <rect width="240" height="240" fill="#fff7ed" stroke="#ea580c" stroke-width="2" />
      <line x1="0" y1="0" x2="240" y2="240" stroke="#ea580c" />
      <line x1="0" y1="240" x2="240" y2="0" stroke="#ea580c" />
      <polygon points="120,0 240,120 120,240 0,120" fill="none" stroke="#ea580c" stroke-width="2" />
      <text x="120" y="80" font-size="12" fill="#9a3412" text-anchor="middle">Lagna: Simha</text>
      <text x="120" y="160" font-size="12" fill="#9a3412" text-anchor="middle">Guru + Chandra</text>
    </g>

    <text x="30" y="400" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="20" fill="#1c1917">Saved Profiles: Vasu Sharma (Jaipur)</text>
    <text x="30" y="435" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" fill="#78716c">Ascendant: Leo • Moon Sign: Taurus • Nakshatra: Krittika</text>
    
    <rect x="30" y="470" width="520" height="130" rx="16" fill="#fff7ed" />
    <text x="50" y="510" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="18" fill="#ea580c">✨ Personalized Planetary Insights</text>
    <text x="50" y="540" font-family="'Plus Jakarta Sans', sans-serif" font-size="15" fill="#78716c">Jupiter Mahadasha brings auspicious prospects in education and career.</text>
    <text x="50" y="570" font-family="'Plus Jakarta Sans', sans-serif" font-size="15" fill="#15803d">Remedy: Wear Yellow Sapphire or chant Brihaspati Gayatri.</text>
  </g>

  <!-- Col 3: Lunar Panchang & Muhurat -->
  <g transform="translate(1280, 390)">
    <rect width="580" height="640" rx="24" fill="#ffffff" filter="url(#dShadow)" />
    <text x="30" y="50" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="26" fill="#7c2d12">Lunar Phase &amp; Daily Panchang</text>

    <!-- Moon Banner -->
    <rect x="30" y="80" width="520" height="200" rx="20" fill="#0f172a" />
    <circle cx="450" cy="180" r="60" fill="#fef08a" />
    <text x="60" y="130" font-family="'Cinzel', serif" font-weight="800" font-size="24" fill="#fef08a">Sharad Purnima</text>
    <text x="60" y="165" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" fill="#cbd5e1">Oct 28, 2026 • 100% Illumination</text>
    <text x="60" y="200" font-family="'Plus Jakarta Sans', sans-serif" font-size="15" fill="#cbd5e1">Auspicious for Satyanarayan Pooja</text>
    <text x="60" y="240" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="15" fill="#f59e0b">Chandra Mantra: ॐ सों सोमाय नमः</text>

    <text x="30" y="325" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="20" fill="#1c1917">Today's Auspicious Muhurats</text>
    
    <rect x="30" y="345" width="520" height="70" rx="14" fill="#f0fdf4" stroke="#86efac" />
    <text x="50" y="385" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="18" fill="#166534">✨ Abhijit Muhurat: 11:45 AM - 12:35 PM (Best for all deeds)</text>

    <rect x="30" y="430" width="520" height="70" rx="14" fill="#fef2f2" stroke="#fca5a5" />
    <text x="50" y="470" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="18" fill="#991b1b">⚠️ Rahu Kaal: 04:30 PM - 06:00 PM (Inauspicious)</text>

    <rect x="30" y="520" width="520" height="80" rx="16" fill="#fff7ed" stroke="#fed7aa" />
    <text x="50" y="555" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="18" fill="#ea580c">Choghadiya Muhurat</text>
    <text x="50" y="580" font-family="'Plus Jakarta Sans', sans-serif" font-size="15" fill="#78716c">Amrit: 06:15 - 07:45 AM | Shubh: 09:15 - 10:45 AM | Labh: 01:45 - 03:15 PM</text>
  </g>
</svg>
`;

async function run() {
  await sharp(Buffer.from(svgMobile1))
    .png({ quality: 90 })
    .toFile(path.join(outDir, 'screenshot-mobile-1.png'));
  console.log('Created screenshot-mobile-1.png');

  await sharp(Buffer.from(svgMobile2))
    .png({ quality: 90 })
    .toFile(path.join(outDir, 'screenshot-mobile-2.png'));
  console.log('Created screenshot-mobile-2.png');

  await sharp(Buffer.from(svgDesktop))
    .png({ quality: 90 })
    .toFile(path.join(outDir, 'screenshot-desktop-1.png'));
  console.log('Created screenshot-desktop-1.png');
}

run().catch(console.error);
