import ParentScene from "@holywater-tech/ads-builder/framework/components/Scene";
import Background from "@holywater-tech/ads-builder/framework/components/ui/Background";
import { EVENTS, SLOT1 } from "./constants/Constants";
import Machine from "./Machine";
// import { Header } from "./Header";
// import { Footer } from "./Footer";
import { Win } from "./Win";
import Hall from "./Hall";
import Buttons from "./Buttons";
import CoinBox2 from "./CoinBox2";
import Utils from "@holywater-tech/ads-builder/framework/Utils";

export default class Game extends ParentScene {
  create() {
    this.totalCoins = 60000000;
    this.addBackground("bg");
    this.machineNum = 2;
    this.step = 0;
    this.addHall();
    this.initListeners();
    this.moveCameraToCenter();
    this.addCoinBox2();

    // this.finalScene();

    setTimeout(() => {
      // this.addCta();
      this.addLogo();
      this.addArrow();
    }, 3000);
  }

  initListeners() {
    this.emitter.on("final", () => this.final(), this);
    this.emitter.on("confirm", () => this.onConfirm(), this);
    this.emitter.on("moveLeftCamera", () => this.moveLeftCamera(), this);
    this.emitter.on("moveRightCamera", () => this.moveRightCamera(), this);
  }

  final() {
    this.addWin();
  }

