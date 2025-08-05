//Use the mouse to move the paddle from left to right. Keep the ball in the air. If it touches the ground, you lose.

/* VARIABLES */
let seed;
let root;
let stem; 
let flower;
let paddle;
let score = 0;

//Preload images
function preload() {
  seedImage = loadImage('assets/seed-removebg-preview.png');
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400,400);
  background(0);

  //Create paddle 
  paddle = new Sprite(200,380,100,20);
  paddle.color = color(95,158,160);
  paddle.rotationLock = true;
  
  //Create ball
  seed = new Sprite(100, 50, 20);
  seed.direction = 'down';
  seed.speed = 5;
  seed.bounciness = 1;
  seed.friction = 100;
  //Create walls
  walls = new Group();
	walls.w = 10;
	walls.h = 400;
  walls.collider = "static";
  walls.visible = false;
  walls.bounciness = 1;

  // left and right walls
	new walls.Sprite(0, height / 2);
	new walls.Sprite(width, height / 2);
  
  //top wall
	let wallTop = new walls.Sprite(width / 2, 0);
	wallTop.rotation = 90;
}

/* DRAW LOOP REPEATS */
function draw() {
  background(224,224,224);

  //Move the paddle
paddle.moveTowards(mouse.x, 380, 1.0);
  //When ball collides with paddle bounce off and increase score
  if (seed.collides(paddle)) {
    seed.speed = 8;
    score = score + 1;
    seed.direction = seed.direction + random (-10, 10);
  }

  //When ball hits ground you lose
  if (seed.y > 390) {
    seed.y = 430
    seed.speed = 0;
    
    // Draw you lose to screen
    fill(0);
    textSize(20);
    text('You lose!', 160, 160); 
  }


  //Draw the score
  fill(0, 128, 128);
  textAlign(LEFT);
  textSize(20);
  text('Score = ' + score, 10, 30);
}	