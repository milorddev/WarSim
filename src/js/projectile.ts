import { Base } from "./base.js";

export class Projectile extends Base {
    angle: number;
    speed: number;

    constructor(parent: Base) {
        super();
        this.speed = 10;
        this.angle = 0;
        this.teamIndex = parent.teamIndex;
        this.location = parent.location
        this.init();
    }

    init() {
        this.animEngine.newAnimState('idle', '../img/arrow.png', 1, 300, 150);
        // this.animEngine.newAnimState('idle', '../img/coin.png', 10, 44, 40);
        this.animEngine.changeSprite('idle');
        this.animEngine.startAnimation();
    }

    aimAtTarget(target: Base) {
        this.angle = this.engine.lookAtTarget(this.location, target.location)
        this.animEngine.spriteRotation = this.angle;
    }

    fire() {
        setTimeout(() => {
            const increment = this.engine.incrementTowards(this.angle);
            this.location.x += increment.x * this.speed;
            this.location.y += increment.y * this.speed;
        }, 60);
    }




}
