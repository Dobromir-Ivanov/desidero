import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Configuration } from 'src/app/config';
import { UserEdit } from 'src/app/dto';
import { AccountService, MessagesService } from 'src/app/services';
import { rePasswordValidatorFactory } from 'src/app/shared/validators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent /* implements OnInit */ {

  form: FormGroup;
  isLoading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private messagesService: MessagesService
  ) { }

  ngOnInit() {
    const passwordControl = this.formBuilder.control('', [Validators.required, Validators.minLength(5)]);

    this.form = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      newPassword: passwordControl,
      confirmPassword: ['', [Validators.required, Validators.minLength(5), rePasswordValidatorFactory(passwordControl)]]
    });
  }


  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }


  public onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) { return; }

    this.isLoading = true;

    const user: UserEdit = Object.assign(new UserEdit(), this.form.value);

    this.accountService.createUser(user)
      .pipe(first())
      .subscribe(
        () => this.router.navigateByUrl(Configuration.loginUrl),
        error => {
          this.isLoading = false;
          this.messagesService.alertError(error);
        }
      );
  }

}

