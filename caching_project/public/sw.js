self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(caches.open('static_cache')
    .then(function(opened_cache){
      console.log("cache created/opened");
      opened_cache.add('/src/js/app.js');
      opened_cache.add('/');
      opened_cache.add('/index.html');
      opened_cache.add('/src/css/app.css');
      console.log("app.js added to cache");
    }));
});

self.addEventListener('activate', function(event) {
  
  return self.clients.claim();
});

self.addEventListener('fetch', function(event){
  event.respondWith(
    caches.match(event.request)
    .then(function(response){
      if(response){
        return response;
      }else{return fetch(event.request);}
    })
  );
});
