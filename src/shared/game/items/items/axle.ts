import { Item } from "../item";
import { ReplicatedStorage } from "@rbxts/services";

export class Axle extends Item {
    constructor() {
        super("axle", "Axle", 50, 10, ReplicatedStorage.FindFirstChild("content")?.FindFirstChild("parts")?.FindFirstChild("axle") as BasePart, false);
    }
}