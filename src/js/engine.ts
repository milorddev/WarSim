import { Soldier } from './soldier.js';
import { Base } from './base.js';

export namespace Engine {

  export let canvas: HTMLCanvasElement;
  export let context: CanvasRenderingContext2D;
  export const unitStack: object = {};
  export let spawnable: {
    soldier: {
      enabled: boolean,
      interval: number,
      instance: Base
    }
  };
    export function initEngine() {
        console.log('engine service started');
        this.spawnable = {
          soldier: {
            enabled: true,
            interval: 1000,
            instance: Soldier
          }
        };
    }

    export function initCanvasElement(canvasElement: HTMLCanvasElement) {
        return new Promise<boolean>((resolve, reject) => {
            this.initEngine();
            this.canvas = canvasElement;
            this.canvas.width = document.body.clientWidth;
            this.canvas.height = document.body.clientHeight - (document.body.clientHeight * 0.10);
            this.context = this.canvas.getContext('2d');
            this.tick();
            resolve(true);
        });
      }

    export function tick() {
        requestAnimationFrame(() => {
            this.clearFrame();
            this.updateFrame();
            this.tick();
        });
    }
    
    export function clearFrame() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    export function updateFrame() {
      const keys = Object.keys(this.unitStack);
      for(var i in keys){
        const unit = this.unitStack[keys[i]];
        if (unit) {
          unit.tick();
          this.drawFrame(unit);
        }
      }
    }
    
    export function drawFrame(unit: Base) {
      if (unit.animEngine) {
        const buffer = unit.animEngine.bufferCanvas;
        this.context.drawImage(
          buffer,
          unit.location.x - unit.animEngine.animOffset.x,
          unit.location.y - unit.animEngine.animOffset.y
        );

        if (unit.teamIndex === 1) {
          
          // this.context.fillStyle = '#3370d4'; // blue
        } else {
          
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

    export function generateUUID() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
}
