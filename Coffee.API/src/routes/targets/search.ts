import { RouteBase, RouteMethod as RouteMethod, RequestModel, ResponseContentModel, RouteSuccessResult, RouteErrorResult, BaseEror, RouteError } from "../route";
import * as express from "express"
import { Config } from "../../config";
import TYPES from "../../types";
import container from "../../diContainer";
import { CoffeeStorage } from "../../storage/storage";
import { User } from "../../models/user";
import { CoffeCache } from "../../storage/coffe.cache";
import { Target } from "../../models/target";

export class TargetsSearchRoute extends RouteBase {
    getSufficientRoles(): string[] {
        let roles = container.get<CoffeCache>(TYPES.Cache).AllRoles;
        return roles.map(r => r.caption);
    }
    getPath(): string {
        return Config.APIVersion() + "/targets/search";
    }
    getRouteMethod(): RouteMethod {
        return RouteMethod.GET;
    }
    getAction(): Function {
        return (req: express.Request, res: express.Response) => {
            this.validate(req, SearchTargetsRequest);
            this.authorize(req, res, this.getSufficientRoles());
            let that = this;
            var storage = container.get<CoffeeStorage>(TYPES.Storage);
            storage.searchTargets((req.body as SearchTargetsRequest).querystring).then(function (targets) {
                that.sendRouteResult(res, new RouteSuccessResult({ targets: targets } as SearchTargetsResponse));
            }).catch(function (err: RouteError) {
                that.sendRouteResult(res, new RouteErrorResult(err));
            });
        }
    }
}

export class SearchTargetsResponse extends ResponseContentModel {
    targets: Target[];
    constructor(targets: Target[]) {
        super();
        this.targets = targets;
    }
}

export class SearchTargetsRequest extends RequestModel {
    public querystring: string = "";
}