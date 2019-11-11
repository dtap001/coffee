import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoffeeRoot } from 'src/components/coffee.root/coffee.root';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CardModule } from 'primeng/card';

import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { CoffeeRouter } from './app-routing.module';
import { LoginComponent } from 'src/components/login/login';
import { PageNotFoundComponent } from 'src/components/page.not.found/page.not.found';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from 'src/store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { GeneralService } from './services/general.service';
import { HelloEffect } from 'src/store/hello/hello.effect';
import { HttpClientModule } from '@angular/common/http'; 
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ButtonModule,
    CarouselModule,
    CoffeeRouter,
    CardModule,
    StoreModule.forRoot(reducers, {
      metaReducers:metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([HelloEffect]),
    StoreDevtoolsModule
  ],
  declarations: [
    CoffeeRoot,
    LoginComponent,
    PageNotFoundComponent
  ],
  providers: [GeneralService],
  bootstrap: [CoffeeRoot]
})
export class AppModule { }
