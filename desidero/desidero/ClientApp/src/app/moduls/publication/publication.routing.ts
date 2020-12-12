import { PublicationCreateComponent } from './publication-create/publication-create.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards';
import { PublicationDetailComponent } from './publication-detail/publication-detail.component';
import { PublicationListComponent } from './publication-list/publication-list.component';

const routes: Routes = [
  { path: 'list', component: PublicationListComponent },
  { path: 'detail/:id', component: PublicationDetailComponent, canActivate: [AuthGuard] },
  { path: 'create', component: PublicationCreateComponent, canActivate: [AuthGuard] },
];

export const PublicationRoutes = RouterModule.forChild(routes);
