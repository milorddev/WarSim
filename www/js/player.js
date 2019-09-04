import { Engine } from "./engine.js";
import { HUD } from "./hud.js";
export class Player {
    constructor() {
        this.engine = Engine;
        this.teamIndex = 0;
        this.isPlayer = false;
        this.areaHeight = 50;
        this.areaOffset = 32;
        this.health = 1000;
        this.coins = 10;
        this.spawnable = {};
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
            }
            else {
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
        if (this.coins - unit.cost >= 0) {
            this.coins = this.coins - unit.cost;
            this.hud.updateCoins();
            const newUnit = new unit.instance(this);
            newUnit.teamIndex = this.teamIndex;
            newUnit.location = {
                x: this.spawnArea.x + (Math.random() * this.spawnArea.width),
                y: this.spawnArea.y + (Math.random() * this.spawnArea.height)
            };
            newUnit.init();
        }
        else {
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
//# sourceMappingURL=player.js.map