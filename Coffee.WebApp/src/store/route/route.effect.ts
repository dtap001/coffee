

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from '@angular/router';
import { map, catchError, tap, exhaustMap, filter, flatMap } from "rxjs/operators";
import { GeneralService } from 'src/app/services/general.service';
import { of } from 'rxjs';
import { Action, Store, select } from '@ngrx/store';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { HelloSuccessAction, HelloFailedAction, HelloAction } from '../hello/hello.action';
import { ROUTE_PATHS } from 'src/app/app-routing.module';
import { AppRouterState } from 'src/core/reducers/router.reducers';
import { HelloState } from '../hello/hello.reducer';

@Injectable()
export class RouteEffect {
    constructor(
        private actions$: Actions,
        private generalService: GeneralService,
        private store: Store<HelloState>
    ) { }
    private mapToRouterStateUrl = (action): AppRouterState => {
        return action.payload.routerState;
    };

    locationUpdate$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ROUTER_NAVIGATION),
            map(this.mapToRouterStateUrl),
           // filter(state => state.url == (`${ROUTE_PATHS.ROOT}`)),
           // map(() => this.store.pipe(select(getIsLoggedIn))),
            tap(param =>console.log("asdasd")),
            map(state => HelloAction())
            //,          
            /* exhaustMap((action: Action) =>
                 this.generalService.hello().pipe(
                     map(response => HelloSuccessAction({ payload: response.content })),
                     catchError(({ error }) => of(HelloFailedAction(error)))
                 )
             )*/
        )
    ) 
}
/*
@Injectable()
export class RoleRouterEffects {
    constructor(private action$: Actions, private roleStore: Store<RoleState>) { }


    @Effect()
    loadRoles$ = this.action$.pipe(
        ofType(ROUTER_NAVIGATION),
        map(this.mapToRouterStateUrl),
        filter(state => state.url.includes(`${ROLE_ROUTE}`)),
        flatMap(() => this.roleStore.pipe(select(getRoleCriteria))),
        map(criteria => new LoadRoles(criteria))
    );

    @Effect()
    loadRole$ = this.action$.pipe(
        ofType(ROUTER_NAVIGATION),
        map(this.mapToRouterStateUrl),
        filter(
            state =>
                state.url.includes(`${ROLE_ROUTE}/edit`) ||
                state.url.includes(`${ROLE_ROUTE}/detail`)
        ),
        map((routerState: RouterStateUrl) => new LoadRole(routerState.params.roleId))
    );

    @Effect()
    loadPrivileges$ = this.action$.pipe(
        ofType(ROUTER_NAVIGATION),
        map(this.mapToRouterStateUrl),
        filter(
            state =>
                state.url.includes(`${ROLE_ROUTE}/edit`) ||
                state.url.includes(`${ROLE_ROUTE}/detail`)
        ),
        map(() => new LoadPrivileges())
    );
}*/
