
export class Base {
    constructor(engine) {
        this.engine = engine;
        this.health = 100;
        this.coins = 1;
        this.name = '';
        this.unitType = '';
        this.location = {x: 0, y: 0};
        this.teamIndex = 0;
        this.state = 'IDLE';
        this.stateHit = 'none';

        this.movementSpeed = 30;
        this.attackTarget = null;
        this.attackRadius = 30;
        this.attackSpeed = 1000;
        this.attackDamage = 20;
    }

    init() {
        this.changeState();
    }

    idle() {
        if (this.state === 'IDLE' && this.health > 0) {
            this.moveForward();
            this.detectEnemy();
            setTimeout(() => this.idle(), this.movementSpeed);
        }
    }

    charge() {
        if (this.state === 'CHARGE' && this.health > 0) {
        this.moveTowardEnemyUnit();
        setTimeout(() => this.charge(), this.movementSpeed);
        }
      }
    
      fight() {
        if (this.state === 'FIGHT' && this.health > 0) {
        this.attackEnemyUnit();
        setTimeout(() => this.fight(), this.attackSpeed);
        }
      }

    changeState() {
        if (this.state === 'IDLE' && this.stateHit !== 'IDLE') {
          this.stateHit = 'IDLE';
          this.idle();
        }
        if (this.state === 'CHARGE' && this.stateHit !== 'CHARGE') {
          this.stateHit = 'CHARGE';
          this.charge();
        }
        if (this.state === 'FIGHT' && this.stateHit !== 'FIGHT') {
          this.stateHit = 'FIGHT';
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
              this.removeUnit();
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
        }
    }

    ngOnDestroy() {
        // console.log('destroyed!');
        this.attackTarget = null;
        this.state = 'NONE';
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
            this.attackTarget.removeUnit();
            this.state = 'IDLE';
            this.changeState();
          }
        } else {
          this.state = 'IDLE';
          this.changeState();
        }
    }
    
    detectEnemy() {
        const spawnTypes = Object.keys(this.engine.spawnable);
        for (const itemType of spawnTypes) {
          const instigator = this.engine.spawnable[itemType].list.find(unit => {
            const xCalc = Math.pow(unit.location.x - this.location.x, 2);
            const yCalc = Math.pow(unit.location.y - this.location.y, 2);
            return  (xCalc + yCalc  < Math.pow(this.attackRadius * 2, 2) && unit.teamIndex !== this.teamIndex);
          });
          if (instigator) {
            this.attackTarget = instigator;
            if (this.unitType === 'melee') {
              this.state = 'CHARGE';
            } else if (this.unitType === 'ranged') {
              this.state = 'FIGHT';
            }
            this.changeState();
            break;
          }
        }
    }
    
    removeUnit() {
        if (this.attackTarget) {
          const itemIndex = () => this.engine.spawnable[this.attackTarget.name].list.findIndex(item => {
            return item.uuid === this.uuid;
          });
          if (itemIndex() > -1) {
            this.engine.spawnable[this.attackTarget.name].list.splice(itemIndex(), 1);
          }
        }
    }
}
