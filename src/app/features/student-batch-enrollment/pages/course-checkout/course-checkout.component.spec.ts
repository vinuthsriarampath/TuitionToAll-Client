import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseCheckoutComponent} from './course-checkout.component';

describe('CourseCheckoutComponent', () => {
  let component: CourseCheckoutComponent;
  let fixture: ComponentFixture<CourseCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCheckoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
