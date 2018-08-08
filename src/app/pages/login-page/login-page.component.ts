import { Component, OnInit, ViewChild } from '@angular/core';
import { Params } from 'ngx-onsenui';
import { AngularFireAuth } from 'angularfire2/auth';

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

  constructor(private _params: Params, private afAuth: AngularFireAuth) {}

  ngOnInit() {
    this.caption = `${this._params.data.name} - ${this._params.data.date}`;
    this.afAuth.user.subscribe(data => {
      this.signInData = data;
      console.log('signInData: ', this.signInData);
    });
  }
}
