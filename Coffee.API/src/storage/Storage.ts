import { Log } from "../log";
import sqlite3 = require('sqlite3');
import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import { UserEntity } from "./entities/User";
import { DBError } from "../errors";
import { User } from "../models/user";
import { RouteError, ServerError } from "../routes/route";
import { injectable } from "inversify";
import { RoleEntity } from "./entities/Role";

@injectable()
export class CoffeeStorage {
    private _connection: Connection;
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

    async getUsers(queryString: string): Promise<User[]> {
        try {
            let users = await this._connection.getRepository(UserEntity).find({ relations: ["roles"] });

            return Promise.resolve(users.map(user => { return { name: user.email, roles: user.roles.map(role => role.caption) } as User }));
        } catch (err) {
            Log.e("Getusers error: " + err, err);
            return Promise.reject(err)
        }
    }

    async getRoles(): Promise<RoleEntity[]> {
        try {
            let roles = await this._connection.getRepository(RoleEntity).find();
            if (roles == null || roles == undefined) {
                return Promise.reject(new RouteError("Role not found"));
            }
            return Promise.resolve(roles);
        } catch (err) {
            Log.e("getRoles error: " + err, err);
            return Promise.reject(new ServerError("", err));
        }
    }
}