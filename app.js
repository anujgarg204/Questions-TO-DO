// Code to set and get items from local storage with expiry time
window.localStorageWithExpiry = {

    setItem: function(key, value, expirySeconds) {
        const now = new Date(); 
        const item = {
            value: value,
            expiry: now.getTime() + (expirySeconds * 1000) 
        };
        localStorage.setItem(key, JSON.stringify(item)); 
    },

    getItem: function(key) {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) {
            return undefined; 
        }
        const item = JSON.parse(itemStr);
        const now = new Date().getTime(); 
        if (now > item.expiry) {
            localStorage.removeItem(key); 
            return undefined; 
        }
        return item.value; 
    }
};

window.localStorageWithExpiry.setItem("key1", "value", 1000);

const result1 = window.localStorageWithExpiry.getItem("key1");
console.log(result1); // Output: "value"

const result2 = window.localStorageWithExpiry.getItem("key1");
console.log(result2); // Output: undefined
