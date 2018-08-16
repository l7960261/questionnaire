import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  menuSubject = new Subject();
  indexSubject = new Subject();
  gallerySubject = new Subject();
  surveyMessageSubject = new Subject();
  statisticsSubject = new Subject();
  _statistics: string;

  get menu$(): Observable<any> {
    return this.menuSubject.asObservable();
  }

  get gallery$(): Observable<any> {
    return this.gallerySubject.asObservable();
  }

  get index$(): Observable<any> {
    return this.indexSubject.asObservable();
  }

  get surveyMessage$(): Observable<any> {
    return this.surveyMessageSubject.asObservable();
  }

  get statistics$(): Observable<any> {
    return this.statisticsSubject.asObservable();
  }

  constructor() {}

  open() {
    this.menuSubject.next();
  }

  index() {
    this.indexSubject.next();
  }

  goGallery() {
    this.gallerySubject.next();
  }

  goSurveyMessage() {
    this.surveyMessageSubject.next();
  }

  goStatistics(target: string) {
    this._statistics = target;
    this.statisticsSubject.next();
  }
}
