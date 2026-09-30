import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCard2Component } from './course-card-2.component';

describe('CourseCard2Component', () => {
  let component: CourseCard2Component;
  let fixture: ComponentFixture<CourseCard2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCard2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseCard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
