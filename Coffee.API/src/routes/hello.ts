import { RouteBase, RouteType, RouteSuccessResult } from "./route";

export class HelloRoute extends RouteBase {
    getPath(): string {
        return "/";
    }
    getType(): RouteType {
        return RouteType.GET;
    }
    getAction(): Function {
        return (req, res) => {
            res.send(HelloRoute.Response());
        }
        /* return () => {
             return new RouteSuccessResult("Such a good time to drink a coffee!");
         }*/
    }
    static Response() { return "Such a good time to drink a coffee!"; }
}