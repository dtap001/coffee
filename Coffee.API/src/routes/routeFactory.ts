import { RouteBase, RouteMethod } from "./route";
import { Log } from "../log";

export class RouteFactory {
    private app;
    constructor(app) {
        this.app = app;
    }

    register<T extends RouteBase>(routeType: (new () => T)) {
        let route = new routeType();

        switch (route.getRouteMethod()) {
            case RouteMethod.GET:
                this.app.get(route.getPath(),
                    route.getAction());
                break;
            case RouteMethod.POST:
                this.app.post(route.getPath(),
                    route.getAction());
                break;
        }
        Log.i(`Registered route: ${route.getPath()}`)
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