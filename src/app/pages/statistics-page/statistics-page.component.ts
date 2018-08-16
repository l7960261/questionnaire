import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../core/menu/menu.service';

@Component({
  selector: 'ons-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.css']
})
export class StatisticsPageComponent implements OnInit {
  constructor(private menuService: MenuService) {}

  ngOnInit() {
    console.log(this.menuService._statistics);
  }

  home() {
    this.menuService.index();
  }
}
