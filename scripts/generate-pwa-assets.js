import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const outputDir = path.resolve('public/icons');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// SVG with 12R logo emblem in luxury midnight navy & champagne gold
function createSvgLogo(size, isMaskable = false) {
  const padding = isMaskable ? Math.round(size * 0.15) : 0;
  const innerSize = size - padding * 2;
  const rx = isMaskable ? 0 : Math.round(innerSize * 0.22);

  return `
  <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0a0f1d" />
        <stop offset="50%" stop-color="#111827" />
        <stop offset="100%" stop-color="#1c1917" />
      </linearGradient>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fbbf24" />
        <stop offset="40%" stop-color="#f59e0b" />
        <stop offset="100%" stop-color="#b45309" />
      </linearGradient>
      <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fcd34d" stop-opacity="0.8" />
        <stop offset="100%" stop-color="#78350f" stop-opacity="0.3" />
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000000" flood-opacity="0.6"/>
      </filter>
    </defs>

    <!-- Outer background -->
    <rect width="${size}" height="${size}" fill="#0b0f19" />

    <!-- Main rounded emblem -->
    <rect x="${padding}" y="${padding}" width="${innerSize}" height="${innerSize}" rx="${rx}" fill="url(#bgGrad)" stroke="url(#borderGrad)" stroke-width="${Math.max(2, Math.round(size * 0.015))}" filter="url(#shadow)" />

    <!-- 12R monogram -->
    <g transform="translate(${size / 2}, ${size / 2})">
      <!-- Zodiac subtle ring -->
      <circle cx="0" cy="0" r="${innerSize * 0.36}" fill="none" stroke="url(#goldGrad)" stroke-width="${Math.max(1.5, Math.round(size * 0.008))}" stroke-dasharray="${size * 0.04} ${size * 0.02}" opacity="0.6" />

      <!-- Center Typography 12R -->
      <text x="0" y="${size * 0.03}" font-family="Georgia, serif" font-weight="900" font-size="${innerSize * 0.34}" text-anchor="middle" dominant-baseline="central" fill="url(#goldGrad)" filter="url(#shadow)">
        12R
      </text>

      <!-- 40+ Tag banner -->
      <rect x="${-innerSize * 0.28}" y="${innerSize * 0.26}" width="${innerSize * 0.56}" height="${innerSize * 0.12}" rx="${innerSize * 0.06}" fill="#1e1b4b" stroke="#f59e0b" stroke-width="${Math.max(1, Math.round(size * 0.005))}" />
      <text x="0" y="${innerSize * 0.325}" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="${innerSize * 0.07}" text-anchor="middle" dominant-baseline="central" fill="#fef3c7" letter-spacing="1">
        40+ MATURE
      </text>
    </g>
  </svg>`;
}

