import { RouteBase, RouteMethod as RouteMethod, RequestModel, ResponseContentModel } from "../route";
import * as express from "express"
import { Config } from "../../config";
import { IStorage } from "../../storage/istorage";
import TYPES from "../../types";
import container from "../../diContainer";

export class LoginRoute extends RouteBase {
    getRequestModel(): RequestModel {
        return new LoginRequest();
    }
    getResponseContentModel(): ResponseContentModel {
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

            var storage = container.get<IStorage>(TYPES.Storage);
            let resultUser = storage.getUser((req.body as LoginRequest).user, (req.body as LoginRequest).passwordHash);
            
            res.type('application/json');
            res.json(new LoginResponse());
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
    public user: string = "";
    public passwordHash: string = "";
}