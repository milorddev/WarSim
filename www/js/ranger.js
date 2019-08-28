import { BaseUnit } from './baseUnit.js';
export class Ranger extends BaseUnit {
    constructor(parent) {
        super(parent);
        this.name = 'ranger';
        this.unitType = 'ranged';
        this.movementSpeed = 35;
        this.attackRadius = 60;
        this.attackDamage = 25 + (Math.random() * 10);
    }
}
//# sourceMappingURL=ranger.js.map