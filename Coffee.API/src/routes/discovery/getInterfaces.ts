import { RouteBase, RouteMethod as RouteMethod, RequestModel, ResponseContentModel, RouteSuccessResult, RouteErrorResult, BaseEror, RouteError } from "../route";
import * as express from "express"
import { Config } from "../../config";
import TYPES from "../../types";
import container from "../../diContainer";
import { CoffeeStorage } from "../../storage/storage";
import { CoffeCache } from "../../storage/coffe.cache";
import { Discovery } from "../../models/discovery";
import { DiscoveryManager } from "../../discovery.manager";

export class DiscoveryGetInterfacesRoute extends RouteBase {
    getSufficientRoles(): string[] {
        let roles = container.get<CoffeCache>(TYPES.Cache).AllRoles;
        return roles.map(r => r.caption);
    }
    getPath(): string {
        return "/discovery/getInterfaces";
    }
    getRouteMethod(): RouteMethod {
        return RouteMethod.POST;
    }
    getAction(): Function {
        return (req: express.Request, res: express.Response) => {
            this.authorize(req, res, this.getSufficientRoles());
            let result = DiscoveryManager.getAvailableNetworks();
            this.sendRouteResult(res, new RouteSuccessResult(result));
        }
    }
}
