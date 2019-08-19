import { Server } from "./server";
import { Log } from "./log";
import { IStorage } from "./storage/istorage";
import TYPES from "./types";
import container from "./diContainer";
export class API {
    server: Server;

    constructor() {
        Log.i(`API has started. Current path ${__dirname}. \nConnecting to DB`);
        var storage = container.get<IStorage>(TYPES.Storage);

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