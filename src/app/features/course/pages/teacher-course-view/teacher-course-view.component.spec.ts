import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCourseViewComponent } from './teacher-course-view.component';

describe('TeacherCourseViewComponent', () => {
  let component: TeacherCourseViewComponent;
  let fixture: ComponentFixture<TeacherCourseViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherCourseViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherCourseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
