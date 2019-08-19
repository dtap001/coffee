import { Container } from "inversify";
import { IStorage } from "./storage/istorage";
import TYPES from "./types";
import { SQLiteStorage } from "./storage/SQLiteStorage";

var container = new Container();
container = new Container();
container.bind<IStorage>(TYPES.Storage).to(SQLiteStorage).inSingletonScope();

export default container;