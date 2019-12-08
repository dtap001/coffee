import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import *  as fromHello from '../hello/hello.reducer';
import * as fromUser from '../user/user.reducer';
import { environment } from 'src/environments/environment';

export interface CoffeeState {
    hello: fromHello.HelloState,
    user: fromUser.UserState
}


export const reducers: ActionReducerMap<CoffeeState> = {
    hello: fromHello.Reducer,
    user:fromUser.Reducer
}


export const metaReducers: MetaReducer<CoffeeState>[] = !environment.production
    ? []
    : [];