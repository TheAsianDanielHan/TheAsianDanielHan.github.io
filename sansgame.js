var gameScreen = document.getElementById("gameScreen");
var ctx = gameScreen.getContext("2d");

//X coordinate of the player↓↓
var hitboxX = 480;
//Y coordinate of the player↓↓
var hitboxY = 500;
//diameter of the player↓↓
var playerWidth = 64;
var playerHeight = 104;
//change in direction: VERY IMPORTANT↓↓
var deltaX = 0;
var deltaY = 0;
//checks if player is alive↓↓
var playerAlive = true;
//checks the hitbox of player↓↓
var playerX = 0;
var playerY = 0;
//sprite frame X and Y↓↓
var playerFrameX = 0;
var playerFrameY = 0;
//the width of the sprites
var spriteWidth = 32;
var spriteHeight = 52;		
var score = 0;

function drawBackdrop() {
	/*
	var backImage = new Image();
	backImage.src = "C:\\Users\\theas\\OneDrive\\Documents\\FOLDERS\\html files\\randomfiles\\pixel dreams.png"
	ctx.drawImage(backImage, 0, 0, gameScreen.width, gameScreen.height);
	*/
}

//player image
function drawPlayer() {
	var playerImage = new Image();								//create variable for the image
	playerImage.src = "steampunk_m1.png";						//gives the image variable the path to the image

	var dx = playerFrameX * spriteWidth;						//destinationX
	var dy = playerFrameY * spriteHeight;						//destinationY

	//draws the image
	//(image, destinationX, destinationY, spriteWidth, spriteHeight)
	ctx.drawImage(playerImage, dx, dy, spriteWidth, spriteHeight, hitboxX, hitboxY, playerWidth, playerHeight);
}//end function drawPlayer()

var musicYes = new Audio("music.wav");
var jumpSound = new Audio("jump.wav");

var advancedMode = false;
function showAdvancedMode() {
	advancedMode = true;
	console.log(playerX);
	console.log(playerY);
}

document.addEventListener("keydown", keyPressed, false);
document.addEventListener("keyup", keyReleased, false);

var rightPressed = false;
var leftPressed = false;
var spacePressed = false;

function keyPressed(e) {
	//checking right arrow key
	if (e.key == "Right" || e.key == "ArrowRight") {
		rightPressed = true;
		if (advancedMode == true) {
			console.log("right pressed")
		}
	}
	//checking left arrow key
	else if (e.key == "Left" || e.key == "ArrowLeft") {
		leftPressed = true;
		if (advancedMode == true) {
			console.log("left pressed")
		}
	}
	//checking space bar
	else if (e.key == " " || e.key == "SpaceBar") {
		spacePressed = true;
		if (advancedMode == true) {
			console.log("space pressed")
		}
	}
}

function keyReleased(e) {
	//checking right arrow key
	if (e.key == "Right" || e.key == "ArrowRight") {
		rightPressed = false;
		if (advancedMode == true) {
			console.log("right released")
		}
	}
	//checking left arrow key
	else if (e.key == "Left" || e.key == "ArrowLeft") {
		leftPressed = false;
		if (advancedMode == true) {
			console.log("left released")
		}
	}
	//checking space bar
	else if (e.key == " " || e.key == "SpaceBar") {
		spacePressed = false;
		if (advancedMode == true) {
			console.log("space released")
		}
	}
}

var moveRight = false;
var moveLeft = false;

function movePlayer () {
	//this function runs the logic part of the movement. It takes the information provided from keyPressed() and keyReleased() and uses it to check borders, and actually move the player.
	deltaX = 0;
	deltaY = 0;
	//this first part checks if the player is touching the border.
	if (playerX  == gameScreen.width) {
		moveRight = false;
		deltaX = 0;
	}
	else {
		moveRight = true;
	}
	if (playerX  == -1) {
		moveLeft = false;
		deltaX = 0;
	}
	else {
		moveLeft = true;
	}
	//this checks if keys are being pressed
	if (rightPressed == true && moveRight == true) {
		deltaX = 10;
	}
	if (leftPressed == true && moveLeft == true) {
		deltaX = -10;
	}
	//this makes it move
	hitboxX = hitboxX + deltaX;
	if (advancedMode == true && deltaX != 0) {
		console.log(deltaX);
	}
}

