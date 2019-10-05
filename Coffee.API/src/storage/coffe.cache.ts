import { injectable } from "inversify";
import { RoleCache } from "../cache/roleCache";
import { RoleEntity } from "./entities/Role";
import { Log } from "../log";

@injectable()
export class CoffeCache {
    private roles: RoleCache;

    async initialize() {
        Log.i("Initializing cache.");
        this.roles = new RoleCache();
        await this.roles.initialize();
        Log.i("Cache is initialized");
    }

    public get AllRoles(): RoleEntity[] {
        return this.roles.roles;
    }
    public get AdminRoles(): RoleEntity[] {
        return this.roles.roles.filter(r => { r.caption.toLowerCase().includes("admin") });
    }

    public get UserRoles(): RoleEntity[] {
        return this.roles.roles.filter(r => { r.caption.toLowerCase().includes("user") });
    }
}