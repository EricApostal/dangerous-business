import { Component, BaseComponent } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { onGameStart } from "server/game/events";
import { Functions } from "server/network";
import { Session } from "server/services/session";
import { Item } from "shared/game/items/item";

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
                print("Triggered!");
                Functions.pickupItem.invoke(player, this.instance.Name);
                this.instance.Destroy();
            });
        }
    }
}