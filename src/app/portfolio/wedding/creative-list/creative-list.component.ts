import {Component} from '@angular/core';
import {LangService} from '../../../shared/lang.service';

@Component({
  selector: 'app-creative-list',
  templateUrl: './creative-list.component.html',
  styleUrls: ['./creative-list.component.scss']
})
export class CreativeListComponent {
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
            this.title = 'KREATÍV FOTÓK';
            this.subtitle = 'Megörökítem életetek egyik legfontosabb napjának legszebb pillanatait.';
            this.indicatorTitle = 'KREATÍV FOTÓK';

            this.breadCrumbCategory = 'Esküvő';
            this.breadCrumbSubmenu = 'Kreatív fotók';
            break;
          case 'en':
            this.title = 'CREATIVE PHOTOS';
            this.subtitle = 'I record the nicest moments of the most important day of your life.';
            this.indicatorTitle = 'CREATIVE PHOTOS';

            this.breadCrumbCategory = 'Wedding';
            this.breadCrumbSubmenu = 'Creative photos';
            break;
        }
      });
  }
}
