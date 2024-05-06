const localStorageWithExpiry = {
  setItem: (key, value, expiryInSeconds) => {
    const now = new Date();
    const item = {
      value,
      expiry: now.getTime() + expiryInSeconds * 1000,
    };
    localStorage.setItem(key, JSON.stringify(item));
  },

  getItem: (key) => {
    const itemString = localStorage.getItem(key);
    if (!itemString) {
      return null; // Item not found
    }
    const item = JSON.parse(itemString);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  },
};

function setItemWithExpiry() {
  const key = document.getElementById("keyInput").value;
  const value = document.getElementById("valueInput").value;
  const expiryInSeconds = parseInt(
    document.getElementById("expiryInput").value,
    10
  );
  if (!key || !value || !expiryInSeconds) {
    document.getElementById("output").innerHTML = "missing fields";
    return;
  }
  localStorageWithExpiry.setItem(key, value, expiryInSeconds);
  const expiryDate = new Date(Date.now() + expiryInSeconds * 1000);
  document.getElementById(
    "output"
  ).innerHTML = `Item with key '${key}' set in Local Storage with expiry time ${expiryDate}.`;
  if (!document.getElementById("refreshButton")) {
    const refreshButton = document.createElement("button");
    refreshButton.textContent = "Refresh Item";
    refreshButton.setAttribute("id", "refreshButton");
    refreshButton.onclick = refreshItem;
    document.body.appendChild(refreshButton);
  }
}

function refreshItem() {
  const key = document.getElementById("keyInput").value;
  const value = localStorageWithExpiry.getItem(key);
  if (value === null) {
    document.getElementById(
      "output"
    ).innerHTML = `Item with key '${key}' has expired.`;
    const refreshButton = document.getElementById("refreshButton");
    refreshButton.parentNode.removeChild(refreshButton);
  } else {
    document.getElementById(
      "output"
    ).innerHTML = `Item refreshed : Item with key '${key}' still in Local Storage `;
  }
}
