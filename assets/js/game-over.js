/* jshint esversion: 8 */

// New Scene class
let gameOver = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function(){
        Phaser.Scene.call(this,{
        key: "gameOver",
        });
    },
    // Preload Images for Scene
    preload: function() {
        this.load.image('sky','assets/images/nebula.png');
    },
    // Create the Scene
    create: function() {
        // define scene as this
        scene = this;
        let hscore;
        // define highscore as the players local storage score
        let highscore = localStorage.getItem(hscore);
        // If score is higher than highscore write it to local storage
        if (score > highscore){
            highscore = score;
            localStorage.setItem(hscore, highscore);
        }

        // add background to game
        this.add.image(400,400,'sky');
        // Game over text
        gameOverText = this.add.text(400,200, 'GAME OVER!!!', {fontSize: '50px', fill: '#00ff00'});
        gameOverText.setOrigin(0.5);
        // Score text
        scoreText = this.add.text(400,250, 'You scored ' + score, {fontSize: '50px', fill: '#00ff00'});
        scoreText.setOrigin(0.5);
        // Highscore text
        highscoreText = this.add.text(400,300, 'Your Highscore ' + highscore, {fontSize: '50px', fill: '#00ff00'});
        highscoreText.setOrigin(0.5);
        // retry text
        retryText = this.add.text(400,450, 'Click to try again!', {fontSize: '50px', fill: '#00ff00'});
        retryText.setOrigin(0.5);
        // click to next scene for retry
        this.input.on('pointerdown', function(){
            scene.scene.start('mainMenu');
        });
    },
});