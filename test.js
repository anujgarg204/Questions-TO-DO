const localStorageExpire = {
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
            return undefined; // Retourner undefined si la clé n'existe pas
        }
        const item = JSON.parse(itemStr);
        const now = new Date();
        if (now.getTime() > item.expiry) {
            localStorage.removeItem(key);
            return undefined; // Retourner undefined si la clé a expiré
        }
        return item.value;
    }
};


// Example 
localStorageExpire.setItem("key1", "value", 30);
console.log(localStorageExpire.getItem("key1"));

// Wait

setTimeout(() => {
    console.log(localStorageExpire.getItem("key1"));
}, 30000);
