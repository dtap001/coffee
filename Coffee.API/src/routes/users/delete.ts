import { RouteBase, RouteMethod as RouteMethod, RequestModel, ResponseContentModel, RouteSuccessResult, RouteErrorResult, BaseEror, RouteError } from "../route";
import * as express from "express"
import { Config } from "../../config";
import TYPES from "../../types";
import container from "../../diContainer";
import { CoffeeStorage } from "../../storage/storage";
import { CoffeCache } from "../../storage/coffe.cache";

export class UserDeleteRoute extends RouteBase {
    getSufficientRoles(): string[] {
        let roles = container.get<CoffeCache>(TYPES.Cache).AdminRoles;
        return roles.map(r => r.caption);
    }
    getPath(): string {
        return Config.APIVersion() + "/user/delete";
    }
    getRouteMethod(): RouteMethod {
        return RouteMethod.POST;
    }
    getAction(): Function {
        return (req: express.Request, res: express.Response) => {
            this.validate(req, DeleteUserRequest);
            this.authorize(req, res, this.getSufficientRoles());
            let that = this;
            var storage = container.get<CoffeeStorage>(TYPES.Storage);
            storage.deleteUser((req.body as DeleteUserRequest).id).then(function () {
                that.sendRouteResult(res, new RouteSuccessResult({} as ResponseContentModel));
            }).catch(function (err: RouteError) {
                that.sendRouteResult(res, new RouteErrorResult(err));
            });
        }
    }
}

export class DeleteUserRequest extends RequestModel {
    public id: number;
}