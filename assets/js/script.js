/* jshint esversion: 8 */

// Function to display how to play instructions

function show() {
  let display = document.getElementById("display");
  if (display.style.display === "none") {
    display.style.display = "block";
  } else {
    display.style.display = "none";
  }
}
// function to reload the page for game restart
function gameRestart() {
  location.reload();
}

// Game

// Game Configuration
const config = {
  type: Phaser.AUTO,
  parent: 'cadius-miner',
  width: 800,
  height: 600,
  scale: {
    parent: 'cadius-miner',
    mode: Phaser.Scale.FIT,
    min: {
      width: 380,
      height: 285
    },
    max: {
      width: 800,
      height: 600
    },
    zoom: 1,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

// Game global Variables
let player;
let asteroid;
let cursors;
let bullets;
let speed;
let lastFired = 0;
let gameOver = false;
let score = 0;
let scene;

const game = new Phaser.Game(config);

// Preload for all images used in game
function preload (){
  this.load.image('sky','./assets/images/nebula.png');
  this.load.image('roid','./assets/images/grey-roid.png');
  this.load.image('ship','./assets/images/ship.png');
  this.load.image('bullet','./assets/images/bullet.png');
}

// Create - this creates the game scene
function create(){
  // defining this as scene
  scene = this;
  
  // add background to game
  this.add.image(400,400,'sky');
  
  //Defines player and asigns the the image
  player = this.physics.add.sprite(400,600, 'ship').setInteractive({draggable: true});
  
  // Controls for Mobile device
  player.on('drag', function(pointer, dragX){
    this.x = dragX;
  });

  this.input.addPointer(2);

  pointer1 = this.input.pointer1;
  pointer2 = this.input.pointer2;

  //Sets player to collide with world boundries
  player.setCollideWorldBounds(true);

  // Controls for keyboard
  cursors = this.input.keyboard.createCursorKeys();

  // Defines the varable speed
  speed = Phaser.Math.GetSpeed(300,1);

  // text overlay for score and game over.
  scoreText = this.add.text(0,0, 'Score: ', {fontSize: '25px', fill: '#00ff00'});
  gameOverText = this.add.text(400,300, 'GAME OVER!!!', {fontSize: '50px', fill: '#00ff00'});
  gameOverText.setOrigin(0.5);
  gameOverText.visible = false;

  // Asteroid
  asteroid = this.physics.add.group({
    defaultKey: 'roid',
    maxSize: 25,
    createCallback: function (roid) {
        roid.setName('roid' + this.getLength());

    },
    removeCallback: function (roid) {
    }
  });

  // Bullets
  this.time.addEvent({
    delay: 100,
    loop: true,
    callback: addRoid
  });

  let Bullet = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,
    // sets the bullets image and speed
    initialize:
    function Bullet (scene){
      Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
      this.speed = Phaser.Math.GetSpeed(400,1);
    },
    // gets current position of ship when fire is triggered
    fire: function (x,y){
      this.setPosition(x, y - 50);
      this.setActive(true);
      this.setVisible(true);
    },

    update: function (time, delta){
      this.y -= this.speed * delta;

      if (this.y < -50){
        this.setActive(false);
        this.setVisible(false);
      }
    }
  });
  // creates a group for the bullets and sets a class and max number
  bullets = this.physics.add.group({
    classType: Bullet,
    maxSize: 10,
    runChildUpdate: true
  });

  // Collider for player and asteroids
  this.physics.add.collider(player, asteroid, hitAsteroid);

  // Collider for bullets and asteroids
  this.physics.add.collider(bullets, asteroid, mined);

}

// Update funtion for while game is in play
function update(time, delta){
  // Keyboard commands for moving player
  if (cursors.left.isDown)
    {player.x -= speed * delta;}
  else if (cursors.right.isDown)
    {player.x += speed * delta;}

  // Keyboard command for shooting
  if(cursors.space.isDown && time > lastFired){
    var bullet = bullets.get();

    if (bullet){
      bullet.fire(player.x, player.y);
      lastFired = time + 50;
    }
  }

  // controls for shooting on mobile device
  if (pointer2.isDown && time > lastFired){
    var bullet = bullets.get();

    if (bullet){
      bullet.fire(player.x, player.y);
      lastFired = time + 50;
    }
  }

  // Asteroids spawning
  Phaser.Actions.IncY(asteroid.getChildren(), 1);

  asteroid.children.iterate(function (roid) {
      if (roid.y > 600) {
        asteroid.killAndHide(roid);
      }
  });


}

function addRoid () {
  // Random position above screen
  const x = Phaser.Math.Between(10, 800);
  const y = Phaser.Math.Between(-64, 0);

  // Find first inactive sprite in group or add new sprite, and set position
  const roid = asteroid.get(x, y);

  // None free or already at maximum amount of sprites in group
  if (!roid) return;

  activateRoid(roid, x, y);
}

// Additional Asteroid spawn code
function activateRoid (roid, x, y) {
  roid
  .setActive(true)
  .setVisible(true)
  .setTint(Phaser.Display.Color.RandomRGB().color)
  .enableBody(true, x, 0, true, true);
}

// Update Score function
function mined(bullets, asteroid){
  asteroid.disableBody(true,true);
  score += 5;
  scoreText.setText('Score:' + score);
}

// Ship collides with Asteroid
function hitAsteroid(player, asteroid) {

gameOverText.visible = true;
gameOver = true;
scene.scene.pause();
restart();
}

// Displays restart game buton when game ends
function restart() {
  let gameover = document.getElementById("game-over");
  if (gameover.style.display === "none") {
    gameover.style.display = "block";
  } else {
    gameover.style.display = "none";
  }
}
