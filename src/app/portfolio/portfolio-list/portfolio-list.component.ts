import {Component, ElementRef, Inject, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PortfolioPictureModel} from '../../shared/portfolio-picture-model';
import {BehaviorSubject, Subscription} from 'rxjs';
import {PortfolioService} from '../../shared/portfolio.service';
import {UserService} from '../../shared/user.service';
import {flatMap, map} from 'rxjs/operators';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.scss']
})
export class PortfolioListComponent implements OnInit, OnDestroy {

  @ViewChild('searchInput') searchInput: ElementRef;
  @Input() node;

  isLoggedIn: boolean;
  isAdmin: boolean;
  fullListLength: number;
  limit = 30;
  fullListView = false;
  emptyList = false;
  loading = true;
  serverError = false;
  serverErrorMessage: string | number;
  masonryImages: PortfolioPictureModel[];
  allPictures: Array<PortfolioPictureModel> = [];

  private filteredText$ = new BehaviorSubject<string>(null);
  private _pictureSubscription: Subscription;
  private _isLoggedInSubscription: Subscription;
  private _adminStatusSubscription: Subscription;

  constructor(
    private _portfolioService: PortfolioService,
    userService: UserService,
    @Inject('API_URL') private apiUrl: string
  ) {
    this._isLoggedInSubscription = userService.isLoggedIn$.subscribe(
      isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
      }
    );
    this._adminStatusSubscription = userService.adminStatus$.subscribe(
      adminStatus => {
        this.isAdmin = adminStatus;
      }
    );
  }

  ngOnInit() {
    this._pictureSubscription = this._portfolioService.getPictureList(this.node).pipe(
      flatMap(
        response => {
          this.serverError = false;
          const pictures: any = response;
          pictures.length === 0 ? this.emptyList = true : this.emptyList = false;
          this.fullListLength = pictures.length;

          return this.filteredText$.pipe(
            map(
              filterText => {
                if (filterText === null) {
                  return pictures;
                } else {
                  return pictures.filter(
                    picture => {
                      return (picture.yearOfEvent.toString() === filterText.toString()) && filterText.length === 4;
                    });
                }
              }
            )
          );
        }
      )
    )
      .subscribe(
        (response: PortfolioPictureModel[]) => {
          this.allPictures = [];

          response.map((ev: any) => {
            const picture = new PortfolioPictureModel();

            picture.idFunction = ev.id;
            picture.firstDirectParentCategoryIdFunction = ev.firstDirectParentCategoryId;
            picture.firstDirectParentCategoryEnFunction = ev.firstDirectParentCategoryEn;
            picture.firstDirectParentCategoryHuFunction = ev.firstDirectParentCategoryHu;
            picture.categoryIdFunction = ev.categoryId;
            picture.categoryEnFunction = ev.categoryEn;
            picture.categoryHuFunction = ev.categoryHu;
            picture.titleFunction = ev.title;
            picture.yearOfEventFunction = ev.yearOfEvent;
            picture.fileURLFunction = ev.fileURL;
            picture.latestPictureFunction = ev.latestPicture;

            this.allPictures.push(picture);
          });

          if (this.fullListView) {
            this.masonryImages = this.allPictures.slice(0, this.fullListLength);
          } else {
            this.masonryImages = this.allPictures.slice(0, this.limit);
          }

          this.loading = false;
        },
        (err) => {
          this.serverError = true;
          (typeof err.status === 'number' && err.status === 0) || err.status === null ? this.serverErrorMessage = 'Unknow error' : this.serverErrorMessage = err.status;
          console.warn(err);
          this._pictureSubscription.unsubscribe();
          return null;
        }
      );
  }

  ngOnDestroy(): void {
    this._pictureSubscription.unsubscribe();
    this._isLoggedInSubscription.unsubscribe();
  }

  showMoreImages() {
    this.masonryImages = this.allPictures.slice(0, this.fullListLength);
    this.fullListView = true;
  }

  detectSearching(filteredText) {
    this.filteredText$.next(filteredText);
  }

  scrollDown($event: MouseEvent) {
    $event.preventDefault();
    window.scrollTo(0, 150);
  }
}
