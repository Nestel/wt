var datum;
var meno;
var xmlDoc;
var mesiace = ["Januára","Februára","Marca","Apríľa","Mája","Júna","Júla","Augusta","Septembra","Októbra","Novembra","Decembra"];


/****************************************/
/*    DOM2                              */
/*zakomentovane funckie su na riadkoch  */
/*  18, 76-87,  166-175, 187-195   */


/*****************************************/

window.onload = g;

function g() {
	date_time_meniny();
	//pridajListener(); //toto je na ten debilny DOM2 treba odkomentovat
}

function date_time_meniny() {
	
    var date = new Date();
    var den = date.getDate();
    var mesiac = date.getMonth()+1;

    function getXmlDate(){
        if(mesiac < 10)
            return ('0' + mesiac + "" + den + "");
        else return (mesiac + "" + den + "");
    }
	
	var d = getXmlDate();
	
	document.getElementById('dnesnyDatum').innerHTML += " " + prekonvertujDatum(d);
	
	//nacitavam XML kvoli asynchronnosti to robim tu
	if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET", "xml/meniny.xml", false);
    xmlhttp.send();
    xmlDoc = xmlhttp.responseXML;
	
	
	var temp = xmlDoc.getElementsByTagName("zaznam");
	
		
	for(var i=0;i<temp.length;i++) {

		var najdenyDen = temp[i].getElementsByTagName("den")[0].childNodes[0].nodeValue;
		
		if(najdenyDen.localeCompare(d)==0) {
			try {	
				document.getElementById("dnesneMeniny").innerHTML =  "Dnes má meniny: ";		
				document.getElementById("dnesneMeniny").innerHTML += temp[i].getElementsByTagName("SK")[0].childNodes[0].nodeValue;
				break;
			}
			catch(err) {
				document.getElementById("dnesneMeniny").innerHTML = "Dnes je sviatok: ";
				document.getElementById("dnesneMeniny").innerHTML += temp[i].getElementsByTagName("SKsviatky")[0].childNodes[0].nodeValue;				
				break;
			}
			
		}
	}

} 


//DOM2
//toto je na ten debilny DOM2, treba odkomentovat a trocha upravit
/*
function pridajListener() {
	
	document.addEventListener("DOMContentLoaded", function (e) {
		alert("ffffffffffffffffffff");
        var button = document.getElementById('dateButton');
        button.addEventListener("click", validujDatum);
		zobrazMeno();
	});
}
*/

/**************************************************/
/*funkcie pre vyhladanie datumu, ak zadame meno*/
/*************************************************/

//tuto funkciu volam pri stlaceni button-u
function zobrazDatum() {
	nacitajMeno();
	vypisDatum();
}

//nacitam uzivatelsky vstup
function nacitajMeno() {
	meno = document.getElementById("meno").value;
}

//prehlada XML, najde datum prisluchajuci danemu menu a vypise ho
function vypisDatum() {
	
	if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET", "xml/meniny.xml", false);
    xmlhttp.send();
    xmlDoc = xmlhttp.responseXML;
	
	var flag = false;
	var output;
	var temp = xmlDoc.getElementsByTagName("zaznam");
	
	var i;	//i musi byt deklarovane mimo for cyklu!!! aby po vyjdeni z cyklu sme si pamatali najdenu polohu v poli
	for(i=0;i<temp.length;i++) {

		try { //ak k danemu dnu existuje meno v XML deklarovane tagom <SK></SK>
			var najdeneMeno = temp[i].getElementsByTagName("SK")[0].childNodes[0].nodeValue;
			//console.log(meno.localeCompare(najdeneMeno));
			output = najdiMenoVStringu(najdeneMeno);//v output je ulozene meno s diakritikou - vyhlada sa v zozname, bez ohladu na to ako ho zadal pouzivatel
			if(output.localeCompare("")!=0) {//tokenizacia mena
				flag = true;//flag sa nastavi na true ak sa nasla zhoda
				break;			
			}
		}
		catch(err) {//v pripade, ze je nejaky sviatok a k danemu dnu neexistuje meno - v XML deklarovane tagom <SK></SK> musim ignorovat inak hodi chybu
			continue;
		}
	}
	
	if(flag) {
		document.getElementById("datumPreMeno").innerHTML = output + " má meniny: ";
		var x = temp[i].getElementsByTagName("den")[0].childNodes[0].nodeValue;		
		document.getElementById("datumPreMeno").innerHTML += prekonvertujDatum(x);
		
	}
	else {
		document.getElementById("datumPreMeno").innerHTML = meno + " sa v kalendári nenachádza.";
	}
}


/**************************************************/
/*funkcie pre vyhladanie mena, ak zadame datum*/
/*************************************************/

//DOM1
//tuto funkciu volam pri stlaceni button-u
function zobrazMeno() {	

	nacitajDatum();
	if(validujDatum()) {
		vypisMeno(datum);
	}
	
}

/*
//debilny DOM2
//funkciu co je nad touto (riadky 156 - 163) treba zakomentovat
function zobrazMeno() {	

	nacitajDatum();
	//if(validujDatum()) {
		vypisMeno(datum);
	//}
	
}
*/


//nacitam uzivatelsky vstup
function nacitajDatum() {	
	datum = document.getElementById("datum").value;
}

