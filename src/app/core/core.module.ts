import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';
import {MenuIndicatorComponent} from './menu-indicator/menu-indicator.component';
import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import {ScrollTopComponent} from './scroll-top/scroll-top.component';
import {CollapseModule} from 'ngx-bootstrap/collapse';
// import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    MenuIndicatorComponent,
    LoadingSpinnerComponent,
    ScrollTopComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CollapseModule.forRoot(),
    NgbModule,
    TranslateModule
    // BsDropdownModule.forRoot()
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    MenuIndicatorComponent,
    LoadingSpinnerComponent,
    ScrollTopComponent
  ]
})
export class CoreModule {
}
