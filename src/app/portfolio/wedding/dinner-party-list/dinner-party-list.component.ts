import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-dinner-party-list',
  templateUrl: './dinner-party-list.component.html',
  styleUrls: ['./dinner-party-list.component.scss']
})
export class DinnerPartyListComponent {
  title = 'VACSORI-BULI';
  subtitle = 'Megörökítem életetek egyik legfontosabb napjának legszebb pillanatait.';
  indicatorTitle = 'BULI FOTÓK';

  breadCrumbCategory = 'Esküvő';
  breadCrumbSubmenu = 'Polgári szertartás';

  constructor(private _translateService: TranslateService) {
    this._translateService.onLangChange.subscribe((newLang) => {
      switch (newLang.lang) {
        case 'hu':
          this.title = 'VACSORI-BULI';
          this.subtitle = 'Megörökítem életetek egyik legfontosabb napjának legszebb pillanatait.';
          this.indicatorTitle = 'BULI FOTÓK';

          this.breadCrumbCategory = 'Esküvő';
          this.breadCrumbSubmenu = 'Kreatív fotók';
          break;
        case 'en':
          this.title = 'PARTY PHOTOS';
          this.subtitle = 'I record the nicest moments of the most important day of your life.';
          this.indicatorTitle = 'PARTY';

          this.breadCrumbCategory = 'Wedding';
          this.breadCrumbSubmenu = 'Party';
          break;
      }
    });
  }
}

