import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from 'src/components/page.not.found/page.not.found';
import { StartComponent } from 'src/components/start/start';
import { TargetsComponent } from 'src/components/targets/targets';
import { TargetDetails } from 'src/components/target.details/target.details';
import { COFFEE_APP_PATHS } from './paths';
import { SettingsComponent } from 'src/components/settings/settings';

const routes: Routes = [
  { path: COFFEE_APP_PATHS.ROOT, component: StartComponent },
  { path: COFFEE_APP_PATHS.TARGETS, component: TargetsComponent },
  { path: COFFEE_APP_PATHS.TARGETS_DETAIL, component: TargetDetails },
  { path: COFFEE_APP_PATHS.SETTINGS, component: SettingsComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class CoffeeRouter { }