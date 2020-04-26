import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from '@angular/router';
import { map, catchError, tap, exhaustMap, switchMap, concatMap } from "rxjs/operators";
import { GeneralService } from 'src/app/services/general.service';
import { of } from 'rxjs';
import { Action } from '@ngrx/store';
import { HelloAction, HelloSuccessAction, HelloFailedAction } from './hello.action';
import { TargetsGetPinnedAction } from '../target/target.action';

@Injectable()
export class HelloEffect {
  constructor(
    private actions$: Actions,
    private generalService: GeneralService
  ) { }

  helloEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HelloAction),
      concatMap((action: Action) =>
        this.generalService.hello().pipe(
          switchMap(response => [
            HelloSuccessAction({ payload: response.content }),
            TargetsGetPinnedAction({})
          ]),
          catchError(({ error }) => of(HelloFailedAction(error)))
        )
      )
    )
  );
}
