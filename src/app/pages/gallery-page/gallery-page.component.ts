import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuService } from '../../core/menu/menu.service';
import * as _ from 'lodash';

@Component({
  selector: 'ons-page',
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.css']
})
export class GalleryPageComponent implements OnInit {
  constructor(private menuService: MenuService) {}

  photos = _.range(1).map(v => `/assets/images/weddingphotos/${v}.jpg`);
  @ViewChild('modal')
  modal: any;

  @ViewChild('carousel')
  carousel: any;

  ngOnInit() {}

  openMenu() {
    this.menuService.open();
  }

  openModal(index: number) {
    this.carousel.nativeElement.setActiveIndex(index);
    this.modal.nativeElement.show();
  }
}
