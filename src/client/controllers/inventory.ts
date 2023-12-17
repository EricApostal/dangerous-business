import { Controller } from "@flamework/core";
import { spawnInventory } from "client/interface/inventory";

import { updateInventory } from "client/interface/inventory";
import { Events, Functions } from "client/network";
import { Item } from "shared/game/items/item";
import { ItemRegistry } from "shared/game/items/registry";
import { RunService } from "@rbxts/services";
import { Players } from "@rbxts/services";

@Controller()
export class InventoryController {
    constructor() {
        spawnInventory();
    }
}

let selected = 0;
let inventory = new Array<Item>();

Functions.pickupItem.setCallback(async (item: string) => {
    let itemObj: Item = ItemRegistry.getItem(item) as Item;
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
            localClone.CFrame = new CFrame(newPos, newPos.add(rootPart.CFrame.LookVector).add(camera.CFrame.LookVector.div(6)));
            localClone.Name = "largeitem_visualclone";
        });
    }

    inventory = await Functions.getItems.invoke();;
    updateInventory(inventory);
});

Functions.dropItem.setCallback(async (id: string) => {
    inventory = await Functions.getItems.invoke();
    game.Workspace.FindFirstChild("largeitem_visualclone")?.Destroy();

    print("items: ");
    print(inventory);
});

game.GetService("UserInputService").InputBegan.Connect((input, gameProcessed) => {
    if (input.KeyCode === Enum.KeyCode.Q) {
        print("Inventory: ");
        print(inventory);
        for (let item of inventory) {
            if (!item.pockitable) {
                Functions.dropItem.invoke(item.id);
                break;
            }
        }
    }
});