import container from "./diContainer";
import * as schedule from "node-schedule";
import TYPES from "./types";
import { Job } from "./models/job";
import { WOLUtil } from "./wol.util";
import { CoffeeStorage } from "./storage/storage";
import { injectable } from "inversify";
@injectable()
export class JobManager {
    async deleteJob(id: number) {
        var storage = container.get<JobManager>(TYPES.JobManager);
        try {
            await storage.deleteJob(id);
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async saveJob(job: Job) {
        var storage = container.get<CoffeeStorage>(TYPES.JobManager);
        try {
            // await storage.saveJob(job);

            let scheduledJob = schedule.scheduledJobs[job.id];
            if (scheduledJob != null) {
                scheduledJob.cancel();
            }
            schedule.scheduleJob(job.id, job.cronTiming, function (fireDate) {
                var wol = container.get<WOLUtil>(TYPES.WOLUtil);
                wol.wake(job.target.macAddress, job.target.ipAddress);
            })
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    }
}