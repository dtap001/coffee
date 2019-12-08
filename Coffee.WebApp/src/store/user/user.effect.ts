import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, catchError, tap, exhaustMap, mergeMap } from "rxjs/operators";
import { GeneralService } from 'src/app/services/general.service';
import { of } from 'rxjs';
import { UserLoginAction, UserLoginSuccess as UserLoginSuccessAction, UserLoginFailedAction } from './user.action';

@Injectable()
export class UserEffect {
    constructor(
        private actions$: Actions,
        private generalService: GeneralService
    ) { }

    loginEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserLoginAction),
            exhaustMap(({ userName, password }) =>
                this.generalService.login(userName, password).pipe(
                    map(response => UserLoginSuccessAction({ payload: response.content })),
                    catchError(({ error }) => of(UserLoginFailedAction(error)))
                )
            ))
    );
}