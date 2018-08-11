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

  photos = _.range(6).map(v => `/assets/images/weddingphotos/${v}.jpg`);
  @ViewChild('modal')
  modal: any;
  modalImgPath: string;

  ngOnInit() {}

  openMenu() {
    this.menuService.open();
  }

  openModal(path: string) {
    this.modalImgPath = path;
    this.modal.nativeElement.show();
  }
}
