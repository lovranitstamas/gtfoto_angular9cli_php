import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-snapshots-list',
  templateUrl: './snapshots-list.component.html',
  styleUrls: ['./snapshots-list.component.scss']
})
export class SnapshotsListComponent {

  title = 'PILLANATKÉPEK';
  subtitle = 'Megörökítem életetek egyik legfontosabb napjának legszebb pillanatait.';
  indicatorTitle = 'PILLANATOK';

  breadCrumbCategory = 'Esküvő';
  breadCrumbSubmenu = 'Polgári szertartás';

  constructor(private _translateService: TranslateService) {
    this._translateService.onLangChange.subscribe((newLang) => {
      switch (newLang.lang) {
        case 'hu':
          this.title = 'PILLANATKÉPEK';
          this.subtitle = 'Megörökítem életetek egyik legfontosabb napjának legszebb pillanatait.';
          this.indicatorTitle = 'PILLANATOK';

          this.breadCrumbCategory = 'Esküvő';
          this.breadCrumbSubmenu = 'Kreatív fotók';
          break;
        case 'en':
          this.title = 'SNAPSHOTS';
          this.subtitle = 'I record the nicest moments of the most important day of your life.';
          this.indicatorTitle = 'SNAPSHOTS';

          this.breadCrumbCategory = 'Wedding';
          this.breadCrumbSubmenu = 'Snapshots';
          break;
      }
    });
  }

}
