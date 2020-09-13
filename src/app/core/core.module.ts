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
