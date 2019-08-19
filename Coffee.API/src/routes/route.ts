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
    validate<T extends RequestModel>(req: express.Request, model: (new () => T)) {
        let modelInstance = new model();
        if (!deepEqual(req.body, modelInstance)) {
            throw new InvalidRequestModelError({ message: `Expected model for this route: ${JSON.stringify(modelInstance)}` });
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
        this.uid = uuid.v4();
        Log.e(`UID: ${this.uid} Msg: ${args.message}`, args.err);
    }
    public message: string;
    public uid: string;
    code = 500;
}
export class InvalidRequestModelError extends RouteError {
    constructor(args: { message: string, err?: Error }) {
        super(args);
        this.code = 400;
    }
}
export enum RouteMethod {
    GET,
    POST,
    DELETE,
    UPDATE,
}