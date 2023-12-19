import Signal from "@rbxts/signal";
import { Events } from "server/network";
import { GameSession } from "./state";

// On server start
export function init() {
    print("Initializing server...");
    wait(3);
    start();
}

// On game start
export function start() {
    GameSession.startGame();
    Events.startGame.broadcast();
}

// On game end
export function close() {
    GameSession.endGame();
    Events.endGame.broadcast();
}

