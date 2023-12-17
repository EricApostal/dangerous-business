import { Controller } from "@flamework/core";
import { spawnInventory, updateInventoryUI, updateSelected } from "client/interface/inventory";

import { Events, Functions } from "client/network";
import { Item } from "shared/game/items/item";
import { ItemRegistry } from "shared/game/items/registry";
import { RunService } from "@rbxts/services";
import { Players } from "@rbxts/services";

@Controller()
export class InventoryController {
    selected: number;
    inventory: Array<Item>;

    constructor() {
        spawnInventory();
        this.selected = 0;
        this.inventory = new Array<Item>();
        this.initBinds();
    }

    private async updateInventory() {
        this.inventory = await Functions.getItems.invoke();;
        updateInventoryUI(this.inventory);
    }

    private hasLargeItem(): boolean {
        for (let item of this.inventory) {
            if (!item.pockitable) {
                return true;
            }
        }
        return false;
    }

    private getHotbarItemCount(): number {
        let count = 0;
        for (let item of this.inventory) {
            if (item.pockitable) {
                count++;
            }
        }
        return count;
    }

    private initBinds() {
        Functions.pickupItem.setCallback(async (item: string) => {
            let itemObj: Item = ItemRegistry.getItem(item) as Item;
            let mod

            if (this.getHotbarItemCount() === 0) {
                this.selected = 0;
                updateSelected(this.selected);
            }

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

            this.updateInventory();
        });

        Functions.dropItem.setCallback(async (id: string) => {
            this.inventory = await Functions.getItems.invoke();
            if (this.selected > this.getHotbarItemCount() - 1) {
                this.selected = this.getHotbarItemCount() - 1;
                updateSelected(this.selected);
            }
            game.Workspace.FindFirstChild("largeitem_visualclone")?.Destroy();
        });

        game.GetService("UserInputService").InputBegan.Connect((input, gameProcessed) => {
            if (input.KeyCode === Enum.KeyCode.Q) {
                for (let item of this.inventory) {
                    if (!item.pockitable) {
                        Functions.dropItem.invoke(item.id);
                        return;
                    }
                }
                if (!this.inventory[this.selected]) return;
                Functions.dropItem.invoke(this.inventory[this.selected].id);
                this.updateInventory();
            }
        });

        // on scroll
        let _absoluteScroll: number = 0;
        game.GetService("UserInputService").InputChanged.Connect((input, gameProcessed) => {
            if (input.UserInputType === Enum.UserInputType.MouseWheel) {
                let delta = -input.Position.Z;
                _absoluteScroll += delta;
                this.selected = _absoluteScroll % this.getHotbarItemCount();

                updateSelected(this.selected);
            }
        });
    }
}



