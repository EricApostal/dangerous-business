export abstract class Item {
    name: String;
    displayName: String;
    value: Number;
    rarity: Number;
    pockitable: Boolean = true;
    model: BasePart;

    constructor(name: String, displayName: String, value: Number, rarity: Number, model: BasePart, pocketable: Boolean = true) {
        this.name = name;
        this.value = value;
        this.rarity = rarity;
        this.pockitable = pocketable;
        this.displayName = displayName;
        this.model = model;
    }

    onEquip() { }
    onUnequip() { }
    onPickup() { }
    onDrop() { }
}

export type ItemBase = Item;