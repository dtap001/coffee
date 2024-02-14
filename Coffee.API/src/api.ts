import container from "./diContainer";
import { CoffeeServer } from "./server";
import { Log } from "./log";
import TYPES from "./types";
import { CoffeeStorage } from "./storage/storage";
import { CoffeCache } from "./storage/coffe.cache";

export class API {
  server = new CoffeeServer();
  storage: CoffeeStorage;
  async start() {
    Log.i("API initialization starting.");
    try {
      this.storage = container.get<CoffeeStorage>(TYPES.Storage);
      var cache = container.get<CoffeCache>(TYPES.Cache);

      await this.storage.initialize();
      await cache.initialize();
      await this.server.initialize();
      return Promise.resolve();
    } catch (err) {
      Log.e("Initialization interrupted. Exiting.", err);
      this.DIE();
      Promise.reject();
    }
  }

  async stop() {
    await this.storage.stop();
    return Promise.resolve();
  }

  DIE() {
    process.exit(0);
  }
}
