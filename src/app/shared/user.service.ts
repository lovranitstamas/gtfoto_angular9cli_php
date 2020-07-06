import {Inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {UserModel} from './user-model';
import {Observable, ReplaySubject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn$ = new ReplaySubject<boolean>(1);
  adminStatus$ = new ReplaySubject<boolean>(1);
  private _user = new ReplaySubject<UserModel>(1);

  constructor(private _router: Router,
              private _httpClient: HttpClient,
              @Inject('API_URL') private apiUrl: string
  ) {
    this.isLoggedIn$.next(false);
  }

  login(loginObj): Observable<any> {
    return this._httpClient.post<any>(
      `${this.apiUrl}loginUser.php`, JSON.stringify(loginObj),
      {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      });
  }

  detectTimeoutSession(): Observable<any> {
    return this._httpClient.get<any>(`${this.apiUrl}detectTimeoutSession.php`);
  }

  setUserToActive(remoteUser) {
    this._user.next(remoteUser);

    if (Number(remoteUser.adminFunction) === 1) {
      this.adminStatus$.next(true);
    } else {
      this.adminStatus$.next(false);
    }
    this.isLoggedIn$.next(true);
  }

  setUserToInactive() {
    this._user.next(null);
    this.adminStatus$.next(false);
    this.isLoggedIn$.next(false);
  }

  getCurrentUser() {
    return this._user.asObservable();
  }

  logout(): Observable<any> {
    return this._httpClient.get<any>(`${this.apiUrl}logout.php`);
  }
}
