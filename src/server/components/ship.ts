import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";

@Component({
    tag: "ship_door"
})
export class SlidingDoor extends BaseComponent implements OnStart {
    constructor() {
        super();
    }

    onStart() {
        print(`Attached to ${this.instance.GetFullName()}`);
    }

    onGameStart() {
        // Do tween to open ship door on game start 
        if (this.instance.IsA("BasePart")) {
            const tween = game.GetService("TweenService");
            const tweenInfo = new TweenInfo(9, Enum.EasingStyle.Linear, Enum.EasingDirection.Out);
            const pos = this.instance.Position;
            const tweenDoor = tween.Create(this.instance, tweenInfo, { Position: new Vector3(pos.X, pos.Y - 11, pos.Z) });
            tweenDoor.Play();
        }
    }
}