function setFrame() {
	if (deltaX == 0) {
		//checking if player is still
		playerFrameX = 0;
		playerFrameY = 0;
	}
	else {
		var counter = 0
		//checking for left
		if (deltaX <= 0) {
			playerFrameY = 1;
			//checking for frame reset
			if (playerFrameX < 3 && counter > 2) {
				playerFrameX = playerFrameX + 1;
				counter = 0;
			}
			else if (playerFrameX == 3 && counter > 2) {
				playerFrameX = 0;
				counter = 0;
			}
			else {
				counter = counter + 1;
			}
		}
		//checking for right
		if (deltaX >= 0) {
			playerFrameY = 2;
			//checking for frame reset
			if (playerFrameX < 3 && counter > 2) {
				playerFrameX = playerFrameX + 1;
				counter = 0;
			}
			else if (playerFrameX == 3 && counter > 2) {
				playerFrameX = 0;
				counter = 0;
			}
			else {
				counter = counter + 1;
			}
		}
	}
}

function reinitiatePlatforms() {
	reinitiatedPlatforms = true;
	//set up bottom floor
	for (var i = 1; i < floorAmount; i++) {
		floorX[i] = Math.random() * (gameScreen.width - 50) - 25;
		floorY[i] = (floorY[i-1] - 195) - (Math.random() * 11);
		floorWidth[i] = 100;
		floorHeight[i] = 25;
	}
}

var jumpPower = -12.5;
var gravityConstant = 0.3;
var gravityPower = 0;
var jumpVelocity = 0;
var jumpingTrue = false;

function listenForJump() {
	if (spacePressed == true && jumpingTrue == false) {
		jumpSound.play();
		jumpingTrue = true;
		jumpVelocity = jumpPower;
	}
	if (jumpingTrue == true) {
		deltaY = jumpVelocity;
		hitboxY = hitboxY + deltaY;
	}
}
var floorAmount = 5;
var floorX = [];
var floorY = [];
var floorHeight = [];
var floorWidth = [];
var touchingFloorTrue = false;
var underFloorTrue = false;
//to be used in touchingFloor();
function drawFloor() {
	
	// ctx.beginPath();
	// ctx.fillStyle = "black";
	// ctx.rect(floorX[0], floorY[0], floorWidth[0], floorHeight[0]);
	// ctx.closePath();
	// ctx.fill();
	for (var i = 0; i < floorAmount; i++) {
		ctx.beginPath();
		ctx.fillStyle = "black";
		ctx.rect(floorX[i], floorY[i], floorWidth[i], floorHeight[i]);
		ctx.closePath();
		ctx.fill();
	}
}

var initiatedPlatforms = false;
function initiatePlatforms() {
	initiatedPlatforms = true;
	//set up bottom floor
	floorX[0] = 0;
	floorY[0] = gameScreen.height - 25;
	floorHeight[0] = 25
	floorWidth[0] = gameScreen.width;

	for (var i = 1; i < floorAmount; i++) {
		floorX[i] = Math.random() * (gameScreen.width - 50) - 25;
		floorY[i] = (floorY[i-1] - 195) - (Math.random() * 11);
		floorWidth[i] = 100;
		floorHeight[i] = 25;
	}
}
var alive = true;
function checkForDeath() {
	if (playerY - (playerHeight/2) >= gameScreen.height) {
		alive = false;
		death();
	}
}

var comment = ["wow very nice good job. your score is: ", "wow you are cracked and goated and insane. your score is: ", "wow you are so good at this video game. your score is: ", "i think you are the best player at this game since 2012, your score is: ", "gj ig. ur score is: "]
var commentNumber = (Math.random() * 5) - 1;
function scorePoints() {
	if (alive == true) {
		if (score >= 0) {
			document.getElementById("textline").innerHTML = String(comment[0]) + String(score);
		}
		if (score >= 500) {
			document.getElementById("textline").innerHTML = String(comment[1]) + String(score);
		}
		if (score >= 1000) {
			document.getElementById("textline").innerHTML = String(comment[2]) + String(score);
		}
		if (score >= 2000) {
			document.getElementById("textline").innerHTML = String(comment[3]) + String(score);
		}
		if (score >= 4000) {
			document.getElementById("textline").innerHTML = String(comment[4]) + String(score);
		}
	}
}

