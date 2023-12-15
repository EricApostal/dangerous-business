import { Service } from "@flamework/core";
import { OnPlayerJoined } from "server/services/scheduler";

print("index loaded")

@Service()
export class PlayerJoinListener implements OnPlayerJoined {
    onPlayerJoined(player: Player) {
        print(`Player ${player.Name} joined (scheduler works)!`);
    }
}