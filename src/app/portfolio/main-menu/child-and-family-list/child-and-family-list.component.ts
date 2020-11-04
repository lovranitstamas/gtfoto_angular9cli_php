import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-child-and-family-list',
  templateUrl: './child-and-family-list.component.html',
  styleUrls: ['./child-and-family-list.component.scss']
})
export class ChildAndFamilyListComponent {
  title = 'GYEREK-ÉS CSALÁDI FOTÓK';
  subtitle = 'Megörökítem életetek egyik legfontosabb napjának legszebb pillanatait.';
  indicatorTitle = 'GYEREKEK';

  constructor(private _translateService: TranslateService) {
    this._translateService.onLangChange.subscribe((newLang) => {
      switch (newLang.lang) {
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
