import { Component, NgZone, OnInit, ChangeDetectorRef } from '@angular/core';
import * as fromRoot from '../../store/reducers'
import { Store } from '@ngrx/store';
import { HelloAction } from 'src/store/hello/hello.action';
import { Observable } from 'rxjs';
import { HelloState } from 'src/store/hello/hello.reducer';

@Component({
  selector: 'coffee-root',
  templateUrl: './coffee.root.html',
  styleUrls: ['./coffee.root.scss']
})
export class CoffeeRoot implements OnInit {

  constructor(private store: Store<fromRoot.CoffeeState>) {
    this.helloState$ = this.store.select(state => state.hello);
    this.store.dispatch(HelloAction());
  }

  public helloState$: Observable<HelloState>;

  ngOnInit() {
  }
}
