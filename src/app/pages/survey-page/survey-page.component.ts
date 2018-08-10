import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { OnsNavigator, Params } from 'ngx-onsenui';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SurveyService } from '../../core/survey/survey.service';
import { CompletePageComponent } from '../complete-page/complete-page.component';
import { mergeMap } from 'rxjs/operators';
import { MessageService } from '../../core/message/message.service';
import * as _ from 'lodash';
import * as ons from 'onsenui';

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
  message: string;
  surveyForm: FormGroup;
  surveyRead$: Subscription;
  surveyWrite$: Subscription;

  constructor(
    @Inject(FormBuilder) private fb: FormBuilder,
    private navigator: OnsNavigator,
    private params: Params,
    private surveyService: SurveyService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.caption = this.params.data.caption;
    this.uid = this.params.data.uid;
    this.organizer = this.params.data.organizer;

    this.surveyForm = this.fb.group({
      attend: [1],
      invitation: [1],
      members: [0, Validators.compose([Validators.min(0), Validators.max(10)])],
      childSeats: [0, Validators.compose([Validators.min(0), Validators.max(10)])],
      vegetarian: [0, Validators.compose([Validators.min(0), Validators.max(10)])]
    });
    this.address = '';
    this.message = '';

    this.surveyRead$ = this.surveyService.read(this.uid, this.organizer).subscribe(data => {
      if (data) {
        this.surveyForm.get('attend').setValue(_.isUndefined(data.attend) ? 1 : data.attend);
        this.surveyForm.get('invitation').setValue(_.isUndefined(data.invitation) ? 1 : data.invitation);
        this.address = data.address || '';
        this.surveyForm.get('members').setValue(_.isInteger(data.members) ? data.members : 0);
        this.surveyForm.get('childSeats').setValue(_.isInteger(data.childSeats) ? data.childSeats : 0);
        this.surveyForm.get('vegetarian').setValue(_.isInteger(data.vegetarian) ? data.vegetarian : 0);
        this.message = data.message || '';
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
    ons.notification.toast('處理中請稍後...', { timeout: 2000 });

    const data = Object.assign({}, this.surveyForm.value, {
      uid: this.uid,
      address: this.address,
      message: this.message
    });

    this.surveyWrite$ = this.surveyService
      .write(data, this.organizer)
      .pipe(mergeMap(() => this.messageService.setMessage(this.uid, this.organizer, this.message)))
      .subscribe((err: string) => {
        if (err) {
          alert(`${err} - 請聯繫作者翁聖凱`);
        } else {
          this.navigator.element.pushPage(CompletePageComponent, { data: this.params.data });
        }
      });
  }
}
