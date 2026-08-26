import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectedCourseSectionComponent} from './selected-course-section.component';

describe('SelectedCourseSectionComponent', () => {
  let component: SelectedCourseSectionComponent;
  let fixture: ComponentFixture<SelectedCourseSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedCourseSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedCourseSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
