import { RouteBase, RouteMethod as RouteMethod, RequestModel, ResponseContentModel, RouteSuccessResult, RouteErrorResult, BaseEror, RouteError } from "../route";
import * as express from "express"
import { Config } from "../../config";
import TYPES from "../../types";
import container from "../../diContainer";
import { CoffeeStorage } from "../../storage/storage";
import { CoffeCache } from "../../storage/coffe.cache";
import { Job } from "../../models/job";
import { JobManager } from "../../job.manager";

export class JobSaveRoute extends RouteBase {
    getSufficientRoles(): string[] {
        let roles = container.get<CoffeCache>(TYPES.Cache).AllRoles;
        return roles.map(r => r.caption);
    }
    getPath(): string {
        return Config.APIVersion() + "/job/save";
    }
    getRouteMethod(): RouteMethod {
        return RouteMethod.POST;
    }
    getAction(): Function {
        return (req: express.Request, res: express.Response) => {
            this.validate(req, SaveJobRequest);
            this.authorize(req, res, this.getSufficientRoles());
            let that = this;
            var jobManager = container.get<JobManager>(TYPES.JobManager);
            jobManager.saveJob((req.body as SaveJobRequest).job).then(function () {
                that.sendRouteResult(res, new RouteSuccessResult({} as ResponseContentModel));
            }).catch(function (err: RouteError) {
                that.sendRouteResult(res, new RouteErrorResult(err));
            });
        }
    }
}

export class SaveJobRequest extends RequestModel {
    public job: Job;
}