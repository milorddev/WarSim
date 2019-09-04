import { Engine } from './engine.js';
export class HUD {
    constructor(parent) {
        this.engine = Engine;
        this.parent = parent;
        this.health = document.getElementById('health');
        this.coins = document.getElementById('coins');
        this.unitBar = document.getElementById('player-unit-bar');
        this.init();
    }
    init() {
        this.updateCoins();
        this.updateHealth();
        this.createNewUnitBox('soldier', '../img/soldier_icon.png');
        this.createNewUnitBox('ranger', '../img/ranger_icon.png');
        this.createNewUnitBox('tent', '../img/tent_icon.png');
    }
    update() {
        this.updateHealth();
        this.updateCoins();
    }
    updateHealth() {
        this.health.innerHTML = `Health: ${this.parent.health}`;
    }
    updateCoins() {
        this.coins.innerHTML = `Coins: ${this.parent.coins}`;
    }
    createNewUnitBox(unitName, imagePath) {
        const unitBox = document.createElement('div');
        unitBox.className += " unitBox";
        const unitIcon = document.createElement('img');
        unitIcon.src = imagePath;
        unitIcon.className += " unitIcon";
        unitBox.appendChild(unitIcon);
        const unitText = document.createElement('p');
        unitText.className += " unitText";
        unitText.innerHTML = unitName;
        unitBox.appendChild(unitText);
        this.unitBar.appendChild(unitBox);
        unitBox.addEventListener('click', () => this.parent.spawnUnit(this.parent.spawnable[unitName]));
    }
}
//# sourceMappingURL=hud.js.map