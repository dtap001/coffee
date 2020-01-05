import "reflect-metadata" // type ORM needs the invocation in global namespace
import { Container } from "inversify";
import TYPES from "./types";
import { CoffeeStorage } from "./storage/storage";
import { CoffeCache } from "./storage/coffe.cache";
import { CoffeeJWT } from "./jwt";
import { WOLUtil } from "./wol.util";
import { JobManager } from "./job.manager";
import { SocketServer } from "./socketServer";

var container = new Container();
container = new Container();
container.bind<CoffeeStorage>(TYPES.Storage).to(CoffeeStorage).inSingletonScope();
container.bind<CoffeCache>(TYPES.Cache).to(CoffeCache).inSingletonScope();
container.bind<CoffeeJWT>(TYPES.JWT).to(CoffeeJWT).inSingletonScope();
container.bind<WOLUtil>(TYPES.WOLUtil).to(WOLUtil).inSingletonScope();
container.bind<JobManager>(TYPES.JobManager).to(JobManager).inSingletonScope();
container.bind<SocketServer>(TYPES.SocketServer).to(SocketServer).inSingletonScope();

export default container;