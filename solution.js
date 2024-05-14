window.localStorageWithExpiry = {
    setItem: function(key, value, expiryTime){
        let result  = {
            value,
            expiryTime: Date.now() + expiryTime
        };

        localStorage.setItem(key, JSON.stringify(result));
    },

    getItem: function(key){
        let data = localStorage.getItem(key);
        data = JSON.parse(data);

        if(data.expiryTime <= Date.now()){
            localStorage.removeItem(key);
            return undefined;
        }

        return data.value;
    },

    removeItem: function(key){
        localStorage.removeItem(key);
    }
}

localStorageWithExpiry.setItem("key1", "value", 1000);

/* 
setTimeout(() => {
    console.log(localStorageWithExpiry.getItem("key1"));
}, 500)

In this case, output will be: "value"
-----------------------------------------------------------------
setTimeout(() => {
    console.log(localStorageWithExpiry.getItem("key1"));
}, 1500)

In this case, output will be: "undefined"
*/