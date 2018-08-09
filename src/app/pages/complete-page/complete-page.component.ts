import { Component, OnInit } from '@angular/core';
import { Params } from 'ngx-onsenui';

@Component({
  selector: 'ons-page',
  templateUrl: './complete-page.component.html',
  styleUrls: ['./complete-page.component.css']
})
export class CompletePageComponent implements OnInit {
  caption: string;

  constructor(private params: Params) {}

  ngOnInit() {
    this.caption = this.params.data.caption;
  }
}
