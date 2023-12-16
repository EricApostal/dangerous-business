export abstract class Item {
    name: String;
    displayName: String;
    value: Number;
    rarity: Number;
    pockitable: Boolean = true;

    constructor(name: String, displayName: String, value: Number, rarity: Number, pocketable: Boolean = true) {
        this.name = name;
        this.value = value;
        this.rarity = rarity;
        this.pockitable = pocketable;
        this.displayName = displayName;
    }

    equip() { }
    unequip() { }
    pickup() {
        print("Picked up item " + this.name);
    }
    drop() { }
}

export type ItemBase = Item;