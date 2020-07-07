import {Inject, Injectable} from '@angular/core';
import {PortfolioPictureModel} from './portfolio-picture-model';
import {HttpClient, HttpErrorResponse, HttpParams, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  photos: Array<PortfolioPictureModel> = [];

  constructor(private _httpClient: HttpClient, @Inject('API_URL') private apiUrl: string) {
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  getPictureList(subfolder): Observable<PortfolioPictureModel[]> {
    const requestHeader = new HttpHeaders();
    requestHeader.append('Content-Type', 'application/json');
    requestHeader.append('Accept', 'application/json');
    requestHeader.append('Access-Control-Allow-Headers', 'Content-Type');

    const headerDict = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type'
    };

    const requestParams = new HttpParams()
      .set('subfolder', subfolder);

    /*const requestOptions = {
      headers: new HttpHeaders(headerDict),
      params: requestParams
    };*/
    // return this._httpClient.get<any>(`${this.apiUrl}getPictureList.php?subfolder=${subfolder}`);
    // return this._httpClient.get<any>(`${this.apiUrl}getPictureList.php`, requestOptions);
    return this._httpClient.get(`${this.apiUrl}getPictureList`, {
      headers: requestHeader,
      params: requestParams
    }).pipe(
      map((res) => {
        this.photos = res['data'];
        return this.photos;
      }),
      catchError(this.handleError));
  }

  // if i use any i can use the properties without function
  getPortfolioById(pictureId, subfolder): Observable<PortfolioPictureModel> {
    const requestHeader = new HttpHeaders();
    requestHeader.append('Content-Type', 'application/json');
    requestHeader.append('Accept', 'application/json');
    requestHeader.append('Access-Control-Allow-Headers', 'Content-Type');

    const requestParams = new HttpParams()
      .set('id', pictureId)
      .set('subfolder', subfolder);

    return this._httpClient.get<PortfolioPictureModel>(`${this.apiUrl}getPictureDatas`, {
      headers: requestHeader,
      params: requestParams
    }).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  delete(picture: PortfolioPictureModel): Observable<PortfolioPictureModel[]> {
    const id = picture.idFunction;
    const paramsPicture = new HttpParams()
      .set('id', id.toString());
    return this._httpClient.delete(`${this.apiUrl}deletePicture`, {params: paramsPicture}).pipe(
      map(() => {
        const filteredPhotos = this.photos.filter((photo) => {
          return +photo['id'] !== +id;
        });
        return this.photos = filteredPhotos;
      }),
      catchError(this.handleError)
    );
  }

  update(picture: PortfolioPictureModel): Observable<any> {
    return this._httpClient.put(`${this.apiUrl}updatePicture.php`, {data: picture}).pipe(
      catchError(this.handleError)
    );
  }

  create(picture: PortfolioPictureModel, data: File) {
    const formData = new FormData();
    formData.append('title', picture.titleFunction);
    formData.append('nodeId', picture.nodeIdFunction);
    formData.append('pictureURL', data, data.name);
    formData.append('createDate', picture.dateOfEventFunction);
    const uploadURL = `${this.apiUrl}uploadPicture.php`;
    return this._httpClient.post<any>(uploadURL, formData).pipe(
      catchError(this.handleError)
    );
  }
}
