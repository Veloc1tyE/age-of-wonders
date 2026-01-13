// Service Worker for Age of Wonders
// Smart caching: instant assets + fresh HTML

const CACHE_VERSION = 'age-of-wonders-v3';
const RUNTIME_CACHE = 'age-of-wonders-runtime-v3';
const NETWORK_TIMEOUT = 2000; // 2s timeout for network-first requests

// Assets to cache immediately on install
const PRECACHE_URLS = [
  '/favicon.svg',
];

// Check if request is for an HTML page
function isHtmlRequest(request) {
  const url = new URL(request.url);
  const accept = request.headers.get('Accept') || '';
  // HTML pages: no extension, or explicit .html, or Accept includes text/html
  return accept.includes('text/html') ||
         url.pathname.endsWith('/') ||
         url.pathname.endsWith('.html') ||
         (!url.pathname.includes('.') && url.pathname !== '/sw.js');
}

// Check if request is for a static asset
function isStaticAsset(request) {
  const url = new URL(request.url);
  return url.pathname.match(/\.(js|css|woff2?|ttf|ico|svg|png|jpg|jpeg|webp|gif|json)$/i) ||
         url.pathname.startsWith('/_astro/');
}

// Install event - cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up ALL old caches for fresh start
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_VERSION && name !== RUNTIME_CACHE)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Network-first with timeout (for HTML pages)
async function networkFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);

  try {
    // Race network against timeout
    const networkPromise = fetch(request);
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), NETWORK_TIMEOUT)
    );

    const response = await Promise.race([networkPromise, timeoutPromise]);

    if (response && response.status === 200) {
      // Cache the fresh response
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Network failed or timed out - try cache
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    // Last resort: try network without timeout (might be slow but better than nothing)
    return fetch(request);
  }
}

// Cache-first with background update (for static assets)
async function cacheFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);

  // Always fetch fresh in background
  const fetchPromise = fetch(request)
    .then((response) => {
      if (response && response.status === 200) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cached);

  // Return cached immediately if available
  if (cached) {
    return cached;
  }

  // No cache - wait for network
  return fetchPromise;
}

// Fetch event - smart routing
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Route based on request type
  if (isStaticAsset(event.request)) {
    // Static assets: cache-first for instant feel
    event.respondWith(cacheFirst(event.request));
  } else if (isHtmlRequest(event.request)) {
    // HTML pages: network-first for freshness
    event.respondWith(networkFirst(event.request));
  } else {
    // Everything else: cache-first
    event.respondWith(cacheFirst(event.request));
  }
});
