import { Item } from "./item";
import { Axle } from "./items/axle";

export namespace ItemRegistry {
    let _items: Map<string, Item> = new Map();

    // Register items here
    _items.set("axle", new Axle())

    export let axle: Axle = new Axle();

    export function getItem(name: string): Item | undefined {
        print(`getting item ${name}`)
        return _items.get(name)
    }
}