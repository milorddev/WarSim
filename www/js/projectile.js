import { Base } from "./base.js";
export class Projectile extends Base {
    constructor(parent) {
        super();
        this.speed = 10;
        this.attackDamage = 20;
        this.teamIndex = parent.teamIndex;
        this.location = Object.assign({}, parent.location);
        this.init();
    }
    init() {
        this.animEngine.newAnimState('idle', this.engine.refImages.arrow, 1, 300, 150);
        this.animEngine.changeSprite('idle');
        this.animEngine.startAnimation();
    }
    aimAtTarget(target) {
        this.angle = this.engine.lookAtTarget(this.location, target.location);
        this.angle = this.angle - (Math.random() * 20) + (Math.random() * 20);
        this.animEngine.spriteRotation = this.angle;
    }
    fire() {
        this.fireInterval = setInterval(() => {
            const increment = this.engine.incrementTowards(this.angle);
            this.location.x += increment.x * this.speed;
            this.location.y += increment.y * this.speed;
            this.checkCollision();
        }, 60);
    }
    checkCollision() {
        const hitUnit = this.engine.checkCollision(this, this.size / 2);
        if (hitUnit && hitUnit.health > 0) {
            hitUnit.health = Math.round(hitUnit.health - this.attackDamage);
            this.destroy();
        }
    }
    destroy() {
        clearInterval(this.fireInterval);
        super.destroy();
    }
}
//# sourceMappingURL=projectile.js.map