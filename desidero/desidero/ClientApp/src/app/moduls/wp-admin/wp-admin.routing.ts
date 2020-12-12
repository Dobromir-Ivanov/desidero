import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/services';
import { WpAdminComponent } from './wp-admin.component';

const publicationModule = () => import('../publication/publication.module').then(m => m.PublicationModule);


const routes: Routes = [
  {
    path: '',
    component: WpAdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'publication', loadChildren: publicationModule },
      // { path: 'users', loadChildren: usersModule },
      // { path: '', redirectTo: 'dashboard' }
    ]
  }
];

export const WpAdminRoutes = RouterModule.forChild(routes);
