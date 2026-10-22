const CACHE_NAME = 'unopop-cache-v5';
const urlsToCache = [
  './',
  './index.html',
  './css/style.css',
  './js/app.js',
  './manifest.json',
  './assets/icon.svg',
  './assets/fonts/fredoka-600.woff2',
  './assets/fonts/fredoka-700.woff2',
  './assets/fonts/nunito-400.woff2',
  './assets/fonts/nunito-700.woff2',
  './assets/audio/draw.mpeg',
  './assets/audio/pop.mpeg',
  './assets/audio/uno.mpeg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => cacheName !== CACHE_NAME)
                  .map(cacheName => caches.delete(cacheName))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
