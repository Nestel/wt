var startLatitude = 47.5708603;
var startLongitude = 16.617720;

var endLatitude = 49.6325653;
var endLongitude = 22.6185874;

var differenceLatitude = endLatitude - startLatitude;
var differenceLongitude = endLongitude - startLongitude;

var svkWidth = 1000 / differenceLongitude;
var svkHeight = 524 / differenceLatitude;

function initialize() {

   loadJSON(function(response) {
  
        var obj = JSON.parse(response);
        var x = [];
        var y = [];
        var name = [];
        var dlzkaJSON = obj.suradnice.length;
        var myLatLang = [];
        var marker = [];
        console.log(dlzkaJSON);

        for (i=0; i<dlzkaJSON; i++){
          name[i] = obj.suradnice[i].pamiatka;
          x[i] = obj.suradnice[i].lat;
          y[i] = obj.suradnice[i].lng;
        }

        var mapCanvas = document.getElementById('map');
        
        var mapOptions = {
          center: new google.maps.LatLng(48.7065876, 19.7100501,8),
          zoom: 7,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        
        var map = new google.maps.Map(mapCanvas, mapOptions);

        for (i=0; i<dlzkaJSON; i++){

          myLatLang[i] = {lat: Number(x[i]), lng: Number(y[i])};//{lat: 48.4195699, lng: 17.7873566};
        
          marker[i] = new google.maps.Marker({
            position: myLatLang[i],
            map: map,
            title: name[i]
          });

          createMarker(i, name[i],Number(x[i]), Number(y[i]));
        }
  });


}

google.maps.event.addDomListener(window, 'load', initialize);

function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'pamiatky.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

 function createMarker(index, place, latitude, longitude){

    var poziciaLongitude = ((svkWidth * (longitude - startLongitude)) - 15); 
    var poziciaLatitude = (svkHeight * (latitude - startLatitude));
    
    var mainDiv = document.getElementById("pictureDiv");
    console.log(index + " "+latitude+" "+longitude);
    
    var div = document.createElement("div");
    div.id = "div"+index;
    div.style.width="30px";
    div.style.height="25px";
    div.style.position="absolute";
    div.style.zIndex="200";
    div.style.left = poziciaLongitude+ "px"; 
    div.style.bottom = poziciaLatitude+ "px";
    div.style.display="block";

    var divInfo = document.createElement("div");
    divInfo.id = "divInfo"+index;
    divInfo.style.width="350px";
    divInfo.style.height="30px";
    divInfo.style.position="absolute";
    divInfo.style.zIndex="200";
    divInfo.style.backgroundColor="black";
    divInfo.style.left = (poziciaLongitude + 30) + "px"; 
    divInfo.style.bottom = (poziciaLatitude + 20) + "px";

    var element = document.createElement("img");
    element.id = "img"+index;
    element.src = 'pictures/point.svg';
    element.setAttribute("height", "25");
    element.setAttribute("width", "30");
    element.setAttribute("alt", "Poniter");
    div.appendChild(element);

    var paragraph = document.createElement("p");
    paragraph.innerHTML = place;
    paragraph.style.color="white";
    paragraph.style.left="5px";
    paragraph.style.bottom="-10px";
    paragraph.style.position="absolute";
    divInfo.appendChild(paragraph);

    mainDiv.appendChild(div);
    mainDiv.appendChild(divInfo);

    var head = document.getElementsByTagName('head')[0];

    var css1 = '#'+divInfo.id+'{ visibility: hidden; }';
    console.log(css1);
    style = document.createElement('style');
    style.type = 'text/css';

    if (style.styleSheet) {
        style.styleSheet.cssText = css1;
    } else {
        style.appendChild(document.createTextNode(css1));
    }
    style.appendChild(document.createTextNode(css1));

    head.appendChild(style);

    var css = '#'+div.id+':hover + #'+divInfo.id+'{ visibility: visible; }';
    console.log(css);
    style = document.createElement('style');
    style.type = 'text/css';

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    style.appendChild(document.createTextNode(css));

    head.appendChild(style);

 }