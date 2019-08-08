import { RouteBase, RouteType } from "../route";
import * as express from "express"
export class LoginRoute extends RouteBase {
    getPath(): string {
        return "/user/login";
    }
    getType(): RouteType {
        return RouteType.POST;
    }
    getAction(): Function {
        return (req: express.Request, res: express.Response) => {
            let user = req.body["user"];
            let password = req.body["password"];
            
            res.json();
        }

    }
}