// Mobile screenshot for Play Store / PWABuilder preview
function createMobileScreenshot() {
  const width = 1080;
  const height = 1920;
  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${height}" fill="#0b0f19" />
    <circle cx="200" cy="300" r="400" fill="#f59e0b" opacity="0.1" filter="blur(60px)" />
    <circle cx="880" cy="1600" r="500" fill="#10b981" opacity="0.08" filter="blur(80px)" />

    <!-- Top App Bar -->
    <rect x="0" y="0" width="${width}" height="180" fill="#0f172a" />
    <text x="60" y="110" font-family="Georgia, serif" font-weight="bold" font-size="54" fill="#fbbf24">12Rashi</text>
    <text x="280" y="110" font-family="system-ui, sans-serif" font-size="28" fill="#94a3b8">Dating for mature professionals (40+)</text>
    <rect x="850" y="70" width="170" height="60" rx="30" fill="#065f46" stroke="#10b981" stroke-width="2" />
    <text x="935" y="110" font-family="system-ui, sans-serif" font-weight="bold" font-size="24" fill="#ecfdf5" text-anchor="middle">Aadhaar Verified</text>

    <!-- Main Card -->
    <rect x="60" y="240" width="960" height="1200" rx="40" fill="#1e293b" stroke="#f59e0b" stroke-opacity="0.3" stroke-width="3" />
    <rect x="60" y="240" width="960" height="700" rx="40" fill="#334155" />
    
    <text x="100" y="1000" font-family="Georgia, serif" font-weight="bold" font-size="52" fill="#ffffff">Dr. Sunita Deshmukh, 48</text>
    <text x="100" y="1060" font-family="system-ui, sans-serif" font-size="34" fill="#fbbf24">Chief of Pediatric Cardiology • Mumbai</text>
    <text x="100" y="1130" font-family="system-ui, sans-serif" font-size="28" fill="#cbd5e1">"Decades in medicine taught me true wealth is quiet stillness and genuine presence..."</text>
    
    <rect x="100" y="1220" width="260" height="70" rx="20" fill="#0f172a" stroke="#475569" stroke-width="2" />
    <text x="230" y="1265" font-family="system-ui, sans-serif" font-size="26" fill="#cbd5e1" text-anchor="middle">Empty Nester</text>

    <rect x="380" y="1220" width="340" height="70" rx="20" fill="#451a03" stroke="#f59e0b" stroke-width="2" />
    <text x="550" y="1265" font-family="system-ui, sans-serif" font-size="26" fill="#fde68a" text-anchor="middle">94% AI Synergy</text>

    <!-- Bottom Actions -->
    <rect x="100" y="1320" width="410" height="90" rx="25" fill="#f59e0b" />
    <text x="305" y="1375" font-family="system-ui, sans-serif" font-weight="bold" font-size="32" fill="#0f172a" text-anchor="middle">Encrypted Chat</text>
    <rect x="540" y="1320" width="420" height="90" rx="25" fill="#059669" />
    <text x="750" y="1375" font-family="system-ui, sans-serif" font-weight="bold" font-size="32" fill="#ffffff" text-anchor="middle">HD Video Date</text>

    <!-- Bottom Navigation -->
    <rect x="0" y="1740" width="${width}" height="180" fill="#0f172a" stroke="#1e293b" stroke-width="2" />
    <text x="180" y="1840" font-family="system-ui, sans-serif" font-size="30" fill="#fbbf24" text-anchor="middle">Curated Dossiers</text>
    <text x="540" y="1840" font-family="system-ui, sans-serif" font-size="30" fill="#94a3b8" text-anchor="middle">Secure Messages</text>
    <text x="900" y="1840" font-family="system-ui, sans-serif" font-size="30" fill="#94a3b8" text-anchor="middle">Executive Profile</text>
  </svg>`;
}

// Wide Desktop screenshot for Play Store / PWABuilder preview
function createDesktopScreenshot() {
  const width = 1920;
  const height = 1080;
  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${height}" fill="#0b0f19" />
    <circle cx="300" cy="200" r="500" fill="#f59e0b" opacity="0.08" filter="blur(80px)" />
    <circle cx="1600" cy="800" r="600" fill="#10b981" opacity="0.06" filter="blur(100px)" />

    <!-- Top Navigation Header -->
    <rect x="0" y="0" width="${width}" height="90" fill="#0f172a" stroke="#1e293b" stroke-width="1" />
    <text x="80" y="55" font-family="Georgia, serif" font-weight="bold" font-size="34" fill="#fbbf24">12Rashi</text>
    <text x="220" y="55" font-family="system-ui, sans-serif" font-size="18" fill="#94a3b8">Dating for mature professionals (40+)</text>
    <rect x="1650" y="24" width="180" height="42" rx="21" fill="#065f46" stroke="#10b981" stroke-width="1.5" />
    <text x="1740" y="51" font-family="system-ui, sans-serif" font-weight="bold" font-size="15" fill="#ecfdf5" text-anchor="middle">Aadhaar Verified</text>

    <!-- Main Content Area: Left Profile Dossier, Right Insights -->
    <rect x="80" y="140" width="1050" height="860" rx="24" fill="#1e293b" stroke="#334155" stroke-width="2" />
    <rect x="80" y="140" width="1050" height="420" rx="24" fill="#334155" />
    <text x="130" y="620" font-family="Georgia, serif" font-weight="bold" font-size="38" fill="#ffffff">Dr. Sunita Deshmukh, 48</text>
    <text x="130" y="665" font-family="system-ui, sans-serif" font-size="22" fill="#fbbf24">Chief of Pediatric Cardiology • Mumbai</text>
    <text x="130" y="715" font-family="system-ui, sans-serif" font-size="18" fill="#cbd5e1">"Decades in medicine taught me true wealth is quiet stillness and genuine presence..."</text>
    <rect x="130" y="760" width="220" height="46" rx="12" fill="#0f172a" stroke="#475569" stroke-width="1" />
    <text x="240" y="790" font-family="system-ui, sans-serif" font-size="16" fill="#cbd5e1" text-anchor="middle">Empty Nester • Single</text>
    <rect x="370" y="760" width="260" height="46" rx="12" fill="#451a03" stroke="#f59e0b" stroke-width="1" />
    <text x="500" y="790" font-family="system-ui, sans-serif" font-size="16" fill="#fde68a" text-anchor="middle">94% AI Life Synergy</text>

    <!-- Right Side Dashboard Card -->
    <rect x="1170" y="140" width="670" height="860" rx="24" fill="#1e293b" stroke="#f59e0b" stroke-opacity="0.3" stroke-width="2" />
    <text x="1220" y="210" font-family="Georgia, serif" font-weight="bold" font-size="28" fill="#fef3c7">AI Compatibility Dossier</text>
    <text x="1220" y="250" font-family="system-ui, sans-serif" font-size="16" fill="#94a3b8">5-Pillar Executive Match Analysis</text>
    <rect x="1220" y="290" width="570" height="90" rx="16" fill="#0f172a" />
    <text x="1250" y="342" font-family="system-ui, sans-serif" font-size="18" fill="#fbbf24">Emotional Maturity and Autonomy: 96%</text>
    <rect x="1220" y="400" width="570" height="90" rx="16" fill="#0f172a" />
    <text x="1250" y="452" font-family="system-ui, sans-serif" font-size="18" fill="#34d399">Life Stage and Independence: 92%</text>
    <rect x="1220" y="510" width="570" height="90" rx="16" fill="#0f172a" />
    <text x="1250" y="562" font-family="system-ui, sans-serif" font-size="18" fill="#60a5fa">Intellectual and Emotional Depth: 95%</text>

    <!-- Connect Action -->
    <rect x="1220" y="750" width="570" height="70" rx="18" fill="#d97706" />
    <text x="1505" y="794" font-family="system-ui, sans-serif" font-weight="bold" font-size="22" fill="#0b0f19" text-anchor="middle">Initiate Encrypted Introduction</text>
  </svg>`;
}

