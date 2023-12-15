import Signal from "@rbxts/signal";

export const onGameStart = new Signal();

// On server start
export function init() {
    print("Initializing server...");
    wait(5);
    start();
}

// On game start
export function start() {
    onGameStart.Fire();
}

// On game end
export function close() {

}

