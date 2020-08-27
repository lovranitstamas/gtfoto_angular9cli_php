import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu-indicator',
  templateUrl: './menu-indicator.component.html',
  styleUrls: ['./menu-indicator.component.scss']
})
export class MenuIndicatorComponent implements OnInit {
  @Input() title;
  titleArray: Array<string> = [];

  ngOnInit() {
    for (const word of this.title) {
      if (word !== ' ') {
        this.titleArray.push(word);
      }
    }
  }

}
