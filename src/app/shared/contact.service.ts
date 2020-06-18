import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private _httpClient: HttpClient, @Inject('API_URL') private apiUrl: string) {
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

    return this._httpClient.post<any>(`${this.apiUrl}api/saveMessage.php`, JSON.stringify(message),
      {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      });

  }
}
