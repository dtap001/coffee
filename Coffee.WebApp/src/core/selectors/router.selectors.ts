import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';
import { AppRouterState } from '../reducers/router.reducers';

export const getRouterState = createFeatureSelector<RouterReducerState<AppRouterState>>('router');
