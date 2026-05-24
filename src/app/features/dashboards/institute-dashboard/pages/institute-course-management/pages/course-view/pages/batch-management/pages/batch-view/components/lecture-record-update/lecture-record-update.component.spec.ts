import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureRecordUpdateComponent } from './lecture-record-update.component';

describe('LectureRecordUpdateComponent', () => {
  let component: LectureRecordUpdateComponent;
  let fixture: ComponentFixture<LectureRecordUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LectureRecordUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LectureRecordUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
