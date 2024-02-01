import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';


@NgModule({
  declarations: [
    HomeComponent,
    AddComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
