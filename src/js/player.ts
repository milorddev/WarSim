import { Engine } from "./engine.js";
import { HUD } from "./hud.js";

export class Player {

    engine = Engine;
    hud: HUD;
    teamIndex: number = 0;
    isPlayer: boolean = false;
    areaHeight: number = 50;
    areaOffset: number = 32;
    health: number = 1000;
    coins: number = 10;
    spawnArea: {
        x: number,
        y: number,
        width: number,
        height: number
    };
    spawnable: object = {};

    constructor() {
        this.teamIndex = 0;
        this.isPlayer = false;
        this.areaHeight = 50;
        this.areaOffset = 32;
        this.health = 1000;
        this.coins = 5;
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
                x: 0, y: cHeight - (this.areaHeight + this.areaOffset), width: cWidth - this.areaOffset, height: this.areaHeight
            };
            this.hud = new HUD(this);
            } else {
                this.spawnArea = {
                    x: 0, y: 0, width: cWidth - this.areaOffset, height: this.areaHeight
                };
            }
            console.log('spawnArea', this.spawnArea);           
            resolve();
        });
    }

    beginMatch() {
        this.spawnable = this.engine.spawnable;
        console.log('beginning match');
    }

    spawnUnit(unit) {
        if (this.coins - unit.cost >= 0 && unit.enabled) {
            this.coins = this.coins - unit.cost;
            this.hud.updateCoins();
            this.hud.disableUnitBox(unit.name);
            unit.enabled = false;
            setTimeout(() => {
                this.hud.enableUnitBox(unit.name);
                unit.enabled = true;
            }, unit.interval)
            const newUnit = new unit.instance(this);
            newUnit.teamIndex = this.teamIndex;
            newUnit.location = {
                x: this.spawnArea.x + (Math.random() * this.spawnArea.width),
                y: this.spawnArea.y + (Math.random() * this.spawnArea.height)
            };
            newUnit.init();
        } else {
            console.log('cannot buy unit');
        }
      }

      addCoin() {
        this.coins += 1;
        if (this.isPlayer) {
          this.hud.updateCoins();
        }
      }
}
