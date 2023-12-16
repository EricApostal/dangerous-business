import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { OnGameStarted } from "server/services/scheduler";
import { onGameStart } from "server/game/events";

@Component({
    tag: "left_sliding_door"
})
export class SlidingDoor extends BaseComponent implements OnStart {
    constructor() {
        super();
    }

    onStart() {
        onGameStart.Connect(() => {
            if (this.instance.IsA("BasePart")) {
                const tween = game.GetService("TweenService");
                const tweenInfo = new TweenInfo(0.5, Enum.EasingStyle.Exponential, Enum.EasingDirection.Out);
                const pos = this.instance.Position;
                const tweenDoor = tween.Create(this.instance, tweenInfo, { Position: new Vector3(pos.X, pos.Y, pos.Z + 7) });
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
        onGameStart.Connect(() => {
            // Do tween to open ship door on game start 
            if (this.instance.IsA("BasePart")) {
                const tween = game.GetService("TweenService");
                const tweenInfo = new TweenInfo(0.5, Enum.EasingStyle.Exponential, Enum.EasingDirection.Out);
                const pos = this.instance.Position;
                const tweenDoor = tween.Create(this.instance, tweenInfo, { Position: new Vector3(pos.X, pos.Y, pos.Z - 7) });
                tweenDoor.Play();
            }
        });
    }
}