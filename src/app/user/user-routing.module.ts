import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';


@NgModule({
  imports: [RouterModule.forChild(UserRoutingModule.routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
  public static routes: Routes = [
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    },
    {
      path: 'home',
      component: HomeComponent,
      pathMatch: 'full'
    },
    {
      path: 'add',
      component: AddComponent,
      pathMatch: 'full'
    },
    {
      path: 'update',
      component: UpdateComponent,
      pathMatch: 'full'
    },
    {
      path: '**',
      redirectTo: '',
      pathMatch: 'full'
    }
  ]
}
