//Declare variables

var date;
var form = document.getElementById("form");
var key,value,time;

//remove the item created
function waitTimeF() {
    document.getElementById("result").innerHTML = "Local storage empty! Try again"
    localStorage.removeItem(key)
}

form.addEventListener('submit', (event)=>{
    event.preventDefault()
    key = document.getElementById("key").value
    value = document.getElementById("value").value
    time = document.getElementById("time").value
    date = new Date().getTime()
    localStorage.setItem(key,JSON.stringify({
        value:value,
        expDate: date+time*1000 // seconds to milleseconds
    }))
    document.getElementById("result").innerHTML = "Local storage updated! You have "+time+" seconds"
    window.setTimeout(waitTimeF,time*1000) // wait a given time and then execute waitTimeF function
    
    
})


