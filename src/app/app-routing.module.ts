import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DemoComponent} from './demo/demo.component';
import {AuthGuardService} from './auth-guard.service';

const routes: Routes = [
  {path: 'demos', component: DemoComponent, canActivate: [AuthGuardService]}
];


@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forRoot(routes)],
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
