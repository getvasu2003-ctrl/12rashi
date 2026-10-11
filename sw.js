// 12Rashi PWA Service Worker
// Implements 'Stale-While-Revalidate' (SWR) strategy for instant loading on poor networks

const CACHE_VERSION = '12rashi-v2';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

// Core static assets pre-cached on installation for offline readiness
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/manifest.webmanifest',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-maskable-512.png',
  '/icons/apple-touch-icon.png'
];

// Domains/paths that should never be intercepted or cached
const BYPASS_PATTERNS = [
  /\/api\//,
  /firestore\.googleapis\.com/,
  /identitytoolkit\.googleapis\.com/,
  /firebaseinstallations\.googleapis\.com/,
  /apis\.google\.com/,
  /cashfree\.com/,
  /agora\.io/,
  /agoraio\.cn/
];

// Install Event: Pre-cache core shell assets and activate immediately
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[12Rashi SW] Partial precache failure:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate Event: Evict legacy caches and claim clients immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== STATIC_CACHE && key !== RUNTIME_CACHE) {
            console.log('[12Rashi SW] Evicting outdated cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Message listener for skip waiting signal
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Helper: Determine if request should bypass SW
function shouldBypass(request, url) {
  if (request.method !== 'GET') return true;
  if (!url.protocol.startsWith('http')) return true;
  return BYPASS_PATTERNS.some((pattern) => pattern.test(url.href));
}

// Helper: Stale-While-Revalidate execution
async function staleWhileRevalidate(request, cacheName, fallbackToRoot = false) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  // Background network revalidation promise
  const networkFetchPromise = fetch(request)
    .then((networkResponse) => {
      if (
        networkResponse &&
        networkResponse.status === 200 &&
        (networkResponse.type === 'basic' || networkResponse.type === 'cors')
      ) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    })
    .catch((err) => {
      // Network failed or device offline
      return null;
    });

  // If cached copy exists, return it instantly (0ms latency on slow 2G/3G)
  if (cachedResponse) {
    return cachedResponse;
  }

  // If not in cache, await network
  const networkResponse = await networkFetchPromise;
  if (networkResponse) {
    return networkResponse;
  }

  // If both network and cache fail, check for fallback
  if (fallbackToRoot) {
    const rootFallback = await caches.match('/index.html') || await caches.match('/');
    if (rootFallback) return rootFallback;
  }

  return new Response('Offline - 12Rashi content unavailable without network connection.', {
    status: 503,
    statusText: 'Service Unavailable',
    headers: { 'Content-Type': 'text/plain' }
  });
}

// Fetch Event Handler
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Skip bypassed resources (APIs, Payments, Live Streams, Auth)
  if (shouldBypass(request, url)) {
    return;
  }

  // 1. Navigation requests (HTML page loads) - SWR with fallback to App Shell
  if (request.mode === 'navigate') {
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE, true));
    return;
  }

  // 2. Core Static Assets (scripts, stylesheets, fonts, icons, manifest)
  const isStaticAsset =
    url.origin === self.location.origin ||
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com');

  if (isStaticAsset) {
    event.respondWith(staleWhileRevalidate(request, RUNTIME_CACHE));
  }
});
