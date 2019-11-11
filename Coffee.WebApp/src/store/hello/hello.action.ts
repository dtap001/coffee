import { Action, createAction, props } from '@ngrx/store'
import { InitModel } from 'src/models/init.model';


export const HelloAction = createAction(
    "[Hello] Start"    
);

export const HelloSuccessAction = createAction(
    "[Hello] Success",
    props<{ payload: InitModel }>()
);

export const HelloFailedAction = createAction(
    "[Hello] Fail",
    props<{ error: String }>()
);
