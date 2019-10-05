import { Server } from "./server";
import { Log } from "./log";
import TYPES from "./types";
import container from "./diContainer";
import "reflect-metadata"; // type ORM needs the invocation in global namespace
import { CoffeeStorage } from "./storage/storage";
import { CoffeCache } from "./storage/coffe.cache";

export class API {
    server = new Server();

    constructor() {
        Log.i("API initialization starting.");
        var storage = container.get<CoffeeStorage>(TYPES.Storage);
        var cache = container.get<CoffeCache>(TYPES.Cache);
        try {
            const init = async () => {
                await storage.initialize();
                await cache.initialize();
                await this.server.initialize();
            }
            init();
        } catch (err) {
            Log.e("Initialization interrupted. Exiting.", err);
            this.DIE();
        }
    }

    DIE() {
        process.exit(0);
    }
}
new API();