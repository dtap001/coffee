import { Container } from "inversify";
import TYPES from "./types";
import { CoffeeStorage } from "./storage/storage";

var container = new Container();
container = new Container();
container.bind<CoffeeStorage>(TYPES.Storage).to(CoffeeStorage).inSingletonScope();

export default container;