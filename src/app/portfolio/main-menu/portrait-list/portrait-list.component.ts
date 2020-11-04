import {Component} from '@angular/core';
import {LangService} from '../../../shared/lang.service';

@Component({
  selector: 'app-portrait-list',
  templateUrl: './portrait-list.component.html',
  styleUrls: ['./portrait-list.component.scss']
})
export class PortraitListComponent {
  title;
  subtitle;
  indicatorTitle;

  constructor(private _langService: LangService) {
    this._langService.lang$.subscribe(
      lang => {
        switch (lang) {
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
