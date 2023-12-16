export class Item {
    name: String;
    value: Number;
    rarity: Number;

    constructor(name: String, value: Number, rarity: Number) {
        this.name = name;
        this.value = value;
        this.rarity = rarity;
    }

    equip() { }
    unequip() { }
    pickup() {
        print("Picked up item " + this.name);
    }
    drop() { }
}

export type ItemBase = Item;