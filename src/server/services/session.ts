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

    addItem(item: Item): boolean {
        if (!item.pockitable) {

            // Ensure we aren't already holding a non-pocketable item 
            for (let itm of this._items) {
                if (!itm.pockitable) {
                    return false;
                }
            }
        }

        this._items.push(item);
        return true;
    }

    removeItem(item: Item) {
        this._items.find((curr) => curr === item);
    }

    removeItemById(id: string) {
        this._items.remove(this._items.indexOf(this._items.find((curr) => curr.id === id) as Item));
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

export namespace SessionManager {
    let _sessions: Map<Player, PlayerData> = new Map();

    export function init() {
        Players.PlayerAdded.Connect((player) => {
            createSession(player);
        });

        Players.PlayerRemoving.Connect((player) => {
            destroySession(player);
        });
    }

    export function getSession(player: Player) {
        return _sessions.get(player);
    }

    export function createSession(player: Player) {
        _sessions.set(player, new PlayerData());
    }

    export function destroySession(player: Player) {
        _sessions.delete(player);
    }
}

@Service()
class SessionService {
    constructor() {
        SessionManager.init();
    }
}