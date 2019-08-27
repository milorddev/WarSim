import { Engine } from './engine.js';
import { Player } from './player.js';

class App {

  engine: any;
  numberOfPlayers: number = 2;
  playerList: Array<Player> = [] //may not be needed

    constructor() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this));
    }

    onDeviceReady() {
        this.engine = Engine;
        const canvas = document.getElementById('canvas');
        this.engine.initCanvasElement(canvas).then( () => {
            this.setupGame();
        });
    }

    setupGame() {
        if (this.numberOfPlayers === 2) {
          const player = new Player();
          player.isPlayer = true;
          player.teamIndex = 1;
          this.playerList.push(player);
          this.engine.player = player;
    
          const enemy = new Player();
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