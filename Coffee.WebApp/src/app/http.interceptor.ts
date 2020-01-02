import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as fromRoot from '../store/reducers'
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { GeneralResponse } from 'src/models/general.response';
import { COFFEE_APP_PATHS } from './paths';
import { KickedOutAction } from 'src/store/hello/hello.action';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    _token: string;
    constructor(private router: Router, private store: Store<fromRoot.CoffeeState>) {
        this.store.select(state => state.user.data.Token)
            .subscribe((Token) => {
                if (Token) {
                    this._token = Token;
                }
            });
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this._token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this._token}`
                }
            });
        }

        return next.handle(request).pipe(tap((response) => {
            if (response instanceof HttpResponse && !(response.body as GeneralResponse).isOK) {
                if ((response.body as GeneralResponse).error.code == 401) {
                    this.store.dispatch(KickedOutAction({}))
                    return this.router.navigate([COFFEE_APP_PATHS.ROOT]);
                }
            }
        },
            (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status !== 401) {
                        return;
                    }
                    this.store.dispatch(KickedOutAction({}))
                    return this.router.navigate([COFFEE_APP_PATHS.ROOT]);
                }
            }));
    }
}