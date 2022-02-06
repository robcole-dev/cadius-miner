/* jshint esversion: 8 */

// Game Configuration
let config = {
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
    }
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: [
    mainMenu, 
    mainGame, 
    gameOver
  ],
};

let game = new Phaser.Game(config);