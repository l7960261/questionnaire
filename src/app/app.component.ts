import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('carousel')
  carousel;

  prev() {
    this.carousel.nativeElement.prev();
  }
  next() {
    this.carousel.nativeElement.next();
  }
}
