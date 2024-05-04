function setWithExpiry(key, value, expirySeconds) {
    const now = new Date();
    const item = {
        value: value,
        expiry: now.getTime() + expirySeconds * 1000
    };
    localStorage.setItem(key, JSON.stringify(item));
}

function getWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;
    const item = JSON.parse(itemStr);
    if (Date.now() > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }
    return item.value;
}
