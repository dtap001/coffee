import { Log } from "../log";
import { Config } from "../config";
import sqlite3 = require('sqlite3');
import { injectable, inject } from "inversify";
import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import { UserEntity } from "./entities/User";
import { Role } from "./entities/Role";
import { rejects } from "assert";
import { DBError } from "../errors";
import { User } from "../models/user";

@injectable()
export class CoffeeStorage {
    private _connection: Connection;
    async initialize() {
        let that = this
        /*  await createConnection({
              type: "sqlite",
              database: "coffee.sqlite",
              entities: [
                  //  __dirname + "/storage/entities/*.js"
                  UserEntity,
                  Role,
              ],
              synchronize: true,
          }).then(connection => {
              Log.d("Connected to the DB");
              that._connection = connection;
          }).catch(error => {
              Log.e(`Could not connect to the DB ${error} `, error)
              throw new DBError("Could not connect to the DB");
          });*/
        try {


            let connection = await createConnection({
                type: "sqlite",
                database: "coffee.sqlite",
                entities: [
                    //  __dirname + "/storage/entities/*.js"
                    UserEntity,
                    Role,
                ],
                synchronize: true,
            });
            this._connection = connection;
        } catch (err) {
            Log.e(`Could not connect to the DB ${err} `, err)
            throw new DBError("Could not connect to the DB");
        }
    }

    async getUser(email: string, passwordHash: string): Promise<User> {
        try {
            let user = await this._connection.getRepository(UserEntity).findOne({ email: email } as UserEntity);
            return Promise.resolve({ name: user.email, passwordHash: user.passwordHash } as User);
        } catch (err) {
            Log.e("Getuser error: " + err, err);
            throw new DBError();
        }
    }
}