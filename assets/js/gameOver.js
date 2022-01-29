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

        // add background to game
        this.add.image(400,400,'sky');

        gameOverText = this.add.text(400,300, 'GAME OVER!!!', {fontSize: '50px', fill: '#00ff00'});
        gameOverText.setOrigin(0.5);
        scoreText = this.add.text(400,350, 'You scored ' + score, {fontSize: '50px', fill: '#00ff00'});
        scoreText.setOrigin(0.5);
    },

    update: function() {
        // Used to update your game. This function runs constantly
    },
})