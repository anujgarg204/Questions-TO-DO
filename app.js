const localStorageWithExpiry = {
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

// Set an item with an expiry time of 5 seconds
localStorageWithExpiry.setItem("key1", "value", 5);

// Retrieve the item within the expiry time
console.log(localStorageWithExpiry.getItem("key1")); // Output: "value" (within 5 seconds)

// Wait for the expiry time to pass (e.g., 6 seconds)
setTimeout(() => {
    // Retrieve the item after the expiry time
    console.log(localStorageWithExpiry.getItem("key1")); // Output: null (after 5 seconds)
}, 6000); // Wait for 6 seconds
