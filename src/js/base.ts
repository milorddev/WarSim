import { Engine } from "./engine.js";
import { AnimEngine } from './animEngine.js';

export class Base {

    engine = Engine;
    animEngine: AnimEngine;
    uuid:string;
    size: number;
    teamIndex: number;
    location: {x: number, y: number};
    playerPayload = {delivered: false, amount: 10};
    attackDamage: number;
    angle: number;
    
    constructor() {
        this.size = 32;
        this.location = {x: 0, y: 0};
        this.teamIndex = 0;
        this.angle = 0;
        this.animEngine = new AnimEngine(this);
        this.addToStack();
    }

    addToStack() {
        const unitUUID = this.engine.generateUUID();
        this.uuid = unitUUID;
        this.engine.unitStack[unitUUID] = this;
    }

    protected tick() { 
        // if out of bounds, remove unit
    }

    protected destroy() {
        this.animEngine.destroy();
        this.animEngine = null;
        delete this.engine.unitStack[this.uuid];
    }

    protected clicked() {}
}
