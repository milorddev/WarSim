export class AnimEngine {
    constructor(unit) {
        this.animations = {};
        this.isPlaying = false;
        this.animSpeed = 60;
        this.spriteRotation = 0;
        this.unit = unit;
        this.bufferCanvas = document.createElement('canvas');
        this.bufferCanvas.width = this.unit.size * 2;
        this.bufferCanvas.height = this.unit.size * 2;
        this.animOffset = {
            x: Math.round(this.unit.size / 2),
            y: Math.round(this.unit.size / 2)
        };
        this.bufferContext = this.bufferCanvas.getContext('2d');
    }
    newAnimState(stateName, spritePath, spriteLength, frameWidth, frameHeight) {
        const image = new Image(); // this part could be made more efficient
        if (!frameWidth) {
            frameWidth = this.unit.size;
        }
        if (!frameHeight) {
            frameHeight = this.unit.size;
        }
        const spriteType = (spriteLength == 1) ? 'static' : 'animated';
        image.src = spritePath;
        const sprite = {
            width: frameWidth,
            height: frameHeight,
            length: spriteLength,
            type: spriteType,
            index: 0,
            image: image
        };
        this.animations[stateName] = sprite;
    }
    changeSprite(stateName) {
        this.currentSprite = this.animations[stateName];
    }
    rotateImage() {
        this.bufferContext.translate(this.unit.size, this.unit.size);
        this.bufferContext.rotate(this.spriteRotation * Math.PI / 180);
    }
    nextFrame() {
        this.bufferContext.clearRect(0, 0, this.bufferCanvas.width, this.bufferCanvas.height);
        this.bufferContext.save();
        this.rotateImage();
        this.bufferContext.drawImage(this.currentSprite.image, this.currentSprite.width * this.currentSprite.index, 0, this.currentSprite.width, this.currentSprite.height, -this.unit.size / 2, -this.unit.size / 2, this.unit.size, this.unit.size);
        this.bufferContext.restore();
        if (this.currentSprite.type == 'animated') {
            if (this.currentSprite.index >= this.currentSprite.length - 1) {
                this.currentSprite.index = 0;
            }
            else {
                this.currentSprite.index += 1;
            }
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