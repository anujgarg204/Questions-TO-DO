const localStorageWithExpiry = {
    // Method to set an item in local storage with expiry time
    setItem: (key, value, expiryInSeconds) => {
        const now = new Date();
        const item = {
            value: value,
            expiry: now.getTime() + expiryInSeconds * 1000 // Calculate expiry time in milliseconds
        };
        localStorage.setItem(key, JSON.stringify(item)); // Store item in local storage as a string
    },
    // Method to get an item from local storage with expiry handling
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
    }
};
