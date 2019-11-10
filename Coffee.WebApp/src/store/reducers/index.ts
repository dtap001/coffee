import { ActionReducerMap, MetaReducer } from "@ngrx/store"
import *  as fromInit from './init.reducer'
import { InitState } from './init.reducer'
import { environment } from 'src/environments/environment';

export interface CoffeeState {
    init: fromInit.InitState
}


export const reducers: ActionReducerMap<CoffeeState> = {
    init: fromInit.Reducer
}


export const metaReducers: MetaReducer<CoffeeState>[] = !environment.production
    ? []
    : [];