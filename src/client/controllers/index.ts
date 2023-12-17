import { updateInventory } from "client/interface/inventory";
import { Events, Functions } from "client/network";
import { Item } from "shared/game/items/item";
import { ItemRegistry } from "shared/game/items/registry";
import { RunService } from "@rbxts/services";
import { Players } from "@rbxts/services";

Events.event.connect((message) => {
	print(`Event received, ${message}`);
});



print("Waiting for game load...");
while (!game.IsLoaded()) {
	wait();
}

print("Game loaded!");
