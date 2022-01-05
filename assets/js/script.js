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

var game = new Phaser.Game(config);

function preload (){
  this.load.image('sky','./assets/images/nebula.png');
  this.load.image('red-roid','./assets/images/red-roid.png');
  this.load.image('aqua-roid','./assets/images/aqua-roid.png');
  this.load.image('gold-roid','./assets/images/gold-roid.png');
  this.load.image('roid','./assets/images/grey-roid.png');
  this.load.image('orange-roid','./assets/images/orange-roid.png');
  this.load.image('ship','./assets/images/ship.png');
}

function create(){
  this.add.image(400,400,'sky');

  player = this.physics.add.sprite(400,600, 'ship');

  player.setCollideWorldBounds(true);

  cursors = this.input.keyboard.createCursorKeys();

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

// You could also fill the group first:
// group.createMultiple({
//     active: false,
//     key: group.defaultKey,
//     repeat: group.maxSize - 1
// });

this.time.addEvent({
    delay: 100,
    loop: true,
    callback: addRoid
});

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