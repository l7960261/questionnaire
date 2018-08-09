import { Component, OnDestroy, OnInit } from '@angular/core';
import { OnsNavigator } from 'ngx-onsenui';
import { AuthenticationService, IUser } from '../../core/authentication/authentication.service';
import { Subscription } from 'rxjs';
import { HomePageComponent } from '../home-page/home-page.component';

@Component({
  selector: 'ons-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  isSignIn: boolean;
  user: IUser;
  user$: Subscription;

  constructor(private navigator: OnsNavigator, private authericationService: AuthenticationService) {}

  ngOnInit() {
    this.user = Object.assign({}, { displayName: '', phoneNumber: '', email: '', uid: null, photoURL: '' });
    this.user$ = this.authericationService.user().subscribe(val => {
      if (val) {
        this.isSignIn = true;
        this.user = val;
      } else {
        this.isSignIn = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.user$.unsubscribe();
  }

  signOut() {
    this.authericationService.logout();
  }

  onNext() {
    this.authericationService.setUser(this.user);
    const data = { uid: this.user.uid };
    this.navigator.element.pushPage(HomePageComponent, { data });
  }
}
