import { Networking } from "@flamework/networking";
import { Item, ItemBase } from "./game/items/item";

interface ClientToServerEvents {
    event(param1: string): void;
}

interface ServerToClientEvents {
    event(param1: string): void;
}

interface ClientToServerFunctions {
    func(param: string): void;
}

interface ServerToClientFunctions {
    func(param: string): void;
    pickupItem(name: string): void;
}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();
