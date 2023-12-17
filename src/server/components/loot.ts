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
                let newItem = ItemRegistry.getItem(this.instance.Name.lower()) as Item;

                if (SessionManager.getSession(player)!.addItem(newItem)) {
                    Functions.pickupItem.invoke(player, this.instance.Name, newItem.id);
                    print(`new items: ${SessionManager.getSession(player)!.getItems().size()}`)
                    print(SessionManager.getSession(player)!.getItems());

                    if (newItem.pockitable) { this.instance.Destroy(); } else {
                        let leftHand = player.Character?.FindFirstChild("LeftHand") as BasePart;
                        this.instance.Parent = leftHand;
                        (this.instance as BasePart).CFrame = leftHand.CFrame;
                        this.instance.FindFirstChild("ProximityPrompt")?.Destroy();
                        let weld = new Instance("WeldConstraint");
                        weld.Parent = this.instance;
                        (this.instance as BasePart).Anchored = false;
                        weld.Part0 = this.instance as BasePart;
                        weld.Part1 = leftHand;
                    }
                }
            });
        }
    }
}