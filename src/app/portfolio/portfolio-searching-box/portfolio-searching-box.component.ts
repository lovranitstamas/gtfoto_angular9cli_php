import {AfterViewInit, Component, EventEmitter, Output} from '@angular/core';
import {fromEvent} from 'rxjs';
import {delay, distinctUntilChanged, map} from 'rxjs/operators';
import {LangService} from '../../shared/lang.service';

@Component({
  selector: 'app-portfolio-searching-box',
  templateUrl: './portfolio-searching-box.component.html',
  styleUrls: ['./portfolio-searching-box.component.scss']
})
export class PortfolioSearchingBoxComponent implements AfterViewInit {
  @Output() valueChange = new EventEmitter();
  search;

  constructor(private _langService: LangService) {

    this._langService.lang$.subscribe(
      lang => {
        switch (lang) {
          case 'hu':
            this.search = 'Keresés évszám alapján';
            break;
          case 'en':
            this.search = 'Search by year';
            break;
        }
      });
  }

  public ngAfterViewInit() {
    const input = document.querySelector('#search-input');
    // this.searchInput.nativeElement
    fromEvent(input, 'keyup').pipe(
      delay(300),
      map(
        (event: Event) => {
          return (event.srcElement as HTMLInputElement).value;
        }
      ),
      distinctUntilChanged())
      .subscribe(
        text => {
          if (text.length === 0) {
            text = null;
          }
          this.valueChange.emit(text);
        }
      );
  }

}
