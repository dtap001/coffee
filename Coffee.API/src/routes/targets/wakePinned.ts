import { RouteBase, RouteMethod as RouteMethod, RequestModel, ResponseContentModel, RouteSuccessResult, RouteErrorResult, BaseEror, RouteError } from "../route";
import * as express from "express"
import { Config } from "../../config";
import TYPES from "../../types";
import container from "../../diContainer";
import { CoffeeStorage } from "../../storage/storage";
import { CoffeCache } from "../../storage/coffe.cache";
import { TargetEntity } from "../../storage/entities/target";

export class TargetsWakePinned extends RouteBase {
    getSufficientRoles(): string[] {
        let roles = container.get<CoffeCache>(TYPES.Cache).AllRoles;
        return roles.map(r => r.caption);
    }
    getPath(): string {
        return "/targets/wakePinned";
    }
    getRouteMethod(): RouteMethod {
        return RouteMethod.POST;
    }
    getAction(): Function {
        return (req: express.Request, res: express.Response) => {
            this.validate(req, WakePinnedRequest);
            let that = this;
            var storage = container.get<CoffeeStorage>(TYPES.Storage);



            storage.getTargetById((req.body as WakePinnedRequest).id).then(function (target: TargetEntity) {
                if (target.pinCode == null || target.pinCode != (req.body as WakePinnedRequest).pinCode) {
                    return that.sendRouteResult(res, new RouteErrorResult(new RouteError("Invalid PIN!")));
                }

                storage.wakeTarget((req.body as WakePinnedRequest).id).then(function () {
                    that.sendRouteResult(res, new RouteSuccessResult({} as ResponseContentModel));
                }).catch(function (err: RouteError) {
                    that.sendRouteResult(res, new RouteErrorResult(err));
                });
            })

        }
    }
}

export class WakePinnedRequest extends RequestModel {
    public id: number;
    public pinCode: number;
}