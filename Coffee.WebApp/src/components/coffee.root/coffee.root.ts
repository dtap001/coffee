import { Component, NgZone, OnInit, ChangeDetectorRef } from '@angular/core';
import * as fromRoot from '../../store/reducers'
import { Store } from '@ngrx/store';
import { HelloAction, HelloFailedAction } from 'src/store/hello/hello.action';
import { Observable } from 'rxjs';
import { HelloState } from 'src/store/hello/hello.reducer';
import { Router } from '@angular/router';
import { UserState } from 'src/store/user/user.reducer';
import { UserLoginAction, UserLogoutAction, UserLoginFailAction } from 'src/store/user/user.action';
import { COFFEE_APP_PATHS } from 'src/app/paths';
import { SocketService, HelloEvent } from 'src/app/services/socket.service';
import { MessageService } from 'primeng/api';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'coffee-root',
  templateUrl: './coffee.root.html',
  styleUrls: ['./coffee.root.scss']
})
export class CoffeeRoot implements OnInit {
  public userName: string;
  public password: string;

  constructor(private actions$: Actions, private messageService: MessageService, private store: Store<fromRoot.CoffeeState>, private router: Router, private socketService: SocketService) {
    this.helloState$ = this.store.select(state => state.hello);
    this.userState$ = this.store.select(state => state.user);
    this.store.dispatch(HelloAction());
    this.socketService.dispatch(new HelloEvent());
    actions$.pipe(
      ofType(UserLoginFailAction),
    ).subscribe(action => this.onFailed(action.error));
  }

  public helloState$: Observable<HelloState>;
  public userState$: Observable<UserState>;

  public doLogin(userName: string, password: string) {
    this.store.dispatch(UserLoginAction({ userName: userName, password: password }));
  }

  public doLogout() {
    this.store.dispatch(UserLogoutAction({}));
    this.router.navigate([COFFEE_APP_PATHS.ROOT]);
  }

  onFailed(message) {
    console.log("OnFailed: "+ JSON.stringify(message));
    this.messageService.add({severity:'error', summary:"Login failed", detail:message});
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
