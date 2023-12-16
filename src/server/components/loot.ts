import { Component, BaseComponent } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { onGameStart } from "server/game/events";

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
            this.instance.Touched.Connect(() => {
                if (this.instance) {
                    this.instance.Destroy();
                }
            });
        }
    }
}