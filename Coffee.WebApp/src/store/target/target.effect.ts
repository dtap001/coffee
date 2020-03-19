import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from '@angular/router';
import {
    map, catchError,
    switchMap
} from "rxjs/operators";
import { GeneralService } from 'src/app/services/general.service';
import { of } from 'rxjs';
import { TargetsSearchAction, TargetsDeleteSuccessAction, TargetsDeleteFailAction, TargetsSaveAction, TargetsSaveSuccessAction, TargetsSaveFailAction, TargetsWakeAction, TargetsWakeSuccessAction, TargetsWakeFailAction, TargetsDeleteAction, TargetsSearchSuccessAction, TargetsSearchFailAction, TargetDetailAction, TargetPinAction, TargetPinSuccess, TargetPinFail, TargetsGetPinnedAction, TargetsGetPinnedSuccessAction, TargetsGetPinnedFailAction } from './target.action';

@Injectable()
export class TargetsEffect {
    constructor(
        private actions$: Actions,
        private generalService: GeneralService
    ) { }

    targetsSearchEffect$ = createEffect(() => this.actions$.pipe(
        ofType(TargetsSearchAction),
        switchMap(({ search }) => this.generalService.targetsSearch(search)
            .pipe(
                map(response => TargetsSearchSuccessAction({ payload: response.content })),
                catchError(({ error }) => of(TargetsSearchFailAction(error)))
            )
        )
    ));
    targetsDeleteEffect$ = createEffect(() => this.actions$.pipe(
        ofType(TargetsDeleteAction),
        switchMap(({ id }) => this.generalService.targetsDelete(id)
            .pipe(
                map(response => TargetsDeleteSuccessAction({ deletedTarget: response.content })),
                catchError(({ error }) => of(TargetsDeleteFailAction(error)))
            )
        )
    ));

    targetSaveEffect$ = createEffect(() => this.actions$.pipe(
        ofType(TargetsSaveAction),
        switchMap(({ target }) => this.generalService.targetsSave(target)
            .pipe(
                map(response => TargetsSaveSuccessAction({ savedTarget: response.content })),
                catchError(({ error }) => of(TargetsSaveFailAction(error)))
            )
        )
    ));

    targetsWakeEffect$ = createEffect(() => this.actions$.pipe(
        ofType(TargetsWakeAction),
        switchMap(({ id }) => this.generalService.targetsWake(id)
            .pipe(
                map(response => TargetsWakeSuccessAction({ target: response.content })),
                catchError(({ error }) => of(TargetsWakeFailAction(error)))
            )
        )
    ));
    targetsGetPinnedEffect$ = createEffect(() => this.actions$.pipe(
        ofType(TargetsGetPinnedAction),
        switchMap(({ id }) => this.generalService.targetsGetPinned()
            .pipe(
                map(response => TargetsGetPinnedSuccessAction({pinned:response.content})),
                catchError(({ error }) => of(TargetsGetPinnedFailAction(error)))
            )
        )
    ));
    targetPinEffect$ = createEffect(() => this.actions$.pipe(
        ofType(TargetPinAction),
        switchMap(({ id }) => this.generalService.targetsPin(id)
            .pipe(
                map(response => TargetPinSuccess({ target: response.content })),
                catchError(({ error }) => of(TargetPinFail(error)))
            )
        )
    )); 
}
