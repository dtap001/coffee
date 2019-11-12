import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from '@angular/router';
import { map, catchError, tap, exhaustMap } from "rxjs/operators";
import { GeneralService } from 'src/app/services/general.service';
import { of } from 'rxjs';
import { Action } from '@ngrx/store';
import { InitModel } from 'src/models/init.model';
import { HelloAction, HelloSuccessAction, HelloFailedAction } from './hello.action';

@Injectable()
export class HelloEffect {
  constructor(
    private actions$: Actions,
    private router: Router,
    private generalService: GeneralService
  ) { }

  helloEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HelloAction),
      exhaustMap((action: Action) =>
        this.generalService.hello().pipe(
          map(response => HelloSuccessAction({ payload: response.content })),
          catchError(({ error }) => of(HelloFailedAction(error)))
        )
      )
    )
  );
}
