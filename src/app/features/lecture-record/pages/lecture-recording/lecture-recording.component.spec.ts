import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LectureRecordingComponent} from './lecture-recording.component';

describe('LectureRecordingComponent', () => {
  let component: LectureRecordingComponent;
  let fixture: ComponentFixture<LectureRecordingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LectureRecordingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LectureRecordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
