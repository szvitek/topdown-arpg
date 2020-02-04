import Phaser from "phaser";

export default class Coins extends Phaser.Physics.Arcade.StaticGroup {
  constructor(world, scene, children, spriteArray) {
    super(world, scene, children);
    this.scene = scene;

    // add the spriteArray coins to group
    for (const coin of spriteArray) {
      world.enable(coin, 1);
      coin.setScale(0.2);
      coin.body.setSize(coin.width * 0.2, coin.height * 0.2);
      this.add(coin);
    }

    this.refresh();
  }

  collectCoin(player, coin) {
    this.remove(coin);
    coin.destroy();

    // dispatch event
    this.scene.events.emit("coinCollected");
  }
}
