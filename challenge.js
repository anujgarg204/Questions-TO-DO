const localStorageWithExpiry = {
    getItem: function(key) {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) {
            console.log(`Query after expiry time window.localStorageWithExpiery.getItem("${key}"); Answer -> "undefined"`);
            return null;
        }
        const item = JSON.parse(itemStr);
        const now = new Date().getTime();
        if (now > item.expiry) {
            localStorage.removeItem(key);
            console.log(`Query after expiry time window.localStorageWithExpiery.getItem("${key}"); Answer -> "undefined"`);
            return null;
        }
        console.log(`Query within expiry time window.localStorageWithExpiery.getItem("${key}"); Answer -> "${item.value}"`);
        return item.value;
    },
    setItem: function(key, value, expiryTime) {
        const now = new Date().getTime();
        const item = {
            value: value,
            expiry: now + expiryTime * 1000 
        };
        localStorage.setItem(key, JSON.stringify(item));
        console.log(`Setting key and value with time ${expiryTime} seconds window.localStorageWithExpiery.setItem("${key}", "${value}", ${expiryTime});`);
    }
};


document.getElementById("inputForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const key = document.getElementById("keyInput").value;
    const value = document.getElementById("valueInput").value;
    const expiryTime = parseInt(document.getElementById("expiryInput").value);
    localStorageWithExpiry.setItem(key, value, expiryTime);
    this.reset();
});
