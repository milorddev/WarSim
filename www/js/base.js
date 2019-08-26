import { Engine } from "./engine.js";
import { AnimEngine } from './animEngine.js';
export class Base {
    constructor() {
        this.engine = Engine;
        this.size = 16;
        this.location = { x: 0, y: 0 };
        this.teamIndex = 0;
        this.animEngine = new AnimEngine(this);
        this.addToStack();
    }
    addToStack() {
        const unitUUID = this.engine.generateUUID();
        this.uuid = unitUUID;
        this.engine.unitStack[unitUUID] = this;
    }
    tick() { }
}
//# sourceMappingURL=base.js.map