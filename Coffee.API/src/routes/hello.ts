import { RouteBase, RouteMethod, RouteSuccessResult, RequestModel, ResponseContentModel } from "./route";
import { Config } from "../config";
import urljoin from "url-join"; 
export class HelloRoute extends RouteBase {
    getSufficientRoles(): string[] {
        throw new Error("Method not implemented.");
    }
    getPath(): string {
        return urljoin(Config.APIVersion(), "/hello");
    }
    getRouteMethod(): RouteMethod {
        return RouteMethod.GET;
    }
    getAction(): Function {
        return (req, res) => {
            res.json(new RouteSuccessResult(HelloRoute.Message()));
        }
    }
    static Message() { return "Such a good time to drink a coffee!"; }
}