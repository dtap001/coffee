import { Component, OnInit, OnDestroy } from '@angular/core';
import { TargetModel } from 'src/models/target.model';
import * as fromRoot from '../../store/reducers'
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { getSelectedTarget, getTargetsState } from 'src/store/target/target.reducer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    templateUrl: './target.details.html',
})
export class TargetDetails implements OnInit, OnDestroy {
    ngOnDestroy(): void {
        this.subscription$.unsubscribe();
    }
    target: TargetModel;
    form: FormGroup;
    subscription$: Subscription;

    constructor(private store: Store<fromRoot.CoffeeState>, private router: Router, private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            caption: ['', Validators.required]
        });
        this.subscription$ = this.store.select(state => state.targets.selectedTarget).subscribe(target => {
            this.form.controls["caption"].setValue(target.caption);
        });
    }

    ngOnInit() {

    }


    save() { }
}