import { InitModel } from 'src/models/init.model';
import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { HelloAction, HelloSuccessAction, HelloFailedAction } from './hello.action';

export interface InitState {
    data: InitModel;
    loaded: boolean;
    loading: boolean;
    apiVersion:string;
}


export const emptyState: InitState = {
    data: {} as InitModel,
    loaded: false,
    loading: false,
    apiVersion:"EMPTY",
}


export const Reducer = createReducer(
    emptyState,
    on(HelloAction, state => ({ ...state, loading: true })),
    on(HelloSuccessAction, (state:InitState,action) => ({
        ...state,        
        loading: false,
        loggedIn: true,
        error: null,
        apiVersion:action.payload.ApiVersion
    })),
    on(HelloFailedAction, (state, { error }) => ({ ...state, loading: false, error })),
);
