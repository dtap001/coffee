import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from 'src/components/page.not.found/page.not.found';
import { StartComponent } from 'src/components/start/start';
import { TargetsComponent } from 'src/components/targets/targets';

export class COFFEE_APP_PATHS {
  public static ROOT = "";
  public static USERS = "users";
  public static USER_DETAIL = COFFEE_APP_PATHS.USERS + "/detail";
  public static TARGETS = "targets";
  public static TARGETS_DETAIL = COFFEE_APP_PATHS.TARGETS + "/details";
}
const routes: Routes = [
  { path: COFFEE_APP_PATHS.ROOT, component: StartComponent },
  { path: COFFEE_APP_PATHS.TARGETS, component: TargetsComponent },
  { path: '**', component: PageNotFoundComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class CoffeeRouter { }