import { Functions } from "server/network";
import { SessionManager } from "./session";

export namespace Inventory { }

Functions.getItems.setCallback(async (player) => {
    let session = SessionManager.getSession(player);
    let items = session!.getItems();
    return items;
});

Functions.dropItem.setCallback(async (player, id: string) => {
    let session = SessionManager.getSession(player);
    session!.removeItemById(id);
    Functions.dropItem.invoke(player, id);
});