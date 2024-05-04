const key = document.querySelector("#key");
const value = document.querySelector("#value");
const expiryTime = document.querySelector("#expiryTime");
const setButton = document.querySelector("#set");
const getButton = document.querySelector("#get");
const text = document.querySelector("#text");
setButton.addEventListener("click", () => {
  setDataWithExpiry(key.value, value.value, expiryTime.value * 1000);
  console.log(key.value, value.value, expiryTime.value * 1000);
});
getButton.addEventListener("click", () => {
  getDataWithExpiry(key.value);
});
const setDataWithExpiry = (key, value, expiryTime) => {
  const now = new Date();
  const item = {
    value: value,
    expiryTime: now.getTime() + expiryTime,
  };
  localStorage.setItem(key, JSON.stringify(item));
};
const getDataWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    text.innerHTML = "No data!";
    text.classList.add("text-red-500");
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiryTime) {
    localStorage.removeItem(key);
    text.innerHTML = "Data expired!";
    text.classList.remove("text-green-500");
    text.classList.add("text-red-500");
  } else {
    text.innerHTML = item.value;
    text.classList.remove("text-red-500");
    text.classList.add("text-green-500");
  }
};
