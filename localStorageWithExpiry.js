const localStorageWithExpiry = {
  setItem: function (key, value, expiryInSeconds) {
    if (new Date(expiryInSeconds).getTime() - new Date().getTime() > 0) {
      const now = new Date();
      const item = {
        value: value,
        expiry: new Date(expiryInSeconds).getTime(),
      };
      localStorage.setItem(key.toString(), JSON.stringify(item));
      setTimeout(() => {
        localStorage.removeItem(key);
      }, new Date(expiryInSeconds).getTime() - new Date().getTime());
    } else {
      alert('Please Put a date in the futre');
    }
  },
  getItem: function (key) {
    const itemString = localStorage.getItem(key);
    if (!itemString) return undefined;

    const item = JSON.parse(itemString);
    const now = new Date().getTime();

    if (now > item.expiry) {
      localStorage.removeItem(key);
      return undefined;
    }

    return item.value;
  },
};

window.localStorageWithExpiry = localStorageWithExpiry;
