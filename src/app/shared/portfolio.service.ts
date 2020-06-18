import {Inject, Injectable} from '@angular/core';
import {PortfolioPictureModel} from './portfolio-picture-model';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private _httpClient: HttpClient, @Inject('API_URL') private apiUrl: string) {
  }

  handleError(error: HttpErrorResponse) {
    // console.log(error);
    return throwError(error);
  }

  getPictureList(subfolder): Observable<any> {
    return this._httpClient.get<any>(`${this.apiUrl}api/getPictureList.php?subfolder=${subfolder}`);
  }

  getPortfolioById(pictureId, subfolder): Observable<any> {
    return this._httpClient.get<any>(`${this.apiUrl}api/getPictureDatas.php?id=${pictureId}&subfolder=${subfolder}`);
  }

  delete(picture: PortfolioPictureModel): Observable<any> {
    const id = picture.idFunction;
    const paramsPicture = new HttpParams()
      .set('id', id.toString());
    return this._httpClient.delete(`${this.apiUrl}api/deletePicture.php`, {params: paramsPicture}).pipe(
      catchError(this.handleError)
    );
  }

  update(picture: PortfolioPictureModel): Observable<any> {
    return this._httpClient.put(`${this.apiUrl}api/updatePicture.php`, {data: picture}).pipe(
      catchError(this.handleError)
    );
  }

  create(picture: PortfolioPictureModel, data: File) {
    const formData = new FormData();
    formData.append('title', picture.titleFunction);
    formData.append('nodeId', picture.nodeIdFunction);
    formData.append('pictureURL', data, data.name);
    formData.append('createDate', picture.dateOfEventFunction);
    const uploadURL = `${this.apiUrl}api/uploadPicture.php`;
    return this._httpClient.post<any>(uploadURL, formData).pipe(
      catchError(this.handleError)
    );
  }
}
