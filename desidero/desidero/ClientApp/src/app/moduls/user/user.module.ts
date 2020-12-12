import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutes } from './user.routing';

import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserApiService, UserService } from './services';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserEditComponent } from './user-edit/user-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutes,
    SharedModule,
  ],
  declarations: [
    UserDetailComponent,
    UserListComponent,
    UserEditComponent,
  ],
  providers: [
    UserService,
    UserApiService,
  ]
})
export class UserModule { }
