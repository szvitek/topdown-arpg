import Phaser from "phaser";
import level1 from "../../src/assets/tilemaps/level1.json";
import level2 from "../../src/assets/tilemaps/level2.json";
import RPGpack from "../../src/assets/images/RPGpack_sheet.png";
import charecters from "../../src/assets/images/roguelikeChar_transparent.png";
import portal from "../../src/assets/images/raft.png";
import coin from "../../src/assets/images/coin.png";
import bullet from "../../src/assets/images/ball.png";

export default class BootScene extends Phaser.Scene {
  constructor(key) {
    super(key);
  }

  preload() {
    this.levels = {
      1: "level1",
      2: "level2"
    };
    // load the tilemap
    this.load.tilemapTiledJSON("level1", level1);
    this.load.tilemapTiledJSON("level2", level2);

    // laad spritesheets
    this.load.spritesheet("RPGpack_sheet", RPGpack, {
      frameWidth: 64,
      frameHeight: 64
    });

    // laad in character spritesheet
    this.load.spritesheet("characters", charecters, {
      frameWidth: 17,
      frameHeight: 17
    });

    // laad in protal sprite
    this.load.image("portal", portal);

    // coin
    this.load.image("coin", coin);

    // bullet
    this.load.image("bullet", bullet);
  }

  create() {
    this.scene.start("Game", { level: 1, newGame: true, levels: this.levels });
  }
}
