import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  imports: [RouterModule.forRoot(AppRoutingModule.routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  public static routes: Routes = [
    {
      path: '',
      redirectTo: 'user',
      pathMatch: 'full'
    },
    {
      path: 'user',
      loadChildren: () => import('./user/user.module').then((m) => m.UserModule)
    },
    // wildcard route, must be the LAST route of a router
    {
      path: '**',
      redirectTo: 'user',
      pathMatch: 'full'
    }
  ]
}