import { Functions } from "server/network";
import { SessionManager } from "./session";
import Signal from "@rbxts/signal";
import { Item } from "shared/game/items/item";

export namespace Inventory { }

export const onItemDropped = new Signal<(player: Player, item: Item) => void>();

Functions.getItems.setCallback(async (player) => {
    let session = SessionManager.getSession(player);
    let items = session!.getItems();
    return items;
});

Functions.dropItem.setCallback(async (player, id: string) => {
    let session = SessionManager.getSession(player);
    let itemObj = session!.getItemById(id);
    let itemModel = itemObj!.model;
    let newModel = itemModel.Clone();
    let rootPart = player.Character!.FindFirstChild("HumanoidRootPart")! as BasePart;
    let rootPos = rootPart.Position;
    let offset = 4;

    newModel.Parent = game.Workspace;
    newModel.CFrame = new CFrame(rootPos.add(rootPart.CFrame.LookVector.mul(offset)), rootPos.add(rootPart.CFrame.LookVector));
    newModel.Anchored = false;

    session!.removeItemById(id);
    onItemDropped.Fire(player, itemObj as Item);
    Functions.dropItem.invoke(player, id);
});