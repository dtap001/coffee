import { Component, NgZone, OnInit, ChangeDetectorRef } from '@angular/core';
import * as fromRoot from '../../store/reducers'
import { Store } from '@ngrx/store';
import { HelloAction } from 'src/store/hello/hello.action';
import { Observable } from 'rxjs';
import { HelloState } from 'src/store/hello/hello.reducer';
import { LoginAction } from 'src/store/login/login.action';
import { state } from '@angular/animations';
import { UserState } from 'src/store/login/login.reducer';
import { Router } from '@angular/router';
import { COFFEE_APP_PATHS } from 'src/app/app-routing.module';

@Component({
  selector: 'coffee-root',
  templateUrl: './coffee.root.html',
  styleUrls: ['./coffee.root.scss']
})
export class CoffeeRoot implements OnInit {
  public userName: string;
  public password: string;

  constructor(private store: Store<fromRoot.CoffeeState>, private router: Router) {
    this.helloState$ = this.store.select(state => state.hello);
    this.userState$ = this.store.select(state => state.user);
    this.store.dispatch(HelloAction());
  }

  public helloState$: Observable<HelloState>;
  public userState$: Observable<UserState>;

  public doLogin(userName: string, password: string) {
    this.store.dispatch(LoginAction({ userName: userName, password: password }));
  }

  ngOnInit() {
    this.store.select(state => state.user.loggedIn)
      .subscribe((loggedIn) => {
        console.log("URL: " + this.router.url);
        if (loggedIn && this.router.url == "/") {
          this.router.navigate([COFFEE_APP_PATHS.TARGETS]);
        }
      });
  }
}
