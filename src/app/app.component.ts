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
  }
}
