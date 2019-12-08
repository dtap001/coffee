import { ActivatedRouteSnapshot, Params, RouterStateSnapshot } from '@angular/router';
import { routerReducer, RouterReducerState, RouterStateSerializer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

export interface AppRouterState {
    url: string;
    queryParams: Params;
    params: Params;
}

export interface State {
    router: RouterReducerState<AppRouterState>;
}

export const appRouterReducer: ActionReducerMap<State> = {
    router: routerReducer
};

export class CustomRouterStateSerializer implements RouterStateSerializer<AppRouterState> {
    serialize(routerState: RouterStateSnapshot): AppRouterState {
        const { url } = routerState;
        const { queryParams } = routerState.root;
        let state: ActivatedRouteSnapshot = routerState.root;
        while (state.firstChild) {
            state = state.firstChild;
        }
        const { params } = state;
        return { url, queryParams, params };
    }
}
