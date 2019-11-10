import { Action, createAction, props } from '@ngrx/store'
import { InitModel } from 'src/models/init.model';


export const InitAction = createAction(
    "[InitPage] Start"    
);

export const InitSuccessAction = createAction(
    "[InitPage] Success",
    props<{ payload: InitModel }>()
);

export const InitFailedAction = createAction(
    "[InitPage] Fail",
    props<{ error: String }>()
);