  onConfirm() {
    this.hideAnim(this.arrowLeft);
    this.hideAnim(this.arrowRight);
    this.hideAnim(this.confirm);
    this.addTitle();
  }
  moveLeftCamera() {
    this.tweens.add({
      targets: [this.bg, this.hall],
      x: "+=540",
      duration: 1000,
    });
  }
  moveRightCamera() {
    this.tweens.add({
      targets: [this.bg, this.hall],
      x: "-=540",
      duration: 1000,
    });
  }
  moveCameraToCenter() {
    this.cameras.main.scrollX = -700;
    const centerX = this.cameras.main.width / 2;
    this.tweens.add({
      targets: [this.bg, this.hall],
      scale: "*=1.5",
      duration: 3000,
      ease: "Power2",
      delay: 2000,
    });
    this.cameras.main.setOrigin(0.5, 1);
    this.cameras.main.pan(centerX, this.cameras.main.centerY, 3000, "Power2");
  }
  addHighlight(duration) {
    if (!duration) return;
    this.blue = this.add
      .image(0, 0, "popup_blue")
      .setCustomPosition(0, 0, 0, 0)
      .setCustomAlign("Center")
      .setDepth(50)
      .setAlpha(0)
      .setScale(0.7);
    this.pink = this.add
      .image(0, 0, "popup_pink")
      .setCustomPosition(0, 0, 0, 0)
      .setCustomAlign("Center")
      .setDepth(50)
      .setAlpha(0)
      .setScale(0.7);
    this.tweens.add({
      targets: [this.pink],
      angle: "+=360",
      duration,
      delay: 200,
      onStart: () => {
        this.pink.setAlpha(1);
      },
      onComplete: () => {
        this.pink.setAlpha(0);
      },
    });
    this.tweens.add({
      targets: [this.blue],
      angle: "+=360",
      duration,
      delay: 200,
      onStart: () => {
        this.blue.setAlpha(1);
      },
      onComplete: () => {
        this.blue.setAlpha(0);
      },
    });
    this.mainContainer.add([this.blue, this.pink]);
    this.sort();
  }
  winAnimation() {
    this.win = new Win(this).setScale(0).setDepth(100);
    this.mainContainer.add([this.win]);
    this.sort();
  }
  finalScene() {
    this.addCoins();
    this.addCta();
    this.game.network.addClickToStore(this.bg);
    this.won = this.add
      .image(0, 0, "won")
      .addProperties(["pos", "scale"])
      .setCustomPosition(0, 0, 0, 0)
      .setCustomAlign("Center")
      .setDepth(50)
      .setAlpha(0)
      .setCustomScale(1, 1, 0.7, 0.7);
    this.won_text = this.add
      .text(0, 0, "11 000 000", {
        font: `bold 55px BerlinSansFBDemiBold`,
        fill: "#F9E90F",
        shadow: {
          offsetX: 5,
          offsetY: 5,
          color: "#000",
          blur: 10,
          stroke: true,
          fill: true,
        },
        letterSpacing: 10,
        stroke: "#000",
        strokeThickness: 10,
      })
      .addProperties(["pos", "scale"])
      .setCustomPosition(0, 30, 0, 30)
      .setCustomAlign("Center")
      .setDepth(120)
      .setAlpha(0)
      .setOrigin(0.5, 0.5);
    this.tweens.add({
      targets: [this.won, this.won_text],
      alpha: 1,
      duration: 700,
    });
    this.mainContainer.add([this.won, this.won_text]);
    this.sort();
  }
  add3x(img, delay = 1800, hightliteDuration) {
    Utils.addAudio(this, "win2", 0.5, false);
    this.treeX = this.add
      .image(0, 0, img)
      .setCustomPosition(0, 0, 0, 0)
      .setCustomAlign("Center")
      .setDepth(100)
      .setScale(0);
    this.tweens.add({
      targets: [this.treeX],
      scale: 0.7,
      duration: 200,
    });
    this.tweens.add({
      targets: [this.treeX],
      scale: 0,
      y: "+=300",
      alpha: 0,
      duration: 200,
      delay,
    });
    this.addHighlight(hightliteDuration);
    this.mainContainer.add([this.treeX]);
    this.sort();
  }
  addArrow() {
    this.arrowLeft = this.add
      .image(0, 0, "atlas", "left")
      .addProperties(["pos"])
      .setCustomPosition(60, 100, 60, 100)
      .setCustomAlign("Left")
      .setDepth(100);
    this.arrowRight = this.add
      .image(0, 0, "atlas", "right")
      .addProperties(["pos"])
      .setCustomPosition(-60, 100, -60, 100)
      .setCustomAlign("Right")
      .setDepth(100);
    this.confirm = this.add
      .image(0, 0, "atlas", "confirm")
      .addProperties(["pos"])
      .setCustomPosition(0, -150, 0, -140)
      .setCustomAlign("Bottom")
      .setDepth(100);
    this.confirm.setInteractive().on("pointerdown", () => {
      this.emitter.emit("confirm");
    });
    this.arrowLeft.setInteractive().on("pointerdown", () => {
      this.emitter.emit("moveLeftCamera");
      this.machineNum--;
      if (this.machineNum === 1) {
        this.hideAnim(this.arrowLeft);
      }
      if (this.machineNum < 3) {
        this.showAnim(this.arrowRight);
      }
    });
    this.arrowRight.setInteractive().on("pointerdown", () => {
      this.emitter.emit("moveRightCamera");
      this.machineNum++;
      if (this.machineNum === 3) {
        this.hideAnim(this.arrowRight);
      }
      if (this.machineNum > 1) {
        this.showAnim(this.arrowLeft);
      }
    });
    this.arrowAnim = this.tweens.add({
      targets: [this.arrowLeft, this.arrowRight, this.confirm],
      scale: "*=1.1",
      duration: 500,
      yoyo: true,
      repeat: -1,
    });
    this.mainContainer.add([this.arrowLeft, this.arrowRight, this.confirm]);
    this.sort();
  }
  addTitle() {
    this.title = this.add
      .image(0, 0, "title_press")
      .addProperties(["pos", "scale"])
      .setCustomPosition(0, 100, 0, 100)
      .setCustomScale(0.7, 0.7, 0.7, 0.7)
      .setAlpha(0)
      .setCustomAlign("Center")
      .setDepth(100);
    this.tweens.add({
      targets: this.title,
      alpha: 1,
      duration: 300,
      onComplete: () => {
        this.input.once("pointerdown", () => {
          // this.emitter.emit("spin");
          this.hideAnim(this.title);
          const machine = {
            1: "machine5",
            2: "machine4",
            3: "machine3",
          };
          this.hall[machine[this.machineNum]].start();
        });
      },
    });
    this.mainContainer.add([this.title]);
    this.sort();
  }
  addCoinBox2() {
    this.coinBox2 = new CoinBox2(this)
      .addProperties(["pos"])
      .setCustomPosition(0, 150, 0, 150)
      .setCustomAlign("Center")
      .setScale(0.7)
      .setAlpha(0)
      .setDepth(69);
    this.mainContainer.add([this.coinBox2]);
    this.sort();
  }
  hideAnim(targets) {
    this.tweens.add({
      targets,
      alpha: 0,
      duration: 300,
    });
  }
  showAnim(targets) {
    this.tweens.add({
      targets,
      alpha: 1,
      duration: 300,
    });
  }
  addBackground(bg, options = {}) {
    this[bg] = new Background(this, bg, true, [2.2, 2.2, 1.7, 1.7])
      .setDepth(options.depth || 4)
      .setAlpha(1);

    this.mainContainer.add([this[bg]]);
    this.sort();
  }
  addHall(options) {
    this.hall = new Hall(this, options);
    this.mainContainer.add([this.hall]);
    this.sort();
  }
  addMachine(options) {
    this.machine = new Machine(this, options);
    this.mainContainer.add([this.machine]);
    this.sort();
  }

