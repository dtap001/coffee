import { Target } from "./target";

export class Job {
    id: number;
    caption: string;
    cronTiming: string;
    target: Target;
}