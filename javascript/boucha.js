

jQuery(document).ready(function($) { 
	loadSlideXML();
	loadWeather();  
		setInterval("loadWeather()", 60000 * 15); //15 minutes
	loadVideos();
	
		setInterval("loadTwitter()", 60000 * 15); //15 minutes
		setInterval("nextTweet()", 8000); // 8 seconds
	loadLinks();
	loadTwitter(); 		
	setInterval("getTime()", 1000);	
	setScreenParameters();
});

/////////// screen resolution

var globalSlideContainerHeight;
var globalSlideContainerWidth;

function setScreenParameters() {
	
	$(document).ready(function() {
		



		var headerHeight = $('#navHeader').height();
		var footerHeight = $('#navFooter').height();

		
		var screenWidth = window.screen.availWidth;
		var screenHeight = ((window.screen.height - headerHeight) - footerHeight);
		
		globalSlideContainerHeight = Math.floor(screenHeight * .75);
		globalSlideContainerWidth = Math.floor(screenWidth *.6);
		
		//change width of slide container to match screen
		//base resolution is 1920x1080
		$('#videoPlayer').css('width', (screenWidth - globalSlideContainerWidth) * .8);
		var paddingString = "50px";
		$('#mainContent').css('padding:left', paddingString);
    
		titlehttp = new XMLHttpRequest();
		titlehttp.open("GET","setup/setup.xml",false);
		titlehttp.send();
		titleDoc = titlehttp.responseXML; 
	
		var titleString = titleDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;
		document.getElementById("navigationBar").innerHTML = titleString;
	});
	
	
	xhttp = new XMLHttpRequest();
	xhttp.open("GET","setup/setup.xml",false);
	xhttp.send();
	xmlDoc = xhttp.responseXML;
	
	//Get color from setup xml
	var darkColor = xmlDoc.getElementsByTagName("darkColor")[0].childNodes[0].nodeValue;
	var newDarkColor = LightenDarkenColor(darkColor,40);
	//document.getElementById("navHeader").setAttribute("style","background-image: -moz-linear-gradient(top, "+newDarkColor+", "+darkColor+");");
	//document.getElementById("navFooter").setAttribute("style","background-image: -moz-linear-gradient(top, "+newDarkColor+", "+darkColor+");height:44px;");
	
	
	
}

$(window).load(function() {
	xhttp = new XMLHttpRequest();
	xhttp.open("GET","slides/slides.xml",false);
	xhttp.send();
	xmlDoc = xhttp.responseXML; 
	
	//
	var imageList = "";
	
	for(i = 0; i < xmlDoc.getElementsByTagName("slide").length; i++){
		xmlArray[i] = xmlDoc.getElementsByTagName("slide")[i].childNodes[0].nodeValue;
		imageList += "<li><img src=\"slides/" + xmlArray[i] +"\" onload=\"scale(this);\"/></li>";
	}
	
	document.getElementById("slideList").innerHTML = imageList;
	
	xhttp = new XMLHttpRequest();
	xhttp.open("GET","setup/setup.xml",false);
	xhttp.send();
	xmlDoc = xhttp.responseXML;
	
	//Get color from setup xml
	var darkColor = xmlDoc.getElementsByTagName("darkColor")[0].childNodes[0].nodeValue;
	var newDarkColor = LightenDarkenColor(darkColor,10);
	$('.ui-bar-b').css('background-image', '-moz-linear-gradient(top, #00009d, #00578e);');
	
	//Get slide interval from setup xml
	var slideInterval = xmlDoc.getElementsByTagName("slideInterval")[0].childNodes[0].nodeValue;
	slideInterval *= 1000;
	var slideTransition = xmlDoc.getElementsByTagName("slideTransition")[0].childNodes[0].nodeValue;
	
	$('.flexslider').flexslider({
          animation: slideTransition,
          controlsContainer: ".flex-container",
		  touch: true,
		  slideshowSpeed: slideInterval,
		  controlNav: false
    });
	
	//Get window size
	//var windowSize = xmlDoc.getElementsByTagName("windowSize")[0].childNodes[0].nodeValue;
	/*if (windowSize == 900) {
		$('.flexslider').css('width', "1000px");
		$('.flexslider').css('height', "610px");
		$('.flexslider').css('margin', "0");
		$('.flexslider').css('padding', "0");
		$('.flexslider').css('margin-left', "auto");
		$('.flexslider').css('margin-right', "auto");
		$('.flexslider').css('overflow', "hidden");
		$('.flexslider .slides > li').css('display', "none", '-webkit-backface-visibility', "hidden", 'text-align', "center", 'line-height', "610px");
		$('.flexslider .slides img').css('display', "inline-block", 'vertical-align', "middle", 'margin', "auto");		
		//.flexslider {margin: 0; padding: 0; overflow:hidden; margin-left:auto; margin-right:auto; width:1250px; height:810px;}
	}*/
});

