import { Log } from "../log";
import sqlite3 = require('sqlite3');
import { createConnection, Connection } from "typeorm";
import { UserEntity } from "./entities/user";
import { TargetEntity } from "./entities/target";
import { DBError } from "../errors";
import { User } from "../models/user";
import { RouteError, ServerError } from "../routes/route";
import { injectable } from "inversify";
import { RoleEntity } from "./entities/Role";
import { Role } from "../models/role";
import { Target } from "../models/target";
import { WOLUtil } from "../wol.util";
import container from "../diContainer";
import TYPES from "../types";

@injectable()
export class CoffeeStorage {
    protected _connection: Connection;

    async stop() {
        await this._connection.close();
    }
    async initialize() {
        Log.i(`Connecting to DB: ${__dirname}.`);

        try {
            let connection = await createConnection({
                type: "sqlite",
                database: "coffee.sqlite",
                entities: [
                    //  __dirname + "/storage/entities/*.js"
                    UserEntity,
                    RoleEntity,
                ],
                synchronize: true,
            });
            this._connection = connection;
            Log.i("DB is connected");
            return Promise.resolve();
        } catch (err) {
            Log.e(`Could not connect to the DB ${err} `, err)
            return Promise.reject("Could not connect to the DB");
        }
    }

    async getUser(email: string, passwordHash: string): Promise<User> {
        try {
            let user = await this._connection.getRepository(UserEntity).findOne({ email: email, passwordHash: passwordHash } as UserEntity, { relations: ["roles"] });
            if (user == null || user == undefined) {
                return Promise.reject(new RouteError("User not found"));
            }
            return Promise.resolve({ name: user.email, roles: user.roles.map(e => e.caption) } as User);
        } catch (err) {
            Log.e("Getuser error: " + err, err);
            return Promise.reject(err)
        }
    }

    async searchUsers(queryString: string): Promise<User[]> {
        try {
            let users = await this._connection.getRepository(UserEntity).find({ relations: ["roles"] });

            return Promise.resolve(users.map(user => { return { name: user.email, roles: user.roles.map(role => role.caption) } as User }));
        } catch (err) {
            Log.e("Getusers error: " + err, err);
            return Promise.reject(err)
        }
    }
    async deleteUser(id: number): Promise<void> {
        try {
            await this._connection.getRepository(UserEntity).delete({ id: id });
            return Promise.resolve();
        } catch (err) {
            Log.e("deleteUser error: " + err, err);
            return Promise.reject(err)
        }
    }
    async saveUser(user: User): Promise<void> {
        try {
            let userEntity = await this._connection.getRepository(UserEntity).findOne({ id: user.id });
            if (userEntity == null) {//create
                await this._connection.getRepository(UserEntity).save({
                    passwordHash: "test",
                    email: user.email,
                    name: user.name
                } as UserEntity);
            } else {//update
                userEntity.passwordHash = user.passwordHash;
                userEntity.email = user.email;
                userEntity.name = user.name;
                await this._connection.getRepository(UserEntity).save(userEntity);
            }
            return Promise.resolve();
        } catch (err) {
            Log.e("saveUser error: " + err, err);
            return Promise.reject(err)
        }
    }
    async getAllRoles(): Promise<Role[]> {
        try {
            let roles = await this._connection.getRepository(RoleEntity).find();
            if (roles == null || roles == undefined) {
                return Promise.reject(new RouteError("Role not found"));
            }
            return Promise.resolve(roles.map(role => { return { caption: role.caption, id: role.id } as Role }));
        } catch (err) {
            Log.e("getRoles error: " + err, err);
            return Promise.reject(new ServerError("", err));
        }
    }

    async searchTargets(queryString: string): Promise<Target[]> {
        try {
            let targets = await this._connection.getRepository(TargetEntity).find({});
            return Promise.resolve(targets.map(target => { return { ipAddress: target.ipAddress, macAddress: target.macAddress, caption: target.caption, id: target.id } as Target }));
        } catch (err) {
            Log.e("getTargets error: " + err, err);
            return Promise.reject(err)
        }
    }
    async deleteTarget(id: number): Promise<void> {
        try {
            await this._connection.getRepository(TargetEntity).delete({ id: id });
            return Promise.resolve();
        } catch (err) {
            Log.e("deleteTarget error: " + err, err);
            return Promise.reject(err)
        }
    }
    async saveTarget(model: Target): Promise<void> {
        try {
            let entity = await this._connection.getRepository(TargetEntity).findOne({ id: model.id });
            if (entity == null) {//create
                await this._connection.getRepository(TargetEntity).save({
                    caption: model.caption,
                    ipAddress: model.ipAddress,
                    macAddress: model.macAddress,
                    id: model.id
                } as TargetEntity);
            } else {//update
                entity.id = model.id;
                entity.macAddress = model.macAddress;
                entity.ipAddress = model.ipAddress;
                entity.caption = model.caption;
                await this._connection.getRepository(TargetEntity).save(entity);
            }
            return Promise.resolve();
        } catch (err) {
            Log.e("saveTarget error: " + err, err);
            return Promise.reject(err)
        }
    }

    async wakeTarget(id: number): Promise<void> {
        try {
            let entity = await this._connection.getRepository(TargetEntity).findOne({ id: id });
            if (entity == null) {//create
                return Promise.reject("Invalid target ID");
            } else {
                var wol = container.get<WOLUtil>(TYPES.WOLUtil);
                await wol.wake(entity.macAddress, entity.ipAddress);
            }
            return Promise.resolve();
        } catch (err) {
            Log.e("saveTarget error: " + err, err);
            return Promise.reject(err)
        }
    }
}