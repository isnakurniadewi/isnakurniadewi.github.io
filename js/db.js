var nama_table = "idTeam";
const dbPromise = idb.open("team",1,function(db){
    db.createObjectStore(nama_table);
});

function addTeam(id, name, website, url){
    dbPromise.then(function(db){
        var tx = db.transaction(nama_table, 'readwrite');
        var store = tx.objectStore(nama_table);
        var item = {
            idTeam: id,
            nameTeam: name,
            websiteTeam: website,
            urlTeam: url
        };

        store.put(item,id);
        return tx.complete;
    }).then(function(){
        console.log("Team berhasil disimpan");
        showAddSuccessNotification(name);
    }).catch(function(){
        console.log("Team gagal disimpan");
    })
}

function getSaved(){
    dbPromise.then(function(db){
        var tx = db.transaction(nama_table,'readonly');
        var store = tx.objectStore(nama_table);
        return store.getAll();
    }).then(function(items){
        getFavourite(items);
    })
}

function delTeam(id){
    dbPromise.then(function(db){
        var tx = db.transaction(nama_table,'readwrite');
        var store = tx.objectStore(nama_table);
        store.delete(id);
        return tx.complete;
    }).then(function(){
        console.log("Item : "+id+" deleted");
        showDeleteSuccessNotification(name);
        document.location.reload();
    })
}