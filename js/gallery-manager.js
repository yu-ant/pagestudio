(function () {
  var DB_NAME = 'page-studio-gallery';
  var STORE = 'photos';
  var _db = null;

  function open() {
    return new Promise(function (res, rej) {
      if (_db) { res(_db); return; }
      var r = indexedDB.open(DB_NAME, 1);
      r.onupgradeneeded = function (e) {
        var db = e.target.result;
        if (!db.objectStoreNames.contains(STORE)) {
          db.createObjectStore(STORE, { keyPath: 'id', autoIncrement: true });
        }
      };
      r.onsuccess = function (e) { _db = e.target.result; res(_db); };
      r.onerror = function (e) { rej(e.target.error); };
    });
  }

  function add(src, name, category) {
    return open().then(function (db) {
      return new Promise(function (res, rej) {
        var tx = db.transaction(STORE, 'readwrite');
        var req = tx.objectStore(STORE).add({
          src: src,
          name: name || '',
          category: category || '기타',
          ts: Date.now()
        });
        req.onsuccess = function () { res(req.result); };
        req.onerror = function (e) { rej(e.target.error); };
      });
    });
  }

  function getAll() {
    return open().then(function (db) {
      return new Promise(function (res, rej) {
        var req = db.transaction(STORE, 'readonly').objectStore(STORE).getAll();
        req.onsuccess = function () { res(req.result || []); };
        req.onerror = function (e) { rej(e.target.error); };
      });
    });
  }

  function remove(id) {
    return open().then(function (db) {
      return new Promise(function (res, rej) {
        var req = db.transaction(STORE, 'readwrite').objectStore(STORE).delete(id);
        req.onsuccess = function () { res(); };
        req.onerror = function (e) { rej(e.target.error); };
      });
    });
  }

  window.PageStudioGallery = { add: add, getAll: getAll, remove: remove };
})();
