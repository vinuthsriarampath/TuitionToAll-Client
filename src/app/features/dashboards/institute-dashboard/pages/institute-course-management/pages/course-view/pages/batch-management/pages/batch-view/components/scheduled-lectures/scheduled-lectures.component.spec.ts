import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledLecturesComponent } from './scheduled-lectures.component';

describe('ScheduledLecturesComponent', () => {
  let component: ScheduledLecturesComponent;
  let fixture: ComponentFixture<ScheduledLecturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduledLecturesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduledLecturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
