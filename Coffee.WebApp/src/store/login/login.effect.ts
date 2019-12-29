import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from '@angular/router';
import {
  map, catchError,
  switchMap
} from "rxjs/operators";
import { GeneralService } from 'src/app/services/general.service';
import { of } from 'rxjs';
import { LoginAction, LoginSuccessAction, LoginFailAction } from './login.action';

@Injectable()
export class LoginEffect {
  constructor(
    private actions$: Actions,
    private generalService: GeneralService
  ) { }

  loginEffect$ = createEffect(() => this.actions$.pipe(
    ofType(LoginAction),
    switchMap(({ userName, password }) => this.generalService.login(userName, password)
      .pipe(
        map(response => LoginSuccessAction({ payload: response.content })),
        catchError(({ error }) => of(LoginFailAction(error)))
      )
    )
  ));


  /*
    updateMatchResult$ = createEffect(() => this.actions$.pipe(
      ofType(MatchActions.updateMatchResult),
      switchMap(({matchId, result}) => this.matchService.updateMatchResult(matchId, result)
        .pipe(
          map(() => MatchActions.updateMatchResultSuccess({})),
          catchError(() => of(MatchActions.updateMatchResultError({})))
        )
      )
    ));
  
  
  
  
  
  
  
  
  
   playlistRemoveSong$ = createEffect(() =>
      this.actions$.pipe(
        ofType(PlayerActions.removeSong),
        mergeMap(({song}) => {
          return this.bsapi.clearSong(song.id).pipe(
            map(() => ({ type: PlayerActions.playerActionOk.type })),
            catchError(() => of({ type: PlayerActions.playerActionFail.type }))
          );
        })
      )
    );
  */

}
