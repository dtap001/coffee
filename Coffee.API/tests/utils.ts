import { CoffeeStorage } from "../storage/storage";

export class TestStorage extends CoffeeStorage {
    getConnection() {
        return this._connection;
    }

    get con() {
        return this._connection;
    }
}
