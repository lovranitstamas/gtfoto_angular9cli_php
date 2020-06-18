import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../shared/user.service';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {UserModel} from "../../shared/user-model";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  private _routerSub = Subscription.EMPTY;
  private _routerSubEnd = Subscription.EMPTY;
  private remoteUser: UserModel;

  isCollapsed = true;
  isLoggedIn = false;

  items = [
    {
      name: 'Portré fotók',
      mainMenu: 'portfolio',
      subMenu: 'portrait'
    },
    {
      name: 'Gyerek-és családi fotók',
      mainMenu: 'portfolio',
      subMenu: 'child-and-family'
    },
    {
      name: 'Kismama fotók',
      mainMenu: 'portfolio',
      subMenu: 'pregnant'
    },
    {
      name: 'Keresztelő fotók',
      mainMenu: 'portfolio',
      subMenu: 'christening'
    },
    {
      name: 'Óvodai gyerekfotók',
      mainMenu: 'portfolio',
      subMenu: 'kindergarten'
    },
    {
      name: 'Esküvői fotók',
      mainMenu: 'portfolio',
      subMenu: 'wedding'
    }
  ];

  constructor(public userService: UserService, private _router: Router) {
    this.userService.isLoggedIn$.subscribe(
      isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
      }
    );
  }

  ngOnInit() {
    this._routerSub = this._router.events.pipe(
      filter(event => event instanceof NavigationStart))
      .subscribe(() => {
        this.isCollapsed = true;
      });

    this._routerSubEnd = this._router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0);
      });
  }

  ngOnDestroy() {
    // this._routerSub.unsubscribe();
    // this._routerSubEnd.unsubscribe();
  }

  clickOnRouterLink() {
    this.userService.detectTimeoutSession().subscribe(
      (response) => {
        if (response.status_code_header === 200) {
          this.remoteUser = new UserModel();
          this.remoteUser.idFunction = response.body['user'].id;
          this.remoteUser.nameFunction = response.body['user'].name;
          this.remoteUser.emailFunction = response.body['user'].email;
          this.remoteUser.addressFunction = response.body['user'].address;
          this.remoteUser.dateOfBirthFunction = response.body['user'].dateOfBirth;
          this.remoteUser.genderFunction = response.body['user'].gender;
          this.remoteUser.profilePictureUrlFunction = response.body['user'].profilePictureUrl;
          this.remoteUser.adminFunction = response.body['user'].admin;

          this.userService.setUserToActive(this.remoteUser);
        } else {
          this.userService.setUserToInactive();
        }
      });

    this.isCollapsed = true;
    window.scrollTo(0, 0);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const target = event.target;
    if (target.innerWidth > 576) {
      this.isCollapsed = true;
    }
  }

  logout() {
    this.userService.logout().subscribe(
      (response) => {
        if (response.status_code_header === 200) {
          this.userService.setUserToInactive();
          this._router.navigate(['/home']);
        }
      });
  }

}
