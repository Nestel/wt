var menu = [{value: "Pamiatky", link: "index.html"},
			{value: "Mapa pamiatok", link: "index.html#pamiatky-mapa"},
			{value: "Individuálne zadania", link: '#', submenu: [
				{value: "Jano", link: "#", submenu: [{
					value: "Krížovka", link: "krizovka.html"
				}]},
				{value: "Ondro", link: "#", submenu: [
					{value: "Slepá mapa - Slovensko", link: "slepaMapaSlovensko.html"},
					{value: "Slepá mapa - Európa", link: "slepaMapaEuropa.html"
				}]},
				{value: "Vierka", link: "#", submenu: [{
					value: "Anagramy", link: "anagramy.html"
				}]},
				{value: "Matus", link: "#", submenu: [{
					value: "Matusova uloha", link: "#"
				}]},
				{value: "Gabriel", link: "#", submenu: [{
					value: "Sudoku", link: "sudoku.html"
				}]}
			]},
			{value: "O nás", link: "about.html"}];

var navbar;

function appendMenuToNavbar()
{
	var htmlString = "";
	var currentMenu = "";
	var currentSubmenu = "";
	var currentSubsubmenu = "";

	for (var i = 0; i < menu.length; i++)
	{
		currentMenu = menu[i];

		if (currentMenu.submenu != undefined)
		{
			htmlString += "<li><a href='" + currentMenu.link + "'class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'>" + currentMenu.value+ "<span class='caret'></span></a>";
			htmlString += "<ul class='dropdown-menu'>";

			for (var j = 0; j < currentMenu.submenu.length; j++)
			{
				currentSubmenu = currentMenu.submenu[j];

				if (currentSubmenu.submenu != undefined)
				{
					htmlString += "<li class='dropdown-submenu'><a href='" + currentSubmenu.link + "'>" + currentSubmenu.value + "</a>";
					htmlString += "<ul class='dropdown-menu'>"

					for (var k = 0; k < currentSubmenu.submenu.length; k++)
					{
						currentSubsubmenu = currentSubmenu.submenu[k];
						htmlString += "<li><a class='navigation_links' href='" + currentSubsubmenu.link + "'>" + currentSubsubmenu.value + "</a></li>";
					}
					htmlString += "</ul></li>";
				}
				else
				{
					htmlString += "<li><a class='navigation_links' href='" + currentSubmenu.link + "'>" + currentSubmenu.value + "</a></li>";
				}
			}	

			htmlString += "</ul></li>";
		}
		else
		{
			htmlString += "<li><a class='navigation_links' href='" + currentMenu.link + "'>" + currentMenu.value + "</a>";
		}
	}

	navbar.append(htmlString);
}

$(function(){
	navbar = $("#navbar");
	appendMenuToNavbar();
});