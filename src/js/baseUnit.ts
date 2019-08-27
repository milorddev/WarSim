
import { Base } from './base.js';
import { Projectile } from './projectile.js';

export class BaseUnit extends Base {
  
  health: number;
  coins: number;
  name: string;
  unitType: string;
  state: string;
  stateTimer: {idle: boolean, charge: boolean, fight: boolean};
  
  movementSpeed: number;
  attackTarget: BaseUnit;
  attackRadius: number;
  attackSpeed: number;

    constructor() {
        super();
        
        this.health = 100;
        this.coins = 1;
        this.name = '';
        this.unitType = '';
        this.state = 'IDLE';
        
        this.movementSpeed = 30;
        this.attackTarget = null;
        this.attackRadius = 30;
        this.attackSpeed = 1000;
        this.attackDamage = 20;
        this.stateTimer = {idle: false, charge: false, fight: false};
    }

    init() {
        this.changeState();
        this.animEngine.newAnimState('idle', this.engine.refImages.coin, 10, 44, 40);
        this.animEngine.changeSprite('idle');
        this.animEngine.startAnimation();
    }

    protected tick() {
      if (this.health <= 0) {
        this.destroy();
      }
      super.tick();
    }

    protected destroy() {
        this.attackTarget = null;
        this.state = 'NONE';
        super.destroy();
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
          this.angle = 270;
        } else {
          this.angle = 90;
        }
        this.move();
    }

    move() {
      const increment = this.engine.incrementTowards(this.angle);
      this.location.x += increment.x;
      this.location.y += increment.y;
    }

    moveTowardEnemyUnit() {
      if (this.attackTarget) {
        this.angle = this.engine.lookAtTarget(this.location, this.attackTarget.location);
        this.move();
        if (Math.abs(this.attackTarget.location.x - this.location.x) <= this.size * 0.618) {
          if (Math.abs(this.attackTarget.location.y - this.location.y) <= this.size * 0.618) {
            this.state = 'FIGHT';
            this.changeState();
          }
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
              const arrow = new Projectile(this);
              arrow.aimAtTarget(this.attackTarget);
              arrow.fire();
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
      const instigator = this.engine.checkCollision(this, this.attackRadius);
      if (instigator && instigator.health > 0) {
        this.attackTarget = instigator;
        if (this.unitType == 'melee') {
          this.state = 'CHARGE';
        } else if (this.unitType == 'ranged') {
          this.state = 'FIGHT';
        }
        this.changeState();
      }
    }
}
