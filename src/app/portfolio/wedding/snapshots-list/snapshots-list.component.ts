import {Component} from '@angular/core';
import {LangService} from '../../../shared/lang.service';

@Component({
  selector: 'app-snapshots-list',
  templateUrl: './snapshots-list.component.html',
  styleUrls: ['./snapshots-list.component.scss']
})
export class SnapshotsListComponent {
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
