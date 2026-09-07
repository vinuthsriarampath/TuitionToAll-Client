import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCourseViewComponent } from './student-course-view.component';

describe('StudentCourseViewComponent', () => {
  let component: StudentCourseViewComponent;
  let fixture: ComponentFixture<StudentCourseViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentCourseViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentCourseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
