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
import { Job } from "../models/job";
import { JobEntity } from "./entities/job";
import { DisocveryEntity } from "./entities/discovery";
import { Discovery } from "../models/discovery";
import { PinnedTarget } from "../models/pinnedTarget";
import { CommonUtil } from "../utils";
import { Config } from "../config";

@injectable()
export class CoffeeStorage {
    protected _connection: Connection;

    async stop() {
        await this._connection.close();
    }
    async initialize() {
        let dbPath = Config.GetDBPath();
        Log.i(`Connecting to DB: ${dbPath}.`);

        try {
            let connection = await createConnection({
                type: "sqlite",
                database: dbPath,//"coffee.sqlite",
                entities: [
                    //  __dirname + "/storage/entities/*.js"
                    UserEntity,
                    RoleEntity,
                    TargetEntity,
                    JobEntity,
                    DisocveryEntity

                ],
                synchronize: true,
            });
            this._connection = connection;
            Log.i("DB is connected");

            await this.ensureDefaultUser();

            return Promise.resolve();
        } catch (err) {
            Log.e(`Could not connect to the DB ${err} `, err)
            return Promise.reject("Could not connect to the DB");
        }
    }
    async ensureDefaultUser() {
        try {
            let roles = await this._connection.getRepository(RoleEntity).find();
            if (roles == null || roles.length == 0) {
                await this._connection.getRepository(RoleEntity).save({
                    caption: "All"
                });
            }

            let rolesX = await this._connection.getRepository(RoleEntity).find();

            let users = await this._connection.getRepository(UserEntity).find({ relations: ["roles"] });
            if (users == null || users.length == 0) {
                await this._connection.getRepository(UserEntity).save({
                    passwordHash: CommonUtil.hash('admin'),
                    email: "admin",
                    name: "admin",
                    roles: rolesX
                } as UserEntity);
            }

            return Promise.resolve();
        } catch (err) {
            Log.e("ensureDefaultUser error: " + err, err);
            return Promise.reject(err)
        }
    }

    async getUser(email: string, password: string): Promise<User> {
        try {
            let user = await this._connection.getRepository(UserEntity).findOne({ email: email, passwordHash: CommonUtil.hash(password) } as UserEntity, { relations: ["roles"] });
            if (user == null || user == undefined) {
                return Promise.reject(new RouteError("User not found"));
            }
            return Promise.resolve({ id: user.id, userName: user.email, roles: user.roles.map(e => e.caption) } as User);
        } catch (err) {
            Log.e("Getuser error: " + err, err);
            return Promise.reject(err)
        }
    }

