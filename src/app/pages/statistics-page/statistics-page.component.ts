import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuService } from '../../core/menu/menu.service';
import { SurveyService } from '../../core/survey/survey.service';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'ons-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.css']
})
export class StatisticsPageComponent implements OnInit {
  rows$: Observable<any>;
  columns: Array<any>;
  @ViewChild('invitationCell')
  invitationCell: any;
  @ViewChild('attendCell')
  attendCell: any;
  @ViewChild('expandCell')
  expandCell: any;
  @ViewChild('table')
  table: any;

  constructor(private menuService: MenuService, private surveyService: SurveyService) {}

  ngOnInit() {
    const organizer = this.menuService._statistics;
    this.rows$ = this.surveyService.organizer(organizer);
    this.columns = [
      { name: '', prop: 'photoURL', summaryFunc: null, cellTemplate: this.expandCell },
      { name: '姓名', prop: 'displayName', summaryFunc: null },
      { name: '出席', prop: 'attend', summaryFunc: null, cellTemplate: this.attendCell },
      { name: '喜帖', prop: 'invitation', summaryFunc: cells => this.summaryForInvitation(cells), cellTemplate: this.invitationCell },
      { name: '人數', prop: 'members', summaryFunc: cells => this.summaryForMembers(cells) },
      { name: '兒童椅', prop: 'childSeats', summaryFunc: cells => this.summaryForChildSeats(cells) },
      { name: '素食', prop: 'vegetarian', summaryFunc: cells => this.summaryForVegetarian(cells) }
    ];
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  openMenu() {
    this.menuService.open();
  }

  summaryForInvitation(cells: number[]): number {
    return _.reduce(cells, (result, value) => result + value, 0);
  }

  summaryForMembers(cells: number[]): number {
    return _.reduce(cells, (result, value) => result + value, 0);
  }

  summaryForChildSeats(cells: number[]): number {
    return _.reduce(cells, (result, value) => result + value, 0);
  }

  summaryForVegetarian(cells: number[]): number {
    return _.reduce(cells, (result, value) => result + value, 0);
  }
}
