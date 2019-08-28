import { Engine } from './engine.js';
import { Player } from './player.js';
import { App } from './index.ts';

export class HUD {
    parent: Player
    engine = Engine;
    health: HTMLElement;
    coins: HTMLElement;

    constructor(parent: Player) {
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
