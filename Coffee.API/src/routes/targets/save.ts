import { RouteBase, RouteMethod as RouteMethod, RequestModel, ResponseContentModel, RouteSuccessResult, RouteErrorResult, BaseEror, RouteError } from "../route";
import * as express from "express"
import { Config } from "../../config";
import TYPES from "../../types";
import container from "../../diContainer";
import { CoffeeStorage } from "../../storage/storage";
import { CoffeCache } from "../../storage/coffe.cache";
import { Target } from "../../models/target";

export class TargetSaveRoute extends RouteBase {
    getSufficientRoles(): string[] {
        let roles = container.get<CoffeCache>(TYPES.Cache).AllRoles;
        return roles.map(r => r.caption);
    }
    getPath(): string {
        return "/targets/save";
    }
    getRouteMethod(): RouteMethod {
        return RouteMethod.POST;
    }
    getAction(): Function {
        return (req: express.Request, res: express.Response) => {
            this.validate(req, SaveTargetRequest);
            this.authorize(req, res, this.getSufficientRoles());
            let that = this;
            var storage = container.get<CoffeeStorage>(TYPES.Storage);
            storage.saveTarget((req.body as SaveTargetRequest).target).then(function () {
                that.sendRouteResult(res, new RouteSuccessResult({} as ResponseContentModel));
            }).catch(function (err: RouteError) {
                that.sendRouteResult(res, new RouteErrorResult(err));
            });
        }
    }
}

export class SaveTargetRequest extends RequestModel {
    public target: Target;
}