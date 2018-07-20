var idb_promise = idb.open('post-store',1, function(db_object){
  if(!db_object.objectStoreNames.contains('posts')){
    db_object.createObjectStore('posts',{keyPath: 'id'});
  }
});

function writeData(store_name, data){
  return idb_promise
  .then(function(db){
    var tx = db.transaction(store_name, 'readwrite');
    console.log("indexedDB opened for write");
    var store = tx.objectStore(store_name);
    store.put(data);
    return tx.complete;
  });
}

function readAllData(store_name){
  return idb_promise
  .then(function(db){
    var tx = db.transaction(store_name, 'readonly');
    console.log("indexedDB opened for read");
    var store = tx.objectStore(store_name);
    return store.getAll(store_name);
    //return tx.complete;
    //no need to return any complete argument because even if the
    //transaction for the reading data fails, it won't effect the
    //data stored. Hence, no tx.complete here

    }
  );
}
