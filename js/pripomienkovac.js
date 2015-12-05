
$(document).ready(function(){


    function Poznamka(riesitel, text, dokoncena){
        this.riesitel = riesitel;
        this.text = text;
        this.dokoncena = dokoncena;
        this.isDisplayed = false;
    }

    function vypisPoznamku2(pozn, poradie){
        $("#ulNotes").append("<li class=\"list-group-item\">"+poradie+". "+pozn.text+"</li>");  
    };

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            myFunction(xhttp);
        }
    };

    xhttp.open("GET", "xml/notebook.xml", true);
    xhttp.send();
    var xmlDoc;

    var poleText = [];
    var poleRiesitel = [];
    var poleDokoncena = [];
    var polePoznamok = [];

    function writeToXml(noteArray)
    {
        var string = '<?xml version="1.0" encoding="UTF-8"?>';
        string += '<poznamkovac>';

        for (var i = 0; i < noteArray.length; i++)
        {
            string += "<poznamka>";
            string += "<text>" + noteArray.text + "</text>";
            string += "<riesitel>" + noteArray.riesitel + "</riesitel>";
            string += "<dokoncena>" + noteArray.dokoncena + "</dokoncena>";
            string += "</poznamka>";
        }


        string += '</poznamkovac>';
    } 

    function myFunction(xml){
        xmlDoc = xml.responseXML;

        poleText = xmlDoc.getElementsByTagName("text");
        poleRiesitel = xmlDoc.getElementsByTagName("riesitel");
        poleDokoncena = xmlDoc.getElementsByTagName("dokoncena");

   
        var poznamkaTmp = new Poznamka();

        for(var i = 0; i < poleText.length; i++){
            poznamkaTmp = new Poznamka();
            poznamkaTmp.riesitel = poleRiesitel[i].childNodes[0].nodeValue;
            poznamkaTmp.text = poleText[i].childNodes[0].nodeValue;
            poznamkaTmp.dokoncena = poleDokoncena[i].childNodes[0].nodeValue;

            polePoznamok.push(poznamkaTmp);
            /*console.log(polePoznamok[i].text);  */        
        }


        for(var i = 0; i < polePoznamok.length; i++){
            addRow(polePoznamok[i],i+1);
            polePoznamok[i].isDisplayed = true;
        }

        //console.log(polePoznamok);
/*
        for(var i = 0; i < polePoznamok.length; i++){
            console.log(polePoznamok[i].isDisplayed);
        }
*/
  
/******************************************************************************************************************************///nacitanie poznamok z xml


        $("#bVsetky").click(function(){
            vymazatTab();
            var cnt = 0;

            for(var i = 0; i < polePoznamok.length; i++){
                cnt++;
                addRow(polePoznamok[i],cnt);
                polePoznamok[i].isDisplayed = true;
            }
        });

        $("#bGabriel").click(function(){
            vymazatTab();
            var cnt = 0;

            for(var i = 0; i < polePoznamok.length; i++){
                if(polePoznamok[i].riesitel == "Gabriel"){
                    cnt++;
                    addRow(polePoznamok[i],cnt);
                }
                else{
                    polePoznamok[i].isDisplayed = false;
                }
            }  
            for(var i = 0; i < polePoznamok.length; i++){
           //console.log(polePoznamok[i].isDisplayed);
        }       
        });

        $("#bJan").click(function(){
            vymazatTab();
            var cnt = 0;

            for(var i = 0; i < polePoznamok.length; i++){
                if(polePoznamok[i].riesitel == "Ján"){
                    cnt++;
                    addRow(polePoznamok[i],cnt);
                }
                else{
                    polePoznamok[i].isDisplayed = false;
                }
                
            }
        });

        $("#bMatus").click(function(){
            vymazatTab();
            var cnt = 0;

            for(var i = 0; i < polePoznamok.length; i++){
                if(polePoznamok[i].riesitel == "Matúš"){
                    cnt++;
                    addRow(polePoznamok[i],cnt);
                }
                else{
                    polePoznamok[i].isDisplayed = false;
                }
                
            }

            for(var i = 0; i < polePoznamok.length; i++){
            //console.log(polePoznamok[i].isDisplayed);
        }
        });

        $("#bOndrej").click(function(){
            vymazatTab();
            var cnt = 0;

            for(var i = 0; i < polePoznamok.length; i++){
                if(polePoznamok[i].riesitel == "Ondrej"){
                    cnt++;
                    addRow(polePoznamok[i],cnt);
                }
                else{
                    polePoznamok[i].isDisplayed = false;
                }
                
            }
        });

        $("#bVierka").click(function(){
            vymazatTab();
            var cnt = 0;

            for(var i = 0; i < polePoznamok.length; i++){
                if(polePoznamok[i].riesitel == "Vierka"){
                    cnt++;
                    addRow(polePoznamok[i],cnt);
                }     
                else{
                    polePoznamok[i].isDisplayed = false;
                } 
            }
        }); 

/*********************************************************************************/

        $("#bDelete").click(function(){
            var table2 = document.getElementById("myTableData");
            var trs = table2.getElementsByTagName("tr");
            /*console.log(trs[0].cells[1].innerText);*/


            for (var i = 0, row; row = table2.rows[i]; i++){
                /*console.log(trs[i].cells[1].innerText.checked);*/
                //console.log(trs[1].cells[1].checked);
            }
        });
/**********************************************************************************/
        var checkboxes = $(".checkbox");
        checkboxes.each(function(){
            $(this).click(function(){
                if ($(this).prop('checked'))
                {
                    $(this).parent("td").parent("tr").remove();
                }
            });
        });
    }
});

function addRow(note, n) {
         
    var table = document.getElementById("myTableData");

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    
    /*row.insertCell(0).innerHTML= '<input type="button" value = "Delete" onClick="Javacsript:deleteRow(this)">';*/
    row.insertCell(0).innerHTML= n+". "+note.text;
    /*row.insertCell(1).innerHTML= myName.value;*/
    row.insertCell(1).innerHTML= '<input type="checkbox" class="checkbox">';
}

function deleteRow(obj) {
     
    var index = obj.parentNode.parentNode.rowIndex;
    var table = document.getElementById("myTableData");
    table.deleteRow(index);
}

var pole = [];

function trv(){
    var table = document.getElementById("myTableData");
    var trs = table.getElementsByTagName("tr");
    /*console.log(trs[1].cells[1].innerText.checked());*/
}

function vymazatTab(){
    $("#myTableData tr").remove(); 
}







    
