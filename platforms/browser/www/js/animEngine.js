export class AnimEngine {
    constructor(unit) {
        this.animations = {};
        this.isPlaying = false;
        this.animSpeed = 60;
        this.unit = unit;
        this.bufferCanvas = document.createElement('canvas');
        this.bufferCanvas.width = 32;
        this.bufferCanvas.height = 32;
        this.animOffset = {
            x: Math.round(this.bufferCanvas.width / 2),
            y: Math.round(this.bufferCanvas.height / 2)
        };
        this.bufferContext = this.bufferCanvas.getContext('2d');
    }
    newAnimState(stateName, spritePath, spriteLength, frameWidth = 32, frameHeight = 32) {
        const image = new Image(); // this part could be made more efficient
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
    changeSprite(stateName) {
        this.currentSprite = this.animations[stateName];
    }
    nextFrame() {
        this.bufferContext.clearRect(0, 0, this.bufferCanvas.width, this.bufferCanvas.height);
        this.bufferContext.drawImage(this.currentSprite.image, this.currentSprite.width * this.currentSprite.index, 0, this.currentSprite.width, this.currentSprite.height, 0, 0, 32, 32);
        if (this.currentSprite.index >= this.currentSprite.length - 1) {
            this.currentSprite.index = 0;
        }
        else {
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
//# sourceMappingURL=animEngine.js.map