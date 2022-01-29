function addRoid() {
    // Random position above screen
    const x = Phaser.Math.Between(10, 800);
    const y = Phaser.Math.Between(-64, 0);

    // Find first inactive sprite in group or add new sprite, and set position
    const roid = asteroid.get(x, y);

    // None free or already at maximum amount of sprites in group
    if (!roid) return;

    activateRoid(roid, x, y);
  }
  // Additional Asteroid spawn code
  function activateRoid(roid, x, y) {
      roid
      .setActive(true)
      .setVisible(true)
      .setTint(Phaser.Display.Color.RandomRGB().color)
      .enableBody(true, x, 0, true, true);
  }

  // Update Score function
  function mined(bullets, asteroid){
      asteroid.disableBody(true,true);
      score += 5;
      scoreText.setText('Score:' + score);
  }

  // Ship collides with Asteroid
  function hitAsteroid(player, asteroid) {
      gameOverText.visible = true;
      gameOver = true;
      scene.scene.pause();
  }