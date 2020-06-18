import {Component} from '@angular/core';
import {UserService} from './shared/user.service';
import {UserModel} from './shared/user-model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gtfotoangularphp9';
  private remoteUser: UserModel;

  constructor(private _userService: UserService,
              private _router: Router,
  ) {
    this._userService.detectTimeoutSession().subscribe(
      (response) => {
        if (response.status_code_header === 200) {
          this.remoteUser = new UserModel();
          this.remoteUser.idFunction = response.body.user.id;
          this.remoteUser.nameFunction = response.body.user.name;
          this.remoteUser.emailFunction = response.body.user.email;
          this.remoteUser.addressFunction = response.body.user.address;
          this.remoteUser.dateOfBirthFunction = response.body.user.dateOfBirth;
          this.remoteUser.genderFunction = response.body.user.gender;
          this.remoteUser.profilePictureUrlFunction = response.body.user.profilePictureUrl;
          this.remoteUser.adminFunction = response.body.user.admin;

          this._userService.setUserToActive(this.remoteUser);
          // this._router.navigate(['/user']);
        } else {
          this._userService.setUserToInactive();
        }
      });
  }
}
