import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentSubmissionStatusBadgeComponent } from './assignment-submission-status-badge.component';

describe('AssignmentSubmissionStatusBadgeComponent', () => {
  let component: AssignmentSubmissionStatusBadgeComponent;
  let fixture: ComponentFixture<AssignmentSubmissionStatusBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignmentSubmissionStatusBadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignmentSubmissionStatusBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