async function generateAllAssets() {
  console.log('Generating PWA Icons & Screenshots with Sharp...');

  const sizes = [96, 144, 192, 256, 384, 512];
  for (const sz of sizes) {
    await sharp(Buffer.from(createSvgLogo(sz, false)))
      .png()
      .toFile(path.join(outputDir, `icon-${sz}.png`));
    console.log(`Created icon-${sz}.png`);
  }

  // icon-maskable-512.png
  await sharp(Buffer.from(createSvgLogo(512, true)))
    .png()
    .toFile(path.join(outputDir, 'icon-maskable-512.png'));
  console.log('Created icon-maskable-512.png');

  // apple-touch-icon.png (180x180)
  await sharp(Buffer.from(createSvgLogo(180, false)))
    .png()
    .toFile(path.join(outputDir, 'apple-touch-icon.png'));
  console.log('Created apple-touch-icon.png');

  // favicon.png (64x64) and standard favicon sizes
  await sharp(Buffer.from(createSvgLogo(64, false)))
    .png()
    .toFile(path.join(outputDir, 'favicon.png'));
  await sharp(Buffer.from(createSvgLogo(32, false)))
    .png()
    .toFile(path.join(outputDir, 'favicon-32x32.png'));
  await sharp(Buffer.from(createSvgLogo(16, false)))
    .png()
    .toFile(path.join(outputDir, 'favicon-16x16.png'));
  console.log('Created favicons');

  // screenshot-mobile.png (1080x1920) narrow
  await sharp(Buffer.from(createMobileScreenshot()))
    .png()
    .toFile(path.join(outputDir, 'screenshot-mobile.png'));
  console.log('Created screenshot-mobile.png');

  // screenshot-wide.png (1920x1080) wide
  await sharp(Buffer.from(createDesktopScreenshot()))
    .png()
    .toFile(path.join(outputDir, 'screenshot-wide.png'));
  console.log('Created screenshot-wide.png');

  console.log('All PWA assets successfully generated!');
}

generateAllAssets().catch(console.error);
