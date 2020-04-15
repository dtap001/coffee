import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import *  as fromHello from '../hello/hello.reducer';
import * as fromUser from '../user/user.reducer';
import * as fromTargets from '../target/target.reducer';
import * as fromDiscovery from '../discovery/discovery.reducer'
import * as fromSettings from '../settings/settings.reducer'
import { environment } from 'src/environments/environment';

export interface CoffeeState {
    hello: fromHello.HelloState,
    user: fromUser.UserState
    targets: fromTargets.TargetsState,
    discovery: fromDiscovery.DiscoveryState,
    settings: fromSettings.SettingsState,
}

export const reducers: ActionReducerMap<CoffeeState> = {

    hello: fromHello.Reducer,
    user: fromUser.Reducer,
    targets: fromTargets.Reducer,
    discovery: fromDiscovery.Reducer,
    settings: fromSettings.Reducer
}

export const metaReducers: MetaReducer<CoffeeState>[] = !environment.production
    ? []
    : [];