import { Component, Inject, OnInit } from '@angular/core';
import { Params } from 'ngx-onsenui';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SurveyService } from '../../core/survey/survey.service';

@Component({
  selector: 'ons-page',
  templateUrl: './survey-page.component.html',
  styleUrls: ['./survey-page.component.css']
})
export class SurveyPageComponent implements OnInit {
  caption: string;
  uid: string;
  organizer: string;
  attends = [{ text: '是', value: true }, { text: '否', value: false }];
  surveyForm: FormGroup;

  constructor(@Inject(FormBuilder) private fb: FormBuilder, private params: Params, private surveyService: SurveyService) {}

  ngOnInit() {
    this.caption = this.params.data.caption;
    this.uid = this.params.data.uid;
    this.organizer = this.params.data.organizer;
    this.surveyForm = this.fb.group({
      attend: [false]
    });

    this.surveyService.read(this.uid, this.organizer).subscribe(data => {
      console.log(data);
    });
  }

  onSubmit() {
    const data = Object.assign(this.surveyForm.value, { uid: this.uid });
    this.surveyService.write(data, this.organizer).subscribe(() => {
      alert('提交成功');
    });
  }
}