function LightenDarkenColor(col,amt) {
    var usePound = false;
    if ( col[0] == "#" ) {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col,16);

    var r = (num >> 16) + amt;

    if ( r > 255 ) r = 255;
    else if  (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if ( b > 255 ) b = 255;
    else if  (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if ( g > 255 ) g = 255;
    else if  ( g < 0 ) g = 0;

    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}

  
  function pauseFlexSlide() {
	$('.flexslider').flexslider("pause");
  }
  function playFlexSlide() {
	$('.flexslider').flexslider("play");
  }
  function nextFlexSlide() {
	$('.flexslider').flexslider("next");
  }
  function prevFlexSlide() {
	$('.flexslider').flexslider("prev");
  }
  function scale(img) {

	if(img.height >= img.width) {
		img.style.height = "810px";

		img.style.width = "auto";
	} else {
		img.style.width = "1250px";

		img.style.height = "auto";
	}
	
  }

function getTime() {
	var now = new Date();
	
	var month = now.getMonth() + 1;
	var day = now.getDate();
	var year = now.getFullYear();
	
	hours = now.getHours() % 12;
	if(hours == 0) {
		hours = 12;
	}
	minutes = now.getMinutes();
	seconds = now.getSeconds();
	
	if (now.getMinutes() < 10) {
		minutes = "0" + minutes;
	}
	
	if (now.getSeconds() < 10) {
		seconds = "0" + seconds;
	}
	
	if(now.getHours() >= 12) {
		var ampm = "PM";
	} else {
		var ampm = "AM";
	}	
	
	document.getElementById("dateTime").innerHTML = "" + month +"/"+day+"/"+ year + "&nbsp;&nbsp;" + hours + ":" + minutes + ":" + seconds + " " + ampm;
}



////////////////////////////////////
//
//full screen feature for FireFox
//
////////////////////////////////////
document.addEventListener("keydown", function(e) {
  if (e.keyCode == 13) {
    document.documentElement.mozRequestFullScreen();
  }
}, false);


////////////////////////////////////
//
//load slides and functions for slide buttons
//
////////////////////////////////////
var xmlArray = new Array();
var slideCounter = -1;
var slideStatus = "running";

//load slides

function loadSlideXML() {
	
	xhttp = new XMLHttpRequest();
	xhttp.open("GET","slides/slides.xml",false);
	xhttp.send();
	xmlDoc = xhttp.responseXML; 
	
	var imageList = "";
	
	for(i = 0; i < xmlDoc.getElementsByTagName("slide").length; i++){
		xmlArray[i] = xmlDoc.getElementsByTagName("slide")[i].childNodes[0].nodeValue;
		//imageList += "<li><img src=\"" + xmlArray[i] +"\" onload=\"scale(this);\"/></li>";
	}
	
	
	//document.getElementById("slideList").innerHTML = imageList;
	
	var menuString = "<li data-role=\"divider\" data-theme=\"a\"><center>Slide Index</center></li>";
	
	for(i = 0; i < xmlArray.length; i++){
	menuString += "<li onclick=\"menuSelected("+i+")\"><img src=\"slides/" + xmlArray[i] + " \" height=\"85\" width=\"85\" /> " + xmlArray[i] + "</li>";

	}									
										
	document.getElementById("slideMenu").innerHTML = menuString;
	$('#slideMenu').listview('refresh');
	
	//advanceSlide();
	
}

function menuSelected(index) {
	$( "#slideMenuPop" ).popup( "close" );
	$('.flexslider').flexslider(index);
	
}

//////////////////////////////////////
//
//load weather
//
//////////////////////////////////////



function loadWeather() {

	weatherXhttp = new XMLHttpRequest();
	weatherXhttp.open("GET","setup/setup.xml",false);
	weatherXhttp.send();
	weatherXMLDoc = weatherXhttp.responseXML; 
	
	var zipcode = weatherXMLDoc.getElementsByTagName("zipCode")[0].childNodes[0].nodeValue;
	var wundergroundURL = "http://api.wunderground.com/api/2db0839df14debe6/geolookup/forecast/q/" + zipcode + ".json";
	var lightColor = weatherXMLDoc.getElementsByTagName("lightColor")[0].childNodes[0].nodeValue;
	var darkColor = weatherXMLDoc.getElementsByTagName("darkColor")[0].childNodes[0].nodeValue;
	
	var location = "hi";
	var temperature = "0";
	
	//document.getElementById("weatherContainer").innerHTML = "loading";
	
	$.ajax({ 
		//url : "http://api.wunderground.com/api/2db0839df14debe6/geolookup/conditions/q/56716.json", 
		url: wundergroundURL,
		dataType : "jsonp", success : function(weather_json) { 
										//location = parsed_json['location']['city'] + ", " + parsed_json['location']['state']; 
										//temperature = parsed_json['current_observation']['temp_f']; 
										
										
										//document.getElementById("weatherContainer").innerHTML="<img src='http://api.wunderground.com/api/2db0839df14debe6/animatedradar/q/56716.gif?width=200&height=200&newmaps=1'/>" + 
										//	"<table><tr ><td><p>Location: " + location + "<br/>Temp: "+ temperature + "</p></td><td><img src='http://icons-ak.wxug.com/i/c/k/clear.gif'/></td>";
									
									var weather = eval(weather_json); 
									
									var location = weather.location.city + ", " + weather.location.state;
									
									//var today = weather.forecast.txt_forecast.forecastday[0].title;
									var today = weather.forecast.simpleforecast.forecastday[0].date.weekday;
									var todayHigh = weather.forecast.simpleforecast.forecastday[0].high.fahrenheit;
									var todayLow = weather.forecast.simpleforecast.forecastday[0].low.fahrenheit;
									var todayConditions = weather.forecast.simpleforecast.forecastday[0].conditions;
									var todayIconURL = weather.forecast.simpleforecast.forecastday[0].icon_url;								
									
									//var tomorrow = weather.forecast.txt_forecast.forecastday[1].title;
									var tomorrow = weather.forecast.simpleforecast.forecastday[1].date.weekday;
									var tomorrowHigh = weather.forecast.simpleforecast.forecastday[1].high.fahrenheit;
									var tomorrowLow = weather.forecast.simpleforecast.forecastday[1].low.fahrenheit;
									var tomorrowConditions = weather.forecast.simpleforecast.forecastday[1].conditions;
									var tomorrowIconURL = weather.forecast.simpleforecast.forecastday[1].icon_url;
									
									//var dayAfter = weather.forecast.txt_forecast.forecastday[2].title;
									var dayAfter = weather.forecast.simpleforecast.forecastday[2].date.weekday;
									var dayAfterHigh = weather.forecast.simpleforecast.forecastday[2].high.fahrenheit;
									var dayAfterLow = weather.forecast.simpleforecast.forecastday[2].low.fahrenheit;
									var dayAfterConditions = weather.forecast.simpleforecast.forecastday[2].conditions;
									var dayAfterIconURL = weather.forecast.simpleforecast.forecastday[2].icon_url;
									
									/*	document.getElementById("weatherContainer").innerHTML="<div style='background:rgba(" + lightColor + ",0.7); border-radius: 10px; padding-top: 20px; padding-bottom:20px; width: 90%;'><text style='font-size: 20pt; text-shadow:none; text-align:left;'>" + location + "</text>" +
										"<table cellpadding='20px' cellspacing='20'" + 
											"<tr><td width='30%' style='background:rgba(" + darkColor + ",1); border-radius: 8px;'><center><text style='font-size: 15pt; color: white; text-shadow: none;'>"+ todayConditions +"<br/><img src='" + todayIconURL + "'/><br/>" +today+"<br/>" + todayHigh + "&deg; / " + todayLow + "&deg;</text></center></td> "+
											    "<td width='30%' style='background:rgba(" + darkColor + ",1); border-radius: 8px;'><center><text style='font-size: 15pt; color: white; text-shadow: none;'>"+ tomorrowConditions +"<br/><img src='" + tomorrowIconURL + "'/><br/>" +tomorrow+"<br/>" + tomorrowHigh + "&deg; / " + tomorrowLow + "&deg;</text></center></td> " +
											    "<td width='30%' style='background:rgba(" + darkColor + ",1); border-radius: 8px;'><center><text style='font-size: 15pt; color: white; text-shadow: none;'>"+ dayAfterConditions +"<br/><img src='" + dayAfterIconURL + "'/><br/>" +dayAfter+"<br/>" + dayAfterHigh + "&deg; / " + dayAfterLow + "&deg;</text></center></td> </tr>  " +
											"</table><center><text style='font-size:18pt; text-shadow:none;'>3-day Forecast</text></center></div>";
											*/
									
									document.getElementById("cityName").innerHTML = location;
									document.getElementById("statusToday").innerHTML = todayConditions;
									document.getElementById("todayWeatherIcon").src = todayIconURL;
									document.getElementById("todayDate").innerHTML = today;
									tempString = todayHigh + "&deg; / " + todayLow + "&deg;";
									document.getElementById("todayTemps").innerHTML = tempString;
									
									document.getElementById("statusTomorrow").innerHTML = tomorrowConditions;
									document.getElementById("tomorrowWeatherIcon").src = tomorrowIconURL;
									document.getElementById("tomorrowDate").innerHTML = tomorrow;
									tempString = tomorrowHigh + "&deg; / " + tomorrowLow + "&deg;";
									document.getElementById("tomorrowTemps").innerHTML = tempString;
									
									document.getElementById("statusDayAfter").innerHTML = dayAfterConditions;
									document.getElementById("dayAfterWeatherIcon").src = dayAfterIconURL;
									document.getElementById("dayAfterDate").innerHTML = dayAfter;
									tempString = dayAfterHigh + "&deg; / " + dayAfterLow + "&deg;";
									document.getElementById("dayAfterTemps").innerHTML = tempString;
									} 
		}); 
}

/////////////////////////////////////////
//
//load Twitter
//
//////////////////////////////////////////
var tweets = new Array();
var tweetCounter = 0;

function loadTwitter() {

	twitterXhttp = new XMLHttpRequest();
	twitterXhttp.open("GET","setup/setup.xml",false);
	twitterXhttp.send();
	twitterXMLDoc = twitterXhttp.responseXML; 
	
	var tweetCount = twitterXMLDoc.getElementsByTagName("tweetsToDisplay")[0].childNodes[0].nodeValue;
	
	var twitterNameArray = twitterXMLDoc.getElementsByTagName("twitterName");
	for(i = 0; i < twitterNameArray.length; i++) {
		var twittername = twitterNameArray[i].childNodes[0].nodeValue;
		var twitterURL = "https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name=" + twittername + "&count="+tweetCount+"";

		$.ajax({ 
			url : twitterURL, 
			dataType : "jsonp", success : function(parsed_json) { 
				var tempArray = eval(parsed_json);
				tempArray = parseTwitterLinks(tempArray);
				//tweets = tweets.concat(eval(parsed_json));
				tweets = tweets.concat(tempArray);
				document.getElementById("twitterBox").innerHTML = tweets[0].text;
			} 
		});
	}

	
	
	/*
	
	var twittername = twitterXMLDoc.getElementsByTagName("twitterName")[0].childNodes[0].nodeValue;
	var twitterURL = "https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name=" + twittername + "&count=5";
	
	document.getElementById("twitterName").innerHTML = twittername;
	document.getElementById("twitterImage").innerHTML = "<img src=\"http://api.twitter.com/1/users/profile_image/" + twittername + ".jpg\"/>";

	$.ajax({ 
		url : twitterURL, 
		dataType : "jsonp", success : function(parsed_json) { 
										//var tweet = parsed_json[1][text]; 
										tweets = eval(parsed_json);  
		
										document.getElementById("twitterBox").innerHTML = tweets[0].text;
									} 
		}); 
	*/
}

function parseTwitterLinks(array) {
	
	for (j = 0; j < array.length; j++) {
		var str = array[j].text;		
		//str = str.replace( /(http:\/\/[^\s]+)/gi , '<a href="$1">$1</a>' );
		str = str.replace( /(http:\/\/[^\s]+)/gi , "<a href=\"#urlPop\" data-rel=\"popup\" data-position-to=\"window\" data-transition=\"pop\" data-mini=\"true\" data-inline=\"true\" data-role=\"button\" onclick=\"openLink('$1');\">$1</a>" );
		
		array[j].text = str;
	}
	return array;
}

function nextTweet() {

	//alert("" + tweetCounter);
	tweetCounter++;
	if(tweetCounter > tweets.length - 1) {
		tweetCounter = 0;
	}

	
	var tweetHTML = "<a href='#popupTweet' data-rel='popup' data-position-to='window' data-inline='true' data-transition='fade'>" + tweets[tweetCounter].text + "</a>";
	
	document.getElementById("twitterBox").innerHTML = "<h4>" + tweets[tweetCounter].text + "</h4>";
	
	//alert("media: " + tweets[tweetCounter].retweeted_status.entities.media.media_url);
}



///////////////////////////////////////////////
//
//	load videos
//
///////////////////////////////////////////////




//Video Container

var videoArray = new Array();
var videoIndex = -1;



function loadVideos() {
	xhttpVideos = new XMLHttpRequest();
	xhttpVideos.open("GET","videos/videos.xml",false);
	xhttpVideos.send();
	xmlVideo = xhttpVideos.responseXML;
	
	for(i = 0; i < xmlVideo.getElementsByTagName("video").length; i++){	
		videoArray[i] = xmlVideo.getElementsByTagName("video")[i].childNodes[0].nodeValue;
	}
	
	var videoString = "<li data-role=\"divider\" data-theme=\"a\"><center>Video Index</center></li>";
	
	for(i = 0; i < videoArray.length; i++) {
			videoString += "<li onclick=\"videoSelected("+i+")\">" + videoArray[i] + "</li>";
	}
	
	
									
										
	document.getElementById("videoMenu").innerHTML = videoString;
	$('#videoMenu').listview('refresh');
	
	
	nextVideo();
}

function videoSelected(index) {
	$( "#videoMenuPop" ).popup( "close" );
	videoIndex = index;
	document.getElementById("videoPlayer").src = "videos/" + videoArray[videoIndex] + ".webm";
	document.getElementById("videoPlayer").load();
	document.getElementById("videoPlayer").play();
	document.getElementById('videoPlayer').addEventListener('ended',nextVideo,false);
}

function nextVideo() {

	videoIndex++;
	
	if(videoIndex < videoArray.length) {
		
	} else {	
		videoIndex = 0;	
	}
	
	document.getElementById("videoPlayer").src = "videos/" + videoArray[videoIndex] + ".webm";
	document.getElementById("videoPlayer").load();
	document.getElementById("videoPlayer").play();
	document.getElementById('videoPlayer').addEventListener('ended',nextVideo,false);

}

function prevVideo() {
	videoIndex -= 2;
	
	if(videoIndex < 0) {
		videoIndex = videoArray.length - 1;
	}
	
	document.getElementById("videoPlayer").src = "videos/" + videoArray[videoIndex] + ".webm";
	document.getElementById("videoPlayer").load();
	document.getElementById("videoPlayer").play();
}

function videoMute() {
		document.getElementById("videoPlayer").muted = !document.getElementById("videoPlayer").muted;
}

function videoGoFullScreen() {
	slideStatus = "stopped";
	
	document.getElementById("largeVideoPlayer").src = "videos/" + videoArray[videoIndex] + ".webm";
	document.getElementById("largeVideoPlayer").play();
	

	document.getElementById('videoPlayer').pause();
}

function closeVideoPopup() {
	slideStatus = "running";
	
	document.getElementById("largeVideoPlayer").pause();
	document.getElementById("videoPlayer").play();
}

///////////////////////////////////////////////
//
//	Load Links
//
////////////////////////////////////////////////

var urlArray = new Array();
var nameArray = new Array();
var linkURL = "";

function loadLinks() {

	xhttpLinks = new XMLHttpRequest();
	xhttpLinks.open("GET","links/links.xml",false);
	xhttpLinks.send();
	xmlLinks = xhttpLinks.responseXML; 
	
	
	
	for(i = 0; i < xmlLinks.getElementsByTagName("link").length; i++){
		
		nameArray[i] = xmlLinks.getElementsByTagName("name")[i].childNodes[0].nodeValue;
		urlArray[i] = xmlLinks.getElementsByTagName("url")[i].childNodes[0].nodeValue;
			
	}
	
	var buttonString = "";
	
	for(i = 0; i < urlArray.length; i++) {
		buttonString += "<a href=\"#urlPop\" data-rel=\"popup\" data-position-to=\"window\" data-transition=\"pop\" data-mini=\"true\" data-inline=\"true\" data-role=\"button\" onclick=\"openLink('" + urlArray[i] + "');\">" + nameArray[i] +"</a>";
		
		
		//buttonString += "<a href=\"#\"  data-inline=\"true\" data-role=\"button\" onclick=\"openLink('" + urlArray[i] + "');\">" + nameArray[i] +"</a>";
	}
	
	
	document.getElementById("buttonContent").innerHTML = "" + buttonString;
	$('[id="buttonContent"]').trigger('create');

	
}

function openLink(url) {
	$("#urlPop").popup({history:true});
	document.getElementById("urlContent").innerHTML = "<iframe src=\""+url+"\" frameborder=\"0\" width=\"100%\" height=\"780\"></iframe>";
}

function closeURLPop() {
	$("#urlPop").popup({history:false});
	$("#urlPop").popup('close');
}

