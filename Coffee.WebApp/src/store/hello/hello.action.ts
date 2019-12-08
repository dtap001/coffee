import { Action, createAction, props } from '@ngrx/store'
import { HelloModel } from 'src/models/hello.model';


export const HelloAction = createAction(
    "[Hello] Start"    
);

export const HelloSuccessAction = createAction(
    "[Hello] Success",
    props<{ payload: HelloModel }>()
);

export const HelloFailedAction = createAction(
    "[Hello] Fail",
    props<{ error: String }>()
);
