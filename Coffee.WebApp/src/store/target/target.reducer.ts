import { createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store'
import { TargetModel } from 'src/models/target.model';
import { TargetsSearchAction, TargetsSearchSuccessAction, TargetsSearchFailAction, TargetsWakeAction, TargetsWakeSuccessAction, TargetsWakeFailAction, TargetsDeleteAction, TargetsDeleteSuccessAction, TargetsDeleteFailAction, TargetsSaveFailAction, TargetsSaveAction } from './target.action';

export interface TargetsState {
    data: TargetModel[];
    loaded: boolean;
    loading: boolean;
    error: any
}

export const emptyState: TargetsState = {
    data: [],
    loaded: false,
    loading: false,
    error: null
}

export const Reducer = createReducer(
    emptyState,
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
        data: state.data.filter(item => item.id == action.deletedTarget.id),
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


/*export const getIsLoggedIn = createSelector(
    getHelloState,
    (state: HelloState) => state.isLoggedIn
);*/