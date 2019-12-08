import { NavigationExtras } from '@angular/router';
import { Action } from '@ngrx/store';

export const enum RouterActionTypes {
    GO = '[Router] Go',
    BACK = '[Router] Back',
    FORWARD = '[Router] Forward'
}

export interface RouterActionPayload {
    // tslint:disable-next-line:no-any
    path: any[];
    query?: object;
    extras?: NavigationExtras;
}

export class Go implements Action {
    readonly type = RouterActionTypes.GO;
    constructor(public payload: RouterActionPayload) {}
}

export class Back implements Action {
    readonly type = RouterActionTypes.BACK;
}

export class Forward implements Action {
    readonly type = RouterActionTypes.FORWARD;
}

export type RouterAction = Go | Back | Forward;
