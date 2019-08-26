import { BaseUnit } from './baseUnit.js';
import { Engine } from './engine.js';
export class Soldier extends BaseUnit {
    constructor() {
        super();
        this.engine = Engine;
        this.name = 'soldier';
        this.unitType = 'ranged';
        // this.movementSpeed = 2;
        this.attackDamage = 25 + (Math.random() * 10);
    }
}
//# sourceMappingURL=soldier.js.map