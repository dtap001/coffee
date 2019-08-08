import express from "express";
import { Config } from "./config";
import { RouteFactory } from "./routes/routeFactory";
import { HelloRoute } from "./routes/hello";
import { Log } from "./log";

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
            let asds;
            return Log.i(`Express server is listening on ${Config.Port()}`);
        });
    }

    registerRoutes() {
        let factory = new RouteFactory(this.app);
        factory.register(new HelloRoute())
        this.app.use(express.json({
            inflate: true,
            limit: '100kb',
            reviver: (key, values) => { },
            strict: true,
            type: 'application/json',
            verify: undefined
        }));
    }

}