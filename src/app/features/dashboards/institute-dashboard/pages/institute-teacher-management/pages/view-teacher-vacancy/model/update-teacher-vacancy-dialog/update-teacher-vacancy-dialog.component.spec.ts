import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTeacherVacancyDialogComponent } from './update-teacher-vacancy-dialog.component';

describe('UpdateTeacherVacancyDialogComponent', () => {
  let component: UpdateTeacherVacancyDialogComponent;
  let fixture: ComponentFixture<UpdateTeacherVacancyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateTeacherVacancyDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTeacherVacancyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
