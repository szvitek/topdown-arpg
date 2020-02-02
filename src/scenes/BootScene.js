import Phaser from "phaser";

export default class BootScene extends Phaser.Scene {
  constructor(key) {
    super(key);
  }

  preload() {
    // load the tilemap
    this.load.tilemapTiledJSON("level1", "src/assets/tilemaps/level1.json");

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
  }

  create() {
    this.scene.start("Game");
  }
}
