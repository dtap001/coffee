
import { createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store';
import { UserModel } from 'src/models/user.model';
import { LoginAction, LoginSuccessAction, LoginFailAction } from './login.action';

export interface UserState {
    data: UserModel;
    loaded: boolean;
    loading: boolean;
    loggedIn: boolean;
    error: any
}

export const emptyState: UserState = {
    data: {} as UserModel,
    loaded: false,
    loading: false,
    loggedIn: false,
    error: null
}

export const Reducer = createReducer(
    emptyState,
    on(LoginAction, state => ({ ...state, loading: true })),
    on(LoginSuccessAction, (state: UserState, action) => ({
        ...state,
        loading: false,
        loaded: true,
        loggedIn: true,
        error: null,
        data: action.payload
    })),
    on(LoginFailAction, (state, { error }) => ({
        ...state,
        loading: false,
        loggedIn: false,
        error
    })),
);

export const getUserState = createFeatureSelector<UserState>('data');


/*export const getIsLoggedIn = createSelector(
    getHelloState,
    (state: HelloState) => state.isLoggedIn
);*/