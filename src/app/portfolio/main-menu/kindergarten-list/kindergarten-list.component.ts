import {Component} from '@angular/core';
import {LangService} from '../../../shared/lang.service';

@Component({
  selector: 'app-kindergarten-list',
  templateUrl: './kindergarten-list.component.html',
  styleUrls: ['./kindergarten-list.component.scss']
})
export class KindergartenListComponent {
  title;
  subtitle;
  indicatorTitle;

  constructor(private _langService: LangService) {
    this._langService.lang$.subscribe(
      lang => {
        switch (lang) {
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
