const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./scratch');

localStorageWithExpiry = {
    setItem: function(key, value, expirySeconds) {
        const now = new Date();
        const item = {
            value: value,
            expiry: now.getTime() + expirySeconds * 1000
        };
        localStorage.setItem(key, JSON.stringify(item));
    },
    getItem: function(key) {
        const item = JSON.parse(localStorage.getItem(key));
        if (!item) {
            return null;
        }
        const now = new Date();
        if (now.getTime() > item.expiry) {
            localStorage.removeItem(key);
            return null;
        }
        return item.value;
    }
};
localStorageWithExpiry.setItem('key', 'value', 10);
const value = localStorageWithExpiry.getItem('key')
console.log('value:', value);

setTimeout(() => {
    console.log('value:',localStorageWithExpiry.getItem('key'));
}, 5 * 1000)

setTimeout(() => {
    console.log('no value',localStorageWithExpiry.getItem('key'));
}, 11 * 1000)