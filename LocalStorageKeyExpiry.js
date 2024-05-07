const setKeyAtLocalStorageWithExpiry = (key, value, expirationTimeDefinedByUser) => {
    const item = {
      value,
      expiry: new Date().getTime() + expirationTimeDefinedByUser
    };
    localStorage.setItem(key, JSON.stringify(item));
  };
  
  const getKayFromLocalStorageWithExpiry = (key) => {
    const item = JSON.parse(localStorage.getItem(key));
    if (!item || new Date().getTime() > item.expiry) {
      localStorage.removeItem(key);
      return undefined;
    }
    return item.value;
  };
  
  const key = 'key';
  const value = 'value';
  const expirationTime = 600000; // it is equal to 10 minutes
  setKeyAtLocalStorageWithExpiry(key, value, expirationTime);
  
  const retrievedValue = getKayFromLocalStorageWithExpiry(key);