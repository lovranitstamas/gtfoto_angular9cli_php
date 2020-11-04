import {Component} from '@angular/core';
import {LangService} from '../../../shared/lang.service';

@Component({
  selector: 'app-child-and-family-list',
  templateUrl: './child-and-family-list.component.html',
  styleUrls: ['./child-and-family-list.component.scss']
})
export class ChildAndFamilyListComponent {
  title;
  subtitle;
  indicatorTitle;

  constructor(private _langService: LangService) {

    this._langService.lang$.subscribe(
      lang => {
        switch (lang) {
          case 'hu':
            this.title = 'GYEREK-ÉS CSALÁDI FOTÓK';
            this.subtitle = 'Megörökítem életetek egyik legfontosabb napjának legszebb pillanatait.';
            this.indicatorTitle = 'CSALÁD';
            break;
          case 'en':
            this.title = 'CHILD AND FAMILY PHOTOS';
            this.subtitle = 'I record the nicest moments of the most important day of your life.';
            this.indicatorTitle = 'FAMILY';
            break;
        }
      });
  }
}
