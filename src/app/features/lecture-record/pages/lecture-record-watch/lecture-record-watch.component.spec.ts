import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureRecordWatchComponent } from './lecture-record-watch.component';

describe('LectureRecordWatchComponent', () => {
  let component: LectureRecordWatchComponent;
  let fixture: ComponentFixture<LectureRecordWatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LectureRecordWatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LectureRecordWatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
