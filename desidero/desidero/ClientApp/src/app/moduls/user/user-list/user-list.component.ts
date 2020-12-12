import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/dto';
import { Configuration } from 'src/app/config';

import { MessagesService } from 'src/app/core/services';
import { UserService } from '../services';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  usersList$: Observable<User[]>;

  get userEditUrl(): string {
    return Configuration.userEditUrl;
  }

  get userDetailUrl(): string {
    return Configuration.userDetailUrl;
  }

  constructor(
    private userService: UserService,
    private messagesService: MessagesService,
  ) { }


  ngOnInit() {
    this.usersList$ = this.userService.getUsers();
  }


  onDeleteHandler(item: User): void {

    this.userService.deleteUser(item).subscribe(
      () => this.ngOnInit(),
      (error) => this.messagesService.alertError(error)
    )
  }

}
