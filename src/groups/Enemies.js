import Phaser from "phaser";
import Enemy from "../sprites/Enemy";

export default class Enemies extends Phaser.Physics.Arcade.Group {
  constructor(world, scene, children, spriteArray) {
    super(world, scene, children);
    this.scene = scene;
    this.spriteFrames = [0, 1, 54, 55, 108, 109, 162, 163];

    // create enemies from the sprite array
    this.createEnemies(scene, spriteArray);
  }

  createEnemies(scene, spriteArray) {
    for (const sprite of spriteArray) {
      const randIndex = Phaser.Math.RND.between(
        0,
        this.spriteFrames.length - 1
      );

      // create new enemy
      const enemy = new Enemy(
        scene,
        sprite.x,
        sprite.y,
        this.spriteFrames[randIndex]
      );

      // add to the group
      this.add(enemy);

      // destroy the sprite
      sprite.destroy();
    }
  }
}
