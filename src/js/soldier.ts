import { Base } from './base.js';
import { Engine } from './engine.js';

export class Soldier extends Base {
    constructor() {
        super();
        this.engine = Engine;
        this.name = 'soldier';
        this.unitType = 'melee';
        // this.movementSpeed = 2;
        this.attackDamage = 25 + (Math.random() * 10);
    }
}
