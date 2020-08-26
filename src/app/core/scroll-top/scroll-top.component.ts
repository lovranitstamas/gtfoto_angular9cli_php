import {Component, Inject, HostListener} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-scroll-top',
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.scss']
})
export class ScrollTopComponent {
  windowScrolled: boolean;

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    window.scrollY > 200 ? this.windowScrolled = true : this.windowScrolled = false;
  }

  scrollToTop($event: Event) {
    (function smoothscroll() {
      $event.preventDefault();
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();
  }

}
