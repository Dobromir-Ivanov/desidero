import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLogin } from 'src/app/dto';
import { AuthService, MessagesService } from 'src/app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  isLoading = false;
  submitted = false;

  loginStatusSubscription: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messagesService: MessagesService
  ) { }


  ngOnInit() {
    this.form = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [/* this.authService.rememberMe || '' */]
    });

    if (this.getShouldRedirect()) {
      this.authService.redirectLoginUser();
    } else {
      this.loginStatusSubscription = this.authService.getLoginStatusEvent().subscribe(isLoggedIn => {
        if (this.getShouldRedirect()) {
          this.authService.redirectLoginUser();
        }
      });
    }
  }


  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }


  ngOnDestroy() {
    if (this.loginStatusSubscription) {
      this.loginStatusSubscription.unsubscribe();
    }
  }


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) { return; }

    this.isLoading = true;

    const userLogin = Object.assign(new UserLogin(), this.form.value);

    this.authService.logIn(userLogin).subscribe(
      (user) => { },
      (error) => this.messagesService.alertError(error),
      () => this.isLoading = false
    );
  }


  private getShouldRedirect() {
    return this.authService.isLoggedIn && !this.authService.isSessionExpired;
  }
}

