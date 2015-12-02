var SCORES_COOKIE_NAME = "sudokuScores";

function saveScoreToCookie()
{
        var scores = getAllScores();

        //set a new cookie with the same name as the previous cookie
        //which means that it overwrites the previous cookie
        //the value will be the previous values + the new value
        //document.cookie = SCORES_COOKIE_NAME + "=" + scores + sudokuScore + ",;";
        document.cookie = SCORES_COOKIE_NAME + "=" + scores + totalScore + ",;";

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
        if (searchedCookie == undefined) {searchedCookie = name +"=";}

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