/* jshint esversion: 8 */

let mainMenu = new Phaser.Class ({
    Extends: Phaser.Scene,
    initialize: function mainMenu() {
        Phaser.Scene.call(this, {
            key: "mainMenu",
        });
    },
    
    preload: function() {
        this.load.image('sky','./assets/images/nebula.png');
    },

    create: function() {
        this.add.image(400,400,'sky');
        
        scene = this;

        playText = this.add.text(350,300,'Play', {fontSize: '50px', fill: '#00ff00'});

        playText.setInteractive();

        this.input.on('pointerdown', function(){
            scene.scene.start('mainGame');
        });
    },
});