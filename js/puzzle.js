
$( document ).ready(function() {
    var baDragCnt = 0;
    var ttDragCnt = 0;
    var nrDragCnt = 0;
    var tnDragCnt = 0;
    var bbDragCnt = 0;
    var zaDragCnt = 0;
    var poDragCnt = 0;
    var keDragCnt = 0;

    printScoresGraph();

    $("#divMapa").height($("#divPuzzle").height());
    
    $('[data-toggle="popover"]').popover(); 

    /*$("#bZobrazitGraf").click(function(){
      printScoresGraph();
    });*/
    
    $("#bNovaHra").click(function(){
      location.reload();
    });
    

    /*var totalScore = 0;*/

/************************************************************************************************************/ 

    $("#imgBA").draggable({snap: "#divBA", revert: true, snapMode: "inner",
      start: function(event, ui){
        $(this).zIndex(2);
        baDragCnt++;
      },
      stop: function(event, ui){
        $(this).zIndex(2);
      }
    });

    $("#imgTT").draggable({snap: "#divTT", revert: true, snapMode: "inner",
      start: function(event, ui){
        $(this).zIndex(2);
        ttDragCnt++;
      },
      stop: function(event, ui){
        $(this).zIndex(1);
      }});

    $("#imgNR").draggable({snap: "#divNR", revert: true, snapMode: "inner",
      start: function(event, ui){
        $(this).zIndex(2);
        nrDragCnt++;
      },
      stop: function(event, ui){
        $(this).zIndex(1);
      }
    });
    
    $("#imgTN").draggable({snap: "#divTN", revert: true, snapMode: "inner",
      start: function(event, ui){
        $(this).zIndex(2);
        tnDragCnt++;
      },
      stop: function(event, ui){
        $(this).zIndex(1);
      }
    });

    $("#imgBB").draggable({snap: "#divBB", revert: true, snapMode: "inner",
      start: function(event, ui){
        $(this).zIndex(2);
        bbDragCnt++;
      },
      stop: function(event, ui){
        $(this).zIndex(1);
      }
    });

    $("#imgZA").draggable({snap: "#divZA", revert: true, snapMode: "inner",
      start: function(event, ui){
        $(this).zIndex(2);
        zaDragCnt++;
      },
      stop: function(event, ui){
        $(this).zIndex(1);
      }
    });

    $("#imgPO").draggable({snap: "#divPO", revert: true, snapMode: "inner",
      start: function(event, ui){
        $(this).zIndex(2);
        poDragCnt++;
      },
      stop: function(event, ui){
        $(this).zIndex(1);
      }
    });
    $("#imgKE").draggable({snap: "#divKE", revert: true, snapMode: "inner",
      start: function(event, ui){
        $(this).zIndex(2);
        keDragCnt++;
      },
      stop: function(event, ui){
        $(this).zIndex(1);
      }
    });

/************************************************************************************************************/    

    $("#divBA").droppable({
      accept: "#imgBA",
      tolerance: "fit",
      drop: function( event, ui ) {      
        $("#imgBA").draggable({revert: false});
        $("#imgBA").draggable("destroy");
        if(baDragCnt == 1){totalScore++;};
        if(baDragCnt == 2){totalScore = totalScore + 0.5};
        $("#pScore").text("Aktuálny počet bodov: "+totalScore);

        droppedRegions++;
        if(droppedRegions == 8){
            saveScoreToCookie();
            $("#youWon").fadeIn("fast");
            printScoresGraph();
        };

      }   
    });

    $("#divTT").droppable({
      accept: "#imgTT",
      tolerance: "fit",
      drop: function( event, ui ) {      
        $("#imgTT").draggable({revert: false});
        $("#imgTT").draggable("destroy");
        if(ttDragCnt == 1){totalScore++;};
        if(ttDragCnt == 2){totalScore = totalScore + 0.5};
        $("#pScore").text("Aktuálny počet bodov: "+totalScore);

        droppedRegions++;
        if(droppedRegions == 8){
            saveScoreToCookie();
            $("#youWon").fadeIn("fast");
            printScoresGraph();
        };
      }     
    });

    $("#divNR").droppable({
      accept: "#imgNR",
      tolerance: "fit",
      drop: function( event, ui ) {      
        $("#imgNR").draggable({revert: false});
        $("#imgNR").draggable("destroy");
        if(nrDragCnt == 1){totalScore++;};
        if(nrDragCnt == 2){totalScore = totalScore + 0.5};
        $("#pScore").text("Aktuálny počet bodov: "+totalScore);
        
        droppedRegions++;
        if(droppedRegions == 8){
            saveScoreToCookie();
            $("#youWon").fadeIn("fast");
            printScoresGraph();
        };
      }     
    });

    $("#divTN").droppable({
      accept: "#imgTN",
      tolerance: "fit",
      drop: function( event, ui ) {      
        $("#imgTN").draggable({revert: false});
        $("#imgTN").draggable("destroy");
        if(tnDragCnt == 1){totalScore++;};
        if(tnDragCnt == 2){totalScore = totalScore + 0.5};
        $("#pScore").text("Aktuálny počet bodov: "+totalScore);
        
        droppedRegions++;
        if(droppedRegions == 8){
            saveScoreToCookie();
            $("#youWon").fadeIn("fast");
            printScoresGraph();
        };    
      }
    });

    $("#divBB").droppable({
      accept: "#imgBB",
      tolerance: "fit",
      drop: function( event, ui ) {      
        $("#imgBB").draggable({revert: false});
        $("#imgBB").draggable("destroy");
        if(bbDragCnt == 1){totalScore++;};
        if(bbDragCnt == 2){totalScore = totalScore + 0.5};
        $("#pScore").text("Aktuálny počet bodov: "+totalScore);
        
        droppedRegions++;
        //console.log("droppedRegions: "+droppedRegions);
        if(droppedRegions == 8){
            saveScoreToCookie();
            $("#youWon").fadeIn("fast");
            printScoresGraph();
        };
      }      
    });

    $("#divZA").droppable({
      accept: "#imgZA",
      tolerance: "fit",
      drop: function( event, ui ) {      
        $("#imgZA").draggable({revert: false});
        $("#imgZA").draggable("destroy");
        if(zaDragCnt == 1){totalScore++;};
        if(zaDragCnt == 2){totalScore = totalScore + 0.5};
        $("#pScore").text("Aktuálny počet bodov: "+totalScore);
        
        droppedRegions++;
        if(droppedRegions == 8){
            saveScoreToCookie();
            $("#youWon").fadeIn("fast");
            printScoresGraph();
        };
      }      
    });

    $("#divPO").droppable({
      accept: "#imgPO",
      tolerance: "fit",
      drop: function( event, ui ) {      
        $("#imgPO").draggable({revert: false});
        $("#imgPO").draggable("destroy");
        if(poDragCnt == 1){totalScore++;};
        if(poDragCnt == 2){totalScore = totalScore + 0.5};
        $("#pScore").text("Aktuálny počet bodov: "+totalScore);
        
        droppedRegions++;
        if(droppedRegions == 8){
            saveScoreToCookie();
            $("#youWon").fadeIn("fast");
            printScoresGraph();
        };
      }
      
    });

    $("#divKE").droppable({
      accept: "#imgKE",
      tolerance: "fit",
      drop: function( event, ui ) {      
        $("#imgKE").draggable({revert: false});
        $("#imgKE").draggable("destroy");
        if(keDragCnt == 1){totalScore++;};
        if(keDragCnt == 2){totalScore = totalScore + 0.5};
        $("#pScore").text("Aktuálny počet bodov: "+totalScore);
        
        droppedRegions++;
        if(droppedRegions == 8){
            saveScoreToCookie();
            $("#youWon").fadeIn("fast");
            printScoresGraph();
        };
      }
      
    });
});
