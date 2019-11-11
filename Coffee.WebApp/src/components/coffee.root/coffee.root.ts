import { Component, NgZone, OnInit, ChangeDetectorRef } from '@angular/core';
import * as fromRoot from '../../store/reducers'
import { Store } from '@ngrx/store';
import { HelloAction } from 'src/store/hello/hello.action';
import { InitModel } from 'src/models/init.model';
import { Observable } from 'rxjs';
import { InitState } from 'src/store/hello/hello.reducer';

@Component({
  selector: 'coffee-root',
  templateUrl: './coffee.root.html',
  styleUrls: ['./coffee.root.scss']
})
export class CoffeeRoot implements OnInit {

  constructor(private store: Store<fromRoot.CoffeeState>) {
    this.initState$ = this.store.select(state => state.init);
  }
  public initState$: Observable<InitState>;
  lofasz() {
    this.store.dispatch(HelloAction());
  }
  ngOnInit() {
  }
}
