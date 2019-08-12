import { RouteBase, RouteMethod as RouteMethod, RequestModel, ResponseContentModel } from "../route";
import * as express from "express"

export class LoginRoute extends RouteBase {
    getRequestModel(): RequestModel {
        return new LoginRequest();
    }
    getResponseContentModel(): ResponseContentModel {
        throw new Error("Method not implemented.");
    }
    getPath(): string {
        return "/user/login";
    }
    getRouteMethod(): RouteMethod {
        return RouteMethod.POST;
    }
    getAction(): Function {
        return (req: express.Request, res: express.Response) => {
            this.validate(req, LoginRequest);
            res.type('application/json');
            res.json();
        }
    }
}

export class LoginResponse extends ResponseContentModel {
    JWT: string;
}

export class LoginRequest extends RequestModel {
    init(args: { user: string, passwordHash: string }) {
        this.user = args.user;
        this.passwordHash = args.passwordHash;
    }
    user: string;
    passwordHash: string;
}