import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'ons-page[login]',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  @ViewChild('carousel')
  carousel;

  constructor() {}

  ngOnInit() {}
}
