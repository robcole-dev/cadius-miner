/* jshint esversion: 8 */

let player
let asteroid
let cursors
let bullets
let speed
let stats
let lastFired = 0
let score = 0
let scene
let mainGame = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function (){
        Phaser.Scene.call(this,{
        key: "mainGame",
    })
},

    preload: function() {
        // Preload for all images used in game
        this.load.image('sky','assets/images/nebula.png');
        this.load.image('roid','assets/images/grey-roid.png');
        this.load.image('ship','assets/images/ship.png');
        this.load.image('bullet','assets/images/bullet.png');
        this.load.spritesheet('boom', 'assets/images/boom.png', { frameWidth: 32, frameHeight: 32, endFrame: 32 });
    },

    create: function() {
        // defining this as scene
        scene = this;
        score = 0
        // add background to game
        this.add.image(400,400,'sky');
        
        //Defines player and asigns the the image
        player = this.physics.add.sprite(400,600, 'ship').setInteractive({draggable: true});
        //Defines explosion and sets image
        this.anims.create({
            key: 'bang',
            frames: this.anims.generateFrameNumbers('boom'),
            frameRate: 10
        });
        
        // Controls for Mobile device
        player.on('drag', function(pointer, dragX){
            this.x = dragX;
        });

        this.input.addPointer(2);

        pointer1 = this.input.pointer1;
        pointer2 = this.input.pointer2;

        //Sets player to collide with world boundries
        player.setCollideWorldBounds(true);

        // Controls for keyboard
        cursors = this.input.keyboard.createCursorKeys();

        // Defines the varable speed
        speed = Phaser.Math.GetSpeed(300,1);

        // text overlay for score and game over.
        scoreText = this.add.text(0,0, 'Score: ', {fontSize: '25px', fill: '#00ff00'});

        // Asteroid
        asteroid = this.physics.add.group({
            defaultKey: 'roid',
            maxSize: 25,
            createCallback: function (roid) {
                roid.setName('roid' + this.getLength());
            },
            removeCallback: function (roid) {
            }
        });

        // Bullets
        this.time.addEvent({
            delay: 100,
            loop: true,
            callback: this.addRoid
        });

        let bullet = new Phaser.Class({
            Extends: Phaser.GameObjects.Image,
            // sets the bullets image and speed
            initialize:
            function bullet (scene){
                Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
                this.speed = Phaser.Math.GetSpeed(400,1);
            },
            // gets current position of ship when fire is triggered
            fire: function (x,y){
                this.setPosition(x, y - 50);
                this.setActive(true);
                this.setVisible(true);
            },

            update: function (time, delta){
                this.y -= this.speed * delta;

                if (this.y < -50){
                    this.setActive(false);
                    this.setVisible(false);
                }
            }
        });
        // creates a group for the bullets and sets a class and max number
        bullets = this.physics.add.group({
            classType: bullet,
            maxSize: 10,
            runChildUpdate: true
        });

        // Collider for player and asteroids
        this.physics.add.collider(player, asteroid, this.hitAsteroid);

        // Collider for bullets and asteroids
        this.physics.add.collider(bullets, asteroid, this.mined);

    },

    update: function(time, delta) {
          // Keyboard commands for moving player
        if (cursors.left.isDown)
            {player.x -= speed * delta;}
        else if (cursors.right.isDown)
            {player.x += speed * delta;}

        // Keyboard command for shooting
        if(cursors.space.isDown && time > lastFired){
            let bullet = bullets.get();

            if (bullet){
                bullet.fire(player.x, player.y);
                lastFired = time + 50;
            }
        }

        // controls for shooting on mobile device
        if (pointer2.isDown && time > lastFired){
            var bullet = bullets.get();

            if (bullet){
                bullet.fire(player.x, player.y);
                lastFired = time + 50;
            }
        }

        // Asteroids spawning
        Phaser.Actions.IncY(asteroid.getChildren(), 1);

        asteroid.children.iterate(function (roid) {
            if (roid.y > 600) {
            asteroid.killAndHide(roid);
            }
        });
    },
    addRoid() {
        // Random position above screen
        const x = Phaser.Math.Between(10, 800);
        const y = Phaser.Math.Between(-64, 0);
    
        // Find first inactive sprite in group or add new sprite, and set position
        const roid = asteroid.get(x, y);
    
        // None free or already at maximum amount of sprites in group
        if (!roid) return;
    
        scene.activateRoid(roid, x, y);
    },
    // Additional Asteroid spawn code
    activateRoid(roid, x, y) {
        roid
        .setActive(true)
        .setVisible(true)
        .setTint(Phaser.Display.Color.RandomRGB().color)
        .enableBody(true, x, 0, true, true);
    },
    // Update Score function
    mined(bullet, asteroid){
        score += 5;
        scoreText.setText('Score:' + score);
        let blipp = scene.add.sprite(asteroid.x +16, asteroid.y, "bang").play("bang");
        blipp.once("animationcomplete", function(){
            blipp.destroy();
        });
        asteroid.setActive(false);
        asteroid.setVisible(false);
        bullet.setActive(false);
        bullet.setVisible(false); 
    },
    // Ship collides with Asteroid
    hitAsteroid(player, asteroid) {
        scene.scene.start('gameOver');
    },  
})