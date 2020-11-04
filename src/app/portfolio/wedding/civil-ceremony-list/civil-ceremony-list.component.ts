import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-civil-ceremony-list',
  templateUrl: './civil-ceremony-list.component.html',
  styleUrls: ['./civil-ceremony-list.component.scss']
})
export class CivilCeremonyListComponent {
  title = 'POLGÁRI SZERTARTÁS';
  subtitle = 'Megörökítem életetek egyik legfontosabb napjának legszebb pillanatait.';
  indicatorTitle = 'P.SZERTARTÁS';

  breadCrumbCategory = 'Esküvő';
  breadCrumbSubmenu = 'Polgári szertartás';

  constructor(private _translateService: TranslateService) {
    this._translateService.onLangChange.subscribe((newLang) => {
      switch (newLang.lang) {
        case 'hu':
          this.title = 'POLGÁRI SZERTARTÁS';
          this.subtitle = 'Megörökítem életetek egyik legfontosabb napjának legszebb pillanatait.';
          this.indicatorTitle = 'P.SZERTARTÁS';

          this.breadCrumbCategory = 'Esküvő';
          this.breadCrumbSubmenu = 'Polgári szertartás';
          break;
        case 'en':
          this.title = 'CIVIL CEREMONY';
          this.subtitle = 'I record the nicest moments of the most important day of your life.';
          this.indicatorTitle = 'C.CEREMONY';

          this.breadCrumbCategory = 'Wedding';
          this.breadCrumbSubmenu = 'Civil ceremony';
          break;
      }
    });
  }

}
