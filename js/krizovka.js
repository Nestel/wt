
var tajnicka = ""; //pole kde mam ulozenu tajnicku
var napoveda; //[];
var krizovka;// = [];
var indexTajnicka; //= [];
var tabulka; //vypise tabulku
var classKrizovka = " contenteditable=\"true\" class=\"krizovka\" ";
var classTajnicka = " contenteditable=\"true\" class=\"tajnicka\" ";
var classPrazdnaBunka = " contenteditable=\"false\" class=\"prazdnaBunka\" ";
var body;
var SCORES_COOKIE_NAME = "tajnickaScores";

//window.onload = generujKrizovku();
$(function(){
	generujKrizovku();
});

function generujKrizovku() {
	bodyKrizovka = 10;
	document.getElementById('krizovka').innerHTML = "";
	document.getElementById('napoveda').innerHTML = "";
	document.getElementById('x').innerHTML = "";
	document.getElementById('body').innerHTML = "Počet možných kontrol riešení je: "+bodyKrizovka;
	printScoresGraph();
	g();
}

function g() {
	nacitajKrizovku();
	indexTajnicka = vytvorPoleSTajnickou();
	vygenerujKrizovku();
	vykresliKrizovku();
	vypisNapovedu();
	
}

function nacitajKrizovku() {
	
	var xmlDoc;
	var temp;
	//nacitavam XML
	if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
	
    xmlhttp.open("GET", "xml/krizovka.xml", false);
    xmlhttp.send();
    xmlDoc = xmlhttp.responseXML;
	
	temp = xmlDoc.getElementsByTagName("krizovka");
	
	var rand = Math.floor((Math.random() * temp.length));
	
	tajnicka = temp[rand].getElementsByTagName("tajnicka")[0].childNodes[0].nodeValue;
	
	var slova = temp[rand].getElementsByTagName("slovo");
	
	krizovka = new Array();
	napoveda = new Array();
	
	for(var i=0;i<slova.length;i++) {
		krizovka[i] = slova[i].getElementsByTagName("riesenie")[0].childNodes[0].nodeValue;
		napoveda[i] = slova[i].getElementsByTagName("napoveda")[0].childNodes[0].nodeValue;
	}
	
}

function vygenerujKrizovku() {
	
	var pocetRiadkov = krizovka.length;
	var pocetStlpcov = [pocetRiadkov];
	var pocetPrazdnychBuniek = indexTajnicka[najdiNajvacsiPrvok(indexTajnicka)];
	
	for(var i=0;i<pocetRiadkov;i++) {
		pocetStlpcov[i] = krizovka[i].length;
	}
	
	
	tabulka = "";

	tabulka += "<table id=\"ttt\">";
		
		//vygenerujem riadky
		for(var i=0;i<pocetRiadkov;i++) {
			
			tabulka += "<tr>";
				
			for(var k=0;k<(pocetPrazdnychBuniek-indexTajnicka[i]);k++) {
				tabulka += "<td ";
				tabulka	+= vratClass(classPrazdnaBunka);
				tabulka	+= ">"+ "</td>";
			}
			
			//cislo riadku
			tabulka += "<td ";
			tabulka	+= vratClass(classPrazdnaBunka);
			tabulka	+= ">"+ (i+1)+ "</td>";
			
			
			//vygenerujem stlpce v riadku
			for(var j=0;j<pocetStlpcov[i];j++) {
				tabulka += "<td ";
				
				if(j==indexTajnicka[i]) {
					tabulka	+= vratClass(classTajnicka);
				}
				else {
					tabulka	+= vratClass(classKrizovka);
				}
				
				tabulka	+= ">" + "</td>";
			}
				
			tabulka += "</tr>";
		}
		
	tabulka += "</table>";
}

function vykresliKrizovku() {
	document.getElementById('krizovka').innerHTML += tabulka;
}

function vratClass(q) {
	
	return q;
}

//v poli je ulozeny index pismena ktory prislucha tajnicke
function vytvorPoleSTajnickou() {
	pole = new Array();
	for(var i=0;i<tajnicka.length;i++) {
		pole[i] = krizovka[i].indexOf(tajnicka[i]);
	}
	
	return pole;
}

function najdiNajvacsiPrvok(pole) {
	
	var tmp=0;
	
	for(var i=1;i<pole.length;i++) {
		if(pole[i]>pole[tmp]) {
			tmp = i;
		}
	}
	
	return tmp;
}


function nacitajUdajeZTabulky() {
	document.getElementById('x').innerHTML = "";
	var refTab = document.getElementById("ttt");
	var pozicia = indexTajnicka[najdiNajvacsiPrvok(indexTajnicka)]+1;
	var vysledok ="";
	
	try {
		for ( var i = 0; row = refTab.rows[i]; i++ ) {
			row = refTab.rows[i];
			vysledok += row.cells[pozicia].firstChild.nodeValue;
			//for ( var j = 0; col = row.cells[j]; j++ ) {
			//document.getElementById('x').innerHTML += col.firstChild.nodeValue + " ";
			//}
		}
		return vysledok;
	}
	catch (e) {
		
	}
	 
}

function validujRiesenie(vys) {
	if(tajnicka.localeCompare(vys)==0) {
		return true;
	}
	else {
		return false;
	}
}

function kontrolujRiesenie() {
	if( validujRiesenie(nacitajUdajeZTabulky()) ) {
		document.getElementById('x').innerHTML += "<p class=\"spravne\">" + "Riešenie je SPRÁVNE!" + "<\p>";
		document.getElementById('body').innerHTML = "Získavate " +bodyKrizovka+ " body.";
		saveScoreToCookie();
	}
	else {
		bodyKrizovka--;
		document.getElementById('body').innerHTML = "Počet možných kontrol riešení je: "+bodyKrizovka;
		document.getElementById('x').innerHTML += "<p class=\"nespravne\">" + "Riešenie je NESPRÁVNE!" + "<\p>";
		if(bodyKrizovka == 0) {
			saveScoreToCookie();
		}
	}
}

function vypisNapovedu() {
	for(var i=0;i<napoveda.length;i++) {
		document.getElementById('napoveda').innerHTML += (i+1) +". "+ napoveda[i] +"<br>";
	}
}


 
function saveScoreToCookie() {
	var scores = getAllScores();

	//set a new cookie with the same name as the previous cookie
	//which means that it overwrites the previous cookie
	//the value will be the previous values + the new value
	document.cookie = SCORES_COOKIE_NAME + "=" + scores + bodyKrizovka + ",;";
}
 
function scoresToInt(scores) {
	
	var intScores = [];

	scores = scores.split(",");

	for (var i = 0; i < scores.length - 1; i++){
		intScores[i] = parseInt(scores[i]);
	}

	return intScores;
}

function getAllScores() {
	var scoresCookie = getCookie(SCORES_COOKIE_NAME);

	//split the cookie
	//scoresCookie[0] is cookie name
	//scoresCookie[1] is the current value
	var scores = scoresCookie.split("=")[1];
	return scores;
}

function getCookie(name) {
	//get all current cookies
	var allCookies = document.cookie;
	//split the cookies into an array with ; as the delimiter
	var allCookiesArray = allCookies.split(";");

	var searchedCookie;
	//iterate through the cookies array
	for(var i = 0; i < allCookiesArray.length; i++) {
	//if the currently iterated cookies name is sudokuScores
		if (allCookiesArray[i].indexOf(name) > -1) {
			//set currentCookies to only the sudokuScores cookie
			searchedCookie = allCookiesArray[i];
			break;
		}
	}
	
	if(searchedCookie == undefined){
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

	Plotly.newPlot('myDiv', data);
}