export abstract class Item {
    name: string;
    displayName: string;
    value: number;
    rarity: number;
    model: BasePart;
    pickupSound: Sound;
    dropSound: Sound;
    id: string;

    pockitable: boolean = true;

    constructor(name: string, displayName: string, value: number, rarity: number, model: BasePart, pickupSound: Sound, dropSound: Sound, pocketable: boolean = true) {
        this.name = name;
        this.value = value;
        this.rarity = rarity;
        this.pockitable = pocketable;
        this.displayName = displayName;
        this.model = model;
        this.pickupSound = pickupSound;
        this.dropSound = dropSound;
        this.id = game.GetService("HttpService").GenerateGUID(false);
    }

    onEquip() { }
    onUnequip() { }
    onPickup() { }
    onDrop() { }
}

export type ItemBase = Item;