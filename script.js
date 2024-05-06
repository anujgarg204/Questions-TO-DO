// Object named `myLocalStorage` which provides methods to interact with browser's local storage.
const myLocalStorage = {
  // The `getItem` method retrieves a value from local storage associated with a given `key`.
  getItem: function(key) {
    return window.localStorage.getItem(key);
  },
  
  // The `setItem` method sets a key-value pair in local storage with an optional expiry time.
  setItem: function(key, value, expiryTime) {
    // It first sets the key-value pair in the local storage.
    window.localStorage.setItem(key, value);
    
    // If an expiry time is provided, it schedules the removal of the key-value pair from local storage after that time.
    setTimeout(() => {
      window.localStorage.removeItem(key);
    }, expiryTime);
  }
}

// Usage example:
// Sets a key-value pair ('username' -> 'johnDoe') in local storage with an expiry time of 20000 milliseconds.
myLocalStorage.setItem('username', 'johnDoe', 20000);

// After 15000 milliseconds, retrieves the value associated with the key 'username' from local storage and logs it to the console.
setTimeout(() => {
  console.log(myLocalStorage.getItem('username')); 
}, 15000);
