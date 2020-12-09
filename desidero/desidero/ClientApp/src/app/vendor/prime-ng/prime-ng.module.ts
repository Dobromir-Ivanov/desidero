import { NgModule } from '@angular/core';

import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { PanelMenuModule } from 'primeng/panelmenu';



@NgModule({
  exports: [
    MenubarModule,
    ButtonModule,
    SidebarModule,
    InputTextModule,
    MenuModule,
    DialogModule,
    MessagesModule,
    MessageModule,
    CardModule,
    PanelMenuModule,
  ]
})
export class PrimeNgModule { }
