import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private _httpClient: HttpClient, @Inject('API_URL') private apiUrl: string) {
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  sendMessage(message): Observable<any> {
    // sendMessage(senderParam: string, emailParam: string, subjectParam: string, messageParam: string) {
    /*return this._http.post(`${environment.firebase.baseUrl}/contactMessages.json`,
      Object.assign({}, {sender: senderParam, email: emailParam, subject: subjectParam, message: messageParam})
    ).pipe(
      map((fbPostReturn: { name: string }) => fbPostReturn.name)).pipe(
      switchMap(fbId => this._http.patch(
        `${environment.firebase.baseUrl}/contactMessages/${fbId}.json`,
        {id: fbId}
      )));*/

    return this._httpClient.post(`${this.apiUrl}saveMessage`, {data: message})
      .pipe(catchError(this.handleError));

  }
}
