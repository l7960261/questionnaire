import { Component, OnInit } from '@angular/core';
import { OnsNavigator } from 'ngx-onsenui';
import { LoginPageComponent } from '../login-page/login-page.component';

@Component({
  selector: 'ons-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private navigator: OnsNavigator) {}

  ngOnInit() {}

  toLoginPage() {
    // Push SecontPageComponent to `ons-navigator
    this.navigator.element.pushPage(LoginPageComponent);
  }
}
