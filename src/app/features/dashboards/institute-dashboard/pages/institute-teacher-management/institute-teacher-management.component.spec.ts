import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteTeacherManagementComponent } from './institute-teacher-management.component';

describe('InstituteTeacherManagementComponent', () => {
  let component: InstituteTeacherManagementComponent;
  let fixture: ComponentFixture<InstituteTeacherManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstituteTeacherManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstituteTeacherManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
