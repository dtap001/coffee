import express from "express";
import { Config } from "./config";
import { RouteFactory } from "./routes/routeFactory";
import { HelloRoute } from "./routes/hello";
import { Log } from "./log";
import { RouteErrorResult, RouteError, BaseEror } from "./routes/route";
import { LoginRoute } from "./routes/users/login";
//var bodyParser = require('body-parser');
import bodyParser from "body-parser";
import { DeleteUserRoute } from "./routes/users/delete";
import { SaveUserRoute } from "./routes/users/save";
import { SearchUsersRoute } from "./routes/users/search";
import { SearchTargetsRoute } from "./routes/targets/search";

export class Server {
    private app;
    public getApp() { return this.app; }

    async initialize() {
        Log.i("Starting server.");

        this.app = express();
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))

        this.registerRoutes();
        this.app.listen(Config.Port(), err => {
            if (err) {
                return Promise.reject(err);
            }
            Log.i(`Server is listening on ${Config.Port()}`);
            return Promise.resolve();
        });
    }

    registerRoutes() {
        this.app.use(function (req: express.Request, res, next) {
            if (Config.IsDebug()) {
                Log.i(`Incoming request URL: ${req.url} Body: ${JSON.stringify(req.body)}`);
            } else {
                Log.i(`Incoming request URL: ${req.url}`);
            }
            next();
        });
        let factory = new RouteFactory(this.app);
        factory.register(HelloRoute);
        factory.register(LoginRoute);
        factory.register(SearchUsersRoute);
        factory.register(DeleteUserRoute);
        factory.register(SaveUserRoute);
        factory.register(SearchTargetsRoute);

        // configure the app to use bodyParser()
        //  this.app.use(express.json());
        /*   this.app.use(express.json({
             inflate: true,
             limit: '100kb',
             reviver: (key, values) => { },
             strict: true,
             type: 'application/json',
             verify: undefined
         }));*/

        this.app.use(function (err, req, res: express.Response, next) {
            let error = err;
            if (!(err instanceof BaseEror)) {//convert every error to route error
                error = new RouteError(err);
            }
            res.statusCode = (err as RouteError).code;
            res.json(new RouteErrorResult(error));
        });
        this.app.use(function (req: express.Request, res, next) {
            res.status(404).send(new RouteErrorResult(new RouteError(`Invalid route: ${req.url}`)));
        });
    }
}