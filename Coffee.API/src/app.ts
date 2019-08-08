import { Server } from "./server";
import { Log } from "./log";
import { CoffeeStorage } from "./storage";

export class API {
    storage: CoffeeStorage;
    server: Server;
    constructor() {
        Log.i(`API has started. Current path ${__dirname}. \nConnecting to DB`);
        this.storage = new CoffeeStorage();
        this.storage.connectDb().then(() => {
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