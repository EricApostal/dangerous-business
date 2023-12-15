import { Flamework } from "@flamework/core";
import { init } from "server/game/events";

Flamework.addPaths("src/server/components");
Flamework.addPaths("src/server/services");
Flamework.addPaths("src/shared/components");

Flamework.ignite();

// Initialize Game
init();