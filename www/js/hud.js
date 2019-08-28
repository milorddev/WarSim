import { Engine } from './engine.js';
export class HUD {
    constructor(parent) {
        this.engine = Engine;
        this.parent = parent;
        this.health = document.getElementById('health');
        this.coins = document.getElementById('coins');
        console.log(this.health, this.coins);
        this.init();
    }
    init() {
        this.updateCoins();
        this.updateHealth();
    }
    updateHealth() {
        this.health.innerHTML = `Health: ${this.parent.health}`;
    }
    updateCoins() {
        this.coins.innerHTML = `Coins: ${this.parent.coins}`;
    }
}
//# sourceMappingURL=hud.js.map