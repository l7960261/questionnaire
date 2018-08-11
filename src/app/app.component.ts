import { Component, ViewChild } from '@angular/core';
import { SidePageComponent } from './pages/side-page/side-page.component';
import { ContentPageComponent } from './pages/content-page/content-page.component';
import { MenuService } from './core/menu/menu.service';
import { GalleryPageComponent } from './pages/gallery-page/gallery-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sidePage = SidePageComponent;
  contentPage = ContentPageComponent;
  @ViewChild('splitter')
  splitter;

  constructor(private menuService: MenuService) {
    this.menuService.menu$.subscribe(() => this.splitter.nativeElement.side.open());
    this.menuService.index$.subscribe(() => {
      this.splitter.nativeElement.content.load(ContentPageComponent);
      this.closeSlide();
    });
    this.menuService.gallery$.subscribe(() => {
      this.splitter.nativeElement.content.load(GalleryPageComponent);
      this.closeSlide();
    });
  }

  closeSlide() {
    this.splitter.nativeElement.side.close();
  }
}
