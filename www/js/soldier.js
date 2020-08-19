import { BaseUnit } from './baseUnit.js';
export class Soldier extends BaseUnit {
    constructor(parent) {
        super(parent);
        this.name = 'soldier';
        this.unitType = 'melee';
        this.movementSpeed = 20;
        this.attackDamage = 30 + (Math.random() * 15);
        this.playerPayload.amount = 10;
    }
}
//# sourceMappingURL=soldier.js.map