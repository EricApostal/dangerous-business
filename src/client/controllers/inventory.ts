import { Controller } from "@flamework/core";
import { spawnInventory } from "client/interface/inventory";

@Controller()
export class InventoryController {
    constructor() {
        spawnInventory();
    }
}