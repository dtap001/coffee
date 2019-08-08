import { RouteBase, RouteType } from "./route";

export class RouteFactory {
    private app;
    constructor(app) {
        this.app = app;
    }
    register(route: RouteBase) {
        switch (route.getType()) {
            case RouteType.GET:
                /*   this.app.get(route.getPath(),
                     //  new RouteActionWrapper(route.getAction()).onRouteActivation());*/
                this.app.get(route.getPath(),
                    route.getAction());
                break;
            case RouteType.POST:
                this.app.post(route.getPath(),
                    route.getAction());
                break;
        }
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