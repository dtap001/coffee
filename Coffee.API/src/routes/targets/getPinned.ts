import { RouteBase, RouteMethod as RouteMethod, RequestModel, ResponseContentModel, RouteSuccessResult, RouteErrorResult, BaseEror, RouteError } from "../route";
import * as express from "express"
import { Config } from "../../config";
import container from "../../diContainer";
import { CoffeCache } from "../../storage/coffe.cache";
import TYPES from "../../types";
import { CoffeeStorage } from "../../storage/storage";
import { PinnedTarget } from "../../models/pinnedTarget";


export class TargetsGetPinnedRoute extends RouteBase {
    getSufficientRoles(): string[] {
        let roles = container.get<CoffeCache>(TYPES.Cache).AllRoles;
        return roles.map(r => r.caption);
    }
    getPath(): string {
        return "/targets/getPinned";
    }
    getRouteMethod(): RouteMethod {
        return RouteMethod.GET;
    }
    getAction(): Function {
        return (req: express.Request, res: express.Response) => {
            let that = this;
            var storage = container.get<CoffeeStorage>(TYPES.Storage);
            storage.targetsGetPinned().then(function (targets) {
                that.sendRouteResult(res, new RouteSuccessResult(targets));
            }).catch(function (err: RouteError) {
                that.sendRouteResult(res, new RouteErrorResult(err));
            });
        }
    }
}

export class TargetsGetPinnedResponse extends ResponseContentModel {
    targets: PinnedTarget[];
    constructor(targets: PinnedTarget[]) {
        super();
        this.targets = targets;
    }
}

