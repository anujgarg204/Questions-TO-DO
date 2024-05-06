const localStorageWithExpiry = {
    setItem: (key, value, ttl) => {
        const now = new Date()
        const item = {
            value: value,
            expiry: now.getTime() + ttl * 1000 
        }
        localStorage.setItem(key, JSON.stringify(item))
        setTimeout(() => {
            localStorage.removeItem(key)
        }, ttl * 1000)
    },
    getItem: (key) => {
        const itemStr = localStorage.getItem(key)
        if (!itemStr) {
            return null
        }
        const item = JSON.parse(itemStr)
        const now = new Date()
        if (now.getTime() > item.expiry) {
            localStorage.removeItem(key)
            return null
        }
        return item.value
    }
}

console.log("Example usage:");
localStorageWithExpiry.setItem("testkey", "the item is there and its valid", 5); // set an item in the localstorage , with a testkey , testvalue and 5 seconds cooldown
console.log("current value:", localStorageWithExpiry.getItem("testkey")); // output : testvalue 

// 6 seconds timer
setTimeout(() => {
    console.log("item value after the timer : ",localStorageWithExpiry.getItem("testkey")); // output : null , the item was removed after 5 seconds
}, 6000);