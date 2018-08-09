import { Component, OnInit } from '@angular/core';
import { Params } from 'ngx-onsenui';

@Component({
  selector: 'ons-page',
  templateUrl: './survey-page.component.html',
  styleUrls: ['./survey-page.component.css']
})
export class SurveyPageComponent implements OnInit {
  caption: string;
  constructor(private params: Params) {}

  ngOnInit() {
    this.caption = this.params.data.caption;
  }
}
