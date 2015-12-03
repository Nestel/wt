function nameDefined(ckie,nme)
{
    var splitValues;
    var i;

    for (i = 0;i < ckie.length; ++i)
    {
        splitValues = ckie[i].split("=");
        
        if (splitValues[0] == nme) 
        {
            return true;
        }
    }

    return false;
}

function delBlanks(strng)
{
    var result = "";
    var i;
    var chrn;

    for (i = 0;i < strng.length; ++i) 
    {
        chrn = strng.charAt(i);
        
        if (chrn != " ")
        {
            result += chrn;
        }
    }

    return result;
}

function getCookieValue(ckie,nme)
{
    var splitValues;
    var i;

    for(i = 0;i < ckie.length; ++i) 
    {
        splitValues = ckie[i].split("=");
        
        if(splitValues[0] == nme) 
        {
            return splitValues[1];
        }
    }

    return "";
}
   
function insertCounter() 
{
    readCookie();
}

function displayCounter() 
{
    var counterElement = document.getElementById("visitCounter");
    counterElement.innerHTML += " " + counter;
}

function readCookie() 
{
    var cookie = document.cookie;
    
    counter = 0;
    
    var chkdCookie = delBlanks(cookie);  
    var nvpair = chkdCookie.split(";");
    
    if(nameDefined(nvpair,"pageCount"))
    {
        counter = parseInt(getCookieValue(nvpair,"pageCount"));
    }
    ++counter;
    
    var futdate = new Date();
    var expdate = futdate.getTime();
    
    expdate += 3600000 * 24 *30;  
    futdate.setTime(expdate);

    var newCookie = "pageCount=" + counter;
    
    newCookie += "; expires=" + futdate.toGMTString();
    
    window.document.cookie = newCookie;
}