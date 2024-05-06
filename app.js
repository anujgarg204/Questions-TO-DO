function LocalStorageWithExpiry() {
  this.storage = window.localStorage;
}

LocalStorageWithExpiry.prototype.setItem = function (
  key,
  value,
  expirySeconds
) {
  const now = Date.now();
  const expiryTime = now + expirySeconds * 1000;
  const data = {
    value,
    expiry: expiryTime,
  };

  this.storage.setItem(key, JSON.stringify(data));

  setTimeout(() => this.removeItem(key), expirySeconds * 1000);
};

LocalStorageWithExpiry.prototype.getItem = function (key) {
  const dataStr = this.storage.getItem(key);
  if (!dataStr) {
    return undefined;
  }

  const data = JSON.parse(dataStr);
  const now = Date.now();

  if (now > data.expiry) {
    this.removeItem(key);
    return undefined;
  }

  return data.value;
};

LocalStorageWithExpiry.prototype.removeItem = function (key) {
  this.storage.removeItem(key);
};

const localStorageWithExpiry = new LocalStorageWithExpiry();

localStorageWithExpiry.setItem("key1", "value", 10);
console.log(localStorageWithExpiry.getItem("key1"));
setTimeout(() => {
  console.log(localStorageWithExpiry.getItem("key1"));
}, 11000);
