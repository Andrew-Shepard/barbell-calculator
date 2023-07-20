// service-worker.js

const CACHE_NAME = 'my-app-cache-v1';
const urlsToCache = [
    '/barbell-calculator/',
    '/barbell-calculator/index.html',
    '/barbell-calculator/barbell512.png'
  ];  

self.addEventListener('install', (event) => {
    // Perform installation steps
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then((cache) => {
          console.log('Opened cache');
          
          let cachePromises = urlsToCache.map(urlToCache => {
            return fetch(urlToCache)
              .then(response => {
                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
                return cache.put(urlToCache, response);
              })
              .catch(error => {
                console.error(`Failed to fetch and cache ${urlToCache}`, error);
              });
          });
  
          return Promise.all(cachePromises);
        })
    );
  });
  
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return the response
        if (response) {
          return response;
        }
        // Otherwise, fetch from the network
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  // Clean up old caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
