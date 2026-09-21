import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAssignmentSubmissionListComponent } from './student-assignment-submission-list.component';

describe('StudentAssignmentSubmissionListComponent', () => {
  let component: StudentAssignmentSubmissionListComponent;
  let fixture: ComponentFixture<StudentAssignmentSubmissionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentAssignmentSubmissionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAssignmentSubmissionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
