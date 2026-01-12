// Service Worker for Age of Wonders
// Caches all pages for instant offline-first loading

const CACHE_NAME = 'age-of-wonders-v2';
const RUNTIME_CACHE = 'age-of-wonders-runtime-v2';

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
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Precaching core assets');
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
          .filter((name) => name !== CACHE_NAME && name !== RUNTIME_CACHE)
          .map((name) => {
            console.log('Service Worker: Deleting old cache', name);
            return caches.delete(name);
          })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - network-first for HTML, cache-first for assets
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  const isHTMLPage = event.request.headers.get('accept')?.includes('text/html');

  // Network-first strategy for HTML pages (always fresh content)
  if (isHTMLPage) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Network failed - fallback to cache
          return caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || caches.match('/404/');
          });
        })
    );
    return;
  }

  // Cache-first for assets (CSS, JS, images)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }

          const responseToCache = networkResponse.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        });
    })
  );
});
