import {Component} from '@angular/core';
import {LangService} from '../../../shared/lang.service';

@Component({
  selector: 'app-pregnant-list',
  templateUrl: './pregnant-list.component.html',
  styleUrls: ['./pregnant-list.component.scss']
})
export class PregnantListComponent {
  title;
  subtitle;
  indicatorTitle;

  constructor(private _langService: LangService) {
    this._langService.lang$.subscribe(
      lang => {
        switch (lang) {
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
