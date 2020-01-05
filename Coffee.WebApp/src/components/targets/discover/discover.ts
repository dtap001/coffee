import { Component, OnInit, OnDestroy } from '@angular/core';
import { TargetModel } from 'src/models/target.model';
import * as fromRoot from '../../../store/reducers'
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { getSelectedTarget, getTargetsState } from 'src/store/target/target.reducer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    templateUrl: './discover.html',
    selector: 'discover-dialog'
})
export class DiscoverDialog implements OnInit, OnDestroy {
    targets$: Observable<TargetModel[]>;
    ngOnDestroy(): void {
    }


    constructor(private store: Store<fromRoot.CoffeeState>, private router: Router, private formBuilder: FormBuilder) {
        this.targets$ = this.store.select(state => state.targets.discoveredTargets)
    }

    ngOnInit() {

    }


    save() { }
}