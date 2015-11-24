function initialize() {

   loadJSON(function(response) {
  
    var obj = JSON.parse(response);
    var x = [];
    var y = [];
    var name = [];
    var dlzkaJSON = obj.suradnice.length;
    var myLatLang = [];
    var marker = [];

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
    } 
    
///----------------------------
 /*   var myLatLang = {lat: Number(x[0]), lng: Number(y[0])};//{lat: 48.4195699, lng: 17.7873566};
    
    var marker = new google.maps.Marker({
      position: myLatLang,
      map: map,
      title: name[0]
    });
*/
//=---------------------------
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