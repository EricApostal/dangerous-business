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
            let prompt: ProximityPrompt = new Instance("ProximityPrompt");

            prompt.Parent = this.instance;
            prompt.ActionText = `Pick Up`;
            prompt.MaxActivationDistance = 8;
            prompt.HoldDuration = 0.5;
            prompt.ObjectText = ItemRegistry.getItem(this.instance.Name)?.displayName as string;
            prompt.Enabled = true;

            prompt.Triggered.Connect((player) => {
                if (SessionManager.getSession(player)!.addItem(ItemRegistry.getItem(this.instance.Name.lower()) as Item)) {
                    Functions.pickupItem.invoke(player, this.instance.Name);
                    print(`new items: ${SessionManager.getSession(player)!.getItems().size()}`)
                    print(SessionManager.getSession(player)!.getItems());
                    this.instance.Destroy();
                }
            });
        }
    }
}