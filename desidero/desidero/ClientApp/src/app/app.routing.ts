import { NotFoundComponent } from './components/not-found/not-found.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent, LoginComponent, RegisterComponent } from './components';
import { AuthGuard } from './services/auth-guard.service';

const wpAdminModule = () => import('./moduls/wp-admin/wp-admin.module').then(m => m.WpAdminModule);

const routes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Home' } },
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  { path: 'register', component: RegisterComponent, data: { title: 'Register' } },
  { path: 'home', redirectTo: '/', pathMatch: 'full' },
  { path: 'wp-admin', loadChildren: wpAdminModule, /* canActivate: [AuthGuard] */ },
  { path: '**', component: NotFoundComponent, data: { title: 'Page Not Found' } }
];


export const appRouting = RouterModule.forRoot(routes);
