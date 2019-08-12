import uuid = require("uuid");
import { Log } from "../log";
var deepEqual = require('deep-equal')
import express from "express";
export abstract class RouteBase {
    abstract getPath(): string;
    abstract getRouteMethod(): RouteMethod;
    abstract getAction(): Function;
    abstract getRequestModel(): RequestModel;
    abstract getResponseContentModel(): ResponseContentModel;

    validate(req: express.Request, model: RequestModel) {
        if (!deepEqual(req.body, model)) {
            throw new RouteError({message:`Expected model for this route: ${JSON.stringify(model)}`});
        }
    }
}

export class RequestModel { }

export class ResponseContentModel { }

export class RouteResult {
    isOK: boolean;
    content: ResponseContentModel;
    error: RouteError;
}

export class RouteSuccessResult extends RouteResult {
    constructor(content: any) {
        super();
        this.content = content;
        this.isOK = true;
    }
}

export class RouteErrorResult extends RouteResult {
    constructor(error: RouteError) {
        super();
        this.error = error;
        this.isOK = false;
    }
}

export class RouteError extends Error {
    constructor(args: { message: string, err?: Error }) {
        super();
        this.message = args.message;
        this.code = uuid.v4();
        Log.e(`Code: ${this.code}`, args.err);
    }
    message: string;
    code: string;
}
export enum RouteMethod {
    GET,
    POST,
    DELETE,
    UPDATE,
}