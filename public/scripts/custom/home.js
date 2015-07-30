(function($){
	$(document).ready(function(){
		updateDate();
	});
	
	$(window).load(function(){
		AltCanvas.setupCanvas($("#main-canvas"));
		repositionImages();
		
		$(window).resize(function(){
			dimensify();
			repositionImages();	
		});
	});
	
	function updateDate(){
		var yearCount = (Math.abs(new Date() - new Date("2012/01/01"))/(1000 * 60 * 60 * 24 * 365)).toFixed(1); //this is no random date, i started working professionally on 1st of jan 2012
		$(".exp-date").text(yearCount);
	}
	
	function dimensify(){
	}
	
	function repositionImages(){
		$(".image").each(function(){
			var img = $(this);
			var ml = -1 * (img.width() - img.closest(".image-container").width())/2;
			img.css({"margin-left": ml + "px"});
			if (img.hasClass("rp-y")){
				var mt = -1 * (img.height() - img.closest(".image-container").height())/2;
				img.css({"margin-top": mt + "px"});
			}
//			img.removeClass("noshow");
			
			img.off("click");
			img.on("click", function(){
				var win = window.open(img.attr("src"), '_blank');
				win.focus();
			});
		});
	}
}(jQuery));