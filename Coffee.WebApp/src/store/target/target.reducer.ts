import { createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store'
import { TargetModel } from 'src/models/target.model';
import { TargetsSearchAction, TargetsSearchSuccessAction, TargetsSearchFailAction, TargetsWakeAction, TargetsWakeSuccessAction, TargetsWakeFailAction, TargetsDeleteAction, TargetsDeleteSuccessAction, TargetsDeleteFailAction, TargetsSaveFailAction, TargetsSaveAction, TargetDetailAction } from './target.action';

export interface TargetsState {
    data: TargetModel[];
    selectedTarget: TargetModel,
    loaded: boolean;
    loading: boolean;
    error: any,
    discoveredTargets:TargetModel[]
}

export const emptyState: TargetsState = {
    data: [],
    loaded: false,
    loading: false,
    error: null,
    selectedTarget: new TargetModel(),
    discoveredTargets : []
}

export const Reducer = createReducer(
    emptyState,
    on(TargetDetailAction, (state: TargetsState, action) => ({
        ...state,
        selectedTarget:
            state.data.filter(item => { return item.id == action.id }).length == 0 ? state.selectedTarget : state.data.filter(item => { return item.id == action.id })[0]
    })),
    on(TargetsSearchAction, state => ({ ...state, loading: true })),
    on(TargetsSearchSuccessAction, (state: TargetsState, action) => ({
        ...state,
        loading: false,
        loaded: true,
        error: null,
        data: action.payload
    })),
    on(TargetsSearchFailAction, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),
    on(TargetsWakeAction, state => ({ ...state, loading: true })),
    on(TargetsWakeSuccessAction, (state: TargetsState, action) => ({
        ...state,
        loading: false,
        loaded: true,
        error: null,
        data: [...state.data.filter(item => item.id == action.target.id), action.target]
    })),

    on(TargetsWakeFailAction, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),
    on(TargetsDeleteAction, state => ({ ...state, loading: true })),
    on(TargetsDeleteSuccessAction, (state: TargetsState, action) => ({
        ...state,
        loading: false,
        loaded: true,
        error: null,
        data: state.data.filter(item => item.id != action.deletedTarget.id),
    })),
    on(TargetsDeleteFailAction, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),
    on(TargetsSaveFailAction, state => ({ ...state, loading: true })),
    on(TargetsSaveAction, (state: TargetsState, action) => ({
        ...state,
        loading: false,
        loaded: true,
        error: null,
        data: [...state.data.filter(item => item.id == action.target.id), action.target]
    })),
    on(TargetsSaveFailAction, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

);

export const getTargetsState = createFeatureSelector<TargetsState>('data');
export const getSelectedTarget = createSelector(
    getTargetsState,
    (state: TargetsState) => state.selectedTarget
);

/*export const getIsLoggedIn = createSelector(
    getHelloState,
    (state: HelloState) => state.isLoggedIn
);*/