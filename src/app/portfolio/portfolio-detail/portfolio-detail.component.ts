import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PortfolioService} from '../../shared/portfolio.service';
import {PortfolioPictureModel} from '../../shared/portfolio-picture-model';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {UserService} from '../../shared/user.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-portfolio-detail',
  templateUrl: './portfolio-detail.component.html',
  styleUrls: ['./portfolio-detail.component.scss']
})
export class PortfolioDetailComponent implements OnInit, OnDestroy {
  portfolioPicture: PortfolioPictureModel;
  viewForm = false;
  setNode = false;
  serverError = false;
  serverErrorMessage: string;
  selectedFiles: FileList;
  file: boolean | File;
  nodes: Array<{ id: number, category: string }> = [];
  @ViewChild('form') form;
  @ViewChild('pictureURL') pictureURL: any;

  // close all subscription
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private _route: ActivatedRoute,
              private _portfolioService: PortfolioService,
              private _location: Location,
              public userService: UserService,
              private _router: Router,
              @Inject('API_URL') private apiUrl: string) {
  }

  ngOnInit() {
    const node = this._route.snapshot.params.node;
    const portfolioPictureId = this._route.snapshot.params.id;

    // create an empty model while we wait for data
    this.portfolioPicture = new PortfolioPictureModel();
    this.portfolioPicture.idFunction = '';
    this.portfolioPicture.nodeIdFunction = '';
    this.portfolioPicture.subfolderFunction = '';
    this.portfolioPicture.categoryFunction = '';
    this.portfolioPicture.titleFunction = '';
    this.portfolioPicture.fileURLFunction = '';
    this.portfolioPicture.dateOfEventFunction = '';

    // a method get true/false value in all case
    // from false to true oninit and set false from click
    // the other option is set true the default value
    this.viewForm = !!portfolioPictureId;

    if (portfolioPictureId) {
      this._portfolioService.getPortfolioById(portfolioPictureId, node).pipe(
        takeUntil(this._destroy$))
        .subscribe((evm: any) => {
            this.portfolioPicture.idFunction = evm.id;
            this.portfolioPicture.nodeIdFunction = evm.nodeId;
            this.portfolioPicture.subfolderFunction = evm.subfolder;
            this.portfolioPicture.categoryFunction = evm.category;
            this.portfolioPicture.titleFunction = evm.title;
            this.portfolioPicture.fileURLFunction = evm.fileURL;
            this.portfolioPicture.dateOfEventFunction = evm.createDate;

            this.setNode = true;
          },
          (err) => {
            this.setError(err);
            this.setNode = true;
            this.form.disabled = true;
            console.warn(err);

            return null;
          });
    }

    this.nodes = [
      {id: 1, category: 'Portré'},
      {id: 2, category: 'Gyerek-és családi fotók'},
      {id: 3, category: 'Kismama fotók'},
      {id: 4, category: 'Keresztelő fotók'},
      {id: 5, category: 'Óvodai fotók'},
      {id: 6, category: 'Kreatív fotók'},
      {id: 7, category: 'Jegyes fotók'},
      {id: 8, category: 'Készülődés'},
      {id: 9, category: 'Ki kérő'},
      {id: 10, category: 'Polgári szertartás'},
      {id: 11, category: 'Templomi szertartás'},
      {id: 12, category: 'Vacsora-buli'}
    ];
  }

  ngOnDestroy() {
    // through the takeUntil function will be closed all stream
    // in this case it is not absolutely necessary because all http stream close itself
    // http://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
    this._destroy$.next();
    this._destroy$.complete();
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  onSubmit() {

    !this.selectedFiles ? this.file = false : this.file = this.selectedFiles.item(0);

    if (this.file === false) {
      this._portfolioService.update(this.portfolioPicture).pipe(
        takeUntil(this._destroy$))
        .subscribe(
          () => {
            this.navigateBack();
          },
          (err) => {
            this.setError(err);
            this.reInitEditMode();
          }
        );
    } else {
      this._portfolioService.create(this.portfolioPicture, this.file).pipe(
        takeUntil(this._destroy$))
        .subscribe(
          () => {
            this.selectedFiles = undefined;
            this.navigateBack();
          },
          (err) => {
            this.setError(err);
            this.reInitEditMode();
          }
        );
    }
  }

  delete() {
    this._portfolioService.delete(this.portfolioPicture).pipe(
      takeUntil(this._destroy$))
      .subscribe(
        () => {
          this.navigateBack();
        },
        (err) => {
          this.setError(err);
          this.viewForm = true;
          console.warn(err);
        }
      );
  }

  navigateBack() {
    this._location.back();
  }

  setError(err) {
    this.serverError = true;
    (typeof err.status === 'number' && err.status === 0) || err.status === null ? this.serverErrorMessage = 'Unknow error' : this.serverErrorMessage = 'Error code: ' + err.status;
  }

  private reInitEditMode() {
    this.serverErrorMessage += ' [Nem megfelelő adatbevitel. Kérem várjon]';
    setTimeout(() => {
      this.serverError = false;
    }, 5000);
  }

}
