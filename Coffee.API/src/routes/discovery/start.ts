import { RouteBase, RouteMethod as RouteMethod, RequestModel, ResponseContentModel, RouteSuccessResult, RouteErrorResult, BaseEror, RouteError } from "../route";
import * as express from "express"
import { Config } from "../../config";
import TYPES from "../../types";
import container from "../../diContainer";
import { CoffeeStorage } from "../../storage/storage";
import { CoffeCache } from "../../storage/coffe.cache";
import { Discovery } from "../../models/discovery";
import { DiscoveryManager } from "../../discovery.manager";

export class DiscoveryStart extends RouteBase {
    getSufficientRoles(): string[] {
        let roles = container.get<CoffeCache>(TYPES.Cache).AllRoles;
        return roles.map(r => r.caption);
    }
    getPath(): string {
        return Config.APIVersion() + "/discovery/start";
    }
    getRouteMethod(): RouteMethod {
        return RouteMethod.POST;
    }
    getAction(): Function {
        return (req: express.Request, res: express.Response) => {
            this.validate(req, DiscoveryStartRequest);
            this.authorize(req, res, this.getSufficientRoles());
            let that = this;
            var storage = container.get<CoffeeStorage>(TYPES.Storage);
            var requestedNetwork = (req.body as DiscoveryStartRequest).network;
            storage.getDiscovery(requestedNetwork).then(function (discovery) {
                if (discovery != null && discovery.finishedTimeStamp == null) {
                    throw new RouteError("Discovery already running.");
                }
                discovery = new Discovery();
                discovery.network = requestedNetwork;
                discovery.startedTimeStamp = new Date();

                return storage.saveDiscovery(discovery);
            }).then(function () {
                DiscoveryManager.scan(requestedNetwork);

                that.sendRouteResult(res, new RouteSuccessResult({} as ResponseContentModel));
            }).catch(function (err: RouteError) {
                that.sendRouteResult(res, new RouteErrorResult(err));
            });
        }
    }
}

export class DiscoveryStartRequest extends RequestModel {
    public network: string;
}