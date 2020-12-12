import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { Role, User } from 'src/app/dto';
import { Configuration } from 'src/app/config';
import { UserService } from '../services';
import { MessagesService } from 'src/app/core/services';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  form: FormGroup;

  user: User;

  roles: Role[];

  submitted: boolean;

  isLoading: boolean;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private messagesService: MessagesService
  ) { }


  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }


  ngOnInit() {
    const userId = this.activatedRoute.snapshot.params.id;
    const user$ = this.userService.getUserById(userId);

    const roles$ = this.userService.getRoles();

    forkJoin([user$, roles$]).subscribe(
      ([user, roles]) => {
        this.user = user;
        this.roles = roles;

        this.buildUserForm();
      }
    )
  }


  onSubmit(): void {

    this.submitted = true;

    if (this.form.invalid) {
      return null;
    }

    const user: User = Object.assign(new User(), this.form.value);
    user.id = this.user.id;
    user.roles = [this.f.roles.value];

    this.userService.updateUser(user).subscribe(
      (user: User) => this.router.navigateByUrl(Configuration.usersListUrl),
      (error) => this.messagesService.alertError(error)
    )
  }


  private buildUserForm(): void {

    this.form = this.formBuilder.group({
      userName: [this.user.userName, Validators.required],
      fullName: [this.user.fullName],
      email: [this.user.email],
      jobTitle: [this.user.jobTitle],
      phoneNumber: [this.user.phoneNumber],
      isEnabled: [this.user.isEnabled],
      isLockedOut: [this.user.isLockedOut],
      roles: [this.userRole.name, Validators.required],
    })
  }

  private get userRole(): Role {
    return this.roles.find(role => role.name === this.user.roles[0]);
  }

}
