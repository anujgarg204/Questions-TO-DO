
window.localStorageWithExpiery = {
    setItem: (key, value, time) => {
        if(!key)
            return;
        localStorage.setItem(key, JSON.stringify(value))
        setTimeout(() => {
            localStorage.removeItem(key)
        }, time*1000)
    },
    getItem: (key) => {
        const value = localStorage.getItem(key);
        return(JSON.parse(value));
    }
}

//some tests

window.localStorageWithExpiery.setItem('key', 'value', 10);
const value = window.localStorageWithExpiery.getItem('key')
console.log('value:', value);

setTimeout(() => {
    console.log('value:', window.localStorageWithExpiery.getItem('key'));
}, 5 * 1000)

setTimeout(() => {
    console.log('no value', window.localStorageWithExpiery.getItem('key'));
}, 11 * 1000)