import Phaser from "phaser";

export default class Portal extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "portal");

    // enable physics
    this.scene.physics.world.enable(this);

    // add player to scene
    this.scene.add.existing(this);
  }
}
