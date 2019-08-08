import { Log } from "./log";
import { Config } from "./config";
import sqlite3 = require('sqlite3');

export class CoffeeStorage {
    private _db: sqlite3.Database;

    connectDb() {
        let that = this;
        return new Promise(function (resolve, reject) {
            that._db = new sqlite3.Database(Config.GetDBPath(), (err) => {
                if (err) {
                    Log.e(`Cannot connect to db. Path: ${Config.GetDBPath()}`, err.message);
                    return reject();
                }
                Log.i('Connected to the database.');
                resolve();
            });
        });
    }
}