import Phaser from "phaser";

export default class UIScene extends Phaser.Scene {
  constructor(key) {
    super({ key: "UI", active: true });
    // active allows to run multiple scenes
  }

  init() {
    this.coinsCollected = 0;
  }

  create() {
    // create score text
    this.scoreText = this.add.text(12, 12, `Score: ${this.coinsCollected}`, {
      fontSize: "32px",
      fill: "#fff"
    });

    // create health text
    this.healthText = this.add.text(12, 50, `Health: 3`, {
      fontSize: "32px",
      fill: "#fff"
    });

    // get a reference to GameScene
    this.gameScene = this.scene.get("Game");

    // listen for events from GameScene
    this.gameScene.events.on("coinCollected", () => {
      this.coinsCollected++;
      this.scoreText.setText(`Score: ${this.coinsCollected}`);
    });

    this.gameScene.events.on("loseHealth", health => {
      this.healthText.setText(`Health: ${health}`);
    });

    this.gameScene.events.on("newGame", () => {
      this.coinsCollected = 0;
      this.scoreText.setText(`Score: ${this.coinsCollected}`);
      this.healthText.setText(`Health: 3`);
    });

    this.gameScene.events.on("playerCreate", health => {
      this.healthText.setText(`Health: ${health}`);
    });
  }
}
