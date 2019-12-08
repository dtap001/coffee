import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from 'src/components/page.not.found/page.not.found';
import { StartComponent } from 'src/components/start/start';

export class ROUTE_PATHS {
  public static ROOT = "";
  public static USERS = "users/";
  public static USER_DETAIL = ROUTE_PATHS.USERS + "detail";
  public static TARGETS = "targets/";
  public static TARGETS_DETAIL = ROUTE_PATHS.TARGETS + "details";
}
const routes: Routes = [
  { path: ROUTE_PATHS.ROOT, component: StartComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class CoffeeRouter { }