import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleLectureCardSkeletonComponent } from './schedule-lecture-card-skeleton.component';

describe('ScheduleLectureCardSkeletonComponent', () => {
  let component: ScheduleLectureCardSkeletonComponent;
  let fixture: ComponentFixture<ScheduleLectureCardSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleLectureCardSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleLectureCardSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
