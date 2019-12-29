import { RouteBase, RouteMethod as RouteMethod, RequestModel, ResponseContentModel, RouteSuccessResult, RouteErrorResult, BaseEror, RouteError } from "../route";
import * as express from "express"
import { Config } from "../../config";
import TYPES from "../../types";
import container from "../../diContainer";
import { CoffeeStorage } from "../../storage/storage";
import { CoffeeJWT } from "../../jwt";
import { RoleEntity } from "../../storage/entities/Role";
import { User } from "../../models/user";

export class UserLoginRoute extends RouteBase {
    getSufficientRoles(): string[] {
        throw new Error("Method not implemented.");
    }
    getPath(): string {
        return Config.APIVersion() + "/user/login";
    }
    getRouteMethod(): RouteMethod {
        return RouteMethod.POST;
    }
    getAction(): Function {
        return (req: express.Request, res: express.Response) => {
            this.validate(req, LoginRequest);
            let that = this;
            var storage = container.get<CoffeeStorage>(TYPES.Storage);
            let jwt = new CoffeeJWT();
            storage.getUser((req.body as LoginRequest).user, (req.body as LoginRequest).password).then(function (user) {
                that.sendRouteResult(res, new RouteSuccessResult(new LoginResponse(jwt.sign(user.roles), user)));
            }).catch(function (err: RouteError) {
                that.sendRouteResult(res, new RouteErrorResult(err));
            });
        }
    }
}

export class LoginResponse extends ResponseContentModel {
    Token: string;
    UserName: string;
    Email: string;
    constructor(jwt: string, user: User) {
        super();
        this.Token = jwt;
        this.UserName = user.name;
        this.Email = user.email;
    }
}

export class LoginRequest extends RequestModel {
    init(args: { user: string, passwordHash: string }) {
        this.user = args.user;
        this.password = args.passwordHash;
    }
    public user: string = "";
    public password: string = "";
}