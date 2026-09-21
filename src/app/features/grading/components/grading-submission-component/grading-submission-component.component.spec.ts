import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradingSubmissionComponentComponent } from './grading-submission-component.component';

describe('GradingSubmissionComponentComponent', () => {
  let component: GradingSubmissionComponentComponent;
  let fixture: ComponentFixture<GradingSubmissionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradingSubmissionComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradingSubmissionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
