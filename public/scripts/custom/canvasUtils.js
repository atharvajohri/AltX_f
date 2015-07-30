(function($){

	var $canvas;
	
	function setupCanvas(_canvas){
		$canvas = _canvas;
		test1();
//		fillCanvas();
	}
	
	function fillCanvas(){
		$canvas.attr("width", $(document).width());
		$canvas.attr("height", $(document).height());
	}
	
	function test1(){
		var stage = new Kinetic.Stage({
	        container: 'main-container',
	        width: 578,
	        height: 220
	      });
	      var layer = new Kinetic.Layer();

	      var textpath = new Kinetic.TextPath({
	      	x: 100,
	      	y: 50,
	        fill: '#333',
	        fontSize: '24',
	        fontFamily: 'Arial',
	        text: 'All the world\'s a stage, and all the men and women merely players.',
	        data: 'M10,10 C0,0 10,150 100,100 S300,150 400,50'
	      });

	      layer.add(textpath);
	      stage.add(layer);
	}
	
	window.AltCanvas = {
		fillCanvas: fillCanvas,
		setupCanvas: setupCanvas
	};
	
}(jQuery));