import { Events } from "server/network";
import Signal from "@rbxts/signal";

export namespace GameSession {
    let day = 1;
    let _gameStarted = false;

    export const onGameStart = new Signal();
    export const onGameEnd = new Signal();

    export function startGame() {
        _gameStarted = true;
        onGameStart.Fire();
        Events.startGame.broadcast();
    }

    export function endGame() {
        onGameEnd.Fire();
        Events.endGame.broadcast();
    }
}