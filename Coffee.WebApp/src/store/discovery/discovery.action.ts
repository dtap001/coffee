import { Action, createAction, props } from '@ngrx/store'
import { TargetModel } from 'src/models/target.model';


export const DiscoveryStartAction = createAction(
    "[DiscoveryStart]",
    props<{ network: string }>()
);
export const DiscoveryStartSuccessAction = createAction(
    "[DiscoveryStart] Success",
    props<{}>()
);
export const DiscoveryTargetFoundAction = createAction(
    "[DiscoveryTargetFound]",
    props<{ target: TargetModel }>()
);
export const DiscoveryEndAction = createAction(
    "[DiscoveryEnd]",
    props<{}>()
);
export const DiscoveryStartFailedAction = createAction(
    "[Discovery] Fail",
    props<{ error: string }>()
);

export const DiscoveryStopAction = createAction(
    "[DiscoveryStop]",
    props<{ network: string }>()
);

export const DiscoveryStopSuccessAction = createAction(
    "[DiscoveryStop]",
    props<{}>()
);

export const DiscoveryStopFailAction = createAction(
    "[DiscoveryStop] Fail",
    props<{ error: string }>()
);

export const DiscoveryGetInterfacesAction = createAction(
    "[DiscoveryGetInterfaces]",
    props<{}>()
);

export const DiscoveryGetInterfacesSuccessAtion = createAction(
    "[DiscoveryGetInterfaces] Success",
    props<{networks:string[]}>()
);

export const DiscoveryGetInterfacesFailAtion = createAction(
    "[DiscoveryGetInterfaces] Fail",
    props<{ error: string }>()
);