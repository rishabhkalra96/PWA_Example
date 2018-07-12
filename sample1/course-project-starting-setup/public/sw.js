self.addEventListener('install', function(event){
    console.log("Install event logged", event);
});


self.addEventListener('activate', function(event){
    console.log("Activate event logged", event);
    return self.clients.claim();
});