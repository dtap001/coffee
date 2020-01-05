import { Component, NgZone, OnInit, ChangeDetectorRef } from '@angular/core';
import * as fromRoot from '../../store/reducers'
import { Store } from '@ngrx/store';
import { HelloAction } from 'src/store/hello/hello.action';
import { Observable } from 'rxjs';
import { HelloState } from 'src/store/hello/hello.reducer';
import { Router } from '@angular/router';
import { UserState } from 'src/store/user/user.reducer';
import { UserLoginAction } from 'src/store/user/user.action';
import { COFFEE_APP_PATHS } from 'src/app/paths';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'coffee-root',
  templateUrl: './coffee.root.html',
  styleUrls: ['./coffee.root.scss']
})
export class CoffeeRoot implements OnInit {
  public userName: string;
  public password: string;

  constructor(private store: Store<fromRoot.CoffeeState>, private router: Router, private socketService: SocketService) {
    this.helloState$ = this.store.select(state => state.hello);
    this.userState$ = this.store.select(state => state.user);
    this.store.dispatch(HelloAction());
    this.socketService.dispatch("sad", { test: "test" });
  }

  public helloState$: Observable<HelloState>;
  public userState$: Observable<UserState>;

  public doLogin(userName: string, password: string) {
    this.store.dispatch(UserLoginAction({ userName: userName, password: password }));
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
