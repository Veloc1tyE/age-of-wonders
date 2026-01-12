// Service Worker for Age of Wonders
// Instant-feel aggressive caching with smart updates

const CACHE_VERSION = 'age-of-wonders-v2';
const RUNTIME_CACHE = 'age-of-wonders-runtime-v2';
const CACHE_MAX_AGE = 1000 * 60 * 60 * 24; // 24 hours

// Assets to cache immediately on install
const PRECACHE_URLS = [
  '/',
  '/essays/',
  '/about/',
  '/subscribe/',
  '/favicon.svg',
];

// Install event - cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
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

// Fetch event - cache-first for instant feel, update in background
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Always fetch fresh in background (stale-while-revalidate)
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            // Clone before caching
            const responseToCache = networkResponse.clone();
            
            // Update cache in background
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Network failed - that's fine, we have cache
          return cachedResponse;
        });

      // Return cached response immediately for instant feel
      if (cachedResponse) {
        return cachedResponse;
      }

      // No cache - wait for network
      return fetchPromise;
    })
  );
});
