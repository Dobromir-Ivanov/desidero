import { CommonModule } from '@angular/common';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


/*
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { ToastaModule } from 'ngx-toasta';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ChartsModule } from 'ng2-charts';
*/
import { OAuthModule } from 'angular-oauth2-oidc';


import { appRouting } from './app.routing';
import { AppErrorHandler } from './app-error.handler';

import {
  AuthService,
  LocalStorage,
  AccountApiService,
  AccountService,
  MessagesService
} from './services';

import { AppComponent } from './app.component';
import {
  HomeComponent,
  LoginComponent,
  FooterComponent,
  NavbarTopComponent,
  NotFoundComponent,
  RegisterComponent
} from './components';

import { SharedModule } from './shared/shared.module';
import { appInterceptorProvider } from './core/app.interceptor';
import { PublicationModule } from './moduls/publication/publication.module';
import { AuthGuard } from './services/auth-guard.service';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    appRouting,
    SharedModule,

    PublicationModule,

    OAuthModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarTopComponent,
    LoginComponent,
    FooterComponent,
    RegisterComponent,
    NotFoundComponent
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler },
    AuthService,
    LocalStorage,
    AccountService,
    AccountApiService,
    AuthGuard,
    appInterceptorProvider,
    MessagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
