

window.localStorageWithExpiry = {
    setItem: function(key, value, expiryInSeconds) {
        const now = new Date();
        const item = {
            value: value,
            expiry: now.getTime() + (expiryInSeconds * 1000)
        };
        localStorage.setItem(key, JSON.stringify(item));
    },
    getItem: function(key) {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) {
            return undefined;
        }
        const item = JSON.parse(itemStr);
        const now = new Date();
        if (now.getTime() > item.expiry) {
            localStorage.removeItem(key);
            return undefined;
        }
        return item.value;
    }
};

// Example 
window.localStorageWithExpiry.setItem("key1", "value", 1000);
console.log(window.localStorageWithExpiry.getItem("key1")); //  "value"
setTimeout(function() {
    console.log(window.localStorageWithExpiry.getItem("key1")); //  "Value" still there 990s left
}, 10);

setTimeout(function() {
    console.log(window.localStorageWithExpiry.getItem("key1")); //  undefined 
}, 1000 * 1000);
