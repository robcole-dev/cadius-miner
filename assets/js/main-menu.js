/* jshint esversion: 8 */

// Main Menu Class
let mainMenu = new Phaser.Class ({
    Extends: Phaser.Scene,
    initialize: function mainMenu() {
        Phaser.Scene.call(this, {
            key: "mainMenu",
        });
    },
    // Preload for all images used in scene
    preload: function() {
        this.load.image('sky','assets/images/nebula.png');
    },
    // Create the scene
    create: function() {
        // Scene background
        this.add.image(400,400,'sky');
        // define scene as this
        scene = this;
        // Play text on screen
        playText = this.add.text(350,300,'Play', {fontSize: '50px', fill: '#00ff00'});

        playText.setInteractive();
        // Play text on click function move to next scene
        this.input.on('pointerdown', function(){
            scene.scene.start('mainGame');
        });
    },
});