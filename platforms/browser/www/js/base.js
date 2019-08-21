
export class Base {
    constructor(engine) {
        this.engine = engine;
        this.uuid = this.uuidv4;
        this.health = 100;
        this.coins = 1;
        this.name = '';
        this.unitType = '';
        this.location = {x: 0, y: 0};
        this.teamIndex = 0;
        this.state = 'IDLE';
        this.stateTimer = {idle: false, charge: false, fight: false};

        this.movementSpeed = 30;
        this.attackTarget = null;
        this.attackRadius = 30;
        this.attackSpeed = 60;
        this.attackDamage = 20;
        
        this.movementTrigger = {iter: 0, emit: false};
        this.attackTrigger = {iter: 0, emit: false};
    }

    init() {
        this.changeState();
    }

    tick() {
      if (this.health <= 0) {
        delete this.engine.unitStack[this.uuid];
        this.attackTarget = null;
        this.state = 'NONE';
      }
      // this.movementTrigger = this.setTrigger(
      //   this.movementTrigger, this.movementSpeed
      // );

      // this.attackTrigger = this.setTrigger(
      //   this.attackTrigger, this.attackSpeed
      // );
      // this.changeState();
    }

    // setTrigger(trigger, value) {
    //   if (trigger.iter > value) {
    //     return {iter: 0, emit: true}
    //   } else {
    //     return {iter: trigger.iter + 1, emit: false}
    //   }
    // }

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
          // if (this.movementTrigger.emit === true) {
          //   this.moveForward();
          //   this.detectEnemy();
          // }
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
          // if (this.movementTrigger.emit === true) {
          //   this.moveTowardEnemyUnit();
          // }
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
          // if (this.attackTrigger.emit === true) {
          //   this.attackEnemyUnit();
          // }
        }
      }

    changeState() {
        if (this.state === 'IDLE') { // && this.stateHit !== 'IDLE') {
          // this.stateHit = 'IDLE';
          this.idle();
        }
        if (this.state === 'CHARGE') { //  && this.stateHit !== 'CHARGE') {
          // this.stateHit = 'CHARGE';
          this.charge();
        }
        if (this.state === 'FIGHT') { //  && this.stateHit !== 'FIGHT') {
          // this.stateHit = 'FIGHT';
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
          // this.removeUnit();
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
            // this.attackTarget.removeUnit();
            this.state = 'IDLE';
            this.changeState();
          }
        } else {
          this.state = 'IDLE';
          this.changeState();
        }
    }
    
    detectEnemy() {
      const unitList = Object.values(this.engine.unitStack);
      const instigator = unitList.find(unit => {
        const xCalc = Math.pow(unit.location.x - this.location.x, 2);
        const yCalc = Math.pow(unit.location.y - this.location.y, 2);
        return  (xCalc + yCalc  < Math.pow(this.attackRadius * 2, 2) && unit.teamIndex !== this.teamIndex);
      });
      if (instigator && instigator.health > 0) {
        this.attackTarget = instigator;
        this.state = 'CHARGE';
        this.changeState();
      }
    
    }
    
    removeUnit() {
      console.log(this.engine.unitStack);
        if (this.attackTarget) {
          // const itemIndex = () => this.engine.unitStack.findIndex(item => {
          //   return item.uuid === this.uuid;
          // });
          // if (itemIndex() > -1) {
            delete this.engine.unitStack[this.attackTarget.uuid];
            // this.engine.unitStack.splice(itemIndex(), 1);
            
          // }
        }
    }
}
