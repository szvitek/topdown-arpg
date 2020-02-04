import Phaser from "phaser";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, frame) {
    super(scene, x, y, "characters", frame);

    // enable physics
    this.scene.physics.world.enable(this);

    // add player to scene
    this.scene.add.existing(this);

    // scale player
    this.setScale(3);

    // move our enemy
    this.scene.time.addEvent({
      delay: 3000,
      callback: () => this.move(),
      loop: true
    });
  }

  move() {
    const randIndex = Phaser.Math.RND.between(1, 4);
    switch (randIndex) {
      case 1: {
        this.setVelocityX(100);
        break;
      }
      case 2: {
        this.setVelocityX(-100);
        break;
      }
      case 3: {
        this.setVelocityY(100);
        break;
      }
      case 4: {
        this.setVelocityY(-100);
        break;
      }
      default: {
        break;
      }
    }

    // move our enemy
    this.scene.time.addEvent({
      delay: 500,
      callback: () => this.setVelocity(0)
    });
  }
}
