import {Component} from '@angular/core';
import {UserService} from './shared/user.service';
import {UserModel} from './shared/user-model';
import {Router} from '@angular/router';
import {TestService} from './test.service';
import {TranslateService} from '@ngx-translate/core';
import {LangService} from './shared/lang.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Gt fotó';
  private remoteUser: UserModel;
  currentLang = 'hu';

  constructor(private _userService: UserService,
              private _router: Router,
              private readonly testService: TestService,
              private _translateService: TranslateService,
              private _langService: LangService
  ) {
    testService.sayHello();
    this._userService.detectTimeoutSession().subscribe(
      (response: any) => {

        this.remoteUser = new UserModel();
        this.remoteUser.idFunction = response.id;
        this.remoteUser.nameFunction = response.name;
        this.remoteUser.emailFunction = response.email;
        this.remoteUser.addressFunction = response.address;
        this.remoteUser.dateOfBirthFunction = response.dateOfBirth;
        this.remoteUser.genderFunction = response.gender;
        this.remoteUser.profilePictureUrlFunction = response.profilePictureUrl;
        this.remoteUser.adminFunction = response.admin;

        this._userService.setUserToActive(this.remoteUser);
        // this._router.navigate(['/user']);
      }, () => {
        this._userService.setUserToInactive();
      });

    this._translateService.onLangChange.subscribe((newLang) => {
      this._langService.setLanguage(newLang.lang);
      this.currentLang = newLang.lang;
    });
  }

  selectLang(lang: string, $event: MouseEvent) {
    $event.stopPropagation();
    $event.preventDefault();

    this._translateService.use(lang);

  }
}
