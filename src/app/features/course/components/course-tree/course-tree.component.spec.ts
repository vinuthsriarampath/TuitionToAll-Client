import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseTreeComponent} from './course-tree.component';

describe('CourseTreeComponent', () => {
  let component: CourseTreeComponent;
  let fixture: ComponentFixture<CourseTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseTreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
