import { Base } from './base.js';

export class Soldier extends Base {
    constructor(engine) {
        super(engine);
        this.name = 'soldier';
        this.unitType = 'melee';
        this.movementSpeed = 50;
        this.attackDamage = 25 + (Math.random() * 10);
    }
}
