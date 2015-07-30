(function($){
	
	function loadMap(){
		var map = L.map('map-container').setView([51.505, -0.09], 13);
		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYXRoYXJ2YWoiLCJhIjoiYTAwODE1NDQzMjllMzY2ZmY2ZGI2MWIxNjJiZTZmM2IifQ.ue-0nyZbfNk1GWovPdDOoQ', {
		    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		    maxZoom: 18,
		    id: 'atharvaj.d09cfddd',
		    accessToken: 'pk.eyJ1IjoiYXRoYXJ2YWoiLCJhIjoiYTAwODE1NDQzMjllMzY2ZmY2ZGI2MWIxNjJiZTZmM2IifQ.ue-0nyZbfNk1GWovPdDOoQ'
		}).addTo(map);
	}

	function dimensify(){
		var mh = $(window).height() - $("#title-container").height();
		(mh > 100) ? (mh = mh) : (mh = 100);
		$("#map-container").css("height", mh + "px");
	}
	
	function alignBox($box){
		var bl = ($(window).width() - $box.width())/2;
		$box.css("left", bl+"px");
	}
	
	function welcome(){
		if (!localStorage.getItem("welcome")){
//			localStorage.setItem("welcome", true);
			alignBox($("#welcome-container"));
			$("#welcome-container").removeClass("hide");
		}
	}
	
	function setupEvents(){
		$("#welcome-close").click(function(){
			$("#welcome-container").addClass("hide");
		});
	}
	
	function initApp(){
		$(window).resize(function(){
			dimensify();	
		});
		dimensify();
		loadMap();
		welcome();
		setupEvents();
	}
	
	function checkApplication(successCallback){
		if(typeof(Storage) !== "undefined" || !localStorage) {
		    successCallback();
		} else {
		    alert("Please use a modern browser to use this application! :(");
		}
	}
	
	$(document).ready(function(){
	});
	
	$(window).load(function(){
		checkApplication(function(){
			initApp();
		});
	});
}(jQuery))