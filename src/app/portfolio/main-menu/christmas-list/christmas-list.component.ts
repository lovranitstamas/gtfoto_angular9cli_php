import {Component} from '@angular/core';
import {LangService} from '../../../shared/lang.service';

@Component({
  selector: 'app-christmas-list',
  templateUrl: './christmas-list.component.html',
  styleUrls: ['./christmas-list.component.scss']
})
export class ChristmasListComponent {
  title;
  subtitle;
  indicatorTitle;

  constructor(private _langService: LangService) {
    this._langService.lang$.subscribe(
      lang => {
        switch (lang) {
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
