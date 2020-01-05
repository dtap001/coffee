import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoffeeRoot } from 'src/components/coffee.root/coffee.root';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CardModule } from 'primeng/card';
import {DialogModule} from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import { CarouselModule } from 'primeng/carousel';
import { CoffeeRouter } from './app-routing.module';
import { PageNotFoundComponent } from 'src/components/page.not.found/page.not.found';
import { StoreModule, ActionReducer } from '@ngrx/store';
import { reducers, metaReducers } from 'src/store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { GeneralService } from './services/general.service';
import { HelloEffect } from 'src/store/hello/hello.effect';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { RouteEffect } from 'src/store/route/route.effect';
import { StartComponent } from 'src/components/start/start'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TargetsComponent } from 'src/components/targets/targets';
import { MenuComponent } from 'src/components/menu/menu.component';
import { TableModule } from 'primeng/table';
import { TargetsEffect } from 'src/store/target/target.effect';
import { AuthInterceptor } from './http.interceptor';
import { localStorageSync } from 'ngrx-store-localstorage';
import { UserEffect } from 'src/store/user/user.effect';
import { TargetDetails } from 'src/components/target.details/target.details';
import { BackButtonComponent } from 'src/components/back.button';
import {FieldsetModule} from 'primeng/fieldset';
import { DiscoverDialog } from 'src/components/targets/discover/discover';
import { SocketService } from './services/socket.service';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:8988', options: {} };
 
@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ButtonModule,
    FieldsetModule,
    CarouselModule,
    InputTextModule,
    DialogModule,
    CoffeeRouter,
    CardModule,
    TableModule,
    StoreModule.forRoot(reducers, {
      metaReducers: [...metaReducers,localStorageSyncReducer],
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    SocketIoModule.forRoot(config),
    EffectsModule.forRoot([HelloEffect, RouteEffect, UserEffect, TargetsEffect]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument()
  ],
  declarations: [
    CoffeeRoot,
    StartComponent,
    PageNotFoundComponent,
    TargetsComponent,
    TargetDetails,
    MenuComponent,
    BackButtonComponent,
    DiscoverDialog
  ],
  providers: [GeneralService,SocketService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [CoffeeRoot]
})

export class AppModule { }
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['user'],rehydrate:true})(reducer);
}