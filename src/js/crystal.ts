import { Obstacle } from './obstacle.js';

export class Crystal extends Obstacle {
    constructor() {
        super();
        this.isClickable = true;
    }

    init() {
        this.animEngine.newAnimState('crystal', this.engine.refImages['crystal'], 1, 500, 667);
        this.animEngine.changeSprite('crystal');
        this.animEngine.startAnimation();
    }

    clicked() {
        super.clicked();
        this.distributeFunds();
        this.destroy();
    }

    distributeFunds() {
        this.engine.playerList['player'].coins += 100;
        this.engine.playerList['player'].hud.updateCoins();
    }
}
