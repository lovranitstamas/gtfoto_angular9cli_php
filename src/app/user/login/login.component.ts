import {Component, HostListener} from '@angular/core';
import {UserService} from '../../shared/user.service';
import {Router} from '@angular/router';
import {UserModel} from '../../shared/user-model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

/**
 * Our custom validator
 *
 * A validator:
 * - Takes a `Control` as it's input and
 * - Returns a `StringMap<string, boolean>` where the key is "error code" and
 *   the value is `true` if it fails
 */
function emailValidator(control: FormControl): { [s: string]: boolean } {
  // tslint:disable-next-line:max-line-length
  if (!control.value.match(/^(?:(?:[\w`~!#$%^&*\-=+;:{}'|,?\/]+(?:(?:\.(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)*"|[\w`~!#$%^&*\-=+;:{}'|,?\/]+))*\.[\w`~!#$%^&*\-=+;:{}'|,?\/]+)?)|(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)+"))@(?:[a-zA-Z\d\-]+(?:\.[a-zA-Z\d\-]+)*|\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])$/gm)
  ) {
    return {invalidEmail: true};
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  serverError = false;
  serverErrorMessage: string;
  onProcess = false;
  loginForm: FormGroup;
  private remoteUser: UserModel;

  @HostListener('input')
  oninput() {
    this.onProcess = false;
  }

  constructor(private _userService: UserService,
              private _router: Router,
              fb: FormBuilder) {
    this.loginForm = fb.group({
      loginEmail: ['', Validators.compose([Validators.required, emailValidator])],
      loginPassword: ['', Validators.required]
    });
  }

  login(form) {
    this.onProcess = true;

    if (form.valid) {
      this._userService.login(form.value).subscribe(
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
          this._router.navigate(['/user']);
        }, (err) => {
          this.setError(err);
        });
    }
  }

  closeAlert() {
    this.onProcess = false;
    this.serverError = false;
  }

  setError(err) {
    this.serverError = true;
    switch (err.status) {
      case 400:
        this.serverErrorMessage = 'E-mail formátum nem megfelőle';
        break;
      case 422:
        this.serverErrorMessage = 'E-mail cím/jelszó páros nem megfelelő';
        break;
      default:
        this.serverErrorMessage = err.status;
    }
  }
}
