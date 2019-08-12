import { RouteBase, RouteMethod, RouteSuccessResult, RequestModel, ResponseContentModel } from "./route";
import { Config } from "../config";
import urljoin from "url-join";
import { Log } from "../log";

export class HelloRoute extends RouteBase {
    getRequestModel(): RequestModel {
        throw new Error("Method not implemented.");
    }
    getResponseContentModel(): ResponseContentModel {
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
            //   res.type('application/json');
            res.json(new RouteSuccessResult(HelloRoute.Message()));
        }
    }
    static Message() { return "Such a good time to drink a coffee!"; }
}