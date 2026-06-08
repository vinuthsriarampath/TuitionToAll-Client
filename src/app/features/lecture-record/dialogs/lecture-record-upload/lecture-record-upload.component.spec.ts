import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureRecordUploadComponent } from './lecture-record-upload.component';

describe('LectureRecordUploadComponent', () => {
  let component: LectureRecordUploadComponent;
  let fixture: ComponentFixture<LectureRecordUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LectureRecordUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LectureRecordUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
