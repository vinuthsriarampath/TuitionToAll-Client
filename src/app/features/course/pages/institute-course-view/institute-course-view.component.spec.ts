import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteCourseViewComponent } from './institute-course-view.component';

describe('InstituteCourseViewComponent', () => {
  let component: InstituteCourseViewComponent;
  let fixture: ComponentFixture<InstituteCourseViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstituteCourseViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstituteCourseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
