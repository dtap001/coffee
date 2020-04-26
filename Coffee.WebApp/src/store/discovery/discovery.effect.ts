import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { GeneralService } from 'src/app/services/general.service';
import { switchMap, map, catchError, exhaustMap } from 'rxjs/operators';

import { of } from 'rxjs';
import { DiscoveryStartAction, DiscoveryStartSuccessAction, DiscoveryStartFailedAction, DiscoveryGetInterfacesAction, DiscoveryGetInterfacesSuccessAtion, DiscoveryGetInterfacesFailAtion } from './discovery.action';

@Injectable()
export class DiscoveryEffect {
    constructor(
        private actions$: Actions,
        private generalService: GeneralService
    ) { }

    discoveryStartEffect$ = createEffect(() =>
     this.actions$.pipe(
        ofType(DiscoveryStartAction),
        exhaustMap(({ network }) => this.generalService.discoveryStart(network)
            .pipe(
                map(response => DiscoveryStartSuccessAction({})),
                catchError(({ error }) => of(DiscoveryStartFailedAction(error)))
            )
        )
    ));
    discoveryGetInterfacesEffect$ = createEffect(() => this.actions$.pipe(
        ofType(DiscoveryGetInterfacesAction),
        exhaustMap(() => this.generalService.discoveryGetInterfaces()
            .pipe(
                map(response => DiscoveryGetInterfacesSuccessAtion({ networks: response.content })),
                catchError(({ error }) => of(DiscoveryGetInterfacesFailAtion(error)))
            )
        )
    ));
}