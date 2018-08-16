import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../core/menu/menu.service';
import { SurveyService } from '../../core/survey/survey.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ons-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.css']
})
export class StatisticsPageComponent implements OnInit {
  constructor(private menuService: MenuService, private surveyService: SurveyService) {}

  rows$: Observable<any>;
  columns: Array<any>;

  ngOnInit() {
    const organizer = this.menuService._statistics;
    this.rows$ = this.surveyService.organizer(organizer);
    this.columns = [
      { name: '姓名', prop: 'displayName' },
      { name: '人數', prop: 'members' },
      { name: '兒童椅', prop: 'childSeats' },
      { name: '素食', prop: 'invitation' }
    ];
  }

  openMenu() {
    this.menuService.open();
  }
}
