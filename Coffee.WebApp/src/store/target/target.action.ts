import { Action, createAction, props } from '@ngrx/store'
import { UserModel } from 'src/models/user.model';
import { TargetModel } from 'src/models/target.model';


export const TargetDetailAction = createAction(
    "[TargetDetail] Start",
    props<{ id: number }>()
);
export const TargetsSearchAction = createAction(
    "[SearchTargets] Start",
    props<{ search: string }>()
);

export const TargetsSearchSuccessAction = createAction(
    "[SearchTargets] Success",
    props<{ payload: TargetModel[] }>()
);

export const TargetsSearchFailAction = createAction(
    "[SearchTargets] Fail",
    props<{ error: String }>()
);


export const TargetsSaveAction = createAction(
    "[SaveTarget] Start",
    props<{ target: TargetModel }>()
);

export const TargetsSaveSuccessAction = createAction(
    "[SaveTarget] Success",
    props<{ savedTarget: TargetModel }>()
);

export const TargetsSaveFailAction = createAction(
    "[SaveTarget] Fail",
    props<{ error: String }>()
);

export const TargetsDeleteAction = createAction(
    "[DeleteTarget] Start",
    props<{ id: number }>()
);

export const TargetsDeleteSuccessAction = createAction(
    "[DeleteTarget] Success",
    props<{ deletedTarget: TargetModel }>()
);

export const TargetsDeleteFailAction = createAction(
    "[DeleteTarget] Fail",
    props<{ error: String }>()
);


export const TargetsWakeAction = createAction(
    "[WakeTarget] Start",
    props<{ id: number }>()
);

export const TargetsWakeSuccessAction = createAction(
    "[WakeTarget] Success",
    props<{ target: TargetModel }>()
);

export const TargetsWakeFailAction = createAction(
    "[WakeTarget] Fail",
    props<{ error: String }>()
);
