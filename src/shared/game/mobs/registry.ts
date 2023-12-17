import { Mob } from "./mob";
import { Shifter } from "./mobs/shifter";

export namespace MobRegistry {
    let _items: Map<string, Mob> = new Map();

    // Register items here
    _items.set("shifter", new Shifter());

    export let shifter: Shifter = new Shifter();

    export function getItem(name: string): Shifter | undefined {
        return _items.get(name)
    }

    export function getItems(): Map<string, Shifter> {
        return _items;
    }
}