import { RouteBase, RouteMethod as RouteMethod, RequestModel, ResponseContentModel, RouteSuccessResult, RouteErrorResult, BaseEror, RouteError } from "../route";
import * as express from "express"
import { Config } from "../../config";
import TYPES from "../../types";
import container from "../../diContainer";
import { CoffeeStorage } from "../../storage/storage";
import { CoffeeJWT } from "../../jwt";
import { RoleEntity } from "../../storage/entities/Role";
import { User } from "../../models/user";
import { CoffeCache } from "../../storage/coffe.cache";

export class GetUsersRoute extends RouteBase {
    getSufficientRoles(): string[] {
        let roles = container.get<CoffeCache>(TYPES.Cache).AllRoles;
        return roles.map(r => r.caption);
    }
    getRequestModel(): RequestModel {
        return new GetUsersRequest();
    }
    getResponseContentModel(): ResponseContentModel {
        throw new Error("Method not implemented.");
    }
    getPath(): string {
        return Config.APIVersion() + "/user/get";
    }
    getRouteMethod(): RouteMethod {
        return RouteMethod.GET;
    }
    getAction(): Function {
        return (req: express.Request, res: express.Response) => {
            this.validate(req, GetUsersRequest);
            this.authorize(req, res, this.getSufficientRoles());
            let that = this;
            var storage = container.get<CoffeeStorage>(TYPES.Storage);
            storage.getUsers((req.body as GetUsersRequest).querystring).then(function (users) {
                that.sendRouteResult(res, new RouteSuccessResult({ users: users } as GetUsersReponse));
            }).catch(function (err: RouteError) {
                that.sendRouteResult(res, new RouteErrorResult(err));
            });
        }
    }
}

export class GetUsersReponse extends ResponseContentModel {
    users: User[];
    constructor(users: User[]) {
        super();
        this.users = users;
    }
}

export class GetUsersRequest extends RequestModel {
    public querystring: string = "";
}