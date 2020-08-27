import {Component, HostListener, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input() category;
  @Input() submenu;
  @Input() dCategory;
  @Input() dSubmenu;

  windowScrolled: boolean;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    window.scrollY > 200 ? this.windowScrolled = true : this.windowScrolled = false;
  }

  getStatus() {
    return this.windowScrolled ? 0.5 : 1;
  }

  ngOnInit() {
    this.windowScrolled = false;
  }
}
