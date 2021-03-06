import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './guards';


import {
  AuthService,
  LocalStorage,
  AccountApiService,
  AccountService,
  MessagesService
} from './services';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthGuard,
    MessagesService,
    AuthService,
    LocalStorage,
    AccountService,
    AccountApiService,
  ]
})
export class CoreModule { }
