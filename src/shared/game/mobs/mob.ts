export abstract class Mob {
    name: string;
    displayName: string;
    rarity: number;
    model: BasePart;
    id: string;

    constructor(name: string, displayName: string, rarity: number, model: BasePart) {
        this.name = name;
        this.displayName = displayName;
        this.rarity = rarity;
        this.model = model;
        this.id = game.GetService("HttpService").GenerateGUID(false);
    }

}