import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { CollectionService } from "@rbxts/services";

@Component({
    tag: "map_door"
})
export class EntryDoor extends BaseComponent implements OnStart {
    constructor() {
        super();
    }

    onStart() {
        let prompt: ProximityPrompt = new Instance("ProximityPrompt");
        prompt.Parent = this.instance;
        prompt.ActionText = "Enter";
        prompt.MaxActivationDistance = 8;
        prompt.HoldDuration = 0.5;
        prompt.ObjectText = "Door";
        prompt.Enabled = true;
        prompt.Triggered.Connect((player) => {
            CollectionService.GetTagged("map_spawn").forEach((tag) => {
                if (tag.GetAttribute("channel") === this.instance.GetAttribute("channel"))
                    (player.Character!.FindFirstChild("HumanoidRootPart") as BasePart)!.CFrame = (tag as BasePart).CFrame.add(new Vector3(0, 5, 0));
            });
        });
    }
}