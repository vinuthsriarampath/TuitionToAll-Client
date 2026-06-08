import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleLecUpdateComponent } from './schedule-lec-update.component';

describe('ScheduleLecUpdateComponent', () => {
  let component: ScheduleLecUpdateComponent;
  let fixture: ComponentFixture<ScheduleLecUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleLecUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleLecUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
