var xmlDoc;
var anagrams;
var countAnagrams = 0;
var prevScore;
var allScores = new Array();
var score = 0;
var tempAnagrams;
var celkovyPocetA = 0;
var graphX = new Array();
// var graphY = new Array();
var vysledok = null;
var countGames = 0;
var awesomeCount = new Array();
var SCORES_COOKIE_NAME = "anagramsScores";



Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

function init(){
    setAnagrams(getXML());
    shuffleArray(anagrams);
    printAnagram(countAnagrams);
    //allScores.push(prevScore);
    //console.log(allScores);
}

function getXML(){
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'xml/anagramy.xml', false);
    xhttp.setRequestHeader('Content-Type', 'text/xml');
    xhttp.send(null);
    xmlDoc = xhttp.responseXML;
    return xmlDoc.childNodes[2]; //2
}

function setAnagrams(xmlAnagrams){
    anagrams = new Array();
    //console.log(xmlAnagrams.children.length);
    celkovyPocetA = xmlAnagrams.children.length;
    for (var i = 0; i < xmlAnagrams.children.length; i++){
        var anagram = xmlAnagrams.children[i];
        
        var zadanie = anagram.getElementsByTagName('zadanie')[0].textContent.toLowerCase();
        var napoveda = anagram.getElementsByTagName('napoveda')[0].textContent;
        var riesenie = anagram.getElementsByTagName('riesenie')[0].textContent.toLowerCase();
        anagrams.push({zadanie: zadanie, napoveda: napoveda, riesenie: riesenie});
    }
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function createBox(zad){
    $("#sortable").empty();
    var ul = document.getElementById("sortable");

    for (var i = 0; i < zad.length; i++)
    {
        var li = document.createElement("li");  
        li.id = ("d" + i);
        li.className = "ui-state-default";
        li.innerHTML = zad[i];

        ul.appendChild(li);
    }
}

function printAnagram(p){
    if(anagrams[p] != null){
        var tmp = anagrams[p].zadanie;
        var zad = tmp.replace(/\s+/g, '');
        zad = zad.split("");
    

    //document.getElementById("btnGraf").style.visibility = 'hidden';
    document.getElementById("koniecAnagramov").style.visibility = 'hidden';
    document.getElementById("napoveda").style.visibility = 'hidden';
    document.getElementById("chyba").style.visibility = 'hidden';
    document.getElementById("btnNext").disabled = true;


    createBox(zad);

    for (var i = 0; i <= zad.length -1; i++) {
        // if (zad[i] != " ") {}{
        document.getElementById("d" + i).innerHTML = zad[i];
        document.getElementById("d" + i).style.visibility = 'visible';
        //console.log(document.getElementById("d"+i).innerHTML);
        //}
    }
}

    if (countAnagrams<celkovyPocetA){
        document.getElementById("showScore").innerHTML = "Tvoje skóre: "+score+" | Anagram "+(countAnagrams+1)+"/"+celkovyPocetA;
    }
    else{
        document.getElementById("showScore").innerHTML = "Tvoje skóre: "+score+" | Anagram "+(countAnagrams)+"/"+celkovyPocetA;
    }
    

//___________________________________________koniec anagramov___(daj skore do cookies)___________________

    if (p == (celkovyPocetA)){
        //document.getElementById("btnGraf").style.visibility = 'visible';
        document.getElementById("koniecAnagramov").style.visibility = 'visible';
        document.getElementById("btnNext").disabled = true;
        saveScoreToCookie();
        printGraph();
     }

    //graphX[countAnagrams] = countAnagrams +1;
    tempAnagrams = countAnagrams;
    countAnagrams++;
}

function printNapoveda(){
    document.getElementById("napoveda").style.visibility = 'visible';
    document.getElementById("napoveda").innerHTML = "Nápoveda: "+anagrams[tempAnagrams].napoveda;
    score = score-1;
}

function checkAnagram(){

    //document.getElementById("napoveda").style.visibility = 'hidden';
    document.getElementById("chyba").style.visibility = 'hidden';

    var poradie = new Array();
    var tmp = anagrams[tempAnagrams].riesenie;
    var ries = tmp.replace(/\s+/g, '');
    ries = ries.split("");
    var vysledok = false;
    var sortedIDs = $("#sortable").sortable("toArray");
    var id;

    for (var j = 0; j < ries.length; j++) {
        id = sortedIDs[j];
        poradie[j] = document.getElementById(id).innerHTML;
    }

    for (var i = 0; i <= ries.length -1; i++) {
        if (ries[i] != poradie[i]){
            vysledok = false;
            document.getElementById("chyba").innerHTML = "nespravne";
            document.getElementById("chyba").style.color = 'red';
            document.getElementById("chyba").style.visibility = 'visible';
            break;
        }
        else {
            document.getElementById("chyba").innerHTML = "spravne, pokracuj na dalsi";
            document.getElementById("chyba").style.color = 'green';
            document.getElementById("chyba").style.visibility = 'visible';
            vysledok = true;
        }
    }
    if(vysledok == true){
        score = score + 3;
    }
    else{
        score = score - 3;
    }
   // graphY[countAnagrams-1] = score;  
    document.getElementById("btnNext").disabled = false;

}


// _______________________________cookies_____________________________
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
        var scoresCookie = getGameCookie(SCORES_COOKIE_NAME);
 
        //split the cookie
        //scoresCookie[0] is cookie name
        //scoresCookie[1] is the current value
        var scores = scoresCookie.split("=")[1];
    
        return scores;
}
 
function getGameCookie(name)
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

    if (searchedCookie == undefined)
    {
        searchedCookie = name + "=";
    }
    
    return searchedCookie;
}

//_______________________________graph___________________________________

function printGraph(){
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

$(function() {
    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();

    $("#anagramy-opis").height($("#anagramy-hra").height());

    printGraph();
});