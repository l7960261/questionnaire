import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { OnsNavigator } from 'ngx-onsenui';
import { AuthenticationService, IUser } from '../../core/authentication/authentication.service';
import { HomePageComponent } from '../home-page/home-page.component';
import { MessageService } from '../../core/message/message.service';
import { MenuService } from '../../core/menu/menu.service';
import { FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';

@Component({
  selector: 'ons-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  isSignIn: boolean;
  loaded: boolean;
  user: IUser;
  user$: Subscription;
  message$: Observable<any>;

  constructor(
    private navigator: OnsNavigator,
    private authericationService: AuthenticationService,
    private messageService: MessageService,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    this.user = Object.assign({}, { displayName: '', phoneNumber: '', email: '', uid: null, photoURL: '', profile: '' });
    this.user$ = this.authericationService.user().subscribe(val => {
      if (val) {
        this.isSignIn = true;
        this.user.displayName = val.displayName || '';
        this.user.phoneNumber = val.phoneNumber || '';
        this.user.email = val.email || '';
        this.user.uid = val.uid || null;
        this.user.photoURL = val.photoURL || '';

        if (val.profile) {
          this.user.profile = val.profile;
        }
      } else {
        this.isSignIn = false;
      }
    });

    setTimeout(() => {
      this.loaded = true;
    }, 1500);

    this.message$ = this.messageService.getList();
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

  openMenu() {
    this.menuService.open();
  }

  surveyMessage() {
    this.menuService.goSurveyMessage();
  }

  firebaseSuccessCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    const userProfile = signInSuccessData.authResult.additionalUserInfo.profile['link'];
    this.user.profile = userProfile;
  }

  fbPage(url: string) {
    if (url) {
      location.href = url;
    }
  }
}
