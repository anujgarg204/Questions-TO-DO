// Check if window is defined (for browser environment)
if (typeof window !== "undefined") {
  window.localStorageWithExpiry = {
    setItem: function (key, value, expirySeconds) {
      const now = new Date();
      const item = {
        value: value,
        expiry: now.getTime() + expirySeconds * 1000,
      };
      localStorage.setItem(key, JSON.stringify(item));
    },
    getItem: function (key) {
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
} else {
  // Define a mock localStorage object for Node.js environment
  global.localStorageWithExpiry = {
    data: {},
    setItem: function (key, value, expirySeconds) {
      const now = new Date();
      const item = {
        value: value,
        expiry: now.getTime() + expirySeconds * 1000,
      };
      this.data[key] = item;
    },
    getItem: function (key) {
      const item = this.data[key];
      if (!item) {
        return null;
      }
      const now = new Date();
      if (now.getTime() > item.expiry) {
        delete this.data[key];
        return null;
      }
      return item.value;
    },
    removeItem: function (key) {
      delete this.data[key];
    },
  };
}

localStorageWithExpiry.setItem("key1", "value", 1000);
console.log(localStorageWithExpiry.getItem("key1"));
