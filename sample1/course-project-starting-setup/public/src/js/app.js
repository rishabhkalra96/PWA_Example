var df;

if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js')
    .then(function(){
        console.log('Service worker registered successfully');
    }).catch(function(err){
        console.log("Something unexpected happened while registering");
    });
}

window.addEventListener('beforeinstallprompt', function(event){
    console.log("just before install prompt fired");
    event.preventDefault();
    df = event;
    console.log("event deferred and stored");
    return false;
});

//creating an async task

fetch('https://httpbin.org/ip')
.then(function(response){
    console.log("the response is ", response);
    return response.json();
}).then(function(responseData){
    console.log("formatted json data is",responseData);
}).catch(function(err){
    console.log(err, "is the error recieved");
});