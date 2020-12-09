import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth-guard.service';
import { PublicationDetailComponent } from './publication-detail/publication-detail.component';
import { PublicationListComponent } from './publication-list/publication-list.component';

const routes: Routes = [
  { path: 'detail/:id', component: PublicationDetailComponent },
  { path: 'list', component: PublicationListComponent },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  },
];

export const PublicationRoutes = RouterModule.forChild(routes);
