import { Target } from "./target";

export class Job {
    public id: number = undefined;
    public caption: string = undefined;
    public cronTiming: string = undefined;
    public target: Target = undefined;
}