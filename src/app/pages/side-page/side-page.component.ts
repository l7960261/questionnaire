import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../core/menu/menu.service';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ons-page',
  templateUrl: './side-page.component.html',
  styleUrls: ['./side-page.component.css']
})
export class SidePageComponent implements OnInit {
  isAdmin: boolean;
  user$: Subscription;

  constructor(private menuService: MenuService, private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.user$ = this.authenticationService.user().subscribe(user => {
      if (user) {
        this.isAdmin = user.uid === 'd9cPOXiRw8hsu6UFSSbTJw4BWyn2' || user.uid === '3f0CAMBF26NPHpkzKFd2YgEdRbM2';
      } else {
        this.isAdmin = false;
      }
    });
  }

  home() {
    this.menuService.index();
  }

  gallery() {
    this.menuService.goGallery();
  }

  surveyMessage() {
    this.menuService.goSurveyMessage();
  }

  statistics(key: number) {
    this.menuService.goStatistics(key ? 'taichung' : 'kaohsiung');
  }
}
