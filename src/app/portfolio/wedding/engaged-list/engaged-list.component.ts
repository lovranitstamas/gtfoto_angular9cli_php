import {Component} from '@angular/core';
import {LangService} from '../../../shared/lang.service';

@Component({
  selector: 'app-engaged-list',
  templateUrl: './engaged-list.component.html',
  styleUrls: ['./engaged-list.component.scss']
})
export class EngagedListComponent {
  title;
  subtitle;
  indicatorTitle;

  breadCrumbCategory;
  breadCrumbSubmenu;

  constructor(private _langService: LangService) {
    this._langService.lang$.subscribe(
      lang => {
        switch (lang) {
          case 'hu':
            this.title = 'JEGYES FOTÓK';
            this.subtitle = 'Megörökítem életetek egyik legfontosabb napjának legszebb pillanatait.';
            this.indicatorTitle = 'ELJEGYZÉS';

            this.breadCrumbCategory = 'Esküvő';
            this.breadCrumbSubmenu = 'Kreatív fotók';
            break;
          case 'en':
            this.title = 'ENGAGEMENT PHOTOS';
            this.subtitle = 'I record the nicest moments of the most important day of your life.';
            this.indicatorTitle = 'ENGAGEMENT';

            this.breadCrumbCategory = 'Wedding';
            this.breadCrumbSubmenu = 'Engagement';
            break;
        }
      });
  }
}
