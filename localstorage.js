const user = {name : 'John', email : 'john.example@gmail.com'};


function setItemWithExpiry() { 
    const currentDate=new Date();
    const item= {
        value:user.email,
        expiry: currentDate.getTime()+ 1000*10
    }

    localStorage.setItem(user.name, JSON.stringify(item));
}

function getItemWithExpiry()
{
    const currentDate = new Date;
    item = localStorage.getItem(user.name);
    if (!item) { 
        document.writeln("no item is set in localStorage .<br> ")  
    } 
    itemm=JSON.parse(item);
    if(itemm.expiry >= currentDate) { 
        document.writeln (' <h3>localstorageItem </h3>'+ itemm.value +'<br>') }
        else
        {
            localStorage.removeItem(user.name)
            document.writeln(" <h4> item is removed from localStorage </h4>")
        }
}
setTimeout(()=>{getItemWithExpiry() },5000 )
setTimeout(()=>{getItemWithExpiry() },7000 )
setTimeout(()=>{getItemWithExpiry() },1000*20 )

setItemWithExpiry()