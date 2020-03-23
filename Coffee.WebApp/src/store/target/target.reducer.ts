import { createReducer, on, createSelector, createFeatureSelector, ActionsSubject } from '@ngrx/store'
import { TargetModel } from 'src/models/target.model';
import { TargetsSearchAction, TargetsSearchSuccessAction, TargetsSearchFailAction, TargetsWakeAction, TargetsWakeSuccessAction, TargetsWakeFailAction, TargetsDeleteAction, TargetsDeleteSuccessAction, TargetsDeleteFailAction, TargetsSaveFailAction, TargetsSaveAction, TargetDetailAction, TargetPinSuccess, TargetPinFail, TargetPinAction } from './target.action';

export class TargetViewModel {
    isLoading: boolean;
    id: number;
}
export interface TargetsState {
    data: TargetModel[];
    selectedTarget: TargetModel,
    loading: TargetViewModel[];
    error: any,
    discoveredTargets: TargetModel[]
}

export const emptyState: TargetsState = {
    data: [],
    loading: [],
    error: null,
    selectedTarget: new TargetModel(),
    discoveredTargets: []
}

export const Reducer = createReducer(
    emptyState,
    on(TargetDetailAction, (state: TargetsState, action) => ({
        ...state,
        selectedTarget:
            state.data.filter(item => { return item.id == action.id }).length == 0 ? state.selectedTarget : state.data.filter(item => { return item.id == action.id })[0]
    })),
    on(TargetsSearchAction, state => ({
        ...state,
        loading: state.data.map(t => ({ id: t.id, isLoading: true } as TargetViewModel))
    })),
    on(TargetsSearchSuccessAction, (state: TargetsState, action) => ({
        ...state,
        data: action.payload,
        loading: action.payload.map(t => ({ id: t.id, isLoading: false } as TargetViewModel)),
        error: null,       
    })),
    on(TargetsSearchFailAction, (state, { error }) => ({
        ...state,
        loading: state.data.map(t => ({ id: t.id, isLoading: false } as TargetViewModel)),
        error
    })),
    on(TargetsWakeAction, (state, action) => ({
        ...state,
        loading: state.data.filter(t => { t.id == action.id }).map(t => ({ id: t.id, isLoading: true } as TargetViewModel)),
    })),
    on(TargetsWakeSuccessAction, (state: TargetsState, action) => ({
        ...state,
        loading: state.data.filter(t => { t.id == action.id }).map(t => ({ id: t.id, isLoading: false } as TargetViewModel)),
        error: null,
    })),
    on(TargetsWakeFailAction, (state, action) => ({
        ...state,
        loading: state.data.filter(t => { t.id == action.id }).map(t => ({ id: t.id, isLoading: false } as TargetViewModel)),
        error: action.error
    })),
    on(TargetsDeleteAction, (state, action) => (
        {
            ...state,
            loading: state.data.filter(t => { t.id == action.id }).map(t => ({ id: t.id, isLoading: true } as TargetViewModel)),
        })),
    on(TargetsDeleteSuccessAction, (state: TargetsState, action) => ({
        ...state,
        loading: state.data.filter(t => { t.id == action.id }).map(t => ({ id: t.id, isLoading: false } as TargetViewModel)),
        error: null,
    })),
    on(TargetsDeleteFailAction, (state, action) => ({
        ...state,
        loading: state.data.filter(t => { t.id == action.id }).map(t => ({ id: t.id, isLoading: false } as TargetViewModel)),
        error: action.error
    })),
    on(TargetsSaveFailAction, (state,action) => (
        { 
            ...state,
            loading: state.data.filter(t => { t.id == action.id }).map(t => ({ id: t.id, isLoading: false } as TargetViewModel)),
            error:action.error
        }
        )),
    on(TargetsSaveAction, (state: TargetsState, action) => ({
        ...state,
        loading: state.data.filter(t => { t.id == action.target.id }).map(t => ({ id: t.id, isLoading: true } as TargetViewModel)),           
        error: null,
    })),
    on(TargetsSaveFailAction, (state, action) => ({
        ...state,
        loading: state.data.filter(t => { t.id == action.id }).map(t => ({ id: t.id, isLoading: false } as TargetViewModel)),  
        error:action.error
    })),
    on(TargetPinAction, (state: TargetsState, action) => ({
        ...state,
        loading: state.data.filter(t => { t.id == action.id }).map(t => ({ id: t.id, isLoading: true } as TargetViewModel)),          
        error: null,
    })),
    on(TargetPinSuccess, (state: TargetsState, action) => ({
        ...state,
        loading: state.data.filter(t => { t.id == action.id }).map(t => ({ id: t.id, isLoading: false } as TargetViewModel)),          
        error: null,
    })),
    on(TargetPinFail, (state: TargetsState, action) => ({
        ...state,
        loading: state.data.filter(t => { t.id == action.id }).map(t => ({ id: t.id, isLoading: false } as TargetViewModel)),          
        error: action.error,
    })),
);

export const getTargetsState = createFeatureSelector<TargetsState>('data');
export const getSelectedTarget = createSelector(
    getTargetsState,
    (state: TargetsState) => state.selectedTarget
);

/*export const getIsLoggedIn = createSelector(
    getHelloState,
    (state: HelloState) => state.isLoggedIn
);*/