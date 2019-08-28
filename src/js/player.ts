import { Engine } from "./engine.js";
import { HUD } from "./hud.js";

export class Player {

    engine = Engine;
    hud: HUD;
    teamIndex: number = 0;
    isPlayer: boolean = false;
    areaHeight: number = 50;
    health: number = 1000;
    coins: number = 0;
    spawnArea: {
        x: number,
        y: number,
        width: number,
        height: number
    };

    constructor() {
        this.teamIndex = 0;
        this.isPlayer = false;
        this.areaHeight = 50;
        this.health = 1000;
        this.coins = 0;
        this.spawnArea = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        };
    }

    init() {
        return new Promise((resolve, reject) => {
            const cHeight = this.engine.canvas.height;
            const cWidth = this.engine.canvas.width;
            if (this.isPlayer) {
            // box on bottom of canvas
            this.spawnArea = {
                x: 0, y: cHeight - this.areaHeight, width: cWidth, height: this.areaHeight
            };
            this.hud = new HUD(this);
            } else {
                this.spawnArea = {
                    x: 0, y: 0, width: cWidth, height: this.areaHeight
                };
            }
            console.log('spawnArea', this.spawnArea);           
            resolve();
        });
    }

    beginMatch() {
        console.log('beginning match');
        this.spawnUnit(this.engine.spawnable['soldier']);
        this.spawnUnit(this.engine.spawnable['ranger']);
    }

    spawnUnit(unit) {
        setTimeout(() => {
          const newUnit = new unit.instance(this);
          newUnit.teamIndex = this.teamIndex;
          newUnit.location = {
            x: this.spawnArea.x + (Math.random() * this.spawnArea.width),
            y: this.spawnArea.y + (Math.random() * this.spawnArea.height)
          };
          newUnit.init();
          this.spawnUnit(unit);
        }, unit.interval);
      }

      addCoin() {
        this.coins += 1;
        if (this.isPlayer) {
          this.hud.updateCoins();
        }
      }
}
