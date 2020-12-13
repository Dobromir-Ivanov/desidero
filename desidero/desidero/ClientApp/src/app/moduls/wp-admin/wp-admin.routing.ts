import { Routes, RouterModule } from '@angular/router';
import { AdminGuard, AuthGuard } from 'src/app/core/guards';

import { WpAdminComponent } from './wp-admin.component';

const publicationModule = () => import('../publication/publication.module').then(m => m.PublicationModule);
const usersModule = () => import('../user/user.module').then(m => m.UserModule);

const routes: Routes = [
  {
    path: '',
    component: WpAdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'publication', loadChildren: publicationModule },
      { path: 'user', loadChildren: usersModule, canActivate: [AuthGuard, AdminGuard] },
    ]
  }
];

export const WpAdminRoutes = RouterModule.forChild(routes);
