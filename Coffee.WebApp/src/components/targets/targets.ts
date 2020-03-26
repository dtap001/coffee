import { Component, OnInit } from '@angular/core';
import { TargetModel } from 'src/models/target.model';
import * as fromRoot from '../../store/reducers'
import { Store } from '@ngrx/store';
import { GeneralService } from 'src/app/services/general.service';
import { TargetsState, TargetViewModel } from 'src/store/target/target.reducer';
import { Router } from '@angular/router';
import { COFFEE_APP_PATHS } from 'src/app/paths';
import { TargetsDeleteAction, TargetsWakeAction, TargetPinAction, TargetsWakeSuccessAction, TargetsSearchAction, TargetsSaveAction, TargetPinSuccess, TargetsSaveSuccessAction, TargetsDeleteSuccessAction } from 'src/store/target/target.action';
import { Actions, ofType } from '@ngrx/effects';
import { Target } from '@angular/compiler';
import { switchMap, single, map } from 'rxjs/operators';
import { of, Observable, from } from 'rxjs';


@Component({
    templateUrl: './targets.html',
})
export class TargetsComponent implements OnInit {
    targets$: Observable<TargetModel[]>;
    targetViewModels$: Observable<TargetViewModel[]>;
    isDiscoveryVisible = false;
    constructor(private actions$: Actions, private store: Store<fromRoot.CoffeeState>, private router: Router) {
        this.targets$ = this.store.select(state => state.targets.data);
        this.targetViewModels$ = this.store.select(state => state.targets.loading);
    }
    getTargetView(id) {
        let array = this.store.select(state => state.targets.loading.filter(t => t.id == id));       
        
        return array;
    }

    /*
    this.store.select(fromBatStores.selectBatStoresBatStores)
    .switchMap((batStores : BatStore[]) => Observable.from(batStores))
    .single((bs: BatStore) => bs.number === editId);
    
    */

    add() {
        this.router.navigate([COFFEE_APP_PATHS.TARGETS_DETAIL], { queryParams: { id: -1 } });
    }

    edit(target: TargetModel) {
        this.router.navigate([COFFEE_APP_PATHS.TARGETS_DETAIL], { queryParams: { id: target.id } });
    }
    remove(target: TargetModel) {
        this.store.dispatch(TargetsDeleteAction({ id: target.id }));
    }

    wake(target: TargetModel) {
        this.store.dispatch(TargetsWakeAction({ id: target.id }));
    }
    pin(target: TargetModel) {       
        this.store.dispatch(TargetPinAction({ id: target.id }));
    }

    ngOnInit() {
        this.actions$.pipe(
            ofType(TargetsWakeSuccessAction),
        ).subscribe(action => this.store.dispatch(TargetsSearchAction({ search: "" })));
        this.actions$.pipe(
            ofType(TargetsSaveSuccessAction),
        ).subscribe(action => this.store.dispatch(TargetsSearchAction({ search: "" })));
        this.actions$.pipe(
            ofType(TargetPinSuccess),
        ).subscribe(action => this.store.dispatch(TargetsSearchAction({ search: "" })));
        this.actions$.pipe(
            ofType(TargetsDeleteSuccessAction),
        ).subscribe(action => this.store.dispatch(TargetsSearchAction({ search: "" })));
    }
}