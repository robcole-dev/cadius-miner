// Get the modal
var popup = document.getElementById("myPopup");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  popup.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  popup.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == popup) {
    popup.style.display = "none";
  }
}

// Game 

var config = {
  type: Phaser.AUTO,
  parent: 'gamearea',
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

var player;
var group;
var cursors;
var bullets;
var speed;
var stats;
var lastFired = 0;

var game = new Phaser.Game(config);

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

  group = this.add.group({
    defaultKey: 'roid',
    maxSize: 80,
    createCallback: function (roid) {
        roid.setName('roid' + this.getLength());
        console.log('Created', roid.name);
    },
    removeCallback: function (roid) {
        console.log('Removed', roid.name);
    }
  });

  this.time.addEvent({
    delay: 100,
    loop: true,
    callback: addRoid
  });

  var Bullet = new Phaser.Class({
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

  bullets = this.add.group({
    classType: Bullet,
    maxSize: 10,
    runChildUpdate: true
  });
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

  Phaser.Actions.IncY(group.getChildren(), 1);

  group.children.iterate(function (roid) {
      if (roid.y > 600) {
        group.killAndHide(roid);
      }
  });
}

function activateRoid (roid) {
  roid
  .setActive(true)
  .setVisible(true)
  .setTint(Phaser.Display.Color.RandomRGB().color)
}

function addRoid () {
  // Random position above screen
  const x = Phaser.Math.Between(10, 800);
  const y = Phaser.Math.Between(-64, 0);

  // Find first inactive sprite in group or add new sprite, and set position
  const roid = group.get(x, y);

  // None free or already at maximum amount of sprites in group
  if (!roid) return;

  activateRoid(roid);
}