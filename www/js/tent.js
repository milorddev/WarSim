import { Spawner } from './spawner.js';
export class Tent extends Spawner {
    constructor(parent) {
        super(parent);
    }
    init() {
        this.animEngine.newAnimState('tent', this.engine.refImages['tent'], 1, 578, 465);
        this.animEngine.changeSprite('tent');
        this.animEngine.startAnimation();
        this.spawnUnit(this.parent.spawnable['soldier']);
    }
}
//# sourceMappingURL=tent.js.map