//DOM2 toto treba odkomentovat a funkciu na riadkoch (197 - 207) treba zakomentovat
//validacia datumu 
/*
function validujDatum(e) {
	
	var x = e.currentTarget;
	var regEx=/((^((0?[1-9])|([12][0-9])|([3][01]))[\.]((0?[13578])|(1[02]))[\.]?$)|(^((0?[1-9])|([12][0-9])|(30))[\.]((0?[469])|(11))[\.]?$)|(^((0?[1-9])|([12][0-9]))[\.](0?2)[\.]?$))/;
	
	if(!regEx.test(x)) {//spravny datum
		alert("Datum musi byt vo formate:dd.mm alebo d.m");
	}
}
*/

//validacia datumu 
function validujDatum() {
	
	var regEx=/((^((0?[1-9])|([12][0-9])|([3][01]))[\.]((0?[13578])|(1[02]))[\.]?$)|(^((0?[1-9])|([12][0-9])|(30))[\.]((0?[469])|(11))[\.]?$)|(^((0?[1-9])|([12][0-9]))[\.](0?2)[\.]?$))/;
	
	if(!regEx.test(datum)) {//spravny datum
		alert("Datum musi byt vo formate: dd.mm alebo d.m");
		return false;
	}
	return true;
}

//prehlada XML, najde meno prisluchajuce datumu a vypise ho
function vypisMeno(date) {
	
	if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET", "xml/meniny.xml", false);
    xmlhttp.send();
    xmlDoc = xmlhttp.responseXML;
	
	
	var temp = xmlDoc.getElementsByTagName("zaznam");
	
	var x = konvertDatumMMDD(date); // v x bude zadany datum v tvare mmdd
	
	for(var i=0;i<temp.length;i++) {

		var najdenyDen = temp[i].getElementsByTagName("den")[0].childNodes[0].nodeValue;
		
		if(najdenyDen.localeCompare(x)==0) {
			try {	
				document.getElementById("menoPreDatum").innerHTML =  prekonvertujDatum(x)+" má meniny: ";		
				document.getElementById("menoPreDatum").innerHTML += temp[i].getElementsByTagName("SK")[0].childNodes[0].nodeValue;
				break;
			}
			catch(err) {
				document.getElementById("menoPreDatum").innerHTML = prekonvertujDatum(x)+" je sviatok: ";
				document.getElementById("menoPreDatum").innerHTML += temp[i].getElementsByTagName("SKsviatky")[0].childNodes[0].nodeValue;				
				break;
			}
			
		}
	}
}

//konvertuje datum zo vstupneho formatu do formatu ddmm
function konvertDatumMMDD(date) {
	var ret;
	var m,d,tmp;
	
	d = date.split(".")[0];
	m = date.split(".")[1];
	
	//upravime den
	if(d.length == 1) {
		tmp = d;
		d = "0"+tmp;
	}
	
	//upravime mesiac
	if(m.length == 1) {
		tmp = m;
		m = "0"+tmp;
	}
		
	ret = m+d;
	return ret;
}

/**************************************************/
/*pomocne funkcie*/
/*************************************************/

/*
v xml su mena deklarovane ako string, napr. "Peter, Pavol, Petra"
pri prehladavani mien potrebujeme zo stringu dostat konkretne meno
toto robi funkcia najdiMenoVStringu

najprv string tokenizujeme, potom zistime ci je na konci ",", ak ano tak ju odstranime
potom kontrolujeme zhodu so zadanym menom
*/
function najdiMenoVStringu(str) {
	
	var pole = [];
	pole = str.split(" ");//tokenizujem podla " "
	var tmp;
	
	//prehladavam pole mien
	for(var i=0;i<pole.length;i++) {
		//zistim ci je na konci mena ciarka, ak ano tak ju odstranim
		if(pole[i].slice(-1).localeCompare(",") == 0) {
			tmp = pole[i].slice(0,-1);
		}
		else {
			tmp = pole[i];
		}
		//ak najdem zhodu s hladanym menom, vraciam true
		if(odstranDiakritiku(meno).localeCompare(odstranDiakritiku(tmp)) == 0) {
			return tmp;
		}
		else {
			continue;
		}	
	}
	
	return "";
}

//odstran diakritiku
function odstranDiakritiku(word) {
	
	var sdiakritik="áäčďéěíĺľňóôőöŕšťúůűüýřžÁÄČĎÉĚÍĹĽŇÓÔŐÖŔŠŤÚŮŰÜÝŘŽ";
	var bezdiakritik="aacdeeillnoooorstuuuuyrzAACDEEILLNOOOORSTUUUUYRZ";
	var ret = "";
		
	for(var i = 0; i < word.length; i++){
		
		if ( sdiakritik.indexOf(word.charAt(i)) != -1) {
			ret += bezdiakritik.charAt( sdiakritik.indexOf( word.charAt( i ) ) );
		}
		else {
			ret += word.charAt( i );
		}
	}
	
	
	return ret.toLowerCase();
}

//v XML je datum zadany v tvare mmdd. prekonvertujem to do formatu dd mesiac
function prekonvertujDatum(date) {
	var m,d,y;
	d = date.slice(2); //den vo formate dd
	m = date.slice(0,2); //mesiac vo formate mm
	
	//odstranime nulu z vypisu dna, to znamena ak je den 03, tak vypiseme len 3
	if(d.slice(0,1).localeCompare(0)==0) {
		d = d.slice(1);
	}
	
	//odstranime nulu z vypisu mesiaca, to znamena ak je februar = 02, tak potrebujeme mat len cislo 2, podla toho najdeme v poli mesiacov nazov prislusneho mesiaca
	if(m.slice(0,1).localeCompare(0)==0) {
		m = mesiace[m.slice(1)-1];
	}
	else {
		m = mesiace[m-1];
	}
	
	return d +". "+ m;
}

