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
  serverErrorCode: number;

  picture: PortfolioPictureModel;
  masonryImages: PortfolioPictureModel[];
  aModifiedResultObjects: Array<PortfolioPictureModel> = [];

  private filteredText$ = new BehaviorSubject<string>(null);
  private _picturesSubscription: Subscription;
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
    this._picturesSubscription = this._portfolioService.getPictureList(this.node).pipe(
      flatMap(
        response => {
          if (response.status_code_header !== 200) {
            console.log(response.status_code_header);
            this.serverError = true;
            this.serverErrorCode = response.status_code_header;
            this._picturesSubscription.unsubscribe();
            return null;
          } else {
            this.serverError = false;
            const pictures = response.body['pictures'];
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
                        return picture.createDate.split('-', 3).indexOf(filterText.toLowerCase()) > -1;
                      });
                  }
                }
              )
            );
          }
        }
      )
    ).subscribe(
      response => {
        this.aModifiedResultObjects = [];

        response.map((ev) => {

          this.picture = new PortfolioPictureModel();

          this.picture.idFunction = ev.id;
          this.picture.nodeIdFunction = ev.nodeId;
          this.picture.subfolderFunction = ev.subfolder;
          this.picture.categoryFunction = ev.category;
          this.picture.titleFunction = ev.title;

          if (ev.subfolder != 'child-and-family' &&
            ev.subfolder != 'christening' &&
            ev.subfolder != 'kindergarten' &&
            ev.subfolder != 'portrait' &&
            ev.subfolder != 'pregnant') {
            this.picture.fileURLFunction = `${this.apiUrl}uploads/gallery/card-view/wedding/${this.picture.subfolderFunction}/${ev.filename}`;
          } else {
            this.picture.fileURLFunction = `${this.apiUrl}uploads/gallery/card-view/${this.picture.subfolderFunction}/${ev.filename}`;
          }

          this.picture.dateOfEventFunction = ev.createDate;

          this.aModifiedResultObjects.push(this.picture);

        });

        if (this.fullListView) {
          this.masonryImages = this.aModifiedResultObjects.slice(0, this.fullListLength);
        } else {
          this.masonryImages = this.aModifiedResultObjects.slice(0, this.limit);
        }

        this.loading = false;
      }
    );
  }

  ngOnDestroy(): void {
    this._picturesSubscription.unsubscribe();
    this._isLoggedInSubscription.unsubscribe();
  }

  showMoreImages() {
    this.masonryImages = this.aModifiedResultObjects.slice(0, this.fullListLength);
    this.fullListView = true;
  }

  detectSearching(filteredText) {
    this.filteredText$.next(filteredText);
  }

}
