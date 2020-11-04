import {Component} from '@angular/core';
import {LangService} from '../../../shared/lang.service';

@Component({
  selector: 'app-wedding-submenu',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent {
  title;
  subtitle;

  constructor(private _langService: LangService) {
    this._langService.lang$.subscribe(
      lang => {
        switch (lang) {
          case 'hu':
            this.title = 'ESKÜVŐI FOTÓK';
            this.subtitle = 'Megörökítem életetek egyik legfontosabb napjának legszebb pillanatait.';
            break;
          case 'en':
            this.title = 'WEDDING PHOTOS';
            this.subtitle = 'I record the nicest moments of the most important day of your life.';
            break;
        }
      });
  }
}
