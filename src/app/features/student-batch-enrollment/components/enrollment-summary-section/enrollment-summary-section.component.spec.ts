import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EnrollmentSummarySectionComponent} from './enrollment-summary-section.component';

describe('EnrollmentSummarySectionComponent', () => {
  let component: EnrollmentSummarySectionComponent;
  let fixture: ComponentFixture<EnrollmentSummarySectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrollmentSummarySectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrollmentSummarySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
