var SUDOKU_FIELD_SIZE = 9;

var sudokuGameField = [];
var sudokuSolution = [];
var sudokuTask = [];
var sudokuNotes = [];
var sudokuScore = 0;
var sudokuInputs = [];
var sudokuNotesElement;
var noteInput;
var notesForm;
var noteEditIndex;

var cachedNotes = [];

var sudokuXhttp;
var SUDOKU_REQUEST_METHOD = 'GET';
var SUDOKU_FILE_PATH = 'xml/sudoku.xml';
var sudokuXmlLoaded = false;

var sudokuForm;
var sudokuScoreElement;

function initField()
{
	for (var i = 0; i < SUDOKU_FIELD_SIZE*SUDOKU_FIELD_SIZE; i++)
	{
		sudokuGameField[i] = 0;
	}
}

function readXmlFile()
{	
	sudokuXhttp = new XMLHttpRequest();
	sudokuXhttp.onreadystatechange = function() {
	    if (sudokuXhttp.readyState == 4 && sudokuXhttp.status == 200) {
	        //sudokuXmlLoaded = true;
	        generateGame();
	    }
	};
	sudokuXhttp.open(SUDOKU_REQUEST_METHOD, SUDOKU_FILE_PATH, true);
	sudokuXhttp.send();
}

function generateGame()
{
	var gameIndex = Math.round(Math.random() * 11);

	var xmlGames = sudokuXhttp.responseXML.getElementsByTagName("game");
	var currentGame = xmlGames[gameIndex];
	var currentTask = currentGame.childNodes[1].childNodes[0].nodeValue;
	var currentSolution = currentGame.childNodes[3].childNodes[0].nodeValue;

	currentTask = currentTask.replace(/,/g, '');
	currentSolution = currentSolution.replace(/,/g, '');

	for (var i = 0; i < SUDOKU_FIELD_SIZE*SUDOKU_FIELD_SIZE; i++)
	{
		/***************in case of testing*******************
		sudokuTask[i] = currentSolution[i];
		if (i == 1)
		{
			sudokuTask[i] = ".";
		}
		****************************************************/
		sudokuTask[i] = currentTask[i];
		sudokuSolution[i] = currentSolution[i];
	}

	printField();

	sudokuInputs = $(".sudoku-input");

	notesForm.submit(function(){
		return false;
	});

	noteInput.focusin(function(){

	});

	noteInput.focusout(function(){
		var newNote = this.value;
		sudokuNotes[noteEditIndex] = newNote;
		sudokuNotesElement.text(newNote);
	});

	sudokuInputs.focusin(function(){	
		var elementsNotes = sudokuNotes[this.id];
		
		if (elementsNotes != undefined)
		{
			sudokuNotesElement.text(elementsNotes);
		}
		else
		{
			sudokuNotesElement.text("Žiadne poznámky");
		}
		noteInput.val(elementsNotes);
	});

	sudokuInputs.focusout(function(){
		noteEditIndex = this.id;
	});
}

var SCORES_COOKIE_NAME = "sudokuScores";

function saveScoreToCookie()
{
	var scores = getAllScores();

	//set a new cookie with the same name as the previous cookie
	//which means that it overwrites the previous cookie
	//the value will be the previous values + the new value
	document.cookie = SCORES_COOKIE_NAME + "=" + scores + sudokuScore + ",;";
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

function printField()
{
	for (var i = 0; i < SUDOKU_FIELD_SIZE*SUDOKU_FIELD_SIZE; i++)
	{

		if (i % 3 == 0 && i != 0)
		{
			sudokuForm.append(" ");
		}

		if (i % 9 == 0 && i != 0)
		{
			sudokuForm.append("<br>");
		}

		if (i % 27 == 0 && i != 0)
		{
			sudokuForm.append("<hr class='no-margin sudoku-hr'>");
		}

		if (sudokuTask[i] != '.')
		{
			sudokuForm.append("<input disabled class='sudoku-input' type='text' value=" + sudokuTask[i] + ">");
		}
		else
		{
			sudokuForm.append("<input id='" + i + "' onchange='validateSudokuTextField(this)'class='sudoku-input' type='text' value=''>");
		}
	}
}

function validateSudokuTextField(element)
{
	var elementId = element.id;
	var elementValue = element.value;

	if (sudokuSolution[elementId] != elementValue)
	{
		sudokuScore -= 1;
		element.value = '';
		element.disabled = false;
	}
	else
	{
		sudokuScore += 3;
		element.disabled = true;
		sudokuTask[elementId] = element.value;
	}

	sudokuScoreElement.html("SCORE: " + sudokuScore);

	if (checkSudokuFinished())
	{
		handleFinish();
	}
	
	return element.disabled;
}

function handleFinish()
{	
	alert("CONGRATULATIONS!!! YOUR FINAL SCORE: " + sudokuScore);
	saveScoreToCookie();
	printScoresGraph();
	$("#new-sudoku-game").show();
}

function checkSudokuFinished()
{
	for (var i = 0; i < SUDOKU_FIELD_SIZE*SUDOKU_FIELD_SIZE; i++)
	{
		if (sudokuTask[i] == '.')
		{
			return false;
		}
	}

	return true;
}

$(function(){
	sudokuForm = $("#sudoku-form");
	sudokuScoreElement = $("#sudoku-score");
	noteInput = $("#sudoku-notes-input");
	notesForm = $("#sudoku-notes-form");
	sudokuNotesElement = $("#sudoku-notes");

	readXmlFile();

	initField();

	$("#new-sudoku-game").click(function(){
		generateGame();
	});
});