import { Component, OnInit, ViewChild } from '@angular/core';
import { Params } from 'ngx-onsenui';
import { AuthenticationService, IUser } from '../../core/authentication/authentication.service';

@Component({
  selector: 'ons-page[login]',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  @ViewChild('carousel')
  carousel;

  caption: string;
  isSignIn: boolean;
  user: IUser;

  constructor(private _params: Params, private authericationService: AuthenticationService) {}

  ngOnInit() {
    this.caption = `${this._params.data.name} - ${this._params.data.date}`;
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
  }
}
