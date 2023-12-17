import { Item } from "../item";
import { ReplicatedStorage } from "@rbxts/services";

export class Cup extends Item {
    constructor() {
        super("cup", "Cup", 5, 5, ReplicatedStorage.FindFirstChild("content")?.FindFirstChild("parts")?.FindFirstChild("cup") as BasePart, true);
    }
}