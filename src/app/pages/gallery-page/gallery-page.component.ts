import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../core/menu/menu.service';

@Component({
  selector: 'ons-page',
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.css']
})
export class GalleryPageComponent implements OnInit {
  constructor(private menuService: MenuService) {}

  ngOnInit() {}

  openMenu() {
    this.menuService.open();
  }
}
