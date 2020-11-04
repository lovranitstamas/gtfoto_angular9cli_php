import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-creative-list',
  templateUrl: './creative-list.component.html',
  styleUrls: ['./creative-list.component.scss']
})
export class CreativeListComponent {
  title = 'KREATÍV FOTÓK';
  subtitle = 'Megörökítem életetek egyik legfontosabb napjának legszebb pillanatait.';
  indicatorTitle = 'KREATÍV FOTÓK';

  breadCrumbCategory = 'Esküvő';
  breadCrumbSubmenu = 'Polgári szertartás';

  constructor(private _translateService: TranslateService) {
    this._translateService.onLangChange.subscribe((newLang) => {
      switch (newLang.lang) {
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
