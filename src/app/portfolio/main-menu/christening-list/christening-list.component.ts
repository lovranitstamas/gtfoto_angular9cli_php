import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-christening-list',
  templateUrl: './christening-list.component.html',
  styleUrls: ['./christening-list.component.scss']
})
export class ChristeningListComponent {
  title = 'KERESZTELŐ FOTÓK';
  subtitle = 'Megörökítem életetek egyik legfontosabb napjának legszebb pillanatait.';
  indicatorTitle = 'BAPTISM';

  constructor(private _translateService: TranslateService) {
    this._translateService.onLangChange.subscribe((newLang) => {
      switch (newLang.lang) {
        case 'hu':
          this.title = 'KERESZTELŐ FOTÓK';
          this.subtitle = 'Megörökítem életetek egyik legfontosabb napjának legszebb pillanatait.';
          this.indicatorTitle = 'KERESZTELŐ';
          break;
        case 'en':
          this.title = 'BAPTISM PHOTOS';
          this.subtitle = 'I record the nicest moments of the most important day of your life.';
          this.indicatorTitle = 'BAPTISM';
          break;
      }
    });
  }
}
