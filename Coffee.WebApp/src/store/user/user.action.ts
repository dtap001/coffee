import { Action, createAction, props } from '@ngrx/store'
import { HelloModel } from 'src/models/hello.model';
import { UserModel } from 'src/models/user.model';


export const UserLoginAction = createAction(
    "[UserLogin] Start",
    props<{ userName: string, password: string }>()
);

export const UserLoginSuccessAction = createAction(
    "[UserLogin] Success",
    props<{ payload: UserModel }>()
);

export const UserLoginFailAction = createAction(
    "[UserLogin] Fail",
    props<{ error: String }>()
);


export const UserLogoutAction = createAction(
    "UserLogut",
    props<{}>()
)