import { Routes, RouterModule } from '@angular/router';
import { PublicationModule } from '../publication/publication.module';
import { WpAdminComponent } from './wp-admin.component';

const publicationModule = () => import('../publication/publication.module').then(m => m.PublicationModule);


const routes: Routes = [
  {
    path: '',
    component: WpAdminComponent,
    children: [
      { path: 'publication', loadChildren: publicationModule },
      // { path: 'users', loadChildren: usersModule },
      // { path: '', redirectTo: 'dashboard' }
    ]
    // canActivate: [AuthGuard],
    /* children: [
      { path: '', redirectTo: 'dashboard' }
    ] */
  }
];

export const WpAdminRoutes = RouterModule.forChild(routes);
