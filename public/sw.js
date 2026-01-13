// Service Worker for Age of Wonders
// Stale-while-revalidate: instant from cache, fresh in background

const CACHE_VERSION = 'age-of-wonders-v5';

// Install event - take over immediately
self.addEventListener('install', () => {
  self.skipWaiting();
});

// Activate event - clean up old caches and claim clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_VERSION)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Stale-while-revalidate: instant from cache, update in background
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_VERSION);
  const cached = await cache.match(request);

  // Always fetch fresh in background (don't await)
  const fetchPromise = fetch(request)
    .then((response) => {
      if (response && response.status === 200) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => null);

  // Return cached immediately if available (instant!)
  if (cached) {
    return cached;
  }

  // No cache - must wait for network
  const response = await fetchPromise;
  if (response) {
    return response;
  }

  // Network failed and no cache - throw to trigger browser error
  throw new Error('No cached version and network unavailable');
}

// Fetch event - stale-while-revalidate for all same-origin GET requests
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip service worker itself
  if (event.request.url.includes('/sw.js')) {
    return;
  }

  event.respondWith(staleWhileRevalidate(event.request));
});
