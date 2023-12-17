import { Mob } from "../mob";

export class Shifter extends Mob {
    constructor() {
        super("shifter", "Shifter", 10, game.GetService("ReplicatedStorage").FindFirstChild("content")?.FindFirstChild("mobs")?.FindFirstChild("shifter") as BasePart);
    }
}