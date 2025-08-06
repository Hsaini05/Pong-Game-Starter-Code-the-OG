//Use the mouse to move the paddle from left to right. Keep the ball in the air. If it touches the ground, you lose.

/* VARIABLES */
let seed;
let bug;
let water; 
let paddle;
let score = 0;
let restartButton;
let rock;

//Preload images
function preload() {
  seed = loadImage('assets/seed-removebg-preview.png');
  paddle = loadImage('assets/th-removebg-preview.png');
  water = loadImage('assets/OIP-removebg-preview (3).png');
  sun = loadImage('assets/OIP-removebg-preview (4).png');
  bug = loadImag('assets/OIP-removebg-preview (5).png');
  rock = loadImage('assets/download-removebg-preview.png');

}

  function setup() {
  createCanvas(400,400);
  background(0);

    //Bg with obstacles
    bug = new Sprite(bug,20,20,100);
    bug.collider = "static";
    
  //Bg with water drops
  water.resize(30,30);
  water = new Sprite(water, 100,random(10,400));
  water.collider = "static";

  //Bg with sun
    sun.resize(30,30);
    sun = new Sprite(sun,random(20,400), 200);
    sun.collider = "static";

  //Create paddle 
  paddle.resize(100,100);
  paddle = new Sprite(paddle,300,100,20);
  paddle.rotationLock = true;
  paddle.bounciness = 1;
    paddle.collider = "k";
  
  //Create ball
  seed.resize(30,30);
  seed = new Sprite(seed, 200, 10);
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
  walls.bounciness = 0;

  // left and right walls
	new walls.Sprite(0, height / 2);
	new walls.Sprite(width, height / 2);
  
  //top wall
	let wallTop = new walls.Sprite(width / 2, 0);
	wallTop.rotation = 90;

  //Create Restart Button
  restartButton = new Sprite(width/2, height/2 + 100);
  restartButton.w = 150;
  restartButton.h = 50;
  restartButton.color = "lightblue";
  restartButton.collider = "kinematic";
  restartButton.text = "Click here to try again!";
}

/* DRAW LOOP REPEATS */
function draw() {
  background(224,224,224);

  //Move the paddle
paddle.moveTowards(mouse.x, 380, 1.0);

  //when ball collides with water drop
  if (seed.collides(water)){
    seed.speed = speed +2;
    water.visible = false;
    water.collider = "none";
    score = score + 1;
    seed.direction = seed.direction + random (-10, 10);
    water.x = random (20,400);
    water.y = random (20,400);
    water.visible = true;
  }

  //When ball collides with sun 
  if (seed.collides(sun)){
    seed.speed = speed + 2;
    sun.visible = false;
    sun.collider = "none";
    score = score + 1;
    seed.direction = seed.direction + random (-10, 10);
    sun.y = random(10,400);
    sun.x = random (10,400);
    SubmitEvent.visible = true;
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
  // Button clicked
  if (restartButton.mouse.presses()) {
    seed.direction = 'down';
    seed.speed = 5;
    seed.bounciness = 1;
    seed.friction = 0;
    score = 0;
    seed.y = 50;
    water.y = 100;
    sun.y = 100; 
    water.visible = true;
    sun.visible = true;
  }

  // restart button visible
  restartButton.visible = false;
  restartButton.pos = { x: -100, y: -100};
  if (seed.y > 390){
    restartButton.visible = true;
    restartButton.pos = { x: 200, y: 200};
  }

  //Draw the score
  fill(0, 128, 128);
  textAlign(LEFT);
  textSize(20);
  text('Score = ' + score, 10, 30);
}	