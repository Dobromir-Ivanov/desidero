import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { User } from 'src/app/dto';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.css']
})
export class SidebarNavComponent implements OnInit {

  items: MenuItem[];

  private get currentUser(): User {
    return this.authService.currentUser;
  }

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    const item: MenuItem = {}
    item.queryParams
    this.items = [
      {
        label: 'Publications',
        icon: 'pi pi-pw pi-file',
        items: [
          { label: 'All', icon: 'pi pi-fw pi-bars', routerLink: 'publication/list' },
          { separator: true },
          { label: 'New', icon: 'pi pi-fw pi-plus', routerLink: 'publication/create' },
          { separator: true },
          {
            label: 'My publication',
            icon: 'pi pi-fw pi-search',
            routerLink: 'publication/list',
            queryParams: { userId: this.currentUser.id },
            // queryParamsHandling: "merge"

          },
        ]
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          { label: 'Delete', icon: 'pi pi-fw pi-trash' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      },
      {
        label: 'Help',
        icon: 'pi pi-fw pi-question',
        items: [
          {
            label: 'Contents',
            icon: 'pi pi-pi pi-bars'
          },
          {
            label: 'Search',
            icon: 'pi pi-pi pi-search',
            items: [
              {
                label: 'Text',
                items: [
                  {
                    label: 'Workspace'
                  }
                ]
              },
              {
                label: 'User',
                icon: 'pi pi-fw pi-file',
              }
            ]
          }
        ]
      },
      {
        label: 'Actions',
        icon: 'pi pi-fw pi-cog',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
              { label: 'Save', icon: 'pi pi-fw pi-save' },
              { label: 'Update', icon: 'pi pi-fw pi-save' },
            ]
          },
          {
            label: 'Other',
            icon: 'pi pi-fw pi-tags',
            items: [
              { label: 'Delete', icon: 'pi pi-fw pi-minus' }
            ]
          }
        ]
      }
    ];
  }

}
