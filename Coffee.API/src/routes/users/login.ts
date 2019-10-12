import { RouteBase, RouteMethod as RouteMethod, RequestModel, ResponseContentModel, RouteSuccessResult, RouteErrorResult, BaseEror, RouteError } from "../route";
import * as express from "express"
import { Config } from "../../config";
import TYPES from "../../types";
import container from "../../diContainer";
import { CoffeeStorage } from "../../storage/storage";
import { CoffeeJWT } from "../../jwt";
import { RoleEntity } from "../../storage/entities/Role";

export class LoginRoute extends RouteBase {
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
            storage.getUser((req.body as LoginRequest).email, (req.body as LoginRequest).passwordHash).then(function (user) {
                that.sendRouteResult(res, new RouteSuccessResult(new LoginResponse(jwt.sign(user.roles))));
            }).catch(function (err: RouteError) {
                that.sendRouteResult(res, new RouteErrorResult(err));
            });
        }
    }
}

export class LoginResponse extends ResponseContentModel {
    JWT: string;
    constructor(jwt: string) {
        super();
        this.JWT = jwt;
    }
}

export class LoginRequest extends RequestModel {
    init(args: { email: string, passwordHash: string }) {
        this.email = args.email;
        this.passwordHash = args.passwordHash;
    }
    public email: string = "";
    public passwordHash: string = "";
}