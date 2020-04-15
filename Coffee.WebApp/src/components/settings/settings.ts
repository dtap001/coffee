

import { Component, OnInit, OnDestroy } from '@angular/core';
import { TargetModel } from 'src/models/target.model';
import * as fromRoot from '../../store/reducers'
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { getSelectedTarget, getTargetsState } from 'src/store/target/target.reducer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TargetsSaveAction, TargetsSaveSuccessAction, TargetsSaveFailAction } from 'src/store/target/target.action';
import { Actions, ofType } from '@ngrx/effects';
import { SettingsModel } from 'src/models/settings.model';
import { SaveSettingsAction } from 'src/store/settings/settings.action';

@Component({
    templateUrl: './settings.html',
})
export class SettingsComponent implements OnDestroy {
    ngOnDestroy(): void {
        this.subscription$.unsubscribe();
    }
    settings: SettingsModel;
    form: FormGroup;
    subscription$: Subscription;
    saveInProgress$ :Observable<boolean>
    constructor(private actions$: Actions,private store: Store<fromRoot.CoffeeState>, private router: Router, private formBuilder: FormBuilder) {
        this.saveInProgress$ = this.store.select(state => state.targets.saveInProgress);
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            passwordConfirm: ['', Validators.required]
        });
        this.subscription$ = this.store.select(state => state.settings.data).subscribe(settings => {
            this.settings = settings;
            this.form.controls["username"].setValue(settings.username);
            this.form.controls["password"].setValue(settings.password);
            this.form.controls["passwordConfirm"].setValue(settings.passwordConfirm);
        });
    }   
    save() {    
        this.store.dispatch(SaveSettingsAction({ settings: {
             username : this.form.controls["username"].value,
             password : this.form.controls["password"].value,
             passwordConfirm : this.form.controls["passwordConfirm"].value, 
        }}));
    }

}