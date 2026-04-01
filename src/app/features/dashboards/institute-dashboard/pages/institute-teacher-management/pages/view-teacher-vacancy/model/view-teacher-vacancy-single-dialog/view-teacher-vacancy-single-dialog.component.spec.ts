import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTeacherVacancySingleDialogComponent } from './view-teacher-vacancy-single-dialog.component';

describe('ViewTeacherVacancySingleDialogComponent', () => {
  let component: ViewTeacherVacancySingleDialogComponent;
  let fixture: ComponentFixture<ViewTeacherVacancySingleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTeacherVacancySingleDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTeacherVacancySingleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
