import { updateInventory } from "client/interface/inventory";
import { Events, Functions } from "client/network";
import { Item } from "shared/game/items/item";
import { ItemRegistry } from "shared/game/items/registry";
import { RunService } from "@rbxts/services";
import { Players } from "@rbxts/services";

Events.event.connect((message) => {
	print(`Event received, ${message}`);
});

Functions.pickupItem.setCallback((item: string) => {
	let itemObj: Item = ItemRegistry.getItem(item) as Item;
	updateInventory([itemObj]);
	print(`Picked up item ${item}`);

	if (!itemObj.pockitable) {
		let localClone = itemObj.model.Clone();
		localClone.Parent = game.Workspace;
		localClone.CanCollide = false;
		RunService.RenderStepped.Connect(() => {
			let offset = 3;
			let rootPart = Players.LocalPlayer.Character?.FindFirstChild("HumanoidRootPart") as BasePart;
			let camera = game.Workspace.CurrentCamera as Camera;
			let newPos = new Vector3(rootPart.Position.X + camera.CFrame.LookVector.X * offset, rootPart.Position.Y + camera.CFrame.LookVector.Y * offset, rootPart.Position.Z + camera.CFrame.LookVector.Z * offset);
			localClone.CFrame = new CFrame(newPos, newPos.add(rootPart.CFrame.LookVector).add(camera.CFrame.LookVector.div(2)));
		});
	}
});

print("Waiting for game load...");
while (!game.IsLoaded()) {
	wait();
}

print("Game loaded!");
