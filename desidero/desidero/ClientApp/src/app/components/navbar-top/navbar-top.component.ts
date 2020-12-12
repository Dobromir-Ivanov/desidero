import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/';

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.scss']
})
export class NavbarTopComponent implements OnInit, OnDestroy {

  publicPages: MenuItem[] = [
    {
      label: 'Home',
      routerLink: '/home',
      icon: 'pi pi-home',
    }
  ];

  privatePages: MenuItem[] = [
    {
      label: 'Account',
      icon: 'pi pi-key',
      command: () => this.authService.redirectLoginUser()
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => {
        this.logout();
      }
    }
  ]

  isLoggedIn = null;

  private loginStatusSubscription: Subscription;


  constructor(
    private authService: AuthService
  ) { }


  ngOnInit() {

    this.isLoggedIn = this.authService.isLoggedIn

    this.loginStatusSubscription = this.authService.getLoginStatusEvent().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });

  }


  ngOnDestroy(): void {
    this.loginStatusSubscription.unsubscribe();
  }


  logout() {
    this.authService.logOut();
    this.authService.redirectLogoutUser();
  }

}
