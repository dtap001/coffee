import container from "./diContainer";

import TYPES from "./types";

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
        var storage = container.get<JobManager>(TYPES.JobManager);
        try {
            await storage.addJob(id);
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    }
}