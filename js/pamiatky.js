var pamiatky;

var prevHeight = 0;

$(function(){
	resizePamiatky();
});

function resizePamiatky()
{
	//vsetky pamiatky
	pamiatky = $(".pamiatka");

	pamiatky.each(function(index){
		$(pamiatky[index]).css("height", "auto");
	});

	//nastav vysku pamiatok podla dlhsej z nich
	pamiatky.each(function(index){
		//currently iterated pamiatka
		var currentPamiatkaJQ = $(pamiatky[index]);
		//vyska currently iterated pamiatky
		var currentHeight = currentPamiatkaJQ.height();
		
		//ked som na prvej z tych dvoch pamiatok
		if (index % 2 == 0)
		{
			//to sa hadam da pochopit
			prevHeight = currentPamiatkaJQ.height();
		}
		//ked som na druhej z tych dvoch
		else
		{
			//uloz predoslu pamiatku
			var prevPamiatkaJQ = $(pamiatky[index-1]);
			//zisti ktora bola dlhsia
			var maxHeight = prevHeight > currentHeight ? prevHeight : currentHeight;
			//nastav vysky oboch pamiatok na vysku tej dlhsej
			currentPamiatkaJQ.height(maxHeight);
			prevPamiatkaJQ.height(maxHeight);
		}
	});
}