var video, detector, display, controller, canvas, context;
var dw, dh;

function init() {
    video = document.createElement('video');
    display = $("#display");
    controller = $("#controller");
    canvas = $('<canvas style="position: fixed; z-index: 1001;top: 10px; right: 10px; opacity: 1.0">').get(0);
    context = canvas.getContext('2d');
    
    document.getElementsByTagName('body')[0].appendChild(canvas);
    try {
        compatibility.getUserMedia({
            video: true
        }, function(stream) {
            try {
                video.src = compatibility.URL.createObjectURL(stream);
            } catch (error) {
                video.src = stream;
            }
            compatibility.requestAnimationFrame(play);
        }, function(error) {
            alert("WebRTC not available");
        });
    } catch (error) {
        alert(error);
    }
}

function hideController(){
	controller.fadeOut(500);
}

function showController(){
	controller.fadeIn(500);
}

var detectTimeout = 0, detectorShown = false, undetectTimeout = 0;
var DETECT_TIMEOUT = 20;

function checkDetector(){
	detectTimeout++;
	if (detectTimeout > DETECT_TIMEOUT){
		detectorShown = true;
		undetectTimeout = 0;
		showController();
	}
}

function clearDetector(){
	undetectTimeout++;
	if (undetectTimeout > DETECT_TIMEOUT){
		detectorShown = false;
		detectTimeout = 0;
		hideController();
	}
}

function parseCoords(coords){
	if (coords[0]){
		checkDetector();
		if (detectorShown){
	        var coord = coords[0];
	        coord[0] *= video.videoWidth / detector.canvas.width;
	        coord[1] *= video.videoHeight / detector.canvas.height;
	        coord[2] *= video.videoWidth / detector.canvas.width;
	        coord[3] *= video.videoHeight / detector.canvas.height;

	        /* Draw coordinates on video overlay: */
	        controller.css({"left": ((coord[0] / video.videoWidth * dw)) + "px", "top": (coord[1] / video.videoHeight * dh) + "px", 
	        	"width": (coord[2] / video.videoWidth * dw) + "px", "height": (coord[3] / video.videoHeight * dh) + "px"});
		}
	} else{
    	clearDetector();
    }
}

function play() {
    compatibility.requestAnimationFrame(play);
    if (video.paused)
        video.play();

    if (video.readyState === video.HAVE_ENOUGH_DATA && video.videoWidth > 0) {

        if (!detector) {
            var width = ~~(80 * video.videoWidth / video.videoHeight);
            var height = 80;
            detector = new objectdetect.detector(width, height, 1.1, objectdetect.handfist);
        }

        canvas.width = ~~(100 * video.videoWidth / video.videoHeight);
		canvas.height = 100;
		context.drawImage(video, 0, 0, canvas.clientWidth, canvas.clientHeight);
        
        /* Draw video overlay: */
        display.css("height", $(window).height());
        display.css("width", ~~(display.height() * video.videoWidth / video.videoHeight));
        dw = display.width();
        dh = display.height();
        
        var coords = detector.detect(video, 1);
        parseCoords(coords);
    }
}

$(document).ready(function(){
	init();	
});
