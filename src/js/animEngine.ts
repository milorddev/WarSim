import { Base } from './base.js';

export class AnimEngine {
    animations: object = {};
    unit: Base;
    bufferCanvas: HTMLCanvasElement;
    bufferContext: CanvasRenderingContext2D;
    animOffset: {x: number, y: number}
    currentSprite: {
        width: number,
        height: number,
        length: number,
        index: number,
        image: HTMLImageElement
    }
    isPlaying: boolean = false;
    animSpeed: number = 60;

    constructor(unit: Base) {
        this.unit = unit;
        this.bufferCanvas = document.createElement('canvas');
        this.bufferCanvas.width = this.unit.size;
        this.bufferCanvas.height = this.unit.size;
        this.animOffset = {
            x: Math.round(this.unit.size / 2),
            y: Math.round(this.unit.size / 2)
        }
        this.bufferContext = this.bufferCanvas.getContext('2d');
    }

    newAnimState(stateName: string, spritePath: string, spriteLength: number,
        frameWidth: number, frameHeight: number) {
        const image = new Image(); // this part could be made more efficient
        if (!frameWidth) {
            frameWidth = this.unit.size;
        }
        if (!frameHeight) {
            frameHeight = this.unit.size;
        }

        image.src = spritePath;
        const sprite = {
            width: frameWidth,
            height: frameHeight,
            length: spriteLength,
            index: 0,
            image: image
        };
        this.animations[stateName] = sprite;
    }

    changeSprite(stateName: string) {
        this.currentSprite = this.animations[stateName];
    }

    nextFrame() {
        this.bufferContext.clearRect(0, 0, this.bufferCanvas.width, this.bufferCanvas.height);
        this.bufferContext.drawImage(
            this.currentSprite.image,
            this.currentSprite.width * this.currentSprite.index,
            0,
            this.currentSprite.width,
            this.currentSprite.height,
            0,
            0,
            this.unit.size,
            this.unit.size
        );
        if (this.currentSprite.index >= this.currentSprite.length -1) {
            this.currentSprite.index = 0;
        } else {
            this.currentSprite.index += 1;
        }
    }

    startAnimation() {
        this.isPlaying = true;
        this.animationLoop();

    }

    animationLoop() {
        if (this.isPlaying === true) {
            setTimeout(() => {
                this.nextFrame();
                this.animationLoop();
            }, this.animSpeed);
        }
    }

    stopAnimation() {
        this.isPlaying = false;
    }


}
