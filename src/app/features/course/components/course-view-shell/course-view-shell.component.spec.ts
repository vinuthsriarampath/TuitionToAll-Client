import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseViewShellComponent } from './course-view-shell.component';

describe('CourseViewShellComponent', () => {
  let component: CourseViewShellComponent;
  let fixture: ComponentFixture<CourseViewShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseViewShellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseViewShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
