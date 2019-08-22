import { Base } from './base';

export class Soldier extends Base {
    constructor(engine) {
        super(engine);
        this.name = 'soldier';
        this.unitType = 'melee';
        // this.movementSpeed = 2;
        this.attackDamage = 25 + (Math.random() * 10);
    }
}
