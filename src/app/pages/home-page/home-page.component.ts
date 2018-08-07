import { Component, OnInit, ViewChild } from '@angular/core';
import { OnsNavigator } from 'ngx-onsenui';
import { LoginPageComponent } from '../login-page/login-page.component';

@Component({
  selector: 'ons-page[home]',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  @ViewChild('carousel')
  carousel;
  constructor(private navigator: OnsNavigator) {}

  ngOnInit() {}

  prev() {
    this.carousel.nativeElement.prev();
  }
  next() {
    // Push SecontPageComponent to `ons-navigator
    this.navigator.element.pushPage(LoginPageComponent);
  }
}
