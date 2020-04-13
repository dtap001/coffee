import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/reducers'
import { TargetsGetPinnedAction, TargetsWakePinnedAction } from 'src/store/target/target.action';
import { PinnedTargetModel } from 'src/models/target.model';

@Component({
    templateUrl: './start.html',
})
export class StartComponent implements OnInit, OnDestroy {
    ngOnDestroy(): void {
        this.subscription$.unsubscribe();
    }
    subscription$: Subscription;
    pinnedTargets: PinnedTargetModel[];
    constructor(private store: Store<fromRoot.CoffeeState>) {
        this.subscription$ = this.store.select(state => state.targets.pinnedTargets).subscribe(targets => {
            this.pinnedTargets = targets;
        });
    }
    ngOnInit() {
        this.store.dispatch(TargetsGetPinnedAction({}));
    }
    wake(id: number) {
        let value = document.querySelector("#pinCode_" + id).value;
        this.store.dispatch(TargetsWakePinnedAction({ id: id, pinCode: value }));
    }
}