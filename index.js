function setItemWithExpiry(key, value, expiry) {
	const now = new Date();
	const item = {
		value: value,
		expiry: now.getTime() + expiry,
	};
	setTimeout(() => {
        console.log("item has expired");
		window.localStorage.removeItem(key);
	}, expiry);

	window.localStorage.setItem(key, JSON.stringify(item));
}

function getItemWithExpiry(key) {
	const now = (new Date()).getTime();

	let val = window.localStorage.getItem(key);
    console.log(val);
	try {
		let item = JSON.parse(val);
        console.log(now);
        console.log(item.expiry);
		if (item.expiry < now) {
            console.log("item has already expired");
			window.localStorage.removeItem(key);
			throw "expired";
		}
        return item.value;
	} catch (e) {
		return undefined;
	}
}

window.localStorageWithExpiry = {... window.localStorage};
window.localStorageWithExpiry.setItem = setItemWithExpiry;
window.localStorageWithExpiry.getItem = getItemWithExpiry;



