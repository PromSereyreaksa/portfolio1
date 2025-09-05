// Simple service worker for caching static assets
const CACHE_NAME = 'portfolio-v1';
const urlsToCache = [
  '/',
  '/profile.webp',
  '/Luminyx.webp',
  '/COPPSARY.webp',
  '/Phsardesign.webp',
  '/Ideagen.webp',
  '/Automata.webp',
  '/Todone.webp',
  '/2.webp',
  '/3.webp',
  '/4.webp',
  '/5.webp',
  '/6.webp',
  '/7.webp'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});
