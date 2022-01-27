/* jshint esversion: 8 */

// Function to display how to play instructions

function show() {
  let display = document.getElementById("display");
  if (display.style.display === "none") {
    display.style.display = "block";
  } else {
    display.style.display = "none";
  }
};


// Game
import mainMenu from './mainMenu.js';
import mainGame from './mainGame.js';
import gameOver from './gameOver.js';


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
  scene: [mainMenu, mainGame, gameOver]
};

let game = new Phaser.Game(config);
