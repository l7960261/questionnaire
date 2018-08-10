import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  subject = new Subject();
  get menu$(): Observable<any> {
    return this.subject.asObservable();
  }

  constructor() {}

  open() {
    this.subject.next();
  }
}
