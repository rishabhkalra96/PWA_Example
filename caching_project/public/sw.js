self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(caches.open('static_cache')
    .then(function(opened_cache){
      console.log("cache created/opened");


      CACHED_URLS = [
          '/src/js/app.js',
          '/',
          '/index.html',
          '/src/css/app.css',
          '/src/js/material.min.js'
      ];
      opened_cache.addAll(CACHED_URLS);
      console.log("static files added to cache");
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
      }else{
          return fetch(event.request)
              .then(function (res){
                  return caches.open('dynamic_cache')
                      .then(function (dynamic_opened_cache){
                          dynamic_opened_cache.put(event.request.url, res.clone());
                          return res;
                      })
              });
      }
    })
  );
});
