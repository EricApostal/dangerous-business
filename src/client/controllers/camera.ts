import { Controller } from "@flamework/core";
import { Players } from "@rbxts/services";

@Controller({})
export class CameraController {
    constructor() {
        Players.LocalPlayer.CameraMode = Enum.CameraMode.LockFirstPerson;
    }
}