function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var divko = document.getElementById("cookie");
    var user=getCookie("username");
    if (user != "") {
        user++;
        divko.innerHTML = "Počet osobných prístupov: " + user;
        setCookie("username", user, 30);
    } else {
        user = 1;
        divko.innerHTML = "Počet osobných prístupov: " + user;
        if (user != "" && user != null) {
            setCookie("username", user, 30);
        }
    }
}


function vypisCookie() {
    var result = getCookie("username");
    document.getElementById("cookie").innerHTML = "Počet osobných prístupov: " + result;
}