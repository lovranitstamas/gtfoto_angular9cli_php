import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-menu-indicator',
  templateUrl: './menu-indicator.component.html',
  styleUrls: ['./menu-indicator.component.scss']
})
export class MenuIndicatorComponent {
  @Input() title;
}
