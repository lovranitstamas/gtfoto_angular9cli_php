import {Inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {UserModel} from './user-model';
import {Observable, ReplaySubject, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';

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

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  login(loginObj): Observable<UserModel> {
    return this._httpClient.post(
      `${this.apiUrl}loginUser`, {data: loginObj})
      .pipe(map((res) => {
          return res['data'];
        }),
        catchError(this.handleError));
  }

  detectTimeoutSession(): Observable<UserModel> {
    return this._httpClient.get(`${this.apiUrl}detectTimeoutSession`)
      .pipe(map((res) => {
          return res['data'];
        }),
        catchError(this.handleError));
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

  logout() {
    return this._httpClient.get<any>(`${this.apiUrl}logout`).pipe(
      catchError(this.handleError)
    );
  }
}
