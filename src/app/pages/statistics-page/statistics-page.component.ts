import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuService } from '../../core/menu/menu.service';
import { SurveyService } from '../../core/survey/survey.service';
import { Observable } from 'rxjs';

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
      { name: '', prop: '', cellTemplate: this.expandCell },
      { name: '姓名', prop: 'displayName' },
      { name: '出席', prop: 'attend', cellTemplate: this.attendCell },
      { name: '喜帖', prop: 'invitation', cellTemplate: this.invitationCell },
      { name: '人數', prop: 'members' },
      { name: '兒童椅', prop: 'childSeats' },
      { name: '素食', prop: 'vegetarian' }
    ];
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  openMenu() {
    this.menuService.open();
  }
}