    async searchUsers(queryString: string): Promise<User[]> {
        try {
            let users = await this._connection.getRepository(UserEntity).find({ relations: ["roles"] });

            return Promise.resolve(users.map(user => { return { id: user.id, userName: user.email, roles: user.roles.map(role => role.caption) } as User }));
        } catch (err) {
            Log.e("searchUsers error: " + err, err);
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
            if (userEntity == null || userEntity == undefined) {//create
                await this._connection.getRepository(UserEntity).save({
                    passwordHash: CommonUtil.hash('password'),
                    email: user.email,
                    name: user.userName
                } as UserEntity);
            } else {//update
                userEntity.passwordHash = CommonUtil.hash(user.password);
                userEntity.email = user.userName;
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
            return Promise.resolve(targets.map(target => { return { ipAddress: target.ipAddress, macAddress: target.macAddress, caption: target.caption, id: target.id, isPinned: target.isPinned } as Target }));
        } catch (err) {
            Log.e("getTargets error: " + err, err);
            return Promise.reject(err)
        }
    }

    async getTargetById(id: number): Promise<Target> {
        try {
            let target = await this._connection.getRepository(TargetEntity).findOne({ id: id });
            return Promise.resolve({ ipAddress: target.ipAddress, macAddress: target.macAddress, caption: target.caption, id: target.id, isPinned: target.isPinned, pinCode: target.pinCode } as Target);
        } catch (err) {
            Log.e("getTargets error: " + err, err);
            return Promise.reject(err)
        }
    }
    async targetsGetPinned(): Promise<PinnedTarget[]> {
        try {
            let targets = await this._connection.getRepository(TargetEntity).find({ isPinned: true });
            return Promise.resolve(targets.map(target => { return { caption: target.caption, id: target.id } as PinnedTarget }));
        } catch (err) {
            Log.e("getTargets error: " + err, err);
            return Promise.reject(err)
        }
    }
    async deleteTarget(id: number): Promise<void> {
        try {
            let target = await this._connection.getRepository(TargetEntity).find({ id: id });
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
            if (entity == null || entity == undefined) {//create
                entity = await this._connection.getRepository(TargetEntity).save({
                    caption: model.caption,
                    ipAddress: model.ipAddress,
                    macAddress: model.macAddress,
                    isPinned: model.isPinned == null ? false : model.isPinned,
                    pinCode: model.pinCode == null ? -1 : model.pinCode
                } as TargetEntity);
            } else {//update                
                entity.macAddress = model.macAddress;
                entity.ipAddress = model.ipAddress;
                entity.caption = model.caption;
                entity.isPinned = model.isPinned == null ? false : model.isPinned;
                entity.pinCode = model.pinCode == null ? -1 : model.pinCode;
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
            if (entity == null || entity == undefined) {//create
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

    async saveJob(model: Job): Promise<void> {
        try {
            let entity = await this._connection.getRepository(JobEntity).findOne({ id: model.id });
            if (entity == null || entity == undefined) {//create
                await this._connection.getRepository(JobEntity).save({
                    caption: model.caption,
                    cronTiming: model.cronTiming,
                    target: model.target
                } as JobEntity);
            } else {//update
                entity.cronTiming = model.cronTiming;
                entity.target = model.target;
                entity.caption = model.caption;
                await this._connection.getRepository(JobEntity).save(entity);
            }
            return Promise.resolve();
        } catch (err) {
            Log.e("saveJob error: " + err, err);
            return Promise.reject(err)
        }
    }

    async deleteJob(id: number): Promise<void> {
        try {
            await this._connection.getRepository(JobEntity).delete({ id: id });
            return Promise.resolve();
        } catch (err) {
            Log.e("deleteJob error: " + err, err);
            return Promise.reject(err)
        }
    }

    async getDiscovery(network: string): Promise<Discovery> {
        try {
            let entity = await this._connection.getRepository(DisocveryEntity).findOne({ network: network });
            if (entity == null) { return Promise.resolve(null); }
            return Promise.resolve({ id: entity.id, finishedTimeStamp: entity.finishedTimeStamp, network: entity.network, startedTimeStamp: entity.startedTimeStamp } as Discovery);
        } catch (err) {
            Log.e("getDiscovery error: " + err, err);
            return Promise.reject(err)
        }
    }

    async saveDiscovery(model: Discovery): Promise<void> {
        try {
            let entity = await this._connection.getRepository(DisocveryEntity).findOne({ id: model.id });
            if (entity == null || entity == undefined) {//create
                await this._connection.getRepository(DisocveryEntity).save({
                    network: model.network,
                    startedTimeStamp: model.startedTimeStamp,
                    finishedTimeStamp: model.finishedTimeStamp,
                } as DisocveryEntity);
            } else {//update                
                entity.network = model.network;
                entity.startedTimeStamp = model.startedTimeStamp;
                entity.finishedTimeStamp = model.finishedTimeStamp;
                await this._connection.getRepository(DisocveryEntity).save(entity);
            }
            return Promise.resolve();
        } catch (err) {
            Log.e("saveDiscovery error: " + err, err);
            return Promise.reject(err)
        }
    }
    async pinTarget(id: number): Promise<void> {
        try {
            let entity = await this._connection.getRepository(TargetEntity).findOne({ id: id });
            if (entity == null || entity == undefined) {//create
                return Promise.reject("Invalid target ID");
            } else {
                entity.isPinned = !entity.isPinned;
                await this._connection.getRepository(TargetEntity).save(entity);
            }
            return Promise.resolve();
        } catch (err) {
            Log.e("pinTarget error: " + err, err);
            return Promise.reject(err)
        }
    }
}