import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-wedding-list',
  templateUrl: './liturgy-list.component.html',
  styleUrls: ['./liturgy-list.component.scss']
})
export class LiturgyListComponent {
  title = 'TEMPLOMI SZERTARTÁS';
  subtitle = 'Megörökítem életetek egyik legfontosabb napjának legszebb pillanatait.';
  indicatorTitle = 'T.SZERTARTÁS';

  breadCrumbCategory = 'Esküvő';
  breadCrumbSubmenu = 'Polgári szertartás';

  constructor(private _translateService: TranslateService) {
    this._translateService.onLangChange.subscribe((newLang) => {
      switch (newLang.lang) {
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
