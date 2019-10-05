import container from "../diContainer";

import { CoffeeStorage } from "../storage/storage";

import TYPES from "../types";
import { RoleEntity } from "../storage/entities/Role";
import { Log } from "../log";

export class RoleCache {
    roles: RoleEntity[];
    async initialize() {
        let storage = container.get<CoffeeStorage>(TYPES.Storage);
        this.roles = await storage.getRoles();
    }
}