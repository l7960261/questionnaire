import { Component, OnInit, ViewChild } from '@angular/core';
import { OnsNavigator, Params } from 'ngx-onsenui';
import { AuthenticationService, IUser } from '../../core/authentication/authentication.service';
import { SurveyPageComponent } from '../survey-page/survey-page.component';

@Component({
  selector: 'ons-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  @ViewChild('carousel')
  carousel;

  caption: string;
  data: any;
  isSignIn: boolean;
  user: IUser;

  constructor(private navigator: OnsNavigator, private params: Params, private authericationService: AuthenticationService) {}

  ngOnInit() {
    this.data = this.params.data;
    this.caption = this.data.caption;
    this.user = Object.assign({}, { displayName: '', phoneNumber: '', email: '', uid: null, photoURL: '' });
    this.authericationService.user().subscribe(val => {
      if (val) {
        this.isSignIn = true;
        this.user = val;
      } else {
        this.isSignIn = false;
      }
    });
  }

  signOut() {
    this.authericationService.logout();
  }

  onNext() {
    this.authericationService.setUser(this.user);
    const data = Object.assign({}, this.data, { uid: this.user.uid });
    this.navigator.element.pushPage(SurveyPageComponent, { data });
  }
}
