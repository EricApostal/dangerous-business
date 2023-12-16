import { Component, BaseComponent } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { onGameStart } from "server/game/events";
import { Functions } from "server/network";
import { SessionManager } from "server/services/session";
import { Item } from "shared/game/items/item";
import { ItemRegistry } from "shared/game/items/registry";

@Component({
    tag: "loot",
})
export class Loot extends BaseComponent implements OnStart {
    constructor() {
        super();
    }

    onStart(): void {
        print("Attached loot to " + this.instance.Name);
        if (this.instance.IsA("BasePart")) {
            let prompt = this.instance.FindFirstChild("ProximityPrompt") as ProximityPrompt;
            prompt.Triggered.Connect((player) => {
                Functions.pickupItem.invoke(player, this.instance.Name);
                SessionManager.getSession(player)!.addItem(ItemRegistry.getItem(this.instance.Name.lower()) as Item);
                print(`new items: ${SessionManager.getSession(player)!.getItems().size()}`)
                print(SessionManager.getSession(player)!.getItems());
                this.instance.Destroy();
            });
        }
    }
}