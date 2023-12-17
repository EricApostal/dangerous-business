import { Controller } from "@flamework/core";
import { Players } from "@rbxts/services";

@Controller({})
export class MouseController {
    constructor() {
        let mouse = Players.LocalPlayer.GetMouse();
        mouse.Icon = "rbxassetid://15659220875";
    }
}