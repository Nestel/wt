function bindEventToNavigation()
{
    showBreadCrumb();
    $.each($("#navigation_links > li"), function(index, element){
        $(element).click(function(event){
            breadcrumbStateSaver($(event.currentTarget).html());
            showBreadCrumb();
        });
    });
}


function breadcrumbStateSaver(text)
{
    //here we'll check if the browser has storage capabilities
    if(typeof(Storage) != "undefined"){
        if(sessionStorage.breadcrumb){
            //this is how you retrieve the breadcrumb from the storage
            var breadcrumb = sessionStorage.breadcrumb;
           sessionStorage.breadcrumb = breadcrumb + " >> " + text;
        } else {
           sessionStorage.breadcrumb = "" + text; 
        }
    }
    //if not you can build in a failover with cookies
}

function showBreadCrumb()
{
    var breads = [];
    if(sessionStorage.breadcrumb) {
        var bc = sessionStorage.breadcrumb.toString();
        breads = bc.split(" >> ");
    }
    if (breads.length > 5) {
        var breadcrumb = "" + breads[breads.length-5];
        for (i = breads.length-5+1; i<breads.length; i++) {
            breadcrumb = breadcrumb + " >> " + breads[i];
        }
        $("#breadcrumb").html(breadcrumb);
    }
    else {
        $("#breadcrumb").html(sessionStorage.breadcrumb); 
    }       
}