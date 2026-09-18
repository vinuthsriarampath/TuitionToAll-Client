import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentSubmissionViewComponent } from './assignment-submission-view.component';

describe('AssignmentSubmissionViewComponent', () => {
  let component: AssignmentSubmissionViewComponent;
  let fixture: ComponentFixture<AssignmentSubmissionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignmentSubmissionViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignmentSubmissionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
