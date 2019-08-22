"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
class Soldier extends base_1.Base {
    constructor(engine) {
        super(engine);
        this.name = 'soldier';
        this.unitType = 'melee';
        // this.movementSpeed = 2;
        this.attackDamage = 25 + (Math.random() * 10);
    }
}
exports.Soldier = Soldier;
//# sourceMappingURL=soldier.js.map