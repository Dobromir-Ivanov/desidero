import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, CanLoad, Route } from '@angular/router';
import { Location } from '@angular/common'
import { AuthService } from '../services/auth.service';



@Injectable()
export class AdminGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private authService: AuthService, private router: Router, private location: Location) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkPermission(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    const url = `/${route.path}`;
    return this.checkPermission(url);
  }

  checkPermission(url: string): boolean {

    if (this.authService.currentUserIsAdmmin) {
      return true;
    }

    // this.location.back();
    this.router.navigateByUrl('/404')

    return false;
  }
}
