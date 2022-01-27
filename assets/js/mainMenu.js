class mainMenu extends Phaser.Scene {
    constructor () {
        super('mainMenu');
    }

    preload() {
        this.load.image('sky','./assets/images/nebula.png');
    }

    create(data, startScene) {
        this.add.image(400,400,'sky');
        let scene;
        let playText;
        

        scene = this;

        playText = this.add.text(350,300,'Play', {fontSize: '50px', fill: '#00ff00'});

        playText.setInteractive();

        this.input.on('pointerdown', function(){
            scene.scene.start('mainGame');
        });
    }

    update(time, delta) {
        // Used to update your game. This function runs constantly
    }
}

export default mainMenu;