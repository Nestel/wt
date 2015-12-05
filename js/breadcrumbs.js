function bindEventToNavigation()
{
    showBreadCrumb();
    
    $.each($(".navigation_links"), function(index, element){
        $(element).click(function(event){
            breadcrumbStateSaver($("<div>").html($(event.currentTarget).clone()).html());
            showBreadCrumb();
        });
    });
}


function breadcrumbStateSaver(text)
{
	//console.log(text);
    if(typeof(Storage) != "undefined")
    {
        if(sessionStorage.breadcrumb)
        {
			var breadcrumb = sessionStorage.breadcrumb;
			sessionStorage.breadcrumb = breadcrumb + " >> " + text;
        } 
        else 
        {
           	sessionStorage.breadcrumb = "" + text; 
        }
    }
}

function showBreadCrumb()
{
    var breads = [];
    
    if(sessionStorage.breadcrumb) 
    {
		var bc = sessionStorage.breadcrumb.toString();
		breads = bc.split(" >> ");
    }
   
    if (breads.length > 5) 
    {
        var breadcrumb = "" + breads[breads.length-5];

        for (i = breads.length - 5 + 1; i < breads.length; i++) 
        {
            breadcrumb = breadcrumb + " >> " + breads[i];
        }
        
        $("#breadcrumbs").html(breadcrumb);
    }
    else 
    {
        $("#breadcrumbs").html(sessionStorage.breadcrumb); 
    }       
}