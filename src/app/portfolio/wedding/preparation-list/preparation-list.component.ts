import {Component} from '@angular/core';
import {LangService} from '../../../shared/lang.service';

@Component({
  selector: 'app-preparation-list',
  templateUrl: './preparation-list.component.html',
  styleUrls: ['./preparation-list.component.scss']
})
export class PreparationListComponent {
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
            this.title = 'KÉSZÜLŐDÉS';
            this.subtitle = 'Megörökítem életetek egyik legfontosabb napjának legszebb pillanatait.';
            this.indicatorTitle = 'KÉSZÜLŐDÉS';

            this.breadCrumbCategory = 'Esküvő';
            this.breadCrumbSubmenu = 'Kreatív fotók';
            break;
          case 'en':
            this.title = 'WEDDING PREPARATION';
            this.subtitle = 'I record the nicest moments of the most important day of your life.';
            this.indicatorTitle = 'PREPARATION';

            this.breadCrumbCategory = 'Wedding';
            this.breadCrumbSubmenu = 'Preparation';
            break;
        }
      });
  }
}
