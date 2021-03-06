import Phaser from "phaser";
import config from "./config";
import BootScene from "./scenes/BootScene";
import UIScene from "./scenes/UIScene";
import GameScene from "./scenes/GameScene";

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add("Boot", BootScene);
    this.scene.add("Game", GameScene);
    this.scene.add("UI", UIScene);
    this.scene.start("Boot");
  }
}

window.game = new Game();

window.onresize = () => {
  window.game.scale.resize(window.innerWidth, window.innerHeight);
};
