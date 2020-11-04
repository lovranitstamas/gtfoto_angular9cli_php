import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../shared/user.service';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  private _routerSub = Subscription.EMPTY;
  private _routerSubEnd = Subscription.EMPTY;
  windowScrolled: boolean;

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
      name: 'Karácsonyi fotók',
      mainMenu: 'portfolio',
      subMenu: 'christmas'
    },
    {
      name: 'Esküvői fotók',
      mainMenu: 'portfolio',
      subMenu: 'wedding'
    }
  ];

  constructor(public userService: UserService, private _router: Router, private _translateService: TranslateService) {
    this.userService.isLoggedIn$.subscribe(
      isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
      }
    );

    this._translateService.onLangChange.subscribe((newLang) => {
      switch (newLang.lang) {
        case 'en':
          this.items = [
            {
              name: 'Portrait photos',
              mainMenu: 'portfolio',
              subMenu: 'portrait'
            },
            {
              name: 'Child-and family photos',
              mainMenu: 'portfolio',
              subMenu: 'child-and-family'
            },
            {
              name: 'Pregnant photos',
              mainMenu: 'portfolio',
              subMenu: 'pregnant'
            },
            {
              name: 'Baptism photos',
              mainMenu: 'portfolio',
              subMenu: 'christening'
            },
            {
              name: 'Kindergarten photos',
              mainMenu: 'portfolio',
              subMenu: 'kindergarten'
            },
            {
              name: 'Christmas photos',
              mainMenu: 'portfolio',
              subMenu: 'christmas'
            },
            {
              name: 'Wedding',
              mainMenu: 'portfolio',
              subMenu: 'wedding'
            }];
          break;
        case 'hu':
          this.items = [
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
              name: 'Karácsonyi fotók',
              mainMenu: 'portfolio',
              subMenu: 'christmas'
            },
            {
              name: 'Esküvői fotók',
              mainMenu: 'portfolio',
              subMenu: 'wedding'
            }];
          break;
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    window.scrollY > 200 ? this.windowScrolled = true : this.windowScrolled = false;
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
    this._routerSub.unsubscribe();
    this._routerSubEnd.unsubscribe();
  }

  clickOnRouterLink() {
    this.userService.detectTimeoutSession().subscribe(
      () => {
      }, () => {
        this.userService.setUserToInactive();
      });

    this.isCollapsed = true;
    window.scrollTo(0, 0);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const target = event.target;
    if (target.innerWidth < 768) {
      this.isCollapsed = true;
    }
  }

  logout() {
    this.userService.logout().subscribe(
      () => {
        this.userService.setUserToInactive();
        this._router.navigate(['/home']);
      }, (err) => {
        console.warn(err);
      });
  }

}
