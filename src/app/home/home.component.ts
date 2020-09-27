import {Component, OnInit} from '@angular/core';
import {CarouselConfig} from 'ngx-bootstrap/carousel';
import {Subscription} from 'rxjs';
import {PortfolioService} from '../shared/portfolio.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    {
      provide: CarouselConfig,
      useValue: {interval: 8000, noPause: true, showIndicators: true}
    }
  ]
})
export class HomeComponent implements OnInit {
  private _pictureSubscription: Subscription;
  allPictures: Array<any> = [];
  arrayOfFourItem: Array<any> = [];
  loading = true;
  serverError = false;
  serverErrorMessage: string | number;

  constructor(
    private _portfolioService: PortfolioService) {
  }

  ngOnInit() {
    this._pictureSubscription = this._portfolioService.getEmphasizedImagesList()
      .subscribe(
        (response: any[]) => {
          this.allPictures = response;

          for (let i = 0; i < 4; i++) {
            this.arrayOfFourItem.push(this.allPictures[i]);
            if (i === this.allPictures.length - 1) {
              break;
            }
          }

          this.loading = false;

          // change the content of secondly array to fadein fadeout
          if (this.allPictures.length > 4) {
            const numberOfCircle = Math.ceil(this.allPictures.length / 4); // 2
            const restOfLastCircle = this.allPictures.length % 4; // 3
            let circleIndex = 2;
            setInterval(() => {
              this.arrayOfFourItem = [];

              for (let i = 0;
                   i < (restOfLastCircle === 0 || (restOfLastCircle > 0 && circleIndex < numberOfCircle) ? 4 : restOfLastCircle);
                   i++) {
                this.arrayOfFourItem.push(this.allPictures[(circleIndex - 1) * 4 + i]);
              }

              circleIndex++;

              if (circleIndex > numberOfCircle) {
                circleIndex = 1;

              }

            }, 6500);
          }
        },
        (err) => {
          this.serverError = true;
          (typeof err.status === 'number' && err.status === 0) || err.status === null ?
            this.serverErrorMessage = 'Unknow error' : this.serverErrorMessage = err.status;
          console.warn(err);
          this._pictureSubscription.unsubscribe();
          return null;
        }
      );

  }
}
