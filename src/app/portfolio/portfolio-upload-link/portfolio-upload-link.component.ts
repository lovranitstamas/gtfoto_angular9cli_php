import {Component} from '@angular/core';
import {UserService} from '../../shared/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-portfolio-upload-link',
  templateUrl: './portfolio-upload-link.component.html',
  styleUrls: ['./portfolio-upload-link.component.scss']
})
export class PortfolioUploadLinkComponent {
  isLoggedIn: boolean;
  isAdmin: boolean;
  private _isLoggedInSubscription: Subscription;
  private _adminStatusSubscription: Subscription;

  constructor(userService: UserService) {
    this._isLoggedInSubscription = userService.isLoggedIn$.subscribe(
      isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
      }
    );
    this._adminStatusSubscription = userService.adminStatus$.subscribe(
      adminStatus => {
        this.isAdmin = adminStatus;
      }
    );
  }
}
