import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-portrait-list',
  templateUrl: './portrait-list.component.html',
  styleUrls: ['./portrait-list.component.scss']
})
export class PortraitListComponent {
  title = 'PORTRÉ FOTÓK';
  subtitle = 'Megörökítem életetek egyik legfontosabb napjának legszebb pillanatait.';
  indicatorTitle = 'PORTRÉK';

  constructor(private _translateService: TranslateService) {
    this._translateService.onLangChange.subscribe((newLang) => {
      switch (newLang.lang) {
        case 'hu':
          this.title = 'PORTRÉ FOTÓK';
          this.subtitle = 'Megörökítem életetek egyik legfontosabb napjának legszebb pillanatait.';
          this.indicatorTitle = 'PORTRÉ';
          break;
        case 'en':
          this.title = 'PORTRAIT PHOTOS';
          this.subtitle = 'I record the nicest moments of the most important day of your life.';
          this.indicatorTitle = 'PORTRAIT';
          break;
      }
    });
  }

}
