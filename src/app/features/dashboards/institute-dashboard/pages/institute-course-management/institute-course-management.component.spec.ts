import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteCourseManagementComponent } from './institute-course-management.component';

describe('InstituteCourseManagementComponent', () => {
  let component: InstituteCourseManagementComponent;
  let fixture: ComponentFixture<InstituteCourseManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstituteCourseManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstituteCourseManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
