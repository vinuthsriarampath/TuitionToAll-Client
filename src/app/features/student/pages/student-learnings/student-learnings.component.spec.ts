import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLearningsComponent } from './student-learnings.component';

describe('StudentLearningsComponent', () => {
  let component: StudentLearningsComponent;
  let fixture: ComponentFixture<StudentLearningsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentLearningsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentLearningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
