import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {WeddingModule, weddingRoutes as weddingChildRoutes} from './wedding/wedding.module';
import {CoreModule} from '../core/core.module';
import {FormsModule} from '@angular/forms';
import {AlertModule} from 'ngx-bootstrap/alert';

import {PortfolioDetailComponent} from './portfolio-detail/portfolio-detail.component';

import {PortraitListComponent} from './main-menu/portrait-list/portrait-list.component';
import {ChildAndFamilyListComponent} from './main-menu/child-and-family-list/child-and-family-list.component';
import {PregnantListComponent} from './main-menu/pregnant-list/pregnant-list.component';
import {ChristeningListComponent} from './main-menu/christening-list/christening-list.component';
import {KindergartenListComponent} from './main-menu/kindergarten-list/kindergarten-list.component';
import {WeddingComponent} from './wedding/wedding.component';

import {LoggedInGuard} from '../shared/logged-in.guard';

export const portfolioRoutes: Routes = [
  {
    path: '',
    children: [
      {path: 'portrait', component: PortraitListComponent},
      {path: 'child-and-family', component: ChildAndFamilyListComponent},
      {path: 'pregnant', component: PregnantListComponent},
      {path: 'christening', component: ChristeningListComponent},
      {path: 'kindergarten', component: KindergartenListComponent},
      {path: 'wedding', component: WeddingComponent, children: weddingChildRoutes},
      {path: 'new', component: PortfolioDetailComponent, canActivate: [LoggedInGuard]},
      {path: 'edit/:node/:id', component: PortfolioDetailComponent, canActivate: [LoggedInGuard]},
    ]
  }
];

@NgModule({
  declarations: [
    PortfolioDetailComponent,

    PortraitListComponent,
    ChildAndFamilyListComponent,
    PregnantListComponent,
    ChristeningListComponent,
    KindergartenListComponent,

    WeddingComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    WeddingModule,

    RouterModule,
    FormsModule,
    AlertModule.forRoot()
  ],
  exports: []
})
export class PortfolioModule {
}
