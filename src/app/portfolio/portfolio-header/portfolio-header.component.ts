import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-portfolio-header',
  templateUrl: './portfolio-header.component.html',
  styleUrls: ['./portfolio-header.component.scss']
})
export class PortfolioHeaderComponent {
  @Input() title;
  @Input() subtitle;
}
