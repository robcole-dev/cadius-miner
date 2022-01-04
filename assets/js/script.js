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
  width:600,
  height:800,
  parent: 'game-area',
  autoCenter: Phaser.Scale.CenterType,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 300},
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);

function preload (){
  this.load.image('sky','../images/nebula.png');
  this.load.image('red-roid','../images/red-roid.png');
  this.load.image('aqua-roid','../images/aqua-roid.png');
  this.load.image('gold-roid','../images/gold-roid.png');
  this.load.image('grey-roid','../images/grey-roid.png');
  this.load.image('orange-roid','../images/orange-roid.png');
  this.load.image('ship','../images/ship.png');
}

function create(){
  this.add.image(500,700, 'sky');
}

function update(){

}