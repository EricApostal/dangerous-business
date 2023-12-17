import { Controller } from "@flamework/core";
import { Players } from "@rbxts/services";

@Controller({})
export class CameraController {
    constructor() {
        let camera = game.Workspace.CurrentCamera as Camera;
        camera.CameraType = Enum.CameraType.Scriptable;
        camera.FieldOfView = 70;
        camera.CFrame = new CFrame(0, 0, 0, 0, 0, 1, 0, -1, 0, 1, 0, 0);
        camera.CameraSubject = Players.LocalPlayer.Character?.FindFirstChild("Head") as BasePart;
        Players.LocalPlayer.CameraMode = Enum.CameraMode.LockFirstPerson;
    }
}