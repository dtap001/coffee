import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from '@angular/router';
import {
    map, catchError,
    switchMap
} from "rxjs/operators";
import { GeneralService } from 'src/app/services/general.service';
import { of } from 'rxjs';
import { GetSettingsAction, GetSettingsSuccessAction, GetSettingsFailAction } from './settings.action';

@Injectable()
export class SettingsEffect {
    constructor(
        private actions$: Actions,
        private generalService: GeneralService
    ) { }

    targetsSearchEffect$ = createEffect(() => this.actions$.pipe(
        ofType(GetSettingsAction),
        switchMap(({ }) => this.generalService.settingsGet()
            .pipe(
                map(response => GetSettingsSuccessAction({ settings: response.content })),
                catchError(({ error }) => of(GetSettingsFailAction(error)))
            )
        )
    ));
}
