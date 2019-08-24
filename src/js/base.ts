import { Engine } from "./engine.js";
import { AnimEngine } from './animEngine.js';

export class Base {
  engine: any;
  animEngine: AnimEngine;
  uuid:string;
  health: number;
  size: number;
  coins: number;
  name: string;
  unitType: string;
  location: {x: number, y: number};
  teamIndex: number;
  state: string;
  stateTimer: {idle: boolean, charge: boolean, fight: boolean};
  
  movementSpeed: number;
  attackTarget: Base;
  attackRadius: number;
  attackSpeed: number;
  attackDamage: number;

    constructor() {
        this.engine = Engine;
        this.health = 100;
        this.coins = 1;
        this.size = 32;
        this.name = '';
        this.unitType = '';
        this.location = {x: 0, y: 0};
        this.teamIndex = 0;
        this.state = 'IDLE';
        
        this.movementSpeed = 30;
        this.attackTarget = null;
        this.attackRadius = 30;
        this.attackSpeed = 120;
        this.attackDamage = 20;
        this.stateTimer = {idle: false, charge: false, fight: false};
    }

    init() {
        this.changeState();
        this.animEngine = new AnimEngine(this);
        this.animEngine.newAnimState('idle', '../img/coin.png', 10, 44, 40);
        this.animEngine.changeSprite('idle');
        this.animEngine.startAnimation();

        // gifler('../img/poke.gif').get().then(data => {
        //   this.testGif = data;
        //   setInterval(() => {
        //     this.testGif._advanceFrame();
        //   }, 100);
        // });
    }

    tick() {
      if (this.health <= 0) {
        delete this.engine.unitStack[this.uuid];
        this.attackTarget = null;
        this.state = 'NONE';
      }

    }

    idle() {
        if (this.state === 'IDLE' && this.health > 0) {
          this.moveForward();
          this.detectEnemy();
          if (this.stateTimer.idle === false) {
            this.stateTimer.idle = true;
            setTimeout(() => {
              this.stateTimer.idle = false;
              this.idle();
            }, this.movementSpeed);
          }
        }
    }
    
    charge() {
        if (this.state === 'CHARGE' && this.health > 0) {
          this.moveTowardEnemyUnit();
          if (this.stateTimer.charge === false) {
            this.stateTimer.charge = true;
            setTimeout(() => {
              this.stateTimer.charge = false;
              this.charge();
            }, this.movementSpeed);
          }
        }
      }
    
      fight() {
        if (this.state === 'FIGHT' && this.health > 0) {
          this.attackEnemyUnit();
          if (this.stateTimer.fight === false) {
            this.stateTimer.fight = true;
            setTimeout(() => {
              this.stateTimer.fight = false;
              this.fight();
            }, this.attackSpeed);
          }
        }
      }

    changeState() {
        if (this.state === 'IDLE') {
          this.idle();
        }
        if (this.state === 'CHARGE') {
          this.charge();
        }
        if (this.state === 'FIGHT') {
          this.fight();
        }
    }

    moveForward() {
        if (this.teamIndex === 1) {
          this.location.y -= 1;
        } else {
          this.location.y += 1;
        }
    
        // if out of bounds, remove unit
        if (this.location.y > this.engine.canvas.height || this.location.y < 0) {
          this.health = 0;
        }
    }

    moveTowardEnemyUnit() {
        if (this.attackTarget) {
          const atEnemy = {x: false, y: false};
          if (this.location.x > this.attackTarget.location.x + 6 || this.location.x < this.attackTarget.location.x - 6) {
            if (this.attackTarget.location.x > this.location.x) {
              this.location.x += 1;
            } else if (this.attackTarget.location.x < this.location.x) {
              this.location.x -= 1;
            }
          } else {
            atEnemy.x = true;
          }
    
          if (this.location.y > this.attackTarget.location.y + 6 || this.location.y < this.attackTarget.location.y - 6) {
            if (this.attackTarget.location.y > this.location.y) {
              this.location.y += 1;
            } else if (this.attackTarget.location.y < this.location.y) {
              this.location.y -= 1;
            }
          } else {
            atEnemy.y = true;
          }
    
          if (atEnemy.x === true && atEnemy.y === true) {
            this.state = 'FIGHT';
            this.changeState();
          }
        } else {
          this.state = 'IDLE';
          this.changeState();
        }
    }
    
    attackEnemyUnit() {
        if (this.attackTarget) {
          if (this.attackTarget.health > 0) {
            if (this.unitType === 'melee') {
              this.attackTarget.health = Math.round(this.attackTarget.health - this.attackDamage);
            } else if (this.unitType === 'ranged') {
              console.log('ranged');
            }
          }
          if (this.attackTarget.health <= 0) {
            this.state = 'IDLE';
            this.changeState();
          }
        } else {
          this.state = 'IDLE';
          this.changeState();
        }
    }
    
    detectEnemy() {
      // const getInstigator = () => {
        for (let key in this.engine.unitStack) {
          const unit: Base = this.engine.unitStack[key];
          const xCalc = Math.pow(unit.location.x - this.location.x, 2);
          const yCalc = Math.pow(unit.location.y - this.location.y, 2);
          if (xCalc + yCalc  < Math.pow(this.attackRadius * 2, 2) && unit.teamIndex !== this.teamIndex) {
            const instigator = unit;
            if (instigator && instigator.health > 0) {
              this.attackTarget = instigator;
              this.state = 'CHARGE';
              this.changeState();
            }
          }
           //return undefined;

        }
      // }
      // const instigator = getInstigator();
      // if (instigator && instigator.health > 0) {
      //   this.attackTarget = instigator;
      //   this.state = 'CHARGE';
      //   this.changeState();
      // } else {
      //   this.state = 'IDLE';
      //   this.changeState();
      // }
    
    }
}
