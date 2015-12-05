var startLatitude = 47.5708603;
var startLongitude = 16.617720;

var endLatitude = 49.6325653;
var endLongitude = 22.6185874;

var differenceLatitude = endLatitude - startLatitude;
var differenceLongitude = endLongitude - startLongitude;

var imageMap;

var svkWidth;
var svkHeight;

var googleMapCanvasJQ;

function mapsInitialize() {
	imageMap = $("#image-map-image");
	googleMapCanvasJQ = $("#google-map");

	svkWidth = imageMap.width() / differenceLongitude;
	svkHeight = imageMap.height() / differenceLatitude;

	//vymaze vsetky predosle markre
	imageMap.parent().children("div").remove();
    //nastavi velkost google mapy na velkost obrazkovej mapy
    googleMapCanvasJQ.height(imageMap.height());

   loadJSON(function(response) {
  
        var obj = JSON.parse(response);
        var x = [];
        var y = [];
        var name = [];
        var dlzkaJSON = obj.suradnice.length;
        var myLatLang = [];
        var marker = [];

        createGraph(obj);

        for (i=0; i<dlzkaJSON; i++){
          name[i] = obj.suradnice[i].pamiatka;
          x[i] = obj.suradnice[i].lat;
          y[i] = obj.suradnice[i].lng;
        }

        var googleMapCanvas = document.getElementById('google-map');
        
        var mapOptions = {
          center: new google.maps.LatLng(48.7065876, 19.7100501,8),
          zoom: 7,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        
        var googleMap = new google.maps.Map(googleMapCanvas, mapOptions);

        for (i=0; i<dlzkaJSON; i++){

          myLatLang[i] = {lat: Number(x[i]), lng: Number(y[i])};//{lat: 48.4195699, lng: 17.7873566};
        
          marker[i] = new google.maps.Marker({
            position: myLatLang[i],
            map: googleMap,
            title: name[i]
          });

          createMarker(i, name[i],Number(x[i]), Number(y[i]));
        }
    setMarkersClick();
  });


}


google.maps.event.addDomListener(window, 'load', mapsInitialize);

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
    
    var mainDiv = document.getElementById("image-map-div");
    
    var div = document.createElement("div");
    div.id = "div"+index;
    div.setAttribute("class","marker-wrapper");
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
    divInfo.style.backgroundColor="rgba(0, 0, 0, 0.5)";
    divInfo.style.left = (poziciaLongitude + 30) + "px"; 
    divInfo.style.bottom = (poziciaLatitude + 20) + "px";
    divInfo.style.textAlign="center";
    divInfo.style.borderRadius = "5px";

    var element = document.createElement("img");
    element.id = "img"+index;
    element.src = 'img/point.svg';
    element.setAttribute("height", "25");
    element.setAttribute("width", "30");
    element.setAttribute("alt", "Pointer");
    div.appendChild(element);

    var paragraph = document.createElement("p");
    paragraph.innerHTML = place;
    paragraph.style.color="white";
    paragraph.style.left="5px";
    paragraph.style.bottom="-10px";
    paragraph.style.position="absolute";
    paragraph.style.textAlign="center";
    paragraph.style.width = "100%";
    paragraph.style.paddingBottom="5px";
    divInfo.appendChild(paragraph);

    mainDiv.appendChild(div);
    mainDiv.appendChild(divInfo);

    var head = document.getElementsByTagName('head')[0];

    var css1 = '#'+divInfo.id+'{ display: none; }';
    style = document.createElement('style');
    style.type = 'text/css';

    if (style.styleSheet) {
        style.styleSheet.cssText = css1;
    } else {
        style.appendChild(document.createTextNode(css1));
    }
    style.appendChild(document.createTextNode(css1));

    head.appendChild(style);

    var css = '#'+div.id+':hover + #'+divInfo.id+'{ display: block; }';
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

var graphHeight = 100;
var graphWidth;
var graphPadding = 30;
var circleRadius = 10;
var pamiatkyArray = [];

function getMinYear(years)
{
    var min = 5000;
    
    for (var i = 0; i < years.length; i++)
    {
        if (years[i] < min)
        {
            min = years[i];
        }
    }

    return min;
}

function getMaxYear(years)
{
    var max = 0;
    
    for (var i = 0; i < years.length; i++)
    {
        if (years[i] > max)
        {
            max = years[i];
        }
    }

    return max;
}

function createGraph(jsonObj)
{
    var years = [];

    for (var i = 0; i < jsonObj.suradnice.length; i++)
    {
        years.push(parseInt(jsonObj.suradnice[i].vznik));
        pamiatkyArray.push(jsonObj.suradnice[i]);
    }
    $("#graph").html("");
    svg = d3.select("#graph")
                .append("svg")
                .attr("id", "graph-canvas")
                .attr("width", "100%")
                .attr("height", graphHeight);
 
    graphWidth = $("#graph-canvas").width();

    xScale = d3.scale.linear()
               .domain([getMinYear(years), getMaxYear(years)])
               .range([
                    2*circleRadius + graphPadding, 
                    graphWidth - 2*circleRadius - graphPadding
               ]);

    yScale = d3.scale.linear()
                         .domain([1, 1])
                         .range([
                            2*circleRadius + graphPadding, 
                            graphHeight - 2*circleRadius - graphPadding
                         ]);

    xAxis = d3.svg.axis()
              .scale(xScale)
              .ticks(6);

    var div = d3.select("#graph").append("div")   
                .attr("class", "tooltip")               
                .style("opacity", 0);

    yAxis = d3.svg.axis()
                  .scale(yScale)                  
                  .orient("left");
    
    circles = svg.selectAll("circle")
                     .data(pamiatkyArray)
                     .enter()
                     .append("circle")
                     .attr("class", "circle")
                     .on("mouseover", function(d) {      
                        div.transition()        
                            .duration(200)      
                            .style("opacity", 1)
                            .style("z-index", 3);      
                        div.html(d.pamiatka + " - " + d.vznik) 
                            .style("left", (d3.event.pageX - 80) + "px")     
                            .style("top", "80%");    
                        })             
                     .on("mouseout", function(d) {       
                        div.transition()        
                            .duration(500)      
                            .style("opacity", 0)
                            .style('z-index', 0);
                     });

    setCirclesClick();

    circles.attr("cx", function(d, i) {
        return xScale(d.vznik);
    })
    .attr("cy", function(d) {       
        return "50%";
    })
    .attr("r", circleRadius);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (graphHeight - graphPadding) + ")")
        .call(xAxis);
}   

