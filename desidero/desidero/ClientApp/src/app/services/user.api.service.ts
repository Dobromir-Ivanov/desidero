import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../dto';

@Injectable()
export class UserApiService {

  private get usersUrl() { return '/account/users'; }
  private get userByUserNameUrl() { return '/account/users/username'; }
  private get currentUserUrl() { return '/account/users/me'; }
  private get currentUserPreferencesUrl() { return '/account/users/me/preferences'; }
  private get unblockUserUrl() { return '/account/users/unblock'; }
  private get rolesUrl() { return '/account/roles'; }
  private get roleByRoleNameUrl() { return '/account/roles/name'; }
  private get permissionsUrl() { return '/account/permissions'; }

  constructor(
    private http: HttpClient
  ) { }


  getUsers<T>(page: number, pageSize: number): Observable<T> {
    return this.http.get<T>(this.usersUrl);
  }


  getUserById<T>(userId?: string) {
    const url = userId ? `${this.usersUrl}/${userId}` : this.currentUserUrl;
    return this.http.get<T>(url);
  }


  updateUser<T>(user: User, userId: string) {
    const url = userId ? `${this.usersUrl}/${userId}` : this.currentUserUrl;

    return this.http.put<T>(url, user)
  }


  deleteUser<T>(userId: string): Observable<T> {
    const url = `${this.usersUrl}/${userId}`;

    return this.http.delete<T>(url);
  }


  getRole<T>(roleId: string): Observable<T> {
    const url = `${this.rolesUrl}/${roleId}`;

    return this.http.get<T>(url);
  }


  getRoles<T>(page?: number, pageSize?: number): Observable<T> {
    const url = page && pageSize ? `${this.rolesUrl}/${page}/${pageSize}` : this.rolesUrl;

    return this.http.get<T>(url);
  }


}
