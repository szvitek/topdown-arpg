import Phaser from "phaser";

export default class Bullets extends Phaser.Physics.Arcade.Group {
  constructor(world, scene) {
    // if I pass children as a 3rd arg, it's messing up the physics body
    // probably same thing happened to coins group
    super(world, scene);
    this.scene = scene;

    this.createMultiple({
      frameQuantity: 5,
      key: "bullet",
      active: false,
      visible: false
    });
  }

  enemyCollision(bullet, enemy) {
    bullet.disableBody();
    bullet.active = false;
    bullet.visible = false;
    enemy.loseHealth();
  }

  fireBullet(x, y, direction) {
    const bullet = this.getFirstDead(false);
    if (bullet) {
      bullet.enableBody(true);
      bullet.active = true;
      bullet.visible = true;
      bullet.setPosition(x, y);
      bullet.setScale(0.1);

      switch (direction) {
        case "up": {
          bullet.setVelocityY(-300);
          break;
        }
        case "down": {
          bullet.setVelocityY(300);
          break;
        }
        case "left": {
          bullet.setVelocityX(-300);
          break;
        }
        case "right": {
          bullet.setVelocityX(300);
          break;
        }
        default: {
          bullet.setVelocityY(-300);
          break;
        }
      }

      this.scene.time.addEvent({
        delay: 1500,
        callback: () => {
          bullet.disableBody();
          bullet.active = false;
          bullet.visible = false;
          bullet.setVelocity(0);
        }
      });
    }
  }
}
