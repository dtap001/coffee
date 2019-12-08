import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { Go, RouterActionTypes } from '../actions/router.actions';

@Injectable()
export class RouterEffects {
    constructor(private action$: Actions, private router: Router, private location: Location) {}

    @Effect({ dispatch: false })
    go$ = this.action$.pipe(
        ofType(RouterActionTypes.GO),
        map((action: Go) => action.payload),
        tap(({ path, query: queryParams, extras }) =>
            this.router.navigate(path, { queryParams, ...extras })
        )
    );

    @Effect()
    back$ = this.action$.pipe(
        ofType(RouterActionTypes.BACK),
        tap(() => this.location.back())
    );

    @Effect()
    forward$ = this.action$.pipe(
        ofType(RouterActionTypes.FORWARD),
        tap(() => this.location.forward())
    );
}
