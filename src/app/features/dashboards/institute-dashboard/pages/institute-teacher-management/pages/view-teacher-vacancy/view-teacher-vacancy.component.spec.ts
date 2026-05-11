import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ViewTeacherVacancyComponent} from './view-teacher-vacancy.component';

describe('ViewTeacherVacancyComponent', () => {
  let component: ViewTeacherVacancyComponent;
  let fixture: ComponentFixture<ViewTeacherVacancyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTeacherVacancyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTeacherVacancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
