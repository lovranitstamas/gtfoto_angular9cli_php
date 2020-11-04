import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.scss']
})
export class PermissionListComponent {
  title = 'KI KÉRŐ';
  subtitle = 'Megörökítem életetek egyik legfontosabb napjának legszebb pillanatait.';
  indicatorTitle = 'KI KÉRŐ';

  breadCrumbCategory = 'Esküvő';
  breadCrumbSubmenu = 'Polgári szertartás';

  constructor(private _translateService: TranslateService) {
    this._translateService.onLangChange.subscribe((newLang) => {
      switch (newLang.lang) {
        case 'hu':
          this.title = 'KI KÉRŐ';
          this.subtitle = 'Megörökítem életetek egyik legfontosabb napjának legszebb pillanatait.';
          this.indicatorTitle = 'KI KÉRŐ';

          this.breadCrumbCategory = 'Esküvő';
          this.breadCrumbSubmenu = 'Kreatív fotók';
          break;
        case 'en':
          this.title = 'REQUEST FOR BRIDE';
          this.subtitle = 'I record the nicest moments of the most important day of your life.';
          this.indicatorTitle = 'R. FOR BRIDE';

          this.breadCrumbCategory = 'Wedding';
          this.breadCrumbSubmenu = 'Request for bride';
          break;
      }
    });
  }
}
