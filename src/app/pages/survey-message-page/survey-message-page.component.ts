import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../core/menu/menu.service';
import { MessageService } from '../../core/message/message.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ons-page',
  templateUrl: './survey-message-page.component.html',
  styleUrls: ['./survey-message-page.component.css']
})
export class SurveyMessagePageComponent implements OnInit {
  message$: Observable<any>;

  constructor(private menuService: MenuService, private messageService: MessageService) {}

  ngOnInit() {
    this.message$ = this.messageService.getList();
  }

  home() {
    this.menuService.index();
  }
}
