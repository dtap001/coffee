import express from "express";
import { Config } from "./config";
import { RouteFactory } from "./routes/routeFactory";
import { HelloRoute } from "./routes/hello";
import { Log } from "./log";
import { RouteErrorResult, RouteError, BaseEror } from "./routes/route";
//var bodyParser = require('body-parser');
import bodyParser from "body-parser";
import { JobDeleteRoute } from "./routes/jobs/delete";
import { TargetDeleteRoute } from "./routes/targets/delete";
import { JobSaveRoute } from "./routes/jobs/save";
import { TargetSaveRoute } from "./routes/targets/save";
import { TargetWakeRoute } from "./routes/targets/wake";
import { UserLoginRoute } from "./routes/users/login";
import { UsersSearchRoute } from "./routes/users/search";
import { UserDeleteRoute } from "./routes/users/delete";
import { UserSaveRoute } from "./routes/users/save";
import { TargetsSearchRoute } from "./routes/targets/search";
import cors from "cors";
export class Server {
    private app;
    public getApp() { return this.app; }

    async initialize() {
        Log.i("Starting server.");
        const options: cors.CorsOptions = {
            allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
            credentials: true,
            methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
            origin: "http://localhost:4200",
            preflightContinue: false
        };

        this.app = express();
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(cors(options));
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
        factory.register(UserLoginRoute);
        factory.register(UsersSearchRoute);
        factory.register(UserDeleteRoute);
        factory.register(UserSaveRoute);
        factory.register(JobDeleteRoute);
        factory.register(JobSaveRoute);
        factory.register(TargetDeleteRoute);
        factory.register(TargetSaveRoute);
        factory.register(TargetsSearchRoute);
        factory.register(TargetWakeRoute);

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
            res.statusCode = (error as RouteError).code;
            res.json(new RouteErrorResult(error));
        });
        this.app.use(function (req: express.Request, res, next) {
            res.status(404).send(new RouteErrorResult(new RouteError(`Invalid route: ${req.url}`)));
        });
    }
}