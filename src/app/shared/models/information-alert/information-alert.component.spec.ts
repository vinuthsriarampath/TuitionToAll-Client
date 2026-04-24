import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationAlertComponent } from './information-alert.component';

describe('InformationAlertComponent', () => {
  let component: InformationAlertComponent;
  let fixture: ComponentFixture<InformationAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformationAlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
