
function Variable_Content_Loader() //class definition
{
	var items = [];
	this.add = function(container, url)
	{
		container = $(container);
		if(url == null)
			url = container.data("src");
		if(url == null)
			return;
		items.push({container:container, url:url});
	}
	
	this.find_containers = function()
	{
		var variable_content_containers = $(".variable_content_container"); //find all variable content containers
		for(var i=0;i<variable_content_containers.length;i++)
		{
			var item = variable_content_containers[i];
			this.add($(item));
		}	
	}
	
	this.load_content = function()
	{
		for(var i=0;i<items.length;i++)
		{
			var item = items[i];
			if(item.url.toLowerCase().substring(0,4) == ("http")) //external content?
				item.container.html("<iframe src='" + item.url + "' seamless='seamless'/>"); //use a frame
			else
				item.container.load(item.url); //otherwise embed
		}
	}
	
}				
