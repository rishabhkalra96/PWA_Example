var idb_promise = idb.open('post-store',1, function(db_object){
  if(!db_object.objectStoreNames.contains('posts')){
    db_object.createObjectStore('posts',{keyPath: 'id'});
  }
});

function writeData(store_name, data){
  return idb_promise
  .then(function(db){
    var tx = db.transaction(store_name, 'readwrite');
    var store = tx.objectStore(store_name);
    store.put(data);
    return tx.complete;
  });
}
