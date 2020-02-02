import Phaser from "phaser";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "characters", 325);

    // enable physics
    this.scene.physics.world.enable(this);

    // add player to scene
    this.scene.add.existing(this);

    // scale player
    this.setScale(3);
  }

  update(cursors) {
    this.setVelocity(0);
    // check if up/down pressed
    if (cursors.up.isDown) {
      this.setVelocityY(-150);
    } else if (cursors.down.isDown) {
      this.setVelocityY(150);
    }

    // check if left/right is pressed
    if (cursors.left.isDown) {
      this.setVelocityX(-150);
    } else if (cursors.right.isDown) {
      this.setVelocityX(150);
    }
  }
}
