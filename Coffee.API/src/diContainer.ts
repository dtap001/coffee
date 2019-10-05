import { Container } from "inversify";
import TYPES from "./types";
import { CoffeeStorage } from "./storage/storage";
import { CoffeCache } from "./storage/coffe.cache";
import { CoffeeJWT } from "./jwt";

var container = new Container();
container = new Container();
container.bind<CoffeeStorage>(TYPES.Storage).to(CoffeeStorage).inSingletonScope();
container.bind<CoffeCache>(TYPES.Cache).to(CoffeCache).inSingletonScope();
container.bind<CoffeeJWT>(TYPES.JWT).to(CoffeeJWT).inSingletonScope();

export default container;