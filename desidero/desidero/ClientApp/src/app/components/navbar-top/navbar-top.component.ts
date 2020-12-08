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

  items: MenuItem[];

  userMenu: MenuItem[];

  isLoggedIn = false;

  private loginStatusSubscription: Subscription;


  constructor(
    private authService: AuthService
  ) { }


  ngOnInit() {


    this.loginStatusSubscription = this.authService.getLoginStatusEvent().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });

    this.items = [
      {
        label: 'Home',
        routerLink: 'home',
        icon: 'pi pi-home',
      }
    ];
  }


  ngOnDestroy(): void {
    this.loginStatusSubscription.unsubscribe();
  }


  logout() {
    this.authService.logOut();
    this.authService.redirectLogoutUser();
  }

}
