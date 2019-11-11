import { InitModel } from 'src/models/init.model';
import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { HelloAction, HelloSuccessAction, HelloFailedAction } from './hello.action';

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
    on(HelloAction, state => ({ ...state, loading: true })),
    on(HelloSuccessAction, state => ({
        ...state,
        loading: false,
        loggedIn: true,
        error: null
    })),
    on(HelloFailedAction, (state, { error }) => ({ ...state, loading: false, error })),
);
