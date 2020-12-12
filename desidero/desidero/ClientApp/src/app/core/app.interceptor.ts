import { Injectable, Provider } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Configuration } from '../config';
import { USE_BASE_URL } from 'src/app/constants';
import { AuthService } from './services';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  apiUrl = Configuration.apiUrl;
  baseUrl = Configuration.baseUrl;

  constructor(
    private authService: AuthService,
    private oauthService: OAuthService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const withoutApiUrl = req.url.includes(USE_BASE_URL);
    const withoutTokenEndpoint = req.url.includes(this.oauthService.tokenEndpoint);


    if (withoutTokenEndpoint) {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });
    }

    if (!withoutTokenEndpoint) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.authService.accessToken,
          'Content-Type': 'application/json',
          Accept: 'application/json, text/plain, */*'
        }
      });
    }



    if (withoutApiUrl) {
      req = req.clone({ url: `${this.baseUrl}${req.url.replace(`${USE_BASE_URL}/`, '')}` });
    }

    if (!withoutApiUrl && !req.url.includes('http')) {
      req = req.clone({ url: `${this.apiUrl}${req.url}`, withCredentials: true });
    }


    return next.handle(req);
  }
}

export const appInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AppInterceptor,
  multi: true
};
