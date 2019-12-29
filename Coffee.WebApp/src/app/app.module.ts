import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoffeeRoot } from 'src/components/coffee.root/coffee.root';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { CoffeeRouter } from './app-routing.module';
import { PageNotFoundComponent } from 'src/components/page.not.found/page.not.found';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from 'src/store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { GeneralService } from './services/general.service';
import { HelloEffect } from 'src/store/hello/hello.effect';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { RouteEffect } from 'src/store/route/route.effect';
import { StartComponent } from 'src/components/start/start';
import { LoginEffect } from 'src/store/login/login.effect';
import { FormsModule } from '@angular/forms';
import { TargetsComponent } from 'src/components/targets/targets';
import { MenuComponent } from 'src/components/menu/menu.component';
@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ButtonModule,
    CarouselModule,
    CoffeeRouter,
    CardModule,
    StoreModule.forRoot(reducers, {
      metaReducers: metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),

    EffectsModule.forRoot([HelloEffect, RouteEffect, LoginEffect]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument()
  ],
  declarations: [
    CoffeeRoot,
    StartComponent,
    PageNotFoundComponent,
    TargetsComponent,
    MenuComponent
  ],
  providers: [GeneralService],
  bootstrap: [CoffeeRoot]
})

export class AppModule { }