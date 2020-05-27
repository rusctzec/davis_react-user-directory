const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

let db;
const request = indexedDB.open("directory", 1);

request.onupgradeneeded = ({ target }) => {
  let db = target.result;
  db.createObjectStore("pending", { autoIncrement: true });
};

request.onsuccess = ({ target }) => {
  db = target.result;
};

request.onerror = function(event) {
  console.log("IndexedDB error", event.target.errorCode);
};

function saveRecord(record) {
  const transaction = db.transaction(["pending"], "readwrite");
  const store = transaction.objectStore("pending");

  store.add(record);
}

function checkDatabase(callback) {

  // wait until db exists
  new Promise((resolve, reject) => {
    (function waitForDbLoad() {
      if (db != null) return resolve();
      setTimeout(waitForDbLoad, 30);
    })();

  }).then(() => {
    const transaction = db.transaction(["pending"], "readwrite");
    const store = transaction.objectStore("pending");
    const getAll = store.getAll();

    getAll.onsuccess = function() {
      callback(getAll.result);
    }
  })
}

export default {checkDatabase, saveRecord}