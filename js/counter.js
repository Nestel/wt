function setCookie(cookieName,cookieValue,expirationDays) 
{
    var d = new Date();
    d.setTime(d.getTime() + (expirationDays*24*60*60*1000));
    
    var expires = "expires=" + d.toGMTString();
    document.cookie = cookieName + "=" + cookieValue + "; " + expirationDays;
}

function getCookie(cookieName) 
{
    var name = cookieName + "=";
    var ca = document.cookie.split(';');
    
    for(var i=0; i<ca.length; i++) 
    {
        var c = ca[i];
        
        while (c.charAt(0) == ' ')
        {
            c = c.substring(1);
        }

        if (c.indexOf(name) == 0) 
        {
            return c.substring(name.length, c.length);
        }
    }
    
    return "";
}

function checkCookie() 
{
    var counterElement = document.getElementById("visitCounter");
    var cookie = getCookie("visitCounter");

    if (cookie != "") 
    {
        cookie++;
    } 
    else 
    {
        cookie = 1;
    }

    setCookie("visitCounter", cookie, 30);
    
    document.getElementById("visitCounter").innerHTML += cookie;
}


function vypisCookie() 
{
    var cookie = getCookie("visitCounter");
    
    if (cookie == "")
    {
        checkCookie();
        return;
    }

    document.getElementById("visitCounter").innerHTML += cookie;
}