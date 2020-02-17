import { Component, OnInit } from '@angular/core';
import { TargetModel } from 'src/models/target.model';
import * as fromRoot from '../../store/reducers'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TargetsState } from 'src/store/target/target.reducer';
import { Router } from '@angular/router';
import { COFFEE_APP_PATHS } from 'src/app/paths';
import { TargetsDeleteAction, TargetsWakeAction, TargetPinAction } from 'src/store/target/target.action';
@Component({
    templateUrl: './targets.html',
})
export class TargetsComponent implements OnInit {
    targets$: Observable<TargetModel[]>;
    isDiscoveryVisible = false;
    constructor(private store: Store<fromRoot.CoffeeState>, private router: Router) {
        this.targets$ = this.store.select(state => state.targets.data);
    }

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
    pin(target:TargetModel){
        this.store.dispatch(TargetPinAction({id:target.id}));
    }

    ngOnInit() {

    }
}