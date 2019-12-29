import { Action, createAction, props } from '@ngrx/store'
import { UserModel } from 'src/models/user.model';


export const LoginAction = createAction(
    "[Login] Start",
    props<{ userName: string, password: string }>()
);

export const LoginSuccessAction = createAction(
    "[Login] Success",
    props<{ payload: UserModel }>()
);

export const LoginFailAction = createAction(
    "[Login] Fail",
    props<{ error: String }>()
);
