var STATIC_CACHE_NAME = "static_cache_v2";
var DYNAMIC_CACHE_NAME = "dynamic_cache_v2";

self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(caches.open(STATIC_CACHE_NAME)
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
    event.waitUntil(
        caches.keys()
            .then(function (keys_list){
                return Promise.all(keys_list.map(function(key){
                    if (key !==STATIC_CACHE_NAME && key !== DYNAMIC_CACHE_NAME){
                        console.log("[Service Worker] deleting cache", key);
                        return caches.delete(key);
                    }
                }));
            })
    );
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
                  return caches.open(DYNAMIC_CACHE_NAME)
                      .then(function (dynamic_opened_cache){
                          dynamic_opened_cache.put(event.request.url, res.clone());
                          return res;
                      })
              });
      }
    })
  );
});
