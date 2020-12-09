import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Configuration } from './../config/index';

import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { DBkeys } from '../core/db-keys';

import { LocalStorage } from './local-storage.service';
import { AccountService } from './account.service';
import { JwtHelper } from '../helpers/jwt-helper';

import {
  AccessToken,
  LoginResponse,
  PermissionValues,
  User, UserLogin
} from '../dto';
import { Utilities } from '../utilities';




@Injectable()
export class AuthService {

  public get loginUrl() { return Configuration.loginUrl; }
  public get homeUrl() { return Configuration.homeUrl; }
  public get userUrl() { return Configuration.userUrl; }

  public loginRedirectUrl: string;

  private previousIsLoggedInCheck = false;
  private loginStatus = new Subject<boolean>();



  constructor(
    private router: Router,
    private localStorage: LocalStorage,
    private accountService: AccountService
  ) { }


  logOut() {
    this.localStorage.deleteData(DBkeys.ACCESS_TOKEN);
    this.localStorage.deleteData(DBkeys.REFRESH_TOKEN);
    this.localStorage.deleteData(DBkeys.TOKEN_EXPIRES_IN);
    this.localStorage.deleteData(DBkeys.USER_PERMISSIONS);
    this.localStorage.deleteData(DBkeys.CURRENT_USER);

    this.reevaluateLoginStatus();
  }


  logIn(userLogin: UserLogin): Observable<User> {
    const { userName, password, rememberMe } = userLogin;

    if (this.isLoggedIn) {
      this.logOut();
    }

    return this.accountService.loginWithPassword(userName, password)
      .pipe(map(resp => this.processLoginResponse(resp, rememberMe)));
  }

  redirectLoginUser() {
    this.router.navigateByUrl(this.userUrl);
  }


  redirectLogoutUser() {
    this.router.navigateByUrl(this.homeUrl);
  }

  getLoginStatusEvent(): Observable<boolean> {
    return this.loginStatus.asObservable();
  }


  get currentUser(): User {
    const user = this.localStorage.getDataObject<User>(DBkeys.CURRENT_USER);
    this.reevaluateLoginStatus(user);

    return user;
  }


  get isLoggedIn(): boolean {
    return this.currentUser != null;
  }

  get isSessionExpired(): boolean {
    if (this.accessTokenExpiryDate == null) {
      return true;
    }

    return this.accessTokenExpiryDate.valueOf() <= new Date().valueOf();
  }



  /*************************************
   *        PRIVATE METHODS
   ************************************/

  get accessTokenExpiryDate(): Date {
    return this.localStorage.getDataObject<Date>(DBkeys.TOKEN_EXPIRES_IN, true);
  }



  private reevaluateLoginStatus(currentUser?: User) {
    const user = currentUser || this.localStorage.getDataObject<User>(DBkeys.CURRENT_USER);
    const isLoggedIn = user != null;

    if (this.previousIsLoggedInCheck !== isLoggedIn) {
      setTimeout(() => {
        this.loginStatus.next(isLoggedIn);
      });
    }

    this.previousIsLoggedInCheck = isLoggedIn;
  }


  private processLoginResponse(response: LoginResponse, rememberMe?: boolean) {
    const accessToken = response.access_token;

    if (accessToken == null) {
      throw new Error('accessToken cannot be null');
    }

    rememberMe = rememberMe || this.rememberMe;

    const refreshToken = response.refresh_token || this.refreshToken;
    const expiresIn = response.expires_in;
    const tokenExpiryDate = new Date();
    tokenExpiryDate.setSeconds(tokenExpiryDate.getSeconds() + expiresIn);
    const accessTokenExpiry = tokenExpiryDate;

    const jwtHelper = new JwtHelper();
    const decodedAccessToken = jwtHelper.decodeToken(accessToken) as AccessToken;

    const permissions: PermissionValues[] = Array.isArray(decodedAccessToken.permission)
      ? decodedAccessToken.permission
      : [decodedAccessToken.permission];


    const user = new User(
      decodedAccessToken.sub,
      decodedAccessToken.name,
      decodedAccessToken.fullname,
      decodedAccessToken.email,
      decodedAccessToken.jobtitle,
      decodedAccessToken.phone_number,
      Array.isArray(decodedAccessToken.role) ? decodedAccessToken.role : [decodedAccessToken.role]
    );

    user.isEnabled = true;

    this.saveUserDetails(user, permissions, accessToken, refreshToken, accessTokenExpiry, rememberMe);

    this.reevaluateLoginStatus(user);

    return user;
  }

  private saveUserDetails(user: User, permissions: PermissionValues[], accessToken: string, refreshToken: string, expiresIn: Date, rememberMe: boolean) {
    if (rememberMe) {
      this.localStorage.savePermanentData(accessToken, DBkeys.ACCESS_TOKEN);
      this.localStorage.savePermanentData(refreshToken, DBkeys.REFRESH_TOKEN);
      this.localStorage.savePermanentData(expiresIn, DBkeys.TOKEN_EXPIRES_IN);
      this.localStorage.savePermanentData(permissions, DBkeys.USER_PERMISSIONS);
      this.localStorage.savePermanentData(user, DBkeys.CURRENT_USER);
    } else {
      this.localStorage.saveSyncedSessionData(accessToken, DBkeys.ACCESS_TOKEN);
      this.localStorage.saveSyncedSessionData(refreshToken, DBkeys.REFRESH_TOKEN);
      this.localStorage.saveSyncedSessionData(expiresIn, DBkeys.TOKEN_EXPIRES_IN);
      this.localStorage.saveSyncedSessionData(permissions, DBkeys.USER_PERMISSIONS);
      this.localStorage.saveSyncedSessionData(user, DBkeys.CURRENT_USER);
    }

    this.localStorage.savePermanentData(rememberMe, DBkeys.REMEMBER_ME);
  }

  get rememberMe(): boolean {
    return this.localStorage.getDataObject<boolean>(DBkeys.REMEMBER_ME) === true;
  }

  get refreshToken(): string {
    return this.localStorage.getData(DBkeys.REFRESH_TOKEN);
  }

  get accessToken(): string {
    return this.localStorage.getData(DBkeys.ACCESS_TOKEN);
  }

}
