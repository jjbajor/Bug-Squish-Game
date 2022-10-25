let spriteSheet;
let character = [];
let count = 40;
let timer = 30;
let speed = 1;
let killCount = 0;
let spidersLeft = count;

function preload() {
  spriteSheet = loadImage("SpiderSprite.png", 200, 200);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);

  //Creates (count) # of spiders
  for(i = 0; i < count; i++) {
    character[i] = new Character(spriteSheet, random(100, 1300), random(200, 600), speed, random([-1, 1]));
  }

}

function mousePressed() {
  for(i = 0; i < count; i++) {
    character[i].squish();
  }
}

function draw() {
  background(200, 200, 200);
  for(i = 0; i < count; i++) {
    character[i].draw();
  }

  //Displays timer
  textSize(50);
  text("Time Left: " + timer, 200, 100);

  //Starts timer after first kill
  if(killCount > 0) {
    if(frameCount % 60 == 0 && timer > 0) {
      timer--;
    }
  }

  //Displays GAME OVER after 30 seconds or if all spiders are dead
  if(timer == 0 || spidersLeft == 0) {
    background(225, 225, 225);
    if(spidersLeft == 0) {
      textSize(100);
      text("GAME OVER, YOU WIN!!!", 150, 350);
    } else {
      textSize(100);
      text("GAME OVER, YOU LOSE!!!", 150, 350);
    }
  }

  //Kill Counter
  textSize(50);
  text("Kill Count: " + killCount, 900, 100);

}

class Character {
  constructor(spriteSheet, x, y, speed, move) {
  this.spriteSheet = spriteSheet;
  this.sx = 0;
  this.x = x;
  this.y = y;
  this.move = 0;
  this.speed = speed;
  this.move = move;
  this.facing = move;
  this.squished = false;
  this.dead = false;
  }

  draw() {
    push();
    translate(this.x, this.y);
    scale(this.facing, 1);
    rotate(PI / 2);

    //Draws spider
    if(this.move == 0) {
      //Updates picture to "squished" state
      image(this.spriteSheet, 0, 0, 100, 100, 30, 90, 69, 80);
    } else {
      //Normal walking
      image(this.spriteSheet, 0, 0, 100, 100, 69 * (this.sx + 1), 0, 69, 80);
    }
    
    //Duration of each sprite frame
    if(frameCount % 5 == 0) {
      this.sx = (this.sx + 1) % 6;
    }

    //Movement
    this.x += speed * this.move;

    //Bounces back against walls
    if(this.x < 50) {
      this.move = 1;
      this.facing = 1;
    } else if(this.x > 1450) {
      this.move = -1;
      this.facing = -1;
    }

    pop();
  }

  //When a spider is killed, this function is called
  squish(){
    if(mouseX > this.x - 40 && mouseX < this.x + 40 && 
      mouseY > this.y - 40 && mouseY < this.y + 40) {

        //Adds a kill to score
        if(!this.dead) {
          killCount += 1;
          spidersLeft -= 1;
        }

        //Speeds up rest of spiders
        if(!this.dead) {
          speed += 0.3;
          console.log(speed);
        }

        //Stops spider and squishes
        this.stop();
        this.squished = true;
        this.dead = true;
    }
  }

  //Moves spider
  go(direction) {
    this.move = direction;
    this.facing = direction;
    this.sx = 3;
  }

  //Stops spider
  stop() {
    this.move = 0;
  }


}