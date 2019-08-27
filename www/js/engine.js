import { Soldier } from './soldier.js';
export var Engine;
(function (Engine) {
    Engine.unitStack = {};
    Engine.refImages = {
        coin: new Image(),
        arrow: new Image()
    };
    function initEngine() {
        console.log('engine service started');
        this.spawnable = {
            soldier: {
                enabled: true,
                interval: 1000,
                instance: Soldier
            }
        };
        this.initRefImages();
    }
    Engine.initEngine = initEngine;
    function initRefImages() {
        this.refImages.coin.src = '../img/coin.png';
        this.refImages.arrow.src = '../img/arrow.png';
    }
    Engine.initRefImages = initRefImages;
    function initCanvasElement(canvasElement) {
        return new Promise((resolve, reject) => {
            this.initEngine();
            this.canvas = canvasElement;
            this.canvas.width = document.body.clientWidth;
            this.canvas.height = document.body.clientHeight - (document.body.clientHeight * 0.10);
            this.context = this.canvas.getContext('2d');
            this.tick();
            resolve(true);
        });
    }
    Engine.initCanvasElement = initCanvasElement;
    function tick() {
        requestAnimationFrame(() => {
            this.clearFrame();
            this.updateFrame();
            this.tick();
        });
    }
    Engine.tick = tick;
    function clearFrame() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    Engine.clearFrame = clearFrame;
    function updateFrame() {
        const keys = Object.keys(this.unitStack);
        for (var i in keys) {
            const unit = this.unitStack[keys[i]];
            if (unit) {
                unit.tick();
                this.drawFrame(unit);
            }
        }
    }
    Engine.updateFrame = updateFrame;
    function drawFrame(unit) {
        if (unit.animEngine) {
            const buffer = unit.animEngine.bufferCanvas;
            this.context.drawImage(buffer, unit.location.x - unit.animEngine.animOffset.x, unit.location.y - unit.animEngine.animOffset.y);
            if (unit.teamIndex === 1) {
                // this.context.fillStyle = '#3370d4'; // blue
            }
            else {
                // this.context.fillStyle = '#c82124'; // red
            }
        }
        // this.context.beginPath();
        // this.context.arc(unit.location.x, unit.location.y, 5, 0, 360);
        // if (unit.teamIndex === 1) {
        //   this.context.fillStyle = '#3370d4'; // blue
        // } else {
        //   this.context.fillStyle = '#c82124'; // red
        // }
        // this.context.closePath();
        // this.context.fill();
        // this.context.stroke();
    }
    Engine.drawFrame = drawFrame;
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    Engine.generateUUID = generateUUID;
    function lookAtTarget(source, target) {
        const yDiff = target.y - source.y;
        const xDiff = target.x - source.x;
        let angle = Math.atan2(yDiff, xDiff);
        angle = angle * (180 / Math.PI);
        if (angle < 0) {
            angle = 360 - (-angle);
        }
        return angle;
    }
    Engine.lookAtTarget = lookAtTarget;
    function incrementTowards(degree) {
        const radians = degree * (Math.PI / 180);
        return {
            x: Math.cos(radians),
            y: Math.sin(radians)
        };
    }
    Engine.incrementTowards = incrementTowards;
    function checkCollision(self, radius) {
        for (let key in this.unitStack) {
            const unit = this.unitStack[key];
            const xCalc = Math.pow(unit.location.x - self.location.x, 2);
            const yCalc = Math.pow(unit.location.y - self.location.y, 2);
            if (xCalc + yCalc < Math.pow(radius * 2, 2) && unit.teamIndex !== self.teamIndex) {
                return unit;
            }
        }
        return undefined;
    }
    Engine.checkCollision = checkCollision;
})(Engine || (Engine = {}));
//# sourceMappingURL=engine.js.map