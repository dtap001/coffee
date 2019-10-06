import { RouteBase, RouteMethod as RouteMethod, RequestModel, ResponseContentModel, RouteSuccessResult, RouteErrorResult, BaseEror, RouteError } from "../route";
import * as express from "express"
import { Config } from "../../config";
import TYPES from "../../types";
import container from "../../diContainer";
import { CoffeeStorage } from "../../storage/storage";
import { User } from "../../models/user";
import { CoffeCache } from "../../storage/coffe.cache";

export class SaveUserRoute extends RouteBase {
    getSufficientRoles(): string[] {
        let roles = container.get<CoffeCache>(TYPES.Cache).AdminRoles;
        return roles.map(r => r.caption);
    }
    getPath(): string {
        return Config.APIVersion() + "/user/save";
    }
    getRouteMethod(): RouteMethod {
        return RouteMethod.POST;
    }
    getAction(): Function {
        return (req: express.Request, res: express.Response) => {
            this.validate(req, SaveUserRequest);
            this.authorize(req, res, this.getSufficientRoles());
            let that = this;
            var storage = container.get<CoffeeStorage>(TYPES.Storage);
            storage.saveUser((req.body as SaveUserRequest).user).then(function () {
                that.sendRouteResult(res, new RouteSuccessResult({} as ResponseContentModel));
            }).catch(function (err: RouteError) {
                that.sendRouteResult(res, new RouteErrorResult(err));
            });
        }
    }
}

export class SaveUserReponse extends ResponseContentModel {
    users: User[];
    constructor(users: User[]) {
        super();
        this.users = users;
    }
}

export class SaveUserRequest extends RequestModel {
    public user: User;
}