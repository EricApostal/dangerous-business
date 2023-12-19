import { Players } from "@rbxts/services";
import { RunService } from "@rbxts/services";
import { Lighting } from "@rbxts/services";

let camera: Camera = game.Workspace.WaitForChild("Camera") as Camera;
let mockPart = new Instance("Part");
mockPart.Parent = game.Workspace;
mockPart.Anchored = true;
mockPart.CanCollide = false;
mockPart.Size = new Vector3(1, 1, 1);
mockPart.Transparency = 1;

// set lighting density
(Lighting.FindFirstChild("Atmosphere")! as Atmosphere).Density = 0.8;

Lighting.Brightness = 4;

let light = new Instance("SpotLight");
light.Brightness = 3;
light.Enabled = true;
light.Range = 40;
light.Angle = 90;
light.Parent = mockPart;

RunService.RenderStepped.Connect(() => {
    mockPart.CFrame = camera.CFrame;
});
