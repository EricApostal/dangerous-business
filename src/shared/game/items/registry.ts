import { Item } from "./item";
import { Axle } from "./items/axle";
import { Cup } from "./items/cup";

export namespace ItemRegistry {
    let _items: Map<string, Item> = new Map();

    // Register items here
    _items.set("axle", new Axle());
    _items.set("cup", new Cup());

    export let axle: Axle = new Axle();

    export function getItem(name: string): Item | undefined {
        return _items.get(name)
    }
}