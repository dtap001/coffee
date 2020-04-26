import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, catchError, tap, exhaustMap, mergeMap, concatMap } from "rxjs/operators";
import { GeneralService } from 'src/app/services/general.service';
import { of } from 'rxjs';
import { UserLoginAction, UserLoginSuccessAction, UserLoginFailAction, UserLogoutAction, UserSaveSuccessAction, UserSaveFailAction, UserSaveAction } from './user.action';

@Injectable()
export class UserEffect {
    constructor(
        private actions$: Actions,
        private generalService: GeneralService
    ) { }
    loginEffect$ = createEffect(() => this.actions$.pipe(
        ofType(UserLoginAction),
        switchMap(({ userName, password }) => this.generalService.login(userName, password)
            .pipe(
                map(response => UserLoginSuccessAction({ payload: response.content })),
                catchError(({ error }) => of(UserLoginFailAction(error)))
            )
        )
    ));
    
    saveUserEffect$ = createEffect(() => this.actions$.pipe(
        ofType(UserSaveAction),
        concatMap(({ id, userName, passwordHash }) => this.generalService.userSave(id, userName, passwordHash)
            .pipe(
                map(response => UserSaveSuccessAction({})),
                catchError(({ error }) => of(UserSaveFailAction(error)))
            )
        )
    ));
}