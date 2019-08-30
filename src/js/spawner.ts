import { Player } from "./player.js";
import { Base } from "./base.js";

export class Spawner extends Base {
    parent: Player;
    constructor(parent: Player) {
        super();
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
