import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ScheduleLectureCardComponent} from './schedule-lecture-card.component';

describe('ScheduleLectureCardComponent', () => {
  let component: ScheduleLectureCardComponent;
  let fixture: ComponentFixture<ScheduleLectureCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleLectureCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleLectureCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
