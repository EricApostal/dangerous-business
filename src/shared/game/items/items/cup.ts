import { Item } from "../item";
import { ReplicatedStorage } from "@rbxts/services";

export class Cup extends Item {
    constructor() {
        let pickupSound = new Instance("Sound");
        pickupSound.SoundId = "rbxassetid://9119516524";

        let dropSound = new Instance("Sound");
        dropSound.SoundId = "rbxassetid://9113642774";

        super("cup", "Cup", 5, 5, ReplicatedStorage.FindFirstChild("content")?.FindFirstChild("parts")?.FindFirstChild("cup") as BasePart, pickupSound, dropSound, true);
    }
}