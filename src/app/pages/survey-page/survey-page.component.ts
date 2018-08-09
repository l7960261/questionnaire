import { Component, Inject, OnInit } from '@angular/core';
import { Params } from 'ngx-onsenui';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ons-page',
  templateUrl: './survey-page.component.html',
  styleUrls: ['./survey-page.component.css']
})
export class SurveyPageComponent implements OnInit {
  caption: string;
  attends = [{ text: '是', value: true }, { text: '否', value: false }];
  surveyForm: FormGroup;

  constructor(@Inject(FormBuilder) private fb: FormBuilder, private params: Params) {}

  ngOnInit() {
    this.caption = this.params.data.caption;
    this.surveyForm = this.fb.group({
      attend: [false]
    });
  }
}
