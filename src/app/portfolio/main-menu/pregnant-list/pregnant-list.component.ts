import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-pregnant-list',
  templateUrl: './pregnant-list.component.html',
  styleUrls: ['./pregnant-list.component.scss']
})
export class PregnantListComponent {
  title = 'KISMAMA FOTÓK';
  subtitle = 'Megörökítem életetek egyik legfontosabb napjának legszebb pillanatait.';
  indicatorTitle = 'KISMAMA';

  constructor(private _translateService: TranslateService) {
    this._translateService.onLangChange.subscribe((newLang) => {
      switch (newLang.lang) {
        case 'hu':
          this.title = 'KISMAMA FOTÓK';
          this.subtitle = 'Megörökítem életetek egyik legfontosabb napjának legszebb pillanatait.';
          this.indicatorTitle = 'KISMAMA';
          break;
        case 'en':
          this.title = 'PREGNANT PHOTOS';
          this.subtitle = 'I record the nicest moments of the most important day of your life.';
          this.indicatorTitle = 'PREGNANT';
          break;
      }
    });
  }

}
