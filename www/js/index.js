"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const engine_1 = require("./engine");
const player_1 = require("./player");
class App {
    constructor() {
        this.numberOfPlayers = 2;
        this.playerList = [];
        document.addEventListener('deviceready', this.onDeviceReady.bind(this));
    }
    onDeviceReady() {
        this.engine = new engine_1.Engine();
        const canvas = document.getElementById('canvas');
        this.engine.initCanvasElement(canvas).then(() => {
            this.setupGame();
        });
    }
    setupGame() {
        if (this.numberOfPlayers === 2) {
            const player = new player_1.Player(this.engine);
            player.isPlayer = true;
            player.teamIndex = 1;
            this.playerList.push(player);
            const enemy = new player_1.Player(this.engine);
            enemy.teamIndex = 2;
            enemy.isPlayer = false;
            this.playerList.push(enemy);
            const inits = [];
            this.playerList.forEach(item => {
                inits.push(item.init());
            });
            Promise.all(inits).then(ready => {
                this.playerList.forEach(item => {
                    item.beginMatch();
                });
            });
        }
    }
}
new App();
//# sourceMappingURL=index.js.map