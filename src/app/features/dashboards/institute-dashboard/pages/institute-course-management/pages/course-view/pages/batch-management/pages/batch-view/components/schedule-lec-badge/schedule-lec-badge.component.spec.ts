import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleLecBadgeComponent } from './schedule-lec-badge.component';

describe('ScheduleLecBadgeComponent', () => {
  let component: ScheduleLecBadgeComponent;
  let fixture: ComponentFixture<ScheduleLecBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleLecBadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleLecBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
