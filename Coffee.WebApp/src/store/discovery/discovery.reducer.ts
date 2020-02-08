import { createReducer, on, createSelector, createFeatureSelector, StateObservable } from '@ngrx/store'
import { TargetModel } from 'src/models/target.model';
import { DiscoveryStartAction, DiscoveryTargetFoundAction, DiscoveryEndAction, DiscoveryStartFailedAction, DiscoveryStopSuccessAction, DiscoveryStopFailAction, DiscoveryGetInterfacesSuccessAtion, DiscoveryGetInterfacesFailAtion } from './discovery.action';

export interface DiscoveryState {
    selectedNetwork: string,
    interfaces: string[],
    selectedInterface: string,
    loaded: boolean;
    loading: boolean;
    error: any,
    discoveredTargets: TargetModel[]
}

export const emptyState: DiscoveryState = {
    selectedNetwork: "",
    selectedInterface: "",
    interfaces: [],
    loaded: false,
    loading: false,
    error: null,
    discoveredTargets: []
}

export const Reducer = createReducer(
    emptyState,
    on(DiscoveryStartAction, (state: DiscoveryState, action) => ({
        ...state,
        loading: true,
        loaded: false
    })),
    on(DiscoveryTargetFoundAction, (state: DiscoveryState, action) => ({
        ...state,
        discoveredTargets: [...state.discoveredTargets.filter(item => item.id == action.target.id), action.target]
    })),
    on(DiscoveryEndAction, (state: DiscoveryState, action) => ({
        ...state,
        loading: false,
        loaded: true,
        error: null
    })),
    on(DiscoveryStartFailedAction, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),
    on(DiscoveryStopSuccessAction, (state) => ({
        ...state,
        loading: false
    })),
    on(DiscoveryStopFailAction, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),
    on(DiscoveryGetInterfacesSuccessAtion, (state, { networks }) => ({
        ...state,
        loading: false,
        interfaces: networks
    })),
    on(DiscoveryGetInterfacesFailAtion, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),
);