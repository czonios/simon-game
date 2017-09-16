var count = 0;
var sequence = [];
var input = [];
var green = 0;
var red = 1;
var yellow = 2;
var blue = 3;

var strict = false;

var playing = false;

// colors to use for the animation
var colG =  	"#4CAF50";
var colGHover = "#81C784";
var colR = 		"#f44336";
var colRHover = "#e57373";
var colB = 		"#2196F3";
var colBHover = "#64B5F6";
var colY =		"#FFEB3B";
var colYHover = "#FFF176";

var audio = [
	document.getElementById("sound1"), 
	document.getElementById("sound2"), 
	document.getElementById("sound3"), 
	document.getElementById("sound4")
];
		


// adds a random color to the end of the sequence
function addToSequence() {
	var rand = Math.floor(Math.random() * 4);
	sequence.push(rand);
	
}

function playSingle(i) {
	if (playing == false)
		return;
	//change color to hover depending on which box
	switch (sequence[i]) {
		case green:
			$(".green").css("background", colGHover);
			break;
		case red:
			$(".red").css("background", colRHover);
			break;
		case blue:
			$(".blue").css("background", colBHover);
			break;
		case yellow:
			$(".yellow").css("background", colYHover);
			break;
						 }
	var sound = audio[sequence[i]];
	sound.play();
	setTimeout("stopSingle(" + i + ")", 350);
	
}

function stopSingle(i) {
	// change back to original color
	switch (sequence[i]) {
		case green:
			$(".green").css("background", colG);
			break;
		case red:
			$(".red").css("background", colR);
			break;
		case blue:
			$(".blue").css("background", colB);
			break;
		case yellow:
			$(".yellow").css("background", colY);
			break;
						 }
	if (i+1 < sequence.length) {
		i++;
		setTimeout("playSingle(" + i + ")", 400);
	}
}


function playSequence() {
		if (playing == false)
			return;
		console.log("playSequence()");
		$(".notification").html("");
		playSingle(0);
}

function readSequence() {
	if (playing == false)
		return;
	var answer = true;
	console.log("In readSequence");
	if (input.length < sequence.length) {
		return;
	}
	for (var i=0; i<sequence.length; i++) {
		if (input[i] != sequence[i])
			answer = false;
	}
	checkAnswer(answer);
		
}

function checkAnswer(answer) {
	if (playing == false)
		return;
	console.log("checking answer");
	console.log("Here in while (play())");
	if (answer == true) {
		console.log("if readSequence == true");
		count++;
		input = [];
		setTimeout(play, 1500);
	}
	else {
		console.log("else 1");
		if (strict) {
			console.log("if 2");
			$(".notification").html("<h3>Game Over</h3>");
			count = 0;
			sequence = [];
			input = [];
			setTimeout(play, 1500);
			
		}
		else {
			console.log("else 2");
			$(".notification").html("<h3>Wrong sequence, playing again.</h3>");
			input = [];
			setTimeout(playSequence, 1500);
		}
	}
}

function gameWon() {
	$(".notification").html("<h1>You Win!</h1>");
		count = 0;
		sequence = [];
		input = [];
		setTimeout(play, 2000);
}

function play() {
	if (playing == false)
		return;
	if (count >= 20) {
		gameWon();
	}
	ready = false;
	// remove notification
	$(".notification").html("");	
	// update count
	$(".count").text(count);
	// add to the sequence and play it
	addToSequence();
	setTimeout(playSequence, 500);
}

$(document).ready(function() {
	
	$(".count").text(count);
	
	$('.green').on('click', function() {
		var sound = audio[green];
		sound.play();
		input.push(green);
		readSequence();
	});
		
	$('.red').on('click', function() {
		var sound = audio[red];
		sound.play();
		input.push(red);
		readSequence();
	});
		
	$('.blue').on('click', function() {
		var sound = audio[blue];
		sound.play();
		input.push(blue);
		readSequence();
	});
		
		
	$('.yellow').on('click', function() {
		var sound = audio[yellow];
		sound.play();
		input.push(yellow);
		readSequence();
	});
	
	$('.start').on('click', function() {
		var content = document.getElementById('start').innerHTML;
		if  (content == "Start") {
			$(".start").text("Stop");
			playing = true;
			play();
		}
		else {
			playing = false;
			$(".start").text("Start");
			$(".notification").html("<h3>Game Stopped.</h3>");
			count = 0;
			sequence = [];
			input = [];
			$(".count").text(count);
		}
	});
	
	$('.strict').on('click', function() {
		if (strict == false) {
			strict = true;
			$(".strict").text("Strict: ON");
		}
		else {
			strict = false;
			$(".strict").text("Strict: OFF");
		}
	});
	
});