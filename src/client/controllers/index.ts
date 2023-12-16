import { Events, Functions } from "client/network";
import { Item } from "shared/game/items/item";

Events.event.connect((message) => {
	print(`Event received, ${message}`);
});

Functions.pickupItem.setCallback((item: String) => {
	print(`Picked up item ${item}`);
});

print("Waiting for game load...");
while (!game.IsLoaded()) {
	wait();
}

print("Game loaded!");
