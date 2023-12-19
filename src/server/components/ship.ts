import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { OnGameStarted } from "server/services/scheduler";
import { onGameStart } from "server/game/events";
import Signal from "@rbxts/signal";

export const toggleDoors = new Signal();

let opened = false;

/*
This whole file needs to be reworked.

Door opening is inverted, because toggle.Doors.Fire() runs async.
When setting opened = !opened, it's actually setting it to the previous value.
*/

let sound = new Instance("Sound");
sound.SoundId = "rbxassetid://8109376048";
sound.RollOffMinDistance = 50;

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

    private playSound() {
        sound.Parent = this.instance;
        sound.Play();
    }

    onStart() {
        toggleDoors.Connect(() => {
            this.playSound();
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

    private playSound() {
        sound.Parent = this.instance;
        sound.Play();
    }

    onStart() {
        toggleDoors.Connect(() => {
            this.playSound();
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

                    let text = "";
                    if (opened) {
                        text = "Close";
                    } else {
                        text = "Open";
                    }
                    (this.instance.FindFirstChild("ProximityPrompt") as ProximityPrompt).ActionText = text;
                })
            }
        });
    }
}

@Component({
    tag: "start_ship"
})
export class StartShip extends BaseComponent implements OnStart {
    constructor() {
        super();
    }

    onStart() {
        let prompt = this.instance.FindFirstChild("ProximityPrompt") as ProximityPrompt;
        prompt.Triggered.Connect(() => {
            prompt.Destroy();
            if (!opened) { // it's backwards, look man this whole file is bad
                toggleDoors.Fire();
                opened = !opened;
            }

        });
    }
}