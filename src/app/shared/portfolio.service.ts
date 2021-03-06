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

  setHeader() {
    const requestHeader = new HttpHeaders();
    requestHeader.append('Content-Type', 'application/json');
    requestHeader.append('Accept', 'application/json');
    requestHeader.append('Access-Control-Allow-Headers', 'Content-Type');

    return requestHeader;
  }

  getPictureList(categoryEn): Observable<PortfolioPictureModel[]> {
    const headerDict = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type'
    };

    const requestParams = new HttpParams()
      .set('categoryEn', categoryEn);

    /*const requestOptions = {
      headers: new HttpHeaders(headerDict),
      params: requestParams
    };*/
    // return this._httpClient.get<any>(`${this.apiUrl}getPictureList.php?subfolder=${subfolder}`);
    // return this._httpClient.get<any>(`${this.apiUrl}getPictureList.php`, requestOptions);
    return this._httpClient.get(`${this.apiUrl}getPictureList`, {
      headers: this.setHeader(),
      params: requestParams
    }).pipe(
      map((res) => {
        this.photos = res['data'];
        return this.photos;
      }),
      catchError(this.handleError));
  }

  // if i use any i can use the properties without function
  getPortfolioById(pictureId, categoryEn): Observable<PortfolioPictureModel> {

    const requestParams = new HttpParams()
      .set('id', pictureId)
      .set('categoryEn', categoryEn);

    return this._httpClient.get<PortfolioPictureModel>(`${this.apiUrl}getPictureDatas`, {
      headers: this.setHeader(),
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

  update(picture: PortfolioPictureModel): Observable<PortfolioPictureModel[]> {
    return this._httpClient.put(`${this.apiUrl}updatePicture`, {data: picture}).pipe(map(() => {
        console.log(picture.latestPictureFunction);
        const thePicure = this.photos.find((item) => {
          return +item['id'] === +picture.idFunction;
        });
        if (thePicure) {
          thePicure['firstDirectParentCategoryId'] = +picture.firstDirectParentCategoryIdFunction;
          thePicure['firstDirectParentCategoryEn'] = picture.firstDirectParentCategoryEnFunction;
          thePicure['firstDirectParentCategoryHu'] = picture.firstDirectParentCategoryHuFunction;
          thePicure['categoryId'] = +picture.categoryIdFunction;
          thePicure['categoryEn'] = picture.categoryEnFunction;
          thePicure['categoryHu'] = picture.categoryHuFunction;
          thePicure['title'] = picture.titleFunction;
          thePicure['fileURL'] = picture.fileURLFunction;
          thePicure['yearOfEvent'] = +picture.yearOfEventFunction;
          thePicure['latestPicture'] = picture.latestPictureFunction;
        }
        return this.photos;
      }),
      catchError(this.handleError));
  }

  create(picture: PortfolioPictureModel, data: File) {
    const formData = new FormData();
    formData.append('title', picture.titleFunction);
    formData.append('categoryId', picture.categoryIdFunction.toString());
    formData.append('picture', data, data.name);
    formData.append('yearOfEvent', picture.yearOfEventFunction.toString());
    picture.latestPictureFunction === true ? formData.append('latestPicture', (1).toString()) :
      formData.append('latestPicture', (0).toString());
    const uploadURL = `${this.apiUrl}uploadPicture`;
    return this._httpClient.post(uploadURL, formData).pipe(map((res) => {
        this.photos.push(res['data']);
        return this.photos;
      }),
      catchError(this.handleError)
    );
  }

  getEmphasizedImagesList(): Observable<any[]>  {

    return this._httpClient.get(`${this.apiUrl}getEmphasizedImagesList`, {
      headers: this.setHeader()
    }).pipe(
      map((res) => {
        this.photos = res['data'];
        return this.photos;
      }),
      catchError(this.handleError));
  }
}
