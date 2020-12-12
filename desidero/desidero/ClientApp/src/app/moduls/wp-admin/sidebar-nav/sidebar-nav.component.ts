import { AuthService } from 'src/app/core/services';
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

  private get currentUserIsAdmmin(): boolean {
    return this.authService.currentUserIsAdmmin;
  }

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    const item: MenuItem = {}
    item.queryParams
    this.items = [
      {
        label: 'USERS',
        icon: 'pi pi-fw pi-users',
        items: [
          { label: 'All users', icon: 'pi pi-fw pi-list', routerLink: 'user/list' },
        ],
        visible: this.currentUserIsAdmmin
      },
      {
        label: 'PUBLICATIONS',
        icon: 'pi pi-pw pi-file',
        items: [
          { label: 'All publications', icon: 'pi pi-fw pi-list', routerLink: 'publication/list' },
          { separator: true },
          { label: 'New publication', icon: 'pi pi-fw pi-plus', routerLink: 'publication/create' },
          { separator: true },
          {
            label: 'My publication',
            icon: 'pi pi-fw pi-search',
            routerLink: 'publication/list',
            queryParams: { userId: this.currentUser.id },
          },
        ]
      }
    ];
  }

}
