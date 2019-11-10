import { Component, NgZone, OnInit, ChangeDetectorRef } from '@angular/core';
import * as fromRoot from '../../store/reducers'
import { Store } from '@ngrx/store'; 
import { InitAction } from 'src/store/actions/init.action';

@Component({
  selector: 'coffee-root',
  templateUrl: './coffee.root.html',
  styleUrls: ['./coffee.root.scss']
})
export class CoffeeRoot implements OnInit {

  constructor(private store: Store<fromRoot.CoffeeState>) { }

  ngOnInit() {
    this.store.dispatch(InitAction());
  }
}
