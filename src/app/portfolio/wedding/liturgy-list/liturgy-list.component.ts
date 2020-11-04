import {Component} from '@angular/core';
import {LangService} from '../../../shared/lang.service';

@Component({
  selector: 'app-wedding-list',
  templateUrl: './liturgy-list.component.html',
  styleUrls: ['./liturgy-list.component.scss']
})
export class LiturgyListComponent {
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
            this.title = 'TEMPLOMI SZERTARTÁS';
            this.subtitle = 'Megörökítem életetek egyik legfontosabb napjának legszebb pillanatait.';
            this.indicatorTitle = 'T.SZERTARTÁS';

            this.breadCrumbCategory = 'Esküvő';
            this.breadCrumbSubmenu = 'Kreatív fotók';
            break;
          case 'en':
            this.title = 'WEDDING LITURGY';
            this.subtitle = 'I record the nicest moments of the most important day of your life.';
            this.indicatorTitle = 'WEDDING';

            this.breadCrumbCategory = 'Wedding';
            this.breadCrumbSubmenu = 'Liturgy';
            break;
        }
      });
  }

}
