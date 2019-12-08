 
import { createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store';
import { HelloAction, HelloSuccessAction, HelloFailedAction } from './hello.action';
import { HelloModel } from 'src/models/hello.model';

export interface HelloState {
    data: HelloModel;
    loaded: boolean;
    loading: boolean;
}

export const emptyState: HelloState = {
    data: {} as HelloModel,
    loaded: false,
    loading: false
}

export const Reducer = createReducer(
    emptyState,
    on(HelloAction, state => ({ ...state, loading: true })),
    on(HelloSuccessAction, (state: HelloState, action) => ({
        ...state,
        loading: false,
        loggedIn: true,
        error: null,        
        //apiVersion: action.payload.ApiVersion
    })),
    on(HelloFailedAction, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),
);

export const getHelloState = createFeatureSelector<HelloState>('data');


/*export const getIsLoggedIn = createSelector(
    getHelloState,
    (state: HelloState) => state.isLoggedIn
);*/