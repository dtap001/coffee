import { Log } from "../log";
import { Config } from "../config";
import sqlite3 = require('sqlite3');
import { IStorage } from "./istorage";
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
export class SQLiteStorage
    implements IStorage {
    private _db: sqlite3.Database;
    constructor() { Log.d("New SQLiteStorage instance created") };
    initialize() {
        let that = this;
        let db = this._db
        return new Promise(function (resolve, reject) {
            db = new sqlite3.Database(Config.GetDBPath(), (err) => {
                if (err) {
                    Log.e(`Cannot connect to db. Path: ${Config.GetDBPath()}`, err.message);
                    return reject();
                }
                Log.i('Connected to the database.');
                resolve();
            });
        });
    }

    getUser(user: string, passwordHash: string) {
        let db = this._db;
        return new Promise(function (resolve, reject) {
            db.get("SELECT user,passwordHash FROM users WHERE user = ? AND passwordHash = ?", [user, passwordHash], function (err, rows) {
                if (rows.length == 0) {
                    return reject();
                }
                return resolve();
            });
        });
    }
}