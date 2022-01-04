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
      gravity: {y: 0},
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
var roid1;
var roid2;
var roid3;
var roid4;
var roid5;
var cursors;

var game = new Phaser.Game(config);

function preload (){
  this.load.image('sky','./assets/images/nebula.png');
  this.load.image('red-roid','./assets/images/red-roid.png');
  this.load.image('aqua-roid','./assets/images/aqua-roid.png');
  this.load.image('gold-roid','./assets/images/gold-roid.png');
  this.load.image('grey-roid','./assets/images/grey-roid.png');
  this.load.image('orange-roid','./assets/images/orange-roid.png');
  this.load.image('ship','./assets/images/ship.png');
}

function create(){
  this.add.image(400,400,'sky');

  player = this.physics.add.sprite(400,600, 'ship');

  player.setCollideWorldBounds(true);

  cursors = this.input.keyboard.createCursorKeys();

}

function update(){
  if (cursors.left.isDown){
    player.setVelocityX(-160)
  }
  else if (cursors.right.isDown){
    player.setVelocityX(160)
  }
  else {
    player.setVelocityX(0)
  }
}