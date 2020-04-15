import { createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store';
import { SettingsModel } from 'src/models/settings.model';
import { GetSettingsAction, SaveSettingsAction, GetSettingsSuccessAction, GetSettingsFailAction, SaveSettingsSuccessAction, SaveSettingsFailAction } from './settings.action';

export interface SettingsState {
    data: SettingsModel;
    loaded: boolean;
    loading: boolean;
    loggedIn: boolean;
    error: any
}

export const emptyState: SettingsState = {
    data: {} as SettingsModel,
    loaded: false,
    loading: false,
    loggedIn: false,
    error: null
}

export const Reducer = createReducer(
    emptyState,
    on(GetSettingsAction, state => ({ ...state, loading: true })),
    on(GetSettingsSuccessAction, (state: SettingsState, action) => ({
        ...state,
        loading: false,
        loaded: true,
        loggedIn: true,
        error: null,
        data: action.settings
    })),
    on(GetSettingsFailAction, (state, { error }) => ({
        ...state,
        loading: false,
        loggedIn: false,
        error
    })),
    on(SaveSettingsAction, state => ({ ...state, loading: true })),
    on(SaveSettingsSuccessAction, (state: SettingsState, action) => ({
        ...state,
        loading: false,
        loaded: true,
        loggedIn: true,
        error: null,
    })),
    on(SaveSettingsFailAction, (state, { error }) => ({
        ...state,
        loading: false,
        loggedIn: false,
        error
    })),
);

export const getSettingsState = createFeatureSelector<SettingsState>('data');
