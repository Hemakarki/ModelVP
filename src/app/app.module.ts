import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

import { CookieModule } from 'ngx-cookie';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

import { ActiveRouteGuard } from './auth/services/activate-route-guard';
import { DeactiveRouteGuard } from './auth/services/deactivate-route-guard';
import { ChildRouteGuard } from './auth/services/child-route-guard';

import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';
import { PaginationModule } from 'ng2-bootstrap';
// Routing Module
import { AppRoutingModule } from './app.routing';
import { HttpModule } from '@angular/http';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { FlashMessagesModule } from 'ngx-flash-messages';

import { LoginComponent } from './auth/login/login.component';
import { CustomFormsModule } from 'ng2-validation';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
// import { ChangePasswordComponent } from './change-password/view/change-password.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    CookieModule.forRoot(),

    HttpModule,
    CustomFormsModule,
    FlashMessagesModule,
    BootstrapModalModule
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    LoginComponent,
    ForgotPasswordComponent
    // ChangePasswordComponent
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    ActiveRouteGuard,
    DeactiveRouteGuard,
    ChildRouteGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
