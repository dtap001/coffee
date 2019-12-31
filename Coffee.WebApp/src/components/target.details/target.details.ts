import { Component, OnInit } from '@angular/core';
import { TargetModel } from 'src/models/target.model';
import * as fromRoot from '../../store/reducers'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { getSelectedTarget, getTargetsState } from 'src/store/target/target.reducer';

@Component({
    templateUrl: './target.details.html',
})
export class TargetDetails implements OnInit {
    target$: Observable<TargetModel>;

    constructor(private store: Store<fromRoot.CoffeeState>, private router: Router) {
        this.target$ = this.store.select(state => state.targets.selectedTarget);
    }

    ngOnInit() {

    }
}