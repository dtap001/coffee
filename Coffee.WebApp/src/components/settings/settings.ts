

import { Component, OnInit, OnDestroy } from '@angular/core';
import { TargetModel } from 'src/models/target.model';
import * as fromRoot from '../../store/reducers'
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { getSelectedTarget, getTargetsState } from 'src/store/target/target.reducer';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { TargetsSaveAction, TargetsSaveSuccessAction, TargetsSaveFailAction } from 'src/store/target/target.action';
import { Actions, ofType } from '@ngrx/effects';
import { SettingsModel } from 'src/models/settings.model';
import { SaveSettingsAction } from 'src/store/settings/settings.action';
import { UserSaveAction } from 'src/store/user/user.action';
import { UserModel } from 'src/models/user.model';
import { ThrowStmt } from '@angular/compiler';

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
    saveInProgress$: Observable<boolean>
    _currentUser: UserModel;
    passwordControl: AbstractControl;
    passwordConfirmControl: AbstractControl;
    constructor(private actions$: Actions, private store: Store<fromRoot.CoffeeState>, private router: Router, private formBuilder: FormBuilder) {
        this.saveInProgress$ = this.store.select(state => state.targets.saveInProgress);
        this.store.select(state => state.user.data)
            .subscribe((data) => {
                if (data) {
                    this._currentUser = data;
                }
            });
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
        this.passwordControl = this.form.controls["password"];
        this.passwordConfirmControl = this.form.controls["passwordConfirm"];
    }
    // All is this method
    onPasswordChange() {
        if (this.passwordControl.value == this.passwordConfirmControl.value) {
            this.passwordConfirmControl.setErrors(null);
        } else {
            this.passwordConfirmControl.setErrors({ mismatch: true });
        }
    }
    save() {
        this.store.dispatch(UserSaveAction({
            userName: this.form.controls["username"].value,
            passwordHash: this.form.controls["password"].value,
            id: this._currentUser.ID
        }));
    }

}