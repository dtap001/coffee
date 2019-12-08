
import { createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store';
import { UserModel } from 'src/models/user.model';
import { UserLoginFailedAction, UserLoginAction, UserLoginSuccess } from './user.action';

export interface UserState {
    data: UserModel;
    isLoggedIn: boolean;
    loaded: boolean;
    loading: boolean;
}

export const emptyState: UserState = {
    data: {} as UserModel,
    loaded: false,
    loading: false,
    isLoggedIn: false
}

export const Reducer = createReducer(
    emptyState,
    on(UserLoginAction, (state) => ({
        ...state,
        loading: true
    })),
    on(UserLoginSuccess, (state: UserState, action) => ({
        ...state,
        loading: false,
        loggedIn: true,
        error: null,
        isLoggedIn: true,
    })),
    on(UserLoginFailedAction, (state, { error }) => ({
        ...state,
        loading: false,
        error,
        isLoggedIn: false
    })),
);

export const getUserState = createFeatureSelector<UserState>('data');


export const getIsLoggedIn = createSelector(
    getUserState,
    (state: UserState) => state.isLoggedIn
);