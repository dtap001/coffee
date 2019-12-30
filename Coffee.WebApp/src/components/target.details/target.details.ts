import { Component, OnInit } from '@angular/core';
import { TargetModel } from 'src/models/target.model';
import * as fromRoot from '../../store/reducers'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs'; 
@Component({
    templateUrl: './target.details.html',
})
export class TargetDetails implements OnInit {
    targets$: Observable<TargetModel[]>;
   
    constructor(private store: Store<fromRoot.CoffeeState>) {
        this.targets$ = this.store.select(state => state.targets.data);
    }

    add() {

    }

    ngOnInit() {

    }
}