const localStorageWithExpiry = {
    setItem: (key, value, expirySeconds) => {
        const now = new Date();
        const item = {
            value: value,
            expiry: now.getTime() + (expirySeconds)
        };
        localStorage.setItem(key, JSON.stringify(item));
    },
    getItem: (key) => {
        const itemString = localStorage.getItem(key);
        if (!itemString) return null;
        const item = JSON.parse(itemString);
        const now = new Date();
        if (now.getTime() > item.expiry) {
            localStorage.removeItem(key); 
            return undefined;
        }
        return item.value;
    }
};

// Example usage:
localStorageWithExpiry.setItem("key1", "value", 1000 ); 
console.log("INTIAL: ", localStorageWithExpiry.getItem("key1"));

setTimeout(() => {
    console.log("AFTER: ",localStorageWithExpiry.getItem("key1"));
}, 1000);
