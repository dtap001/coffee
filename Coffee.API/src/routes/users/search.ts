import { RouteBase, RouteMethod as RouteMethod, RequestModel, ResponseContentModel, RouteSuccessResult, RouteErrorResult, BaseEror, RouteError } from "../route";
import * as express from "express"
import { Config } from "../../config";
import TYPES from "../../types";
import container from "../../diContainer";
import { CoffeeStorage } from "../../storage/storage";
import { User } from "../../models/user";
import { CoffeCache } from "../../storage/coffe.cache";

export class UsersSearchRoute extends RouteBase {
    getSufficientRoles(): string[] {
        let roles = container.get<CoffeCache>(TYPES.Cache).AllRoles;
        return roles.map(r => r.caption);
    }
    getPath(): string {
        return "/users/search";
    }
    getRouteMethod(): RouteMethod {
        return RouteMethod.GET;
    }
    getAction(): Function {
        return (req: express.Request, res: express.Response) => {
            this.validate(req, SearchUsersRequest);
            this.authorize(req, res, this.getSufficientRoles());
            let that = this;
            var storage = container.get<CoffeeStorage>(TYPES.Storage);
            storage.searchUsers((req.body as SearchUsersRequest).querystring).then(function (users) {
                that.sendRouteResult(res, new RouteSuccessResult({ users: users } as SearchUsersReponse));
            }).catch(function (err: RouteError) {
                that.sendRouteResult(res, new RouteErrorResult(err));
            });
        }
    }
}

export class SearchUsersReponse extends ResponseContentModel {
    users: User[];
    constructor(users: User[]) {
        super();
        this.users = users;
    }
}

export class SearchUsersRequest extends RequestModel {
    public querystring: string = "";
}