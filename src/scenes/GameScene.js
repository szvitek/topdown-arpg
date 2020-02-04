import Phaser from "phaser";
import Player from "../sprites/Player";
import Portal from "../sprites/Portal";
import Coins from "../groups/Coins";

export default class GameScene extends Phaser.Scene {
  constructor(key) {
    super(key);
  }

  init(data) {
    this._LEVEL = data.level;
    this._LEVELS = data.levels;
    this._NEWGAME = data.newGame;
    this.loadingLevel = false;
  }

  create() {
    // listen for player input
    this.cursors = this.input.keyboard.createCursorKeys();

    this.createMap();
    this.createPlayer();
    this.createPortal();
    this.coins = this.map.createFromObjects("Coins", "Coin", {
      key: "coin"
    });
    this.coinsGroup = new Coins(this.physics.world, this, [], this.coins);

    // add collisions
    this.addCollisions();

    // update camera
    this.cameras.main.startFollow(this.player);
  }

  update() {
    this.player.update(this.cursors);
  }

  createMap() {
    // add water
    this.add.tileSprite(0, 0, 8000, 8000, "RPGpack_sheet", 31);

    // create the tilemap
    this.map = this.make.tilemap({ key: this._LEVELS[this._LEVEL] });
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
      if (this._NEWGAME && this._LEVEL === 1) {
        if (obj.type === "StartingPosition") {
          this.player = new Player(this, obj.x, obj.y);
        }
      } else {
        if (obj.type === "StartingPositionPortal") {
          this.player = new Player(this, obj.x, obj.y);
        }
      }
    });
  }

  createPortal() {
    this.map.findObject("Portal", obj => {
      if (this._LEVEL === 1) {
        this.portal = new Portal(this, obj.x, obj.y - 68);
      } else if (this._LEVEL === 2) {
        this.portal = new Portal(this, obj.x, obj.y + 70);
      }
    });
  }

  addCollisions() {
    this.physics.add.collider(this.player, this.blockedLayer);
    this.physics.add.overlap(
      this.player,
      this.portal,
      this.loadNextLevel.bind(this)
    );
    this.physics.add.overlap(
      this.coinsGroup,
      this.player,
      this.coinsGroup.collectCoin.bind(this.coinsGroup)
    );
  }

  loadNextLevel() {
    if (!this.loadingLevel) {
      this.cameras.main.fade(500);
      this.cameras.main.on("camerafadeoutcomplete", () => {
        if (this._LEVEL === 1) {
          this.scene.restart({
            level: 2,
            levels: this._LEVELS,
            newGame: false
          });
        } else if (this._LEVEL === 2) {
          this.scene.restart({
            level: 1,
            levels: this._LEVELS,
            newGame: false
          });
        }
      });
      this.loadingLevel = true;
    }
  }
}
