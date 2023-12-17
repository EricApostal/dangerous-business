import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { OnGameStarted } from "server/services/scheduler";
import { onGameStart } from "server/game/events";
import Signal from "@rbxts/signal";

export const toggleDoors = new Signal();

let opened = false;

onGameStart.Connect(() => {
    toggleDoors.Fire();
});

@Component({
    tag: "left_sliding_door"
})
export class SlidingDoor extends BaseComponent implements OnStart {
    constructor() {
        super();
    }

    onStart() {
        toggleDoors.Connect(() => {
            let modifier = 7;
            if (opened) {
                modifier = -7;
            }
            if (this.instance.IsA("BasePart")) {
                const tween = game.GetService("TweenService");
                const tweenInfo = new TweenInfo(0.5, Enum.EasingStyle.Exponential, Enum.EasingDirection.Out);
                const pos = this.instance.Position;
                const tweenDoor = tween.Create(this.instance, tweenInfo, { Position: new Vector3(pos.X, pos.Y, pos.Z + modifier) });
                tweenDoor.Play();
            }
        });
    }
}

@Component({
    tag: "right_sliding_door"
})
export class RightSlidingDoor extends BaseComponent implements OnStart {
    constructor() {
        super();
    }

    onStart() {
        toggleDoors.Connect(() => {
            let modifier = 7;
            if (opened) {
                modifier = -7;
            }

            // Do tween to open ship door on game start 
            if (this.instance.IsA("BasePart")) {
                const tween = game.GetService("TweenService");
                const tweenInfo = new TweenInfo(0.5, Enum.EasingStyle.Exponential, Enum.EasingDirection.Out);
                const pos = this.instance.Position;
                const tweenDoor = tween.Create(this.instance, tweenInfo, { Position: new Vector3(pos.X, pos.Y, pos.Z - modifier) });
                tweenDoor.Play();
            }
        });
    }
}

@Component({
    tag: "ship_door_open"
})
export class ShipDoorOpener extends BaseComponent implements OnStart {
    constructor() {
        super();
    }

    onStart() {
        onGameStart.Connect(() => {
            // Do tween to open ship door on game start 
            if (this.instance.IsA("BasePart")) {
                (this.instance.FindFirstChild("ProximityPrompt") as ProximityPrompt).Triggered.Connect(() => {
                    toggleDoors.Fire();
                    opened = !opened;
                    let text = "Open";
                    if (opened) {
                        text = "Close";
                    }
                    (this.instance.FindFirstChild("ProximityPrompt") as ProximityPrompt).ActionText = text;
                })
            }
        });
    }
}