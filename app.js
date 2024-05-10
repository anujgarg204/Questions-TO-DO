const form = document.getElementById('localStorageForm');
const resultDiv = document.getElementById('result');
const queryButton = document.getElementById('queryButton');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const key = form.key.value;
    const value = form.value.value;
    const expiry = parseInt(form.expiry.value);

    // Set item in local storage with provided key, value, and expiry time
    localStorageWithExpiry.setItem(key, value, expiry);
    resultDiv.textContent = `Item with key "${key}" set successfully with expiry of ${expiry} seconds.`;

    form.reset();
});

// Add event listener to query button for retrieving items from local storage
queryButton.addEventListener('click', function () {
    const key = form.key.value.trim();

    // Check if key is empty
    if (key === '') {
        resultDiv.textContent = 'Please enter a key.';
        return;
    }

    // Get item from local storage corresponding to the provided key
    const itemValue = localStorageWithExpiry.getItem(key);

    if (itemValue !== null) {
        resultDiv.textContent = `Item value for key "${key}": ${itemValue}`;
    } else {
        resultDiv.textContent = `Item with key "${key}" not found or expired.`;
    }
});