function initialize() {
    var mapCanvas = document.getElementById('map');
    var mapOptions = {
      center: new google.maps.LatLng(48.4192281,17.7853932),
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(mapCanvas, mapOptions);
    var myLatLang = {lat: 48.4210651, lng: 17.7875068};
    var marker = new google.maps.Marker({
    position: myLatLang,
    map: map,
    title: 'Hello World!'
  });

  }
google.maps.event.addDomListener(window, 'load', initialize);

