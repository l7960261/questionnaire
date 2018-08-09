import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Params } from 'ngx-onsenui';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SurveyService } from '../../core/survey/survey.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ons-page',
  templateUrl: './survey-page.component.html',
  styleUrls: ['./survey-page.component.css']
})
export class SurveyPageComponent implements OnInit, OnDestroy {
  caption: string;
  uid: string;
  organizer: string;
  attends = [{ text: '是', value: 1 }, { text: '否', value: 0 }];
  invitations = [{ text: '需要，請寄紙本喜帖給我', value: 1 }, { text: '不用唷，婚禮相關資訊我知道了', value: 0 }];
  address: string;
  surveyForm: FormGroup;
  surveyRead$: Subscription;
  surveyWrite$: Subscription;

  constructor(@Inject(FormBuilder) private fb: FormBuilder, private params: Params, private surveyService: SurveyService) {}

  ngOnInit() {
    this.caption = this.params.data.caption;
    this.uid = this.params.data.uid;
    this.organizer = this.params.data.organizer;

    this.surveyForm = this.fb.group({
      attend: [1],
      invitation: [0]
    });
    this.address = '';

    this.surveyRead$ = this.surveyService.read(this.uid, this.organizer).subscribe(data => {
      if (data) {
        this.surveyForm.get('attend').setValue(data.attend);
        this.surveyForm.get('invitation').setValue(data.invitation || 0);
        this.address = data.address || '';
      }
    });
  }

  ngOnDestroy(): void {
    this.surveyRead$.unsubscribe();
    if (this.surveyWrite$) {
      this.surveyWrite$.unsubscribe();
    }
  }

  onSubmit() {
    const data = Object.assign(this.surveyForm.value, { uid: this.uid, address: this.address });
    this.surveyWrite$ = this.surveyService.write(data, this.organizer).subscribe(() => {
      alert('提交成功');
    });
  }
}
