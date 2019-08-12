import express from "express";
import { Config } from "./config";
import { RouteFactory } from "./routes/routeFactory";
import { HelloRoute } from "./routes/hello";
import { Log } from "./log";
import { RouteErrorResult, RouteError } from "./routes/route";

export class Server {
    private app;
    public getApp() { return this.app; }
    constructor() {
        this.app = express();
        this.registerRoutes();
        this.app.listen(Config.Port(), err => {
            if (err) {
                return console.error(err);
            }
            return Log.i(`Express server is listening on ${Config.Port()}`);
        });
    }

    registerRoutes() {
        this.app.use(function (req: express.Request, res, next) {
            Log.i(`Incoming request URL: ${req.url}`);
            next();
        });
        let factory = new RouteFactory(this.app);
        factory.register(HelloRoute);

        this.app.use(express.json({
            inflate: true,
            limit: '100kb',
            reviver: (key, values) => { },
            strict: true,
            type: 'application/json',
            verify: undefined
        }));

        this.app.use(function (err, req, res, next) {
            let error = err;
            if (!(err instanceof RouteError)) {
                error = new RouteError(err);
            }
            res.json(new RouteErrorResult(error));
        });
        this.app.use(function (req: express.Request, res, next) {
            res.status(404).send(new RouteErrorResult(new RouteError(new Error(`Invalid route: ${req.url}`))));
        });
    }

}