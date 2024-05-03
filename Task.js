const { LocalStorage } = require('node-localstorage');

const localStorage = new LocalStorage('./localstorage');

const localStorageWithExpiry = {
  setItem: function(key, value, expiryInSeconds) {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + expiryInSeconds * 1000
    };
    localStorage.setItem(key, JSON.stringify(item));
  },
  getItem: function(key) {
    const item = JSON.parse(localStorage.getItem(key));
    if (!item) {
      return undefined;
    }
    const now = new Date();
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return undefined;
    }
    return item.value;
  }
};

localStorageWithExpiry.setItem('myKey', 'Hello, world!', 10);

const value = localStorageWithExpiry.getItem('myKey');
console.log(value); 
const valueAfterExpiry = localStorageWithExpiry.getItem('myKey');
console.log(valueAfterExpiry); 