var slovakCity = [];
var skIncrement = 0;
var map;
var randomIndexes = [];
var arrayIndex = 0;
var wantedCity;
var marker = new google.maps.Marker({
                position: {lat: 0, lng: 0},
                map: map,
                title: ''
                });
var score = 0;
var SCORES_COOKIE_NAME = "playerScore";

// Citanie XML suboru, a naplnenie do pola
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
    myFunction(xhttp);
    }
};
xhttp.open("GET", "xml/mestaSlovensko.xml", true);
xhttp.send();

function myFunction(xml) {
    var xmlDoc = xml.responseXML;

    var dlzkaXML = xmlDoc.getElementsByTagName("city").length;

    for (i=0; i<dlzkaXML; i++){
        if ((xmlDoc.getElementsByTagName("type")[i].childNodes[0].nodeValue).localeCompare("sk") == 0){
            slovakCity[skIncrement] = {
                city: xmlDoc.getElementsByTagName("name")[i].childNodes[0].nodeValue,
                latitude: xmlDoc.getElementsByTagName("latitude")[i].childNodes[0].nodeValue, 
                longitude: xmlDoc.getElementsByTagName("longitude")[i].childNodes[0].nodeValue
            };
            skIncrement++;
        }        
    }

    for(i=0; i<skIncrement; i++)
        randomIndexes[i] = i;

    shuffle(randomIndexes);
}

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
    
    map = new google.maps.Map(mapCanvas, mapOptions); 

    map.mapTypes.set(customMapTypeId, customMapType);
    map.setMapTypeId(customMapTypeId);
}

google.maps.event.addDomListener(window, 'load', initialize);

function clickPoints(){
    marker.setMap(null);    
    var index = randomIndexes[arrayIndex];
    var pocetKliknuti = 0;

    var spodnaHranica = Number(slovakCity[index].latitude) - 0.14;
    var hornaHranica = Number(slovakCity[index].latitude) + 0.14;
    var pravaHranica = Number(slovakCity[index].longitude) + 0.14;
    var lavaHranica = Number(slovakCity[index].longitude) - 0.14;
    document.getElementById('p').innerHTML = "Vyznačte miesto na mape, kde sa nachádza <b>" + slovakCity[index].city + "</b>";

   google.maps.event.addListener(map, "click", function(event) {
        if (pocetKliknuti == 0){
            var lat = event.latLng.lat();
            var lng = event.latLng.lng();
            //alert("Klik");
            if ((lat < hornaHranica) && (lat > spodnaHranica)){
                if ((lng > lavaHranica) && (lng < pravaHranica)){ 
                    score = score + 2;
                    document.getElementById('p').innerHTML = "Správna odpoveď, získavate <b>2</b> body.";
                }
                else {
                    document.getElementById('p').innerHTML = "Nesprávna odpoveď, strácate <b>1</b> bod.";
                    score = score - 1;
                }
            }
            else {
                document.getElementById('p').innerHTML = "Nesprávna odpoveď, strácate <b>1</b> bod.";
                score = score - 1;
            }
            //document.getElementById("buttonStart").disabled = false;
            document.getElementById("buttonStart").style.display = "block";
            pocetKliknuti = 1;
            marker = new google.maps.Marker({
                position: {lat: Number(slovakCity[index].latitude), lng: Number(slovakCity[index].longitude)},
                map: map,
                title: slovakCity[index].city
            });
        }
    }); 
}

function setMarker(){
        marker.setMap(null);
        document.getElementById('p').innerHTML = "Na aké mesto ukazuje bod na mape?";
        var index = randomIndexes[arrayIndex];

        marker = new google.maps.Marker({
            position: {lat: Number(slovakCity[index].latitude), lng: Number(slovakCity[index].longitude)},
            map: map,
            title: '?'
        });

        wantedCity = slovakCity[index].city;
        document.getElementById('input').value = "";
        document.getElementById('input').style.visibility = "visible";
        document.getElementById('buttonOk').style.visibility = "visible";
        document.getElementById('ansLabel').style.visibility = "visible";
        //arrayIndex++;
}

