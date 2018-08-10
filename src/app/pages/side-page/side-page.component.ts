import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../core/menu/menu.service';

@Component({
  selector: 'ons-page',
  templateUrl: './side-page.component.html',
  styleUrls: ['./side-page.component.css']
})
export class SidePageComponent implements OnInit {
  constructor(private menuService: MenuService) {}

  ngOnInit() {}

  home() {
    this.menuService.index();
  }

  gallery() {
    this.menuService.goGallery();
  }
}
