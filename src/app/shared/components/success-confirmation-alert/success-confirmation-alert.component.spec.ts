import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SuccessConfirmationAlertComponent} from './success-confirmation-alert.component';

describe('SuccessConfirmationAlertComponent', () => {
  let component: SuccessConfirmationAlertComponent;
  let fixture: ComponentFixture<SuccessConfirmationAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessConfirmationAlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessConfirmationAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
