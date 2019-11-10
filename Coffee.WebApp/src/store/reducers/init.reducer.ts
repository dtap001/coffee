import { InitModel } from 'src/models/init.model';
import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { InitAction, InitSuccessAction, InitFailedAction } from '../actions/init.action';

export interface InitState {
    data: InitModel;
    loaded: boolean;
    loading: boolean;
}


export const emptyState: InitState = {
    data: {} as InitModel,
    loaded: false,
    loading: false
}


export const Reducer = createReducer(
    emptyState,
    on(InitAction, state => ({ ...state, loading: true })),
    on(InitSuccessAction, state => ({
        ...state,
        loading: false,
        loggedIn: true,
        error: null
    })),
    on(InitFailedAction, (state, { error }) => ({ ...state, loading: false, error })),
);
