import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {PortfolioModule} from './portfolio/portfolio.module';
import {CoreModule} from './core/core.module';
import {AppRoutingModule} from './app-routing.module';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations'; // menu
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AlertModule} from 'ngx-bootstrap/alert';
import {CarouselModule} from 'ngx-bootstrap/carousel';

import {ContactFormComponent} from './contact/contact-form/contact-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoggedInGuard} from './shared/logged-in.guard';

import {UserService} from './shared/user.service';
import {PortfolioService} from './shared/portfolio.service';
import {ContactService} from './shared/contact.service';
import {ImpressComponent} from './impress/impress.component';
import {HttpsInterceptor} from './interceptor/https.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ...AppRoutingModule.routableComponents,
    ContactFormComponent,
    ImpressComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    PortfolioModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule.forRoot(),
    CarouselModule.forRoot()
  ],
  providers: [
    UserService,
    PortfolioService,
    ContactService,
    LoggedInGuard,
    // {provide: 'API_URL', useValue: 'http://localhost/gtfoto_angular_php/api/'}
    // {provide: 'BASE_URL', useValue: './'};
    {provide: 'API_URL', useValue: './api/'},
    {provide: HTTP_INTERCEPTORS, useClass: HttpsInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
