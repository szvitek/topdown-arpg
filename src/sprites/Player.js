import Phaser from "phaser";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "characters", 325);

    this.health = 3;
    this.hitDelay = false;

    // enable physics
    this.scene.physics.world.enable(this);

    // add player to scene
    this.scene.add.existing(this);

    // scale player
    this.setScale(3);

    this.scene.events.emit("playerCreate", this.health);
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

  loseHealth() {
    this.health--;
    this.scene.events.emit("loseHealth", this.health);
    if (this.health === 0) {
      this.scene.loadNextLevel(true);
    }
  }

  enemyCollision(player, enemy) {
    if (!this.hitDelay) {
      this.loseHealth();
      this.hitDelay = true;
      this.tint = 0xff0000;
      this.scene.time.addEvent({
        delay: 1000,
        callback: () => {
          this.hitDelay = false;
          this.tint = 0xffffff;
        }
      });
    }
  }
}
