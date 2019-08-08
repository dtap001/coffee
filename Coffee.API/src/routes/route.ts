export abstract class RouteBase {
    abstract getPath(): string;
    abstract getType(): RouteType;
    abstract getAction(): Function;
}

export class RequestModel {

}

export class RouteResult {
    isOK: boolean;
    content: any;
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

export class RouteError {
    message: string;
    code: string;
}
export enum RouteType {
    GET,
    POST,
    DELETE,
    UPDATE,
}