export abstract class Item {
    name: string;
    displayName: string;
    value: number;
    rarity: number;
    pockitable: boolean = true;
    model: BasePart;
    id: string;

    constructor(name: string, displayName: string, value: number, rarity: number, model: BasePart, pocketable: boolean = true) {
        this.name = name;
        this.value = value;
        this.rarity = rarity;
        this.pockitable = pocketable;
        this.displayName = displayName;
        this.model = model;
        this.id = game.GetService("HttpService").GenerateGUID(false);
    }

    onEquip() { }
    onUnequip() { }
    onPickup() { }
    onDrop() { }
}

export type ItemBase = Item;