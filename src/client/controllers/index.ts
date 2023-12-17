import { Events } from "client/network";


Events.event.connect((message) => {
	print(`Event received, ${message}`);
});

print("Waiting for game load...");
while (!game.IsLoaded()) {
	wait();
}

print("Game loaded!");
