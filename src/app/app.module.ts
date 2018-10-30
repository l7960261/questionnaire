import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SurveyPageComponent } from './pages/survey-page/survey-page.component';
import { CompletePageComponent } from './pages/complete-page/complete-page.component';
import { SidePageComponent } from './pages/side-page/side-page.component';
import { ContentPageComponent } from './pages/content-page/content-page.component';
import { GalleryPageComponent } from './pages/gallery-page/gallery-page.component';
import { CounterComponent } from './components/counter/counter.component';
import { SurveyMessagePageComponent } from './pages/survey-message-page/survey-message-page.component';
import { StatisticsPageComponent } from './pages/statistics-page/statistics-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    SurveyPageComponent,
    CompletePageComponent,
    SidePageComponent,
    ContentPageComponent,
    GalleryPageComponent,
    CounterComponent,
    SurveyMessagePageComponent,
    StatisticsPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    HomePageComponent,
    LoginPageComponent,
    SurveyPageComponent,
    CompletePageComponent,
    SidePageComponent,
    ContentPageComponent,
    GalleryPageComponent,
    SurveyMessagePageComponent,
    StatisticsPageComponent
  ]
})
export class AppModule {}
