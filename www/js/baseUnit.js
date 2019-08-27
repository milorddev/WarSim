import { Base } from './base.js';
import { Projectile } from './projectile.js';
export class BaseUnit extends Base {
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
        this.stateTimer = { idle: false, charge: false, fight: false };
    }
    init() {
        this.changeState();
        this.animEngine.newAnimState('idle', this.engine.refImages.coin, 10, 44, 40);
        this.animEngine.changeSprite('idle');
        this.animEngine.startAnimation();
    }
    tick() {
        if (this.health <= 0) {
            this.destroy();
        }
        super.tick();
    }
    destroy() {
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
            this.location.y -= 1;
        }
        else {
            this.location.y += 1;
        }
    }
    moveTowardEnemyUnit() {
        if (this.attackTarget) {
            const atEnemy = { x: false, y: false };
            if (this.location.x > this.attackTarget.location.x + 6 || this.location.x < this.attackTarget.location.x - 6) {
                if (this.attackTarget.location.x > this.location.x) {
                    this.location.x += 1;
                }
                else if (this.attackTarget.location.x < this.location.x) {
                    this.location.x -= 1;
                }
            }
            else {
                atEnemy.x = true;
            }
            if (this.location.y > this.attackTarget.location.y + 6 || this.location.y < this.attackTarget.location.y - 6) {
                if (this.attackTarget.location.y > this.location.y) {
                    this.location.y += 1;
                }
                else if (this.attackTarget.location.y < this.location.y) {
                    this.location.y -= 1;
                }
            }
            else {
                atEnemy.y = true;
            }
            if (atEnemy.x === true && atEnemy.y === true) {
                this.state = 'FIGHT';
                this.changeState();
            }
        }
        else {
            this.state = 'IDLE';
            this.changeState();
        }
    }
    attackEnemyUnit() {
        if (this.attackTarget) {
            if (this.attackTarget.health > 0) {
                if (this.unitType === 'melee') {
                    this.attackTarget.health = Math.round(this.attackTarget.health - this.attackDamage);
                }
                else if (this.unitType === 'ranged') {
                    const arrow = new Projectile(this);
                    arrow.aimAtTarget(this.attackTarget);
                    arrow.fire();
                }
            }
            if (this.attackTarget.health <= 0) {
                this.state = 'IDLE';
                this.changeState();
            }
        }
        else {
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
            }
            else if (this.unitType == 'ranged') {
                this.state = 'FIGHT';
            }
            this.changeState();
        }
    }
}
//# sourceMappingURL=baseUnit.js.map