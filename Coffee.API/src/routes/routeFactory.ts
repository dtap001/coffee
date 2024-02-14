import { RouteBase, RouteMethod } from "./route";
import { Log } from "../log";
import { Config } from "../config";

export class RouteFactory {
    private app;
    constructor(app) {
        this.app = app;
    }

    register<T extends RouteBase>(routeType: (new () => T)) {
        let route = new routeType();
        let path = "/api" + Config.APIVersion() + route.getPath();
        switch (route.getRouteMethod()) {
            case RouteMethod.GET:
                this.app.get(path,
                    route.getAction());
                break;
            case RouteMethod.POST:
                this.app.post(path,
                    route.getAction());
                break;
        }
        Log.i(`Registered route: ${path}`)
    };
}
export class RouteActionWrapper {
    private action: Function;
    constructor(action: Function) {
        this.action = action;
        return this;
    }

    onRouteActivation(): Function {
        return (req, res) => {
            req
            this.action();
        }
    }
}