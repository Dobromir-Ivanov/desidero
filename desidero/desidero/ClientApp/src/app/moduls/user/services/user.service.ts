import { Injectable } from '@angular/core';
import { Role, User } from '../../../dto';
import { UserApiService } from './user.api.service';
import { of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

@Injectable()
export class UserService {

  constructor(
    private userApiService: UserApiService
  ) { }


  getUsers(page?: number, pageSize?: number) {
    return this.userApiService.getUsers<User[]>(page, pageSize);
  }


  getUserById(userId?: string) {
    return this.userApiService.getUserById<User>(userId);
  }


  updateUser(user: User) {
    return this.userApiService.updateUser(user, user.id);
  }


  deleteUser(user: User) {
    const { id } = user;
    if (!id) {
      throw new Error("Property user id not is empty.");
    }

    return of(confirm('Are you sure you want to delete the user?')).pipe(
      filter(isConfirm => !!isConfirm),
      switchMap(() => this.userApiService.deleteUser<User>(id))
    )
  }


  getRoles(page?: number, pageSize?: number) {
    return this.userApiService.getRoles<Role[]>(page, pageSize);
  }

}
