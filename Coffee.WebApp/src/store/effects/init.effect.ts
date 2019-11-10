import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from '@angular/router';
import { map, catchError, tap, exhaustMap } from "rxjs/operators";
import { InitSuccessAction, InitAction, InitFailedAction } from '../actions/init.action';
import { GeneralService } from 'src/app/services/general.service';
import { of } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class InitEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private generalService: GeneralService
  ) {
    let result = InitAction
    result.type
  }

  /* initEffect$ = createEffect(() => this.actions$.pipe(
       ofType(InitAction),
       mergeMap(action => )
   ));*/

  initEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InitAction),
      exhaustMap((action: Action) =>
        this.generalService.init().pipe(
          map(message => InitSuccessAction({ payload: message })),
          catchError(({ error }) => of(InitFailedAction(error)))
        )
      )
    )
  ); 


  /*

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InitAction),
      map(action => action.credentials),
      exhaustMap((auth: Credentials) =>
        this.authService.create(auth).pipe(
          map(message => AuthActions.createSuccess({ message })),
          catchError(({ error }) => of(AuthActions.createFail(error)))
        )
      )
    )
  );





  /*  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InitAction),
      map(action => action.credentials),
      exhaustMap((auth: Credentials) =>
        this.authService.login(auth).pipe(
          map(user => AuthActions.loginSuccess({ user })),
          catchError(({ error }) => {
            console.log(error);
            return of(AuthActions.loginFail(error));
          })
        )
      )
    )
  );*/
}
