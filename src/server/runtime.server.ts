import { Flamework } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Events } from "./network";

Flamework.addPaths("src/server/components");
Flamework.addPaths("src/server/services");
Flamework.addPaths("src/shared/components");

Flamework.ignite();

// run when player joins
Players.PlayerAdded.Connect((player) => {
    print("Player joined", player.Name);
    Events.event.fire(player, "Hello from the server!");
});