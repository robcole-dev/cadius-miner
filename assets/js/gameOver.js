/* jshint esversion: 8 */

let gameOver = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function(){
        Phaser.Scene.call(this,{
        key: "gameOver",
        })
    },

    preload: function() {
        this.load.image('sky','./assets/images/nebula.png');
    },

    create: function() {
        scene = this
        let hscore
        let highscore = localStorage.getItem(hscore)

        if (score > highscore){
            highscore = score
            localStorage.setItem(hscore, highscore)
        }

        // add background to game
        this.add.image(400,400,'sky');

        gameOverText = this.add.text(400,200, 'GAME OVER!!!', {fontSize: '50px', fill: '#00ff00'});
        gameOverText.setOrigin(0.5);
        scoreText = this.add.text(400,250, 'You scored ' + score, {fontSize: '50px', fill: '#00ff00'});
        scoreText.setOrigin(0.5);
        highscoreText = this.add.text(400,300, 'Your Highscore ' + highscore, {fontSize: '50px', fill: '#00ff00'});
        highscoreText.setOrigin(0.5);
        retryText = this.add.text(400,450, 'Click to try again!', {fontSize: '50px', fill: '#00ff00'});
        retryText.setOrigin(0.5);

        this.input.on('pointerdown', function(){
            scene.scene.start('mainMenu');
        });
    },
})