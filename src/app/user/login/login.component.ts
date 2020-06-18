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
  loginAuthInfo: boolean;
  messageToWebmaster: boolean;
  onProcess = false;
  loginForm: FormGroup;
  loginPassword: any;
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

    this.loginPassword = this.loginForm.controls['loginPassword'];
  }

  login(form) {
    this.onProcess = true;
    this.loginAuthInfo = false;
    this.messageToWebmaster = false;

    if (form.valid) {
      this._userService.login(form.value).subscribe(
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

            this._userService.setUserToActive(this.remoteUser);
            this._router.navigate(['/user']);
          } else {
            switch (response.status_code_header) {
              case 404:
                this.messageToWebmaster = true;
                break;
              default:
                this.loginAuthInfo = true;
            }
            console.log(response.status_code_header);
          }
        });
    }
  }

  closeAlert() {
    this.onProcess = false;
    this.loginAuthInfo = false;
    this.messageToWebmaster = false;
  }
}
