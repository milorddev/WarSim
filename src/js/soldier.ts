import { BaseUnit } from './baseUnit.js';
import { Engine } from './engine.js';

export class Soldier extends BaseUnit {
    constructor(parent) {
        super(parent);
        this.engine = Engine;
        this.name = 'soldier';
        this.unitType = 'melee';
        this.movementSpeed = 20;
        this.attackDamage = 30 + (Math.random() * 15);
    }
}