function revertAllMarkers()
{
    $(".pamiatka-clicked").removeClass("pamiatka-clicked");
    
    var circles = document.getElementsByTagName("circle");

    for (var i = 0; i < circles.length; i++)
    {
        circles[i].setAttribute("class", "");
    }
}

function setCirclesClick()
{
    circles.each(function(d){
        $(this).attr("id", "circle" + getPamiatkaIndex(d.pamiatka));

        $(this).click(function(){
            var pamiatkaIndex = getPamiatkaIndex(d.pamiatka);
            revertAllMarkers();
            $("#img"+pamiatkaIndex).addClass("pamiatka-clicked");
            this.setAttribute("class", "circle" + " pamiatka-clicked");
        });
    });
}

function setMarkersClick()
{
    var markers = $(".marker-wrapper");

    markers.each(function(){
        $(this).click(function(){            
            var pamiatkaIndex = this.id.match(/\d{1,4}/)[0];
            revertAllMarkers();
            $("#img"+pamiatkaIndex).addClass("pamiatka-clicked");
            document.getElementById("circle"+pamiatkaIndex).setAttribute("class", "circle pamiatka-clicked");
        });
    });
}

function getPamiatkaIndex(name)
{
    for (var i = 0; i < pamiatkyArray.length; i++)
    {
        if (pamiatkyArray[i].pamiatka == name)
        {
            return i;
        }
    }

    return -1;
}