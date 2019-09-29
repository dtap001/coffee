import { Log } from "../log";
import { Config } from "../config";
import sqlite3 = require('sqlite3');
import { IStorage } from "./istorage";
import { injectable, inject } from "inversify";
import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import { User } from "./entities/User";

@injectable()
export class SQLiteStorage
    implements IStorage {
    private _connection: Connection;
    constructor() { Log.d("New SQLiteStorage instance created") };
    initialize() {
        let that = this;
        /* return new Promise(function (resolve, reject) {
             db = new sqlite3.Database(Config.GetDBPath(), (err) => {
                 if (err) {
                     Log.e(`Cannot connect to db. Path: ${Config.GetDBPath()}`, err.message);
                     return reject();
                 }
                 Log.i('Connected to the database.');
                 resolve();
             });
         });*/

        createConnection({
            type: "sqlite",
            database: "coffee",
            entities: [
                __dirname + "/storage/entities/*.js"
            ],
            synchronize: true,
        }).then(connection => {
            that._connection = connection;
            // here you can start to work with your entities
        }).catch(error => console.log(error));
    }




    getUser(user: string, passwordHash: string) {
       // let db = this._connection;
       /* return new Promise(function (resolve, reject) {
            db.get("SELECT user,passwordHash FROM users WHERE user = ? AND passwordHash = ?", [user, passwordHash], function (err, rows) {
                if (rows.length == 0) {
                    return reject();
                }
                return resolve();
            });
        });*/
        let userRepo = this._connection.getRepository(User);
        userRepo.findOne();

    }
}