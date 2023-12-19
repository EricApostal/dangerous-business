import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { GameSession } from "server/game/state";
import { Item } from "shared/game/items/item";
import { ItemRegistry } from "shared/game/items/registry";

@Component({
    tag: "loot_spawn"
})
export class SpawnPad extends BaseComponent implements OnStart {
    constructor() {
        super();
    }

    private shuffle(map: Map<String, Item>): Array<[String, Item]> {
        let arr: Array<[String, Item]> = [];
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

    private spawnLoot() {
        let toSpawn: Item | undefined;
        while (!toSpawn) {
            for (let item of this.shuffle(ItemRegistry.getItems())) {
                let chance = 100 - item[1].rarity;
                if (math.random(1, 100) <= chance) {
                    toSpawn = item[1];
                    let model = toSpawn.model.Clone();
                    model.Position = (this.instance as BasePart).Position.add(new Vector3(0, 1, 0));
                    model.Anchored = true;
                    model.Parent = game.Workspace;
                    break;
                }
            }
        }
    }

    onStart() {
        GameSession.onGameStart.Connect(() => {
            this.spawnLoot();
        });
    }

}