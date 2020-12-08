import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { mergeMap } from 'rxjs/operators';
import { LoginResponse } from '../dto';
import { Configuration } from '../config';


@Injectable()
export class AccountApiService {

  private get baseUrl() { return Configuration.baseUrl; }

  private get usersUrl() { return '/account/users'; }


  private clientId = 'quickapp_spa';
  private scope = 'openid email phone profile offline_access roles quickapp_api';


  constructor(
    private http: HttpClient,
    private oauthService: OAuthService,
  ) { }


  loginWithPassword(userName: string, password: string): Observable<LoginResponse> {

    // const header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const params = new HttpParams()
      .append('username', userName)
      .append('password', password)
      .append('grant_type', 'password')
      .append('client_id', this.clientId)
      .append('scope', this.scope);

    this.oauthService.issuer = this.baseUrl;

    return from(this.oauthService.loadDiscoveryDocument())
      .pipe(mergeMap(() => {
        return this.http.post<LoginResponse>(this.oauthService.tokenEndpoint, params, /* { headers: header } */);
      }));
  }


  createUser<T>(user: T): Observable<T> {
    return this.http.post<T>(this.usersUrl, JSON.stringify(user));
  }


}
