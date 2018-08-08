import { Component, OnInit, ViewChild } from '@angular/core';
import { Params } from 'ngx-onsenui';

@Component({
  selector: 'ons-page[login]',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  @ViewChild('carousel')
  carousel;

  caption: string;

  constructor(private _params: Params) {}

  ngOnInit() {
    this.caption = `婚宴 - ${this._params.data.date}`;
  }
}
