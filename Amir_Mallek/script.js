window.localStorageWithExpiery = {
    /**
     * Sets the value of the pair identified by key to value with an expiration timer, 
     * creating a new key/value pair with an expiration timer if none existed for key previously.
     * @param {string} key 
     * @param {*} value 
     * @param {number} timeToLive 
     */
    setItem: function (key, value, timeToLive) {
        if (!timeToLive) {
            throw new Error('Invalid Expiery Time');
        }
        const expirationTime = Date.now() + (timeToLive * 1000);
        const newItem = {
            value,
            expirationTime
        };
        localStorage.setItem(key, JSON.stringify(newItem));
    },


    /**
     * Returns the current value associated with the given key, 
     * or undefined if the given key does not existor the item has expired.
     * @param {string} key 
     * @param {*} value 
     * @param {number} timeToLive 
     * @returns {* | null}
     */
    getItem(key) {
        const itemJSON = localStorage.getItem(key);
        if (!itemJSON) {
            return undefined;
        }
        const item = JSON.parse(itemJSON);
        if (Date.now() > item.expirationTime) {
            localStorage.removeItem(key);
            return undefined;
        }
        return item.value;
    }
};

// for the demo
const keyInput = document.querySelector('#key');
const valueInput = document.querySelector('#value');
const expirationTimeInput = document.querySelector('#expieryTime');
const addButton = document.querySelector('.add-item');
const successMessage = document.querySelector('#success-message');

const retrieveKeyInput = document.querySelector('#retrieveKey');
const retrieveButton = document.querySelector('.retrieve-item');
const retrieveMessage = document.querySelector('#retrieve-message');

addButton.addEventListener('click', () => {
    const key = keyInput.value;
    const value = valueInput.value;
    const expirationTime = parseInt(expirationTimeInput.value);

    if (key && value && expirationTime) {
        keyInput.value = '';
        valueInput.value = '';
        expirationTimeInput.value = '';
        window.localStorageWithExpiery.setItem(key, value, expirationTime);
        successMessage.classList.remove('d-none');
        successMessage.textContent = 'Item added successfully!';
        setTimeout(() => {
            successMessage.classList.add('d-none');
        }, 3000);
    } else {
        alert('Please fill in all fields correctly.');
    }
});


retrieveButton.addEventListener('click', () => {
    const key = retrieveKeyInput.value;

    if (key) {
        const value = window.localStorageWithExpiery.getItem(key);
        if (value !== undefined) {
            retrieveMessage.classList.remove('d-none');
            retrieveMessage.classList.remove('alert-danger');
            retrieveMessage.classList.add('alert-success');
            retrieveMessage.textContent = `Retrieved value: ${value}`;
        } else {
            retrieveMessage.classList.remove('d-none');
            retrieveMessage.classList.remove('alert-success');
            retrieveMessage.classList.add('alert-danger');
            retrieveMessage.textContent = 'Item does not exist or has expired.';
        }
    } else {
        alert('Please enter a key.');
    }
});