import { Engine } from './engine.js';
import { Player } from './player.js';

class App {

  engine = Engine;
  numberOfPlayers: number = 2;

    constructor() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this));
    }

    onDeviceReady() {
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
          this.engine.playerList['player'] = player;
          this.engine.player = player;
    
          const enemy = new Player();
          enemy.teamIndex = 2;
          enemy.isPlayer = false;
          this.engine.playerList['enemy'] = enemy;
          const inits = [
            this.engine.playerList['player'].init(),
            this.engine.playerList['enemy'].init()
          ];
          Promise.all(inits).then(ready => {
            this.engine.playerList['player'].beginMatch();
            this.engine.playerList['enemy'].beginMatch();
          });
        }
      }

}

new App();