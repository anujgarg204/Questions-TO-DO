const localStorageWithExpiry = {
    setItem: (key, value, expirySeconds) => {
        const now = new Date();
        const item = {
            value: value,
            expiry: now.getTime() + (expirySeconds * 1000)
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
            return null;
        }
        return item.value;
    }
};

localStorageWithExpiry.setItem("key1", "value", 1000);
console.log(localStorageWithExpiry.getItem("key1"));
setTimeout(() => {
    console.log(localStorageWithExpiry.getItem("key1"));
}, 1000);
