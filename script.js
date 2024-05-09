window.localStorageWithExpiry = {
    setItem: (key, value, expirySeconds) => {
        const now = new Date();
        const item = {
            value: value,
            expiry: now.getTime() + expirySeconds * 1000,
        };
        localStorage.setItem(key, JSON.stringify(item));
    },
    getItem: (key) => {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) {
            return null;
        }
        const item = JSON.parse(itemStr);
        const now = new Date();
        if (now.getTime() > item.expiry) {
            localStorage.removeItem(key);
            return null;
        }
        return item.value;
    },
};

// Example usage
window.localStorageWithExpiry.setItem("key1", "value", 1000);

console.log(window.localStorageWithExpiry.getItem("key1"));


setTimeout(() => {console.log(window.localStorageWithExpiry.getItem("key1"));}, 1000002)
