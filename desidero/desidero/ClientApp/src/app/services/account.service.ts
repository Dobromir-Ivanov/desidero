import { AccountApiService } from './account.api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse, User, UserEdit } from '../dto';

@Injectable()
export class AccountService {

  constructor(
    private accountApiService: AccountApiService
  ) { }



  loginWithPassword(userName: string, password: string): Observable<LoginResponse> {
    return this.accountApiService.loginWithPassword(userName, password);
  }


  createUser(user: UserEdit): Observable<User> {
    return this.accountApiService.createUser(user);
  }

}
