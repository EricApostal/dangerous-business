export class Item {
    name: String;
    value: Number;
    rarity: Number;
    model: Model;

    constructor(name: String, value: Number, rarity: Number, model: Model) {
        this.name = name;
        this.value = value;
        this.rarity = rarity;
        this.model = model;
    }

    equip() { }
    unequip() { }
    pickup() { }
    drop() { }
}