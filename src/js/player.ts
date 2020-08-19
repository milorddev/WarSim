import { Engine } from "./engine.js";
import { HUD } from "./hud.js";
import { Soldier } from "./soldier.js";
import { Ranger } from "./ranger.js";
import { Tent } from "./tent.js";

export class Player {

    engine = Engine;
    hud: HUD;
    teamIndex: number = 0;
    isPlayer: boolean = false;
    name: string;
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
        this.coins = 10;
        this.spawnArea = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        };
        this.spawnable = {
            soldier: {
                enabled: true,
                name: 'soldier',
                interval: 1000,
                cost: 1,
                tally: {player: 0, enemy: 0},
                instance: Soldier
            },
            ranger: {
                enabled: true,
                name: 'ranger',
                interval: 1500,
                cost: 5,
                tally: {player: 0, enemy: 0},
                instance: Ranger
            },
            tent: {
                enabled: true,
                name: 'tent',
                interval: 60000,
                cost: 100,
                tally: {player: 0, enemy: 0},
                instance: Tent
            }
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
            resolve();
        });
    }

    beginMatch() {}

    spawnUnit(unit) {
        if (this.coins - unit.cost >= 0) {
            if(unit.enabled) {
                this.coins = this.coins - unit.cost;
                if(this.isPlayer) {
                    this.hud.updateCoins();
                    this.hud.disableUnitBox(unit.name);
                }
                unit.enabled = false;
                setTimeout(() => {
                    if(this.isPlayer) {
                        this.hud.enableUnitBox(unit.name);
                    }
                    unit.enabled = true;
                }, unit.interval)
                const newUnit = new unit.instance(this);
                newUnit.teamIndex = this.teamIndex;
                newUnit.location = {
                    x: this.spawnArea.x + (Math.random() * this.spawnArea.width),
                    y: this.spawnArea.y + (Math.random() * this.spawnArea.height)
                };
                this.engine.spawnable[unit.name].tally[this.name] += 1
                newUnit.init();
            } else {
                console.log(this.name, 'unit not ready');
            }
        } else {
            console.log(this.name, 'cannot buy this unit, would be below balance');
        }
      }

      addCoin() {
        this.coins += 1;
        if (this.isPlayer) {
          this.hud.updateCoins();
        }
      }
}
