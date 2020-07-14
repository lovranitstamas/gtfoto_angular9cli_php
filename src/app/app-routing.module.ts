import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {MyserviceComponent} from './myservice/myservice.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {PageNotFoundComponent} from './core/page-not-found/page-not-found.component';
import {ProfileComponent} from './user/profile/profile.component';
// import {ProfileEditComponent} from './user/profile-edit/profile-edit.component';
import {LoginComponent} from './user/login/login.component';
import {LoggedInGuard} from './shared/logged-in.guard';
import {ImpressComponent} from './impress/impress.component';

import {portfolioRoutes} from './portfolio/portfolio.module';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'portfolio', children: portfolioRoutes},
  {path: 'myservice', component: MyserviceComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'impress', component: ImpressComponent},
  {
    path: 'user',
    children: [
      {path: '', component: ProfileComponent, canActivate: [LoggedInGuard]},
      // {path: 'edit', component: ProfileEditComponent, canActivate: [LoggedInGuard]},
      {path: 'login', component: LoginComponent},
      // {path: 'registration', component: ProfileEditComponent}
    ]
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static routableComponents = [
    HomeComponent,
    MyserviceComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    ProfileComponent,
    // ProfileEditComponent,
    PageNotFoundComponent
  ];
}
