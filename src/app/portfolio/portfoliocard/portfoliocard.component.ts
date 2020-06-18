import {Component, Input} from '@angular/core';
import {PortfolioPictureModel} from '../../shared/portfolio-picture-model';

@Component({
  selector: 'app-portfoliocard',
  templateUrl: './portfoliocard.component.html',
  styleUrls: ['./portfoliocard.component.scss']
})
export class PortfoliocardComponent {
  @Input() picture: PortfolioPictureModel;
  @Input() nextLabel = 'Tovább';
  @Input() isAdmin = false;
  @Input() isLoggedIn = false;
}