function death() {
	document.getElementById("textline").innerHTML = "you died lmao. score: " + String(score);
}

function scroll() {
	if (playerY <= (gameScreen.height/2)) {
		playerY = playerY + 2;
		for (var i = 0; i < floorAmount; i++) {
			floorY[i] = floorY[i] + 2;
		}
		score = score + 2;
	}
	else {
		playerY = playerY
	}
}
var reinitiatedPlatforms = true;
function nearingTop () {
	if (playerY + (playerHeight/2) >= floorY[(floorAmount-1)] && playerY + (playerHeight/2) <= (floorY[(floorAmount-1)] + floorHeight[(floorAmount-1)])) {
		floorX[0] = floorX[(floorAmount-1)];
		floorY[0] = floorY[(floorAmount-1)];
		floorWidth[0] = 100;
		floorHeight[0] = 25;
		reinitiatedPlatforms = false;
		bottom = false;
	}
}
var bottom = true;
function touchingFloor() {
	for (var i = 0; i < floorAmount; i++) {
		if (playerX >= floorX[i] && playerX <= floorX[i] + floorWidth[i]) {
			if (playerY + (playerHeight/2) >= floorY[i] && playerY + (playerHeight/2) <= (floorY[i] + floorHeight[i])) {
				touchingFloorTrue = true;
				jumpingTrue = false;
			}
			else {
				var j = 1;
				if (!(playerY + (playerHeight/2) >= floorY[i]) && !(playerY + (playerHeight/2) <= (floorY[i] + floorHeight[i]))) {
					for (var i = 0; i < floorAmount; i++) {
						if (playerY + (playerHeight/2) >= floorY[i-j] && playerY + (playerHeight/2) <= (floorY[i-j] + floorHeight[i-j])) {
							touchingFloorTrue = true;
							jumpingTrue = false;
						}
						j = j + 1;
					}
				}//end of if
				else if (playerY + (playerHeight/2) >= floorY[0] && playerY + (playerHeight/2) <= (floorY[0] + floorHeight[0]) && bottom == true) {
					touchingFloorTrue = true;
					jumpingTrue = false;
				}
				else {
					touchingFloorTrue = false;
				}
			}//end of else
		}//end of if
	}//end of for loop
}// end of function touchingFloor();

function playMusic() {
	musicYes.play();
}

function doGravity() {
	if (jumpingTrue == true) {
		jumpVelocity = jumpVelocity + gravityConstant;
	}
	else {
		gravityPower = gravityPower + gravityConstant;
		if (touchingFloorTrue == true) {
			gravityPower = 0;
		}
		else {
			hitboxY = hitboxY + gravityPower;
		}
	}
}

function gameLoop() {
	//this is the main game loop
	//(1) clear screen
	ctx.clearRect(0, 0, gameScreen.width, gameScreen.height);

	//(2) update player position
	playerX = hitboxX + (playerWidth/2);
	playerY = hitboxY + (playerHeight/2);
	movePlayer();
	setFrame();
	//(3) draw players
	//drawBackdrop();
	if (reinitiatedPlatforms == false) {
		reinitiatePlatforms();
	}
	if (initiatedPlatforms == false) {
		initiatePlatforms();
		console.log("initiated platforms");
	}
	drawPlayer();
	drawFloor();
	//(4) update game logic and score
	checkForDeath();
	scorePoints();
	nearingTop();
	listenForJump();
	touchingFloor();
	scroll();
	doGravity();
	console.log(touchingFloorTrue);
	//(5) setup call back function to redraw based on browser's paint method
	requestAnimationFrame(gameLoop);       //this is what loops it
} //end of gameLoop();

//the setInterval sets the gameLoop function to run every 10 milliseconds.
//setInterval(gameLoop, 10);

gameLoop();