function findCity(){
    var vstupcity = toUTF8(document.getElementById('input').value);
    var tmpCity = toUTF8(wantedCity);

    if (vstupcity.toLowerCase().localeCompare(tmpCity) == 0){
        score = score + 2;
        document.getElementById('p').innerHTML = "Správna odpoveď, získavate <b>2</b> body.";
    }
    else {
        document.getElementById('p').innerHTML = "Nesprávna odpoveď, strácate <b>1</b> bod.<br><br>Správna odpoveď je <b>"+wantedCity+"</b>";
        score = score - 1;
    }

    document.getElementById('input').style.visibility = "hidden";
    document.getElementById('buttonOk').style.visibility = "hidden";
    document.getElementById('ansLabel').style.visibility = "hidden";
    marker.setMap(null);
    //document.getElementById("buttonStart").disabled = false;
    document.getElementById("buttonStart").style.display = "block";
}

function main(){
    var rand = 0;
    document.getElementById("buttonStart").innerHTML = "Pokračovať na ďalšiu otázku.";
    document.getElementById("buttonStart").style.display = "none";
    if (arrayIndex < 10){
        rand = getRandomInt(0,1);
        //document.getElementById('p').innerHTML = rand;
        if (rand == 0){
            clickPoints();
        }
        else setMarker();
        arrayIndex++;
    }
    else {
        document.getElementById('p').innerHTML = "Koniec hry, vaše skóre je: <b>" + score + "</b> bodov.";
        saveScoreToCookie();
        document.getElementById("buttonStart").style.display = "none";
        document.getElementById("buttonStart").disabled = false;
        document.getElementById("buttonRestart").style.display = "block";
        printScoresGraph();
        document.getElementById("myDiv").style.display = "block";
    }

}

function restart(){
    location.reload(true);
}


// Funckia na zmixovanie pola miest
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Funkcia na nahodne cisla v danom intervale
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function toUTF8(text){
    var result = text.toLowerCase();
    result = result.replace("ľ","l");
    result = result.replace("š","s");
    result = result.replace("č","c");
    result = result.replace("ť","t");
    result = result.replace("ž","z");
    result = result.replace("ý","y");
    result = result.replace("á","a");
    result = result.replace("í","i");
    result = result.replace("é","e");
    result = result.replace("ô","o");
    result = result.replace("ü","u");
    result = result.replace("ď","d");
    result = result.replace("ĺ","l");
    result = result.replace("ň","n");
    result = result.replace("ó","o");
    result = result.replace("ř","r");
    result = result.replace("ú","u");

    return result;
}
 
function saveScoreToCookie()
{
        var scores = getAllScores();
 
        //set a new cookie with the same name as the previous cookie
        //which means that it overwrites the previous cookie
        //the value will be the previous values + the new value
        document.cookie = SCORES_COOKIE_NAME + "=" + scores + score + ",;";
}
 
function scoresToInt(scores)
{
        var intScores = [];
 
        scores = scores.split(",");
 
        for (var i = 0; i < scores.length - 1; i++)
        {
                intScores[i] = parseInt(scores[i]);
        }
 
        return intScores;
}
 
function getAllScores()
{
        var scoresCookie = getCookie(SCORES_COOKIE_NAME);
 
        //split the cookie
        //scoresCookie[0] is cookie name
        //scoresCookie[1] is the current value
        var scores = scoresCookie.split("=")[1];
 
        return scores;
}
 
function getCookie(name)
{
        //get all current cookies
        var allCookies = document.cookie;
        //split the cookies into an array with ; as the delimiter
        var allCookiesArray = allCookies.split(";");
 
        var searchedCookie;
        //iterate through the cookies array
        for (var i = 0; i < allCookiesArray.length; i++)
        {      
                //if the currently iterated cookies name is sudokuScores
                if (allCookiesArray[i].indexOf(name) > -1)
                {
                        //set currentCookies to only the sudokuScores cookie
                        searchedCookie = allCookiesArray[i];
                        break;
                }
        }
        if (searchedCookie == undefined) {
            searchedCookie = name +"=";
        }
        return searchedCookie;
}
 
function printScoresGraph(){
        var scores = getAllScores();
       
        scores = scoresToInt(scores);
 
        var trace = {
                x: scores.length,
                y: scores,
                mode: 'lines+markers',
                type: 'scatter'
        };
 
        var data = [trace];
 
        Plotly.newPlot('plotPlace', data);
}