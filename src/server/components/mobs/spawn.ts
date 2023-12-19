import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { onGameStart } from "server/game/events";
import { Shifter } from "shared/game/mobs/mobs/shifter";
import { MobRegistry } from "shared/game/mobs/registry";

let spawnChance = 50;

@Component({
    tag: "mob_spawn"
})
export class SpawnPad extends BaseComponent implements OnStart {
    constructor() {
        super();
    }

    private shuffle(map: Map<String, Shifter>): Array<[String, Shifter]> {
        let arr: Array<[String, Shifter]> = [];
        map.forEach((value, key) => {
            arr.push([key, value]);
        });

        // Shuffle the array using the Fisher-Yates algorithm
        for (let i = arr.size() - 1; i > 0; i--) {
            const j = math.floor(math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }

        return arr;
    }

    private spawnMobs() {
        let toSpawn: Shifter | undefined;
        while (!toSpawn) {
            for (let item of this.shuffle(MobRegistry.getItems())) {
                let chance = 100 - item[1].rarity;
                if (math.random(1, 100) <= chance) {
                    toSpawn = item[1];
                    let model = toSpawn.model.Clone();
                    model.CFrame = (this.instance as BasePart).CFrame.add(new Vector3(0, 1, 0));
                    model.Anchored = true;
                    model.Parent = game.Workspace;
                    break;
                }
            }
        }
    }

    onStart() {
        onGameStart.Connect(() => {
            task.wait(30);
            if (math.random(1, 100) > spawnChance) { return; }
            this.spawnMobs();
        });
    }
}