import { Player } from './player.js';

export class Bot extends Player {
    previousPlayerSpawnCount: object = {};
    playerSpawnCount: object = {};
    spawnRate:object = {};
    constructor() {
        super();
        this.coins = 9999999;
    }

    beginMatch() {
        super.beginMatch();
        setInterval(() => {
            this.checkSpawnRates();
        }, 1000);
        
    }

    checkSpawnRates() {
        const spawnKeys = Object.keys(this.spawnable);
        let playerSpawnCount = {};
        spawnKeys.forEach(key => {
            let count = this.engine.spawnable[key].tally['player'];
            this.playerSpawnCount[key] = count;
            if (!this.previousPlayerSpawnCount[key]) {
                this.previousPlayerSpawnCount[key] = 0;
            }
            // calculate delta
            this.spawnRate[key] = this.playerSpawnCount[key] - this.previousPlayerSpawnCount[key];
            this.previousPlayerSpawnCount[key] = count;
        });
        this.matchPlayer();
    }

    matchPlayer() {
        const rateKeys = Object.keys(this.spawnRate);
        rateKeys.forEach(i => {
            if (this.playerSpawnCount[i] > 0) {
                const rand = Math.round(Math.random());
                for(var j = 0; j < this.spawnRate[i] + rand; j++) {
                    this.spawnUnit(this.spawnable[i]);
                }
            }
        });
    }
}
