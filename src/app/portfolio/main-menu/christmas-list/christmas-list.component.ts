import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-christmas-list',
  templateUrl: './christmas-list.component.html',
  styleUrls: ['./christmas-list.component.scss']
})
export class ChristmasListComponent {
  title = 'KARÁCSONYI FOTÓK';
  subtitle = 'Megörökítem életetek egyik legfontosabb napjának legszebb pillanatait.';
  indicatorTitle = 'KARÁCSONY';

  constructor(private _translateService: TranslateService) {
    this._translateService.onLangChange.subscribe((newLang) => {
      switch (newLang.lang) {
        case 'hu':
          this.title = 'KARÁCSONYI FOTÓK';
          this.subtitle = 'Megörökítem életetek egyik legfontosabb napjának legszebb pillanatait.';
          this.indicatorTitle = 'KARÁCSONY';
          break;
        case 'en':
          this.title = 'CHRISTMAS PHOTOS';
          this.subtitle = 'I record the nicest moments of the most important day of your life.';
          this.indicatorTitle = 'CHRISTMAS';
          break;
      }
    });
  }
}
