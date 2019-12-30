import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import *  as fromHello from '../hello/hello.reducer';
import * as fromUser from '../user/user.reducer';
import * as fromTargets from '../target/target.reducer';
import { environment } from 'src/environments/environment';

export interface CoffeeState {
    hello: fromHello.HelloState,
    user: fromUser.UserState
    targets: fromTargets.TargetsState
}

export const reducers: ActionReducerMap<CoffeeState> = {
    hello: fromHello.Reducer,
    user: fromUser.Reducer,
    targets: fromTargets.Reducer
}
  
export const metaReducers: MetaReducer<CoffeeState>[] = !environment.production
    ? []
    : [];