var df;

if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js')
    .then(function(){
        console.log('Service worker registered successfully');
    });
}

window.addEventListener('beforeinstallprompt', function(event){
    console.log("just before install prompt fired");
    event.preventDefault();
    df = event;
    return false;
});