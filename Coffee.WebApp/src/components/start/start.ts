import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/reducers'
import { TargetsGetPinnedAction, TargetsWakePinnedAction } from 'src/store/target/target.action';
import { PinnedTargetModel } from 'src/models/target.model';
import { Actions, ofType } from '@ngrx/effects';
import { HelloSuccessAction } from 'src/store/hello/hello.action';

@Component({
    templateUrl: './start.html',
    styleUrls: ['./start.scss']
})
export class StartComponent implements OnInit, OnDestroy {
    ngOnDestroy(): void {
        this.subscription$.unsubscribe();
    }
    subscription$: Subscription;
    pinnedTargets: PinnedTargetModel[];
    selectedTarget: PinnedTargetModel;
    loading$: Observable<boolean>;
    error$: Observable<string>;
    public code: number;
    constructor(private actions$: Actions, private store: Store<fromRoot.CoffeeState>) {
        this.subscription$ = this.store.select(state => state.targets.pinnedTargets).subscribe(targets => {
            this.pinnedTargets = targets;
        });
        this.loading$ = this.store.select(state => state.targets.wakeInProgress);
        this.error$ = this.store.select(state => state.targets.error);
    }
    ngOnInit() {
    }
    wake() {
        this.store.dispatch(TargetsWakePinnedAction({ id: this.selectedTarget.id, pinCode: this.code }));
    }
    onOtpChange(event) {
        this.code = event;
    }
}