import { Engine } from './engine.js';
import { Player } from './player.js';
import { Bot } from './bot.js';
import { Crystal } from './crystal.js';

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
          player.name = 'player';
          this.engine.player = player;
    
          const enemy = new Bot();
          enemy.teamIndex = 2;
          enemy.isPlayer = false;
          this.engine.playerList['enemy'] = enemy;
          enemy.name = 'enemy';
          const inits = [
            this.engine.playerList['player'].init(),
            this.engine.playerList['enemy'].init()
          ];
          Promise.all(inits).then(ready => {
            this.engine.playerList['player'].beginMatch();
            this.engine.playerList['enemy'].beginMatch();
            this.spawnCrystals();
          });
        }
      }

      spawnCrystals() {
        setTimeout(() => {
          const crystal = new Crystal();
          crystal.location = {
            x: Math.random() * this.engine.canvas.width,
            y: Math.random() * this.engine.canvas.height
        };
        crystal.init();
        }, 1000);
      }

}

new App();