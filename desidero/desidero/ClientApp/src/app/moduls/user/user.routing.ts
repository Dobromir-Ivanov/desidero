import { UserEditComponent } from './user-edit/user-edit.component';
import { Routes, RouterModule } from '@angular/router';

// import {  } from 'src/app/core/guards';

import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';


const routes: Routes = [
  { path: 'list', component: UserListComponent },
  { path: 'edit/:id', component: UserEditComponent },
  { path: 'detail/:id', component: UserDetailComponent },
];

export const UserRoutes = RouterModule.forChild(routes);
