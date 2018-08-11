import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../core/survey/survey.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {
  constructor(private surveyService: SurveyService) {}

  attendTotal$: Observable<number>;

  ngOnInit() {
    this.attendTotal$ = this.surveyService.attendTotal();
  }
}
