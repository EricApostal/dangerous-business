import { OnStart, Service } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Modding } from "@flamework/core";
import { onGameStart } from "server/game/events";

export interface OnPlayerJoined {
    onPlayerJoined(player: Player): void;
}

@Service()
export class PlayerJoinService implements OnStart {
    onStart() {
        const listeners = new Set<OnPlayerJoined>();

        Modding.onListenerAdded<OnPlayerJoined>((object) => listeners.add(object));
        Modding.onListenerRemoved<OnPlayerJoined>((object) => listeners.delete(object));

        Players.PlayerAdded.Connect((player) => {
            for (const listener of listeners) {
                task.spawn(() => listener.onPlayerJoined(player));
            }
        })

        for (const player of Players.GetPlayers()) {
            for (const listener of listeners) {
                task.spawn(() => listener.onPlayerJoined(player));
            }
        }
    }
}

export interface OnGameStarted {
    onGameStarted(): void;
}

@Service()
export class GameStartService implements OnStart {
    onStart() {
        const listeners = new Set<OnGameStarted>();

        Modding.onListenerAdded<OnGameStarted>((object) => listeners.add(object));
        Modding.onListenerRemoved<OnGameStarted>((object) => listeners.delete(object));

        onGameStart.Connect(() => {
            for (const listener of listeners) {
                task.spawn(() => listener.onGameStarted());
            }
        });
    }
}