  addCoins() {
    this.partc = this.add
      .particles("atlas", "coin1")
      .addProperties(["pos"])
      .setCustomPosition(0, 0, 0, 0)
      .setDepth(49);

    const emitter = this.partc.createEmitter({
      frame: ["coins1", "coins2", "coins3", "coins4"],
      x: 0,
      y: 0,
      angle: { start: 0, end: 360 },
      speedY: { min: -400, max: 500 },
      speedX: { min: -400, max: 500 },
      lifespan: 2400,
      scale: { start: 0.4, end: 0.5 },
      frequency: 100,
      quantity: 2,
      // blendMode: "ADD",
      // on: false,
    });
    this.mainContainer.add([this.partc]);
    this.sort();
    // this.addBigWin();

    const stopEmitter = () => {
      emitter.stop();
      this.time.delayedCall(1400, () => this.partc.destroy());
    };
    // this.time.delayedCall(2000, stopEmitter, [], this);
  }

  addBigWin() {
    this.big_win = this.add
      .image(0, 0, "atlas", "big_win")
      .addProperties(["pos"])
      .setCustomPosition(0, 0, 0, 0)
      .setCustomAlign("Center")
      .setDepth(300)
      .setAlpha(0);

    this.tweens.add({
      targets: this.big_win,
      alpha: 1,
      duration: 200,
      hold: 2300,
      yoyo: true,
    });
    setTimeout(() => this.emitter.emit(EVENTS.NEXT_SCENE), 4000);
  }

  addNextRound() {
    this.text2 = this.add
      .image(0, 0, "text2")
      .addProperties(["pos"])
      .setCustomPosition(2000, 0, 2000, 0)
      .setCustomAlign("Center")
      .setCustomScale(0.5, 0.5, 0.5, 0.5)
      .setDepth(100);
    this.text3 = this.add
      .image(0, 0, "text3")
      .addProperties(["pos"])
      .setCustomPosition(2000, 0, 2000, 0)
      .setCustomAlign("Center")
      .setCustomScale(0.5, 0.5, 0.5, 0.5)
      .setDepth(100);
    this.tweens.add({
      targets: this.text2,
      px: 0,
      lx: 0,
      duration: 500,
      hold: 1000,
    });
    this.tweens.add({
      targets: this.text2,
      px: -2000,
      lx: -2000,
      duration: 500,
      hold: 1000,
      delay: 1500,
    });
    this.tweens.add({
      targets: this.text3,
      px: 0,
      lx: 0,
      duration: 500,
      hold: 1000,
      delay: 2000,
    });
    this.tweens.add({
      targets: this.text3,
      px: -2000,
      lx: -2000,
      duration: 500,
      hold: 1000,
      delay: 3500,
      onComplete: () => {
        this.text2.destroy();
        this.text3.destroy();
      },
    });
    this.mainContainer.add([this.text2, this.text3]);
    this.sort();
  }
  addWin(options) {
    this.addBackground("bg2", { depth: 450, disable: true });
    this.game.network.addClickToStore(this.bg2);
    this.win = new Win(this).setDepth(500);
    this.mainContainer.add([this.win]);
    this.sort();
  }
  addHeader() {
    this.header = new Header(this);
    this.mainContainer.add([this.header]);
    this.sort();
  }

  addFooter() {
    this.footer = new Footer(this);
    this.mainContainer.add([this.footer]);
    this.sort();
  }

  addLogo() {
    this.logo = this.add
      .image(0, 0, "logo3")
      .addProperties(["pos"])
      .setCustomPosition(70, 70, 70, 70)
      .setCustomAlign("Top Left")
      .setCustomScale(1.5, 1.5, 1.5, 1.5)
      .setDepth(100);
    this.logo.setInteractive().on("pointerdown", () => {
      this.openStore();
    });
    this.mainContainer.add([this.logo]);
    this.sort();
  }
  addCta() {
    this.cta = new Buttons(
      this,
      // "btn_download",
      "button",
      { lx: -200, ly: 0, px: 100, py: 100 },
      () => this.openStore()
    )
      .setCustomScale(0.4, 0.4, 0.4, 0.3)
      .setDepth(99);
    this.tweens.add({
      targets: this.cta,
      scale: "*=0.95",
      duration: 500,
      repeat: -1,
      yoyo: true,
    });
    this.mainContainer.add([this.cta]);
    this.sort();
  }

  openStore() {
    this.game.network.openStore();
  }
}
