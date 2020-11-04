import { Injectable } from '@angular/core';
import {ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LangService {
  lang$ = new ReplaySubject<string>(1);

  constructor() {
    this.lang$.next('hu');
  }

  setLanguage(lang) {
    this.lang$.next(lang);
  }
}
