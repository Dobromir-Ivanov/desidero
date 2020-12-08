import { Component, OnInit, OnDestroy, Input } from '@angular/core';
/*
import { AlertService, MessageSeverity, DialogType } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { ConfigurationService } from '../../services/configuration.service';
import { Utilities } from '../../services/utilities';
import { UserLogin } from '../../models/user-login.model';
*/
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLogin } from 'src/app/dto';
import { AuthService } from 'src/app/services';

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
    /*
     private alertService: AlertService,

     private configurations: ConfigurationService,
     */
  ) {
    // this.alertService.showMessage('Login', `Welcome !`, MessageSeverity.success);

  }


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


  getShouldRedirect() {
    return this.authService.isLoggedIn && !this.authService.isSessionExpired;
  }


  showErrorAlert(caption: string, message: string) {
    // this.alertService.showMessage(caption, message, MessageSeverity.error);
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) { return; }

    this.isLoading = true;

    const userLogin = Object.assign(new UserLogin(), this.form.value);

    this.authService.logIn(userLogin).subscribe(
      user => {
        this.isLoading = false;
        this.reset();
      },
      error => {
        /*
        if (Utilities.checkNoNetwork(error)) {
          this.alertService.showStickyMessage(Utilities.noNetworkMessageCaption, Utilities.noNetworkMessageDetail, MessageSeverity.error, error);
          this.offerAlternateHost();
        } else {
          const errorMessage = Utilities.getHttpResponseMessage(error);

          if (errorMessage) {
            this.alertService.showStickyMessage('Unable to login', this.mapLoginErrorMessage(errorMessage), MessageSeverity.error, error);
          } else {
            this.alertService.showStickyMessage('Unable to login', 'An error occured whilst logging in, please try again later.\nError: ' + Utilities.getResponseBody(error), MessageSeverity.error, error);
          }
        }

        setTimeout(() => {
          this.isLoading = false;
        }, 500);
        */
      });
  }


  offerAlternateHost() {

    /* if (Utilities.checkIsLocalHost(location.origin) && Utilities.checkIsLocalHost(this.configurations.baseUrl)) {
      this.alertService.showDialog('Dear Developer!\nIt appears your backend Web API service is not running...\n' +
        'Would you want to temporarily switch to the online Demo API below?(Or specify another)',
        DialogType.prompt,
        (value: string) => {
          this.configurations.baseUrl = value;
          this.configurations.tokenUrl = value;
          this.alertService.showStickyMessage('API Changed!', 'The target Web API has been changed to: ' + value, MessageSeverity.warn);
        },
        null,
        null,
        null,
        this.configurations.fallbackBaseUrl);
    } */
  }


  mapLoginErrorMessage(error: string) {

    if (error === 'invalid_username_or_password') {
      return 'Invalid username or password';
    }

    if (error === 'invalid_grant') {
      return 'This account has been disabled';
    }

    return error;
  }


  reset() {
    this.form.reset();
  }
}

