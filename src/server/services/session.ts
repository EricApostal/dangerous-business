import { Service } from "@flamework/core";
import { Item } from "shared/game/items/item";
import { Players } from "@rbxts/services";

class PlayerData {
    private _points: number = 0;
    private _items: Array<Item> = [];

    constructor() {

    }

    getItems() {
        return this._items;
    }

    addItem(item: Item) {
        this._items.push(item);
    }

    removeItem(item: Item) {
        this._items.find((curr) => curr === item);
    }

    getPoints() {
        return this._points;
    }

    setPoints(points: number) {
        this._points = points;
    }

    addPoints(points: number) {
        this._points += points;
    }

    removePoints(points: number) {
        this._points -= points;
    }
}

@Service()
export class Session {
    private _sessions: Map<Player, PlayerData> = new Map();

    constructor() {
        Players.PlayerAdded.Connect((player) => {
            this.createSession(player);
        });

        Players.PlayerRemoving.Connect((player) => {
            this.destroySession(player);
        });
    }

    getSession(player: Player) {
        return this._sessions.get(player);
    }

    createSession(player: Player) {
        this._sessions.set(player, new PlayerData());
    }

    destroySession(player: Player) {
        this._sessions.delete(player);
    }
}
