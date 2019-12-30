import { Component, OnInit } from '@angular/core';
import { TargetModel } from 'src/models/target.model';
import * as fromRoot from '../../store/reducers'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TargetsState } from 'src/store/target/target.reducer';
import { Router } from '@angular/router'; 
import { COFFEE_APP_PATHS } from 'src/app/paths';
@Component({
    templateUrl: './targets.html',
})
export class TargetsComponent implements OnInit {
    targets$: Observable<TargetModel[]>;
   
    constructor(private store: Store<fromRoot.CoffeeState>,private router:Router) {
        this.targets$ = this.store.select(state => state.targets.data);
    }

    add() {
        this.router.navigate([COFFEE_APP_PATHS.TARGETS_DETAIL],{ queryParams: { id:-1}})
    }

    ngOnInit() {

    }
}