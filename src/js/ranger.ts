import { BaseUnit } from './baseUnit.js';
import { Engine } from './engine.js';

export class Ranger extends BaseUnit {
    constructor(parent) {
        super(parent);
        this.engine = Engine;
        this.name = 'ranger';
        this.unitType = 'ranged';
        this.movementSpeed = 35;
        this.attackRadius = 60;
        this.attackDamage = 25 + (Math.random() * 10);
    }
}
