import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationSnackbarComponent } from './notification-snackbar.component';

describe('NotificationSnackbarComponent', () => {
  let component: NotificationSnackbarComponent;
  let fixture: ComponentFixture<NotificationSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationSnackbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
