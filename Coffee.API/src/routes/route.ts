import uuid = require("uuid");
import { Log } from "../log";
var deepEqual = require('deep-equal')
import express from "express";
import { RoleEntity } from "../storage/entities/Role";
import { CoffeeJWT, JWTResult } from "../jwt";
import container from "../diContainer";
import TYPES from "../types";
export abstract class RouteBase {
    abstract getSufficientRoles(): string[];
    abstract getPath(): string;
    abstract getRouteMethod(): RouteMethod;
    abstract getAction(): Function;
    validate<T extends RequestModel>(req: express.Request, model: (new () => T)) {
        let modelInstance = new model();
        /* if (!deepEqual(req.body, modelInstance)) {
             throw new InvalidRequestModelError({ message: `Expected model for this route: ${JSON.stringify(modelInstance)}` });
         }*/
    }
    authorize(req: express.Request, res: express.Response, requiredRoles: string[]) {
        var jwt = container.get<CoffeeJWT>(TYPES.JWT);

        let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
        if ((token as string).startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }
        let result = jwt.verify(token as string);
        if (!result.isValid) {
            throw new UnauthorizedError(`JWT token is invalid.`);
        }
        for (var i = 0; i < result.roles.length; i++) {
            if (requiredRoles.includes(result.roles[i])) {
                return;
            }
        }
        throw new UnauthorizedError(`Insufficent roles for route ${req.path}`);
    }
    sendRouteResult(res: express.Response, result: RouteResult) {
        res.type('application/json');
        res.json(result);
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
    constructor(content: ResponseContentModel) {
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

//This is the base for RouteError and ServerError
export class BaseEror {
    public uid: string;
    public message: string;
    constructor(message: string) {
        this.message = message;
        this.uid = uuid.v4();
    }
}

// Used when the input is not ok from the client
export class RouteError extends BaseEror {
    constructor(message: string) {
        super(message);
        Log.e(`Route Error | UID: ${this.uid} Msg: ${message}`, null);
    }
    code = 400;
}

// Used when client should not  use that route
export class UnauthorizedError extends BaseEror {
    constructor(message: string) {
        super(message);
        Log.e(`Unauthorized | UID: ${this.uid} Msg: ${message}`, null);
    }
    code = 401;
}

// used when something went wrong inside the server 
export class ServerError extends BaseEror {
    constructor(message: string, err: Error) {
        super(message);
        Log.e(`Server Error | UID: ${this.uid} Msg: ${message}`, err);
    }
    code = 500;
}

export class InvalidRequestModelError extends RouteError {
    constructor(message: string) {
        super(message);
        this.code = 400;
    }
}

export enum RouteMethod {
    GET,
    POST,
    DELETE,
    UPDATE,
}