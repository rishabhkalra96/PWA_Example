self.addEventListener('install', function(event){
    console.log("Install event logged", event);
});


self.addEventListener('activate', function(event){
    console.log("Activate event logged", event);
    return self.clients.claim();
});

//in order to add event listeners for non lifecycle events like fetch, pudh etc

self.addEventListener('fetch', function(event){
    console.log("trying to fetch something");
});