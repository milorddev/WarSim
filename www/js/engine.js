
export class Engine {
    constructor() {
        console.log('engine service started');

        this.spawnable = {
            soldier: {
              enabled: true,
              interval: 1000,
              list: []
            }
          };
    }

    initCanvasElement(canvasElement) {
        return new Promise((resolve, reject) => {
            this.canvas = canvasElement;
            this.canvas.width = document.body.clientWidth;
            this.canvas.height = document.body.clientHeight - (document.body.clientHeight * 0.10);
            this.context = this.canvas.getContext('2d');
            this.tick();
            resolve();
        });
      }

    tick() {
        requestAnimationFrame(() => {
            this.clearFrame();
            this.drawFrame();
            this.tick();
        });
    }
    
    clearFrame() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    updateFrame() {
        console.log('placeholder');
    }
    
    drawFrame() {
        const spawnableUnits = Object.keys(this.spawnable);
        spawnableUnits.forEach(spawned => {
          this.spawnable[spawned].list.forEach(unit => {
            this.context.beginPath();
            this.context.arc(unit.location.x, unit.location.y, 5, 0, 360);
            if (unit.teamIndex === 1) {
              this.context.fillStyle = '#3370d4'; // blue
            } else {
              this.context.fillStyle = '#c82124'; // red
            }
            this.context.closePath();
            this.context.fill();
            this.context.stroke();
          });
        });
    }
}
