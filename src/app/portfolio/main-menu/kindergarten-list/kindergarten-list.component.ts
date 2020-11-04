import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-kindergarten-list',
  templateUrl: './kindergarten-list.component.html',
  styleUrls: ['./kindergarten-list.component.scss']
})
export class KindergartenListComponent {
  title = 'ÓVODAI FOTÓK';
  subtitle = 'Megörökítem életetek egyik legfontosabb napjának legszebb pillanatait.';
  indicatorTitle = 'ÓVODA';

  constructor(private _translateService: TranslateService) {
    this._translateService.onLangChange.subscribe((newLang) => {
      switch (newLang.lang) {
        case 'hu':
          this.title = 'ÓVODAI FOTÓK';
          this.subtitle = 'Megörökítem életetek egyik legfontosabb napjának legszebb pillanatait.';
          this.indicatorTitle = 'ÓVODA';
          break;
        case 'en':
          this.title = 'KINDERGARTEN PHOTOS';
          this.subtitle = 'I record the nicest moments of the most important day of your life.';
          this.indicatorTitle = 'KINDERGARTEN';
          break;
      }
    });
  }
}
