import { Spawner } from './spawner.js';
import { BaseUnit } from './baseUnit.js';

export class Tent extends Spawner {
    unit: BaseUnit;
    constructor(parent) {
        super(parent);
    }

    initSpawn() {
        this.spawnUnit(this.unit);
    }
}
