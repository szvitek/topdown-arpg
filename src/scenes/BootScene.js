import Phaser from "phaser";

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
    this.load.tilemapTiledJSON("level1", "src/assets/tilemaps/level1.json");
    this.load.tilemapTiledJSON("level2", "src/assets/tilemaps/level2.json");

    // laad spritesheets
    this.load.spritesheet(
      "RPGpack_sheet",
      "src/assets/images/RPGpack_sheet.png",
      {
        frameWidth: 64,
        frameHeight: 64
      }
    );

    // laad in character spritesheet
    this.load.spritesheet(
      "characters",
      "src/assets/images/roguelikeChar_transparent.png",
      {
        frameWidth: 17,
        frameHeight: 17
      }
    );

    // laad in protal sprite
    this.load.image("portal", "src/assets/images/raft.png");

    // coin
    this.load.image("coin", "src/assets/images/coin.png");
  }

  create() {
    this.scene.start("Game", { level: 1, newGame: true, levels: this.levels });
  }
}
