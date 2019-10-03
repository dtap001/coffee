import container from "../diContainer";

import { CoffeeStorage } from "../storage/storage";

import TYPES from "../types";
import { RoleEntity } from "../storage/entities/Role";
import { Log } from "../log";

export class RoleCache {
    roles: RoleEntity[];
    constructor() {
        let that = this;
        let storage = container.get<CoffeeStorage>(TYPES.Storage);
        storage.getRoles().then(function (roles) {
            that.roles = roles;
        }).catch(function (err) {
            Log.e(err, err);
        });
    }
}