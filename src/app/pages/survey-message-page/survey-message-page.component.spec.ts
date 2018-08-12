import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyMessagePageComponent } from './survey-message-page.component';

describe('SurveyMessagePageComponent', () => {
  let component: SurveyMessagePageComponent;
  let fixture: ComponentFixture<SurveyMessagePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyMessagePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyMessagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
