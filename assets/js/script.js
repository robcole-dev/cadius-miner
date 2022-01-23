// Function to display how to play instructions

function show() {
  let display = document.getElementById("display");
  if (display.style.display === "none") {
    display.style.display = "block";
  } else {
    display.style.display = "none";
  }
}

// Game 

const config = {
  type: Phaser.AUTO,
  parent: 'cadius-miner',
  width: 800,
  height: 600,
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

let player;
let asteroid;
let cursors;
let bullets;
let speed;
let stats;
let lastFired = 0;
let gameOver = false;
let score = 0;


const game = new Phaser.Game(config);

function preload (){
  this.load.image('sky','./assets/images/nebula.png');
  this.load.image('roid','./assets/images/grey-roid.png');
  this.load.image('ship','./assets/images/ship.png');
  this.load.image('bullet','./assets/images/bullet.png');
}

function create(){
  this.add.image(400,400,'sky');

  player = this.physics.add.sprite(400,600, 'ship');

  player.setCollideWorldBounds(true);

  cursors = this.input.keyboard.createCursorKeys();

  speed = Phaser.Math.GetSpeed(300,1);

  scoreText = this.add.text(0,0, 'Score: ', {fontSize: '16px', fill: '#00ff00'});


  asteroid = this.physics.add.group({
    defaultKey: 'roid',
    maxSize: 5,
    createCallback: function (roid) {
        roid.setName('roid' + this.getLength());

    },
    removeCallback: function (roid) {
    }
  });

  this.time.addEvent({
    delay: 100,
    loop: true,
    callback: addRoid
  });

  let Bullet = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,

    initialize:
    function Bullet (scene){
      Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
      this.speed = Phaser.Math.GetSpeed(400,1);
    },

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

  bullets = this.physics.add.group({
    classType: Bullet,
    maxSize: 10,
    runChildUpdate: true
  });

  this.physics.add.overlap(player, asteroid, hitAsteroid);

  this.physics.add.collider(bullets, asteroid, mined);

}

function update(time, delta){
  if (cursors.left.isDown)
    {player.x -= speed * delta;}
  else if (cursors.right.isDown)
    {player.x += speed * delta;}

  if(cursors.space.isDown && time > lastFired){
    var bullet = bullets.get();

    if (bullet){
      bullet.fire(player.x, player.y);
      lastFired = time + 50;
    }
  }

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

function activateRoid (roid, x, y) {
  roid
  .setActive(true)
  .setVisible(true)
  .setTint(Phaser.Display.Color.RandomRGB().color)
  .enableBody(true, x, 0, true, true);
}



function hitAsteroid(player, asteroid) {
  this.physics.pause();
  player.setTint(0xff0000);
  gameOver = True;
}

function mined(bullets, asteroid){
  asteroid.disableBody(true,true);
  score += 5;
  scoreText.setText('Score:' + score);
}