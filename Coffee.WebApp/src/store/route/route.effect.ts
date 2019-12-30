

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from '@angular/router';
import { map, catchError, tap, exhaustMap, filter, flatMap } from "rxjs/operators";
import { GeneralService } from 'src/app/services/general.service';
import { of } from 'rxjs';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { AppRouterState } from 'src/core/reducers/router.reducers';
import { HelloState } from '../hello/hello.reducer'; 
import { TargetsSearchAction } from '../target/target.action';
import { Store } from '@ngrx/store';
import { COFFEE_APP_PATHS } from 'src/app/paths';

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
            tap((routerState) => { console.log(`URL: ${JSON.stringify(routerState)}`) }),
            filter(routerState =>
                routerState.url.includes(`${COFFEE_APP_PATHS.TARGETS}`)// ||
                //  state.url.includes(`${ROLE_ROUTE}/detail`)
            ),
            map((routerState) => TargetsSearchAction({ search: "" }))// routerState.queryParams["id"] }))
        ))
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
