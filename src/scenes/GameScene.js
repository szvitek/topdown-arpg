import Phaser from "phaser";
import Player from "../sprites/Player";

export default class GameScene extends Phaser.Scene {
  constructor(key) {
    super(key);
  }

  preload() {}

  create() {
    // listen for player input
    this.cursors = this.input.keyboard.createCursorKeys();

    this.createMap();

    this.createPlayer();

    // add collisions
    this.addCollisions();

    // update camera
    this.cameras.main.startFollow(this.player);
  }

  update() {
    this.player.update(this.cursors);
  }

  createMap() {
    // create the tilemap
    this.map = this.make.tilemap({ key: "level1" });
    // add tilest image
    this.tiles = this.map.addTilesetImage("RPGpack_sheet");
    // create our layers
    this.backgroundLayer = this.map.createStaticLayer(
      "Background",
      this.tiles,
      0,
      0
    );
    this.blockedLayer = this.map.createStaticLayer("Blocked", this.tiles, 0, 0);
    // add collisions for all tiles in the layer
    this.blockedLayer.setCollisionByExclusion([-1]);
  }

  createPlayer() {
    this.map.findObject("Player", obj => {
      if (obj.type === "StartingPosition") {
        this.player = new Player(this, obj.x, obj.y);
      }
    });
  }

  addCollisions() {
    this.physics.add.collider(this.player, this.blockedLayer);
  }
}
