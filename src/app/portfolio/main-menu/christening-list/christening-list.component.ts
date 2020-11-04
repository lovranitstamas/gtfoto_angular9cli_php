import {Component} from '@angular/core';
import {LangService} from '../../../shared/lang.service';

@Component({
  selector: 'app-christening-list',
  templateUrl: './christening-list.component.html',
  styleUrls: ['./christening-list.component.scss']
})
export class ChristeningListComponent {
  title;
  subtitle;
  indicatorTitle;

  constructor(private _langService: LangService) {
    this._langService.lang$.subscribe(
      lang => {
        switch (lang) {
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
