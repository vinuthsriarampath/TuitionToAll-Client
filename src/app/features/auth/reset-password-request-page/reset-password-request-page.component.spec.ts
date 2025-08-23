import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordRequestPageComponent } from './reset-password-request-page.component';

describe('ResetPasswordRequestPageComponent', () => {
  let component: ResetPasswordRequestPageComponent;
  let fixture: ComponentFixture<ResetPasswordRequestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPasswordRequestPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
