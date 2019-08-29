import { Player } from "./player";

export class Spawner {
    parent: Player;
    constructor(parent: Player) {
        this.parent = parent;
    }

    spawnUnit(unit) {
        setTimeout(() => {
          const newUnit = new unit.instance(this.parent);
          newUnit.teamIndex = this.parent.teamIndex;
          newUnit.location = {
            x: this.parent.spawnArea.x + (Math.random() * this.parent.spawnArea.width),
            y: this.parent.spawnArea.y + (Math.random() * this.parent.spawnArea.height)
          };
          newUnit.init();
          this.spawnUnit(unit);
        }, unit.interval);
      }
}
