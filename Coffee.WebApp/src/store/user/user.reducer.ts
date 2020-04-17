import { createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store';
import { UserModel } from 'src/models/user.model';
import { UserLoginFailAction, UserLoginAction, UserLoginSuccessAction, UserLogoutAction, UserSaveAction, UserSaveSuccessAction, UserSaveFailAction } from './user.action';
import { KickedOutAction } from '../hello/hello.action';

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
    on(KickedOutAction, state => ({ ...state, loggedIn: false })),
    on(UserLoginAction, state => ({ ...state, loading: true })),
    on(UserLoginSuccessAction, (state: UserState, action) => ({
        ...state,
        loading: false,
        loaded: true,
        loggedIn: true,
        error: null,
        data: action.payload
    })),
    on(UserLoginFailAction, (state, { error }) => ({
        ...state,
        loading: false,
        loggedIn: false,
        error
    })),
    on(UserSaveAction, (state, action) => ({
        ...state,
        loading: false,
    })),
    on(UserSaveSuccessAction, (state, { }) => ({
        ...state,
        loading: false,

    })),
    on(UserSaveFailAction, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),
    on(UserLogoutAction, (state) => ({
        ...state,
        loggedIn: false,
        data: {} as UserModel
    }))
);

export const getUserState = createFeatureSelector<UserState>('data');
