import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentCartComponent } from './enrollment-cart.component';

describe('EnrollmentCartComponent', () => {
  let component: EnrollmentCartComponent;
  let fixture: ComponentFixture<EnrollmentCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrollmentCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrollmentCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
