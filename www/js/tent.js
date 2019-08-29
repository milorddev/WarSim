import { Spawner } from './spawner.js';
export class Tent extends Spawner {
    constructor(parent) {
        super(parent);
    }
    initSpawn() {
        this.spawnUnit(this.unit);
    }
}
//# sourceMappingURL=tent.js.map