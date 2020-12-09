import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WpAdminComponent } from './wp-admin.component';
import { WpAdminRoutes } from './wp-admin.routing';
import { SidebarNavComponent } from './sidebar-nav/sidebar-nav.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    WpAdminRoutes,
    SharedModule,
  ],
  declarations: [
    WpAdminComponent,
    SidebarNavComponent,
  ]
})
export class WpAdminModule { }
