import { POSITIONS_SPIN, SPIN_ITEMS1 } from "./constants/Constants";

export default class Spin extends Phaser.GameObjects.Container {
  constructor(scene, options) {
    super(scene, 0, 0);
    this.options = options;
    this.addSpin();

    this.spinDuration = 50;
    this.status = "stop";
    // this.addAnimationFire(this.items[1]);
    // this.addAnimationFire(this.items[2]);
    // this.addAnimationFire(this.items[3]);
  }

  addSpin(option) {
    this.items = [];
    this.options.spins.slice(0, 5).map(({ name }, index) => {
      this[name] = this.scene.add
        .image(
          0,
          -190 + index * 70,
          "atlas",
          this.options.spins[(Math.random() * 12) | 0].name
        )
        .setScale(0.55)
        .setAlpha(1)
        .setDepth(200);
      this.items.push(this[name]);
      this.add([this[name]]);
      this._sort();
    });
  }

  move(once) {
    this.items.map((item, index) => {
      this.scene.tweens.add({
        targets: item,
        y: item.y + 70,
        duration: this.spinDuration,
        ease: "Ease.bounce",
        onComplete: () => {
          if (
            index !== 4 ||
            (this.status === "stop" &&
              ((this.items[3].frame.name === this.options.spins[0].name &&
                this.options.name === "left") ||
                (this.items[2].frame.name === this.options.spins[0].name &&
                  this.options.name === "center") ||
                (this.items[3].frame.name === this.options.spins[0].name &&
                  this.options.name === "right")) &&
              this.scene.step === 1)
          ) {
            return;
          }
          if (
            index !== 4 ||
            (this.status === "stop" &&
              ((this.items[3].frame.name === this.options.spins[1].name &&
                this.options.name === "left") ||
                (this.items[3].frame.name === this.options.spins[1].name &&
                  this.options.name === "center") ||
                (this.items[2].frame.name === this.options.spins[1].name &&
                  this.options.name === "right")) &&
              this.scene.step === 2)
          ) {
            return;
          }
          if (
            index !== 4 ||
            (this.status === "stop" &&
              this.scene.step === 3 &&
              ((this.items[3].frame.name === this.options.spins[2].name &&
                this.options.name === "left") ||
                (this.items[3].frame.name === this.options.spins[2].name &&
                  this.options.name === "center") ||
                (this.items[3].frame.name === this.options.spins[2].name &&
                  this.options.name === "right")))
          ) {
            return;
          }
          // if (
          //   index !== 4 ||
          //   (this.status === "stop" && this.scene.step === 3)
          // ) {
          //   this.items[4].y = -310;
          //   this.items[4].setTexture("atlas", this.options.spins[2].name);
          //   const lastItem = this.items.pop();
          //   this.items.unshift(lastItem);
          //   this.move();
          //   return;
          // }
          this.items[4].y = -310;
          this.items[4].setTexture(
            "atlas",
            this.options.spins[(Math.random() * 12) | 0].name
          );
          const lastItem = this.items.pop();
          this.items.unshift(lastItem);
          this.move();
        },
      });
    });
  }

  stop() {
    this.spinDuration = 300;
    this.status = "stop";
    if (this.scene.step === 1) {
      if (this.options.name === "left") {
        this.items[1].setTexture("atlas", this.options.spins[0].name);
      }
      if (this.options.name === "center") {
        this.items[1].setTexture("atlas", this.options.spins[0].name);
      }
      if (this.options.name === "right") {
        this.items[1].setTexture("atlas", this.options.spins[0].name);
      }
    }
    if (this.scene.step === 2) {
      if (this.options.name === "left") {
        this.items[1].setTexture("atlas", this.options.spins[1].name);
      }
      if (this.options.name === "center") {
        this.items[1].setTexture("atlas", this.options.spins[1].name);
      }
      if (this.options.name === "right") {
        this.items[1].setTexture("atlas", this.options.spins[1].name);
      }
      // this.items[0].setTexture("atlas", this.options.spins[1].name);
    }
    if (this.scene.step === 3) {
      this.items[0].setTexture("atlas", this.options.spins[2].name);
    }
  }

  addAnimationFire(item) {
    this.items.slice(1, 4).map((item, idx) => {
      // if (idx) return;
      // this.starsExplosion(item, idx);
      // const emitZone1 = {
      //   type: "edge",
      //   source: item
      //     .getBounds()
      //     .setSize(200, 135)
      //     .setPosition(item.getBounds().x - 33, item.getBounds().y),
      //   quantity: 42,
      //   total: 1,
      // };
      // this[`emitter${idx}`] = this.scene.add
      //   .particles(0, 0, "fire2", {
      //     speed: 1,
      //     lifespan: 900,
      //     quantity: 1,
      //     scale: { start: 0.2, end: 0 },
      //     emitZone: emitZone1,
      //     color: [0xfacc22, 0xf89800, 0xf83600, 0x9f0404],
      //     //   colorEase: "quad.out",
      //     blend: "ADD",
      //   })
      //   .setAlpha(0)
      //   .setDepth(200);
      // this.add(this[`emitter${idx}`]);
      // this._sort();
      // this[`emitter${idx}`].start(2000);

      const particles = this.scene.add.particles("fire2").setDepth(200);
      const emitZone = {
        type: "edge",
        source: item
          .getBounds()
          .setSize(200, 135)
          .setPosition(item.getBounds().x - 33, item.getBounds().y),
        quantity: 52,
        total: 20,
      };
      this[`emitter${idx}`] = particles.createEmitter({
        speed: 20,
        lifespan: 300,
        quantity: 2,
        scale: { start: 0.15, end: 0 },
        emitZone: emitZone,
        alpha: { start: 1, end: 0 },
        tint: [0xfacc22, 0xf89800, 0xf83600, 0x9f0404],
        color: [0xfacc22, 0xf89800, 0xf83600, 0x9f0404],
        duration: 2000,
      });
      this.add([particles]);
      this._sort();
      this[`emitter${idx}`].stop();
    });
  }
  starsExplosion(item, idx) {
    console.log("Phaser", Phaser);
    const particles = this.scene.add.particles("fire2").setDepth(200);
    const emitZone = {
      type: "edge",
      source: item
        .getBounds()
        .setSize(200, 135)
        .setPosition(item.getBounds().x - 33, item.getBounds().y),
      quantity: 42,
      total: 1,
    };
    const emitter = particles.createEmitter({
      speed: 1,
      lifespan: 900,
      quantity: 42,
      scale: { start: 0.2, end: 0 },
      emitZone: emitZone,
      alpha: { start: 1, end: 0 },
      tint: [0xfacc22, 0xf89800, 0xf83600, 0x9f0404],
    });
    particles.setDepth(200);
    this.add([particles]);
    this._sort();
    emitter.start();
  }
}
