// Citanie XML suboru, a naplnenie do pola
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
    myFunction(xhttp);
    }
};
xhttp.open("GET", "mesta.xml", true);
xhttp.send();

function myFunction(xml) {
    var xmlDoc = xml.responseXML;

    var dlzkaXML = xmlDoc.getElementsByTagName("city").length;
    var type = [];
    var mesto = [];
    var latitude = [];
    var longitude = [];

    for (i=0; i<dlzkaXML; i++){
        type[i] = xmlDoc.getElementsByTagName("type")[i].childNodes[0].nodeValue;
        mesto[i] = xmlDoc.getElementsByTagName("name")[i].childNodes[0].nodeValue;
        latitude[i] = xmlDoc.getElementsByTagName("latitude")[i].childNodes[0].nodeValue;
        longitude[i] = xmlDoc.getElementsByTagName("longitude")[i].childNodes[0].nodeValue;
        //document.getElementById('p').innerHTML += type[i] + " " + mesto[i] + " " + latitude[i] + " " + longitude[i] + " " ;
    }
}
//-------------------------------------------------------------------------------------
function initialize() {

    var mapCanvas = document.getElementById('map');
    var customMapType = new google.maps.StyledMapType([
        {
            featureType: "all",
            elementType: "labels",
            stylers: [
                { visibility: "off" }
            ]
        },
        {
            name: 'Custom style'
        } 
    ]);
    var customMapTypeId = 'custom_style';
    
    var mapOptions = {
        center: new google.maps.LatLng(48.7864934,19.6130343,12),
        zoom: 8,
        mapTypeIds: [google.maps.MapTypeId.TERRAIN, customMapTypeId],
        mapTypeControl: false,
        draggable: false,
        scaleControl: false,
        scrollwheel: false,
        navigationControl: false,
        streetViewControl: false,
        disableDefaultUI: true,
        disableDoubleClickZoom: true,
    }
    
    var map = new google.maps.Map(mapCanvas, mapOptions); 

    map.mapTypes.set(customMapTypeId, customMapType);
    map.setMapTypeId(customMapTypeId);
    
    google.maps.event.addListener(map, "click", function(event) {
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
    // populate yor box/field with lat, lng
    //alert("Lat=" + lat + "; Lng=" + lng);
    document.getElementById('p').innerHTML = type[1] + " " + mesto[1] + " " + latitude[1] + " " + longitude[1] + " " ;
    if ((lat < 48.5014851) && (lat > 48.3614851))
        alert("Lat=" + lat);
    });
}

google.maps.event.addDomListener(window, 'load', initialize);