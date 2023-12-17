import { Item } from "../item";
import { ReplicatedStorage } from "@rbxts/services";

export class Axle extends Item {
    constructor() {
        let pickupSound = new Instance("Sound");
        pickupSound.SoundId = "rbxassetid://9116524904";

        let dropSound = new Instance("Sound");
        dropSound.SoundId = "rbxassetid://9125670281";

        super("axle", "Axle", 50, 10, ReplicatedStorage.FindFirstChild("content")?.FindFirstChild("parts")?.FindFirstChild("axle") as BasePart, pickupSound, dropSound, false);
    }
}