import { Server } from "./server";
import { Log } from "./log"; 
import TYPES from "./types";
import container from "./diContainer";
import "reflect-metadata"; // type ORM needs the invocation in global namespace
import { CoffeeStorage } from "./storage/Storage";

export class API {
    server: Server;

    constructor() {
        Log.i(`API has started. Current path ${__dirname}. \nConnecting to DB`);
        var storage = container.get<CoffeeStorage>(TYPES.Storage);

        storage.initialize().then(() => {
            Log.i("Starting server.");
            this.server = new Server();
        }, (err) => {
            this.DIE();
        });
    }
    DIE() {
        process.exit(0);
    }
}
new API();