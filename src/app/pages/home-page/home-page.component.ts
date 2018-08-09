import { Component, OnInit } from '@angular/core';
import { OnsNavigator, Params } from 'ngx-onsenui';
import { SurveyPageComponent } from '../survey-page/survey-page.component';

@Component({
  selector: 'ons-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  uid: string;

  constructor(private navigator: OnsNavigator, private params: Params) {}

  ngOnInit() {
    this.uid = this.params.data.uid;
  }

  toLoginPage(key: number) {
    const data = {
      organizer: key ? 'taichung' : 'kaohsiung',
      date: key ? '20190202' : '20181212',
      caption: key ? '迎娶結婚宴' : '訂婚歸寧宴',
      uid: this.uid
    };
    this.navigator.element.pushPage(SurveyPageComponent, { data });
  }
}
