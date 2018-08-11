import { Component, OnDestroy, OnInit } from '@angular/core';
import { OnsNavigator, Params } from 'ngx-onsenui';
import { LoginPageComponent } from '../login-page/login-page.component';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'ons-page',
  templateUrl: './complete-page.component.html',
  styleUrls: ['./complete-page.component.css']
})
export class CompletePageComponent implements OnInit, OnDestroy {
  caption: string;
  counter$: Subscription;
  counter: number;

  constructor(private params: Params, private navigator: OnsNavigator) {}

  ngOnInit() {
    this.caption = this.params.data.caption;
    this.counter = 10;
    this.counter$ = interval(1000)
      .pipe(take(10))
      .subscribe(
        val => {
          this.counter = 10 - (val + 1);
        },
        error => {},
        () => {
          this.onComplete();
        }
      );
  }

  ngOnDestroy(): void {
    this.counter$.unsubscribe();
  }

  onComplete() {
    this.navigator.element.resetToPage(LoginPageComponent);
  }
}
