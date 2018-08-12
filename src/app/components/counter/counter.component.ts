import { Component, OnDestroy, OnInit } from '@angular/core';
import { SurveyService } from '../../core/survey/survey.service';
import { Observable, Subscription } from 'rxjs';
import { AuthenticationService } from '../../core/authentication/authentication.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit, OnDestroy {
  constructor(private surveyService: SurveyService, private authenticationService: AuthenticationService) {}

  isSignIn: boolean;
  membersTotal$: Observable<number>;
  user$: Subscription;

  ngOnInit() {
    this.membersTotal$ = this.surveyService.membersTotal();
    this.user$ = this.authenticationService.user().subscribe(user => {
      this.isSignIn = !!user;
    });
  }

  ngOnDestroy(): void {
    this.user$.unsubscribe();
  }
}
