import { Component, OnInit, ViewChild } from '@angular/core';
import { Params } from 'ngx-onsenui';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'ons-page[login]',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  @ViewChild('carousel')
  carousel;

  caption: string;
  signInData: any;
  user: IUser;

  constructor(private _params: Params, private afAuth: AngularFireAuth, private afDb: AngularFireDatabase) {}

  ngOnInit() {
    this.caption = `${this._params.data.name} - ${this._params.data.date}`;
    this.user = Object.assign({}, { name: '', phone: '', email: '' });

    this.afAuth.user.subscribe(data => {
      this.signInData = data;
      console.log('signInData: ', this.signInData);

      if (this.signInData) {
        this.user.name = this.signInData.displayName;
        this.user.phone = this.signInData.phoneNumber;
        this.user.email = this.signInData.email;
        this.user.uid = this.signInData.uid;
      }
    });
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

  onNext() {
    this.afDb.database.ref(`users/${this.user.uid}`).set({
      name: this.user.name,
      phone: this.user.phone,
      email: this.user.email
    });
  }
}

interface IUser {
  name: string;
  phone: string;
  email: string;
  uid?: string;
}
